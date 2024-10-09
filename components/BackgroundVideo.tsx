// components/BackgroundVideo.tsx
import React from "react";

const BackgroundVideo: React.FC = () => {
  return (
    <div className="video-container w-[100vw] fixed top-0 left-0 right-0 -z-10">
      <video autoPlay loop muted playsInline className="video-background">
        <source src="/videos/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BackgroundVideo;
