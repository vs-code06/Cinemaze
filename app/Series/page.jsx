'use client';
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TMDB_API_KEY = '77a156d00aef40cfc947354bf3acd1f0';

export default function Series() {
  const [series, setSeries] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchSeries = async () => {
      const TMDB_API_URL = `https://api.themoviedb.org/3/tv/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`;

      try {
        const response = await fetch(TMDB_API_URL);
        const data = await response.json();
        setSeries(prev => {
          const existingIds = new Set(prev.map(tv => tv.id));
          const newUnique = data.results.filter(tv => !existingIds.has(tv.id));
          return [...prev, ...newUnique];
        });
      } catch (error) {
        console.error("Error fetching series:", error);
      }
    };

    fetchSeries();
  }, [page]);

  const filteredSeries = series.filter(tv =>
    tv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="container mx-auto px-4 py-20 pt-24">
        {/* Title + Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <h1 className="text-3xl font-bold mb-4 md:mb-0 text-left">Series</h1>
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 text-white rounded-none pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400 text-sm" />
          </div>
        </div>

        {/* Series Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {filteredSeries.map((tv) => (
            <div
              key={tv.id}
              className="relative group rounded-lg overflow-hidden h-[22rem] shadow-lg"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                alt={tv.name}
                className="w-full h-80 object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                <div className="mb-2">
                  <h3 className="text-white font-bold text-lg">{tv.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-pink-400">⭐ {tv.vote_average.toFixed(1)}</span>
                    <span>{tv.first_air_date?.split("-")[0]}</span>
                    <span>•</span>
                    <span className="text-pink-400">TV Show</span>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {tv.overview}
                </p>

                <button className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-md w-full transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setPage(prev => prev + 1)}
          className="bg-gray-800 text-white px-4 py-2 mt-8 rounded-md"
        >
          Load More
        </button>
      </div>

      <Footer />
    </div>
  );
}
