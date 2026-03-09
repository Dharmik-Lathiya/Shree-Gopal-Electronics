import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    productTitle: { type: String, required: true },
    productImage: { type: String },
    variant: {
        sku: String,
        name: String,
        attributes: Map
    },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true }, // Price at time of purchase
    subtotal: { type: Number, required: true }
});

const OrderSchema = new mongoose.Schema({
    // Order Identification
    orderNumber: {
        type: String,
        required: true,
        unique: true
    },

    // Customer Info
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },

    // Order Items
    items: [OrderItemSchema],

    // Pricing
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    couponCode: { type: String },
    shippingCost: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },

    // Shipping Address
    shippingAddress: {
        fullName: { type: String, required: true },
        phone: { type: String, required: true },
        addressLine1: { type: String, required: true },
        addressLine2: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true },
        country: { type: String, default: 'India' },
        landmark: { type: String }
    },

    // Billing Address (optional, defaults to shipping)
    billingAddress: {
        fullName: String,
        phone: String,
        addressLine1: String,
        addressLine2: String,
        city: String,
        state: String,
        pincode: String,
        country: String
    },

    // Payment
    paymentMethod: {
        type: String,
        enum: ['cod', 'online', 'wallet'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed', 'refunded'],
        default: 'pending'
    },
    paymentId: { type: String }, // Razorpay/Stripe payment ID
    paymentDetails: {
        gateway: String,
        transactionId: String,
        paidAt: Date
    },

    // Order Status
    orderStatus: {
        type: String,
        enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
        default: 'pending'
    },

    // Status Timeline
    statusHistory: [{
        status: String,
        note: String,
        updatedBy: String,
        timestamp: { type: Date, default: Date.now }
    }],

    // Shipping & Tracking
    shippingMethod: { type: String },
    trackingNumber: { type: String },
    courierPartner: { type: String },
    estimatedDelivery: { type: Date },
    shippedAt: { type: Date },
    deliveredAt: { type: Date },

    // Cancellation & Return
    cancellationReason: { type: String },
    cancelledAt: { type: Date },
    returnReason: { type: String },
    returnedAt: { type: Date },
    refundAmount: { type: Number },
    refundedAt: { type: Date },

    // Notes
    customerNotes: { type: String },
    adminNotes: { type: String },

    // Metadata
    ipAddress: { type: String },
    userAgent: { type: String },

}, { timestamps: true });

// Indexes
OrderSchema.index({ orderNumber: 1 });
OrderSchema.index({ user: 1, createdAt: -1 });
OrderSchema.index({ orderStatus: 1, createdAt: -1 });
OrderSchema.index({ paymentStatus: 1 });
OrderSchema.index({ 'shippingAddress.pincode': 1 });

// Pre-save hook to generate order number
OrderSchema.pre('save', async function (next) {
    if (!this.orderNumber) {
        const count = await mongoose.model('Order').countDocuments();
        const date = new Date();
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const orderNum = (count + 1).toString().padStart(5, '0');
        this.orderNumber = `ORD${year}${month}${orderNum}`;
    }
    next();
});

// Method to add status update
OrderSchema.methods.addStatusUpdate = function (status: string, note?: string, updatedBy?: string) {
    this.orderStatus = status;
    this.statusHistory.push({
        status,
        note,
        updatedBy,
        timestamp: new Date()
    });

    // Update specific timestamps
    if (status === 'shipped') this.shippedAt = new Date();
    if (status === 'delivered') this.deliveredAt = new Date();
    if (status === 'cancelled') this.cancelledAt = new Date();
    if (status === 'returned') this.returnedAt = new Date();
};

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
