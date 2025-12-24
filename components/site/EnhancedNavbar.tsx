"use client";
import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export default function EnhancedNavbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        scrolled
          ? "bg-white dark:bg-black/80 shadow-lg shadow-emerald-500/5"
          : " bg-white dark:bg-black/30",
        "border-b border-emerald-500/20"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex dark:hidden text-2xl md:text-4xl font-extrabold self-center tracking-tight items-center gap-1 text-emerald-600 dark:bg-gradient-to-r dark:from-white dark:via-emerald-200 dark:to-emerald-600 dark:bg-clip-text dark:text-transparent z-50"
          >
            <Image
              alt="logo"
              src={"/images/logo_dark.png"}
              className="h-12 md:h-16 w-auto"
              width={1000}
              height={1000}
            />
          </Link>
          <Link
            href="/"
            className="hidden dark:flex text-2xl md:text-4xl font-extrabold self-center tracking-tight items-center gap-1 text-emerald-600 dark:bg-gradient-to-r dark:from-white dark:via-emerald-200 dark:to-emerald-600 dark:bg-clip-text dark:text-transparent z-50"
          >
            <Image
              alt="logo"
              src={"/images/logo_light.png"}
              className="h-12 md:h-16 w-auto"
              width={1000}
              height={1000}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Home */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent hover:bg-emerald-500/10 text-black dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                    )}
                  >
                    Home
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Features */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-emerald-500/10 text-black dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400">
                    Features
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] bg-white dark:bg-gray-900 border border-emerald-500/20">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-between rounded-md bg-gradient-to-b from-emerald-500/20 to-emerald-600/20 p-6 no-underline outline-none focus:shadow-md hover:shadow-lg transition-all duration-300 border border-emerald-500/30 group relative overflow-hidden"
                            href="/copy-trading"
                          >
                            {/* Animated Background Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/0 via-emerald-500/5 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Copy Trading Icon/Image */}
                            <div className="relative flex items-center justify-center flex-1 py-4">
                              <Image
                                src="/copytrading-image.jpg"
                                alt="Copy Trading"
                                width={200}
                                height={200}
                                className="w-full h-auto max-w-[160px] object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-lg"
                              />
                            </div>

                            {/* Text Content at Bottom */}
                            <div className="relative space-y-2">
                              <div className="text-lg font-medium text-black dark:text-white">
                                Copy Trading
                              </div>
                              <p className="text-sm leading-tight text-gray-700 dark:text-gray-300">
                                Mirror trades from top-performing traders in
                                real-time
                              </p>
                            </div>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/copy-trading" title="Copy Trading">
                        Automatically replicate expert traders&apos; strategies
                      </ListItem>
                      <ListItem href="/copy-trading" title="Social Trading">
                        Connect and learn from trading community
                      </ListItem>
                      <ListItem href="/disclaimer" title="Risk Management">
                        Advanced tools to protect your investments
                      </ListItem>
                      <ListItem
                        href="/portfolio-analytics"
                        title="Portfolio Analytics"
                      >
                        Comprehensive performance tracking and insights
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Partnerships */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-emerald-500/10 text-black dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400">
                    Partnerships
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[300px] gap-3 p-4 bg-white dark:bg-gray-900 border border-emerald-500/20">
                      <ListItem href="/affiliates" title="Affiliate Program">
                        Join our affiliate network and earn commissions
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Support */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-emerald-500/10 text-black dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400">
                    Support
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[300px] gap-3 p-4 bg-white dark:bg-gray-900 border border-emerald-500/20">
                      <ListItem href="/support" title="Support Center">
                        24/7 customer support and help center
                      </ListItem>
                      <ListItem href="/email-us" title="Email Us">
                        Get in touch with our team directly
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Legal */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-emerald-500/10 text-black dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400">
                    Legal
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 bg-white dark:bg-gray-900 border border-emerald-500/20">
                      <ListItem href="/terms-service" title="Terms Of Service">
                        Read our terms and conditions
                      </ListItem>
                      <ListItem href="/privacy-policy" title="Privacy Policy">
                        How we protect your data
                      </ListItem>
                      <ListItem href="/cookies" title="Cookies Policy">
                        Information about cookies usage
                      </ListItem>
                      <ListItem href="/disclaimer" title="Risk Disclaimer">
                        Important trading risk information
                      </ListItem>
                      <ListItem
                        href="/conflict-interest"
                        title="Conflict of Interest"
                      >
                        Our conflict of interest policy
                      </ListItem>
                      <ListItem
                        href="/declaration-consent"
                        title="Declaration of Consent"
                      >
                        User consent and declarations
                      </ListItem>
                      <ListItem
                        href="/user-agreement"
                        title="End-User Agreement"
                      >
                        License agreement and terms
                      </ListItem>
                      <ListItem href="/regulations" title="Regulations">
                        Trading Regulations
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Side Actions */}
          <div className="flex gap-2 items-center">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-full border border-emerald-400/30 hover:bg-emerald-500/10 transition"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4 text-emerald-500" />
              ) : (
                <Sun className="w-4 h-4 text-emerald-400" />
              )}
            </button>

            {/* Desktop Buttons */}
            <div className="hidden lg:flex gap-2">
              <Button
                asChild
                variant="outline"
                className="rounded-full border-emerald-400/30 hover:bg-emerald-500/10 text-black dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                <Link href="/register">Open Account</Link>
              </Button>
              <Button
                asChild
                className="bg-green-800 hover:bg-green-700 rounded-full dark:bg-gradient-to-l dark:from-white dark:via-emerald-200 dark:to-emerald-600"
              >
                <Link href="/login" className="dark:text-black text-white">
                  Sign In
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-full border border-emerald-400/30 hover:bg-emerald-500/10 transition"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
              ) : (
                <Menu className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden fixed inset-0 top-[80px] transition-all duration-500 ease-in-out z-40",
            isOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          )}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Content - Scrollable */}
          <div
            className={cn(
              "absolute top-0 left-0 right-0 max-h-[calc(100vh-80px)] bg-white dark:bg-black border-b border-emerald-500/20 transition-transform duration-500 ease-in-out overflow-y-auto",
              isOpen ? "translate-y-0" : "-translate-y-full"
            )}
          >
            <div className="flex flex-col gap-3 py-4 px-6">
              <MobileNavLink href="/" onClick={() => setIsOpen(false)}>
                Home
              </MobileNavLink>

              <MobileDropdown title="Features">
                <MobileNavLink
                  href="/copy-trading"
                  onClick={() => setIsOpen(false)}
                >
                  Copy Trading
                </MobileNavLink>
                <MobileNavLink
                  href="/copy-trading"
                  onClick={() => setIsOpen(false)}
                >
                  Social Trading
                </MobileNavLink>
                <MobileNavLink
                  href="/disclaimer"
                  onClick={() => setIsOpen(false)}
                >
                  Risk Management
                </MobileNavLink>
                <MobileNavLink
                  href="/portfolio-analytics"
                  onClick={() => setIsOpen(false)}
                >
                  Portfolio Analytics
                </MobileNavLink>
              </MobileDropdown>

              <MobileDropdown title="Partnerships">
                <MobileNavLink
                  href="/affiliates"
                  onClick={() => setIsOpen(false)}
                >
                  Affiliate Program
                </MobileNavLink>
              </MobileDropdown>

              <MobileDropdown title="Support">
                <MobileNavLink href="/support" onClick={() => setIsOpen(false)}>
                  Support Center
                </MobileNavLink>
                <MobileNavLink
                  href="/email-us"
                  onClick={() => setIsOpen(false)}
                >
                  Email Us
                </MobileNavLink>
              </MobileDropdown>

              <MobileDropdown title="Legal">
                <MobileNavLink
                  href="/terms-service"
                  onClick={() => setIsOpen(false)}
                >
                  Terms Of Service
                </MobileNavLink>
                <MobileNavLink
                  href="/privacy-policy"
                  onClick={() => setIsOpen(false)}
                >
                  Privacy Policy
                </MobileNavLink>
                <MobileNavLink href="/cookies" onClick={() => setIsOpen(false)}>
                  Cookies Policy
                </MobileNavLink>
                <MobileNavLink
                  href="/disclaimer"
                  onClick={() => setIsOpen(false)}
                >
                  Risk Disclaimer
                </MobileNavLink>
                <MobileNavLink
                  href="/conflict-interest"
                  onClick={() => setIsOpen(false)}
                >
                  Conflict of Interest Policy
                </MobileNavLink>
                <MobileNavLink
                  href="/declaration-consent"
                  onClick={() => setIsOpen(false)}
                >
                  Declaration of Consent
                </MobileNavLink>
                <MobileNavLink
                  href="/user-agreement"
                  onClick={() => setIsOpen(false)}
                >
                  End-User License Agreement
                </MobileNavLink>
                <MobileNavLink
                  href="/regulations"
                  onClick={() => setIsOpen(false)}
                >
                  Trading Regulations
                </MobileNavLink>
              </MobileDropdown>

              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-emerald-500/20">
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-full border-emerald-400/30 hover:bg-emerald-500/10 text-black dark:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/register">Open Account</Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-green-800 hover:bg-green-700 rounded-full dark:bg-gradient-to-l dark:from-white dark:via-emerald-200 dark:to-emerald-600"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/login" className="dark:text-black text-white">
                    Sign In
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Desktop List Item Component
const ListItem = ({
  className,
  title,
  children,
  href,
  ...props
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 focus:bg-emerald-500/10 focus:text-emerald-600 dark:focus:text-emerald-400",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-black dark:text-white">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-700 dark:text-gray-300">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};

// Mobile Navigation Link Component
const MobileNavLink = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="px-4 py-2 rounded-lg text-black dark:text-white hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
    >
      {children}
    </Link>
  );
};

// Mobile Dropdown Component
const MobileDropdown = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-l-2 border-emerald-500/20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left text-black dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex justify-between items-center"
      >
        <span className="font-medium">{title}</span>
        <span
          className={cn(
            "transition-transform duration-300",
            isOpen ? "rotate-180" : "rotate-0"
          )}
        >
          ▼
        </span>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col gap-1 pl-4 py-2">{children}</div>
      </div>
    </div>
  );
};
