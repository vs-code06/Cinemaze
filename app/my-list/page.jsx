'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyListPage() {
  const [myList, setMyList] = useState([]);
  const [filter, setFilter] = useState('All');
  const { user } = useAuth();

  const statuses = ['All', 'Completed', 'Watching', 'Plan to watch', 'Dropped'];

  useEffect(() => {
    const fetchUserList = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('user_movie_list')
        .select('*')
        .eq('user_id', user.id)
        .order('added_at', { ascending: false });

      if (error) {
        console.error('Failed to fetch movie list:', error.message);
        return;
      }

      setMyList(data);
    };

    fetchUserList();
  }, [user]);

  const filteredMovies =
    filter === 'All' ? myList : myList.filter((movie) => movie.status === filter);

  const removeFromList = async (id) => {
    const { error } = await supabase.from('user_movie_list').delete().eq('id', id);
    if (!error) {
      setMyList(myList.filter((movie) => movie.id !== id));
    } else {
      console.error('Error deleting movie:', error);
    }
  };
    

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-20 pt-24">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <h1 className="text-3xl font-bold mb-4 md:mb-0 text-left">My List</h1>
          <div className="flex flex-wrap gap-3">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-full text-sm border transition-all duration-200 ${
                  filter === status
                    ? 'bg-pink-600 border-pink-600 text-white'
                    : 'border-gray-600 text-gray-300 hover:border-pink-400 hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="relative group rounded-lg overflow-hidden h-[20rem] shadow-lg bg-gray-800"
            >
              {/* Poster */}
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            
              {/* Gradient Hover Content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                <h3 className="text-white font-bold text-lg mb-2">{movie.title}</h3>
            
                {/* Flex Row: Status + Remove */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">{movie.status}</span>
                  <button
                    onClick={() => removeFromList(movie.id)}
                    className="bg-gray-700 hover:bg-gray-600 text-white text-sm px-4 py-1 rounded-md opacity-100 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
            ))}
          </div>

        {filteredMovies.length === 0 && (
          <p className="text-center text-gray-400 mt-10">
            No movies found for "{filter}"
          </p>
        )}
      </main>

      <Footer />
    </div>
  );
}

