'use client';
import React from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const dummyMovies = [
  {
    id: 1,
    title: "Inception",
    poster: "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
    releaseDate: "2010-07-16",
    rating: 8.8,
    genre: "Sci-Fi",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea into a target's subconscious."
  },
  {
    id: 2,
    title: "Interstellar",
    poster: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    releaseDate: "2014-11-07",
    rating: 8.6,
    genre: "Adventure",
    description: "A group of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
  },
  {
    id: 3,
    title: "The Dark Knight",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    releaseDate: "2008-07-18",
    rating: 9.0,
    genre: "Action",
    description: "Batman sets out to dismantle the remaining criminal organizations that plague the streets but soon finds himself prey to a reign of chaos."
  },
  {
    id: 4,
    title: "Tenet",
    poster: "https://image.tmdb.org/t/p/w500/k68nPLbIST6NP96JmTxmZijEvCA.jpg",
    releaseDate: "2020-08-22",
    rating: 7.5,
    genre: "Thriller",
    description: "Armed with only one word—Tenet—and fighting for the survival of the world, a protagonist journeys through a twilight world of international espionage."
  },
];

export default function Movies() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="container mx-auto px-4 py-20 pt-24">
        <h1 className="text-3xl font-bold mb-10 text-center">Movies</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {dummyMovies.map((movie) => (
            <div
              key={movie.id}
              className="relative group rounded-lg overflow-hidden h-[22rem] shadow-lg"
            >
              {/* Always-visible image */}
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-80 object-cover"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                <div className="mb-2">
                  <h3 className="text-white font-bold text-lg">{movie.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-pink-400">⭐ {movie.rating}</span>
                    <span>{movie.releaseDate.split("-")[0]}</span>
                    <span>•</span>
                    <span className="text-pink-400">{movie.genre}</span>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {movie.description}
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
