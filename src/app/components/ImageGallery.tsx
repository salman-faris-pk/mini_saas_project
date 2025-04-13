"use client";

import { useState } from "react";
import { useDeleteImage } from "@/app/hooks/useDeleteImg";

interface Image {
  prompt: string;
  url: string;
  createdAt: string;
}

interface ImageGalleryProps {
  images: Image[];
  showAll: boolean;
  setShowAll: (val: boolean) => void;
}

const ImageGallery = ({ images, showAll, setShowAll }: ImageGalleryProps) => {
  const [galleryImages, setGalleryImages] = useState<Image[]>(images);
  const { deleteImage, loading, error } = useDeleteImage();

  const handleDelete = async (url: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this image?");
    if (!confirmDelete) return;

    const result = await deleteImage(url);
    if (result?.message) {
      setGalleryImages((prev) => prev.filter((img) => img.url !== url));
      setTimeout(()=>{
      window.location.reload()
      },800)
    }
  };

  const displayedImages = showAll ? galleryImages : galleryImages.slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedImages.map((image, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="h-48 bg-gray-100 relative">
              <img
                src={image.url}
                alt={image.prompt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-800 line-clamp-2">{image.prompt}</h3>
                <button
                  className="text-red-500 hover:text-red-700 ml-2"
                  aria-label="Delete image"
                  onClick={() => handleDelete(image.url)}
                  disabled={loading}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{formatDate(image.createdAt)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAll && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAll(false)}
            className="text-sm text-indigo-600 hover:underline cursor-pointer"
          >
            Show Less
          </button>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-center text-sm">{error}</p>
      )}
    </div>
  );
};

export default ImageGallery;
