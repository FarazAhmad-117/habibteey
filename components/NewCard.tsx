import React from "react";

interface CardProps {
  backText: string;
  backTitle: string;
  imageUrl: string;
}

const NewCard = ({ backText, backTitle, imageUrl }: CardProps) => {
  return (
    <div className="container max-w-[400px]">
      <div className="card">
        <div className="front bg-white overflow-hidden">
          <img src={imageUrl} />
        </div>
        <div className="back bg-pink-300 px-10 py-6 border-red-600 border-[5px]">
          <h1 className="text-5xl font-bold text-pink-800">{backTitle}</h1>
          <p className="text-2xl font-semibold text-red-600">{backText}</p>
        </div>
      </div>
    </div>
  );
};

export default NewCard;
