import mongoose from "mongoose";

export default async function dbConnect() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connnected");
    return conn;
  } catch (error) {
    console.error(error);
  }
}
