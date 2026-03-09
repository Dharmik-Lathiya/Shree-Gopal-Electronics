import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
    // Product & User
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    },

    // Review Content
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    title: { type: String, maxlength: 100 },
    comment: { type: String, required: true, maxlength: 1000 },

    // Media
    images: [{ type: String }],
    videos: [{ type: String }],

    // Verification
    isVerifiedPurchase: { type: Boolean, default: false },

    // Moderation
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'spam'],
        default: 'pending'
    },
    moderatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    moderatedAt: { type: Date },
    rejectionReason: { type: String },

    // Engagement
    helpfulCount: { type: Number, default: 0 },
    notHelpfulCount: { type: Number, default: 0 },
    helpfulVotes: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        vote: { type: String, enum: ['helpful', 'not_helpful'] },
        votedAt: { type: Date, default: Date.now }
    }],

    // Seller Response
    sellerResponse: {
        comment: String,
        respondedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        respondedAt: Date
    },

    // Flags
    isFeatured: { type: Boolean, default: false },
    isReported: { type: Boolean, default: false },
    reportCount: { type: Number, default: 0 },

    // Metadata
    ipAddress: { type: String },
    userAgent: { type: String },

}, { timestamps: true });

// Indexes
ReviewSchema.index({ product: 1, status: 1, createdAt: -1 });
ReviewSchema.index({ user: 1, createdAt: -1 });
ReviewSchema.index({ rating: 1 });
ReviewSchema.index({ isVerifiedPurchase: 1, status: 1 });
ReviewSchema.index({ isFeatured: 1, status: 1 });

// Compound index for preventing duplicate reviews
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

// Method to vote helpful
ReviewSchema.methods.addHelpfulVote = function (userId: string, voteType: 'helpful' | 'not_helpful') {
    // Remove existing vote from this user
    this.helpfulVotes = this.helpfulVotes.filter((v: any) => v.user.toString() !== userId);

    // Add new vote
    this.helpfulVotes.push({
        user: userId,
        vote: voteType,
        votedAt: new Date()
    });

    // Recalculate counts
    this.helpfulCount = this.helpfulVotes.filter((v: any) => v.vote === 'helpful').length;
    this.notHelpfulCount = this.helpfulVotes.filter((v: any) => v.vote === 'not_helpful').length;
};

// Static method to calculate average rating for a product
ReviewSchema.statics.calculateProductRating = async function (productId: string) {
    const result = await this.aggregate([
        {
            $match: {
                product: new mongoose.Types.ObjectId(productId),
                status: 'approved'
            }
        },
        {
            $group: {
                _id: null,
                averageRating: { $avg: '$rating' },
                totalReviews: { $sum: 1 },
                ratingDistribution: {
                    $push: '$rating'
                }
            }
        }
    ]);

    if (result.length === 0) {
        return { averageRating: 0, totalReviews: 0, distribution: {} };
    }

    const data = result[0];

    // Calculate distribution
    const distribution: any = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    data.ratingDistribution.forEach((rating: number) => {
        distribution[rating] = (distribution[rating] || 0) + 1;
    });

    return {
        averageRating: Math.round(data.averageRating * 10) / 10,
        totalReviews: data.totalReviews,
        distribution
    };
};

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);
