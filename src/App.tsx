import React from "react";
import AppLayout from "./layout/AppLayout";
import Login from "./components/login/Login";
import AdminLayout from "./layout/AdminLayout";
import { Routes, Route } from "react-router-dom"; // ต้องเป็น react-router-dom
import Home from "./pages/Dashboard/Home";
import AddminThaifood from "./pages/menu/AddminThaifood";
import Thaifood from "./pages/menu/ThaiFood";

// TH: ฟังก์ชันหลักของแอปสำหรับกำหนดเส้นทาง (Routing) ทั้งฝั่งหน้าเว็บและแอดมิน
// EN: Main app function that defines routing for both public and admin pages.
const App: React.FC = () => {
  return (
    <>
      <Routes>
        {/* layout landing page */}
        <Route element={<AppLayout />}>
          <Route index path="/" element={<Thaifood />} />
        </Route>
        <Route path="/Login" element={<Login />} />
        {/* layout ของ Dashboard */}
        <Route element={<AdminLayout />}>
          <Route index path="/dashboard" element={<Home />} />
          <Route path="/menu-thaifood" element={<AddminThaifood />} />
        </Route>
      </Routes >
    </>
  );
};

export default App;
