import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_URL, VIDEO_ACCEPT } from "../config";

import retorno from "../assets/retorno.png";
import camera from "../assets/camera.png";
import brilho from "../assets/brilho.png";
import editorDoc from "../assets/editor-doc.png";
import scaner from "../assets/scaner.png";
import qrCode from "../assets/qr-code.png";
import galeria from "../assets/galeria.png";
import brain from "../assets/brain.png";
import mao from "../assets/mao.png";

function Libras() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mode, setMode] = useState("video");
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoFinished, setVideoFinished] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [editableText, setEditableText] = useState("");
  const [micActive, setMicActive] = useState(false);
  const [speechText, setSpeechText] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoStatus, setVideoStatus] = useState("");
  const [videoError, setVideoError] = useState("");

  const typingInterval = useRef(null);
  const videoInputRef = useRef(null);
  const recognitionRef = useRef(null);
  const videoUrlRef = useRef("");

  useEffect(() => {
    return () => {
      clearInterval(typingInterval.current);
      recognitionRef.current?.stop();
      if (videoUrlRef.current) URL.revokeObjectURL(videoUrlRef.current);
    };
  }, []);

  const handleVideoChange = async (event) => {
    const video = event.target.files?.[0];
    if (!video) return;

    clearInterval(typingInterval.current);
    if (videoUrlRef.current) URL.revokeObjectURL(videoUrlRef.current);

    const nextVideoUrl = URL.createObjectURL(video);
    videoUrlRef.current = nextVideoUrl;
    setVideoUrl(nextVideoUrl);
    clearInterval(typingInterval.current);
    setVideoStarted(true);
    setVideoFinished(false);
    setTypingText("");
    setEditableText("");
    setVideoError("");
    setVideoStatus(video.size > 10 * 1024 * 1024 ? "Vídeo grande, pode demorar um pouco..." : "Enviando vídeo para a IA...");

    const formData = new FormData();
    formData.append("video", video);

    try {
      const response = await fetch(`${BACKEND_URL}/libras`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok || data.erro || !data.traducao) {
        throw new Error(data.erro || "Não foi possível traduzir o vídeo.");
      }

      const translation = data.traducao;
      setVideoStatus("Vídeo processado");
      let index = 0;
      typingInterval.current = setInterval(() => {
        if (index < translation.length) {
          setTypingText((previous) => previous + translation[index]);
          index += 1;
        } else {
          clearInterval(typingInterval.current);
          setVideoFinished(true);
          setEditableText(translation);
        }
      }, 30);
    } catch (requestError) {
      setVideoError(requestError.message);
      setVideoStatus("Erro ao processar vídeo");
      setTypingText(`Erro: ${requestError.message}`);
    } finally {
      event.target.value = "";
    }
  };

  const newVideo = () => {
    clearInterval(typingInterval.current);
    if (videoUrlRef.current) URL.revokeObjectURL(videoUrlRef.current);
    videoUrlRef.current = "";
    setVideoUrl("");
    setVideoStarted(false);
    setVideoFinished(false);
    setTypingText("");
    setEditableText("");
    setVideoStatus("");
    setVideoError("");
  };

  const startMic = () => {
    if (micActive) return;

    setMicActive(true);
    setSpeechText("");
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechText("Reconhecimento de voz não disponível neste navegador.");
      setMicActive(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.onresult = (event) => {
      let text = "";
      for (const result of event.results) text += result[0].transcript;
      setSpeechText(text);
    };
    recognition.onend = () => setMicActive(false);
    recognition.onerror = (event) => {
      setSpeechText(`Erro: ${event.error}`);
      setMicActive(false);
    };
    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopMic = () => {
    setMicActive(false);
    recognitionRef.current?.stop();
  };

  const menuItems = [
    { name: "Câmera", icon: camera, path: "/" },
    { name: "SnapTask", icon: brilho, path: "/snaptask" },
    { name: "Editor Doc", icon: editorDoc, path: "/editor-doc" },
    { name: "Dev OCR", icon: scaner, path: "/leitor-codigos" },
    { name: "QR Share", icon: qrCode, path: "/qr" },
    { name: "Galeria", icon: galeria, path: "/galeria" },
    { name: "Flashcards", icon: brain, path: "/flashcards" },
    { name: "Libras", icon: mao, path: "/libras" },
  ];

  return (
    <main style={{ minHeight: "100vh", width: "100%", background: "#0a0a0f", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "system-ui,-apple-system,sans-serif", padding: "20px", boxSizing: "border-box" }}>

      <button onClick={() => setMenuOpen((prev) => !prev)} style={{ position: "fixed", top: "50%", right: "20px", transform: "translateY(-50%)", width: "56px", height: "56px", background: "#FFD700", border: "none", borderLeft: "4px solid #000", borderTopLeftRadius: "12px", borderBottomLeftRadius: "12px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
        <span style={{ fontSize: "32px", color: "#000", fontWeight: "bold" }}>&lt;</span>
      </button>

      <div style={{ position: "fixed", top: "50%", right: menuOpen ? "60px" : "-220px", transform: "translateY(-50%)", width: "220px", background: "rgba(30,30,40,.95)", backdropFilter: "blur(20px)", transition: "right .3s ease", zIndex: 999, borderLeft: "2px solid #FFD700", borderRadius: "12px 0 0 12px", padding: "8px 0" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ padding: "12px 16px 8px", color: "#FFD700", fontSize: "14px", fontWeight: "bold", borderBottom: "1px solid rgba(255,215,0,.3)", marginBottom: "8px" }}>DEV NAV</div>

          {menuItems.map((item) => (
            <Link key={item.name} to={item.path} onClick={() => setMenuOpen(false)} style={{ textDecoration: "none" }}>
              <div style={{ padding: "10px 16px", color: "#f0f0f0", fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px" }}>
                <img src={item.icon} alt="" style={{ width: "20px", height: "20px", filter: "brightness(0) invert(1)" }} />
                <span>{item.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", width: "100%", boxSizing: "border-box" }}>

        <header style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1 style={{ margin: 0, fontSize: "32px", fontWeight: "bold", background: "linear-gradient(135deg,#FFD700,#FFA500)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>JOVI Camera</h1>
          <p style={{ color: "#8e8e9e", fontSize: "14px", margin: "5px 0 0" }}>Experiência de câmera intuitiva + SnapTask para processamento inteligente</p>
        </header>

        <section style={{ width: "390px", height: "844px", maxWidth: "100%", background: "#000", borderRadius: "40px", border: "2px solid #2a2a35", overflow: "hidden", padding: "20px", boxSizing: "border-box" }}>

          <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>

            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "20px", marginBottom: "20px" }}>
              <Link to="/snaptask" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>
                <img src={retorno} alt="Voltar" style={{ width: "24px", height: "24px", filter: "brightness(0) invert(1)" }} />
              </Link>

              <div>
                <h2 style={{ color: "#ff9f43", fontSize: "20px", margin: 0 }}>Libras</h2>
                <span style={{ color: "#777d8f", fontSize: "11px" }}>Tradução de sinais em tempo real</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px", background: "#10131c", padding: "6px", borderRadius: "16px", marginBottom: "20px" }}>
              <button onClick={() => setMode("video")} style={{ flex: 1, border: "none", background: mode === "video" ? "#ff9f43" : "none", color: mode === "video" ? "#000" : "#8a8a95", padding: "12px", borderRadius: "12px", cursor: "pointer", fontSize: "12px", fontWeight: 600 }}>Upload de Vídeo</button>
              <button onClick={() => setMode("mic")} style={{ flex: 1, border: "none", background: mode === "mic" ? "#ff9f43" : "none", color: mode === "mic" ? "#000" : "#8a8a95", padding: "12px", borderRadius: "12px", cursor: "pointer", fontSize: "12px", fontWeight: 600 }}>Microfone</button>
            </div>

            {mode === "video" && (
              <div style={{ flex: 1, overflowY: "auto" }}>

                {!videoStarted && (
                  <button onClick={() => videoInputRef.current?.click()} style={{ width: "100%", aspectRatio: "16/9", border: "2px dashed rgba(255,159,67,.4)", background: "rgba(255,159,67,.05)", borderRadius: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "18px", color: "#fff", cursor: "pointer" }}>
                    <div style={{ width: "60px", height: "60px", borderRadius: "18px", background: "rgba(255,159,67,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", color: "#ff9f43" }}>⬆</div>
                    <div>
                      <h3 style={{ fontSize: "16px", margin: 0 }}>Enviar vídeo</h3>
                      <p style={{ fontSize: "11px", color: "#777d8f", margin: "6px 0 0" }}>Selecione um vídeo com linguagem de sinais</p>
                    </div>
                  </button>
                )}

                <input ref={videoInputRef} type="file" accept={VIDEO_ACCEPT} onChange={handleVideoChange} style={{ display: "none" }} />

                {videoStarted && (
                  <div style={{ width: "100%", aspectRatio: "16/9", borderRadius: "20px", overflow: "hidden", position: "relative", background: "#141414", border: "1px solid #232632" }}>
                    {videoUrl && <video src={videoUrl} autoPlay muted loop playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: .5 }} />}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(255,159,67,.1),rgba(155,89,182,.1))" }} />
                    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
                      <div style={{ width: "70px", height: "70px", borderRadius: "20px", background: "rgba(255,159,67,.2)", marginBottom: "10px" }} />
                      <p style={{ fontSize: "12px", color: videoError ? "#ff7070" : "#aaa" }}>{videoError || videoStatus || "Processando vídeo..."}</p>
                    </div>
                    {!videoFinished && <div style={{ position: "absolute", bottom: 0, left: 0, height: "4px", width: "100%", background: "#ff9f43" }} />}
                  </div>
                )}

                {videoStarted && (
                  <div style={{ marginTop: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <div style={{ fontSize: "11px", color: "#8a8a95" }}>Transcrição</div>
                      <div style={{ background: "rgba(46,204,113,.15)", color: "#2ecc71", padding: "4px 8px", borderRadius: "10px", fontSize: "10px" }}>✏ Editável</div>
                    </div>

                    {!videoFinished ? (
                      <div style={{ width: "100%", minHeight: "140px", background: "#10131c", border: "1px solid #232632", borderRadius: "16px", padding: "16px", color: "#fff", fontSize: "14px", lineHeight: 1.7, boxSizing: "border-box" }}>
                        {typingText}<span style={{ animation: "blink .8s infinite" }}>|</span>
                      </div>
                    ) : (
                      <textarea value={editableText} onChange={(e) => setEditableText(e.target.value)} style={{ width: "100%", minHeight: "140px", background: "#10131c", border: "1px solid #232632", borderRadius: "16px", padding: "16px", color: "#fff", fontSize: "14px", lineHeight: 1.7, resize: "none", boxSizing: "border-box", outline: "none" }} />
                    )}

                    {(videoFinished || videoError) && <button onClick={newVideo} style={{ marginTop: "14px", width: "100%", border: "none", borderRadius: "14px", background: "#ff9f43", color: "#000", padding: "14px", fontWeight: 700, cursor: "pointer" }}>Novo Vídeo</button>}
                  </div>
                )}
              </div>
            )}

            {mode === "mic" && (
              <div style={{ flex: 1, overflowY: "auto" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "60px" }}>

                  <div style={{ position: "relative", width: "100px", height: "100px" }}>
                    {micActive && (
                      <>
                        <div style={{ position: "absolute", inset: 0, border: "2px solid rgba(255,159,67,.3)", borderRadius: "50%", animation: "ring 1.5s infinite" }} />
                        <div style={{ position: "absolute", inset: 0, border: "2px solid rgba(255,159,67,.3)", borderRadius: "50%", animation: "ring 1.5s infinite .3s" }} />
                        <div style={{ position: "absolute", inset: 0, border: "2px solid rgba(255,159,67,.3)", borderRadius: "50%", animation: "ring 1.5s infinite .6s" }} />
                      </>
                    )}

                    <button onMouseDown={startMic} onMouseUp={stopMic} onMouseLeave={stopMic} onTouchStart={startMic} onTouchEnd={stopMic} style={{ width: "100px", height: "100px", borderRadius: "50%", border: "none", background: "#10131c", cursor: "pointer", position: "relative", zIndex: 2 }} />
                  </div>

                  <p style={{ marginTop: "24px", color: "#8a8a95", fontSize: "12px" }}>{micActive ? "Ouvindo... solte para parar" : "Mantenha pressionado para falar"}</p>

                  {micActive && (
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", height: "60px", marginTop: "30px" }}>
                      {[12, 35, 18, 45, 22, 38, 16, 28].map((height, index) => (
                        <div key={index} style={{ width: "5px", height: `${height}px`, background: "#ff9f43", borderRadius: "10px", animation: "wave .5s infinite alternate", animationDelay: `${index * 0.05}s` }} />
                      ))}
                    </div>
                  )}

                  {micActive && (
                    <div style={{ width: "100%", marginTop: "30px" }}>
                      <div style={{ fontSize: "11px", color: "#8a8a95", marginBottom: "10px" }}>Speech-to-Text</div>
                      <div style={{ background: "#10131c", border: "1px solid #232632", borderRadius: "16px", padding: "16px", minHeight: "100px", lineHeight: 1.7 }}>
                        {speechText}<span>|</span>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            )}

          </div>
        </section>
      </div>

      <style>{`
        @keyframes ring {
          0% { transform: scale(1); opacity: .6; }
          100% { transform: scale(2); opacity: 0; }
        }
        @keyframes wave {
          from { transform: scaleY(.5); }
          to { transform: scaleY(1.2); }
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
        @media(max-width:768px) {
          section { width: 100vw !important; height: 100vh !important; border-radius: 0 !important; }
        }
      `}</style>
    </main>
  );
}

export default Libras;