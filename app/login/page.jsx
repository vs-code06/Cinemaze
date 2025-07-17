'use client';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { handleLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(email, password);
      router.push('/');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center px-4">
      <form
        onSubmit={submit}
        className="bg-white shadow-2xl rounded-lg w-full max-w-sm p-8 space-y-6"
      >
        <h1 className="text-2xl font-bold text-gray-800 text-center">Login to your account</h1>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Password</label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-500">
          Don’t have an account? <span className="text-blue-600 hover:underline cursor-pointer">Sign up</span>
        </p>
      </form>
    </div>
  );
}
