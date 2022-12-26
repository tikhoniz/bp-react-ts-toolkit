import { Router } from "express";
import stripeController from "../controllers/stripe-controller";
import roleMiddleware from "../middleware/role-middleware";

const router = Router();

//@ USER
router.post(
	"/create-checkout-session",
	roleMiddleware([process.env.USER_ROLE as string]),
	stripeController.createSession
);

export default router;
