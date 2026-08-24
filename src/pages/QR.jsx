import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { BACKEND_URL, IMAGE_ACCEPT } from "../config";

import retorno from "../assets/retorno.png";
import linkIcon from "../assets/link.png";
import protection from "../assets/protection.png";
import phone from "../assets/phone.png";
import wifi from "../assets/wifi.png";
import camera from "../assets/camera.png";
import brilho from "../assets/brilho.png";
import editorDoc from "../assets/editor-doc.png";
import scaner from "../assets/scaner.png";
import qrCode from "../assets/qr-code.png";
import galeria from "../assets/galeria.png";
import brain from "../assets/brain.png";
import mao from "../assets/mao.png";

function QR() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [generated, setGenerated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const imageInputRef = useRef(null);

  const menuItems = [
    { name: "Câmera", icon: camera, path: "/" },
    { name: "SnapTask", icon: brilho, path: "/" },
    { name: "Editor Doc", icon: editorDoc, path: "/editor-doc" },
    { name: "Dev OCR", icon: scaner, path: "/leitor-codigos" },
    { name: "QR Share", icon: qrCode, path: "/qr" },
    { name: "Galeria", icon: galeria, path: "/galeria" },
    { name: "Flashcards", icon: brain, path: "/flashcards" },
    { name: "Libras", icon: mao, path: "/libras" },
  ];

  const handleGenerate = () => {
    if (generated) {
      setGenerated(null);
      setError("");
      setCopied(false);
      return;
    }

    imageInputRef.current?.click();
  };

  const handleImageChange = async (event) => {
    const image = event.target.files?.[0];
    if (!image) return;

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("imagem", image);

    try {
      const response = await fetch(`${BACKEND_URL}/gerar_qr`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Não foi possível gerar o link.");
      }

      const data = await response.json();
      if (data.erro || !data.qr_base64 || !data.link) {
        throw new Error(data.erro || "A resposta do servidor está incompleta.");
      }

      setGenerated({ qr: data.qr_base64, link: data.link });
    } catch (requestError) {
      setError(requestError.message || "Erro ao gerar QR.");
    } finally {
      setLoading(false);
      event.target.value = "";
    }
  };

  const handleCopy = async () => {
    if (!generated?.link) return;

    try {
      await navigator.clipboard.writeText(generated.link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Não foi possível copiar o link.");
    }
  };

  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0f", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui,-apple-system,'Segoe UI',sans-serif", color: "#fff", padding: "20px", boxSizing: "border-box" }}>
      
      <button onClick={() => setMenuOpen(!menuOpen)} style={{ position: "fixed", top: "50%", right: "20px", transform: "translateY(-50%)", width: "56px", height: "56px", background: "#FFD700", border: "none", borderLeft: "4px solid #000", borderTopLeftRadius: "12px", borderBottomLeftRadius: "12px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
        <span style={{ fontSize: "32px", color: "#000", fontWeight: "bold" }}>&lt;</span>
      </button>

      <div style={{ position: "fixed", top: "50%", right: menuOpen ? "60px" : "-220px", transform: "translateY(-50%)", width: "220px", background: "rgba(30,30,40,.95)", backdropFilter: "blur(20px)", transition: "right .3s ease", zIndex: 999, borderLeft: "2px solid #FFD700", borderRadius: "12px 0 0 12px", padding: "8px 0" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ padding: "12px 16px 8px", color: "#FFD700", fontSize: "14px", fontWeight: "bold", borderBottom: "1px solid rgba(255,215,0,.3)", marginBottom: "8px" }}>DEV NAV</div>

          {menuItems.map((item) => (
            <Link key={item.name} to={item.path} style={{ textDecoration: "none" }}>
              <div style={{ padding: "10px 16px", color: "#f0f0f0", fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px" }}>
                <img src={item.icon} alt="" style={{ width: "20px", height: "20px", filter: "brightness(0) invert(1)" }} />
                <span>{item.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
        
        <header style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1 style={{ margin: 0, fontSize: "32px", fontWeight: "bold", background: "linear-gradient(135deg,#FFD700,#FFA500)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>JOVI Camera</h1>
          <p style={{ color: "#7e7e8a", margin: "5px 0 0", fontSize: "14px" }}>Experiência de câmera intuitiva + SnapTask para processamento inteligente</p>
        </header>

        <section style={{ width: "390px", maxWidth: "100%", height: "844px", background: "#000", borderRadius: "40px", border: "2px solid #2a2a35", overflow: "hidden", padding: "20px", boxSizing: "border-box" }}>
          
          <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
            
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginTop: "30px", marginBottom: "25px" }}>
              <Link to="/" style={{ background: "none", border: "none", cursor: "pointer" }}>
                <img src={retorno} alt="Voltar" style={{ width: "24px", height: "24px", filter: "brightness(0) invert(1)" }} />
              </Link>

              <div>
                <h2 style={{ margin: 0, color: "#9d4cff", fontSize: "18.6px", fontWeight: 700 }}>QR Compartilhar</h2>
                <span style={{ color: "#8a8a95", fontSize: "12px" }}>Compartilhe em qualidade original</span>
              </div>
            </div>

            <div style={{ width: "70%", height: "250px", margin: "0 auto", background: "#ececec", borderRadius: "18px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "18px" }}>
              {generated ? (
                <img src={`data:image/png;base64,${generated.qr}`} alt="QR Code gerado" style={{ width: "180px", height: "180px" }} />
              ) : (
                <>
                  <img src={linkIcon} alt="Link" style={{ width: "55px", height: "60px", opacity: .5 }} />
                  <p style={{ color: "#777", fontSize: "14px", margin: 0 }}>{loading ? "Enviando e gerando QR..." : "Gere um link para compartilhar"}</p>
                </>
              )}
            </div>

            <input ref={imageInputRef} type="file" accept={IMAGE_ACCEPT} onChange={handleImageChange} style={{ display: "none" }} />

            {generated && (
              <div style={{ width: "100%", background: "#10131c", border: "1px solid #232632", borderRadius: "16px", padding: "14px", display: "flex", alignItems: "center", gap: "10px", marginTop: "20px", boxSizing: "border-box" }}>
                <img src={linkIcon} alt="Link" style={{ width: "18px", height: "18px", filter: "brightness(0) invert(1)" }} />
                <span style={{ color: "#d5d5dd", fontSize: "12px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{generated.link}</span>
                <button onClick={handleCopy} style={{ background: "none", border: "none", color: "#FFD700", fontSize: "13px", fontWeight: 600, cursor: "pointer", flexShrink: 0 }}>
                  {copied ? "Copiado ✓" : "Copiar"}
                </button>
              </div>
            )}

            {error && <p style={{ color: "#ff7070", fontSize: "13px", textAlign: "center", margin: "14px 0 0" }}>{error}</p>}

            <button onClick={handleGenerate} disabled={loading} style={{ marginTop: "22px", width: "100%", border: "none", borderRadius: "16px", padding: "16px", background: "linear-gradient(135deg,#a855f7,#7c3aed)", color: "#fff", fontSize: "16px", fontWeight: 600, cursor: loading ? "wait" : "pointer", opacity: loading ? .7 : 1, boxSizing: "border-box" }}>
              {loading ? "Enviando..." : generated ? "Gerar novo link" : "Gerar Link"}
            </button>

            <div style={{ marginTop: "14px", background: "#10131c", border: "1px solid #232632", borderRadius: "16px", padding: "14px", display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "14px", background: "#58367da2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <img src={protection} alt="" style={{ width: "20px", height: "20px", filter: "brightness(0) invert(1)" }} />
              </div>
              <div>
                <h3 style={{ color: "#fff", fontSize: "15px", margin: "0 0 4px" }}>100% Original</h3>
                <p style={{ color: "#777d8f", fontSize: "11px", margin: 0 }}>Sem compressão, qualidade total</p>
              </div>
            </div>

            <div style={{ marginTop: "14px", background: "#10131c", border: "1px solid #232632", borderRadius: "16px", padding: "14px", display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "14px", background: "#58367da2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <img src={phone} alt="" style={{ width: "20px", height: "20px", filter: "brightness(0) invert(1)" }} />
              </div>
              <div>
                <h3 style={{ color: "#fff", fontSize: "15px", margin: "0 0 4px" }}>Android & iOS</h3>
                <p style={{ color: "#777d8f", fontSize: "11px", margin: 0 }}>Compatível entre todos os sistemas</p>
              </div>
            </div>

            <div style={{ marginTop: "14px", background: "#10131c", border: "1px solid #232632", borderRadius: "16px", padding: "14px", display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "14px", background: "#58367da2", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <img src={wifi} alt="" style={{ width: "20px", height: "20px", filter: "brightness(0) invert(1)" }} />
              </div>
              <div>
                <h3 style={{ color: "#fff", fontSize: "15px", margin: "0 0 4px" }}>Nuvem Segura / WebRTC</h3>
                <p style={{ color: "#777d8f", fontSize: "11px", margin: 0 }}>Transferência direta e criptografada</p>
              </div>
            </div>

          </div>
        </section>
      </div>
    </main>
  );
}

export default QR;