import jwt from "jsonwebtoken";
import User from "@/app/models/User";
import { connectDB } from "@/lib/mongodb";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export async function authenticate(req) {
  await connectDB();
  const authHeader = req.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.sub).select("-password");
    if (!user) throw new Error("User not found");
    return user;
  } catch (err) {
    throw new Error("Unauthorized");
  }
}
