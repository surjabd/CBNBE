import { Router } from "express";
import contentController from "../controllers/content.controller";

const courseRoutes = Router();
courseRoutes.get("/course/:id", contentController.find);
courseRoutes.post("/course",contentController.add);
export { courseRoutes };
