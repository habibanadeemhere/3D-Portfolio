import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function Particles({ count = 4000 }) {
  const points = useRef();
  const { viewport } = useThree();

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const colorOptions = [
      new THREE.Color("#8b5cf6"),
      new THREE.Color("#a855f7"),
      new THREE.Color("#c084fc"),
      new THREE.Color("#7c3aed"),
      new THREE.Color("#e879f9"),
    ];

    for (let i = 0; i < count; i++) {
      // Sphere distribution for more natural spread
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 8 + Math.random() * 18;

      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const col = colorOptions[Math.floor(Math.random() * colorOptions.length)];
      colors[i * 3]     = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      sizes[i] = Math.random() * 1.5 + 0.3;
    }

    return { positions, colors, sizes };
  }, [count]);

  useFrame(({ clock, mouse }) => {
    const t = clock.elapsedTime;
    points.current.rotation.y = t * 0.018;
    points.current.rotation.x = Math.sin(t * 0.008) * 0.15;

    // Subtle mouse parallax
    points.current.rotation.z = mouse.x * 0.03;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          array={sizes}
          count={count}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.75}
        depthWrite={false}
      />
    </points>
  );
}