import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true }, // e.g., 'Smart TV', 'Audio'
    features: [{ type: String }],
    description: { type: String },
    specifications: { type: Map, of: String }, // Key-value pairs for technical specs
    imageUrl: { type: String },
    isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
