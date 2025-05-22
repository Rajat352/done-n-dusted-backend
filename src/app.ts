import express from "express";
import taskRouter from "./routes/taskRoute";

const app = express();

app.use("/tasks", taskRouter);

export default app;