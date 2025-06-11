import { createTask, getAllTasks } from "../controllers/taskController";
import { RequestHandler, Router } from "express";
import { authenticate } from "../middleware/authenticationMiddleware";
import { csrfProtection } from "../middleware/csrfMiddleware";

const router = Router();

router.get("/:categoryid", authenticate as RequestHandler, getAllTasks);

router.post(
  "/:categoryid",
  authenticate as RequestHandler,
  csrfProtection,
  createTask
);

export default router;
