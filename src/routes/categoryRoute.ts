import { RequestHandler, Router } from "express";
import { authenticate } from "../middleware/authenticationMiddleware";
import {
  getCategories,
  createCategory,
} from "../controllers/categoryController";
import { csrfProtection } from "../middleware/csrfMiddleware";

const router = Router();

router.get("/", authenticate as RequestHandler, getCategories);

router.post(
  "/",
  authenticate as RequestHandler,
  csrfProtection,
  createCategory
);

export default router;
