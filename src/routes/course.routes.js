import { Router } from "express";
import courseController from "../controllers/course.controller";

const courseRoutes = Router();
courseRoutes.get("/course", courseController.get);
courseRoutes.get("/course/:id", courseController.find);
courseRoutes.post("/course",courseController.add);
export { courseRoutes };
