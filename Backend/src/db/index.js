import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {

  try {
    const connect = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`,
    );
    console.log("Mongodb connected!", connect.connection.host);
  } catch (error) {
    console.log("there is errro in the db connection", error);
    process.exit;
  }
};
export default connectDB;
