import { connectDB } from "@/lib/mongodb";
import Notification from "@/app/models/Notification";
import Post from "@/app/models/Post";
import { authenticate } from "@/lib/auth";

export async function POST(req, { params }) {
  await connectDB();
  // After adding comment
  if (post.user.toString() !== user._id.toString()) {
    await Notification.create({
      user: post.user,    // post owner
      sender: user._id,   // who commented
      type: "comment",
      post: post._id,
    });
  }

  let user;
  try {
    user = await authenticate(req);
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 401 });
  }

  const postId = params.id;
  const { text } = await req.json();
  if (!text) return new Response(JSON.stringify({ error: "Comment text required" }), { status: 400 });

  const post = await Post.findById(postId);
  if (!post) return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });

  post.comments.push({ user: user._id, text });
  await post.save();
  // after saving notification
  if (global.io) {
    global.io.to(post.user.toString()).emit("new-notification", {
      type: "like", // or comment
      sender: user.username,
      postId: post._id,
    });
  }

  return new Response(JSON.stringify({ commentsCount: post.comments.length }));
}



