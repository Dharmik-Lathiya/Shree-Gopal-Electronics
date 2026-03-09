# Email OTP Setup Guide

## Overview
The application now uses **email-based OTP authentication** instead of Firebase Cloud Messaging (FCM). Users will receive a 6-digit OTP code via email to log in.

## Email Service Configuration

### Using Gmail (Recommended for Development)

1. **Enable 2-Step Verification**
   - Go to your Google Account: https://myaccount.google.com/
   - Navigate to Security → 2-Step Verification
   - Enable it if not already enabled

2. **Generate App Password**
   - Visit: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Enter "Jay Gopal Electronics" as the name
   - Click "Generate"
   - Copy the 16-character password (remove spaces)

3. **Update .env.local**
   ```env
   EMAIL_USER="your-email@gmail.com"
   EMAIL_PASSWORD="your-16-char-app-password"
   ```

### Using Other Email Services

#### SendGrid
```env
EMAIL_SERVICE="sendgrid"
EMAIL_USER="apikey"
EMAIL_PASSWORD="your-sendgrid-api-key"
```

Update `lib/email.ts` transporter:
```typescript
const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});
```

#### Mailgun
```env
EMAIL_SERVICE="mailgun"
EMAIL_USER="your-mailgun-username"
EMAIL_PASSWORD="your-mailgun-password"
```

Update `lib/email.ts` transporter:
```typescript
const transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});
```

## How It Works

### 1. User Requests OTP
- User enters their email address
- System generates a random 6-digit OTP
- OTP is stored in database with 10-minute expiry
- Professional HTML email is sent with the OTP

### 2. User Receives Email
The email includes:
- Beautiful gradient header with company branding
- Large, easy-to-read OTP code
- 10-minute validity timer
- Security warning about not sharing OTP
- Professional footer

### 3. User Logs In
- User enters the OTP received via email
- System verifies OTP and expiry time
- On success, OTP is cleared from database
- User is authenticated and session is created

## API Endpoints

### Send OTP
**POST** `/api/auth/send-otp`

Request body:
```json
{
  "email": "user@example.com",
  "phone": "1234567890" // optional
}
```

Success response:
```json
{
  "success": true,
  "message": "OTP sent to your email address",
  "sentVia": "email",
  "email": "user@example.com"
}
```

### Verify OTP (Login)
**POST** `/api/auth/callback/credentials`

Uses NextAuth credentials provider with:
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

## Development Mode

In development mode (when email sending fails):
- OTP is logged to console
- Response includes `devOTP` field with the OTP
- `sentVia` is set to "console"

Example dev response:
```json
{
  "success": true,
  "message": "OTP generated (check console in dev mode)",
  "sentVia": "console",
  "devOTP": "123456"
}
```

## Security Features

1. **OTP Expiry**: All OTPs expire after 10 minutes
2. **One-time Use**: OTP is cleared after successful verification
3. **Email Validation**: Strict email format validation
4. **Secure Storage**: OTPs stored temporarily in MongoDB
5. **HTTPS Required**: Use HTTPS in production for secure transmission

## Email Template Features

- 📧 Professional HTML design with inline CSS
- 🎨 Gradient branding colors
- 📱 Mobile-responsive layout
- ⏱️ Clear validity timer
- ⚠️ Security warnings
- 🔒 Company branding

## Troubleshooting

### Email Not Sending

1. **Check credentials**
   ```bash
   # Verify .env.local has correct values
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   ```

2. **Test email configuration**
   - The system logs email send status to console
   - Look for "✅ Email sent successfully" or error messages

3. **Gmail specific issues**
   - Ensure 2-Step Verification is enabled
   - Use App Password, not regular password
   - Check "Less secure app access" is not blocking

4. **Firewall/Network issues**
   - Ensure port 587 (SMTP) is not blocked
   - Check if your ISP blocks SMTP

### OTP Not Working

1. **Check expiry**: OTPs expire after 10 minutes
2. **Case sensitive**: Ensure exact OTP match
3. **Database connection**: Verify MongoDB connection
4. **Clear old OTPs**: Request a new OTP if issues persist

## Migration from FCM

The following changes were made:

✅ **Removed:**
- Firebase client SDK (`lib/firebase.ts`)
- Firebase Admin SDK (`lib/firebase-admin.ts`)
- FCM token field from User model
- All Firebase environment variables
- `firebase-admin` npm package

✅ **Added:**
- Email utility (`lib/email.ts`)
- Nodemailer package
- Email configuration in `.env.local`
- Professional HTML email template

✅ **Updated:**
- `/api/auth/send-otp` - Now uses email instead of FCM
- `lib/auth.ts` - Changed from phone to email authentication
- User model - Removed `fcmToken` field

## Production Deployment

1. **Set environment variables** on your hosting platform:
   ```
   EMAIL_USER=your-production-email@gmail.com
   EMAIL_PASSWORD=your-production-app-password
   ```

2. **Use a dedicated email service** (recommended):
   - SendGrid (99% deliverability)
   - Mailgun (great for transactional emails)
   - Amazon SES (cost-effective)

3. **Monitor email delivery**:
   - Set up email delivery monitoring
   - Track bounce rates
   - Monitor spam complaints

4. **Set up SPF, DKIM, DMARC** records for better deliverability

## Support

For issues or questions:
- Check console logs for detailed error messages
- Verify all environment variables are set correctly
- Ensure MongoDB connection is working
- Test email configuration separately

---

**Last Updated**: February 2026
**Version**: 1.0.0
