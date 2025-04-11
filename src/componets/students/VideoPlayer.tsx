import React from "react";
import ReactPlayer from "react-player";

type VideoPlayerProps = {
  videoUrl: string;
  onEnded?: () => void; // 👈 Optional
};

const VideoPlayer = ({ videoUrl, onEnded }: VideoPlayerProps) => {
  return (
    <div className="w-full h-full aspect-video rounded-t-2xl overflow-hidden">
      <ReactPlayer
        url={videoUrl}
        playing
        controls
        loop={false}
        onEnded={onEnded} 
        width="100%"
        height="100%"
        config={{
          youtube: {
            playerVars: {
              modestbranding: 1,
              rel: 0,
              showinfo: 0,
              fs: 1,
              disablekb: 1,
            },
          },
        }}
      />
    </div>
  );
};

export default VideoPlayer;
