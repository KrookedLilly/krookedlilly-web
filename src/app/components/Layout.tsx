import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { InteractiveBackground } from "./InteractiveBackground";
import { ClickFireworks } from "./ClickFireworks";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function Layout() {
  const { pathname } = useLocation();
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-x-hidden">
      {/* Ambient glow blobs — persistent colored light */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]" aria-hidden="true">
        <div className={`absolute w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(160,92,246,0.07)_0%,_transparent_70%)] -top-[5%] left-[5%] will-change-transform${reducedMotion ? "" : " animate-[drift1_25s_ease-in-out_infinite]"}`} />
        <div className={`absolute w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(34,211,238,0.06)_0%,_transparent_70%)] bottom-[5%] right-[5%] will-change-transform${reducedMotion ? "" : " animate-[drift2_30s_ease-in-out_infinite]"}`} />
        <div className={`absolute w-[400px] h-[400px] bg-[radial-gradient(circle,_rgba(124,58,237,0.05)_0%,_transparent_70%)] top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 will-change-transform${reducedMotion ? "" : " animate-[drift3_20s_ease-in-out_infinite]"}`} />
        <div className={`absolute w-[350px] h-[350px] bg-[radial-gradient(circle,_rgba(34,211,238,0.04)_0%,_transparent_70%)] top-[0%] right-[15%] will-change-transform${reducedMotion ? "" : " animate-[drift4_35s_ease-in-out_infinite]"}`} />
        <div className={`absolute w-[300px] h-[300px] bg-[radial-gradient(circle,_rgba(160,92,246,0.04)_0%,_transparent_70%)] bottom-[20%] left-[25%] will-change-transform${reducedMotion ? "" : " animate-[drift5_28s_ease-in-out_infinite]"}`} />
      </div>

      {/* Interactive particle field — responds to mouse movement, sits above blobs */}
      {!reducedMotion && <InteractiveBackground />}

      <Navbar />
      {!reducedMotion && <ClickFireworks />}
      <main className="flex-1 pt-16 relative z-[3]">
        <Outlet />
      </main>
      <div className="relative z-[3]">
        <Footer />
      </div>
    </div>
  );
}