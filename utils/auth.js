import { supabase } from '../supabaseClient';
import { hashPassword, comparePassword } from './hash';

// Sign Up
export async function signup(name, email, password) {
  const { data: existingUser, error: existsError } = await supabase
    .from('users')
    .select('id')
    .eq('email', email);

  if (existsError) throw new Error('Database error');
  if (existingUser.length > 0) throw new Error('User already exists');

  const hashed = await hashPassword(password);

  const { data, error } = await supabase
    .from('users')
    .insert([{ name, email, password: hashed }])
    .select();

  if (error) throw new Error(error.message);
  return data[0];
}

// Login
export async function login(email, password) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !data) throw new Error('User not found');

  const isValid = await comparePassword(password, data.password);
  if (!isValid) throw new Error('Invalid credentials');

  return data;
}
