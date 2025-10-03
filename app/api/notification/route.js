import { connectDB } from "@/lib/mongodb";
import Notification from "@/app/models/Notification";
import { authenticate } from "@/lib/auth";

export async function GET() {
  await connectDB();

  let user;
  try {
    user = await authenticate(req);
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 401 });
  }

  // Get latest notifications for the user
  const notifications = await Notification.find({ user: user._id })
    .sort({ createdAt: -1 })
    .populate("sender", "username name avatar_url")
    .populate("post", "text media")
    .lean();

  return new Response(JSON.stringify(notifications), { status: 200 });
}
