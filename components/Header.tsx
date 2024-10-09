"use client";
import HoverCard from "./HoverCard";
import ThreeDTextAnimation from "./ThreeDTextAnimation";
import { LampContainer } from "./ui/lamp";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <header className=" w-full ">
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-200 to-slate-300 py-4 bg-clip-text text-center text-6xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Faraz Ahmad
        </motion.h1>
      </LampContainer>
    </header>
  );
};

export default Header;
