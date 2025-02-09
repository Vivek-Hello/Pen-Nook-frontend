import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="sticky top-0 z-10">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4">
        <Outlet />
      </main>

      {/* Footer (Optional) */}
      <footer className="text-center p-4 bg-gray-200">
        <p className="text-sm text-gray-600">© 2025 PenNook. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
