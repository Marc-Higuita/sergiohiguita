'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  scrollProgress: number;
}

function Model({ scrollProgress }: ModelProps) {
  const gltf = useGLTF('/img/modelo/termo.glb');
  const modelRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (modelRef.current) {
      // Rotación en función del scroll: a medida que bajas, el termo va girando de forma fluida
      modelRef.current.rotation.y = scrollProgress * Math.PI * 4; // Da dos vueltas completas al hacer scroll
      modelRef.current.rotation.x = scrollProgress * 0.5; // Ligera inclinación orgánica
    }
  });

  return (
    <group ref={modelRef}>
      <Center>
        <primitive object={gltf.scene} scale={2.8} />
      </Center>
    </group>
  );
}

interface WaterBottle3DProps {
  scrollProgress: number;
}

export default function WaterBottle3D({ scrollProgress }: WaterBottle3DProps) {
  return (
    <div className="w-full h-full relative pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 10, 5]} intensity={3} />
        <pointLight position={[-5, -5, -5]} intensity={1} />

        <Model scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}