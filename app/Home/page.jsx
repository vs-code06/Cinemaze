'use client';
import React, { useEffect, useState } from 'react';
import MovieCard from "../components/MovieCard";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WatchNowButton from '../components/WatchNowButton';


const TMDB_API_KEY = '77a156d00aef40cfc947354bf3acd1f0';

export default function Home() {
  const [heroMovies, setHeroMovies] = useState([]);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingSeries, setTrendingSeries] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);

  // Hero Movies (Top Rated)
  useEffect(() => {
    const fetchHero = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=1`);
      const data = await res.json();
      setHeroMovies(data.results.slice(0, 5));
    };
    fetchHero();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % 5);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch all content types
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [
          trendingMovieRes,
          trendingSeriesRes,
          popularMovieRes,
          popularSeriesRes
        ] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`),
          fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${TMDB_API_KEY}`),
          fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`),
          fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${TMDB_API_KEY}`)
        ]);

        const [trendingMovieData, trendingSeriesData, popularMovieData, popularSeriesData] = await Promise.all([
          trendingMovieRes.json(),
          trendingSeriesRes.json(),
          popularMovieRes.json(),
          popularSeriesRes.json()
        ]);

        setTrendingMovies(trendingMovieData.results.map((item) => ({
          id: item.id,
          title: item.title,
          rating: `${item.vote_average.toFixed(1)}/10`,
          year: item.release_date?.split('-')[0],
          genre: 'Movie',
          description: item.overview,
          image: `https://image.tmdb.org/t/p/w1280${item.backdrop_path}`,
        })));

        setTrendingSeries(trendingSeriesData.results.map((item) => ({
          id: item.id,
          title: item.name,
          rating: `${item.vote_average.toFixed(1)}/10`,
          year: item.first_air_date?.split('-')[0],
          genre: 'TV Show',
          description: item.overview,
          image: `https://image.tmdb.org/t/p/w1280${item.backdrop_path}`,
        })));

        setPopularMovies(popularMovieData.results.map((item) => ({
          id: item.id,
          title: item.title,
          rating: `${item.vote_average.toFixed(1)}/10`,
          year: item.release_date?.split('-')[0],
          genre: 'Drama',
          description: item.overview,
          image: `https://image.tmdb.org/t/p/w1280${item.backdrop_path}`,
        })));

        setPopularSeries(popularSeriesData.results.map((item) => ({
          id: item.id,
          title: item.name,
          rating: `${item.vote_average.toFixed(1)}/10`,
          year: item.first_air_date?.split('-')[0],
          genre: 'Drama',
          description: item.overview,
          image: `https://image.tmdb.org/t/p/w1280${item.backdrop_path}`,
        })));

      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchContent();
  }, []);

  const currentHero = heroMovies[currentHeroIndex];
  console.log(heroMovies)

  return (
    <>
      {/* Hero Section */}
      <Navbar/>
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
              <span className="px-2 py-1 bg-purple-600 rounded-md text-xs">Top Rated</span>
            </div>
            <p className="text-gray-300 max-w-xl mb-6 line-clamp-3">
              {currentHero.overview}
            </p>
            <div className="flex gap-4">
            <WatchNowButton movie={{
              id: currentHero.id,
              title: currentHero.title,
              genre: 'movie',
              rating: `${currentHero.vote_average.toFixed(1)}/10`,
              year: currentHero.release_date?.split('-')[0],
              description: currentHero.overview,
              image: `https://image.tmdb.org/t/p/w1280${currentHero.backdrop_path}`
            }} />
              <button className="border border-white text-white hover:bg-white hover:text-black py-2 px-5 rounded-md text-sm font-semibold">
                More Info
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">

        {/* Trending Now - Movies */}
        <h2 className="text-2xl font-bold text-cyan-300 mb-4">Trending Movies</h2>
        <div className="overflow-x-auto pb-4">
          <div className="flex w-max">
            {trendingMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>

        {/* Trending Now - Series */}
        <h2 className="text-2xl font-bold text-cyan-300 mt-10 mb-4">Trending Series</h2>
        <div className="overflow-x-auto pb-4">
          <div className="flex w-max">
            {trendingSeries.map((series) => (
              <MovieCard key={series.id} movie={series} />
            ))}
          </div>
        </div>

        {/* Popular Picks - Movies */}
        <h2 className="text-2xl font-bold text-purple-500 mt-10 mb-4">Popular Movies </h2>
        <div className="overflow-x-auto pb-4">
          <div className="flex w-max">
            {popularMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>

        {/* Popular Picks - Series */}
        <h2 className="text-2xl font-bold text-purple-500 mt-10 mb-4">Popular Series </h2>
        <div className="overflow-x-auto pb-4 mb-20">
          <div className="flex w-max">
            {popularSeries.map((series) => (
              <MovieCard key={series.id} movie={series} />
            ))}
          </div>
        </div>

      </div>
      <Footer/>
    </>
  );
}
