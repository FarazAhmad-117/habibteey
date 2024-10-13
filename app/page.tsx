import BackgroundVideo from "@/components/BackgroundVideo";
import Header from "@/components/Header";
import React from "react";
import NewCard from "@/components/NewCard";

const cardsData = [
  {
    backTitle: "The heading you wanted",
    backText:
      "The text you wanted Lorem ipsum dolor sit amet consectet adipisicing elit. Accusamus asperiores assumenda autem, itaque optio quas quod, repellat id quidem suscipit quaerat commodi voluptate blanditiis eos. Totam tempora nemo pariatur! Quod!",
    frontText: "Card 1",
  },
  {
    backTitle: "The heading you wanted",
    backText:
      "The text you wanted Lorem ipsum dolor sit amet consectet adipisicing elit. Accusamus asperiores assumenda autem, itaque optio quas quod, repellat id quidem suscipit quaerat commodi voluptate blanditiis eos. Totam tempora nemo pariatur! Quod!",
    frontText: "Card 2",
  },
  {
    backTitle: "The heading you wanted",
    backText:
      "The text you wanted Lorem ipsum dolor sit amet consectet adipisicing elit. Accusamus asperiores assumenda autem, itaque optio quas quod, repellat id quidem suscipit quaerat commodi voluptate blanditiis eos. Totam tempora nemo pariatur! Quod!",
    frontText: "Card 3",
  },
];

const page = () => {
  return (
    <div className="bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq_PbsFJo6v6rZn9D4MHGTvHhE2879YvY6bxlU74-f1PmahceIDCJ5GeQQ&s=10')] bg-fixed bg-no-repeat bg-cover bg-center md:bg-[url('https://img.pikbest.com/ai/illus_our/20230427/05af4470d3aeadfe584a0f726511513e.jpg')] ">
      {/* <BackgroundVideo /> */}
      <Header />
      <div className=" h-screen md:flex gap-3 items-center justify-center">
        {cardsData.map((card, index) => (
          <div key={index} className="min-h-[260px] min-w-[200px]">
            <div className="min-h-[260px] flex items-center justify-center">
              <NewCard
                backText={card.backText}
                backTitle={card.backTitle}
                frontText={card.frontText}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
