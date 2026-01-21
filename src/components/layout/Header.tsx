import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isLoggedIn] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <nav className="max-w-[1440px] mx-auto px-6 h-16 flex justify-between items-center">
        <Link
          to="/"
          className="text-[20px] font-black text-black tracking-tighter uppercase"
        >
          FastPick
        </Link>

        <div>
          {isLoggedIn ? (
            <Link
              to="/mypage"
              className="text-[12px] font-bold text-black border-b border-black pb-0.5 tracking-widest uppercase"
            >
              My Page
            </Link>
          ) : (
            <button className="text-[12px] font-bold text-black tracking-widest uppercase border border-black px-5 py-2 hover:bg-black hover:text-white transition-all duration-300">
              Login
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
