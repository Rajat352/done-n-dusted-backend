import { Response, Request, NextFunction } from "express";
import { PrismaClient } from "../generated/prisma";
import {z} from "zod"

const prisma = new PrismaClient();

const createTaskSchema = z.object({

})

export const getAllTasks = async (req: Request, res: Response) => {
    try{
        const allTasks = await prisma.task.findMany();
        res.status(200).json(allTasks);
    }catch(error){
        console.error("An error occurred while getting the tasks");
        res.status(500).json({errorMessage: error})
    }finally{
        await prisma.$disconnect();
    }
}

export const createTask = async (req: Request, res: Response) => {
    try{

    }catch(error){

    }finally{
        await prisma.$disconnect();
    }
}