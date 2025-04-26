'use client';
import { useState } from 'react';
import { FaUserCircle, FaSearch, FaSignInAlt, FaSignOutAlt, FaFilm, FaBars } from 'react-icons/fa';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = ['Home', 'Movies', 'Series', 'My List', 'History'];

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-black text-white shadow-md border-b border-gray-800 relative">
      
      <div className="flex items-center space-x-2">
        <FaFilm className="text-pink-500 text-2xl" />
        <span className="text-xl font-bold bg-gradient-to-r from-pink-500 via-purple-400 to-purple-500 bg-clip-text text-transparent">Cinemaze</span>
      </div>

      <ul className="hidden md:flex space-x-6">
        {navLinks.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-gray-300 hover:text-cyan-400 transition duration-200"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>

      {/* Search + User */}
      <div className="hidden md:flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-800 text-white rounded-full pl-10 pr-4 py-1 outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <FaSearch className="absolute left-3 top-2 text-gray-400" />
        </div>

        {isLoggedIn ? (
          <>
            <div className="flex items-center space-x-2">
              <FaUserCircle className="text-purple-500 text-2xl" />
              <span className="text-white">John Doe</span>
            </div>
            <button className="hover:bg-cyan-400 transition text-white font-semibold px-4 py-1 rounded-lg flex items-center space-x-2 cursor-pointer">
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <button className="border border-pink-500 hover:bg-pink-500 transition text-pink-500 hover:text-white font-semibold px-4 py-1 rounded-lg flex items-center space-x-2">
            <FaSignInAlt />
            <span>Login</span>
          </button>
        )}
      </div>

      <button
        className="md:hidden text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <FaBars />
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-black flex flex-col items-center space-y-4 py-4 md:hidden z-50 border-t border-gray-700">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-gray-300 hover:text-cyan-400 transition"
            >
              {link}
            </a>
          ))}
          <div className="w-11/12">
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-gray-800 text-white rounded-full pl-10 pr-4 py-1 outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <FaSearch className="absolute left-3 top-2 text-gray-400" />
            </div>
            {isLoggedIn ? (
              <>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <FaUserCircle className="text-purple-500 text-2xl" />
                  <span className="text-white">John Doe</span>
                </div>
                <button className="w-full hover:bg-cyan-400 transition text-white font-semibold px-4 py-2 rounded-lg flex items-center justify-center space-x-2 cursor-pointer">
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button className="w-full border border-pink-500 hover:bg-pink-500 transition text-pink-500 hover:text-white font-semibold px-4 py-2 rounded-lg flex items-center justify-center space-x-2">
                <FaSignInAlt />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
