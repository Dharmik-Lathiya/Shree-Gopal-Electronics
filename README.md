# 🛒 Jay Gopal Electronics

A modern e-commerce platform built with Next.js 16, featuring email-based OTP authentication, admin dashboard, and a beautiful UI.

## ✨ Features

- 🔐 **Email OTP Authentication** - Secure login with one-time passwords sent via email
- 👤 **User Management** - Role-based access control (User/Admin)
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- 📧 **Professional Email Templates** - Branded OTP emails with security features
- 🔒 **Secure** - OTP expiry, one-time use, email validation
- 📱 **Mobile Responsive** - Works perfectly on all devices

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Email (Required)

**For Gmail:**
1. Go to https://myaccount.google.com/apppasswords
2. Generate an App Password
3. Update `.env.local`:

```env
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-16-char-app-password"
```

📖 **Detailed setup guide:** See `QUICK_START.md`

### 3. Test Email Configuration

```bash
node scripts/test-email.js
```

You should see ✅ success messages and receive a test email.

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📧 Email OTP System

This project uses **email-based OTP authentication** instead of SMS or Firebase Cloud Messaging.

### How it works:
1. User enters their email address
2. System generates a 6-digit OTP (valid for 10 minutes)
3. Professional email is sent with the OTP
4. User enters OTP to log in
5. OTP is cleared after successful login

### Email Template Features:
- 🎨 Professional gradient design
- 🔐 Large, easy-to-read OTP code
- ⏱️ 10-minute validity timer
- ⚠️ Security warnings
- 📱 Mobile-responsive layout

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Authentication:** NextAuth.js v5
- **Database:** MongoDB with Mongoose
- **Email:** Nodemailer
- **Styling:** Tailwind CSS v4
- **UI Components:** Framer Motion, Lucide Icons
- **Language:** TypeScript

## 📁 Project Structure

```
jay-gopal-electronics/
├── app/
│   ├── api/auth/
│   │   ├── send-otp/          # OTP generation & email sending
│   │   └── [...nextauth]/     # NextAuth handlers
│   ├── auth/login/            # Login page
│   └── admin/                 # Admin dashboard
├── lib/
│   ├── email.ts               # Email utility & templates
│   ├── auth.ts                # NextAuth configuration
│   ├── db.ts                  # MongoDB connection
│   └── models/User.ts         # User model
├── scripts/
│   └── test-email.js          # Email configuration test
└── .env.local                 # Environment variables
```

## 🔐 Authentication Flow

```
┌─────────────┐
│ Enter Email │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│ Generate OTP    │
│ (6 digits)      │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ Send Email      │
│ (Beautiful HTML)│
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ User Enters OTP │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ Verify OTP      │
│ Create Session  │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ Login Success ✅│
└─────────────────┘
```

## 📚 Documentation

- **`QUICK_START.md`** - 5-minute setup guide
- **`EMAIL_SETUP.md`** - Comprehensive email configuration guide
- **`MIGRATION_SUMMARY.md`** - Details of FCM → Email migration
- **`CHANGES_OVERVIEW.md`** - Visual overview of changes

## 🧪 Testing

### Test Email Configuration
```bash
node scripts/test-email.js
```

### Test Login Flow
1. Navigate to http://localhost:3000/auth/login
2. Enter your email
3. Check your inbox for OTP
4. Enter OTP and log in

## 🌐 Environment Variables

Required variables in `.env.local`:

```env
# Authentication
AUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Database
MONGODB_URI="your-mongodb-connection-string"

# Email (Required for OTP)
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"
```

## 🚀 Production Deployment

### 1. Choose Email Service
For production, consider:
- **SendGrid** - 99% deliverability
- **Mailgun** - Great for transactional emails
- **Amazon SES** - Cost-effective

### 2. Set Environment Variables
Add all required variables to your hosting platform.

### 3. Configure Email Authentication
Set up SPF, DKIM, and DMARC records for better deliverability.

### 4. Deploy
```bash
npm run build
npm start
```

## 🐛 Troubleshooting

### Email not sending?
1. Check `.env.local` has correct credentials
2. For Gmail, use App Password (not regular password)
3. Run `node scripts/test-email.js` to diagnose
4. Check console logs for errors

### OTP not working?
1. Check if OTP expired (10-minute limit)
2. Ensure exact OTP match (case-sensitive)
3. Request a new OTP
4. Verify MongoDB connection

### Development Mode
If email fails in development:
- OTP is logged to console
- Response includes `devOTP` field
- Works only when `NODE_ENV=development`

## 📝 API Endpoints

### Send OTP
```
POST /api/auth/send-otp
Content-Type: application/json

{
  "email": "user@example.com",
  "phone": "1234567890"  // optional
}
```

### Login (NextAuth)
```
POST /api/auth/callback/credentials

{
  "email": "user@example.com",
  "otp": "123456"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is private and proprietary.

## 🆘 Support

For issues or questions:
- Check the documentation files
- Review console logs
- Run the test script
- Verify environment variables

---

**Built with ❤️ using Next.js**

**Last Updated:** February 2026
