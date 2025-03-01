import { Router } from "express";
import sectionController from "../controllers/section.controller";

const courseRoutes = Router();
courseRoutes.get("/section/:id", sectionController.find);
courseRoutes.post("/section",sectionController.add);
export { courseRoutes };
