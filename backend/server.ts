//import dotenv from "dotenv";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";
import bodyParser from "body-parser";
import errorMiddleware from "./middleware/error-middleware";
// routers
import userRoutes from "./routes/userRoutes";
import zoomRoutes from "./routes/zoomRoutes";
import orderRoutes from "./routes/orderRoutes";
import eventsRoutes from "./routes/eventsRoutes";
import stripeRoutes from "./routes/stripeRoutes";
import messageRoutes from "./routes/messageRoutes";
import webhooksRoutes from "./routes/webhooksRoutes";
import youtubeVideoRoutes from "./routes/youtubeVideoRoutes";

const PORT = process.env.PORT || 5000;

// connect to database
connectDB();

const app = express();

// CORS Headers => Required for cross-origin/ cross-server communication
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(
	"/api/webhooks",
	bodyParser.raw({ type: "application/json" }),
	webhooksRoutes
);
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
// routes
app.use("/api/zoom", zoomRoutes);
//app.use("/api/blog", blogRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/youtube-videos", youtubeVideoRoutes);
// error
app.use(errorMiddleware); //* middleware ошибок всегда идет последним в цепочке

app.listen(PORT, () => {
	console.log(
		`Server on running in ${process.env.NODE_ENV} mode on port ${PORT}`
	);
});
