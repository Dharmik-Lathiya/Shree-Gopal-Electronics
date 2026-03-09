# Image Upload with Cloudinary Integration

## Overview
This application now supports **image uploads to Cloudinary** for both **Products** and **Blogs** with **JWT authentication** to ensure only admin users can upload images.

---

## 🔐 **Authentication**

### JWT Token (Already Configured)
- **NextAuth v5** is already configured with JWT strategy
- Session tokens include user role information
- Image upload API endpoints check for admin role before allowing uploads

### How It Works
1. User logs in via OTP authentication
2. NextAuth creates a JWT token with user info (id, email, role)
3. Token is automatically sent with API requests
4. Upload endpoint verifies admin role before processing

---

## 📦 **Installed Packages**

```bash
npm install cloudinary next-cloudinary
```

### Dependencies Added:
- **cloudinary**: Official Cloudinary SDK for Node.js
- **next-cloudinary**: Next.js optimized Cloudinary components

---

## 🗂️ **File Structure**

```
jay-gopal-electronics/
├── lib/
│   └── cloudinary.ts                    # Cloudinary configuration
├── app/
│   └── api/
│       └── upload/
│           └── route.ts                 # Image upload API endpoint
├── components/
│   └── ui/
│       └── ImageUpload.tsx              # Reusable upload component
├── app/admin/
│   ├── products/page.tsx                # Updated with image upload
│   └── blogs/page.tsx                   # Updated with image upload
└── .env.example                         # Environment variables template
```

---

## ⚙️ **Configuration**

### 1. **Get Cloudinary Credentials**

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard
3. Copy your credentials:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### 2. **Set Environment Variables**

Create a `.env.local` file in the root directory:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Important:** 
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is public (used in client components)
- `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` are private (server-only)

---

## 🚀 **Features**

### ✅ **Image Upload Component**
- **Drag & drop** or click to upload
- **Live preview** of uploaded images
- **Loading states** with toast notifications
- **File validation** (type and size)
- **Image optimization** (automatic compression and format conversion)
- **Replace/Remove** functionality

### ✅ **Security**
- **JWT authentication** required
- **Admin-only access** to upload endpoint
- **File type validation** (images only)
- **File size limit** (5MB max)

### ✅ **Automatic Optimizations**
- **Max dimensions**: 1200x1200px
- **Quality**: Auto-optimized
- **Format**: Auto-converted to best format (WebP when supported)
- **Organized folders**: `jay-gopal-electronics/products/` and `jay-gopal-electronics/blogs/`

---

## 📝 **Usage**

### **In Products Admin**

```typescript
<ImageUpload
  label="Product Image"
  value={formData.imageUrl}
  onChange={(url) => setFormData({ ...formData, imageUrl: url })}
  folder="products"
  aspectRatio="aspect-square"
/>
```

### **In Blogs Admin**

```typescript
<ImageUpload
  label="Featured Image"
  value={imageUrl}
  onChange={setImageUrl}
  folder="blogs"
  aspectRatio="aspect-video"
/>
```

### **Component Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `undefined` | Current image URL |
| `onChange` | `(url: string) => void` | required | Callback when image changes |
| `folder` | `string` | `'general'` | Cloudinary folder name |
| `label` | `string` | `'Upload Image'` | Label text |
| `aspectRatio` | `string` | `'aspect-video'` | Tailwind aspect ratio class |

---

## 🔌 **API Endpoints**

### **POST /api/upload**

Upload an image to Cloudinary.

**Authentication:** Required (Admin only)

**Request:**
```typescript
FormData {
  file: File,
  folder: string // optional, defaults to 'general'
}
```

**Response:**
```json
{
  "url": "https://res.cloudinary.com/...",
  "publicId": "jay-gopal-electronics/products/abc123",
  "width": 1200,
  "height": 1200,
  "format": "jpg"
}
```

### **DELETE /api/upload**

Delete an image from Cloudinary.

**Authentication:** Required (Admin only)

**Request:**
```json
{
  "publicId": "jay-gopal-electronics/products/abc123"
}
```

**Response:**
```json
{
  "message": "Image deleted successfully"
}
```

---

## 🎨 **Image Transformations**

All uploaded images are automatically optimized:

```typescript
{
  width: 1200,
  height: 1200,
  crop: 'limit',        // Don't upscale, only downscale
  quality: 'auto:good', // Automatic quality optimization
  fetch_format: 'auto'  // Serve WebP when supported
}
```

---

## 🧪 **Testing**

### **Test Image Upload**

1. Log in as admin user
2. Go to Products or Blogs admin page
3. Click "Add Product" or "Write New Post"
4. Click on the image upload area
5. Select an image (PNG, JPG, WEBP)
6. Watch the upload progress with toast notifications
7. See the preview once uploaded

### **Test Image Replacement**

1. Hover over an uploaded image
2. Click the upload icon to replace
3. Select a new image
4. Previous image is replaced

### **Test Image Removal**

1. Hover over an uploaded image
2. Click the X icon
3. Image is removed from form

---

## 🛡️ **Security Features**

### **1. Authentication Check**
```typescript
const session = await auth();
if (!session?.user || !('role' in session.user) || session.user.role !== 'admin') {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

### **2. File Validation**
- **Type check**: Only image files allowed
- **Size limit**: Maximum 5MB
- **Client-side validation** before upload
- **Server-side validation** for security

### **3. Secure Credentials**
- API keys stored in environment variables
- Never exposed to client-side code
- Server-only API routes

---

## 📊 **Cloudinary Dashboard**

After uploading images, you can:
- View all uploaded images in Cloudinary dashboard
- See storage usage
- Manage transformations
- Set up webhooks
- Configure security settings

---

## 🔧 **Troubleshooting**

### **"Unauthorized" Error**
- Make sure you're logged in as admin
- Check that `AUTH_SECRET` is set in `.env.local`
- Verify user role is 'admin' in database

### **"Failed to upload image" Error**
- Check Cloudinary credentials in `.env.local`
- Verify API key and secret are correct
- Check file size (must be < 5MB)
- Ensure file is an image type

### **Images Not Showing**
- Check browser console for errors
- Verify image URL is valid
- Check Cloudinary dashboard for uploaded files
- Ensure `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is set

### **TypeScript Errors**
- Run `npm install` to ensure all types are installed
- Restart TypeScript server in VS Code
- Check that cloudinary package is installed

---

## 🎯 **Next Steps (Optional Enhancements)**

1. **Multiple Images**: Support uploading multiple images per product
2. **Image Gallery**: Create a media library for reusing images
3. **Drag & Drop Reordering**: Allow reordering multiple images
4. **Image Cropping**: Add built-in image cropper
5. **AI Tagging**: Use Cloudinary's AI to auto-tag images
6. **Lazy Loading**: Implement progressive image loading

---

## 📚 **Resources**

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [NextAuth.js Documentation](https://next-auth.js.org/)

---

## ✅ **Summary**

You now have:
- ✅ **Cloudinary integration** for image uploads
- ✅ **JWT authentication** protecting upload endpoints
- ✅ **Reusable ImageUpload component**
- ✅ **Image upload in Products admin**
- ✅ **Image upload in Blogs admin**
- ✅ **Automatic image optimization**
- ✅ **Loading states and error handling**
- ✅ **Security and validation**

Everything is ready to use! Just add your Cloudinary credentials to `.env.local` and start uploading images! 🚀
