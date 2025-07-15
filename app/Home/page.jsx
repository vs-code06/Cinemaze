'use client';
import React, { useEffect, useState } from 'react';
import MovieCard from "../components/MovieCard";

const TMDB_API_KEY = '77a156d00aef40cfc947354bf3acd1f0';
const HERO_API_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=1`;

export default function Home() {
  const [heroMovies, setHeroMovies] = useState([]);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  

  // Fetch Hero Movies
  useEffect(() => {
    const fetchHero = async () => {
      const res = await fetch(HERO_API_URL);
      const data = await res.json();
      setHeroMovies(data.results.slice(0, 5)); // Only top 5 movies
    };
    fetchHero();
  }, []);

  // Auto-scroll Hero
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % 5);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch Trending & Popular (same as your existing code)
  useEffect(() => {
    const fetchTrending = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`);
      const data = await res.json();
      setTrendingMovies(data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        rating: `${movie.vote_average.toFixed(1)}/10`,
        year: movie.release_date?.split('-')[0],
        genre: 'Sci-Fi',
        description: movie.overview,
        image: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`,
      })));
    };

    const fetchPopular = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`);
      const data = await res.json();
      setPopularMovies(data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        rating: `${movie.vote_average.toFixed(1)}/10`,
        year: movie.release_date?.split('-')[0],
        genre: 'Drama',
        description: movie.overview,
        image: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`,
      })));
    };

    fetchTrending();
    fetchPopular();
  }, []);

  const currentHero = heroMovies[currentHeroIndex];

  return (
    <>

      {/* Hero Section */}
      {currentHero && (
        <div
          className="relative w-full h-[80vh] bg-cover bg-center text-white"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${currentHero.backdrop_path})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>

          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-24 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{currentHero.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-300 mb-2">
              <span className="text-pink-400">{currentHero.vote_average.toFixed(1)}/10</span>
              <span>{currentHero.release_date?.split('-')[0]}</span>
              <span className="px-2 py-1 bg-purple-600 rounded-md text-xs">Sci-Fi</span>
            </div>
            <p className="text-gray-300 max-w-xl mb-6 line-clamp-3">
              {currentHero.overview}
            </p>
            <div className="flex gap-4">
              <button className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-5 rounded-md text-sm font-semibold">
                ▶ Watch Now
              </button>
              <button className="border border-white text-white hover:bg-white hover:text-black py-2 px-5 rounded-md text-sm font-semibold">
                More Info
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Page Content */}
      <div className="container mx-auto px-4 py-10">
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
    </>
  );
}
