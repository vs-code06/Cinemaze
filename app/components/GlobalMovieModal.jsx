'use client';
import React from 'react';
import { useMovieModal } from '@/contexts/MovieModalContext';
import MovieModal from './MovieModal';

export default function GlobalMovieModal() {
  const { isModalOpen, selectedMovie, closeModal } = useMovieModal();

  return (
    <MovieModal movie={selectedMovie} isOpen={isModalOpen} onClose={closeModal} />
  );
}
