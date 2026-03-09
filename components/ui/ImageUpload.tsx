'use client';

import { useState, useRef } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  aspectRatio?: string;
}

export default function ImageUpload({
  value,
  onChange,
  folder = 'general',
  label = 'Upload Image',
  aspectRatio = 'aspect-video'
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const uploadPromise = fetch('/api/upload', {
        method: 'POST',
        body: formData,
      }).then(async (res) => {
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.error || 'Upload failed');
        }
        return res.json();
      });

      toast.promise(uploadPromise, {
        loading: 'Uploading image...',
        success: 'Image uploaded successfully!',
        error: 'Failed to upload image'
      });

      const data = await uploadPromise;
      setPreview(data.url);
      onChange(data.url);
    } catch (error: any) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-400">
          {label}
        </label>
      )}

      <div className={`relative ${aspectRatio} w-full bg-white/5 border-2 border-dashed border-white/10 rounded-xl overflow-hidden group hover:border-blue-500/50 transition-colors`}>
        {preview ? (
          <>
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                disabled={uploading}
              >
                <Upload size={20} />
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                disabled={uploading}
              >
                <X size={20} />
              </button>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-400">
            {uploading ? (
              <>
                <Loader2 size={40} className="animate-spin text-blue-500" />
                <p className="text-sm">Uploading...</p>
              </>
            ) : (
              <>
                <ImageIcon size={40} />
                <p className="text-sm">Click to upload image</p>
                <p className="text-xs text-gray-500">PNG, JPG, WEBP (max 5MB)</p>
              </>
            )}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          disabled={uploading}
        />
      </div>

      {preview && (
        <p className="text-xs text-gray-500 truncate">
          {preview}
        </p>
      )}
    </div>
  );
}
