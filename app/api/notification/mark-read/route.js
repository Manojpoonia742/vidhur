import { connectDB } from "@/lib/mongodb";
import Notification from "@/app/models/Notification";
import { authenticate } from "@/lib/auth";

export async function POST(req) {
  try {
    await connectDB();

    let user;
    try {
      user = await authenticate(req);
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), { status: 401 });
    }

    await Notification.updateMany(
      { user: user._id, read: false },
      { read: true }
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
