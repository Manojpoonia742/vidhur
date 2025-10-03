import { connectDB } from "@/lib/mongodb";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export async function POST(req) {
  await connectDB();

  let body;
  try {
    body = await req.json();
  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }

  const { email, password } = body;

  if (!email || !password) {
    return new Response(JSON.stringify({ error: "Missing credentials" }), { status: 400 });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
  }

  const token = jwt.sign(
    { sub: user._id, username: user.username },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return new Response(
    JSON.stringify({ user: { id: user._id, username: user.username, name: user.name }, token }),
    { status: 200 }
  );
}
