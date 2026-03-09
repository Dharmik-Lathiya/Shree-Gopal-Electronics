# 🚀 Quick Setup Guide for Image Upload

## Step 1: Get Cloudinary Account (Free)

1. Go to [https://cloudinary.com/users/register/free](https://cloudinary.com/users/register/free)
2. Sign up for a free account
3. Verify your email
4. Go to Dashboard

## Step 2: Copy Your Credentials

From your Cloudinary Dashboard, copy:
- **Cloud Name** (e.g., "dxyz123abc")
- **API Key** (e.g., "123456789012345")
- **API Secret** (e.g., "abcdefghijklmnopqrstuvwxyz")

## Step 3: Add to Environment Variables

Create or update `.env.local` file in your project root:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

**Replace** `your_cloud_name_here`, `your_api_key_here`, and `your_api_secret_here` with your actual credentials.

## Step 4: Restart Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 5: Test It Out!

1. Open [http://localhost:3000/admin](http://localhost:3000/admin)
2. Log in as admin
3. Go to Products or Blogs
4. Click "Add Product" or "Write New Post"
5. Click on the image upload area
6. Select an image
7. Watch it upload! 🎉

---

## ✅ That's It!

Your image upload is now fully configured and ready to use!

### What You Can Do Now:
- ✅ Upload product images
- ✅ Upload blog featured images
- ✅ Images are automatically optimized
- ✅ Images are securely stored in Cloudinary
- ✅ Only admins can upload (JWT protected)

---

## 🆘 Need Help?

Check the full documentation: `IMAGE_UPLOAD_GUIDE.md`

### Common Issues:

**"Unauthorized" error?**
- Make sure you're logged in as admin user

**Upload fails?**
- Double-check your Cloudinary credentials
- Make sure you restarted the dev server
- Check file size (max 5MB)

**Images not showing?**
- Check browser console for errors
- Verify the image URL in Cloudinary dashboard
