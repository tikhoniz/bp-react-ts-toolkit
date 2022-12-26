import { Router } from "express";
// controllers
import StripeController from "../controllers/stripe-controller";

const webhooksRoutes = Router();

//@ API STRIPE
// webhook
webhooksRoutes.post("/stripe", StripeController.webhook);

export default webhooksRoutes;
