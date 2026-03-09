import mongoose from 'mongoose';

const CouponSchema = new mongoose.Schema({
    // Basic Info
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },
    description: { type: String },

    // Discount Configuration
    discountType: {
        type: String,
        enum: ['percent', 'flat'],
        required: true
    },
    discountValue: {
        type: Number,
        required: true,
        min: 0
    },

    // Restrictions
    minOrderValue: { type: Number, default: 0 },
    maxDiscountAmount: { type: Number }, // For percentage discounts

    // Applicability
    applicableCategories: [{ type: String }], // Empty = all categories
    applicableProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    excludedProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],

    // User Restrictions
    applicableUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }], // Empty = all users
    firstOrderOnly: { type: Boolean, default: false },

    // Usage Limits
    usageLimit: { type: Number }, // Total usage limit
    usageLimitPerUser: { type: Number, default: 1 },
    usageCount: { type: Number, default: 0 },

    // Validity
    startDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },

    // Status
    isActive: { type: Boolean, default: true },

    // Tracking
    usedBy: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        usedAt: { type: Date, default: Date.now },
        orderNumber: String,
        discountAmount: Number
    }],

    // Metadata
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

}, { timestamps: true });

// Indexes
CouponSchema.index({ code: 1 });
CouponSchema.index({ isActive: 1, expiryDate: 1 });
CouponSchema.index({ applicableCategories: 1 });

// Method to check if coupon is valid
CouponSchema.methods.isValid = function (userId?: string, orderValue?: number, category?: string) {
    const now = new Date();

    // Check if active
    if (!this.isActive) {
        return { valid: false, message: 'Coupon is not active' };
    }

    // Check dates
    if (now < this.startDate) {
        return { valid: false, message: 'Coupon is not yet active' };
    }
    if (now > this.expiryDate) {
        return { valid: false, message: 'Coupon has expired' };
    }

    // Check usage limit
    if (this.usageLimit && this.usageCount >= this.usageLimit) {
        return { valid: false, message: 'Coupon usage limit reached' };
    }

    // Check user-specific usage
    if (userId) {
        const userUsage = this.usedBy.filter((u: any) => u.user.toString() === userId).length;
        if (this.usageLimitPerUser && userUsage >= this.usageLimitPerUser) {
            return { valid: false, message: 'You have already used this coupon' };
        }
    }

    // Check minimum order value
    if (orderValue && orderValue < this.minOrderValue) {
        return {
            valid: false,
            message: `Minimum order value of ₹${this.minOrderValue} required`
        };
    }

    // Check category restriction
    if (category && this.applicableCategories.length > 0) {
        if (!this.applicableCategories.includes(category)) {
            return { valid: false, message: 'Coupon not applicable for this category' };
        }
    }

    return { valid: true, message: 'Coupon is valid' };
};

// Method to calculate discount
CouponSchema.methods.calculateDiscount = function (orderValue: number) {
    if (this.discountType === 'flat') {
        return Math.min(this.discountValue, orderValue);
    } else {
        const discount = (orderValue * this.discountValue) / 100;
        if (this.maxDiscountAmount) {
            return Math.min(discount, this.maxDiscountAmount);
        }
        return discount;
    }
};

// Method to record usage
CouponSchema.methods.recordUsage = function (userId: string, orderNumber: string, discountAmount: number) {
    this.usageCount += 1;
    this.usedBy.push({
        user: userId,
        usedAt: new Date(),
        orderNumber,
        discountAmount
    });
};

export default mongoose.models.Coupon || mongoose.model('Coupon', CouponSchema);
