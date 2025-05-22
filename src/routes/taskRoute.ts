import { createTask, getAllTasks } from "../controllers/taskController";
import { Router } from "express";

const router = Router();

router.get("/", getAllTasks);

router.post("/", createTask)

export default router;