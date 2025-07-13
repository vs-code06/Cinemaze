'use client';
import React, { useEffect, useState } from 'react';

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=77a156d00aef40cfc947354bf3acd1f0`
        );
        const data = await res.json();
        const movies = data.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          rating: `${movie.vote_average.toFixed(1)}/10`,
          year: movie.release_date?.split('-')[0],
          genre: 'N/A',
          description: movie.overview,
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }));
        setTrendingMovies(movies);
      } catch (err) {
        console.error('Error fetching trending movies:', err);
      }
    };

    const fetchPopular = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=77a156d00aef40cfc947354bf3acd1f0`
        );
        const data = await res.json();
        const movies = data.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          rating: `${movie.vote_average.toFixed(1)}/10`,
          year: movie.release_date?.split('-')[0],
          genre: 'N/A',
          description: movie.overview,
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }));
        setPopularMovies(movies);
      } catch (err) {
        console.error('Error fetching popular movies:', err);
      }
    };

    fetchTrending();
    fetchPopular();
  }, []);

  const MovieCard = ({ movie }) => (
    <div
      key={movie.id}
      className="relative group min-w-[180px] sm:min-w-[200px] md:min-w-[220px] lg:min-w-[240px] h-80 rounded-lg overflow-hidden bg-gray-900 bg-cover bg-center transition-all duration-300 mr-4"
      style={{ backgroundImage: `url(${movie.image})` }}
    >
      {/* Title - default state */}
      <div className="absolute inset-0  flex items-end justify-start p-4 group-hover:opacity-0 transition-opacity duration-300">
        <h3 className="text-white font-bold text-lg">{movie.title}</h3>
      </div>

      {/* Hover state */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="mb-2">
          <h3 className="text-white font-bold text-lg">{movie.title}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span className="text-pink-400">{movie.rating}</span>
            <span>{movie.year}</span>
            <span>•</span>
            <span className="text-pink-400">{movie.genre}</span>
          </div>
        </div>
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{movie.description}</p>
        <div className="flex gap-2">
          <button className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-md flex-1 transition-colors">
            Watch
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-md transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Trending Now */}
      <h2 className="text-2xl font-bold text-cyan-300 mb-4">Trending Now</h2>
      <div className="overflow-x-auto pb-4">
        <div className="flex w-max">
          {trendingMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>

      {/* Popular Picks */}
      <h2 className="text-2xl font-bold text-purple-500 mt-10 mb-4">Popular Picks</h2>
      <div className="overflow-x-auto pb-4">
        <div className="flex w-max">
          {popularMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
