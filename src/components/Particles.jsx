import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Particles() {
  const points = useRef();

  const particles = useMemo(() => {
    const positions = [];

    for (let i = 0; i < 2500; i++) {
      positions.push(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30
      );
    }

    return new Float32Array(positions);
  }, []);

  useFrame((state) => {
    points.current.rotation.y =
      state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particles}
          count={particles.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.03}
        color="#8b5cf6"
      />
    </points>
  );
}