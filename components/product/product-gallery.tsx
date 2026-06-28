"use client"

import { useState } from "react"

type ProductGalleryProps = {
  images: string[]
  name: string
}

export function ProductGallery({
  images,
  name,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0])

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <img
          src={selectedImage}
          alt={name}
          className="aspect-square w-full object-cover transition duration-300 hover:scale-105"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={`overflow-hidden rounded-xl border transition ${
                selectedImage === image
                  ? "border-blue-500"
                  : "border-border hover:border-blue-400"
              }`}
            >
              <img
                src={image}
                alt={`${name} ${index + 1}`}
                className="aspect-square w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}