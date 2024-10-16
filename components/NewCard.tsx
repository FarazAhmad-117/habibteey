import React from "react";

interface CardProps {
  backText: string;
  backTitle: string;
  frontText: string;
}

const NewCard = ({ backText, backTitle, frontText }: CardProps) => {
  return (
    <div className="container max-w-[200px] max-h-[250px]">
      <div className="card">
        <div className="front  bg-gradient-to-t from-black to-slate-800 items-center flex justify-center overflow-hidden">
          <div className="absolute w-full h-full flex items-center justify-center">
            <h2 className="text-3xl text-white">{frontText}</h2>
          </div>
        </div>
        <div className="back bg-pink-300 px-2  border-red-600 border-[5px]">
          <h1 className="text-3xl font-fredoka text-pink-800">{backTitle}</h1>
          <p className="text-md font-semibold text-red-600">{backText}</p>
        </div>
      </div>
    </div>
  );
};

export default NewCard;
