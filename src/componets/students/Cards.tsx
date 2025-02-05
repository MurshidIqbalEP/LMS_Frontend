import React from "react";

interface CardProps {
  title: string;
  description: string;
  index: number;
}

const Cards: React.FC<CardProps> = ({ title, description, index }) => {
  return (
    <div className="card" id={`card-${index + 1}`}>
      <div className="card-inner">
        <div className="card-content">
          <h1
            className={` font-light uppercase text-6xl md:text-7xl md:leading-14 ${
              index <= 1 ? "text-black" : "text-white"
            }`}
          >
            {title}
          </h1>
          <p className="mt-6 pl-[10px] text-lg leading-relaxed max-w-[700px]">
            {description}
          </p>
        </div>
        <div className="card-img">
          <img
            src={`/card${index + 1}.jpg`}
            alt={`Image for card ${index + 1}`}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Cards;
