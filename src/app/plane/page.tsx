"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Html, Sphere, Cylinder, PerspectiveCamera } from "@react-three/drei"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, WrenchIcon, ThermometerIcon, Gauge } from "lucide-react"

// Plane // 3D Model
import PlaneLowPoly from "../../../public/PlaneLowPoly";
import LoadingScreen from "@/components/LoadingScreen"
// Define maintenance points with more detailed information
const maintenancePoints = [
  {
    id: "engine1",
    position: [1, 0.25, 0.5],
    label: "Left Engine",
    status: "warning",
    temperature: 82,
    lastMaintenance: "2023-12-15",
    hoursRemaining: 120,
    description: "Temperature slightly elevated",
  },
  {
    id: "engine2",
    position: [-1, 0.25, 0.5],
    label: "Right Engine",
    status: "normal",
    temperature: 75,
    lastMaintenance: "2024-01-10",
    hoursRemaining: 180,
    description: "Operating within normal parameters",
  },
  {
    id: "tail",
    position: [0, 0.9, -2.5],
    label: "Tail Assembly",
    status: "critical",
    temperature: 65,
    lastMaintenance: "2023-10-05",
    hoursRemaining: 15,
    description: "Maintenance required soon",
  },
  {
    id: "nose",
    position: [0, 0, 2.5],
    label: "Nose Landing Gear",
    status: "normal",
    temperature: 68,
    lastMaintenance: "2024-02-01",
    hoursRemaining: 250,
    description: "Recently serviced",
  },
  {
    id: "leftWheel",
    position: [0.5, 0.25, -0.8],
    label: "Left Wheel",
    status: "warning",
    temperature: 82,
    lastMaintenance: "2023-12-15",
    hoursRemaining: 120,
    description: "Temperature slightly elevated",
  },
  {
    id: "rightWheel",
    position: [-0.5, 0.25, -0.8],
    label: "Right Wheel",
    status: "normal",
    temperature: 75,
    lastMaintenance: "2024-01-10",
    hoursRemaining: 180,
    description: "Operating within normal parameters",
  },
];

interface IStatusIndicator {
  position: any;
  label: string,
  onClick: () => void;
  isSelected: boolean;

}

// Replace the StatusIndicator component with this updated version
function StatusIndicator({ position, label, onClick, isSelected }: IStatusIndicator) {
  const indicatorRef = useRef<any>()
  const ringRef = useRef<any>()

  // Subtle floating animation for all indicators
  useFrame(({ clock }) => {
    if (indicatorRef.current) {
      // Gentle floating animation
      indicatorRef.current.position.y = Math.sin(clock.getElapsedTime() * 2 + position[0]) * 0.03
    }

    // Rotation animation for the ring
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.getElapsedTime() * 0.5
    }
  })

  return (
    <group
      position={position}>
      {/* Base indicator */}
      <group
        ref={indicatorRef}
        onClick={onClick}
      // onPointerOver={() => setHovered(true)}
      // onPointerOut={() => setHovered(false)}
      >
        {/* Glowing center sphere */}
        <Sphere args={[0.08, 16, 16]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={0.4}
            roughness={0.3}
            transparent={true}
            opacity={0.9}
          />
        </Sphere>

        {/* Outer ring */}
        <group ref={ringRef}>
          <Cylinder args={[0.15, 0.15, 0.01, 32, 1, true]} position={[0, 0, 0]}>
            <meshStandardMaterial
              color="#0ea5e9"
              emissive="#0ea5e9"
              emissiveIntensity={0.6}
              transparent={true}
              opacity={0.7}
              side={2} // Double-sided
            />
          </Cylinder>
        </group>

        {/* Vertical beam when selected or hovered */}
        {/* {(hovered || isSelected) && ( */}
        <Cylinder args={[0.01, 0.01, 0.5, 8]} position={[0, 0.25, 0]}>
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={0.8}
            transparent={true}
            opacity={0.6}
          />
        </Cylinder>
        {/*  )} */}
      </group>

      {/* HTML label that appears on hover or when selected */}
      <Html
        position={[0, 0.6, 0]} center distanceFactor={10}>
        <Badge
          onClick={onClick}
          className={`whitespace-nowrap shadow-lg ${isSelected ? "bg-white text-sky-500 border border-sky-500 hover:bg-white" : "bg-sky-500 hover:bg-sky-600"}   text-[8px] cursor-pointer`}>
          <span onClick={onClick}>{label}</span>
        </Badge>
      </Html>
    </group>
  )
}

