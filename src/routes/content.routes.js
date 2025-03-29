import { Router } from "express";
import contentController from "../controllers/content.controller";

const contentRoutes = Router();
contentRoutes.get("/content/:id", contentController.find);
contentRoutes.post("/content",contentController.add);
contentRoutes.put("/content/:id",contentController.update);
contentRoutes.delete("/content/:id",contentController.delete);
export { contentRoutes };
