import { useEffect, useRef } from "react";

interface PdfPreviewProps {
  previewResourceUrl: string;
  closeModal: () => void;
}

function PdfPreview({ previewResourceUrl, closeModal }: PdfPreviewProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  return (
    <div className="fixed inset-0  bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div ref={modalRef} className="bg-black rounded-lg w-full h-full max-w-6xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg text-white font-semibold">PDF Preview</h2>
          <button
            onClick={closeModal}
            className="text-white hover:text-gray-400 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="flex-1 p-1">
          <iframe
            className="w-full h-full rounded-lg border"
            src={previewResourceUrl}
            allowFullScreen
            title="PDF Preview"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default PdfPreview;
