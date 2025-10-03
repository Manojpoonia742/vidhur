import { connectDB } from "@/lib/mongodb";
import Notification from "@/app/models/Notification";
import Post from "@/app/models/Post";
import { authenticate } from "@/lib/auth";

export async function POST(req, { params }) {
  await connectDB();
  
  // After liking the post
  if (likedIndex === -1 && post.user.toString() !== user._id.toString()) {
    await Notification.create({
      user: post.user,    // post owner
      sender: user._id,   // who liked
      type: "like",
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
  const post = await Post.findById(postId);
  if (!post) return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });

  const likedIndex = post.likes.indexOf(user._id);
  if (likedIndex === -1) {
    post.likes.push(user._id); // like
  } else {
    post.likes.splice(likedIndex, 1); // unlike
  }

  await post.save();
  // after saving notification
  if (global.io) {
    global.io.to(post.user.toString()).emit("new-notification", {
      type: "like", // or comment
      sender: user.username,
      postId: post._id,
    });
  }
  return new Response(JSON.stringify({ likesCount: post.likes.length }));


}



