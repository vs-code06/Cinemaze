'use client';

export default function MovieCard({movie}) {
    return(
        <div
        key={movie.id}
        className="relative group min-w-[180px] sm:min-w-[200px] md:min-w-[220px] lg:min-w-[240px] h-80 rounded-lg overflow-hidden bg-gray-900 bg-cover bg-center transition-all duration-300 mr-4"
        style={{ backgroundImage: `url(${movie.image})` }}
        >
        <div className="absolute inset-0 flex items-end justify-start p-4 group-hover:opacity-0 transition-opacity duration-300">
            <h3 className="text-white font-bold text-lg">{movie.title}</h3>
        </div>
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
                View Details
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-md transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
            </button>
            </div>
        </div>
        </div>
    );
}
