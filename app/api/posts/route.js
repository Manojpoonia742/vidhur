import { connectDB } from "@/lib/mongodb";
import Post from "@/app/models/Post";
import { authenticate } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
  await connectDB();

  // Fetch posts in descending order (newest first)
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .populate("user", "username name avatar_url") // get user info
    .lean(); // convert Mongoose docs to plain objects

  // Format posts for frontend
  const formattedPosts = posts.map(post => ({
    id: post._id,
    user: {
      id: post.user._id,
      username: post.user.username,
      name: post.user.name,
      avatar_url: post.user.avatar_url || "",
    },
    text: post.text,
    media: post.media,
    type: post.type,
    likesCount: post.likes.length,
    commentsCount: post.comments.length,
    createdAt: post.createdAt,
  }));

  return new Response(JSON.stringify(formattedPosts), { status: 200 });
}

export async function POST(req) {
  await connectDB();

  let user;
  try {
    user = await authenticate(req);
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 401 });
  }

  const data = await req.json();
  const { text, mediaBase64, type } = data;

  let mediaUrl = "";

  if (mediaBase64) {
    try {
      const uploadResponse = await cloudinary.uploader.upload(mediaBase64, {
        folder: "vidhur_posts",
        resource_type: type === "video" ? "video" : "image",
      });
      mediaUrl = uploadResponse.secure_url;
    } catch (err) {
      return new Response(JSON.stringify({ error: "Media upload failed" }), { status: 500 });
    }
  }

  if (!text && !mediaUrl) {
    return new Response(JSON.stringify({ error: "Post content required" }), { status: 400 });
  }

  const newPost = new Post({
    user: user._id,
    text: text || "",
    media: mediaUrl,
    type: type || (mediaUrl ? type : "text"),
  });

  await newPost.save();

  return new Response(JSON.stringify(newPost), { status: 201 });
}
