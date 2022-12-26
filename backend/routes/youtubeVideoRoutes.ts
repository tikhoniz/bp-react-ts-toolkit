import { Router } from "express";
import roleMiddleware from "../middleware/role-middleware";
import youtubeVideoController from "../controllers/youtube-video-controller";

const router = Router();

//@ USER
router.get("/videos", youtubeVideoController.getAllVideos);

//@ ADMIN
router.post(
	"/create",
	roleMiddleware([process.env.ADMIN_ROLE as string]),
	youtubeVideoController.create
);
router.post(
	"/update/:id",
	roleMiddleware([process.env.ADMIN_ROLE as string]),
	youtubeVideoController.update
);
router.delete(
	"/delete/:id",
	roleMiddleware([process.env.ADMIN_ROLE as string]),
	youtubeVideoController.delete
);

export default router;
