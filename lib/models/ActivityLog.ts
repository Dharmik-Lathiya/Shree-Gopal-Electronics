import mongoose from 'mongoose';

const ActivityLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userName: { type: String },
    userEmail: { type: String },
    action: {
        type: String,
        required: true,
        enum: ['create', 'update', 'delete', 'login', 'logout']
    },
    resource: {
        type: String,
        required: true,
        enum: ['product', 'blog', 'user', 'auth']
    },
    resourceId: { type: String },
    details: { type: String },
    ipAddress: { type: String },
    userAgent: { type: String },
}, { timestamps: true });

// Index for faster queries
ActivityLogSchema.index({ createdAt: -1 });
ActivityLogSchema.index({ user: 1, createdAt: -1 });
ActivityLogSchema.index({ resource: 1, action: 1 });

export default mongoose.models.ActivityLog || mongoose.model('ActivityLog', ActivityLogSchema);
