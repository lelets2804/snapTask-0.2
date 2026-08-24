import { useRef, useState } from "react";
import { BACKEND_URL, DOCUMENT_ACCEPT } from "../config";
import PromptComplemento from "../components/PromptComplemento";

import cameraIcon from "../assets/camera.png";
import brilhoIcon from "../assets/brilho.png";
import editorDocIcon from "../assets/editor-doc.png";
import scannerIcon from "../assets/scaner.png";
import qrCodeIcon from "../assets/qr-code.png";
import galeriaIcon from "../assets/galeria.png";
import brainIcon from "../assets/brain.png";
import maoIcon from "../assets/mao.png";
import retornoIcon from "../assets/retorno.png";

const documents = [
  {
    title: "Aula de Cálculo II - Integrais",
    date: "Hoje, 14:30",
    preview: "Integral definida: ∫ab f(x)dx = F(b) - F(a)...",
    text: `Integral Definida

A integral definida de uma função f(x) no intervalo [a, b] é dada por:
∫ab f(x)dx = F(b) - F(a)
Onde F(x) é a primitiva de f(x).

Propriedades:
• Linearidade
• Intervalo nulo
• Aditividade

Técnicas:
1. Substituição simples
2. Integração por partes
3. Frações parciais`,
  },
  {
    title: "Reunião de Projeto - Sprint 4",
    date: "Ontem, 10:15",
    preview: "Tarefas pendentes: refatorar módulo de auth...",
    text: `Sprint 4 - Notas da Reunião

Participantes:
Ana, Pedro, Lucas e Mariana

Tarefas:
• Refatorar autenticação
• Implementar testes E2E
• Revisar PR dark-mode

Nova reunião:
Sexta-feira às 14h`,
  },
  {
    title: "Fórmulas de Física - Termodinâmica",
    date: "12 Abr, 09:00",
    preview: "1ª Lei: ΔU = Q - W...",
    text: `Termodinâmica - Resumo

1ª Lei:
ΔU = Q - W

2ª Lei:
ΔS ≥ 0

Equações:
• PV = nRT
• W = P·ΔV
• Q = mcΔT

Aplicações:
- Motores térmicos
- Refrigeradores`,
  },
  {
    title: "Brainstorm - Design do App",
    date: "10 Abr, 16:45",
    preview: "Paleta de cores: dark theme, acentos dourados...",
    text: `Brainstorm - Redesign do App

Paleta:
• Background escuro
• Dourado/âmbar
• Verde menta

Layout:
- Glass morphism
- Bordas arredondadas
- Animações suaves

Prioridades:
1. Bottom sheet
2. Tabs animadas
3. Cards expansíveis`,
  },
];

const menuItems = [
  { label: "Câmera", icon: cameraIcon, path: "/" },
  { label: "SnapTask", icon: brilhoIcon, path: "/snaptask" },
  { label: "Editor Doc", icon: editorDocIcon, path: "/editor-doc" },
  { label: "Leitor Códigos", icon: scannerIcon, path: "/leitor-codigos" },
  { label: "QR Share", icon: qrCodeIcon, path: "/qr" },
  { label: "Galeria", icon: galeriaIcon, path: "/galeria" },
  { label: "Flashcards", icon: brainIcon, path: "/flashcards" },
  { label: "Libras", icon: maoIcon, path: "/libras" },
];

