import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="h-[800px] w-full bg-orange-500 max-lg:h-[1000px] max-md:h-[850px]">
      <div className="grid grid-cols-2 items-center justify-items-center px-10 gap-x-10 max-w-screen-2xl mx-auto h-full max-lg:grid-cols-1 max-lg:py-10 max-lg:gap-y-10">
        <div className="flex flex-col gap-y-5 text-center max-lg:order-last col-span-1">
          <h1 className="text-5xl text-white font-bold mb-3 max-xl:text-4xl max-md:text-3xl max-sm:text-2xl">
            Welcome to VELLGRO Ads
          </h1>
          <p className="text-white text-2xl font-semibold max-sm:text-lg">
            Your One-Stop Solution for All Printing Needs
          </p>
          <div className="flex justify-center max-lg:flex-col max-lg:gap-y-1">
            <Link
              href="/shop"
              className="bg-white text-orange-500 px-12 py-4 rounded-full font-semibold text-xl shadow-md transition-all duration-300 ease-in-out transform hover:bg-gray-200 hover:shadow-lg hover:scale-105 max-md:text-lg max-md:w-72 max-[480px]:w-60 mx-auto"
            >
              Shop Now
            </Link>
          </div>
        </div>
        <Image
          src="/home.png"
          width={1000}
          height={1000}
          alt="Printing products showcase"
          className="max-md:w-[600px] max-md:h-[600px] max-sm:h-[550px] max-sm:w-[550px] w-auto h-auto"
        />
      </div>
    </div>
  );
};

export default Hero;