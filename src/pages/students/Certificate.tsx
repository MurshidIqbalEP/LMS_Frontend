import { useRef } from "react";
import certificateImg from "../../assets/certificate.png";

export default function CertificateGenerator({
  name,
  course,
}: {
  name: string;
  course: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const words1 = `This is to certify that ${name} has successfully completed the `;
  const words2 = `${course} course,demonstrating exceptional understanding and skill.`;

  const drawCertificate = (): Promise<void> => {
    return new Promise((resolve) => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d");

      const img = new Image();
      img.src = certificateImg;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        if(ctx){
            ctx?.clearRect(0, 0, canvas.width, canvas.height);
        ctx?.drawImage(img, 0, 0);

        ctx.font = "italic 120px Times New Roman";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.fillText(name, canvas.width / 2, 750);

        ctx.font = "40px Georgia";
        ctx.fillStyle = "#333";
        ctx.textAlign = "center";
        ctx.fillText(words1, canvas.width / 2, 850);
        ctx.fillText(words2, canvas.width / 2, 900);
        }
        resolve();
      };
    });
  };

  // Trigger download
  const handleDownload = async () => {
    const canvas = canvasRef.current;
    await drawCertificate();
    const link = document.createElement("a");
    link.download = "certificate.png";
    link.href = canvas!.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="flex-1">
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <button
        onClick={handleDownload}
        className="bg-[#d62828] w-full text-white px-4 py-3 rounded-lg hover:bg-[#d81520] transition duration-200 cursor-pointer"
      >
        Download Certificate
      </button>
    </div>
  );
}
