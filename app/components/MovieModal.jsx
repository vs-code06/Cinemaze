'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WatchNowButton from './WatchNowButton';
import { supabase } from '@/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';

export default function MovieModal({ movie, isOpen, onClose }) {
  const { user } = useAuth();
  const [userRating, setUserRating] = useState(0);
  const [isLoadingRating, setIsLoadingRating] = useState(true);
  const [cast, setCast] = useState([]);
  const [isLoadingCast, setIsLoadingCast] = useState(true); 

  // console.log(movie)

  useEffect(() => {
    async function fetchCast() {
      if (!movie || !isOpen) return;
      setIsLoadingCast(true);
      const type = movie.genre?.toLowerCase().includes('tv') ? 'tv' : 'movie';
  
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${type}/${movie.id}/credits?api_key=77a156d00aef40cfc947354bf3acd1f0`
        );
        const data = await res.json();
        setCast(Array.isArray(data.cast) ? data.cast : []);
      } catch (err) {
        console.error('Error fetching cast:', err);
        setCast([]);
      } finally {
        setIsLoadingCast(false);
      }
    }
    fetchCast();
  }, [movie, isOpen]);
   

  // ✅ Fetch user's existing rating
  useEffect(() => {
    async function fetchRating() {
      if (user && movie && isOpen) {
        setIsLoadingRating(true);
        const { data, error } = await supabase
          .from('movie_ratings')
          .select('rating')
          .eq('user_id', user.id)
          .eq('movie_id', movie.id.toString())
          .single();

        if (data) {
          setUserRating(data.rating);
        } else {
          setUserRating(0); // no rating yet
        }

        setIsLoadingRating(false);
      }
    }

    fetchRating();
  }, [user, movie, isOpen]);

  // ✅ Submit new rating
  async function handleSubmitRating() {
    if (!user) return alert('Please login to rate');

    const { error } = await supabase.from('movie_ratings').upsert(
      {
        user_id: user.id,
        movie_id: movie.id.toString(),
        rating: userRating,
      },
      { onConflict: ['user_id', 'movie_id'] } // so it updates instead of inserting duplicate
    );

    if (error) {
      console.error(error);
      alert('Error saving rating');
    } else {
      alert('Thanks for your rating!');
    }
  }

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
          <motion.div
            className="bg-black text-white max-w-4xl w-full rounded-lg overflow-hidden shadow-lg relative"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <img
              src={movie.image || `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-64 object-cover"
            />

            <div className="p-6 space-y-4">
              <h2 className="text-3xl font-bold">{movie.title}</h2>
              <div className="text-sm text-gray-400 flex gap-4">
                <span className="text-pink-400">{movie.rating || `⭐ ${movie.vote_average?.toFixed(1)}`}</span>
                <span>{movie.year || movie.release_date?.split('-')[0]}</span>
                <span>•</span>
                <span>{movie.genre || 'Drama'}</span>
              </div>
              <p className="text-gray-300 text-sm">{movie.description || movie.overview}</p>

              {Array.isArray(cast) && cast.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Cast</h3>
                  <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-thin scrollbar-thumb-gray-600">
                    {cast.map((actor) => (
                      <div key={actor.cast_id || actor.id} className="w-24 flex-shrink-0 text-center">
                        <img
                          src={
                            actor.profile_path
                              ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                              : '/default-avatar.png'
                          }
                          alt={actor.name}
                          className="w-24 h-28 object-cover rounded"
                        />
                        <p className="text-xs mt-1 text-gray-300 truncate">{actor.name}</p>
                        <p className="text-[10px] text-gray-500 italic truncate">{actor.character}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}


              {/* Rating UI */}
              <div className="flex items-center gap-1 mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setUserRating(star)}
                    className={star <= userRating ? 'text-yellow-400' : 'text-gray-500'}
                    disabled={isLoadingRating}
                  >
                    ★
                  </button>
                ))}
                {userRating > 0 && (
                  <button
                    onClick={handleSubmitRating}
                    className="ml-4 text-sm text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-500"
                    disabled={isLoadingRating}
                  >
                    Submit
                  </button>
                )}
              </div>

              <div className="flex gap-4 mt-6">
                <WatchNowButton movie={movie} />
              </div>
            </div>

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
