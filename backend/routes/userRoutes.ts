import { Router } from "express";
import { body } from "express-validator";
// middleware
import roleMiddleware from "../middleware/role-middleware";
// controllers
import userController from "../controllers/user-controller";

const router = Router();
//console.log("process.env.USER_ROLE", process.env.NODE_ENV);

//@ AUTH SOCIAL
router.post("/authSocial", userController.authSocial);

// @ AUTH CREDENTIAL
router.post(
	"/registration",
	body("email").isEmail(),
	body("password").isLength({ min: 4, max: 100 }),
	userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post(
	"/password/:email/sendlink",
	userController.sendLinkToChangePassword
);
router.post("/password/reset/:token", userController.setNewUserPassword);
router.post("/send/confirmationEmail", userController.sendConfirmationEmail);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);

//@ USER
router.get(
	"/all",
	roleMiddleware([process.env.ADMIN_ROLE as string]),
	userController.getUsers
);
router.post(
	"/update/:id",
	roleMiddleware([process.env.USER_ROLE as string]),
	userController.updateUser
);

//@ EVENTS
router.post(
	"/event/registration",
	roleMiddleware([process.env.USER_ROLE as string]),
	userController.registerForEvent
);

router.post(
	"/event/cancel",
	roleMiddleware([process.env.USER_ROLE as string]),
	userController.cancelEvent
);

//@ ZOOM
router.post(
	"/zoom",
	roleMiddleware([process.env.USER_ROLE as string]),
	userController.changeZoomMode
);

export default router;
