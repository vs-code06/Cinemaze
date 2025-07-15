'use client';
import { useState } from 'react';
import { useAuth } from ' @/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const { handleSignup } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await handleSignup(name, email, password);
      router.push('/'); // ✅ Redirect to home on success
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={submit} className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Sign Up</h1>
      <input
        className="w-full p-2 border mb-2"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="w-full p-2 border mb-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full p-2 border mb-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-green-500 text-white px-4 py-2">Sign Up</button>
    </form>
  );
}
