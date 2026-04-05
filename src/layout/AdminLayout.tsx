import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

import { Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

// TH: ฟังก์ชัน layout หลักของแอดมิน จัดการ header, sidebar และพื้นที่เนื้อหา
// EN: Main admin layout function that manages header, sidebar, and content area.
const AdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement | null>(null);

  // TH: สลับสถานะ sidebar ตามขนาดหน้าจอ (mobile drawer / desktop collapse)
  // EN: Toggles sidebar behavior by screen size (mobile drawer / desktop collapse).
  const handleToggleSidebar = () => {
    if (window.matchMedia("(max-width: 1023px)").matches) {
      setMobileSidebarOpen((prev) => !prev);
      return;
    }

    setSidebarCollapsed((prev) => !prev);
  };

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia("(min-width: 1024px)");

    // TH: ปิด drawer มือถืออัตโนมัติเมื่อกลับไปหน้าจอ desktop
    // EN: Automatically closes mobile drawer when switching to desktop size.
    const handleDesktopChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMobileSidebarOpen(false);
      }
    };

    desktopMediaQuery.addEventListener("change", handleDesktopChange);
    if (desktopMediaQuery.matches) {
      setMobileSidebarOpen(false);
    }

    return () => {
      desktopMediaQuery.removeEventListener("change", handleDesktopChange);
    };
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (mobileSidebarOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileSidebarOpen]);

  useEffect(() => {
    // TH: คำนวณความสูงของ header เพื่อวางตำแหน่ง mobile sidebar ให้ชิดด้านล่าง header
    // EN: Measures header height to place mobile sidebar directly below the header.
    const updateHeaderHeight = () => {
      setHeaderHeight(headerRef.current?.offsetHeight ?? 0);
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);

    const resizeObserver = new ResizeObserver(updateHeaderHeight);
    if (headerRef.current) {
      resizeObserver.observe(headerRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="hidden shrink-0 lg:block">
        <AdminSidebar collapsed={sidebarCollapsed} />
      </div>
      <div
        className={`fixed left-0 bottom-0 z-40 transition-transform duration-300 ease-in-out lg:hidden ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ top: headerHeight }}
      >
        <AdminSidebar onNavigate={() => setMobileSidebarOpen(false)} />
      </div>
      {mobileSidebarOpen ? (
        <button
          aria-label="Close Sidebar"
          className="fixed left-0 right-0 bottom-0 z-30 bg-black/40 lg:hidden"
          style={{ top: headerHeight }}
          onClick={() => setMobileSidebarOpen(false)}
        />
      ) : null}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col transition-all duration-300 ease-in-out">
        <div ref={headerRef}>
          <AdminHeader onToggleSidebar={handleToggleSidebar} />
        </div>
        <div className="flex-1 p-4 mx-auto w-full max-w-screen-2xl md:p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
