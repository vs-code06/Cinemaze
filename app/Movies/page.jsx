'use client';
import React, { useEffect, useState } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TMDB_API_KEY = '77a156d00aef40cfc947354bf3acd1f0'; // Replace this with your TMDb API key
const TMDB_API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`;

export default function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(TMDB_API_URL);
        const data = await response.json();
        setMovies(data.results); // results is the array of movies
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="container mx-auto px-4 py-20 pt-24">
        <h1 className="text-3xl font-bold mb-10 text-center">Movies</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative group rounded-lg overflow-hidden h-[22rem] shadow-lg"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-80 object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                <div className="mb-2">
                  <h3 className="text-white font-bold text-lg">{movie.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-pink-400">⭐ {movie.vote_average.toFixed(1)}</span>
                    <span>{movie.release_date?.split("-")[0]}</span>
                    <span>•</span>
                    <span className="text-pink-400">Popular</span>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {movie.overview}
                </p>

                <button className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-md w-full transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
