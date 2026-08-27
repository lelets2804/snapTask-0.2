import { useEffect, useState } from "react";
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

function Galeria() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("gallery");
  const [roomActive, setRoomActive] = useState(false);
  const [sharedCode, setSharedCode] = useState("SNAP-000000");
  const [joinCode, setJoinCode] = useState("");
  const [createdRooms, setCreatedRooms] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("snapTask.createdRooms") || "[]");
    } catch {
      return [];
    }
  });
  useEffect(() => {
    const usuarioLogado = localStorage.getItem("usuarioLogado");
    if (!usuarioLogado) {
      const nome = prompt("Digite seu nome para acessar a galeria:");
      if (nome && nome.trim() !== "") {
        localStorage.setItem("usuarioLogado", nome);
        alert(`Bem-vindo(a), ${nome}!`);
      } else {
        alert("Você precisa fazer login.");
        window.location.href = "/";
      }
    }
  }, []);
  const createRoom = () => {
    const code = "SNAP-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    const newRoom = {
      id: Date.now(),
      code,
      date: new Date().toLocaleString("pt-BR"),
    };
    const updatedRooms = [newRoom, ...createdRooms];
    setCreatedRooms(updatedRooms);
    localStorage.setItem("snapTask.createdRooms", JSON.stringify(updatedRooms));
    setSharedCode(code);
    setRoomActive(true);
    alert("Sala criada com sucesso!");
  };
  const connectRoom = () => {
    const codigo = joinCode.trim().toUpperCase();
    if (codigo === "") {
      alert("Digite um código.");
      return;
    }
    if (!codigo.startsWith("SNAP-")) {
      alert("Código inválido.");
      return;
    }
    if (codigo.length < 10) {
      alert("Código incompleto.");
      return;
    }
    setSharedCode(codigo);
    setRoomActive(true);
    alert("Conectado à sala!");
  };
  const enterCreatedRoom = (room) => {
    setSharedCode(room.code);
    setRoomActive(true);
    alert(`Entrando na sala ${room.code}!`);
  };
  const deleteRoom = (roomId) => {
    const updatedRooms = createdRooms.filter((room) => room.id !== roomId);
    setCreatedRooms(updatedRooms);
    localStorage.setItem("snapTask.createdRooms", JSON.stringify(updatedRooms));
  };
  const endRoom = () => {
    const sair = confirm("Deseja encerrar a sala?");
    if (sair) {
      setRoomActive(false);
      setJoinCode("");
      alert("Sala encerrada.");
    }
  };
  const handlePhotoClick = () => {
    alert("Visualizando foto da galeria.");
  };
  const photos = ["photo1", "photo2", "photo3", "photo4", "photo5", "photo6", "photo7", "photo8", "photo9"];
  return (
    <>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:system-ui,-apple-system,sans-serif;background:#0a0a0f;min-height:100vh;display:flex;align-items:center;justify-content:center;color:white}
        a{text-decoration:none}
        .app-container{display:flex;flex-direction:column;align-items:center;padding:20px}
        .header{text-align:center;margin-bottom:20px}
        .app-title{font-size:32px;font-weight:bold;background:linear-gradient(135deg,#FFD700,#FFA500);-webkit-background-clip:text;background-clip:text;color:transparent}
        .app-subtitle{color:#8e8e9e;font-size:14px;margin-top:5px}
        .back-button-fixed{position:fixed;top:50%;right:20px;transform:translateY(-50%);width:56px;height:56px;background:#FFD700;border:none;border-left:4px solid #000;border-top-left-radius:12px;border-bottom-left-radius:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:1000}
        .back-arrow{font-size:32px;color:#000;font-weight:bold}
        .side-menu{position:fixed;top:50%;right:-220px;transform:translateY(-50%);width:220px;background:rgba(30,30,40,.96);backdrop-filter:blur(20px);transition:right .3s ease;z-index:999;border-left:2px solid #FFD700;border-radius:12px 0 0 12px;padding:8px 0}
        .side-menu.open{right:60px}
        .side-menu-content{display:flex;flex-direction:column;gap:4px}
        .side-menu-title{padding:12px 16px 8px;color:#FFD700;font-size:14px;font-weight:bold;border-bottom:1px solid rgba(255,215,0,.3);margin-bottom:8px}
        .side-menu-item{padding:10px 16px;color:#f0f0f0;font-size:14px;cursor:pointer;display:flex;align-items:center;gap:12px;transition:.2s}
        .side-menu-item:hover{background:rgba(255,215,0,.2)}
        .menu-icon{width:20px;height:20px;filter:brightness(0) invert(1)}
        .phone-mockup{width:390px;height:844px;background:#000;border-radius:40px;border:2px solid #2a2a35;overflow:hidden;padding:20px}
        .gallery-page{width:100%;height:100%;display:flex;flex-direction:column}
        .page-header{display:flex;align-items:center;gap:14px;margin-top:20px;margin-bottom:20px}
        .back-btn{background:none;border:none;display:flex;align-items:center;justify-content:center}
        .header-icon{width:28px;height:28px}
        .page-header h2{font-size:22px;color:white}
        .tabs{display:flex;gap:8px;background:#10131c;padding:6px;border-radius:16px;margin-bottom:20px}
        .tab-btn{flex:1;border:none;background:none;color:#8a8a95;padding:12px;border-radius:12px;cursor:pointer;font-size:12px;font-weight:600;transition:.2s}
        .tab-btn.active{background:#FFD700;color:black}
        .content-area{flex:1;overflow-y:auto;padding-right:3px}
        .photo-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
        .photo{aspect-ratio:1;border-radius:14px;position:relative;animation:fade .4s ease;cursor:pointer}
        @keyframes fade{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}
        .photo1{background:linear-gradient(135deg,#2ecc71,#3498db)}
        .photo2{background:linear-gradient(135deg,#9b59b6,#6c5ce7)}
        .photo3{background:linear-gradient(135deg,#ff9f43,#ff4757)}
        .photo4{background:linear-gradient(135deg,#f1c40f,#2ecc71)}
        .photo5{background:linear-gradient(135deg,#3498db,#9b59b6)}
        .photo6{background:linear-gradient(135deg,#ff4757,#ff9f43)}
        .photo7{background:linear-gradient(135deg,#2ecc71,#f1c40f)}
        .photo8{background:linear-gradient(135deg,#9b59b6,#3498db)}
        .photo9{background:linear-gradient(135deg,#f1c40f,#ff9f43)}
        .card{background:#10131c;border:1px solid #232632;border-radius:18px;padding:18px;margin-bottom:16px}
        .card-title{font-size:16px;font-weight:700;margin-bottom:12px}
        .card-text{color:#777d8f;font-size:11px;line-height:1.6;margin-bottom:14px}
        .primary-btn,.green-btn,.end-btn{width:100%;border:none;border-radius:14px;padding:14px;font-size:13px;font-weight:700;cursor:pointer}
        .primary-btn{background:#FFD700;color:black}
        .green-btn{background:#2ecc71;color:black}
        .end-btn{margin-top:20px;background:rgba(255,71,87,.15);color:#ff4757}
        .join-input{width:100%;background:#0b0d12;border:1px solid #232632;border-radius:14px;padding:14px;color:white;margin-bottom:14px;outline:none}
        .created-room{background:#10131c;border:1px solid #232632;border-radius:18px;padding:16px;margin-bottom:12px;display:flex;align-items:center;gap:12px}
        .room-icon{width:42px;height:42px;border-radius:12px;background:#FFD70020;display:flex;align-items:center;justify-content:center;color:#FFD700;font-size:20px;flex-shrink:0}
        .room-info{flex:1;min-width:0}
        .room-title{font-size:13px;font-weight:700;color:white;margin-bottom:4px}
        .room-code{font-size:14px;font-weight:800;color:#FFD700;letter-spacing:1px}
        .room-date{font-size:9px;color:#777d8f;margin-top:4px}
        .room-enter{background:#2ecc71;border:none;color:#000;border-radius:10px;padding:9px 11px;font-size:10px;font-weight:700;cursor:pointer}
        .room-delete{background:rgba(255,71,87,.12);border:1px solid rgba(255,71,87,.25);color:#ff4757;border-radius:10px;padding:8px 10px;font-size:10px;cursor:pointer;margin-top:6px}
        .rooms-title{font-size:10px;letter-spacing:2px;color:#777d8f;font-weight:700;margin:20px 0 10px}
        .empty-rooms{background:#10131c;border:1px dashed #232632;border-radius:18px;padding:18px;text-align:center;color:#777d8f;font-size:11px;margin-bottom:16px}
        .active-card{background:#10131c;border:1px solid #232632;border-radius:18px;padding:24px;text-align:center}
        .sync-icon{width:50px;height:50px;border-radius:50%;background:rgba(46,204,113,.15);margin:auto;margin-bottom:12px;position:relative}
        .sync-icon::before{content:"↻";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#2ecc71;font-size:22px;animation:spin 3s linear infinite}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        .active-title{font-size:18px;font-weight:700;margin-bottom:10px}
        .shared-code{font-size:24px;font-weight:bold;color:#FFD700;letter-spacing:2px;margin-bottom:10px}
        .active-sub{color:#777d8f;font-size:11px}
        .synced-top{display:flex;justify-content:space-between;margin-top:22px;margin-bottom:12px;font-size:11px;color:#8a8a95}
        .devices{color:#2ecc71}
        .online::after{content:"+";position:absolute;top:6px;right:6px;width:18px;height:18px;border-radius:50%;background:#2ecc71;color:black;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:12px}
        @media(max-width:768px){.phone-mockup{width:100vw;height:100vh;border-radius:0}}
      `}</style>
      <button className="back-button-fixed" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="back-arrow">&lt;</span>
      </button>
      <div className={`side-menu ${menuOpen ? "open" : ""}`}>
        <div className="side-menu-content">
          <div className="side-menu-title">DEV NAV</div>
          <Link to="/">
            <div className="side-menu-item"><img src={camera} className="menu-icon" /><span>Câmera</span></div>
          </Link>
          <Link to="/snaptask">
            <div className="side-menu-item"><img src={brilho} className="menu-icon" /><span>SnapTask</span></div>
          </Link>
          <Link to="/editor-doc">
            <div className="side-menu-item"><img src={editorDoc} className="menu-icon" /><span>Editor Doc</span></div>
          </Link>
          <Link to="/leitor-codigos">
            <div className="side-menu-item"><img src={scaner} className="menu-icon" /><span>Leitor Códigos</span></div>
          </Link>
          <Link to="/qr">
            <div className="side-menu-item"><img src={qrCode} className="menu-icon" /><span>QR Share</span></div>
          </Link>
          <Link to="/galeria">
            <div className="side-menu-item"><img src={galeria} className="menu-icon" /><span>Galeria</span></div>
          </Link>
          <Link to="/flashcards">
            <div className="side-menu-item"><img src={brain} className="menu-icon" /><span>Flashcards</span></div>
          </Link>
          <Link to="/libras">
            <div className="side-menu-item"><img src={mao} className="menu-icon" /><span>Libras</span></div>
          </Link>
        </div>
      </div>
      <div className="app-container">
        <div className="header">
          <h1 className="app-title">JOVI Camera</h1>
          <p className="app-subtitle">Experiência de câmera intuitiva + SnapTask para processamento inteligente</p>
        </div>
        <div className="phone-mockup">
          <div className="gallery-page">
            <div className="page-header">
              <Link to="/" className="back-btn">
                <img src={retorno} className="header-icon" />
              </Link>
              <h2>Galeria</h2>
            </div>
            <div className="tabs">
              <button className={`tab-btn ${activeTab === "gallery" ? "active" : ""}`} onClick={() => setActiveTab("gallery")}>Fotos</button>
              <button className={`tab-btn ${activeTab === "shared" ? "active" : ""}`} onClick={() => setActiveTab("shared")}>Galeria Compartilhada</button>
            </div>
            {activeTab === "gallery" && (
              <div className="content-area">
                <div className="photo-grid">
                  {photos.map((photo, index) => (
                    <div key={index} className={`photo ${photo}`} onClick={handlePhotoClick}></div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "shared" && (
              <div className="content-area">
                {!roomActive ? (
                  <div id="shareSetup">
                    <div className="card">
                      <div className="card-title">Criar Sala</div>
                      <p className="card-text">Gere um código e compartilhe com outro dispositivo para sincronizar fotos em tempo real.</p>
                      <button className="primary-btn" onClick={createRoom}>Gerar Código</button>
                    </div>
                    <div className="card">
                      <div className="card-title">Entrar em Sala</div>
                      <input type="text" className="join-input" value={joinCode} onChange={(e) => setJoinCode(e.target.value)} placeholder="Insira o código..." />
                      <button className="green-btn" onClick={connectRoom}>Conectar</button>
                    </div>
                    <div className="rooms-title">SALAS CRIADAS</div>
                    {createdRooms.length === 0 ? (
                      <div className="empty-rooms">Nenhuma sala criada ainda.</div>
                    ) : (
                      createdRooms.map((room) => (
                        <div key={room.id} className="created-room">
                          <div className="room-icon">↻</div>
                          <div className="room-info">
                            <div className="room-title">Sala compartilhada</div>
                            <div className="room-code">{room.code}</div>
                            <div className="room-date">Criada em {room.date}</div>
                          </div>
                          <div>
                            <button className="room-enter" onClick={() => enterCreatedRoom(room)}>Entrar</button>
                            <button className="room-delete" onClick={() => deleteRoom(room.id)}>Excluir</button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  <div id="activeRoom">
                    <div className="active-card">
                      <div className="sync-icon"></div>
                      <p className="active-title">Sala Ativa</p>
                      <p className="shared-code">{sharedCode}</p>
                      <p className="active-sub">Compartilhe este código com o outro dispositivo</p>
                    </div>
                    <div className="synced-top">
                      <span>Fotos sincronizadas</span>
                      <span className="devices">2 dispositivos</span>
                    </div>
                    <div className="photo-grid synced-grid">
                      <div className="photo photo1 online" onClick={handlePhotoClick}></div>
                      <div className="photo photo2 online" onClick={handlePhotoClick}></div>
                      <div className="photo photo3" onClick={handlePhotoClick}></div>
                      <div className="photo photo4" onClick={handlePhotoClick}></div>
                      <div className="photo photo5" onClick={handlePhotoClick}></div>
                      <div className="photo photo6" onClick={handlePhotoClick}></div>
                    </div>
                    <button className="end-btn" onClick={endRoom}>Encerrar Sala</button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Galeria;