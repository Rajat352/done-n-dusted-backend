import { z, ZodError } from "zod";
import { PrismaClient } from "../generated/prisma";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const createCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  userId: z.string(),
});

export const getCategories = async (req: Request, res: Response) => {
  try {
    const userData = req.user;
    const allCategories = await prisma.category.findMany({
      where: {
        userId: userData.userId,
      },
      select: {
        id: true,
        name: true,
      },
    });

    res.status(200).json(allCategories);
  } catch (error) {
    console.error("An error occured while getting categories: ", error);
    res.status(500).json({ error });
  } finally {
    await prisma.$disconnect();
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const dataP = {
      name: req.body.name,
      userId: req.user.userId,
    };
    const { name, userId } = createCategorySchema.parse(dataP);

    const checkCategory = await prisma.category.findMany({
      where: {
        name,
        userId: req.user.userId,
      },
    });

    if (checkCategory.length != 0) {
      res
        .status(500)
        .json({ message: "A category with same name alreay exists" });

      return;
    }

    const insertCategory = await prisma.category.create({
      data: {
        name,
        userId,
      },
      select: {
        id: true,
        name: true,
      },
    });

    res.status(200).json({
      message: "Category created successfully",
      category: insertCategory,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(error.issues);
      res.status(400).json("Incorrect data format received");
    } else {
      console.error("An error occured while inserting the category in Server");
      res.status(500).json({ message: error });
    }
  } finally {
    await prisma.$disconnect();
  }
};
