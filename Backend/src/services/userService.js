import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import supabase from '../config/supabaseClient.js';

export const registerUser = async (name, email, password, role = 'user') => {
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          name,
          email,
          password: hashedPassword,
          role,
          created_at: new Date().toISOString()
        }
      ])
      .select('id, name, email, role, created_at')
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    throw new Error(`Failed to register user: ${error.message}`);
  }
};

export const loginUser = async (email, password) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' }
    );

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  } catch (error) {
    throw new Error(`Failed to login: ${error.message}`);
  }
};

export const getUserById = async (user_id) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, role, created_at')
      .eq('id', user_id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    throw new Error(`Failed to get user: ${error.message}`);
  }
};

export const getUserByEmail = async (email) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, role, created_at')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }
    return data;
  } catch (error) {
    throw new Error(`Failed to get user by email: ${error.message}`);
  }
};

export const getAllUsers = async () => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, role, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    throw new Error(`Failed to get users: ${error.message}`);
  }
};

export const updateUserProfile = async (user_id, name, email) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update({ 
        name, 
        email, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', user_id)
      .select('id, name, email, role, created_at, updated_at')
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    throw new Error(`Failed to update user: ${error.message}`);
  }
};
