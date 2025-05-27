import  { useState } from 'react'
import { IReview } from '../../services/types';
import ReactStars from "react-rating-stars-component";


function ReviewCard({ item }:{item:IReview}) {
  const [showFull, setShowFull] = useState(false);
  const toggleShow = () => setShowFull(!showFull);

  const isLong = item.comment.length > 50;
  const shortText = item.comment.slice(0, 50);

  return (
    <div className="bg-gray-200 rounded-xl shadow-md shadow-gray-500 p-5 w-[220px] min-h-[150px] flex flex-col justify-between">
      <div>
        <p className="text-gray-600 text-sm">
          "{showFull || !isLong ? item.comment : shortText + "..."}"
        </p>
        {isLong && (
          <button
            onClick={toggleShow}
            className="text-blue-500 !text-xs mt-1 hover:underline"
          >
            {showFull ? "Show less" : "Show more"}
          </button>
        )}
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="text-yellow-400 text-sm">
          <ReactStars
            count={5}
            value={item.rating}
            size={20}
            edit={false}
            isHalf={true}
            activeColor="#facc15"
          />
        </div>
        <span className="text-gray-700 text-xs">- {item.user.name}</span>
      </div>
    </div>
  );
}

export default ReviewCard
