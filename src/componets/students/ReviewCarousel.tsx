
import Slider from 'react-slick';
import ReviewCard from './ReviewCard';
import { IReview } from '../../services/types';



const ReviewCarousel = ({reviews}:{reviews:IReview[]}) => {

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    autoplay: true,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="w-full z-50 p-4">
      {reviews.length < 3 ? (
        <div className="flex justify-center gap-4 p-4">
          {reviews.map((item, index) => (
            <ReviewCard key={index} item={item} />
          ))}
        </div>
      ) : (
        <Slider {...settings}>
          {reviews.map((item, index) => (
            <div key={index} className="p-2">
              <ReviewCard item={item} />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ReviewCarousel;
