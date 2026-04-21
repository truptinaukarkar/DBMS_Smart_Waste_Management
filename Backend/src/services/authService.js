import supabase from '../config/supabaseClient.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const registerUser = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from('users')
    .insert([{
      name,
      email,
      password: hashedPassword
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const loginUser = async (email, password) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !data) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, data.password);

  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  return data;
};