import { Router } from "express";
import sectionController from "../controllers/section.controller";

const sectionRoutes = Router();
sectionRoutes.get("/section/:id", sectionController.find);
sectionRoutes.post("/section",sectionController.add);
sectionRoutes.put("/section/:id",sectionController.update);
sectionRoutes.delete("/section/:id",sectionController.delete);

export { sectionRoutes };
