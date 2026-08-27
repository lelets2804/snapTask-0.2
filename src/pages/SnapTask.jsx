import { Link } from "react-router-dom";
import retorno from "../assets/retorno.png";
import qrCode from "../assets/qr-code.png";
import scaner from "../assets/scaner.png";
import brain from "../assets/brain.png";
import editorDoc from "../assets/editor-doc.png";
import mao from "../assets/mao.png";

const modules = [
  { title: "QR Compartilhar", description: "Compartilhe sem perda de qualidade via QR", icon: qrCode, color: "#8d42ff", path: "/qr" },
  { title: "Leitor de Códigos", description: "Extraia código com syntax highlighting", icon: scaner, color: "#29cc68", path: "/leitor-codigos" },
  { title: "Flashcards IA", description: "Gere cartões automáticos para estudo", icon: brain, color: "#ffc400", path: "/flashcards" },
  { title: "Editor Doc", description: "Correção de perspectiva e extração de texto", icon: editorDoc, color: "#3793ff", path: "/editor-doc" },
  { title: "Libras", description: "Tradução de sinais em tempo real", icon: mao, color: "#ff8c2e", path: "/libras" },
];

function SnapTask() {
  return (
    <main style={{ minHeight: "100vh", width: "100%", background: "#05070d", display: "flex", justifyContent: "center", alignItems: "center", color: "#fff", fontFamily: "system-ui, -apple-system, sans-serif", padding: "20px", boxSizing: "border-box" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
        <header style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1 style={{ margin: 0, fontSize: "32px", fontWeight: "700", color: "#ffc400" }}>JOVI Camera</h1>
          <p style={{ margin: "5px 0 0", color: "#7e7e8a", fontSize: "14px" }}>Experiência de câmera intuitiva + SnapTask para processamento inteligente</p>
        </header>
        <section style={{ width: "390px", height: "844px", maxWidth: "100%", background: "#05070d", border: "1px solid #232632", borderRadius: "40px", overflow: "hidden", padding: "18px", boxSizing: "border-box" }}>
          <div style={{ width: "100%", height: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "20px" }}>
              <Link to="/" style={{ width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", padding: 0 }}>
                <img src={retorno} alt="Voltar" style={{ width: "22px", height: "22px", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
              </Link>
              <div style={{ textAlign: "center" }}>
                <h2 style={{ margin: 0, color: "#ffc400", fontSize: "38px", fontWeight: "700", lineHeight: 1 }}>SnapTask</h2>
                <span style={{ display: "block", marginTop: "5px", fontSize: "12px", color: "#7e7e8a" }}>Processamento inteligente</span>
              </div>
              <div style={{ width: "30px", height: "30px" }} />
            </div>
            <div style={{ marginTop: "22px", marginBottom: "16px", color: "#6f7280", fontSize: "12px", letterSpacing: "2px" }}>
              MÓDULOS
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {modules.map((module) => (
                <Link key={module.title} to={module.path} style={{ background: "#10131c", border: "1px solid #232632", borderRadius: "18px", padding: "14px", display: "flex", justifyContent: "space-between", alignItems: "center", textDecoration: "none", color: "#fff", cursor: "pointer", transition: "background 0.2s ease, transform 0.15s ease" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", minWidth: 0 }}>
                    <div style={{ width: "48px", height: "48px", flexShrink: 0, borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", background: module.color }}>
                      <img src={module.icon} alt="" style={{ width: "24px", height: "24px", objectFit: "contain", filter: "brightness(0) invert(1)" }} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <h3 style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: "600", color: "#fff" }}>
                        {module.title}
                      </h3>
                      <p style={{ margin: 0, color: "#7f8290", fontSize: "12px", lineHeight: 1.3 }}>
                        {module.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default SnapTask;