import { Router } from "express";
import contentController from "../controllers/content.controller";

const courseRoutes = Router();
courseRoutes.get("/content/:id", contentController.find);
courseRoutes.post("/content",contentController.add);
export { courseRoutes };
