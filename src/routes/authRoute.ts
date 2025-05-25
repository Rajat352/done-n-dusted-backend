import { Router } from "express";
import { sendCsrfToken, syncUser } from "../controllers/authController";
import { csrfProtection } from "../middleware/csrfMiddleware";

const router = Router();

router.post("/sync", syncUser);

router.get("/csrf-token", csrfProtection, sendCsrfToken);

export default router;
