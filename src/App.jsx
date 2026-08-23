import { BrowserRouter, Routes, Route } from "react-router-dom";

import Camera from "./pages/Camera";
import SnapTask from "./pages/SnapTask";
import QR from "./pages/QR";
import QRcode from "./pages/QRcode";
import Libras from "./pages/Libras";
import LeitorCodigos from "./pages/LeitorCodigos";
import Galeria from "./pages/Galeria";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Camera />} />
        <Route path="/snaptask" element={<SnapTask />} />
        <Route path="/qr" element={<QR />} />
        <Route path="/qr-code" element={<QRcode />} />
        <Route path="/libras" element={<Libras />} />
        <Route path="/leitor-codigos" element={<LeitorCodigos />} />
        <Route path="/galeria" element={<Galeria />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;