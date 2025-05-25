type VideoPlayerProps = {
  videoUrl: string;
  onEnded?: () => void;
  fullHeight?: boolean;
};

const VideoPlayer = ({
  videoUrl,
  onEnded,
  fullHeight = false,
}: VideoPlayerProps) => {
  return (
    <div
      className={`w-full h-full  rounded-2xl overflow-hidden ${
        fullHeight ? "" : "aspect-video"
      }`}
    >
      <video
        src={videoUrl}
        autoPlay
        onEnded={onEnded}
        onContextMenu={(e) => e.preventDefault()}
        controls
        controlsList="nodownload"
        className="w-full h-full"
      />
    </div>
  );
};

export default VideoPlayer;
