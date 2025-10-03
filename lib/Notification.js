import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // who receives the notification
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // who triggered it
  type: { type: String, enum: ["like", "comment"], required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }, // optional, post related
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Notification = mongoose.models.Notification || mongoose.model("Notification", NotificationSchema);
export default Notification