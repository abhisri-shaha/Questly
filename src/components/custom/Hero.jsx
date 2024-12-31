import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { TbPlayerTrackNextFilled } from "react-icons/tb";

function Hero() {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h1 className="text-[70px] text-center mt-16">
        <span className="text-[#213F84] block font-extrabold dark:text-[#4465b8]">Questly</span>
        <span className="text-[#C3A97E] text-[35px] font-bold dark:text-[#dcbe8f]">Your Gateway to Effortless Travel Planning</span>
      </h1>
      <img src='/travel-animate.gif' className="w-30 h-20"/>
      <p className="text-xl text-gray-500 text-center">
        Designing Your Ideal Trip with Personalized AI Insights!
      </p>
      <Link to={"/create-trip"}>
        <Button> Get Started <TbPlayerTrackNextFilled /></Button>
      </Link>
    </div>
  );
}

export default Hero;
