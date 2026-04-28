import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true }, // HTML content from rich text editor
    author: { type: String, default: 'Jay Gopal Team' },
    tags: [{ type: String }],
    imageUrl: { type: String },
    published: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
