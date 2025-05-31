import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/taskRoute";
import authRouter from "./routes/authRoute";
import categoryRouter from "./routes/categoryRoute";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(json());
app.use(cookieParser());

app.use("/tasks", taskRouter);
app.use("/auth", authRouter);
app.use("/category", categoryRouter);

export default app;
