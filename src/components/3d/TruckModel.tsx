"use client";

import { usePathname } from "next/navigation";
import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";

export default function TruckModel() {
  const pathname = usePathname();
  const groupRef = useRef<THREE.Group>(null);
  
  // Store target vectors to avoid recreating them every frame
  const targetPos = useRef(new THREE.Vector3());
  const targetRot = useRef(new THREE.Euler());
  const targetScale = useRef(new THREE.Vector3(1, 1, 1));

  // Define positions based on current route
  const updateTargets = () => {
    if (pathname === "/") {
      targetPos.current.set(2, -1, 3);
      targetRot.current.set(0, -Math.PI / 6, 0);
      targetScale.current.set(1.2, 1.2, 1.2);
    } else if (pathname === "/about") {
      targetPos.current.set(-3, 1, 2);
      targetRot.current.set(0, Math.PI / 4, 0);
      targetScale.current.set(1, 1, 1);
    } else if (pathname === "/get-a-quote") {
      targetPos.current.set(4, 2, 0);
      targetRot.current.set(0, -Math.PI / 2, 0);
      targetScale.current.set(0.8, 0.8, 0.8);
    } else if (pathname?.startsWith("/packages")) {
      targetPos.current.set(0, 0, 4);
      targetRot.current.set(0, 0, 0);
      targetScale.current.set(1.5, 1.5, 1.5);
    } else {
      // Default position
      targetPos.current.set(0, -2, 4);
      targetRot.current.set(0, 0, 0);
      targetScale.current.set(1, 1, 1);
    }
  };

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Update targets dynamically based on route
    updateTargets();

    // Smoothly interpolate position, rotation, and scale towards the target using native lerp
    // We use a factor (e.g. 0.05) that scales slightly with delta for framerate independence
    const lerpFactor = 1 - Math.exp(-4 * delta);
    
    groupRef.current.position.lerp(targetPos.current, lerpFactor);
    groupRef.current.scale.lerp(targetScale.current, lerpFactor);
    
    // For rotation, we can interpolate the Euler angles manually
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRot.current.x, lerpFactor);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRot.current.y, lerpFactor);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRot.current.z, lerpFactor);

    // Add a gentle floating animation on top of the interpolated position
    groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 2) * 0.002;
  });

  return (
    <group ref={groupRef}>
      {/* 
        Stylized 3D Ice Cream Truck built with primitives.
        Replace this with a real useGLTF('/truck.gltf') later. 
      */}
      
      {/* Truck Body */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 1.5, 1.5]} />
        <meshStandardMaterial color="#FDFBF7" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Truck Roof / Awning */}
      <mesh position={[0, 1.3, 0]} castShadow>
        <boxGeometry args={[3.2, 0.2, 1.7]} />
        <meshStandardMaterial color="#FF6B6B" roughness={0.4} />
      </mesh>

      {/* Wheels */}
      {[
        [-1, 0, 0.8],
        [1, 0, 0.8],
        [-1, 0, -0.8],
        [1, 0, -0.8],
      ].map((pos, idx) => (
        <mesh key={idx} position={pos as [number, number, number]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
          <meshStandardMaterial color="#0A192F" roughness={0.8} />
        </mesh>
      ))}

      {/* Decorative Giant Cone on Roof */}
      <group position={[0, 1.8, 0]}>
        {/* Cone */}
        <mesh rotation={[Math.PI, 0, 0]} castShadow>
          <coneGeometry args={[0.4, 1, 16]} />
          <meshStandardMaterial color="#D4AF37" roughness={0.6} />
        </mesh>
        {/* Scoop 1 */}
        <mesh position={[0, 0.6, 0]} castShadow>
          <sphereGeometry args={[0.45, 32, 32]} />
          <meshStandardMaterial color="#FF6B6B" roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}
