import { Router } from "express";
import zoomController from "../controllers/zoom-controller";

const router = Router();

router.post("/getSignature", zoomController.generateSignature);
router.get("/zoomMeeting/:id", zoomController.getZoomMeetting);

export default router;
