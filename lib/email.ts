import nodemailer from 'nodemailer';

// Create reusable transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services like SendGrid, Mailgun, etc.
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, // Use App Password for Gmail
    },
});

// Email template for OTP
export function getOTPEmailTemplate(otp: string, userName?: string): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your OTP Code</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f4f4;
        }
        .email-container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 20px;
            text-align: center;
            color: white;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
        }
        .header p {
            margin: 10px 0 0;
            font-size: 14px;
            opacity: 0.9;
        }
        .content {
            padding: 40px 30px;
        }
        .greeting {
            font-size: 18px;
            color: #333;
            margin-bottom: 20px;
        }
        .message {
            font-size: 16px;
            color: #666;
            line-height: 1.6;
            margin-bottom: 30px;
        }
        .otp-container {
            background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
            border: 2px dashed #667eea;
            border-radius: 8px;
            padding: 30px;
            text-align: center;
            margin: 30px 0;
        }
        .otp-label {
            font-size: 14px;
            color: #666;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .otp-code {
            font-size: 42px;
            font-weight: bold;
            color: #667eea;
            letter-spacing: 8px;
            font-family: 'Courier New', monospace;
            margin: 10px 0;
        }
        .otp-validity {
            font-size: 13px;
            color: #999;
            margin-top: 15px;
        }
        .warning {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 25px 0;
            border-radius: 4px;
        }
        .warning p {
            margin: 0;
            font-size: 14px;
            color: #856404;
        }
        .footer {
            background-color: #f8f9fa;
            padding: 25px 30px;
            text-align: center;
            border-top: 1px solid #e9ecef;
        }
        .footer p {
            margin: 5px 0;
            font-size: 13px;
            color: #6c757d;
        }
        .company-name {
            font-weight: 600;
            color: #667eea;
        }
        .divider {
            height: 1px;
            background: linear-gradient(to right, transparent, #ddd, transparent);
            margin: 25px 0;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>🔐 Jay Gopal Electronics</h1>
            <p>Secure Login Verification</p>
        </div>
        
        <div class="content">
            <div class="greeting">
                Hello${userName ? ` ${userName}` : ''},
            </div>
            
            <div class="message">
                We received a request to sign in to your account. Use the One-Time Password (OTP) below to complete your login:
            </div>
            
            <div class="otp-container">
                <div class="otp-label">Your OTP Code</div>
                <div class="otp-code">${otp}</div>
                <div class="otp-validity">⏱️ Valid for 10 minutes</div>
            </div>
            
            <div class="warning">
                <p><strong>⚠️ Security Notice:</strong> Never share this OTP with anyone. Our team will never ask for your OTP via phone, email, or any other means.</p>
            </div>
            
            <div class="divider"></div>
            
            <div class="message">
                If you didn't request this code, please ignore this email. Your account remains secure.
            </div>
        </div>
        
        <div class="footer">
            <p class="company-name">Jay Gopal Electronics</p>
            <p>This is an automated message, please do not reply to this email.</p>
            <p>&copy; ${new Date().getFullYear()} Jay Gopal Electronics. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
    `;
}

// Send OTP via email
export async function sendOTPEmail(
    email: string,
    otp: string,
    userName?: string
): Promise<void> {
    const mailOptions = {
        from: {
            name: 'Jay Gopal Electronics',
            address: process.env.EMAIL_USER || 'noreply@jaygopal.com',
        },
        to: email,
        subject: `Your OTP Code: ${otp} - Jay Gopal Electronics`,
        html: getOTPEmailTemplate(otp, userName),
        text: `Your OTP code is: ${otp}. This code is valid for 10 minutes. Never share this code with anyone.`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully:', info.messageId);
        return;
    } catch (error) {
        console.error('❌ Email send error:', error);
        throw new Error('Failed to send OTP email');
    }
}

// Verify email configuration
export async function verifyEmailConfig(): Promise<boolean> {
    try {
        await transporter.verify();
        console.log('✅ Email server is ready');
        return true;
    } catch (error) {
        console.error('❌ Email server verification failed:', error);
        return false;
    }
}
