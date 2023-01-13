import { Router } from "express";
//middleware
import roleMiddleware from "../middleware/role-middleware";
// controllers
import eventController from "../controllers/event-controller";

const router = Router();

//@ USER
router.get("/upcoming", eventController.getUpcomingEvents);
router.get(
	"/completed",
	roleMiddleware([process.env.USER_ROLE as string]),
	eventController.getUserCompletedEvents
);

//@ ADMIN
router.post(
	"/create",
	roleMiddleware([process.env.ADMIN_ROLE as string]),
	eventController.create
);
router.post(
	"/update/:id",
	roleMiddleware([process.env.ADMIN_ROLE as string]),
	eventController.update
);
router.post(
	"/delete/:id",
	roleMiddleware([process.env.ADMIN_ROLE as string]),
	eventController.delete
);

router.get(
	"/all",
	roleMiddleware([process.env.ADMIN_ROLE as string]),
	eventController.getEvents
);

export default router;