function EditorDoc() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionError, setTranscriptionError] = useState("");
  const [promptOpen, setPromptOpen] = useState(false);
  const pendingImageRef = useRef(null);
  const documentInputRef = useRef(null);

  const openDocument = (document) => {
    setSelectedDocument(document);
    setIsProcessed(false);
  };

  const closeDocument = () => {
    setSelectedDocument(null);
    setIsProcessed(false);
  };

  const processDocument = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsProcessed(true);
    }, 1500);
  };

  const handleTranscribe = async (event) => {
    const image = event.target.files?.[0];
    if (!image) return;

    pendingImageRef.current = image;
    setPromptOpen(true);
    event.target.value = "";
  };

  const transcribeImage = async ({ prompt }) => {
    const image = pendingImageRef.current;
    setPromptOpen(false);
    if (!image) return;

    setIsTranscribing(true);
    setTranscriptionError("");
    setSelectedDocument({
      title: "Transcrevendo com IA...",
      date: "Aguarde",
      text: "Processando imagem...",
    });

    const formData = new FormData();
    formData.append("imagem", image);
    formData.append("prompt", prompt);

    try {
      const response = await fetch(`${BACKEND_URL}/documento`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok || data.erro || !data.texto) {
        throw new Error(data.erro || "Não foi possível transcrever o documento.");
      }

      setSelectedDocument({
        title: "Documento gerado pela IA",
        date: "Agora",
        text: data.texto,
      });
    } catch (requestError) {
      setTranscriptionError(requestError.message);
      setSelectedDocument((previous) => ({
        ...previous,
        title: "Erro ao transcrever",
        text: "",
      }));
    } finally {
      setIsTranscribing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070d] text-white flex items-center justify-center font-[system-ui,-apple-system,'Segoe_UI',sans-serif]">
      <button onClick={() => setMenuOpen((prev) => !prev)} className="fixed top-1/2 right-0 -translate-y-1/2 w-14 h-18.5 bg-[#FFD700] border-0 border-l-4 border-black rounded-l-[14px] flex items-center justify-center cursor-pointer z-1000 transition hover:bg-[#ffcc00]" >
        <span className="text-[34px] font-black text-black leading-none">
          &lt;
        </span>
      </button>

      <div className={`fixed top-1/2 -translate-y-1/2 w-55 bg-[rgba(20,20,30,0.96)] backdrop-blur-xl border-l-2 border-[#FFD700] rounded-l-[14px] overflow-hidden shadow-[-8px_0_30px_rgba(0,0,0,0.45)] transition-all duration-300 z-999 ${
          menuOpen ? "right-14" : "-right-55"
        }`} >
        <div className="flex flex-col py-2">
          <div className="text-[#FFD700] text-lg font-extrabold tracking-[1px] px-4 py-3 border-b border-[rgba(255,215,0,0.25)] mb-2">
            DEV NAV
          </div>

          {menuItems.map((item) => (
            <a key={item.label} href={item.path} className="no-underline" >
              <div className="flex items-center gap-3 px-4 py-3 transition cursor-pointer hover:bg-[rgba(255,215,0,0.08)]">
                <img src={item.icon} alt={item.label} className="w-4.5 h-4.5 object-contain brightness-0 invert"/>

                <span className="text-[#f1f1f1] text-sm font-medium">
                  {item.label}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center p-5">
        <PromptComplemento open={promptOpen} title="Complementar transcrição" onConfirm={transcribeImage} onCancel={() => { pendingImageRef.current = null; setPromptOpen(false); }} />
        <div className="text-center mb-5">
          <h1 className="text-[32px] font-bold bg-linear-to-br from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
            JOVI Camera
          </h1>

          <p className="text-[#7e7e8a] mt-1.25 text-sm">
            Experiência de câmera intuitiva + SnapTask para processamento
            inteligente
          </p>
        </div>

        <div className="w-97.5 h-211 bg-black rounded-[40px] border-2 border-[#2a2a35] overflow-hidden p-4.5 max-[768px]:w-screen max-[768px]:h-screen max-[768px]:rounded-none max-[768px]:border-0">
          {!selectedDocument ? (
            <div className="w-full h-full flex flex-col">
              <div className="flex items-center gap-3.5 mt-5 mb-5.5">
                <a href="/snaptask" className="bg-transparent border-0 cursor-pointer" >
                  <img src={retornoIcon} alt="Voltar" className="w-5.5 h-5.5 brightness-0 invert" />
                </a>

                <div>
                  <h2 className="text-lg text-white font-bold">
                    Editor Doc
                  </h2>

                  <span className="text-[#8e8e9e] text-[10px]">
                    Notas geradas a partir de fotos de lousa
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3.5">
                <span className="text-[#777d8f] text-[10px] tracking-[2px] font-semibold">
                  ARQUIVOS RECENTES
                </span>
              </div>

              <div className="flex flex-col gap-3 overflow-y-auto pr-1">
                <button type="button" onClick={() => documentInputRef.current?.click()} disabled={isTranscribing} className="w-full flex items-center gap-3.5 bg-[#10131c] border border-dashed border-[#6c63ff] rounded-[18px] p-3.5 cursor-pointer transition text-left hover:bg-[#171b26] disabled:opacity-50">
                  <div className="w-12 h-12 rounded-[14px] bg-[#6c63ff25] flex items-center justify-center shrink-0">
                    <img src={editorDocIcon} alt="" className="w-5.5 h-5.5 brightness-0 invert" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm mb-0.75 font-semibold truncate">Transcrever imagem com IA</h3>
                    <small className="text-[#8e8e9e] text-[10px]">Selecione uma foto de lousa ou caderno</small>
                    <p className="text-[#777d8f] text-[11px] mt-1.25 overflow-hidden whitespace-nowrap text-ellipsis">O backend extrai e organiza o texto automaticamente</p>
                  </div>

                  <div className="text-[#777] text-lg">›</div>
                </button>

                <input ref={documentInputRef} type="file" accept={DOCUMENT_ACCEPT} onChange={handleTranscribe} className="hidden" />

                {documents.map((document, index) => (
                  <button key={index} onClick={() => openDocument(document)} className="w-full flex items-center gap-3.5 bg-[#10131c] border border-[#232632] rounded-[18px] p-3.5 cursor-pointer transition text-left hover:bg-[#171b26]" >
                    <div className="w-12 h-12 rounded-[14px] bg-[#1f5eff25] flex items-center justify-center shrink-0">
                      <img src={editorDocIcon} alt="" className="w-5.5 h-5.5 brightness-0 invert" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm mb-0.75 font-semibold truncate">
                        {document.title}
                      </h3>

                      <small className="text-[#8e8e9e] text-[10px]">
                        {document.date}
                      </small>

                      <p className="text-[#777d8f] text-[11px] mt-1.25 overflow-hidden whitespace-nowrap text-ellipsis">
                        {document.preview}
                      </p>
                    </div>

                    <div className="text-[#777] text-lg">
                      ›
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col">
              <div className="flex items-center gap-3.5 mt-5 mb-5.5">
                <button onClick={closeDocument} className="bg-transparent border-0 cursor-pointer" >
                  <img src={retornoIcon} alt="Voltar" className="w-5.5 h-5.5 brightness-0 invert" />
                </button>

                <div>
                  <h2 className="text-lg text-white font-bold">
                    {selectedDocument.title}
                  </h2>

                  <span className="text-[#8e8e9e] text-[10px]">
                    {selectedDocument.date}
                  </span>
                </div>
              </div>

              <div className="h-40 rounded-[18px] overflow-hidden border border-[#232632] relative mb-3.5">
                <div className={`w-full h-full flex items-center justify-center transition-all duration-700 relative ${
                    isProcessed
                      ? "bg-linear-to-br from-[#2a2a35] to-[#16161d]"
                      : "bg-linear-to-br from-[#1e1e28] to-[#121218]"
                  }`} >
                  <div
                    className={`absolute w-[78%] h-[78%] rounded-xl transition-all duration-700 ${
                      isProcessed
                        ? "bg-[#f4f4f4] rotate-0"
                        : "bg-[#d9d9d9] skew-y-2 skew-x-1"
                    }`}
                  />

                  <div className="absolute w-[52%] h-1.5 top-12 bg-[#8d8d8d] rounded-[20px] z-5" />
                  <div className="absolute w-[44%] h-1.5 top-16.5 bg-[#8d8d8d] rounded-[20px] z-5" />
                  <div className="absolute w-[58%] h-1.5 top-21 bg-[#8d8d8d] rounded-[20px] z-5" />
                  <div className="absolute w-[38%] h-1.5 top-25.5 bg-[#8d8d8d] rounded-[20px] z-5" />
                  <div className="absolute w-[48%] h-1.5 top-30 bg-[#8d8d8d] rounded-[20px] z-5" />
                </div>

                {isProcessing && (
                  <div className="absolute inset-0 bg-[rgba(0,0,0,0.75)] backdrop-blur-md flex items-center justify-center gap-2.5 z-20">
                    <div className="w-6 h-6 border-2 border-[#ffc400] border-t-transparent rounded-full animate-spin" />

                    <span className="text-[#aaa] text-[11px]">
                      Corrigindo...
                    </span>
                  </div>
                )}
              </div>

              <div className="flex gap-2.5 mb-3.5">
                <button onClick={processDocument} disabled={isProcessing} className="flex-1 bg-[#ffc400] text-black font-semibold rounded-[14px] p-3 flex items-center justify-center gap-2 cursor-pointer transition hover:opacity-90 disabled:opacity-50">
                  <span>
                    {isProcessed
                      ? "Reprocessar"
                      : "Corrigir Perspectiva"}
                  </span>
                </button>

                <button className="bg-[#1a1a24] text-white border border-[#2a2a35] rounded-[14px] px-4 py-3 cursor-pointer transition hover:bg-[#22222f]">
                  <span>Contraste</span>
                </button>
              </div>

              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] tracking-[2px] text-[#777d8f] font-semibold">
                  TEXTO EXTRAÍDO
                </span>

                <div className="flex items-center gap-1.25 bg-[#3793ff20] text-[#3793ff] px-2 py-1.25 rounded-full text-[10px] font-semibold">
                  <span>Editável</span>
                </div>
              </div>

              <textarea value={selectedDocument.text} onChange={(event) =>
                  setSelectedDocument((prev) => ({
                    ...prev,
                    text: event.target.value,
                  }))
                }
                className="flex-1 bg-[#10131c] border border-[#232632] rounded-[18px] p-4 text-white resize-none outline-none text-xs leading-[1.7] font-mono focus:border-[#ffc400]"/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditorDoc;
