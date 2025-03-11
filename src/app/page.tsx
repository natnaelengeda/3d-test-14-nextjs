"use client"

import Plane3D from "@/components/Plane3D";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-start justify-start">
      <div className="w-full h-20 border-b border-black text-black flex items-center justify-center">
        <h1 className="text-3xl font-bold">3D Test</h1>
      </div>

      {/* Main  */}
      <div className="w-full h-full  bg-gray-200 grid grid-cols-3">
        <div className="w-full flex flex-col items-start justify-start">
          {
            [1, 2, 3, 4, 5].map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full h-40 border-b border-black bg-amber-400 text-black flex items-center justify-center">
                </div>
              );
            })
          }
        </div>
        <div
          className="w-full h-full col-span-2 bg-gray-500">
          <Plane3D />
        </div>
      </div>
    </div>
  );
}
