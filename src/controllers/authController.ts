import { Response, Request } from "express";
import { PrismaClient } from "../generated/prisma";
import { z } from "zod";
import jwt from "jsonwebtoken";
import config from "../config/config";

const userSchema = z.object({
  email: z.string().email("Valid email address is required"),
  name: z.string(),
});

const prisma = new PrismaClient();

export const syncUser = async (req: Request, res: Response) => {
  try {
    const { email, name } = userSchema.parse(req.body);
    const upsertUser = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name,
      },
    });

    const token = jwt.sign(
      { userId: upsertUser.id, email: upsertUser.email },
      config.jwt_secret,
      { expiresIn: "1d" }
    );

    console.log("User sync successful");

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "User sync successful" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(error.issues);
    } else {
      console.error(
        "An error occured while syncing user to DB, error: ",
        error
      );
    }
    res.status(500).json({ message: error });
  }
};

export const sendCsrfToken = async (req: Request, res: Response) => {
  res.json({ csrfToken: req.csrfToken() });
};
