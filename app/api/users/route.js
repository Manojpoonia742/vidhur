import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

// User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String, // we’ll encrypt later
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

// API Handler
export async function GET() {
  await connectDB();
  const users = await User.find();
  return Response.json(users);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const newUser = new User(data);
  await newUser.save();
  return Response.json({ message: "User created", user: newUser });
}
