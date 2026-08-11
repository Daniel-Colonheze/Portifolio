"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import * as THREE from "three";
import { Environment, RoundedBox, ContactShadows, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

type Axis = "x" | "y" | "z";
type Face = "x+" | "x-" | "y+" | "y-" | "z+" | "z-";

type CubieData = {
  id: number;
  position: [number, number, number];
  stickers: Partial<Record<Face, string>>;
};

type Move = {
  axis: Axis;
  layer: number;
  direction: 1 | -1;
};

type ControlsData = {
  moves: number;
  canUndo: boolean;
  onMove: (axis: Axis, layer: number, direction: 1 | -1) => void;
  onShuffle: () => void;
  onUndo: () => void;
};

const SIZE = 1;
const GAP = 0.06;
const STEP = SIZE + GAP;
const STICKER_OFFSET = SIZE / 2 + 0.008;
const BEVEL = 0.06;

const COLORS = {
  red: "#e3352f",
  orange: "#ff8a1e",
  blue: "#1f6fe0",
  green: "#28a745",
  white: "#f7f7f9",
  yellow: "#ffd21f",
  black: "#111114",
};

// ---------- geometry helpers ----------

function createCubies(): CubieData[] {
  const result: CubieData[] = [];
  let id = 0;

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        const stickers: Partial<Record<Face, string>> = {};

        if (x === 1) stickers["x+"] = COLORS.blue;
        if (x === -1) stickers["x-"] = COLORS.green;
        if (y === 1) stickers["y+"] = COLORS.white;
        if (y === -1) stickers["y-"] = COLORS.yellow;
        if (z === 1) stickers["z+"] = COLORS.red;
        if (z === -1) stickers["z-"] = COLORS.orange;

        result.push({ id: id++, position: [x, y, z], stickers });
      }
    }
  }

  return result;
}

const AXIS_VECTORS: Record<Axis, THREE.Vector3> = {
  x: new THREE.Vector3(1, 0, 0),
  y: new THREE.Vector3(0, 1, 0),
  z: new THREE.Vector3(0, 0, 1),
};

function faceToVector(face: Face): THREE.Vector3 {
  const m: Record<Face, [number, number, number]> = {
    "x+": [1, 0, 0],
    "x-": [-1, 0, 0],
    "y+": [0, 1, 0],
    "y-": [0, -1, 0],
    "z+": [0, 0, 1],
    "z-": [0, 0, -1],
  };
  const v = m[face];
  return new THREE.Vector3(v[0], v[1], v[2]);
}

function vectorToFace(vector: THREE.Vector3): Face {
  const x = Math.round(vector.x), y = Math.round(vector.y), z = Math.round(vector.z);
  if (x === 1) return "x+";
  if (x === -1) return "x-";
  if (y === 1) return "y+";
  if (y === -1) return "y-";
  return z === 1 ? "z+" : "z-";
}

function rotatePosition(position: [number, number, number], axis: Axis, direction: 1 | -1): [number, number, number] {
  const [x, y, z] = position;
  if (axis === "x") return direction === 1 ? [x, -z, y] : [x, z, -y];
  if (axis === "y") return direction === 1 ? [z, y, -x] : [-z, y, x];
  return direction === 1 ? [-y, x, z] : [y, -x, z];
}

function rotateFace(face: Face, axis: Axis, direction: 1 | -1): Face {
  const vector = faceToVector(face);
  const angle = (direction * Math.PI) / 2;
  vector.applyAxisAngle(AXIS_VECTORS[axis], angle);
  return vectorToFace(vector);
}

function rotateStickers(stickers: Partial<Record<Face, string>>, axis: Axis, direction: 1 | -1): Partial<Record<Face, string>> {
  const rotated: Partial<Record<Face, string>> = {};
  Object.entries(stickers).forEach(([face, color]) => {
    if (!color) return;
    rotated[rotateFace(face as Face, axis, direction)] = color;
  });
  return rotated;
}

function setGroupRotation(group: THREE.Group | null, axis: Axis | null, value = 0) {
  if (!group || !axis) return;
  group.rotation.set(axis === "x" ? value : 0, axis === "y" ? value : 0, axis === "z" ? value : 0);
}

