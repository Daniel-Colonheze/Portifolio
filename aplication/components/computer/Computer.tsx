"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useGLTF, Html, Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import * as THREE from "three";

const TARGET_HEIGHT = 2.2;

export function Computer({ debug = false }) {
  const router = useRouter();

  const cableAnchorRef = useRef(new THREE.Vector3(0.3, 0.05, -0.4));
  const [cablePoints, setCablePoints] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const { scene } = useGLTF("/models/desktop.glb");
  const model = useMemo(() => scene.clone(true), [scene]);

  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const mouseNodeRef = useRef<THREE.Object3D | null>(null);
  const keyNodesRef = useRef<THREE.Object3D[]>([]);
  const activeKeys = useRef(new Map<THREE.Object3D, number>());
  const visibleRef = useRef(true);
  const modelScaleRef = useRef(1);

  const [screenAnchor, setScreenAnchor] =
    useState<THREE.Object3D | null>(null);

  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "Sistema Operacional v1.0.0 carregado.",
    "Digite 'help' para listar os comandos disponíveis.",
  ]);

  const [currentInput, setCurrentInput] = useState("");
  const [anchorReady, setAnchorReady] = useState(false);

  useLayoutEffect(() => {
    const inner = innerRef.current;

    if (!inner) return;

    inner.position.set(0, 0, 0);
    inner.scale.set(1, 1, 1);

    const box = new THREE.Box3().setFromObject(inner);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    box.getSize(size);
    box.getCenter(center);

    const scale = TARGET_HEIGHT / Math.max(size.y, 0.001);

    inner.scale.setScalar(scale);
    modelScaleRef.current = scale;

    inner.position.set(
      -center.x * scale,
      -box.min.y * scale - 1,
      -center.z * scale
    );

    if (debug) {
      const names: string[] = [];

      inner.traverse((object) => {
        if (object.name) {
          names.push(`${object.type}:${object.name}`);
        }
      });

      console.log("[Computer] nós do GLB:", names);
      console.log("[Computer] tamanho:", size);
      console.log("[Computer] escala:", scale);
    }
  }, [model, debug]);

  useEffect(() => {
    const find = (
      predicate: (object: THREE.Object3D) => boolean
    ): THREE.Object3D | null => {
      let found: THREE.Object3D | null = null;

      model.traverse((object) => {
        if (!found && predicate(object)) {
          found = object;
        }
      });

      return found;
    };

    mouseNodeRef.current = find((object) =>
      /mouse/i.test(object.name)
    );

    const monitor = find((object) =>
      /(screen|tela|monitor|display)/i.test(object.name)
    );

    if (monitor) {
      monitor.updateWorldMatrix(true, false);

      const box = new THREE.Box3().setFromObject(monitor);
      const size = new THREE.Vector3();
      const worldCenter = new THREE.Vector3();

      box.getSize(size);
      box.getCenter(worldCenter);

      const localCenter = monitor.worldToLocal(worldCenter.clone());

      const anchor = new THREE.Object3D();
      anchor.position.copy(localCenter);

      const frontOffset =
        Math.min(size.x, size.y, size.z) / 2;

      anchor.position.y += frontOffset * -50;
      anchor.position.x -= frontOffset * 20;
      anchor.rotation.y = Math.PI / -2;

      const compensScale = 1 / modelScaleRef.current;

      anchor.scale.setScalar(compensScale);

      monitor.add(anchor);

      setScreenAnchor(anchor);
      setAnchorReady(true);

      if (debug) {
        console.log(
          "[Computer] monitor encontrado:",
          monitor.name
        );

        console.log(
          "[Computer] tamanho do monitor:",
          size
        );

        console.log(
          "[Computer] escala da âncora:",
          compensScale
        );
      }
    } else if (debug) {
      console.log(
        "[Computer] nenhum monitor encontrado"
      );
    }

    const keys: THREE.Object3D[] = [];

    const teclado = find(
      (object) =>
        /teclado|keyboard/i.test(object.name) &&
        object.type === "Group"
    );

    teclado?.traverse((child) => {
      if (
        child.name.startsWith("pCube") &&
        child.type === "Mesh"
      ) {
        keys.push(child);
      }
    });

    keyNodesRef.current = keys;

    if (debug) {
      console.log(
        "[Computer] mouse encontrado:",
        !!mouseNodeRef.current
      );

      console.log(
        "[Computer] teclas encontradas:",
        keys.length
      );
    }
  }, [model, debug]);

  useEffect(() => {
    const element = document.getElementById("computador");

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      {
        threshold: 0.4,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const node = mouseNodeRef.current;

      if (!node) return;

      const x =
        (event.clientX / window.innerWidth - 0.5) * 4;

      const z =
        (event.clientY / window.innerHeight - 0.5) * 4;

      node.position.x = THREE.MathUtils.lerp(
        node.position.x,
        -z,
        0.1
      );

      node.position.z = THREE.MathUtils.lerp(
        node.position.z,
        x,
        0.1
      );
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    return () =>
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!visibleRef.current) return;

      const keys = keyNodesRef.current;

      if (keys.length > 0) {
        const randomKey =
          keys[Math.floor(Math.random() * keys.length)];

        activeKeys.current.set(
          randomKey,
          performance.now()
        );
      }

      if (event.key === "Enter") {
        executeCommand(currentInput);
        setCurrentInput("");
        return;
      }

      if (event.key === "Backspace") {
        setCurrentInput((previous) =>
          previous.slice(0, -1)
        );
        return;
      }

      if (event.key.length === 1) {
        setCurrentInput((previous) =>
          previous + event.key
        );
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [currentInput]);

  useFrame(() => {
    const now = performance.now();

    activeKeys.current.forEach(
      (startTime, key) => {
        const elapsed = now - startTime;
        const duration = 150;

        if (elapsed < duration) {
          key.position.y =
            -Math.sin(
              (elapsed / duration) * Math.PI
            ) * 0.5;
        } else {
          key.position.y = 0;
          activeKeys.current.delete(key);
        }
      }
    );

    if (mouseNodeRef.current) {
      const mousePosition =
        mouseNodeRef.current.position;

      const anchor = cableAnchorRef.current;

      const midPoint = [
        (anchor.x + mousePosition.x) / 2,
        Math.min(anchor.y, 0) - 0.15,
        (anchor.z + mousePosition.z) / 2,
      ] as [number, number, number];

      setCablePoints([
        [anchor.x, anchor.y, anchor.z],
        midPoint,
        [mousePosition.x, 0, mousePosition.z],
      ]);
    }
  });

  const executeCommand = (command: string) => {
    const trimmed = command.trim().toLowerCase();

    if (!trimmed) return;

    if (
      trimmed === "projects" ||
      trimmed === "projetos"
    ) {
      setTerminalHistory((previous) => [
        ...previous,
        `$ ${command}`,
        "Abrindo projetos...",
      ]);

      router.push("/projetos");
      return;
    }

    if (
      trimmed === "contact" ||
      trimmed === "contato"
    ) {
      setTerminalHistory((previous) => [
        ...previous,
        `$ ${command}`,
        "Abrindo contato...",
      ]);

      router.push("/contato");
      return;
    }

    if (trimmed === "github") {
      window.open(
        "https://github.com/Daniel-Colonheze",
        "_blank"
      );

      setTerminalHistory((previous) => [
        ...previous,
        `$ ${command}`,
        "Redirecionando para o GitHub...",
      ]);

      return;
    }

    if (trimmed === "linkedin") {
      window.open(
        "https://www.linkedin.com/in/daniel-colonheze/",
        "_blank"
      );

      setTerminalHistory((previous) => [
        ...previous,
        `$ ${command}`,
        "Redirecionando para o LinkedIn...",
      ]);

      return;
    }

    let output = "";

    switch (trimmed) {
      case "help":
        output =
          "COMANDOS DISPONIVEIS:\n" +
          "  help      - exibe esta lista de comandos\n" +
          "  about     - resumo sobre o desenvolvedor\n" +
          "  projects  - navega para a pagina de Projetos\n" +
          "  contact   - navega para a pagina de Contato\n" +
          "  github    - abre o perfil no GitHub\n" +
          "  linkedin  - abre o perfil no LinkedIn\n" +
          "  clear     - limpa a tela do terminal";
        break;

      case "about":
        output =
          "Daniel Colonheze | Desenvolvedor Frontend\n" +
          "Estudante de Engenharia de Software com foco em React, Next.js, Node.js e construção de interfaces 3D interativas.";
        break;

      case "clear":
        setTerminalHistory([]);
        return;

      default:
        output =
          `Comando '${command}' nao encontrado. Digite 'help' para instrucoes.`;
    }

    setTerminalHistory((previous) => [
      ...previous,
      `$ ${command}`,
      output,
    ]);
  };

  const screenContent = (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto font-mono text-[12px] leading-snug text-purple-200">
        <div className="mb-2 border-b border-purple-800/40 pb-1 text-[10px] text-purple-400">
          DANIEL OS v1.0 // SISTEMA INTERATIVO
        </div>

        {terminalHistory.map((line, index) => (
          <pre
            key={index}
            className="m-0 whitespace-pre-wrap"
          >
            {line}
          </pre>
        ))}

        <div className="mt-1 flex gap-1 text-purple-100">
          <span className="text-purple-400">
            $
          </span>

          <span>{currentInput}</span>

          <span className="animate-pulse">
            ▊
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <group
      ref={groupRef}
      rotation={[0, 0, 0]}
    >
      <group ref={innerRef}>
        <primitive object={model} />

        {anchorReady && screenAnchor && (
          <primitive object={screenAnchor}>
            <Html
              transform
              occlude={false}
              distanceFactor={0.65}
              zIndexRange={[1, 0]}
              className="pointer-events-auto"
            >
              <div className="h-[320px] w-[550px] overflow-hidden rounded-sm border border-purple-900/70 bg-black/95 p-3 shadow-[0_0_40px_rgba(168,85,247,0.35)]">
                {screenContent}
              </div>
            </Html>
          </primitive>
        )}

        <Line
          points={cablePoints}
          color="#1a1a1a"
          lineWidth={2}
          curveType="catmullrom"
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/desktop.glb");