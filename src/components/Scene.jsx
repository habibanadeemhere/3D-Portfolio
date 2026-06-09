import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import Particles from "./Particles";

function FloatingTorus() {
  const mesh = useRef();

  useFrame((state) => {
    mesh.current.rotation.x =
      state.clock.elapsedTime * 0.2;

    mesh.current.rotation.y =
      state.clock.elapsedTime * 0.3;
  });

  return (
    <Float speed={2}>
      <mesh ref={mesh}>
        <torusKnotGeometry args={[1.3, 0.35, 150, 20]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={1}
          wireframe
        />
      </mesh>
    </Float>
  );
}

export default function Scene() {
  return (
    <div className="scene">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={1} />

        <pointLight
          position={[10, 10, 10]}
          intensity={3}
        />
        
        <Particles />

        <FloatingTorus />
      </Canvas>
    </div>
  );
}