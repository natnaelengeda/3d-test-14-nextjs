"use client";
import { Suspense, useState } from "react";

// Three js
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

// 3D Model
import PlaneLowPoly from "../../public/PlaneLowPoly";

// Components
import { Marker } from "./Marker";
import LoadingScreen from "./LoadingScreen";


export default function Plane3D() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full h-[45rem] bg-gray-600">
      <>
        {isLoading && <LoadingScreen />}
        <Canvas
          camera={{
            // position: [-5, 7, -5], // Positioned above and behind for top-down angled view
            position: [-50, 50, 60], // Positioned above and behind for top-down angled view
            // position: [-10, 10, -9], // Positioned above and behind for top-down angled view
            fov: 35,  // Narrower FOV for better perspective
            // near: 0.1,
            // far: 1000
          }}
        >
          <ambientLight intensity={1} />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            target={[0, 0, 0]}
          />
          <Suspense fallback={null}>
            <PlaneLowPoly
              position={[0, -5, 0]}
              rotation={[0, 0, 0]} // Tilted slightly up and rotated 180°
              onLoad={() => setIsLoading(false)}
            />

            {/* Tail */}
            <Marker
              position={[-2, 10, -35]}
              label="Engine Issue"
              description="Left engine requires maintenance due to unusual vibration."
            />

            {/* Nose */}
            <Marker
              position={[0, -2, 30]}
              label="Wing Status"
              description="Right wing flaps operating normally."
            />

            {/* Engine */}
            <Marker
              position={[-12, 1, 3]}
              label="Engine Status"
              description="Right wing flaps operating normally."
            />

            {/* Wings */}
            <Marker
              position={[12, 2, -4]}
              label="Wing Status"
              description="Right wing flaps operating normally."
            />

            <Marker
              position={[0, 1, 1]}
              label="Wing Status"
              description="Right wing flaps operating normally."
            />

          </Suspense>
          <Environment preset="night" /> {/* Changed to night to match the dark background */}
        </Canvas>
      </>
    </div>
  )
}
