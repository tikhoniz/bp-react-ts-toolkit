import { Router } from "express";
import roleMiddleware from "../middleware/role-middleware";
import messageController from "../controllers/message-controller";

const router = Router();

//@ USER
router.post(
	"/create",
	//body("email").isEmail(),
	//body("password").isLength({ min: 4, max: 100 }),
	messageController.createMessage
);

router.get(
	"/user/:email",
	roleMiddleware([process.env.USER_ROLE as string]),
	messageController.getUserMessages
);

//@ ADMIN
router.post(
	"/update/:id",
	roleMiddleware([process.env.ADMIN_ROLE as string]),
	messageController.replyToMessage
);

router.get(
	"/all",
	roleMiddleware([process.env.USER_ROLE as string]),
	messageController.getAllMessages
);

export default router;
