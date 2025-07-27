// components/WatchNowButton.tsx
'use client';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/supabaseClient';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function WatchNowButton({ movie }) {
  const { user } = useAuth();
  const router = useRouter();

  const handleWatchNow = async () => {
    if (!user) {
      alert('Please log in to track watch history.');
      router.push('/login');
      return;
    }

    const { error } = await supabase.from('history').insert({
      user_id: user.id,
      content_id: movie.id,
      title: movie.title,
      type: movie.genre === 'TV Show' ? 'series' : 'movie',
      poster_url: movie.image,
      rating: movie.rating,
      release_year: movie.year,
      description: movie.description,
      genre: movie.genre
    });

    if (error) {
      console.error("Failed to add to history:", error);
    } else {
      alert("Watch history updated!");
    }
  };

  return (
    <button
      onClick={handleWatchNow}
      className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-5 rounded-md text-sm font-semibold"
    >
      ▶ Watch Now
    </button>
  );
}