interface IAirplane {
  onSelectPoint: any;
  selectedPoint: any;
  setIsLoaidng: any;
}

// Simple airplane model
function Airplane({ onSelectPoint, selectedPoint, setIsLoaidng }: IAirplane) {
  const groupRef = useRef<any>()
  const scale = 0.1;

  useFrame(() => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.05
    }
  })

  return (
    <group
      ref={groupRef}>
      <PlaneLowPoly
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        scale={[scale, scale, scale]}
        onLoad={() => setIsLoaidng(false)} />

      {/* Status indicators */}
      {
        maintenancePoints.map((point) => (
          <StatusIndicator
            key={point.id}
            position={point.position}
            label={point.label}
            onClick={() => onSelectPoint(point)}
            isSelected={selectedPoint?.id === point.id}
          />
        ))}
    </group>
  )
}

export default function Page() {
  const [selectedPoint, setSelectedPoint] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoaidng] = useState<boolean>(true);

  const handleSelectPoint = (point: any) => {
    setSelectedPoint(point)
    setActiveTab("details")
  }

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-white dark:text-white">
      <header className="border-b border-slate-800 p-4">
        <h1 className="text-2xl font-bold">Aircraft Maintenance Dashboard</h1>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* 3D Viewer */}
        <div
          style={{
            // display: isLoading ? "none" : "flex"
          }}
          className="flex-1 relative">
          <Canvas>
            {/* <PerspectiveCamera makeDefault position={[0, 2, 6]} /> */}
            <PerspectiveCamera makeDefault position={[-10, 10, 10]} />
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} minDistance={4} maxDistance={10} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
            <Airplane onSelectPoint={handleSelectPoint} selectedPoint={selectedPoint} setIsLoaidng={setIsLoaidng} />

            {/* Grid and environment */}
            <gridHelper args={[20, 20, "#4338ca", "#1e3a8a"]} position={[0, -1, 0]} />
            {/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
              <planeGeometry args={[20, 20]} />
              <meshStandardMaterial color="#9c9ca1" />
            </mesh> */}
            <Environment preset="night" />
          </Canvas>

          {/* Legend */}
          <div className="absolute bottom-4 left-4">
            <Badge className="flex items-center gap-1 bg-sky-500">
              <div className="w-2 h-2 rounded-full bg-sky-300"></div> Interactive Points
            </Badge>
          </div>
        </div>

        {
          false &&
          <LoadingScreen />
        }

        {/* Info Panel */}
        <div className="w-96 border-l border-slate-800 overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="p-4">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle>Aircraft Status</CardTitle>
                  <CardDescription>Maintenance overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {maintenancePoints.map((point) => (
                    <div
                      key={point.id}
                      className="flex items-center justify-between p-2 rounded-md bg-slate-700 cursor-pointer hover:bg-slate-600"
                      onClick={() => handleSelectPoint(point)}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${point.status === "critical"
                            ? "bg-red-500"
                            : point.status === "warning"
                              ? "bg-amber-500"
                              : "bg-green-500"
                            }`}
                        ></div>
                        <span>{point.label}</span>
                      </div>
                      <span className="text-sm text-slate-300">{point.hoursRemaining}h remaining</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="p-4">
              {selectedPoint ? (
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      {selectedPoint.label}
                      <Badge
                        variant={
                          selectedPoint.status === "critical"
                            ? "destructive"
                            : selectedPoint.status === "warning"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {selectedPoint.status.toUpperCase()}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{selectedPoint.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm text-white">Temperature</span>
                        <div className="flex items-center gap-2">
                          <ThermometerIcon className="h-4 w-4" />
                          <span className="font-medium">{selectedPoint.temperature}°C</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-sm text-white">Hours Remaining</span>
                        <div className="flex items-center gap-2">
                          <Gauge className="h-4 w-4" />
                          <span className="font-medium">{selectedPoint.hoursRemaining}h</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-slate-400">Last Maintenance</span>
                      <div className="flex items-center gap-2">
                        <WrenchIcon className="h-4 w-4" />
                        <span className="font-medium">{selectedPoint.lastMaintenance}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Schedule Maintenance</Button>
                  </CardFooter>
                </Card>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                  <AlertCircle className="h-8 w-8 mb-2" />
                  <p>Select a maintenance point to view details</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div >
  )
}
