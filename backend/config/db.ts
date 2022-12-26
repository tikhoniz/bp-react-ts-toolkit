import mongoose from "mongoose";

const connectDB = () => {
	try {
		mongoose.set("strictQuery", false);
		mongoose.connect(
			`mongodb://${process.env.MONGO_DB_USER_NAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOSTNAME}:27017/${process.env.MONGO_DB_BASE_NAME}?authSource=admin`,
			() => console.log(`Successful MongoDB connection`)
		);
	} catch (error: any) {
		console.error(`Error: ${error.message}`);
		process.exit(1);
	}
};

export default connectDB;
