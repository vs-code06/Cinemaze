'use client';
import { useMovieModal } from '@/contexts/MovieModalContext';

export default function ViewDetailsButton({ movie }) {
  const { openModal } = useMovieModal();

  return (
    <button
      onClick={() => openModal(movie)}
      className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md w-full text-sm font-semibold transition-colors"
    >
      View Details
    </button>
  );
}
