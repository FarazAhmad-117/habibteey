import BackgroundVideo from "@/components/BackgroundVideo";
import Card from "@/components/Card";
import Header from "@/components/Header";
import StarryBackground from "@/components/StarryBackground";
import React from "react";
import Moon from "@/components/Moon";
import NewCard from "@/components/NewCard";

const cardsData = [
  {
    backTitle: "The heading you wanted",
    backText:
      "The text you wanted Lorem ipsum dolor sit amet consectet adipisicing elit. Accusamus asperiores assumenda autem, itaque optio quas quod, repellat id quidem suscipit quaerat commodi voluptate blanditiis eos. Totam tempora nemo pariatur! Quod!",
    imageUrl:
      "https://cdn.pixabay.com/photo/2020/05/08/23/26/love-5147677_960_720.jpg",
  },
  {
    backTitle: "The heading you wanted",
    backText:
      "The text you wanted Lorem ipsum dolor sit amet consectet adipisicing elit. Accusamus asperiores assumenda autem, itaque optio quas quod, repellat id quidem suscipit quaerat commodi voluptate blanditiis eos. Totam tempora nemo pariatur! Quod!",
    imageUrl:
      "https://cdn.pixabay.com/photo/2020/05/08/23/26/love-5147677_960_720.jpg",
  },
  {
    backTitle: "The heading you wanted",
    backText:
      "The text you wanted Lorem ipsum dolor sit amet consectet adipisicing elit. Accusamus asperiores assumenda autem, itaque optio quas quod, repellat id quidem suscipit quaerat commodi voluptate blanditiis eos. Totam tempora nemo pariatur! Quod!",
    imageUrl:
      "https://cdn.pixabay.com/photo/2020/05/08/23/26/love-5147677_960_720.jpg",
  },
];

const page = () => {
  return (
    <div>
      <BackgroundVideo />
      <Header />
      {/* <Moon /> */}
      {cardsData.map((card, index) => (
        <div
          key={index}
          className="min-h-screen flex items-center justify-center"
        >
          {/* <h2 className="text-white">Card1 Secion</h2> */}
          <NewCard
            backText={card.backText}
            backTitle={card.backTitle}
            imageUrl={card.imageUrl}
          />
        </div>
      ))}
    </div>
  );
};

export default page;