function resetGroupRotation(group: THREE.Group | null) {
  if (!group) return;
  group.rotation.set(0, 0, 0);
}

// Projects a world-space direction vector, anchored at `origin`, into normalized
// screen-space (x right, y down) so we can compare it against a mouse drag vector.
function screenDirection(
  origin: THREE.Vector3,
  worldDir: THREE.Vector3,
  camera: THREE.Camera,
  size: { width: number; height: number }
): { x: number; y: number } {
  const a = origin.clone().project(camera);
  const b = origin.clone().add(worldDir.clone().multiplyScalar(0.15)).project(camera);
  const dx = ((b.x - a.x) * size.width) / 2;
  const dy = (-(b.y - a.y) * size.height) / 2;
  const len = Math.hypot(dx, dy) || 1;
  return { x: dx / len, y: dy / len };
}

// ---------- visual pieces ----------

function Sticker({ face, color }: { face: Face; color: string }) {
  const CONFIG: Record<Face, { position: [number, number, number]; rotation: [number, number, number] }> = {
    "x+": { position: [STICKER_OFFSET, 0, 0], rotation: [0, Math.PI / 2, 0] },
    "x-": { position: [-STICKER_OFFSET, 0, 0], rotation: [0, -Math.PI / 2, 0] },
    "y+": { position: [0, STICKER_OFFSET, 0], rotation: [-Math.PI / 2, 0, 0] },
    "y-": { position: [0, -STICKER_OFFSET, 0], rotation: [Math.PI / 2, 0, 0] },
    "z+": { position: [0, 0, STICKER_OFFSET], rotation: [0, 0, 0] },
    "z-": { position: [0, 0, -STICKER_OFFSET], rotation: [0, Math.PI, 0] },
  };
  const current = CONFIG[face];

  return (
    <mesh position={current.position} rotation={current.rotation}>
      <planeGeometry args={[0.8, 0.8]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.32}
        clearcoat={0.6}
        clearcoatRoughness={0.25}
        metalness={0}
      />
    </mesh>
  );
}

function Cubie({
  cubie,
  selected,
  onPointerDown,
}: {
  cubie: CubieData;
  selected: boolean;
  onPointerDown: (event: any, cubie: CubieData) => void;
}) {
  const [x, y, z] = cubie.position;

  return (
    <group
      position={[x * STEP, y * STEP, z * STEP]}
      onPointerDown={(event) => {
        event.stopPropagation();
        onPointerDown(event, cubie);
      }}
    >
      <RoundedBox args={[SIZE, SIZE, SIZE]} radius={BEVEL} smoothness={4}>
        <meshPhysicalMaterial
          color={selected ? "#26262d" : COLORS.black}
          roughness={0.45}
          clearcoat={0.3}
          metalness={0.05}
        />
      </RoundedBox>

      {Object.entries(cubie.stickers).map(([face, color]) => {
        if (!color) return null;
        return <Sticker key={face} face={face as Face} color={color} />;
      })}
    </group>
  );
}

// ---------- camera responsiveness ----------

function ResponsiveCamera({
  pointerDown,
  pointerOver,
  controlsRef,
}: {
  pointerDown: boolean;
  pointerOver: boolean;
  controlsRef: React.MutableRefObject<any>;
}) {
  const { camera, size } = useThree();
  const isMobile = size.width < 640;
  const prevMobile = useRef<boolean | null>(null);

  useEffect(() => {
    if (prevMobile.current === isMobile) return;
    prevMobile.current = isMobile;

    const distance = isMobile ? 12.5 : 9.5;
    const dir = new THREE.Vector3(0.62, 0.55, 0.75).normalize();
    camera.position.copy(dir.multiplyScalar(distance));

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = isMobile ? 42 : 36;
      camera.updateProjectionMatrix();
    }

    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  }, [isMobile, camera, controlsRef]);

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableDamping
      dampingFactor={0.08}
      enablePan={false}
      enableRotate={!pointerDown}
      enableZoom={pointerOver && !pointerDown}
      minDistance={7}
      maxDistance={16}
      minPolarAngle={Math.PI * 0.15}
      maxPolarAngle={Math.PI * 0.85}
      rotateSpeed={0.55}
      zoomSpeed={0.7}
    />
  );
}

