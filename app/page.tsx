"use client";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import NewCard from "@/components/NewCard";
import axios from "axios";

const MainPage = () => {
  const [name, setName] = useState("");
  const [cards, setCards] = useState([]);
  const getName = async () => {
    try {
      const resp = await axios.get("/api/name");
      if (resp) {
        setName(resp.data?.nameCard?.name ?? "");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getCards = async () => {
    try {
      const resp = await axios.get("/api/card/getall");
      if (resp) {
        setCards(resp.data?.cards ?? []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getName();
    getCards();
  }, []);
  return (
    <div className="bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq_PbsFJo6v6rZn9D4MHGTvHhE2879YvY6bxlU74-f1PmahceIDCJ5GeQQ&s=10')] bg-fixed bg-no-repeat bg-cover bg-center md:bg-[url('https://img.pikbest.com/ai/illus_our/20230427/05af4470d3aeadfe584a0f726511513e.jpg')] ">
      {/* <BackgroundVideo /> */}
      <Header name={name} />
      <div className=" h-screen md:flex gap-3 items-center justify-center">
        {cards.map((card: Card) => (
          <div key={card._id} className="min-h-[260px] min-w-[200px]">
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

export default MainPage;

interface Card {
  _id: string;
  backTitle: string;
  backText: string;
  frontText: string;
}
