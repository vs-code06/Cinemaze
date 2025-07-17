'use client';
import { createContext, useContext, useState } from 'react';

const MovieModalContext = createContext();

export function MovieModalProvider({ children }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  return (
    <MovieModalContext.Provider value={{ selectedMovie, isModalOpen, openModal, closeModal }}>
      {children}
    </MovieModalContext.Provider>
  );
}

export function useMovieModal() {
  return useContext(MovieModalContext);
}
