import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true, sparse: true },
    phone: { type: String, unique: true, sparse: true },
    otp: { type: String },
    otpExpiry: { type: Date },
    fcmToken: { type: String }, // For push notifications
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
