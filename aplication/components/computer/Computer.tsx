"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useGLTF, Html, Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import * as THREE from "three";

const TARGET_HEIGHT = 2.2;

export function Computer({ debug = false }) {
  const cableAnchorRef = useRef(new THREE.Vector3(0.3, 0.05, -0.4));
  const [cablePoints, setCablePoints] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const router = useRouter();
  const { scene } = useGLTF("/models/desktop.glb");
  const model = useMemo(() => scene.clone(true), [scene]);

  const groupRef = useRef(null);
  const innerRef = useRef(null);
  const mouseNodeRef = useRef(null);
  const keyNodesRef = useRef([]);
  const activeKeys = useRef(new Map());
  const visibleRef = useRef(true);
  const modelScaleRef = useRef(1);

  const [screenAnchor, setScreenAnchor] = useState(null);
  const [screenState, setScreenState] = useState("boot");
  const [terminalHistory, setTerminalHistory] = useState([
    "Sistema Operacional v1.0.0 carregado.",
    "Digite 'help' para listar todos os comandos.",
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [bootText, setBootText] = useState("");
  const [anchorReady, setAnchorReady] = useState(false);

  const bootPhrases = [
    " INICIALIZANDO SISTEMA...",
    " CARREGANDO PERFIL DANIEL COLONHEZE...",
    " CARREGANDO MODULOS DE PROJETOS...",
    " CONECTANDO COMUNICACAO DE CONTATO...",
    " TUDO PRONTO!",
  ];

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
      const names = [];
      inner.traverse((c) => c.name && names.push(`${c.type}:${c.name}`));
      console.log("[Computer] nos do GLB:", names);
      console.log("[Computer] size:", size, "scale:", scale);
    }
  }, [model, debug]);

  useEffect(() => {
    const find = (pred) => {
      let found = null;
      model.traverse((o) => {
        if (!found && pred(o)) found = o;
      });
      return found;
    };

    mouseNodeRef.current = find((o) => /mouse/i.test(o.name));

    const monitor = find((o) => /(screen|tela|monitor|display)/i.test(o.name));

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

      const frontOffset = Math.min(size.x, size.y, size.z) / 2;
      anchor.position.y += frontOffset * 35;
      anchor.position.x -= frontOffset * 20;
      anchor.rotation.y = Math.PI / -2;

      const compensScale = 1 / modelScaleRef.current;
      anchor.scale.setScalar(compensScale);

      monitor.add(anchor);
      setScreenAnchor(anchor);
      setAnchorReady(true);

      if (debug) {
        console.log("[Computer] monitor encontrado:", monitor.name, "size:", size);
        console.log("[Computer] escala de compensação da âncora:", compensScale);
      }
    } else {
      if (debug) console.log("[Computer] NENHUM monitor encontrado com esse regex");
      const retry = setTimeout(() => {
        const monitorRetry = find((o) => /(screen|tela|monitor|display)/i.test(o.name));
        if (monitorRetry) {
          monitorRetry.updateWorldMatrix(true, false);
          const box = new THREE.Box3().setFromObject(monitorRetry);
          const size = new THREE.Vector3();
          const worldCenter = new THREE.Vector3();
          box.getSize(size);
          box.getCenter(worldCenter);
          const localCenter = monitorRetry.worldToLocal(worldCenter.clone());
          const anchor = new THREE.Object3D();
          anchor.position.copy(localCenter);
          const frontOffset = Math.min(size.x, size.y, size.z) / 2;
          anchor.position.y += frontOffset * 20;
          anchor.position.x -= frontOffset * 20;
          anchor.rotation.y = Math.PI / -2;
          const compensScale = 1 / modelScaleRef.current;
          anchor.scale.setScalar(compensScale);
          monitorRetry.add(anchor);
          setScreenAnchor(anchor);
          setAnchorReady(true);
          if (debug) console.log("[Computer] monitor encontrado na segunda tentativa");
        }
      }, 500);
      return () => clearTimeout(retry);
    }

    const keys = [];
    const teclado = find((o) => /teclado|keyboard/i.test(o.name) && o.type === "Group");
    teclado?.traverse((child) => {
      if (child.name.startsWith("pCube") && child.type === "Mesh") keys.push(child);
    });
    keyNodesRef.current = keys;

    if (debug) {
      console.log("[Computer] mouse encontrado:", !!mouseNodeRef.current);
      console.log("[Computer] teclas encontradas:", keys.length);
    }
  }, [model, debug]);

  useEffect(() => {
    const el = document.getElementById("computador");
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => (visibleRef.current = entry.isIntersecting),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const node = mouseNodeRef.current;
      if (!node) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 4;
      const z = (e.clientY / window.innerHeight - 0.5) * 4;
      node.position.x = THREE.MathUtils.lerp(node.position.x, -z, 0.1);
      node.position.z = THREE.MathUtils.lerp(node.position.z, x, 0.1);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!visibleRef.current) return;

      const keys = keyNodesRef.current;
      if (keys.length > 0) {
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        activeKeys.current.set(randomKey, performance.now());
      }

      if (screenState === "boot") {
        if (e.key === "Enter" || e.key === " ") {
          setScreenState("terminal");
          setBootText("");
        }
        return;
      }

      if (e.key === "Enter") {
        executeCommand(currentInput);
        setCurrentInput("");
        return;
      }
      if (e.key === "Backspace") {
        setCurrentInput((prev) => prev.slice(0, -1));
        return;
      }
      if (e.key.length === 1) setCurrentInput((prev) => prev + e.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [screenState, currentInput]);

  useEffect(() => {
    if (screenState !== "boot") return;
    let i = 0;
    let charIndex = 0;
    const interval = setInterval(() => {
      if (i >= bootPhrases.length) return;
      const phrase = bootPhrases[i];
      if (charIndex < phrase.length) {
        setBootText((prev) => prev + phrase[charIndex]);
        charIndex++;
      } else {
        setBootText((prev) => prev + "\n");
        i++;
        charIndex = 0;
        if (i === bootPhrases.length) {
          clearInterval(interval);
          setTimeout(() => {
            setScreenState("terminal");
            setBootText("");
          }, 800);
        }
      }
    }, 40);
    return () => clearInterval(interval);
  }, [screenState]);

  useFrame(() => {
    const now = performance.now();
    activeKeys.current.forEach((startTime, key) => {
      const elapsed = now - startTime;
      const duration = 150;
      if (elapsed < duration) {
        key.position.y = -Math.sin((elapsed / duration) * Math.PI) * 0.5;
      } else {
        key.position.y = 0;
        activeKeys.current.delete(key);
      }
    });

    if (mouseNodeRef.current) {
      const mousePos = mouseNodeRef.current.position;
      const anchor = cableAnchorRef.current;

      const midPoint = [
        (anchor.x + mousePos.x) / 2,
        Math.min(anchor.y, 0) - 0.15,
        (anchor.z + mousePos.z) / 2,
      ];

      setCablePoints([
        [anchor.x, anchor.y, anchor.z],
        midPoint,
        [mousePos.x, 0, mousePos.z],
      ]);
    }
  });

  const executeCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();

    if (trimmed === "projects" || trimmed === "projetos") return router.push("/projetos");
    if (trimmed === "contact" || trimmed === "contato") return router.push("/contato");

    if (trimmed === "github") {
      window.open("https://github.com/Daniel-Colonheze", "_blank");
      setTerminalHistory((p) => [...p, `$ ${cmd}`, "Redirecionando para o GitHub..."]);
      return;
    }
    if (trimmed === "linkedin") {
      window.open("https://www.linkedin.com/in/daniel-colonheze/", "_blank");
      setTerminalHistory((p) => [...p, `$ ${cmd}`, "Redirecionando para o LinkedIn..."]);
      return;
    }

    let output = "";
    switch (trimmed) {
      case "help":
        output =
          "COMANDOS DISPONIVEIS:\n  help      - exibe esta lista de comandos\n  about     - resumo sobre o desenvolvedor\n  projects  - navega para a pagina de Projetos\n  contact   - navega para a pagina de Contato\n  github    - abre o perfil no GitHub\n  linkedin  - abre o perfil no LinkedIn\n  clear     - limpa a tela do terminal";
        break;
      case "about":
        output =
          "Daniel Colonheze | Desenvolvedor Frontend\nEstudante de Engenharia de Software com foco em React, Next.js, Node.js e construcao de interfaces 3D interativas.";
        break;
      case "clear":
        setTerminalHistory([]);
        return;
      default:
        output = `Comando '${cmd}' nao encontrado. Digite 'help' para instrucoes.`;
    }
    setTerminalHistory((p) => [...p, `$ ${cmd}`, output]);
  };

  const screenContent =
    screenState === "boot" ? (
      <pre className="m-0 whitespace-pre-wrap font-mono text-[13px] leading-snug text-purple-300">
        {bootText}
        <span className="animate-pulse">▊</span>
      </pre>
    ) : (
      <div className="flex h-full flex-col justify-between">
        <div className="flex-1 overflow-y-auto font-mono text-[12px] leading-snug text-purple-200">
          <div className="mb-2 text-[10px] text-purple-400 border-b border-purple-800/40 pb-1">
            DANIEL OS v1.0 // SISTEMA INTERATIVO
          </div>
          {terminalHistory.map((line, i) => (
            <pre key={i} className="m-0 whitespace-pre-wrap">
              {line}
            </pre>
          ))}
          <div className="flex gap-1 text-purple-100 mt-1">
            <span className="text-purple-400">$</span>
            <span>{currentInput}</span>
            <span className="animate-pulse">▊</span>
          </div>
        </div>

        <div className="mt-2 flex gap-2 border-t border-purple-800/60 pt-2">
          <button
            onClick={() => router.push("/projetos")}
            className="flex-1 rounded border border-purple-600/70 bg-purple-900/40 px-2 py-1.5 font-mono text-[11px] text-purple-200 transition hover:bg-purple-700/60 hover:text-white"
          >
            [ Ir p/ Projetos ]
          </button>
          <button
            onClick={() => router.push("/contato")}
            className="flex-1 rounded border border-purple-600/70 bg-purple-900/40 px-2 py-1.5 font-mono text-[11px] text-purple-200 transition hover:bg-purple-700/60 hover:text-white"
          >
            [ Ir p/ Contato ]
          </button>
        </div>
      </div>
    );

  return (
    <group ref={groupRef} rotation={[0, 0, 0]}>
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

        <Line points={cablePoints} color="#1a1a1a" lineWidth={2} curveType="catmullrom" />
      </group>
    </group>
  );
}

useGLTF.preload("/models/desktop.glb");