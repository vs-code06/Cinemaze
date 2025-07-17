'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WatchNowButton from './WatchNowButton'; // ✅ Import it here

export default function MovieModal({ movie, isOpen, onClose }) {
  if (!movie) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Modal box */}
          <motion.div
            className="bg-black text-white max-w-4xl w-full rounded-lg overflow-hidden shadow-lg relative"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            {/* Banner image */}
            <img
              src={movie.image || `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-64 object-cover"
            />

            {/* Movie content */}
            <div className="p-6 space-y-4">
              <h2 className="text-3xl font-bold">{movie.title}</h2>
              <div className="text-sm text-gray-400 flex gap-4">
                <span className="text-pink-400">{movie.rating || `⭐ ${movie.vote_average?.toFixed(1)}`}</span>
                <span>{movie.year || movie.release_date?.split('-')[0]}</span>
                <span>•</span>
                <span>{movie.genre || 'Drama'}</span>
              </div>
              <p className="text-gray-300 text-sm">{movie.description || movie.overview}</p>

              <div className="flex gap-4 mt-6">
                <WatchNowButton movie={movie} />
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-white bg-gray-700 hover:bg-gray-600 rounded-full p-2"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
