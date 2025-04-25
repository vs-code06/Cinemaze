'use client';
import { useState } from 'react';
import { FaUserCircle, FaSearch, FaSignInAlt, FaSignOutAlt, FaFilm } from 'react-icons/fa';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Toggle this based on auth

  const navLinks = ['Home', 'Movies', 'Series', 'My List', 'History'];

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-black text-white shadow-md border-b border-gray-800">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <FaFilm className="text-pink-500 text-2xl" />
        <span className="text-pink-500 text-xl font-bold">Cinemaze</span>
      </div>

      {/* Nav Links */}
      <ul className="flex space-x-6">
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

      {/* Search + Profile/Login */}
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
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
            {/* Profile */}
            <div className="flex items-center space-x-2">
              <FaUserCircle className="text-purple-500 text-2xl" />
              <span className="text-white">John Doe</span>
            </div>
            {/* Logout Button */}
            <button className=" hover:bg-cyan-400 transition text-white font-semibold px-4 py-1 rounded-lg flex items-center space-x-2">
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
    </nav>
  );
}
