// import React from "react";
// import Header from "../components/header/Header";
import AppHeader from "./AppHeader";
import Footer from "../components/footer/Footer";
import { Outlet } from "react-router-dom";

// TH: ฟังก์ชัน layout หลักของหน้าเว็บไซต์ โดยวาง Header, เนื้อหา และ Footer
// EN: Main public layout function that composes header, page content, and footer.
export default function AppLayout() {
  return (
    <>
      <AppHeader />
      <Outlet />
      <Footer />
    </>
  );
}
