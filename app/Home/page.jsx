'use client';
import React from 'react'


export default function Home() {
  const trendingMovies = [
    {
      id: 1,
      title: "Parasite",
      rating: "8.6/10",
      year: "2019",
      genre: "Thriller",
      description: "Greed and class discrimination threaten the newly formed...",
      image: "/images/parasite-poster.jpg"
    },
    {
      id: 2,
      title: "Blade Runner 2049",
      rating: "8.0/10",
      year: "2017",
      genre: "Sci-Fi",
      description: "A young blade runner's discovery of a long-buried secret...",
      image: "/images/blade-runner-poster.jpg"
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-cyan-300 mb-6">Trending Now</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {trendingMovies.map((movie) => (
          <div 
            key={movie.id} 
            className="relative group rounded-lg overflow-hidden h-75 bg-gray-300 bg-cover bg-center transition-all duration-300"
            style={{ backgroundImage: `url(${movie.image})` }}
          >
            {/* Default state - just title */}
            <div className="absolute inset-0 bg-gray-500 bg-opacity-40 flex items-end justify-start p-4 group-hover:opacity-0 transition-opacity duration-300">
              <h3 className="text-white font-bold text-lg">{movie.title}</h3>
            </div>

            {/* Hover state - full details */}
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
        ))}
      </div>

      <div className='mt-10 mb-10'>
        <h2 className="text-2xl font-bold text-purple-500 mb-6">Polpular Picks</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {trendingMovies.map((movie) => (
            <div 
              key={movie.id} 
              className="relative group rounded-lg overflow-hidden h-75 bg-gray-300 bg-cover bg-center transition-all duration-300"
              style={{ backgroundImage: `url(${movie.image})` }}
            >
              {/* Default state - just title */}
              <div className="absolute inset-0 bg-gray-500 bg-opacity-40 flex items-end justify-start p-4 group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="text-white font-bold text-lg">{movie.title}</h3>
              </div>

              {/* Hover state - full details */}
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
          ))}
        </div>
      </div>
    </div>
  );
};



