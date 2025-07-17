'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext'; // ✅ Make sure this works
import { supabase } from '@/supabaseClient';
import ViewDetailsButton from './ViewDetailsButton';

export default function MovieCard({ movie }) {
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const { user } = useAuth(); // ✅ must be logged in

  const handleStatusSelect = async (status) => {
    if (!user) {
      alert("Please log in to add to your list.");
      return;
    }

    try {
      const { data, error } = await supabase.from('user_movie_list').insert([
        {
          user_id: user.id,
          movie_id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path || movie.image, // fallback if image prop
          status,
        },
      ]);

      if (error) throw error;

      alert(`Added "${movie.title}" as "${status}"`);
    } catch (err) {
      console.error("Failed to add movie:", err.message);
      alert("Error adding movie. Please try again.");
    } finally {
      setShowStatusMenu(false);
    }
  };

  return (
    <div
      className="relative group min-w-[180px] sm:min-w-[200px] md:min-w-[220px] lg:min-w-[240px] h-80 rounded-lg overflow-hidden bg-gray-900 bg-cover bg-center transition-all duration-300 mr-4"
      style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path || movie.image})` }}
    >
      <div className="absolute inset-0 flex items-end justify-start p-4 group-hover:opacity-0 transition-opacity duration-300">
        <h3 className="text-white font-bold text-lg">{movie.title}</h3>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="mb-2">
          <h3 className="text-white font-bold text-lg">{movie.title}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span className="text-pink-400">{movie.rating || `⭐ ${movie.vote_average?.toFixed(1)}`}</span>
            <span>{movie.year || movie.release_date?.split('-')[0]}</span>
            <span>•</span>
            <span className="text-pink-400">{movie.genre || 'Popular'}</span>
          </div>
        </div>
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{movie.description || movie.overview}</p>
        <div className="flex gap-2 relative">
          <ViewDetailsButton movie={movie} />
          <div className="relative">
            <button
              onClick={() => setShowStatusMenu(!showStatusMenu)}
              className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-md transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </button>

            {showStatusMenu && (
              <div className="absolute bottom-12 right-0 w-44 bg-white shadow-xl rounded-md z-50 overflow-hidden border border-gray-200">
                {['Completed', 'Watching', 'Plan to watch', 'Dropped'].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusSelect(status)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-pink-100 hover:text-pink-600 transition-colors"
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
