'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/supabaseClient';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function History() {
  const { user } = useAuth();
  const [historyItems, setHistoryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;
      setLoading(true);

      const { data, error } = await supabase
        .from('history')
        .select('*')
        .eq('user_id', user.id)
        .order('watched_at', { ascending: false });

      if (error) {
        console.error('Error fetching history:', error);
      } else {
        setHistoryItems(data);
      }

      setLoading(false);
    };

    fetchHistory();
  }, [user]);

  const removeItem = async (id) => {
    const { error } = await supabase.from('history').delete().eq('id', id);
    if (!error) {
      setHistoryItems(historyItems.filter((item) => item.id !== id));
    }
  };

  const clearHistory = async () => {
    const { error } = await supabase.from('history').delete().eq('user_id', user.id);
    if (!error) {
      setHistoryItems([]);
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-20 pt-24 mb-20">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Watch History</h1>
          {historyItems.length > 0 && (
            <button
              onClick={clearHistory}
              className="border border-gray-500 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition"
            >
              Clear History
            </button>
          )}
        </div>

        {loading ? (
          <p className="text-gray-400 text-center">Loading your history...</p>
        ) : historyItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-xl">Your watch history is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {historyItems.map((movie) => (
              <div
                key={movie.id}
                className="relative group rounded-lg overflow-hidden h-80  bg-cover bg-center transition-all duration-300"
                style={{ backgroundImage: `url(${movie.poster_url})` }}
              >
                <div className="absolute inset-0  bg-opacity-40 flex items-end justify-start p-4 group-hover:opacity-0 transition-opacity duration-300">
                  <h3 className="text-white font-bold text-lg">{movie.title}</h3>
                </div>

                {/* Hover state - full details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="mb-2">
                    <h3 className="text-white font-bold text-lg">{movie.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="text-pink-400">{movie.rating}</span>
                      <span>{movie.release_year}</span>
                      <span>•</span>
                      <span className="text-pink-400">{movie.genre}</span>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{movie.description}</p>

                  <div className="flex gap-2">
                    <button className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-md flex-1 transition-colors">
                      Continue
                    </button>
                    <button
                      onClick={() => removeItem(movie.id)}
                      className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-md transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
