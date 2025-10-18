import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Container from "./Container";
import Image from "next/image";

const HomeHero = () => {
  return (
    <div className=" text-center md:text-left text-[#303a48] dark:text-white min-h-screen flex justify-center items-center mt-25">
      <Container>
        <div className="flex flex-col md:flex-row">
          <div className="space-y-4 my-5 basis-full md:basis-1/2">
            <h2 className="text-2xl md:text-2xl lg:text-3xl font-bold">
              <span className="text-green-500">
                Copy Stocks, Options & Contracts with Precision.{" "}
              </span>
              The Premier Copy-Trading Hub for Options Traders
            </h2>
            <h3 className="text-lg font-bold">
              Go long, go short, or go CitadelPro!
            </h3>
            <p className="text-base">
              CitadelPro empowers you to mirror real-time stock and options
              trades from top-performing traders. Whether you're following
              tickers, contracts, or strategic options moves, our platform
              brings precision, flexibility, and transparency—straight to your
              fingertips.
            </p>
            <div className="flex items-start lg:items-center gap-3 flex-col md:flex-row md:max-w-[400px]">
              <Button
                asChild
                className="bg-green-500 rounded-full px-6 w-full md:w-1/2"
              >
                <Link href={"/register"} className="dark:text-white">
                  Sign Up
                </Link>
              </Button>
              {/* <Button
                asChild
                className="bg-green-500 rounded-full px-6 w-full md:w-1/2"
              >
                <Link href={"/login"} className="dark:text-white">
                  Get Started
                </Link>
              </Button> */}
            </div>
          </div>

          <div className="basis-full md:basis-1/2">
            <Image
              alt="hero_bot"
              className="sm:h-70 md:h-140 w-auto mx-auto"
              width={1450}
              height={2344}
              src={"/images/mainheroImage.png"}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomeHero;
