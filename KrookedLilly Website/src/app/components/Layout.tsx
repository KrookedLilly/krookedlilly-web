import { Outlet, ScrollRestoration } from "react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { InteractiveBackground } from "./InteractiveBackground";
import { ClickFireworks } from "./ClickFireworks";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      {/* Ambient glow blobs — persistent colored light for glass/blur to actually show */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]" aria-hidden="true">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-primary/[0.07] blur-[160px] -top-[5%] left-[5%] animate-[drift1_25s_ease-in-out_infinite]" />
        <div className="absolute w-[500px] h-[500px] rounded-full bg-teal/[0.06] blur-[140px] bottom-[5%] right-[5%] animate-[drift2_30s_ease-in-out_infinite]" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-accent/[0.05] blur-[120px] top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 animate-[drift3_20s_ease-in-out_infinite]" />
        <div className="absolute w-[350px] h-[350px] rounded-full bg-teal/[0.04] blur-[100px] top-[0%] right-[15%] animate-[drift4_35s_ease-in-out_infinite]" />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-primary/[0.04] blur-[100px] bottom-[20%] left-[25%] animate-[drift5_28s_ease-in-out_infinite]" />
      </div>

      {/* Interactive particle field — responds to mouse movement, sits above blobs */}
      <InteractiveBackground />

      {/* Film grain noise overlay */}
      <svg
        className="fixed inset-0 w-full h-full pointer-events-none z-[100]"
        style={{ opacity: 0.035 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      <Navbar />
      <ClickFireworks />
      <main className="flex-1 pt-16 relative z-[3]">
        <Outlet />
      </main>
      <div className="relative z-[3]">
        <Footer />
      </div>
      <ScrollRestoration />
    </div>
  );
}
