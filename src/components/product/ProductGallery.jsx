import { useState } from 'react';

export default function ProductGallery({ images = [], title }) {
  const allImages = images.length > 0 ? images : [];
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (allImages.length === 0) {
    return (
      <div className="aspect-square rounded-xl bg-brand-100 flex items-center justify-center">
        <span className="text-brand-400">No image available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="aspect-square overflow-hidden rounded-xl border border-brand-100 bg-brand-50">
        <img
          src={allImages[selectedIndex]}
          alt={`${title} - Image ${selectedIndex + 1}`}
          className="h-full w-full object-contain p-4"
        />
      </div>

      {allImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
          {allImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`shrink-0 h-20 w-20 overflow-hidden rounded-lg border-2 transition-colors ${
                index === selectedIndex
                  ? 'border-brand-900'
                  : 'border-brand-100 hover:border-brand-300'
              }`}
              aria-label={`View image ${index + 1}`}
              aria-current={index === selectedIndex}
            >
              <img
                src={img}
                alt={`${title} thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
