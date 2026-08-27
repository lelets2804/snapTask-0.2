import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import brilho from "../assets/brilho.png";
import editorDoc from "../assets/editor-doc.png";
import scaner from "../assets/scaner.png";
import qrCode from "../assets/qr-code.png";
import galeria from "../assets/galeria.png";
import brain from "../assets/brain.png";
import mao from "../assets/mao.png";
import retorno from "../assets/retorno.png";
import compartilhar from "../assets/compartilhar.png";

function FlashcardsSalvos() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [savedFlashcards, setSavedFlashcards] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("snapTask.savedFlashcards") || "[]");
    } catch {
      return [];
    }
  });

  function openFlashcard(item) {
    sessionStorage.setItem("snapTask.openSavedFlashcards", JSON.stringify(item));
    navigate("/flashcards");
  }

  function deleteFlashcard(id) {
    const updated = savedFlashcards.filter((item) => item.id !== id);
    setSavedFlashcards(updated);
    localStorage.setItem("snapTask.savedFlashcards", JSON.stringify(updated));
  }

  function clearAll() {
    if (!window.confirm("Deseja excluir todos os flashcards salvos?")) return;
    setSavedFlashcards([]);
    localStorage.removeItem("snapTask.savedFlashcards");
  }

  async function shareFlashcards(item) {
    const text = `${item.title}\n\n${item.cards.map((card, index) => `${index + 1}. ${card.q}\nResposta: ${card.a}`).join("\n\n")}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text,
        });
      } catch {
        return;
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        alert("Flashcards copiados para a área de transferência!");
      } catch {
        alert("Não foi possível compartilhar os flashcards.");
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center font-[system-ui]">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-1/2 right-5 -translate-y-1/2 w-14 h-14 bg-[#FFD700] border-0 border-l-4 border-black rounded-l-xl flex items-center justify-center z-1000 cursor-pointer"
      >
        <span className="text-[32px] font-bold text-black">&lt;</span>
      </button>
      <div
        className={`fixed top-1/2 -translate-y-1/2 w-55 bg-[rgba(30,30,40,0.95)] backdrop-blur-xl transition-all duration-300 z-999 border-l-2 border-[#FFD700] rounded-l-xl py-2 ${menuOpen ? "right-15" : "-right-55"}`}
      >
        <div className="flex flex-col gap-1">
          <div className="px-4 pt-3 pb-2 text-[#FFD700] text-sm font-bold border-b border-[rgba(255,215,0,0.3)] mb-2">
            DEV NAV
          </div>
          <Link to="/snaptask" className="no-underline">
            <MenuItem image={brilho} text="SnapTask" />
          </Link>
          <Link to="/editor-doc" className="no-underline">
            <MenuItem image={editorDoc} text="Editor Doc" />
          </Link>
          <Link to="/leitor-codigos" className="no-underline">
            <MenuItem image={scaner} text="Leitor Códigos" />
          </Link>
          <Link to="/qr" className="no-underline">
            <MenuItem image={qrCode} text="QR Share" />
          </Link>
          <Link to="/galeria" className="no-underline">
            <MenuItem image={galeria} text="Galeria" />
          </Link>
          <Link to="/flashcards" className="no-underline">
            <MenuItem image={brain} text="Flashcards" />
          </Link>
          <Link to="/libras" className="no-underline">
            <MenuItem image={mao} text="Libras" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center p-5">
        <div className="text-center mb-5">
          <h1 className="text-[32px] font-bold bg-linear-to-br from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
            JOVI Camera
          </h1>
          <p className="text-[#7e7e8a] mt-1 text-sm">
            Experiência de câmera intuitiva + SnapTask para processamento inteligente
          </p>
        </div>
        <div className="w-97.5 h-211 bg-black rounded-[40px] border-2 border-[#2a2a35] overflow-hidden relative p-5 max-[768px]:w-screen max-[768px]:h-screen max-[768px]:rounded-none">
          <div className="w-full h-full flex flex-col">
            <div className="flex items-center justify-between mt-6.25 mb-5">
              <Link
                to="/flashcards"
                className="bg-transparent border-0"
              >
                <img
                  src={retorno}
                  alt="Voltar"
                  className="w-5.5 h-5.5 brightness-0 invert"
                />
              </Link>
              <div className="text-center max-w-55">
                <h2 className="text-[#FFD700] text-xl font-bold">
                  Flashcards Salvos
                </h2>
                <span className="text-[#8a8a95] text-[11px]">
                  {savedFlashcards.length} {savedFlashcards.length === 1 ? "conjunto salvo" : "conjuntos salvos"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (savedFlashcards.length > 0) {
                    shareFlashcards(savedFlashcards[0]);
                  }
                }}
                disabled={savedFlashcards.length === 0}
                className="bg-transparent border-0 cursor-pointer disabled:opacity-30"
              >
                <img
                  src={compartilhar}
                  alt="Compartilhar"
                  className="w-5 h-5 brightness-0 invert opacity-80"
                />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto pr-1">
              {savedFlashcards.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-5">
                  <div className="w-20 h-20 rounded-full bg-[#10131c] border border-[#232632] flex items-center justify-center mb-5">
                    <img
                      src={brain}
                      alt=""
                      className="w-9 h-9 brightness-0 invert opacity-70"
                    />
                  </div>
                  <h3 className="text-white text-lg font-bold mb-2">
                    Nenhum flashcard salvo
                  </h3>
                  <p className="text-[#737889] text-sm leading-6 mb-6">
                    Gere seus flashcards com IA e armazene-os para acessá-los novamente aqui.
                  </p>
                  <Link
                    to="/flashcards"
                    className="no-underline w-full rounded-2xl p-4 bg-linear-to-br from-[#FFD700] to-[#FFB300] text-black text-sm font-bold text-center"
                  >
                    Criar flashcards
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4 pb-4">
                  {savedFlashcards.map((item) => (
                    <div
                      key={item.id}
                      className="border border-[#232632] bg-[#10131c] rounded-[24px] p-5"
                    >
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="min-w-0">
                          <h3 className="text-white text-base font-bold truncate">
                            {item.title}
                          </h3>
                          <p className="text-[#737889] text-[10px] mt-1">
                            {item.date}
                          </p>
                        </div>
                        <span className="text-[#FFD700] text-[10px] font-bold whitespace-nowrap">
                          {item.cards.length} cards
                        </span>
                      </div>
                      <div className="border border-[#232632] bg-[#0a0a0f] rounded-2xl p-4 mb-4">
                        <span className="text-[#FFD700] text-[9px] tracking-[1.5px] font-bold">
                          PERGUNTA
                        </span>
                        <p className="text-[#d7d7df] text-sm font-semibold leading-6 mt-2">
                          {item.cards[0]?.q || "Flashcards salvos"}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => openFlashcard(item)}
                          className="flex-1 border-0 rounded-xl p-3 bg-linear-to-br from-[#FFD700] to-[#FFB300] text-black text-xs font-bold cursor-pointer"
                        >
                          Abrir
                        </button>
                        <button
                          type="button"
                          onClick={() => shareFlashcards(item)}
                          className="w-12 border border-[#232632] rounded-xl bg-[#0a0a0f] flex items-center justify-center cursor-pointer"
                        >
                          <img
                            src={compartilhar}
                            alt="Compartilhar"
                            className="w-4 h-4 brightness-0 invert opacity-70"
                          />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteFlashcard(item.id)}
                          className="border border-red-500/30 bg-red-500/10 text-red-400 rounded-xl px-3 text-xs font-bold cursor-pointer"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={clearAll}
                    className="w-full border border-red-500/30 rounded-2xl p-4 bg-red-500/10 text-red-400 text-sm font-bold cursor-pointer"
                  >
                    Excluir todos os flashcards
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function MenuItem({ image, text }) {
  return (
    <div className="px-4 py-2.5 text-[#f0f0f0] text-sm cursor-pointer flex items-center gap-3 transition-all duration-200 hover:bg-[rgba(255,215,0,0.2)] hover:text-[#FFD700]">
      <img src={image} alt="" className="w-5 h-5 brightness-0 invert" />
      <span>{text}</span>
    </div>
  );
}
export default FlashcardsSalvos;