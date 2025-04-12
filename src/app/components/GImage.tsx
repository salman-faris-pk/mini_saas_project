interface ImageProps {
  image: string | null;
  ISgenerating:boolean
}

export default function GImagePage({ image,ISgenerating }: ImageProps) {
  if (ISgenerating) {
    return (
      <div className="flex flex-col items-center justify-center h-64 w-full bg-gray-100 rounded-lg gap-3 animate-pulse">
      <div className="w-3/4 h-40 bg-gray-300 rounded-md" />
      <p className="text-gray-500 text-sm">Generating image... Please wait</p>
    </div>
    );
  };
  
  if (!image) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
        <p className="text-gray-500">No image generated yet</p>
      </div>
    );
  }
 

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative group w-full">
        <img
          src={image}
          alt="Generated image"
          className="w-full h-auto rounded-lg object-cover"
        />
      </div>
      <a
        href={image}
        download="generated-image.png"
        className="px-4 py-2 bg-white text-gray-800 rounded-md hover:bg-gray-100 transition-colors"
      >
        Download
      </a>
    </div>
  );
}
