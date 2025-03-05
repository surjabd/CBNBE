import { Router } from "express";
import courseController from "../controllers/course.controller";

const courseRoutes = Router();
courseRoutes.get("/course", courseController.get);
courseRoutes.get("/course/:id", courseController.find);
courseRoutes.post("/course",courseController.add);
courseRoutes.post("/registerToCourse",courseController.registerToCourse);
courseRoutes.delete("/course/:id",courseController.delete);
courseRoutes.put("/unregisterToCourse",courseController.unregisterToCourse);
courseRoutes.post("/generateCoupon",courseController.generateCoupon);
courseRoutes.put("/course/:id/publish", courseController.publish);
courseRoutes.put("/course/:id/depublish", courseController.depublish);
export { courseRoutes };
