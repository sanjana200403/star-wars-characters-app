import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export const StarBackground: React.FC = () => {
  const particlesInit = async (engine: any) => {
    await loadFull(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        background: { color: "#0b0d17" },
        fpsLimit: 60,
        particles: {
          number: { value: 80, density: { enable: true, area: 800 } },
          color: { value: "#ffffff" },
          opacity: { value: 0.3 },
          size: { value: { min: 0.5, max: 2 } },
          move: { enable: true, speed: 0.3 },
          links: { enable: false },
        },
        detectRetina: true,
      }}
    />
  );
};
