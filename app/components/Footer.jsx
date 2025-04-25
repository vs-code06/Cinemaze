'use client';

import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { MdOutlineOndemandVideo } from 'react-icons/md';

const links = [
  {
    heading: 'Explore',
    items: ['Movies', 'Series', 'Genres', 'New Releases'],
  },
  {
    heading: 'Account',
    items: ['My Account', 'My List', 'Watch History', 'Settings'],
  },
  {
    heading: 'Support',
    items: ['Help Center', 'Terms of Service', 'Privacy Policy', 'Contact Us'],
  },
];

const icons = [FaFacebookF, FaTwitter, FaInstagram, FaYoutube];

export default function Footer() {
  return (
    <footer className="bg-[#0e1626] text-gray-400 px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        
        <div className="max-w-sm">
          <div className="flex items-center gap-2 mb-4">
            <MdOutlineOndemandVideo className="text-pink-500 text-3xl" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-400 to-purple-500 bg-clip-text text-transparent">Cinemaze</h1>
          </div>
          <p className="mb-6 text-sm leading-relaxed">
            Your destination for discovering and enjoying the best movies and shows in a sleek, immersive experience.
          </p>
          <div className="flex gap-4 text-xl">
            {icons.map((Icon, i) => (
              <Icon key={i} className="hover:text-cyan-400 cursor-pointer" />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap md:flex-nowrap gap-12">
          {links.map((section, idx) => (
            <div key={idx}>
              <h2 className="text-white font-semibold mb-4 text-lg">{section.heading}</h2>
              <ul className="space-y-2 text-sm">
                {section.items.map((text, i) => (
                  <li key={i} className="hover:text-pink-500 cursor-pointer">{text}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-xs text-gray-500">
        © 2025 Cinemaze. All rights reserved.
      </div>
    </footer>
  );
}
