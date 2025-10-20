"use client";

import React, { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import { useRouter } from "next/navigation";
// import ScrollReveal from "@/components/ui/ScrollReveal"; // ✅ Add this import

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  update: (canvas: HTMLCanvasElement) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 80;
    const connectionDistance = 150;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor(canvas: HTMLCanvasElement) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }

      update(canvas: HTMLCanvasElement) {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(16, 185, 129, 0.5)";
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas));
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.update(canvas);
        particle.draw(ctx);

        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${
              0.2 * (1 - distance / connectionDistance)
            })`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full transition-colors duration-500 ${
        theme === "light"
          ? "bg-gradient-to-b from-white to-[#f0f0f0]"
          : "bg-gradient-to-b from-black to-[#0a0a0a]"
      }`}
    />
  );
};

const CryptoHeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  // const [showChat, setShowChat] = useState(false);

  const router = useRouter();

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black dark:bg-white">
      <ParticlesBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-12 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full mt-10 md:mt-20 text-center md:text-left">
          {/* Left Content */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="space-y-8">
              {/* Main Heading */}
              <h1 className="text-3xl md:text-4xl font-bold leading-tight text-white dark:text-black">
                <span className="text-emerald-600 dark:bg-gradient-to-r dark:from-white dark:via-emerald-200 dark:to-emerald-400 dark:bg-clip-text dark:text-transparent">
                  Copy Stocks, Options & Contracts with Precision.
                </span>{" "}
                <span className="text-emerald-600 dark:bg-gradient-to-r dark:from-white dark:via-emerald-200 dark:to-emerald-400 dark:bg-clip-text dark:text-transparent">
                  The Premier Copy-Trading
                </span>{" "}
                <span className="dark:text-white text-black">
                  Hub for Options
                </span>{" "}
                <span className=" dark:text-white text-black">Traders</span>
              </h1>

              {/* Subheading */}
              <p className="dark:text-white text-black text-lg lg:text-xl font-light max-w-2xl">
                <span className="font-semibold mt-2 mb-4 inline-block">
                  Go long, go short, or go Citadel.
                </span>
                <br />
                <span className="dark:text-gray-300 text-gray-900 font-semibold">
                  Citadel empowers you to mirror real-time stock and options
                  trades from top-performing traders. Whether you&apos;re
                  following tickers, contracts, or strategic options moves, our
                  platform brings precision, flexibility, and
                  transparency—straight to your fingertips.
                </span>
              </p>

              {/* CTA Button */}
              <div className="pt-4">
                <button
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={() => router.push("/register")}
                  className="group relative px-10 py-5 text-lg font-medium text-green-900 hover:text-white dark:text-white rounded-full overflow-hidden transition-all duration-300"
                  style={{
                    background: isHovered
                      ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                      : "rgba(16, 185, 129, 0.1)",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    boxShadow: isHovered
                      ? "0 0 30px rgba(16, 185, 129, 0.5), 0 0 60px rgba(16, 185, 129, 0.3)"
                      : "0 0 20px rgba(16, 185, 129, 0.2)",
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started
                    <span className="text-xl">→</span>
                  </span>
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Image */}
          <ScrollReveal direction="up" delay={0.4}>
            <Image
              src={"/images/connection.jpg"}
              width={6000}
              height={4000}
              alt="mapconnection"
              className="rounded-3xl"
            />
          </ScrollReveal>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default CryptoHeroSection;
