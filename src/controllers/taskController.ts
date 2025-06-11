import { Response, Request, NextFunction } from "express";
import { PrismaClient } from "../generated/prisma";
import { z } from "zod";

const prisma = new PrismaClient();

const createTaskSchema = z.object({
  title: z.string().min(1, "Task name is required"),
  userId: z.string(),
  categoryId: z.string(),
  status: z.enum(["PENDING", "COMPLETED"]),
});

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const allTasks = await prisma.task.findMany({
      where: {
        categoryId: req.params.categoryid,
      },
      select: {
        id: true,
        title: true,
        status: true,
      },
    });

    res.status(200).json(allTasks);
  } catch (error) {
    console.error("An error occurred while getting the tasks");
    res.status(500).json({ errorMessage: error });
  } finally {
    await prisma.$disconnect();
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const dataP = {
      title: req.body.task,
      userId: req.user.userId,
      categoryId: req.params.categoryid,
      status: "PENDING",
    };

    const { title, userId, categoryId, status } = createTaskSchema.parse(dataP);

    const insertTask = await prisma.task.create({
      data: {
        title,
        userId,
        categoryId,
        status,
      },
      select: {
        id: true,
        title: true,
        status: true,
      },
    });

    res
      .status(200)
      .json({ message: "Task created successfully", task: insertTask });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(error.issues);
      res.status(400).json("Incorrect data format received");
    } else {
      console.error("An error occurred while inserting task to DB");
      res.status(500).json({ message: error });
    }
  } finally {
    await prisma.$disconnect();
  }
};
