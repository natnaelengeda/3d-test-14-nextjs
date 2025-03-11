import { useState } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface MarkerProps {
  position: [number, number, number];
  label: string;
  description: string;
}

export function Marker({ position, label, description }: MarkerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <group position={new THREE.Vector3(...position)}>
      {/* Dot/Marker */}
      <mesh
        onClick={() => setIsModalOpen(true)}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      >
        <sphereGeometry args={[1.4, 50, 50]} />
        <meshBasicMaterial
          color={isHovered ? "#ff0000" : "#ff0000"}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Modal */}
      {isModalOpen && (
        <Html>
          <div
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: '20px',
              borderRadius: '8px',
              width: '250px',
              transform: 'translateX(-50%)',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0' }}>{label}</h3>
            <p style={{ margin: '0 0 10px 0' }}>{description}</p>
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                backgroundColor: '#ffffff',
                color: '#000000',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </Html>
      )}
    </group>
  );
}
