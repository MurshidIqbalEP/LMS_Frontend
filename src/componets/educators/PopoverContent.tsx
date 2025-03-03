import { FaTrash } from "react-icons/fa";

function PopoverContent({ onDelete }: { onDelete: () => void }) {
  return (
    <div className="w-[300px]">
      <h3 className="text-sm font-medium text-gray-900 mb-2">Delete Course</h3>
      <p className="text-xs text-gray-600 mb-3">
        Are you sure you want to delete this course? This action cannot be
        undone.
      </p>
      <div className="flex justify-end space-x-2">
        <button
          className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700"
          onClick={onDelete}
        >
          <span className="text-white">Delete</span>
          <FaTrash size={15} className="text-white" />
        </button>
      </div>
    </div>
  );
}

export default PopoverContent;
