import { Router } from "express";
import orderController from "../controllers/order-controller";
import roleMiddleware from "../middleware/role-middleware";

const router = Router();

//@ USER
router.post(
	"/create",
	roleMiddleware([process.env.USER_ROLE as string]),
	orderController.createOrder
);
router.get(
	"/user/:id/paid",
	roleMiddleware([process.env.USER_ROLE as string]),
	orderController.getUsersOrderList
);

router.get(
	"/user/:id/lastPaid",
	roleMiddleware([process.env.USER_ROLE as string]),
	orderController.getUsersOrderLastOne
);

export default router;
