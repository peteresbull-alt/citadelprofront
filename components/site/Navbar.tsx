import Image from "next/image";
import React from "react";
import Container from "./Container";
import Link from "next/link";
import { UserCircle2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode/toggleModeButton";

const navList = [
  {
    name: "Leaders",
    url: "/leaders",
  },
  {
    name: "Markets",
    url: "/markets",
  },
  {
    name: "Tools",
    url: "/tools",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Help Center",
    url: "/help",
  },
];

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 w-full bg-white dark:bg-black">
      <Container>
        <div className="flex items-center justify-between ">
          {/* LOGO */}
          <Image
            alt="logo"
            src={"/images/nodlogo.png"}
            className="h-15 w-auto"
            width={1000}
            height={1000}
          />

          <div className="md:flex items-center gap-5 hidden">
            {navList.map((item, index) => (
              <Link
                key={index}
                className="text-gray-600 dark:text-white py-3 relative group"
                href={item.url}
              >
                {item.name}
                <span className="w-0 h-[5px] group-hover:w-full transition-all rounded-full duration-400 absolute bottom-0 left-0 right-0 bg-green-500"></span>
              </Link>
            ))}
          </div>

          <div className="flex gap-2 items-center">
            <Button asChild className="bg-green-500 rounded-full">
              <Link href={"/register"} className="dark:text-white">
                Sign Up
              </Link>
            </Button>
            <UserCircle2Icon
              size={30}
              className="text-gray-600 dark:text-white"
            />
            <ModeToggle />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
