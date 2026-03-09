/**
 * Email Configuration Test Script
 * 
 * This script tests your email configuration to ensure OTP emails can be sent.
 * Run this before deploying to production.
 * 
 * Usage: node scripts/test-email.js
 */

const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

// Email template for testing
function getTestEmailTemplate(otp) {
    return `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px; }
        .otp { font-size: 36px; font-weight: bold; color: #667eea; text-align: center; margin: 30px 0; letter-spacing: 5px; }
        .footer { text-align: center; color: #666; margin-top: 30px; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔐 Test Email - Jay Gopal Electronics</h1>
        </div>
        <h2>Email Configuration Test</h2>
        <p>If you're seeing this email, your email configuration is working correctly!</p>
        <div class="otp">${otp}</div>
        <p>This is a test OTP code. In production, users will receive emails like this when they request to log in.</p>
        <div class="footer">
            <p>This is an automated test email</p>
            <p>&copy; ${new Date().getFullYear()} Jay Gopal Electronics</p>
        </div>
    </div>
</body>
</html>
    `;
}

async function testEmailConfiguration() {
    console.log('🧪 Testing Email Configuration...\n');

    // Check environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
        console.error('❌ ERROR: EMAIL_USER and EMAIL_PASSWORD must be set in .env.local');
        console.log('\nPlease add the following to your .env.local file:');
        console.log('EMAIL_USER="your-email@gmail.com"');
        console.log('EMAIL_PASSWORD="your-app-password"');
        console.log('\nFor Gmail, generate an App Password at:');
        console.log('https://myaccount.google.com/apppasswords\n');
        process.exit(1);
    }

    console.log('✅ Environment variables found');
    console.log(`📧 Email User: ${process.env.EMAIL_USER}\n`);

    // Create transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    // Verify connection
    console.log('🔌 Verifying SMTP connection...');
    try {
        await transporter.verify();
        console.log('✅ SMTP connection successful\n');
    } catch (error) {
        console.error('❌ SMTP connection failed:', error.message);
        console.log('\nPossible issues:');
        console.log('1. Incorrect email or password');
        console.log('2. 2-Step Verification not enabled (for Gmail)');
        console.log('3. Not using App Password (for Gmail)');
        console.log('4. Network/firewall blocking SMTP port 587\n');
        process.exit(1);
    }

    // Send test email
    const testOTP = '123456';
    const mailOptions = {
        from: {
            name: 'Jay Gopal Electronics',
            address: process.env.EMAIL_USER,
        },
        to: process.env.EMAIL_USER, // Send to yourself for testing
        subject: '🧪 Test Email - OTP Configuration',
        html: getTestEmailTemplate(testOTP),
        text: `Test OTP: ${testOTP}. If you received this, your email configuration is working!`,
    };

    console.log('📤 Sending test email...');
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Test email sent successfully!');
        console.log(`📬 Message ID: ${info.messageId}`);
        console.log(`📧 Sent to: ${process.env.EMAIL_USER}\n`);
        console.log('🎉 SUCCESS! Your email configuration is working correctly.');
        console.log('Check your inbox for the test email.\n');
    } catch (error) {
        console.error('❌ Failed to send test email:', error.message);
        console.log('\nPlease check your email credentials and try again.\n');
        process.exit(1);
    }
}

// Run the test
testEmailConfiguration().catch(error => {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
});
