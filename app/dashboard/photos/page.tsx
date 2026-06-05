'use client';

import { useState, useRef, DragEvent } from 'react';

interface Photo {
  id: string;
  url: string;
  isPrimary: boolean;
  isVerified: boolean;
}

export default function PhotoManagementPage() {
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      isPrimary: true,
      isVerified: true,
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      isPrimary: false,
      isVerified: true,
    },
  ]);

  const [isDragging, setIsDragging] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const tier = 'premium'; // Standard=3, Premium=10, Platinum=unlimited
  const photoLimit = tier === 'standard' ? 3 : tier === 'premium' ? 10 : Infinity;

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    if (photos.length >= photoLimit) {
      setUploadMessage(`You've reached your ${photoLimit} photo limit for ${tier} tier`);
      setTimeout(() => setUploadMessage(''), 3000);
      return;
    }

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            const newPhoto: Photo = {
              id: Date.now().toString(),
              url: e.target.result as string,
              isPrimary: photos.length === 0,
              isVerified: false,
            };
            setPhotos((prev) => [...prev, newPhoto]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
    setUploadMessage('Photo(s) uploaded successfully!');
    setTimeout(() => setUploadMessage(''), 3000);
  };

  const setPrimary = (id: string) => {
    setPhotos((prev) =>
      prev.map((photo) => ({
        ...photo,
        isPrimary: photo.id === id,
      }))
    );
  };

  const deletePhoto = (id: string) => {
    setPhotos((prev) => {
      const remaining = prev.filter((photo) => photo.id !== id);
      if (remaining.length > 0 && !remaining.some((p) => p.isPrimary)) {
        remaining[0].isPrimary = true;
      }
      return remaining;
    });
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('photoId', id);
  };

  const handleDropReorder = (
    e: React.DragEvent<HTMLDivElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('photoId');
    if (draggedId === targetId) return;

    const draggedIdx = photos.findIndex((p) => p.id === draggedId);
    const targetIdx = photos.findIndex((p) => p.id === targetId);

    const newPhotos = [...photos];
    [newPhotos[draggedIdx], newPhotos[targetIdx]] = [
      newPhotos[targetIdx],
      newPhotos[draggedIdx],
    ];
    setPhotos(newPhotos);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Manage Photos</h1>
        <p className="text-text-secondary">
          {photos.length} / {photoLimit} photos ({tier} tier)
        </p>
      </div>

      {uploadMessage && (
        <div className="glass-card-gold p-4 rounded-lg border border-accent-gold text-accent-gold text-sm flex items-center gap-2">
          <span>✓</span> {uploadMessage}
        </div>
      )}

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? 'border-accent-gold bg-background-elevated'
            : 'border-border-default hover:border-accent-gold'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
        <div className="space-y-4">
          <div className="text-5xl">📸</div>
          <div>
            <p className="text-text-primary font-semibold mb-1">
              Drag & drop photos here or click to select
            </p>
            <p className="text-text-secondary text-sm">
              Supported formats: JPG, PNG, GIF, WebP (Max 5MB each)
            </p>
          </div>
        </div>
      </div>

      {/* Photo Grid */}
      {photos.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-text-primary">Your Photos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <div
                key={photo.id}
                draggable
                onDragStart={(e) => handleDragStart(e, photo.id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDropReorder(e, photo.id)}
                className={`relative group rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-move ${
                  photo.isPrimary ? 'border-accent-gold' : 'border-border-default'
                }`}
              >
                {/* Image */}
                <img
                  src={photo.url}
                  alt="Listing photo"
                  className="w-full h-48 object-cover"
                />

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                  <button
                    onClick={() => setPrimary(photo.id)}
                    title="Set as primary"
                    className="p-3 rounded-lg bg-accent-gold text-background hover:bg-accent-gold-light transition-colors"
                  >
                    ⭐
                  </button>
                  <button
                    onClick={() => deletePhoto(photo.id)}
                    title="Delete photo"
                    className="p-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                  >
                    🗑️
                  </button>
                </div>

                {/* Primary Badge */}
                {photo.isPrimary && (
                  <div className="absolute top-2 right-2 bg-accent-gold text-background px-3 py-1 rounded-full text-xs font-semibold">
                    Primary
                  </div>
                )}

                {/* Verified Badge */}
                {photo.isVerified && (
                  <div className="absolute top-2 left-2 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    ✓ Verified
                  </div>
                )}

                {/* Drag Indicator */}
                <div className="absolute bottom-2 left-2 text-white text-xs bg-black/50 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  Drag to reorder
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tier Info */}
      <div className="glass-card p-6 rounded-lg border border-border-default">
        <h3 className="text-lg font-semibold text-text-primary mb-3">Photo Limits by Tier</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="font-medium text-text-primary">Standard</p>
            <p className="text-text-secondary">Up to 3 photos</p>
          </div>
          <div>
            <p className="font-medium text-text-primary">Premium</p>
            <p className="text-text-secondary">Up to 10 photos</p>
          </div>
          <div>
            <p className="font-medium text-text-primary">Platinum</p>
            <p className="text-text-secondary">Unlimited photos</p>
          </div>
        </div>
      </div>
    </div>
  );
}
