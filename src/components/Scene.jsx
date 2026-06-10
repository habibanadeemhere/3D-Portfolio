import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars, Trail } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import Particles from "./Particles";

/* ── Spinning torus knot ── */
function TorusKnot() {
  const mesh = useRef();
  const mat = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    mesh.current.rotation.x = t * 0.18;
    mesh.current.rotation.y = t * 0.26;
    mat.current.emissiveIntensity = 0.6 + Math.sin(t * 1.4) * 0.4;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={mesh} castShadow>
        <torusKnotGeometry args={[1.1, 0.32, 200, 24]} />
        <meshStandardMaterial
          ref={mat}
          color="#8b5cf6"
          emissive="#a855f7"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.8}
          wireframe
        />
      </mesh>
    </Float>
  );
}

/* ── Orbiting energy orbs ── */
function OrbRing({ radius = 2.8, speed = 0.4, color = "#c084fc", phase = 0 }) {
  const mesh = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + phase;
    mesh.current.position.x = Math.cos(t) * radius;
    mesh.current.position.y = Math.sin(t * 0.6) * 0.8;
    mesh.current.position.z = Math.sin(t) * radius;
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={3}
        toneMapped={false}
      />
    </mesh>
  );
}

/* ── Distorted floating sphere ── */
function FloatingSphere() {
  const mesh = useRef();

  useFrame(({ clock }) => {
    mesh.current.rotation.z = clock.elapsedTime * 0.1;
  });

  return (
    <Float speed={0.8} floatIntensity={1.2}>
      <mesh ref={mesh} position={[3.5, 0.5, -2]}>
        <sphereGeometry args={[0.9, 64, 64]} />
        <MeshDistortMaterial
          color="#4c1d95"
          emissive="#7c3aed"
          emissiveIntensity={0.5}
          roughness={0}
          metalness={1}
          distort={0.5}
          speed={2}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
}

/* ── Secondary small orb ── */
function SmallOrb() {
  return (
    <Float speed={2.2} floatIntensity={2}>
      <mesh position={[-3.2, -0.8, -1.5]}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <MeshDistortMaterial
          color="#6d28d9"
          emissive="#8b5cf6"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.9}
          distort={0.4}
          speed={3}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

/* ── Pulsing ring ── */
function PulsingRing() {
  const mesh = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const s = 1 + Math.sin(t * 0.8) * 0.06;
    mesh.current.scale.set(s, s, s);
    mesh.current.rotation.x = t * 0.05;
    mesh.current.rotation.z = t * 0.08;
  });

  return (
    <mesh ref={mesh}>
      <torusGeometry args={[2.2, 0.012, 8, 120]} />
      <meshStandardMaterial
        color="#a855f7"
        emissive="#a855f7"
        emissiveIntensity={2}
        toneMapped={false}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
}

/* ── Dynamic lights ── */
function DynamicLights() {
  const light1 = useRef();
  const light2 = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    light1.current.position.x = Math.sin(t * 0.5) * 5;
    light1.current.position.z = Math.cos(t * 0.5) * 5;
    light2.current.position.x = Math.cos(t * 0.3) * 4;
    light2.current.position.y = Math.sin(t * 0.4) * 3;
  });

  return (
    <>
      <pointLight ref={light1} color="#8b5cf6" intensity={6} distance={12} />
      <pointLight ref={light2} color="#c084fc" intensity={4} distance={10} position={[0, 3, 2]} />
      <pointLight color="#4c1d95" intensity={3} position={[-5, -3, -5]} />
    </>
  );
}

/* ── Main scene export ── */
export default function Scene() {
  return (
    <div className="scene-canvas">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <ambientLight intensity={0.2} />
        <DynamicLights />

        <Stars radius={60} depth={50} count={2000} factor={3} saturation={0.8} fade speed={0.5} />
        <Particles />

        <TorusKnot />
        <FloatingSphere />
        <SmallOrb />
        <PulsingRing />

        <OrbRing radius={2.8} speed={0.5} color="#c084fc" phase={0} />
        <OrbRing radius={2.8} speed={0.5} color="#a855f7" phase={2.1} />
        <OrbRing radius={2.8} speed={0.5} color="#7c3aed" phase={4.2} />
        <OrbRing radius={3.5} speed={0.3} color="#e879f9" phase={1} />

        <EffectComposer>
          <Bloom
            intensity={1.8}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={[0.0005, 0.0005]}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}