"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useGLTF, Html, Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/i18n/LanguageContext";
import { useLenisControls } from "@/hooks/useLenis";
import * as THREE from "three";

type CablePoint = [number, number, number];

const TARGET_HEIGHT = 2.2;

export function Computer({ debug = false }) {
  const router = useRouter();
  const { t } = useLanguage();
  const { scrollTo } = useLenisControls();

  const cableAnchorRef = useRef(new THREE.Vector3(0.3, 0.05, -0.4));

  const [cablePoints, setCablePoints] = useState<CablePoint[]>([
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

  const screenAnchorRef = useRef<THREE.Object3D | null>(null);
  const [screenAnchor, setScreenAnchor] = useState<THREE.Object3D | null>(null);
  const frontOffsetRef = useRef(0);
  const anchorBaseCenterRef = useRef(new THREE.Vector3());

  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    t.terminal.systemLoaded,
    t.terminal.help,
  ]);

  const [currentInput, setCurrentInput] = useState("");
  const [anchorReady, setAnchorReady] = useState(false);

  const [pixelRatio, setPixelRatio] = useState(
    typeof window !== "undefined" ? window.devicePixelRatio : 1
  );
  const [windowHeight, setWindowHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 735
  );

  useEffect(() => {
    const updatePixelRatio = () => {
      setPixelRatio(window.devicePixelRatio);
      setWindowHeight(window.innerHeight);
    };
    updatePixelRatio();

    // devicePixelRatio não dispara evento próprio; resize cobre a maioria
    // dos casos (mover janela entre monitores costuma disparar resize).
    window.addEventListener("resize", updatePixelRatio);

    // Cobre o caso de zoom do navegador ou troca de monitor sem resize,
    // reagindo a mudanças de matchMedia baseadas no dpr atual.
    const mediaQuery = window.matchMedia(
      `(resolution: ${window.devicePixelRatio}dppx)`
    );
    mediaQuery.addEventListener?.("change", updatePixelRatio);

    return () => {
      window.removeEventListener("resize", updatePixelRatio);
      mediaQuery.removeEventListener?.("change", updatePixelRatio);
    };
  }, []);

  // Pontos de calibração fornecidos por teste manual (janela maximizada
  // nos dois monitores). Trocamos devicePixelRatio por innerHeight como
  // variável de referência — o dpr se mostrou instável/inconsistente
  // entre testes, enquanto a altura real da janela reflete diretamente
  // a projeção da câmera.
  // innerHeight 735 -> offset -150 (correto no monitor principal)
  // innerHeight 524 -> offset  X   (ainda precisa ser calibrado — ver nota)
  const anchorYOffsetMultiplier = useMemo(() => {
    const CALIBRATION_HEIGHT_LOW = 524;
    const CALIBRATION_HEIGHT_HIGH = 735;
    const CALIBRATION_VALUE_LOW = 100;
    const CALIBRATION_VALUE_HIGH = -150;

    const slope =
      (CALIBRATION_VALUE_HIGH - CALIBRATION_VALUE_LOW) /
      (CALIBRATION_HEIGHT_HIGH - CALIBRATION_HEIGHT_LOW);

    return (
      CALIBRATION_VALUE_LOW +
      slope * (windowHeight - CALIBRATION_HEIGHT_LOW)
    );
  }, [windowHeight]);

  // ==========================================
  // RESPONSIVIDADE (NOVO)
  // ==========================================
  // Guarda a largura da viewport para recalcular escala/tamanho do Html
  // sempre que a tela mudar (resize, troca de monitor, orientação etc).
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1920
  );

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fator de escala do "monitor virtual" (Html) com base na largura da tela.
  // Interpola suavemente entre um mínimo e o tamanho original (1),
  // em vez de aplicar valores fixos em px que quebram em telas pequenas.
  const htmlScale = useMemo(() => {
    const MIN_WIDTH = 360; // menor viewport considerada
    const MAX_WIDTH = 1440; // viewport "de referência" (tamanho original)
    const MIN_SCALE = 0.55;

    const clampedWidth = Math.min(Math.max(viewportWidth, MIN_WIDTH), MAX_WIDTH);
    const progress = (clampedWidth - MIN_WIDTH) / (MAX_WIDTH - MIN_WIDTH);

    return MIN_SCALE + progress * (1 - MIN_SCALE);
  }, [viewportWidth]);

  // distanceFactor do <Html> também precisa acompanhar a escala,
  // senão o texto/tela fica desproporcional em telas pequenas.
  const distanceFactor = useMemo(() => {
    const BASE_DISTANCE_FACTOR = 0.65;
    return BASE_DISTANCE_FACTOR / htmlScale;
  }, [htmlScale]);

  // ==========================================
  // CONFIGURAÇÃO DO MODELO
  // ==========================================

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
        if (object.name) names.push(`${object.type}:${object.name}`);
      });
      console.log("[Computer] nós do GLB:", names);
      console.log("[Computer] tamanho:", size);
      console.log("[Computer] escala:", scale);
    }
  }, [model, debug]);

  // ==========================================
  // ENCONTRA MONITOR, MOUSE E TECLAS
  // ==========================================

  useEffect(() => {
    if (screenAnchorRef.current) return;

    const find = (predicate: (object: THREE.Object3D) => boolean): THREE.Object3D | null => {
      let found: THREE.Object3D | null = null;
      model.traverse((object) => {
        if (!found && predicate(object)) found = object;
      });
      return found;
    };

    mouseNodeRef.current = find((object) => /mouse/i.test(object.name));

    const monitor = find((object) => /(screen|tela|monitor|display)/i.test(object.name));

    if (monitor) {
      monitor.updateWorldMatrix(true, false);

      const box = new THREE.Box3().setFromObject(monitor);
      const size = new THREE.Vector3();
      const worldCenter = new THREE.Vector3();

      box.getSize(size);
      box.getCenter(worldCenter);

      const localCenter = monitor.worldToLocal(worldCenter.clone());

      anchorBaseCenterRef.current.copy(localCenter);

      const anchor = new THREE.Object3D();
      anchor.position.copy(localCenter);

      const frontOffset = Math.min(size.x, size.y, size.z) / 2;
      frontOffsetRef.current = frontOffset;

      // Offset Y agora vem do multiplicador calibrado por devicePixelRatio
      // (ver bloco "CALIBRAÇÃO POR DEVICE PIXEL RATIO" acima) em vez de um
      // valor fixo — era isso que fazia o monitor principal e o secundário
      // exigirem números opostos (-150 vs 20). anchorBaseCenterRef guarda
      // a posição pura (sem offset) para permitir recalcular sem acumular.
      anchor.position.y += frontOffset * anchorYOffsetMultiplier;
      anchor.position.x -= frontOffset * 20;
      anchor.rotation.y = Math.PI / -2;

      const compensScale = 1 / modelScaleRef.current;
      anchor.scale.setScalar(compensScale);

      monitor.add(anchor);

      screenAnchorRef.current = anchor;
      setScreenAnchor(anchor);
      setAnchorReady(true);

      if (debug) {
        console.log("[Computer] monitor encontrado:", monitor.name);
        console.log("[Computer] tamanho do monitor:", size);
        console.log("[Computer] posição fixa da tela:", anchor.position);
        console.log("[Computer] escala da âncora:", compensScale);
      }
    } else if (debug) {
      console.log("[Computer] nenhum monitor encontrado");
    }

    const keys: THREE.Object3D[] = [];

    const teclado = find(
      (object) => /teclado|keyboard/i.test(object.name) && object.type === "Group"
    );

    teclado?.traverse((child) => {
      if (child.name.startsWith("pCube") && child.type === "Mesh") {
        keys.push(child);
      }
    });

    keyNodesRef.current = keys;

    if (debug) {
      console.log("[Computer] mouse encontrado:", !!mouseNodeRef.current);
      console.log("[Computer] teclas encontradas:", keys.length);
    }

    return () => {
      if (screenAnchorRef.current && screenAnchorRef.current.parent) {
        screenAnchorRef.current.parent.remove(screenAnchorRef.current);
      }
      screenAnchorRef.current = null;
    };
  }, [model, debug]);

  // ==========================================
  // RECALIBRA A ÂNCORA QUANDO O MONITOR MUDA (NOVO)
  // ==========================================
  // A âncora só é criada uma vez (efeito acima tem early-return). Se o
  // usuário mover a janela do navegador para um monitor com escala de
  // DPI diferente sem recarregar a página, o pixelRatio muda mas a
  // âncora já existe — então recalculamos só a posição Y aqui, sem
  // recriar a âncora inteira.
  useEffect(() => {
    const anchor = screenAnchorRef.current;
    if (!anchor) return;

    const frontOffset = frontOffsetRef.current;
    const base = anchorBaseCenterRef.current;

    // Recalcula a partir da posição base pura (sem offset acumulado),
    // igual ao cálculo feito na criação da âncora.
    anchor.position.y = base.y + frontOffset * anchorYOffsetMultiplier;
    anchor.position.x = base.x - frontOffset * 20;

    if (debug) {
      console.log(
        "[Computer] âncora recalibrada — devicePixelRatio:",
        pixelRatio,
        "novo offset Y:",
        anchorYOffsetMultiplier
      );
    }
  }, [pixelRatio, windowHeight, anchorYOffsetMultiplier, debug]);

  // ==========================================
  // DETECTA SE O COMPUTADOR ESTÁ VISÍVEL
  // ==========================================

  useEffect(() => {
    const element = document.getElementById("computador");
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.4 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // ==========================================
  // MOVIMENTO DO MOUSE 3D
  // ==========================================

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const node = mouseNodeRef.current;
      if (!node) return;

      const x = (event.clientX / window.innerWidth - 0.5) * 4;
      const z = (event.clientY / window.innerHeight - 0.5) * 4;

      node.position.x = THREE.MathUtils.lerp(node.position.x, -z, 0.1);
      node.position.z = THREE.MathUtils.lerp(node.position.z, x, 0.1);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ==========================================
  // TECLADO FÍSICO
  // ==========================================

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!visibleRef.current) return;

      const keys = keyNodesRef.current;

      if (keys.length > 0) {
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        activeKeys.current.set(randomKey, performance.now());
      }

      if (event.key === "Enter") {
        executeCommand(currentInput);
        setCurrentInput("");
        return;
      }

      if (event.key === "Backspace") {
        setCurrentInput((previous) => previous.slice(0, -1));
        return;
      }

      if (event.key.length === 1) {
        setCurrentInput((previous) => previous + event.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentInput]);

  // ==========================================
  // ANIMAÇÃO DO TECLADO + CABO
  // ==========================================

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
      const mousePosition = mouseNodeRef.current.position;
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

  // ==========================================
  // TERMINAL / COMANDOS
  // ==========================================

  const executeCommand = (command: string) => {
    const trimmed = command.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === "about" || trimmed === "sobre") {
      setTerminalHistory((previous) => [...previous, `$ ${command}`, t.terminal.messages.openingAbout]);
      scrollTo("#sobre", { duration: 1.5 });
      return;
    }

    if (trimmed === "stack" || trimmed === "tecnologias") {
      setTerminalHistory((previous) => [...previous, `$ ${command}`, t.terminal.messages.openingStack]);
      scrollTo("#stack", { duration: 1.5 });
      return;
    }

    if (trimmed === "projects" || trimmed === "projetos") {
      setTerminalHistory((previous) => [...previous, `$ ${command}`, t.terminal.messages.openingProjects]);
      router.push("/projetos");
      return;
    }

    if (trimmed === "contact" || trimmed === "contato") {
      setTerminalHistory((previous) => [...previous, `$ ${command}`, t.terminal.messages.openingContact]);
      router.push("/contato");
      return;
    }

    if (trimmed === "github") {
      window.open("https://github.com/Daniel-Colonheze", "_blank");
      setTerminalHistory((previous) => [...previous, `$ ${command}`, t.terminal.messages.openingGithub]);
      return;
    }

    if (trimmed === "linkedin") {
      window.open("https://www.linkedin.com/in/daniel-colonheze/", "_blank");
      setTerminalHistory((previous) => [...previous, `$ ${command}`, t.terminal.messages.openingLinkedin]);
      return;
    }

    if (trimmed === "cv" || trimmed === "curriculo" || trimmed === "resume") {
      const link = document.createElement("a");
      link.href = "/resume/Daniel-colonheze-curriculo.pdf";
      link.download = "Daniel-Colonheze-Curriculo.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTerminalHistory((previous) => [...previous, `$ ${command}`, t.terminal.messages.downloadingCV]);
      return;
    }

    let output = "";

    switch (trimmed) {
      case "help":
        output =
          `${t.terminal.commands.title}\n` +
          `  help          - ${t.terminal.commands.help}\n` +
          `  about         - ${t.terminal.commands.about}\n` +
          `  stack         - ${t.terminal.commands.stack}\n` +
          `  projects      - ${t.terminal.commands.projects}\n` +
          `  contact       - ${t.terminal.commands.contact}\n` +
          `  cv            - ${t.terminal.commands.cv}\n` +
          `  github        - ${t.terminal.commands.github}\n` +
          `  linkedin      - ${t.terminal.commands.linkedin}\n` +
          `  curiosidades  - ${t.terminal.commands.curiosidades}\n` +
          `  clear         - ${t.terminal.commands.clear}`;
        break;

      case "curiosidades":
      case "curiosities":
        output = t.terminal.curiosidadesText;
        break;

      case "clear":
        setTerminalHistory([]);
        return;

      default:
        output = t.terminal.messages.commandNotFound.replace("{command}", command);
    }

    setTerminalHistory((previous) => [...previous, `$ ${command}`, output]);
  };

  // ==========================================
  // CONTEÚDO DA TELA
  // ==========================================

  const screenContent = (
    <div className="flex h-full flex-col">
      <div
        data-lenis-prevent
        onWheel={(e) => e.stopPropagation()}
        className="flex-1 overflow-y-auto font-mono text-[12px] leading-snug text-purple-200"
      >
        <div className="mb-2 border-b border-purple-800/40 pb-1 text-[10px] text-purple-400">
          {t.terminal.system}
        </div>

        {terminalHistory.map((line, index) => (
          <pre key={index} className="m-0 whitespace-pre-wrap">
            {line}
          </pre>
        ))}

        <div className="mt-1 flex gap-1 text-purple-100">
          <span className="text-purple-400">$</span>
          <span>{currentInput}</span>
          <span className="animate-pulse">▊</span>
        </div>
      </div>
    </div>
  );

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <group ref={groupRef} rotation={[0, 0, 0]}>
      <group ref={innerRef}>
        <primitive object={model} />

        {anchorReady && screenAnchor && (
          <primitive object={screenAnchor}>
            {/*
              distanceFactor agora é dinâmico (ver useMemo acima):
              em telas menores ele aumenta, compensando a redução do
              container em px/vw e evitando que o "monitor virtual"
              pareça descer/desalinhar do monitor 3D.
            */}
            <Html
              transform
              occlude={false}
              distanceFactor={distanceFactor}
              zIndexRange={[1, 0]}
              className="pointer-events-auto"
            >
              <div
                onPointerDown={(e) => e.stopPropagation()}
                onPointerMove={(e) => e.stopPropagation()}
                onPointerUp={(e) => e.stopPropagation()}
                style={{
                  // Antes: w-[550px] h-[320px] fixos, que "sobravam"
                  // em telas pequenas e empurravam o conteúdo pra baixo.
                  // Agora: tamanho base em px, escalado via transform
                  // com o mesmo fator usado no distanceFactor, mantendo
                  // a proporção e a posição relativa ao monitor 3D.
                  width: "550px",
                  height: "320px",
                  transform: `scale(${htmlScale})`,
                  transformOrigin: "center center",
                }}
                className="overflow-hidden rounded-sm border border-purple-900/70 bg-black/95 p-3 shadow-[0_0_40px_rgba(168,85,247,0.35)]"
              >
                {screenContent}
              </div>
            </Html>
          </primitive>
        )}

        <Line points={cablePoints} color="#1a1a1a" lineWidth={2} />
      </group>
    </group>
  );
}

useGLTF.preload("/models/desktop.glb");