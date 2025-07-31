// Scene.jsx
import { useFrame } from "@react-three/fiber";
import Matter from "matter-js";
import { useEffect, useRef, useState } from "react";

const SCALE = 0.01; // scale Matter.js pixels → Three.js units

export default function Scene() {
  const meshRef = useRef();

  const engineRef = useRef();
  const boxRef = useRef();

  useEffect(() => {
    const engine = Matter.Engine.create();
    const world = engine.world;

    // Create physics bodies in pixel units
    const box = Matter.Bodies.rectangle(300, 500, 100, 100);
    const ground = Matter.Bodies.rectangle(400, 100, 800, 50, { isStatic: true });

    Matter.World.add(world, [box, ground]);

    engineRef.current = engine;
    boxRef.current = box;
  }, []);

  useFrame(() => {
    if (!engineRef.current || !boxRef.current || !meshRef.current) return;

    Matter.Engine.update(engineRef.current);

    const pos = boxRef.current.position;
    const angle = boxRef.current.angle;

    // Scale from pixels to R3F units
    // meshRef.current.position.set(pos.x * SCALE, pos.y * SCALE, 0);
    meshRef.current.rotation.z = angle;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshNormalMaterial />
    </mesh>
  );
}
