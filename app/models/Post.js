import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: { type: String, default: "" },
  media: { type: String, default: "" },
  type: { type: String, enum: ["text", "image", "video"], default: "text" },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // changed
  comments: [CommentSchema], // changed
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
export default Post;