// ---------- scene / interaction logic ----------

function CubeScene({
  setPointerDown,
  pointerDown,
  pointerOver,
  onControlsReady,
}: {
  setPointerDown: Dispatch<SetStateAction<boolean>>;
  pointerDown: boolean;
  pointerOver: boolean;
  onControlsReady: (controls: ControlsData) => void;
}) {
  const [cubies, setCubies] = useState<CubieData[]>(createCubies);
  const [rotating, setRotating] = useState(false);
  const [moves, setMoves] = useState(0);

  const rotationGroup = useRef<THREE.Group>(null);
  const controlsRef = useRef<any>(null);
  const moveHistory = useRef<Move[]>([]);
  const { camera, size } = useThree();

  const dragRef = useRef<{
    active: boolean;
    startX: number;
    startY: number;
    cubie: CubieData | null;
    faceNormal: THREE.Vector3 | null;
    axis: Axis | null;
    layer: number | null;
    tangentScreenDir: { x: number; y: number } | null;
  }>({
    active: false,
    startX: 0,
    startY: 0,
    cubie: null,
    faceNormal: null,
    axis: null,
    layer: null,
    tangentScreenDir: null,
  });

  const animationRef = useRef<{
    active: boolean;
    axis: Axis | null;
    layer: number | null;
    direction: 1 | -1;
    elapsed: number;
    duration: number;
    queue: Move[];
    isUndo: boolean;
  }>({
    active: false,
    axis: null,
    layer: null,
    direction: 1,
    elapsed: 0,
    duration: 260,
    queue: [],
    isUndo: false,
  });

  const currentRotation = useRef(0);

  const applyMoveToCube = useCallback((axis: Axis, layer: number, direction: 1 | -1) => {
    setCubies((prev) =>
      prev.map((cubie) => {
        const index = axis === "x" ? 0 : axis === "y" ? 1 : 2;
        if (cubie.position[index] !== layer) return cubie;
        return {
          ...cubie,
          position: rotatePosition(cubie.position, axis, direction),
          stickers: rotateStickers(cubie.stickers, axis, direction),
        };
      })
    );
  }, []);

  const finishRotation = useCallback(
    (axis: Axis, layer: number, direction: 1 | -1, countMove = true, isUndo = false) => {
      applyMoveToCube(axis, layer, direction);

      if (countMove) {
        if (isUndo) {
          moveHistory.current.pop();
          setMoves(Math.max(0, moveHistory.current.length));
        } else {
          moveHistory.current.push({ axis, layer, direction });
          setMoves(moveHistory.current.length);
        }
      }

      currentRotation.current = 0;
      resetGroupRotation(rotationGroup.current);
      animationRef.current.active = false;
      animationRef.current.axis = null;
      animationRef.current.layer = null;
      animationRef.current.isUndo = false;
      setRotating(false);
    },
    [applyMoveToCube]
  );

  const startAnimation = useCallback((move: Move, duration: number, isUndo = false) => {
    animationRef.current = {
      active: true,
      axis: move.axis,
      layer: move.layer,
      direction: move.direction,
      elapsed: 0,
      duration,
      queue: animationRef.current.queue,
      isUndo,
    };
    currentRotation.current = 0;
    setRotating(true);
  }, []);

  const performMove = useCallback(
    (axis: Axis, layer: number, direction: 1 | -1) => {
      if (rotating || animationRef.current.active) return;
      startAnimation({ axis, layer, direction }, 260, false);
    },
    [rotating, startAnimation]
  );

  const undoMove = useCallback(() => {
    if (rotating || animationRef.current.active) return;
    const lastMove = moveHistory.current[moveHistory.current.length - 1];
    if (!lastMove) return;
    startAnimation({ axis: lastMove.axis, layer: lastMove.layer, direction: (lastMove.direction * -1) as 1 | -1 }, 260, true);
  }, [rotating, startAnimation]);

  const shuffleCube = useCallback(() => {
    if (rotating || animationRef.current.active) return;

    const axes: Axis[] = ["x", "y", "z"];
    const queue: Move[] = [];
    let previousAxis: Axis | null = null;

    for (let i = 0; i < 20; i++) {
      let axis = axes[Math.floor(Math.random() * axes.length)];
      while (axis === previousAxis) axis = axes[Math.floor(Math.random() * axes.length)];
      previousAxis = axis;

      queue.push({
        axis,
        layer: Math.floor(Math.random() * 3) - 1,
        direction: Math.random() > 0.5 ? 1 : -1,
      });
    }

    moveHistory.current = [];
    setMoves(0);

    const firstMove = queue.shift();
    if (!firstMove) return;

    animationRef.current.queue = queue;
    startAnimation(firstMove, 170, false);
  }, [rotating, startAnimation]);

  useEffect(() => {
    onControlsReady({
      moves,
      canUndo: moveHistory.current.length > 0,
      onMove: performMove,
      onShuffle: shuffleCube,
      onUndo: undoMove,
    });
  }, [moves, performMove, shuffleCube, undoMove]);

  useFrame((_, delta) => {
    const animation = animationRef.current;

    if (animation.active && animation.axis && animation.layer !== null && rotationGroup.current) {
      animation.elapsed += delta;
      const progress = THREE.MathUtils.clamp(animation.elapsed / (animation.duration / 1000), 0, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const rotation = animation.direction * (Math.PI / 2) * eased;

      currentRotation.current = rotation;
      setGroupRotation(rotationGroup.current, animation.axis, rotation);

      if (progress >= 1) {
        const completedMove: Move = { axis: animation.axis, layer: animation.layer, direction: animation.direction };
        const nextMove = animation.queue.shift();
        const wasUndo = animation.isUndo;

        finishRotation(completedMove.axis, completedMove.layer, completedMove.direction, true, wasUndo);

        if (nextMove) {
          setTimeout(() => startAnimation(nextMove, 170, false), 25);
        }
      }
      return;
    }

    if (dragRef.current.active && dragRef.current.axis && dragRef.current.layer !== null && rotationGroup.current) {
      setGroupRotation(rotationGroup.current, dragRef.current.axis, currentRotation.current);
    }
  });

  const handlePointerDown = (event: any, cubie: CubieData) => {
    if (rotating || animationRef.current.active) return;

    setPointerDown(true);

    let faceNormal: THREE.Vector3 | null = null;
    try {
      const local = event.face?.normal?.clone?.();
      if (local && event.object) {
        faceNormal = local.transformDirection(event.object.matrixWorld).normalize();
      }
    } catch {
      faceNormal = null;
    }

    dragRef.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      cubie,
      faceNormal,
      axis: null,
      layer: null,
      tangentScreenDir: null,
    };

    const cubieOrigin = new THREE.Vector3(cubie.position[0] * STEP, cubie.position[1] * STEP, cubie.position[2] * STEP);

    const onMove = (e: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag.active || !drag.cubie || rotating || animationRef.current.active) return;

      const dx = e.clientX - drag.startX;
      const dy = e.clientY - drag.startY;

      if (!drag.axis && Math.hypot(dx, dy) > 6) {
        const normal = drag.faceNormal ?? new THREE.Vector3(0, 0, 1);
        const dominant: Axis = Math.abs(normal.x) > 0.5 ? "x" : Math.abs(normal.y) > 0.5 ? "y" : "z";
        const candidates: Axis[] = (["x", "y", "z"] as Axis[]).filter((a) => a !== dominant);

        let bestAxis: Axis = candidates[0];
        let bestDir: { x: number; y: number } = { x: 1, y: 0 };
        let bestScore = -Infinity;

        for (const axis of candidates) {
          const tangent = AXIS_VECTORS[axis].clone().cross(normal);
          if (tangent.lengthSq() < 1e-6) continue;
          const dir = screenDirection(cubieOrigin, tangent, camera, size);
          const score = Math.abs(dir.x * dx + dir.y * dy);
          if (score > bestScore) {
            bestScore = score;
            bestAxis = axis;
            bestDir = dir;
          }
        }

        const index = bestAxis === "x" ? 0 : bestAxis === "y" ? 1 : 2;
        drag.axis = bestAxis;
        drag.layer = drag.cubie.position[index];
        drag.tangentScreenDir = bestDir;
        setRotating(true);
      }

      if (!drag.axis || drag.layer === null || !drag.tangentScreenDir) return;

      const projection = drag.tangentScreenDir.x * dx + drag.tangentScreenDir.y * dy;
      const sensitivity = 0.012;
      currentRotation.current = THREE.MathUtils.clamp(projection * sensitivity, -Math.PI / 2, Math.PI / 2);
    };

    const onUp = () => {
      handlePointerUp();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const handlePointerUp = () => {
    const drag = dragRef.current;

    if (!drag.active || !drag.axis || drag.layer === null) {
      dragRef.current.active = false;
      setPointerDown(false);
      return;
    }

    const rotation = currentRotation.current;
    const shouldRotate = Math.abs(rotation) > Math.PI / 4;

    if (shouldRotate) {
      const direction: 1 | -1 = rotation > 0 ? 1 : -1;
      finishRotation(drag.axis, drag.layer, direction, true, false);
    } else {
      currentRotation.current = 0;
      resetGroupRotation(rotationGroup.current);
      setRotating(false);
    }

    dragRef.current.active = false;
    setPointerDown(false);
  };

  const activeAxis = animationRef.current.active ? animationRef.current.axis : dragRef.current.axis;
  const activeLayer = animationRef.current.active ? animationRef.current.layer : dragRef.current.layer;

  const selectedIds = new Set<number>();
  if (activeAxis && activeLayer !== null) {
    const index = activeAxis === "x" ? 0 : activeAxis === "y" ? 1 : 2;
    cubies.forEach((cubie) => {
      if (cubie.position[index] === activeLayer) selectedIds.add(cubie.id);
    });
  }

  const layerCubies =
    activeAxis && activeLayer !== null
      ? cubies.filter((cubie) => {
          const index = activeAxis === "x" ? 0 : activeAxis === "y" ? 1 : 2;
          return cubie.position[index] === activeLayer;
        })
      : [];

  const remainingCubies =
    activeAxis && activeLayer !== null ? cubies.filter((cubie) => !layerCubies.includes(cubie)) : cubies;

  return (
    <>
      <ambientLight intensity={1.1} />
      <directionalLight position={[5, 8, 6]} intensity={2.6} castShadow />
      <directionalLight position={[-6, 3, -5]} intensity={1} color="#a78bfa" />
      <Environment preset="city" environmentIntensity={0.35} />

      <group>
        {remainingCubies.map((cubie) => (
          <Cubie key={cubie.id} cubie={cubie} selected={selectedIds.has(cubie.id)} onPointerDown={handlePointerDown} />
        ))}

        <group ref={rotationGroup}>
          {layerCubies.map((cubie) => (
            <Cubie key={cubie.id} cubie={cubie} selected onPointerDown={handlePointerDown} />
          ))}
        </group>
      </group>

      <ContactShadows position={[0, -2, 0]} opacity={0.35} scale={10} blur={2.4} far={4} />

      <ResponsiveCamera pointerDown={pointerDown} pointerOver={pointerOver} controlsRef={controlsRef} />
    </>
  );
}

// ---------- controls UI ----------

function CubeControls({ moves, canUndo, onMove, onShuffle, onUndo }: ControlsData) {
  const buttonStyle: React.CSSProperties = {
    minWidth: "clamp(40px, 11vw, 48px)",
    height: "clamp(38px, 10vw, 42px)",
    padding: "0 clamp(8px, 2vw, 12px)",
    borderRadius: 10,
    border: "1px solid rgba(167, 139, 250, 0.25)",
    background: "rgba(167, 139, 250, 0.08)",
    color: "#f5f5f7",
    fontSize: "clamp(11px, 3vw, 13px)",
    fontFamily: "var(--font-geist-mono)",
    cursor: "pointer",
    transition: "background 0.2s ease, border-color 0.2s ease, transform 0.15s ease",
    touchAction: "manipulation",
    WebkitTapHighlightColor: "transparent",
  };

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        bottom: "clamp(12px, 3vw, 20px)",
        transform: "translateX(-50%)",
        width: "min(96%, 520px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "clamp(8px, 2vw, 12px)",
        pointerEvents: "none",
        zIndex: 50,
        padding: "10px 8px",
        boxSizing: "border-box",
        borderRadius: 16,
        background: "rgba(10, 10, 16, 0.35)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "clamp(5px, 1.5vw, 8px)",
          pointerEvents: "auto",
          width: "100%",
        }}
      >
        {[
          { label: "U", axis: "y" as Axis, layer: 1, direction: 1 as const },
          { label: "D", axis: "y" as Axis, layer: -1, direction: -1 as const },
          { label: "L", axis: "x" as Axis, layer: -1, direction: -1 as const },
          { label: "R", axis: "x" as Axis, layer: 1, direction: 1 as const },
          { label: "F", axis: "z" as Axis, layer: 1, direction: 1 as const },
          { label: "B", axis: "z" as Axis, layer: -1, direction: -1 as const },
        ].map((btn) => (
          <button
            key={btn.label}
            type="button"
            style={buttonStyle}
            onClick={() => onMove(btn.axis, btn.layer, btn.direction)}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "clamp(8px, 3vw, 16px)",
          pointerEvents: "auto",
          width: "100%",
        }}
      >
        <span
          style={{
            color: "rgba(245, 245, 247, 0.65)",
            fontSize: "clamp(10px, 2.8vw, 12px)",
            fontFamily: "var(--font-geist-mono)",
            letterSpacing: "0.04em",
            whiteSpace: "nowrap",
          }}
        >
          MOVIMENTOS <strong style={{ color: "#a78bfa", fontWeight: 500 }}>{moves}</strong>
        </span>

        <button
          type="button"
          disabled={!canUndo}
          style={{
            ...buttonStyle,
            minWidth: "clamp(60px, 18vw, 80px)",
            borderColor: canUndo ? "rgba(167, 139, 250, 0.4)" : "rgba(139, 92, 246, 0.12)",
            background: canUndo ? "rgba(167, 139, 250, 0.14)" : "rgba(139, 92, 246, 0.04)",
            opacity: canUndo ? 1 : 0.4,
            cursor: canUndo ? "pointer" : "default",
          }}
          onClick={onUndo}
        >
          Voltar
        </button>

        <button
          type="button"
          style={{
            ...buttonStyle,
            minWidth: "clamp(84px, 23vw, 112px)",
            borderColor: "rgba(167, 139, 250, 0.4)",
            background: "rgba(167, 139, 250, 0.14)",
          }}
          onClick={onShuffle}
        >
          Embaralhar
        </button>
      </div>
    </div>
  );
}

export default function MagicCube() {
  return <CanvasContainer />;
}

function CanvasContainer() {
  const [pointerOver, setPointerOver] = useState(false);
  const [pointerDown, setPointerDown] = useState(false);
  const [controls, setControls] = useState<ControlsData | null>(null);

  const handleControlsReady = useCallback((nextControls: ControlsData) => {
    setControls(nextControls);
  }, []);

  return (
    <div
      onPointerEnter={() => setPointerOver(true)}
      onPointerLeave={() => setPointerOver(false)}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        touchAction: "none",
        overflow: "hidden",
        overscrollBehavior: "contain",
        WebkitUserSelect: "none",
        userSelect: "none",
      }}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        onPointerMissed={() => {}}
      >
        <CubeScene
          setPointerDown={setPointerDown}
          pointerDown={pointerDown}
          pointerOver={pointerOver}
          onControlsReady={handleControlsReady}
        />
      </Canvas>

      {controls && (
        <CubeControls
          moves={controls.moves}
          canUndo={controls.canUndo}
          onMove={controls.onMove}
          onShuffle={controls.onShuffle}
          onUndo={controls.onUndo}
        />
      )}
    </div>
  );
}