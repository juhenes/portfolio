import React from 'react';

interface ProjectMediaProps {
  src: string;
  alt: string;
  className?: string;
}

export const ProjectMedia: React.FC<ProjectMediaProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
}) => {
  const isVideo = src.toLowerCase().endsWith('.mp4') || src.toLowerCase().includes('.mp4');

  if (isVideo) {
    return (
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        aria-label={alt}
        className={className}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} transition-transform duration-300 group-hover:scale-[1.01]`}
    />
  );
};

export default ProjectMedia;
