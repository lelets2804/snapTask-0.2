import { useEffect, useState } from "react";

import cameraIcon from "../assets/camera.png";
import brilhoIcon from "../assets/brilho.png";
import editorDocIcon from "../assets/editor-doc.png";
import scanerIcon from "../assets/scaner.png";
import qrCodeIcon from "../assets/qr-code.png";
import galeriaIcon from "../assets/galeria.png";
import brainIcon from "../assets/brain.png";
import maoIcon from "../assets/mao.png";

import viewIcon from "../assets/view.png";
import olhoFechadoIcon from "../assets/olho-fechado.png";
import raioIcon from "../assets/raio.png";
import settingIcon from "../assets/setting.png";
import syncIcon from "../assets/sync.png";

import altaResolucaoIcon from "../assets/alta-resolucao.png";
import panoramicaIcon from "../assets/panoramica.png";
import docUltraHdIcon from "../assets/doc-ultra-hd.png";
import cameraLentaIcon from "../assets/camera-lenta.png";
import intervaloIcon from "../assets/intervalo.png";
import superluaIcon from "../assets/superlua.png";
import astroIcon from "../assets/astro.png";
import profissionalIcon from "../assets/profissional.png";
import instantaneoIcon from "../assets/instantaneo.png";
import focoMovimentoIcon from "../assets/foco-em-movimento.png";
import comidaIcon from "../assets/comida.png";

const menuItems = [
  {label: "Câmera", icon: cameraIcon, path: "/",},
  {label: "SnapTask", icon: brilhoIcon, path: "/snaptask",},
  {label: "Editor Doc", icon: editorDocIcon, path: "/editor-doc",},
  {label: "Leitor Códigos",icon: scanerIcon, path: "/leitor-codigos",},
  {label: "QR Share", icon: qrCodeIcon, path: "/qr", },
  {label: "Galeria", icon: galeriaIcon, path: "/galeria",},
  {label: "Flashcards", icon: brainIcon, path: "/flashcards",},
  {label: "Libras", icon: maoIcon, path: "/libras",},
];

const zoomOptions = [
  {label: "0.6x", value: 0.6,},
  {label: "1x", value: 1, },
  {label: "2x", value: 2,},
  {label: "5x", value: 5,},
  {label: "10x", value: 10,},
];

const cameraModes = [
  {label: "Noite", value: 0,},
  {label: "Retrato", value: 1,},
  {label: "Foto", value: 2,},
  {label: "Vídeo", value: 3,},
  {label: "Microfilme", value: 4,},
];

const moreModes = [
  {label: "Alta Resolução", icon: altaResolucaoIcon,},
  {label: "Panorâmica", icon: panoramicaIcon,},
  {label: "Doc Ultra HD", icon: docUltraHdIcon,},
  {label: "Câmera Lenta", icon: cameraLentaIcon,},
  {label: "Intervalo", icon: intervaloIcon,},
  {label: "Superlua", icon: superluaIcon,},
  {label: "Astro", icon: astroIcon,},
  {label: "Profissional", icon: profissionalIcon,},
  {label: "Instantâneo", icon: instantaneoIcon,},
  {label: "Foto em Mov.", icon: focoMovimentoIcon,},
  {label: "Comida", icon: comidaIcon,},
  {label: "Vis. Dupla", icon: viewIcon,},
];

