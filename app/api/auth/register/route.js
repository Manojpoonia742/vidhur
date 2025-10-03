import { connectDB } from "@/lib/mongodb";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export async function POST(req) {
  await connectDB();

  try {
    const { name, username, email, password } = await req.json();

    if (!name || !username || !email || !password) {
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    const exists = await User.findOne({ $or: [{ username }, { email }] });
    if (exists) {
      return new Response(JSON.stringify({ error: "Username or email already exists" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, username, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ sub: newUser._id, username: newUser.username }, JWT_SECRET, { expiresIn: "7d" });

    return new Response(JSON.stringify({
      user: { id: newUser._id, name: newUser.name, username: newUser.username, email: newUser.email },
      token
    }), { status: 201 });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
