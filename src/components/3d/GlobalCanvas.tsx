"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { ReactNode, Suspense } from "react";
import TruckModel from "./TruckModel";

interface GlobalCanvasProps {
  children: ReactNode; // This will hold the entire Next.js app
}

export default function GlobalCanvas({ children }: GlobalCanvasProps) {
  return (
    <div className="relative w-full h-full min-h-screen flex flex-col">
      {/* 3D Canvas Layer - Fixed behind/above the UI based on z-index */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas shadows camera={{ position: [0, 0, 10], fov: 45 }}>
          
          <ambientLight intensity={0.5} />
          <directionalLight
            castShadow
            position={[5, 10, 5]}
            intensity={1.5}
            shadow-mapSize={1024}
          />
          <Environment preset="city" />

          {/* The moving 3D Ice Cream Truck */}
          <Suspense fallback={null}>
            <TruckModel />
          </Suspense>
        </Canvas>
      </div>

      {/* The Actual Next.js Page Content Layer - Scrollable & Interactive */}
      <div className="relative z-10 flex-1 w-full h-full">
        {children}
      </div>
    </div>
  );
}
