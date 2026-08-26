import { useEffect, useRef, useState } from "react";

function PromptComplemento({ open, title, tags = [], onConfirm, onCancel }) {
  const [prompt, setPrompt] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setPrompt("");
    setSelectedTag("");
    setListening(false);
  }, [open]);

  useEffect(() => () => recognitionRef.current?.stop(), []);

  if (!open) return null;

  const toggleVoice = () => {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setPrompt((value) => `${value}${value ? " " : ""}Reconhecimento de voz não disponível neste navegador.`);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setPrompt((value) => `${value}${value ? " " : ""}${spokenText}`);
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(0,0,0,.72)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div style={{ width: "min(420px, 100%)", background: "#10131c", border: "1px solid #2f3342", borderRadius: "20px", padding: "22px", boxSizing: "border-box", color: "#fff" }}>
        <h2 style={{ margin: "0 0 8px", fontSize: "20px" }}>{title || "Complementar solicitação"}</h2>
        <p style={{ margin: "0 0 16px", color: "#9a9dab", fontSize: "13px" }}>Quer complementar o prompt antes de enviar?</p>

        {tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "14px" }}>
            {tags.map((tag) => (
              <button key={tag} type="button" onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)} style={{ border: `1px solid ${selectedTag === tag ? "#ff9f43" : "#3a3f50"}`, borderRadius: "18px", padding: "8px 11px", background: selectedTag === tag ? "rgba(255,159,67,.2)" : "#181c27", color: selectedTag === tag ? "#ffb66d" : "#c6c8d2", cursor: "pointer", fontSize: "12px" }}>{tag}</button>
            ))}
          </div>
        )}

        <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Digite uma instrução adicional..." autoFocus style={{ width: "100%", minHeight: "110px", resize: "vertical", boxSizing: "border-box", border: "1px solid #343949", borderRadius: "14px", background: "#080a10", color: "#fff", padding: "13px", outline: "none", fontSize: "14px", lineHeight: 1.5 }} />

        <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
          <button type="button" onClick={toggleVoice} style={{ flex: 1, border: "1px solid #ff9f43", borderRadius: "12px", padding: "12px", background: listening ? "#ff9f43" : "transparent", color: listening ? "#000" : "#ffb66d", cursor: "pointer", fontWeight: 600 }}>{listening ? "Ouvindo..." : "Falar"}</button>
          <button type="button" onClick={onCancel} style={{ border: "none", borderRadius: "12px", padding: "12px 16px", background: "#292e3b", color: "#fff", cursor: "pointer" }}>Cancelar</button>
          <button type="button" onClick={() => onConfirm({ prompt: prompt.trim(), category: selectedTag })} style={{ border: "none", borderRadius: "12px", padding: "12px 16px", background: "#ff9f43", color: "#000", cursor: "pointer", fontWeight: 700 }}>Enviar</button>
        </div>
      </div>
    </div>
  );
}

export default PromptComplemento;