export default function Camera() {

  const [zoom, setZoom] = useState(1);
  const [mode, setMode] = useState(2);

  const [flashActive, setFlashActive] = useState(false);
  const [flashOn, setFlashOn] = useState(false);

  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const handleZoom = (value) => {
    setZoom(value);

    window.alert(`Zoom alterado para ${value}x`);
  };

  const handleMode = (value, label) => {
    setMode(value);

    window.alert(`Modo alterado para ${label}`);
  };

  const handleCapture = () => {
    setFlashActive(true);

    if ("vibrate" in navigator) {
      navigator.vibrate(50);
    }

    window.setTimeout(() => {
      setFlashActive(false);
    }, 200);

    window.alert("Foto capturada com sucesso!");
  };

  const handleFlash = () => {
    const newValue = !flashOn;

    setFlashOn(newValue);

    if (newValue) {
      window.alert("Flash ativado");
    } else {
      window.alert("Flash desativado");
    }
  };

  const handleSettings = () => {
    window.alert("Configurações abertas.");
  };

  const handleRotate = () => {
    const angle = window.prompt("Digite o ângulo de rotação:");

    if (angle) {
      window.alert(`Imagem rotacionada em ${angle}°`);
    }
  };

  const handleMoreMode = (label) => {
    window.alert(`Abrindo modo: ${label}`);
    setMoreMenuOpen(false);
  };

  const navigateTo = (path) => {
    window.location.href = path;
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMoreMenuOpen(false);
        setSideMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const viewfinderScale = 1 + (zoom - 0.6) * 0.15;

  return (
    <main className="min-h-screen w-full bg-[#0a0a0f] font-sans text-white">

      <button
        type="button" onClick={() => setSideMenuOpen((previous) => !previous)} aria-label={sideMenuOpen ? "Fechar menu" : "Abrir menu"} className={["fixed right-5 top-1/2 z-50 flex size-14 -translate-y-1/2", "items-center justify-center", "border-0 border-l-4 border-black", "rounded-l-xl rounded-r-none", "bg-[#FFD700]", "shadow-lg shadow-black/30", "transition-all duration-200", "hover:scale-105 hover:bg-[#FFA500]", "active:scale-95", "max-md:right-4 max-md:size-12", ].join(" ")} >
        <span className="text-[32px] font-bold leading-none text-black max-md:text-[28px]">{sideMenuOpen ? ">" : "<"} </span>
      </button>

      {sideMenuOpen && (
        <button type="button" aria-label="Fechar menu" onClick={() => setSideMenuOpen(false)} className="fixed inset-0 z-40 cursor-default bg-black/30"/>
      )}

      <aside
        className={["fixed right-0 top-1/2 z-50 w-55 -translate-y-1/2", "rounded-l-xl border-l-2 border-[#FFD700]", "bg-[rgba(30,30,40,0.95)]", "py-2 shadow-2xl backdrop-blur-xl", "transition-[right] duration-300 ease-in-out", sideMenuOpen ? "right-15" : "-right-55", "max-md:w-50", sideMenuOpen ? "max-md:right-12" : "max-md:-right-50", ].join(" ")}>
        <div className="flex flex-col gap-1">

          <div className={[ "mb-2 border-b border-[#FFD700]/30", "px-4 pb-2 pt-3","text-sm font-bold tracking-widest", "text-[#FFD700]",].join(" ")}> DEV NAV </div>

          {menuItems.map((item) => (
            <button key={item.label} type="button" onClick={() => navigateTo(item.path)} className={[ "group flex w-full items-center gap-3", "px-4 py-2.5", "text-left text-sm font-medium", "text-[#f0f0f0]", "transition-all duration-200", "hover:bg-[#FFD700]/20 hover:text-[#FFD700]", ].join(" ")}>
              <img src={item.icon} alt={item.label} className={[ "size-5","opacity-80", "brightness-0 invert","transition-all duration-200", "group-hover:opacity-100", ].join(" ")} />

              <span>{item.label}</span>
            </button>
          ))}

        </div>
      </aside>

      <div className="flex min-h-screen flex-col items-center justify-center px-5 py-5">

        <header className="mb-5 text-center">

          <h1 className={[ "bg-linear-to-br from-[#FFD700] to-[#FFA500]","bg-clip-text", "text-[32px] font-bold", "leading-tight text-transparent", ].join(" ")}> JOVI Camera </h1>

          <p className="mt-1 text-sm text-[#7e7e8a]"> Experiência de câmera intuitiva + SnapTask para processamento inteligente</p>

        </header>

        <section
          className={["relative flex h-211 w-97.5","flex-col overflow-hidden", "rounded-[40px]", "border-2 border-[#2a2a35]", "bg-black","max-sm:h-175 max-sm:w-87.5",].join(" ")}>

          <div className={[ "relative flex-1 overflow-hidden", "bg-linear-to-br from-[#1a1a2a] to-[#0a0a0f]", ].join(" ")}>

            <div className="h-full w-full transition-transform duration-200" style={{ transform: `scale(${viewfinderScale})`,}}>

              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-10">

                {Array.from({ length: 9 }).map((_, index) => (<div key={index} className="border border-[#FFD700]/30"/>))}

              </div>

            </div>

            <div
              className={["pointer-events-none absolute inset-0 z-30", "bg-white", "transition-opacity duration-100", flashActive ? "animate-[flashAnim_200ms_ease-out] opacity-90" : "opacity-0",].join(" ")} />

            <div
              className={["absolute left-0 right-0 top-0", "flex items-center justify-center", "gap-5", "bg-linear-to-b from-black/50 to-transparent","px-5 pb-5 pt-12",].join(" ")}>

              <button type="button" onClick={() => window.alert("Visualização ativada.")} className="group cursor-pointer border-0 bg-transparent p-1 transition-all duration-200 hover:scale-110 hover:opacity-80">
                <img src={viewIcon} alt="Visualizar" className="size-5.5 opacity-80 brightness-0 invert group-hover:opacity-100"/>
              </button>

              <button type="button" onClick={() => window.alert("Foco automático ativado.")} className="group cursor-pointer border-0 bg-transparent p-1 transition-all duration-200 hover:scale-110 hover:opacity-80" >
                <img src={scanerIcon} alt="Foco" className="size-5.5 opacity-80 brightness-0 invert group-hover:opacity-100"/>
              </button>

              <button type="button" onClick={() => window.alert("Modo de ocultação ativado.")} className="group cursor-pointer border-0 bg-transparent p-1 transition-all duration-200 hover:scale-110 hover:opacity-80">
                <img src={olhoFechadoIcon} alt="Ocultar" className="size-5.5 opacity-80 brightness-0 invert group-hover:opacity-100"/>
              </button>

              <span className="text-sm font-bold tracking-[2px] text-[#FFD700]">
                ZEISS
              </span>

              <button type="button" onClick={handleFlash} className="group cursor-pointer 
                border-0 bg-transparent p-1 transition-all duration-200 hover:scale-110">
                <img src={raioIcon} alt="Flash" className={[ "size-5.5 brightness-0 invert", "transition-all duration-200", flashOn ? "opacity-100" : "opacity-80", ].join(" ")}/>
              </button>

              <button type="button" onClick={handleSettings} className="group cursor-pointer border-0 bg-transparent p-1 transition-all duration-200 hover:scale-110 hover:opacity-80" >
                <img src={settingIcon} alt="Configurações" className="size-5.5 opacity-80 brightness-0 invert group-hover:opacity-100" />
              </button>

            </div>

          </div>

          <div className="flex items-center justify-center gap-2 bg-black/80 px-4 py-3">

            {zoomOptions.map((option) => {
              const isActive = zoom === option.value;

              return (
                <button key={option.value} type="button" onClick={() => handleZoom(option.value)} className={[ "rounded-full px-3 py-1", "text-xs font-semibold", "transition-all duration-200", isActive? "bg-[#FFD700] text-black" : "bg-[rgba(30,30,40,0.8)] text-[#aaa] hover:bg-[#FFD700]/30",].join(" ")} >
                  {option.label}
                </button>
              );
            })}

          </div>

          <div
            className={[ "border-t border-[#FFD700]/20", "bg-black/95", "px-4 pb-6 pt-3", "backdrop-blur-xl",].join(" ")} >

            <div className="mb-5 flex flex-wrap items-center justify-center gap-3">

              {cameraModes.map((cameraMode) => {
                const isActive = mode === cameraMode.value;

                return (
                  <button key={cameraMode.value} type="button" onClick={() =>  handleMode(  cameraMode.value, cameraMode.label )} className={["border-0 bg-transparent", "px-0 py-1", "text-xs font-medium", "transition-all duration-200", isActive ? "border-b-2 border-[#FFD700] text-[#FFD700]" : "text-[#8e8e9e] hover:text-[#FFD700]",  ].join(" ")} >
                    {cameraMode.label}
                  </button>
                );
              })}

              <button type="button" onClick={() => setMoreMenuOpen(true)} className={[ "flex items-center gap-1", "border-0 bg-transparent", "text-xs text-[#8e8e9e]", "transition-colors duration-200", "hover:text-[#FFD700]", ].join(" ")} > Mais </button>

            </div>

            <div className="mb-4 flex items-center justify-between px-5">

              <button type="button" onClick={() => { const openGallery = window.confirm("Deseja abrir a galeria?" );

                  if (openGallery) {
                    navigateTo("/galeria");
                  }
                }}
                className={[ "flex size-12 items-center justify-center", "rounded-xl", "border border-[#333]", "bg-[#1a1a24]", "transition-all duration-200", "hover:border-[#FFD700]", ].join(" ")} >
                <img src={galeriaIcon} alt="Galeria"className="size-7 opacity-70 brightness-0 invert"/>
              </button>

              <button type="button" onClick={handleCapture} aria-label="Capturar foto" className="cursor-pointer border-0 bg-transparent p-0"  >
                <div className={[ "size-17.5 rounded-full", "border-[3px] border-[#FFD700]", "bg-white", "shadow-[0_0_15px_rgba(255,215,0,0.3)]", "transition-transform duration-100", "active:scale-95", ].join(" ")} />
              </button>

              <button type="button" onClick={handleRotate} aria-label="Rotacionar" className={[ "flex size-12 items-center justify-center", "rounded-full", "border border-[#333]", "bg-[#1a1a24]", "transition-all duration-200","hover:border-[#FFD700]", ].join(" ")} >
                <img
                  src={syncIcon} alt="Rotacionar"className="size-6 opacity-70 brightness-0 invert"/>
              </button>

            </div>

            <button type="button" onClick={() => navigateTo("/snaptask")}className={["mx-auto flex min-w-30 items-center justify-center", "gap-1.5", "rounded-full", "border border-[#FFD700]/30", "bg-[#FFD700]/10", "px-4 py-2", "text-xs font-medium text-[#FFD700]", "no-underline",  "transition-all duration-200", "hover:bg-[#FFD700]/20",  ].join(" ")} >
              <img src={brilhoIcon} alt="SnapTask" className="size-4 brightness-0" />

              <span>SnapTask</span>
            </button>

          </div>

        </section>

      </div>

      {moreMenuOpen && (
        <div role="presentation"onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setMoreMenuOpen(false);
            }
          }}
          className={["fixed inset-0 z-40","flex items-end justify-center","bg-black/85","backdrop-blur-lg",].join(" ")} >

          <div className={[ "w-full max-w-97.5", "rounded-t-[30px]", "border-t border-[#FFD700]/20", "bg-[#1a1a24]","p-5", ].join(" ")} >

            <div className="mb-5 flex items-center justify-between">

              <h3 className="text-base font-semibold text-[#FFD700]"> Editar</h3>

              <button type="button" onClick={() => setMoreMenuOpen(false)} aria-label="Fechar menu" className={[ "border-0 bg-transparent", "text-xl text-[#aaa]", "transition-colors duration-200", "hover:text-[#FFD700]", ].join(" ")} > ✕ </button>

            </div>

            <div className="grid grid-cols-3 gap-3">

              {moreModes.map((item) => (
                <button key={item.label}type="button" onClick={() => handleMoreMode(item.label)} className={["group flex flex-col items-center", "gap-2 rounded-xl", "border-0", "bg-[#FFD700]/10", "px-2 py-3", "text-center text-[11px]", "text-[#ccc]", "transition-all duration-200", "hover:-translate-y-0.5", "hover:bg-[#FFD700]/15", "hover:text-[#FFD700]", ].join(" ")} >
                  <img src={item.icon} alt={item.label} className={["size-8", "opacity-70", "brightness-0 invert", "transition-opacity duration-200","group-hover:opacity-100", ].join(" ")}/>

                  <span>{item.label}</span>
                </button>
              ))}

            </div>

          </div>

        </div>
      )}

    </main>
  );
}