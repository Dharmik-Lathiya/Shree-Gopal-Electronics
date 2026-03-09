# 🚀 Quick Start - Email OTP Setup

## Step 1: Get Gmail App Password (2 minutes)

1. Go to https://myaccount.google.com/apppasswords
2. Sign in to your Google Account
3. Select "Mail" and "Other (Custom name)"
4. Name it: "Jay Gopal Electronics"
5. Click "Generate"
6. **Copy the 16-character password** (remove spaces)

## Step 2: Update Environment Variables

Open `.env.local` and update:

```env
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="abcd efgh ijkl mnop"  # Your 16-char App Password (spaces optional)
```

## Step 3: Test Email Configuration

Run the test script:

```bash
node scripts/test-email.js
```

You should see:
```
✅ Environment variables found
✅ SMTP connection successful
✅ Test email sent successfully!
```

Check your email inbox for the test email.

## Step 4: Start Development Server

```bash
npm run dev
```

## Step 5: Test Login Flow

1. Open http://localhost:3000/auth/login
2. Enter your email address
3. Click "Send OTP"
4. Check your email for the 6-digit code
5. Enter the code and click "Verify OTP"
6. You should be logged in! ✅

## 🎉 That's it!

Your email-based OTP system is now working!

---

## 📧 Email Template Preview

When users request an OTP, they'll receive a beautiful email with:

- 🎨 Professional gradient header
- 🔐 Large, easy-to-read OTP code
- ⏱️ 10-minute validity timer
- ⚠️ Security warnings
- 📱 Mobile-responsive design

---

## 🐛 Troubleshooting

### "Authentication failed" error?
- Make sure you're using an **App Password**, not your regular Gmail password
- Enable 2-Step Verification first

### Email not arriving?
- Check spam/junk folder
- Verify `EMAIL_USER` and `EMAIL_PASSWORD` in `.env.local`
- Run `node scripts/test-email.js` to diagnose

### "Module not found: nodemailer"?
```bash
npm install nodemailer @types/nodemailer
```

---

## 🔒 Security Notes

- OTPs expire after **10 minutes**
- Each OTP can only be used **once**
- Never share your App Password
- Use HTTPS in production

---

## 📚 Need More Help?

- Full setup guide: `EMAIL_SETUP.md`
- Migration details: `MIGRATION_SUMMARY.md`
- Test script: `scripts/test-email.js`

---

**Ready to go!** 🚀
