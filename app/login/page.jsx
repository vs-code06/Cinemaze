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
    } 

    catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={submit} className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Login</h1>
      <input className="w-full p-2 border mb-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="w-full p-2 border mb-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-blue-500 text-white px-4 py-2">Login</button>
    </form>
  );
}
