"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ScrollReveal from "./ScrollReveal";

const teamMembers = [
  {
    name: "Troy Johnson",
    position: "Chief Executive Officer",
    image: "/images/team_2.jpg",
  },
  {
    name: "Emma Smith",
    position: "Chief Technology Officer",
    image: "/images/young-woman-working.jpg",
  },
  {
    name: "Michael Lee",
    position: "Head of Trading Operations",
    image: "/images/team_1.jpg",
  },
  {
    name: "Sarah Davis",
    position: "Lead Financial Analyst",
    image: "/images/pro_woman_2.jpg",
  },
];

export default function TeamSection() {
  return (
    <section className="bg-white dark:bg-black dark:text-white py-20 px-4 sm:px-8 md:px-12 lg:px-24">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Side */}

        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
          <ScrollReveal direction="up" delay={0.2}>
            <h2 className="text-3xl sm:text-4xl font-semibold text-emerald-400">
              Meet Our Team
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-black dark:text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
              Our team comprises industry veterans with extensive experience in
              fintech, stock trading, financial management, and cybersecurity.
              Together, we bring unparalleled expertise and a shared commitment
              to innovation and excellence.
            </p>
          </ScrollReveal>
        </div>

        {/* Right Side - Carousel */}

        <div className="w-full md:w-1/2 flex justify-center">
          <ScrollReveal direction="up" delay={0.2}>
            <Carousel className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              <CarouselContent>
                {teamMembers.map((member, index) => (
                  <CarouselItem key={index} className="flex justify-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-emerald-500 shadow-lg">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="(max-width: 640px) 144px, (max-width: 1024px) 200px, 224px"
                          className="object-cover"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-black dark:text-white">
                          {member.name}
                        </h3>
                        <p className="text-emerald-400 text-sm sm:text-base">
                          {member.position}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Controls */}
              <div className="flex justify-center gap-4 sm:gap-6 mt-10">
                <CarouselPrevious className="border absolute left-0  border-gray-700 hover:bg-emerald-500 hover:text-white transition-all" />
                <CarouselNext className="border absolute right-0 border-gray-700 hover:bg-emerald-500 hover:text-white transition-all" />
              </div>
            </Carousel>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
