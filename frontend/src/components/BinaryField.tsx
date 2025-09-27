import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import styles from './BinaryField.module.css'

type Props = {
  density?: number;
  speed?: number;
  opacity?: number;
  color?: string;
  count?: number;
  flipMin?: number; // min seconds between flips
  flipMax?: number; // max seconds between flips
  spin?: number;    // radians/sec sprite spin
};

const HEX_CHARS = "0123456789ABCDEF".split("");

function makeGlyphTexture(char: string, color = "rgba(110,255,170,1)") {
  const size = 128;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, size, size);
  ctx.shadowColor = color;
  ctx.shadowBlur = 22;
  ctx.fillStyle = color;
  ctx.font = "bold 96px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(char, size / 2, size / 2 + 6);
  const tex = new THREE.CanvasTexture(c);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.anisotropy = 2;
  return tex;
}

function HexSprites({
  density = 0.9,
  speed = 1.0,
  color = "rgba(41, 169, 95, 0.95)",
  count = 400,
  flipMin = 2.0,
  flipMax = 6.0,
  spin = 0.2,
}: Required<Pick<Props, "density" | "speed" | "color" | "count" | "flipMin" | "flipMax" | "spin">>) {
  const group = useRef<THREE.Group>(null!);

  const { sprites, velocities, spread, glyphIndex, nextFlipAt, maps } = useMemo(() => {
    const spread = 26;
    const actual = Math.max(16, Math.floor(count * density));
    const sprites: THREE.Sprite[] = [];
    const velocities: THREE.Vector3[] = [];
    const glyphIndex: Uint8Array = new Uint8Array(actual);
    const nextFlipAt: Float32Array = new Float32Array(actual);

    // pre-render textures for all hex chars
    const maps = HEX_CHARS.map((ch) => makeGlyphTexture(ch, color));

    for (let i = 0; i < actual; i++) {
      glyphIndex[i] = Math.floor(Math.random() * maps.length);
      const mat = new THREE.SpriteMaterial({
        map: maps[glyphIndex[i]],
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        opacity: 0.9,
      });
      
      const s = new THREE.Sprite(mat);
      s.position.set(
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread
      );
      s.scale.setScalar(Math.random() * 0.6 + 0.3);
      sprites.push(s);

      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.15,
          (Math.random() - 0.5) * 0.25,
          -(Math.random() * 0.7 + 0.25)
        )
      );

      nextFlipAt[i] = Math.random() * (flipMax - flipMin) + flipMin;
    }
    return { sprites, velocities, spread, glyphIndex, nextFlipAt, maps };
  }, [count, density, color, flipMin, flipMax]);

  // mount/unmount
  useEffect(() => {
    const g = group.current;
    sprites.forEach((s) => g.add(s));
    return () => void sprites.forEach((s) => g.remove(s));
  }, [sprites]);

  useFrame((state, dt) => {
    const g = group.current;
    const t = state.clock.getElapsedTime();

    g.rotation.z += 0.02 * dt;
    g.rotation.y += 0.015 * dt;

    for (let i = 0; i < sprites.length; i++) {
      const s = sprites[i];
      const v = velocities[i];

      // motion
      s.position.x += v.x * dt * speed;
      s.position.y += v.y * dt * speed;
      s.position.z += v.z * dt * speed;

      // recycle past camera
      if (s.position.z < -spread / 2 - 6) {
        s.position.z = spread / 2 + 6;
        s.position.x = (Math.random() - 0.5) * spread;
        s.position.y = (Math.random() - 0.5) * spread;
      }

      // spin
      (s.material as THREE.SpriteMaterial).rotation += spin * dt;

      // flip at intervals
      if (t >= nextFlipAt[i]) {
        glyphIndex[i] = Math.floor(Math.random() * maps.length);
        (s.material as THREE.SpriteMaterial).map = maps[glyphIndex[i]];
        (s.material as THREE.SpriteMaterial).needsUpdate = true;
        nextFlipAt[i] = t + (Math.random() * (flipMax - flipMin) + flipMin);
      }
    }

    state.camera.position.z = 9;
  });

  return <group ref={group} />;
}

export default function HexRain3D({
  density = 0.9,
  speed = 1.0,
  opacity = 0.75,
  color = "rgba(110,255,170,0.95)",
  count = 400,
  flipMin = 2.0,
  flipMax = 6.0,
  spin = 0.18,
}: Props) {
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  if (reduceMotion) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity,
      }}
      aria-hidden
    >
     <Canvas
      style={{ pointerEvents: "none" }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      camera={{ fov: 60, position: [0, 0, 9] }}
    >
      <fog attach="fog" args={["#000000", 5, 20]} />
      <HexSprites
        density={density}
        speed={speed}
        color={color}
        count={count}
        flipMin={flipMin}
        flipMax={flipMax}
        spin={spin}
      />
    </Canvas>
    </div>
  );
}
