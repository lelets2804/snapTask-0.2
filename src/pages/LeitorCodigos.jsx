import { useState } from "react";
import { Link } from "react-router-dom";

import camera from "../assets/camera.png";
import brilho from "../assets/brilho.png";
import editorDoc from "../assets/editor-doc.png";
import scaner from "../assets/scaner.png";
import qrCode from "../assets/qr-code.png";
import galeria from "../assets/galeria.png";
import brain from "../assets/brain.png";
import mao from "../assets/mao.png";
import retorno from "../assets/retorno.png";
import compartilhar from "../assets/compartilhar.png";

function LeitorCodigos() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const code = `def fibonacci(n):
    if n <= 1:
        return n

    return fibonacci(n-1) + fibonacci(n-2)

result = fibonacci(10)

print(f"Resultado: {result}")`;

  const [editorValue, setEditorValue] = useState(code);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(editorValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const menuItems = [
    { name: "Câmera", icon: camera, path: "/" },
    { name: "SnapTask", icon: brilho, path: "/snaptask" },
    { name: "Editor Doc", icon: editorDoc, path: "/editor-doc" },
    { name: "Leitor Códigos", icon: scaner, path: "/leitor-codigos" },
    { name: "QR Share", icon: qrCode, path: "/qr" },
    { name: "Galeria", icon: galeria, path: "/galeria" },
    { name: "Flashcards", icon: brain, path: "/flashcards" },
    { name: "Libras", icon: mao, path: "/libras" }
  ];

  return (
    <div style={{ minHeight: "100vh", width: "100%", background: "#0a0a0f", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontFamily: "system-ui,-apple-system,'Segoe UI',sans-serif", boxSizing: "border-box" }}>

      <button onClick={() => setMenuOpen(!menuOpen)} style={{ position: "fixed", top: "50%", right: "20px", transform: "translateY(-50%)", width: "56px", height: "56px", background: "#FFD700", border: "none", borderLeft: "4px solid #000", borderTopLeftRadius: "12px", borderBottomLeftRadius: "12px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
        <span style={{ fontSize: "32px", color: "#000", fontWeight: "bold" }}>&lt;</span>
      </button>

      <div style={{ position: "fixed", top: "50%", right: menuOpen ? "60px" : "-220px", transform: "translateY(-50%)", width: "220px", background: "rgba(30,30,40,.96)", backdropFilter: "blur(20px)", transition: "right .3s ease", zIndex: 999, borderLeft: "2px solid #FFD700", borderRadius: "12px 0 0 12px", padding: "8px 0" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ padding: "12px 16px 8px", color: "#FFD700", fontSize: "14px", fontWeight: "bold", borderBottom: "1px solid rgba(255,215,0,.3)", marginBottom: "8px" }}>DEV NAV</div>

          {menuItems.map((item) => (
            <Link key={item.name} to={item.path} onClick={() => setMenuOpen(false)} style={{ textDecoration: "none" }}>
              <div style={{ padding: "10px 16px", color: "#f0f0f0", fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px", transition: ".2s" }}>
                <img src={item.icon} alt="" style={{ width: "20px", height: "20px", filter: "brightness(0) invert(1)" }} />
                <span>{item.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", width: "100%", boxSizing: "border-box" }}>

        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1 style={{ margin: 0, fontSize: "32px", fontWeight: "bold", background: "linear-gradient(135deg,#FFD700,#FFA500)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>JOVI Camera</h1>
          <p style={{ color: "#7e7e8a", marginTop: "5px", fontSize: "14px", marginBottom: 0 }}>Experiência de câmera intuitiva + SnapTask para processamento inteligente</p>
        </div>

        <div style={{ width: "390px", height: "844px", maxWidth: "100%", background: "#000", borderRadius: "40px", border: "2px solid #2a2a35", overflow: "hidden", position: "relative", padding: "20px", boxSizing: "border-box" }}>

          <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "25px", marginBottom: "20px" }}>

              <Link to="/snaptask" style={{ background: "none", border: "none", display: "flex" }}>
                <img src={retorno} alt="Voltar" style={{ width: "22px", height: "22px", filter: "brightness(0) invert(1)" }} />
              </Link>

              <div style={{ textAlign: "center" }}>
                <h2 style={{ margin: 0, color: "#29cc68", fontSize: "20px", fontWeight: 700 }}>Dev OCR</h2>
                <span style={{ color: "#8a8a95", fontSize: "12px" }}>Foto de código fonte</span>
              </div>

              <button onClick={() => alert("Compartilhar")} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <img src={compartilhar} alt="Compartilhar" style={{ width: "20px", height: "20px", filter: "brightness(0) invert(1)", opacity: ".8" }} />
              </button>

            </div>

            <div style={{ height: "130px", border: "1px dashed #2f3342", borderRadius: "18px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "20px", background: "#10131c" }}>
              <img src={scaner} alt="" style={{ width: "34px", height: "34px", filter: "brightness(0) invert(1)", opacity: ".6" }} />
              <p style={{ color: "#7c8192", fontSize: "13px", margin: 0 }}>Foto do código fonte</p>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <span style={{ fontSize: "10px", letterSpacing: "2px", color: "#7d8291", fontWeight: 700 }}>CÓDIGO EXTRAÍDO</span>
              <span style={{ background: "rgba(41,204,104,.15)", color: "#29cc68", padding: "5px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600 }}>Python</span>
            </div>

            <div style={{ flex: 1, background: "#10131c", border: "1px solid #232632", borderRadius: "18px", overflow: "auto", padding: "16px", marginBottom: "16px" }}>
              <pre style={{ color: "#d7d7e0", fontSize: "12px", lineHeight: "1.8", fontFamily: "Consolas,monospace", margin: 0, whiteSpace: "pre-wrap" }}>
                <code>
                  <span style={{ color: "#b16cff", fontWeight: 600 }}>def</span>{" "}
                  <span style={{ color: "#53a7ff" }}>fibonacci</span>(n):{"\n"}
                  {"    "}<span style={{ color: "#b16cff", fontWeight: 600 }}>if</span> n &lt;= <span style={{ color: "#ffb347" }}>1</span>:{"\n"}
                  {"        "}<span style={{ color: "#b16cff", fontWeight: 600 }}>return</span> n{"\n\n"}
                  {"    "}<span style={{ color: "#b16cff", fontWeight: 600 }}>return</span>{" "}
                  <span style={{ color: "#53a7ff" }}>fibonacci</span>(n-<span style={{ color: "#ffb347" }}>1</span>) +{" "}
                  <span style={{ color: "#53a7ff" }}>fibonacci</span>(n-<span style={{ color: "#ffb347" }}>2</span>){"\n\n"}
                  result = <span style={{ color: "#53a7ff" }}>fibonacci</span>(<span style={{ color: "#ffb347" }}>10</span>){"\n\n"}
                  <span style={{ color: "#b16cff", fontWeight: 600 }}>print</span>(<span style={{ color: "#4de28c" }}>f"Resultado: &#123;result&#125;"</span>)
                </code>
              </pre>
            </div>

            <textarea value={editorValue} onChange={(e) => setEditorValue(e.target.value)} style={{ width: "100%", height: "110px", background: "#10131c", border: "1px solid #232632", borderRadius: "16px", padding: "14px", resize: "none", outline: "none", color: "#fff", fontSize: "12px", lineHeight: "1.6", fontFamily: "Consolas,monospace", marginBottom: "16px", boxSizing: "border-box" }} />

            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={handleCopy} style={{ flex: 1, border: "none", borderRadius: "16px", background: "#29cc68", color: "#000", fontSize: "14px", fontWeight: 700, padding: "15px", cursor: "pointer" }}>{copied ? "Copiado!" : "Copiar Código"}</button>
              <button onClick={() => alert("Exportando código...")} style={{ border: "none", borderRadius: "16px", background: "#232632", color: "#fff", padding: "15px 20px", cursor: "pointer" }}>Exportar</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default LeitorCodigos;