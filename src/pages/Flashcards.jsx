import { useState } from "react";
import { Link } from "react-router-dom";

import brilho from "../assets/brilho.png";
import editorDoc from "../assets/editor-doc.png";
import scaner from "../assets/scaner.png";
import qrCode from "../assets/qr-code.png";
import galeria from "../assets/galeria.png";
import brain from "../assets/brain.png";
import mao from "../assets/mao.png";
import retorno from "../assets/retorno.png";
import compartilhar from "../assets/compartilhar.png";

function Flashcards() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const cards = [
    {q: "O que é a Série de Fibonacci?",
    a: "Sequência onde cada número é a soma dos dois anteriores: 0, 1, 1, 2, 3, 5, 8...",},
    {q: "O que é recursão?",
    a: "Técnica onde uma função chama a si mesma para resolver subproblemas menores.",},
    {q: "Complexidade do Fibonacci recursivo?",
    a: "O(2^n) — exponencial. Pode ser otimizado com memoização para O(n).",},
  ];

  const card = cards[current];

  function nextCard() {
    if (current < cards.length - 1) {
      setCurrent(current + 1);
      setFlipped(false);
    }
  }

  function previousCard() {
    if (current > 0) {
      setCurrent(current - 1);
      setFlipped(false);
    }
  }

  function toggleCard() {
    setFlipped(!flipped);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center font-[system-ui]">

      <button onClick={() => setMenuOpen(!menuOpen)} className="fixed top-1/2 right-5 -translate-y-1/2 w-14 h-14 bg-[#FFD700] border-0 border-l-4 border-black rounded-l-xl flex items-center justify-center z-1000 cursor-pointer">
        <span className="text-[32px] font-bold text-black"> &lt; </span>
      </button>

      <div className={`fixed top-1/2 -translate-y-1/2 w-55 bg-[rgba(30,30,40,0.95)] backdrop-blur-xl transition-all duration-300 z-999 border-l-2 border-[#FFD700] rounded-l-xl py-2 ${menuOpen ? "right-15" : "-right-55"}`} >
        <div className="flex flex-col gap-1">

          <div className="px-4 pt-3 pb-2 text-[#FFD700] text-sm font-bold border-b border-[rgba(255,215,0,0.3)] mb-2"> DEV NAV </div>

          <Link to="/snaptask" className="no-underline">
            <MenuItem image={brilho} text="SnapTask"/>
          </Link>

          <Link to="/editordoc" className="no-underline">
            <MenuItem image={editorDoc} text="Editor Doc"/>
          </Link>

          <Link to="/leitordecod" className="no-underline">
            <MenuItem image={scaner} text="Leitor Códigos"/>
          </Link>

          <Link to="/qr" className="no-underline">
            <MenuItem image={qrCode} text="QR Share"/>
          </Link>

          <Link to="/galeria" className="no-underline">
            <MenuItem image={galeria} text="Galeria"/>
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

          <h1 className=" text-[32px] font-bold bg-linear-to-br from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
            JOVI Camera
          </h1>

          <p className="text-[#7e7e8a] mt-1 text-sm">
            Experiência de câmera intuitiva + SnapTask para processamento inteligente
          </p>

        </div>

        <div className=" w-97.5 h-211 bg-black rounded-[40px] border-2 border-[#2a2a35] overflow-hidden relative p-5 max-[768px]:w-screen max-[768px]:h-screen max-[768px]:rounded-none">

          <div className="w-full h-full flex flex-col">

            <div className="flex items-center justify-between mt-6.25 mb-5">

              <Link
                to="/snaptask" className="bg-transparent border-0">
                <img src={retorno} alt="Voltar" className="w-5.5 h-5.5 brightness-0 invert" />
              </Link>

              <div className="text-center max-w-55">

                <h2 className="text-[#FFD700] text-xl font-bold">
                  Flashcards IA
                </h2>

                <span className="text-[#8a8a95] text-[11px]">
                  3 cartões gerados a partir da foto capturada
                </span>

              </div>

              <button
                className="bg-transparent border-0 cursor-pointer" >
                <img src={compartilhar} alt="Compartilhar" className="w-5 h-5 brightness-0 invert opacity-80"/>
              </button>

            </div>

            <div className="text-[10px] tracking-[2px] text-[#777d8f] mb-3 font-bold">
              PERGUNTA
            </div>

            <div className="flex-1 flex items-center justify-center">

              <div onClick={toggleCard} className=" w-full max-w-[320px] h-105 bg-[rgba(20,20,30,0.95)] border border-[#232632] rounded-[28px] p-7.5 relative flex items-center justify-center text-center cursor-pointer transition-all duration-300 overflow-hidden hover:-translate-y-0.75" >

                <div className={` absolute inset-0 p-7.5 flex flex-col items-center justify-center transition-opacity duration-300 ${flipped ? "opacity-0" : "opacity-100"}`} >

                  <p className="text-white text-2xl leading-normal font-bold">
                    {card.q}
                  </p>

                </div>

                <div className={`absolute inset-0 p-7.5 flex flex-col items-center justify-center transition-opacity duration-300 ${flipped ? "opacity-100" : "opacity-0"}`}>

                  <span className="text-[#FFD700] text-[10px] tracking-[2px] mb-4 font-bold">
                    RESPOSTA
                  </span>

                  <p className="text-[#d7d7df] text-[15px] leading-[1.8]">
                    {card.a}
                  </p>

                </div>

                <span className="absolute bottom-4.5 text-[#737889] text-[11px]">
                  {flipped ? "Toque para ver pergunta" : "Toque para ver resposta"}
                </span>

              </div>

            </div>

            <div className="flex items-center justify-center gap-5 mt-5 mb-5">

              <button onClick={previousCard} disabled={current === 0} className="w-12 h-12 rounded-full border border-[#232632] bg-[#10131c] text-white text-[28px] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ">
                ‹
              </button>

              <span className="text-[#8b91a1] text-sm font-semibold">
                {current + 1} / {cards.length}
              </span>

              <button onClick={nextCard} disabled={current === cards.length - 1} className=" w-12 h-12 rounded-full border border-[#232632] bg-[#10131c] text-white text-[28px] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed "> › </button>

            </div>

            <button className=" w-full border-0 rounded-2xl p-4 bg-linear-to-br from-[#FFD700] to-[#FFB300] text-black text-sm font-bold cursor-pointer " >
              Exportar para Anki / Quizlet
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

function MenuItem({ image, text }) {
  return (
    <div className=" px-4 py-2.5 text-[#f0f0f0] text-sm cursor-pointer flex items-center gap-3 transition-all duration-200 hover:bg-[rgba(255,215,0,0.2)]hover:text-[#FFD700] " >
      <img src={image} alt="" className="w-5 h-5 brightness-0 invert"/>

      <span>
        {text}
      </span>
    </div>
  );
}

export default Flashcards;