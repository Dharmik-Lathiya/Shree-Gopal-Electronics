import mongoose from 'mongoose';

const VariantSchema = new mongoose.Schema({
    sku: { type: String, required: true, unique: true },
    name: { type: String }, // e.g., "Black - Medium"
    attributes: {
        type: Map,
        of: String // { size: "M", color: "Black", storage: "128GB" }
    },
    price: { type: Number, required: true },
    compareAtPrice: { type: Number }, // Original price for discount display
    stock: { type: Number, default: 0 },
    lowStockThreshold: { type: Number, default: 5 },
    isAvailable: { type: Boolean, default: true },
    images: [{ type: String }]
});

const ProductSchema = new mongoose.Schema({
    // Basic Info
    title: { type: String, required: true },
    slug: { type: String, unique: true, sparse: true },
    category: { type: String, required: true },
    subCategory: { type: String },
    brand: { type: String },

    // Content
    description: { type: String },
    shortDescription: { type: String, maxlength: 200 },
    features: [{ type: String }],
    specifications: { type: Map, of: String },

    // Media
    imageUrl: { type: String },
    images: [{ type: String }],
    videoUrl: { type: String },

    // Pricing (for simple products without variants)
    price: { type: Number },
    compareAtPrice: { type: Number },
    costPrice: { type: Number }, // For profit calculation

    // Inventory (for simple products)
    stock: { type: Number, default: 0 },
    lowStockThreshold: { type: Number, default: 5 },
    sku: { type: String, unique: true, sparse: true },

    // Variants (for complex products)
    hasVariants: { type: Boolean, default: false },
    variants: [VariantSchema],
    variantOptions: [{
        name: String, // e.g., "Size", "Color"
        values: [String] // e.g., ["S", "M", "L"]
    }],

    // Product Type
    productType: {
        type: String,
        enum: ['physical', 'digital'],
        default: 'physical'
    },

    // Digital Product Fields
    downloadUrl: { type: String },
    downloadLimit: { type: Number },
    licenseKey: { type: String },
    fileSize: { type: String },

    // Status & Visibility
    status: {
        type: String,
        enum: ['draft', 'active', 'archived'],
        default: 'active'
    },
    isAvailable: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },

    // SEO
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: [{ type: String }],

    // Analytics
    viewCount: { type: Number, default: 0 },
    salesCount: { type: Number, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },

    // Shipping (for physical products)
    weight: { type: Number }, // in kg
    dimensions: {
        length: Number,
        width: Number,
        height: Number
    },
    shippingClass: { type: String },

    // Tags & Organization
    tags: [{ type: String }],
    collections: [{ type: String }],

    // Timestamps
    publishedAt: { type: Date },

}, { timestamps: true });

// Indexes for performance
ProductSchema.index({ title: 'text', description: 'text', tags: 'text' });
ProductSchema.index({ category: 1, status: 1 });
ProductSchema.index({ isFeatured: 1, status: 1 });
// Note: 'variants.sku' and 'slug' indexes are already created via unique: true in schema

// Virtual for checking if product is in stock
ProductSchema.virtual('inStock').get(function () {
    if (this.hasVariants) {
        return this.variants.some(v => v.stock > 0 && v.isAvailable);
    }
    return this.stock > 0;
});

// Virtual for checking low stock
ProductSchema.virtual('isLowStock').get(function () {
    if (this.hasVariants) {
        return this.variants.some(v => v.stock <= v.lowStockThreshold && v.stock > 0);
    }
    return this.stock <= this.lowStockThreshold && this.stock > 0;
});

// Method to get price range for variant products
ProductSchema.methods.getPriceRange = function () {
    if (!this.hasVariants || this.variants.length === 0) {
        return { min: this.price, max: this.price };
    }

    const prices = this.variants.map(v => v.price);
    return {
        min: Math.min(...prices),
        max: Math.max(...prices)
    };
};

// Pre-save hook to generate slug
ProductSchema.pre('save', function (next) {
    if (this.isModified('title') && !this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
    next();
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
