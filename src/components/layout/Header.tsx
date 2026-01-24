import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "@/stores/authStore";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // 또는 "/" 홈 페이지로 리디렉션
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <nav className="max-w-[1440px] mx-auto px-6 h-16 flex justify-between items-center">
        <Link
          to="/"
          className="text-[20px] font-black text-black tracking-tighter uppercase"
        >
          FastPick
        </Link>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/mypage"
                className="text-[12px] font-bold text-black border-b border-black pb-0.5 tracking-widest uppercase"
              >
                My Page
              </Link>
              <button
                onClick={handleLogout}
                className="text-[12px] font-bold bg-black text-white tracking-widest uppercase px-5 py-2 rounded-sm hover:bg-gray-800 transition-all duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-[12px] font-bold text-black border-b border-black pb-0.5 tracking-widest uppercase"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-[12px] font-bold bg-black text-white tracking-widest uppercase px-5 py-2 rounded-sm hover:bg-gray-800 transition-all duration-300"
              >
                Join
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
