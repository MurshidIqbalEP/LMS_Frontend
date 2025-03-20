import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ videoUrl }: { videoUrl: string }) => {
  return (
    <div className="w-full h-full aspect-video rounded-t-2xl overflow-hidden">
      <ReactPlayer 
        url={videoUrl} 
        playing
        controls 
        loop
        width="100%" 
        height="100%" 
        config={{
          youtube: {
            playerVars: { 
              modestbranding: 1, // Reduces YouTube branding
              rel: 0, // Prevents showing related videos
              showinfo: 0, // Hides video information (deprecated)
              fs: 1, // Enables fullscreen button
              disablekb: 1, // Disables keyboard shortcuts
            }
          }
        }}
      />
    </div>
  );
};

export default VideoPlayer;
