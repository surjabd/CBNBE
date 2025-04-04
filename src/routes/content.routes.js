import { Router } from "express";
import contentController from "../controllers/content.controller";
const multer  = require('multer')
const upload = multer({ dest: 'temp_uploads/' })
const contentRoutes = Router();
contentRoutes.get("/content/:id", contentController.find);
contentRoutes.post("/content",contentController.add);
contentRoutes.put("/content/:id",contentController.update);
contentRoutes.delete("/content/:id",contentController.delete);
contentRoutes.post("/upload",upload.single('file'), contentController.uploadtoS3);
export { contentRoutes };
