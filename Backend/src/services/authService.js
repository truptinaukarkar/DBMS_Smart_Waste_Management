import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'node:fs/promises';
import path from 'node:path';

const USERS_FILE = path.resolve(process.cwd(), 'database', 'mockUsers.json');

async function ensureUsersFile() {
  try {
    await fs.access(USERS_FILE);
    // If a placeholder file exists, keep it but make sure it has real hashes.
    const existingRaw = await fs.readFile(USERS_FILE, 'utf8').catch(() => null);
    if (existingRaw) {
      try {
        const existing = JSON.parse(existingRaw);
        if (Array.isArray(existing) && existing.some(u => typeof u?.password === 'string' && u.password.includes('REPLACE_ON_FIRST_RUN'))) {
          throw new Error('placeholder');
        }
      } catch {
        // fall through to rewrite seed below
        throw new Error('placeholder');
      }
    }
  } catch {
    const salt = await bcrypt.genSalt(10);
    const seed = [
      {
        id: '1',
        name: 'Test User',
        email: 'user@it.vjti.ac.in',
        password: await bcrypt.hash('password', salt),
        role: 'user',
        created_at: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Test Worker',
        email: 'worker@company.com',
        password: await bcrypt.hash('password', salt),
        role: 'worker',
        created_at: new Date().toISOString(),
      },
    ];
    await fs.mkdir(path.dirname(USERS_FILE), { recursive: true });
    await fs.writeFile(USERS_FILE, JSON.stringify(seed, null, 2), 'utf8');
  }
}

async function readUsers() {
  await ensureUsersFile();
  const raw = await fs.readFile(USERS_FILE, 'utf8');
  const users = JSON.parse(raw);
  return Array.isArray(users) ? users : [];
}

async function writeUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
}

function sanitizeUser(user) {
  const { password, ...safe } = user;
  return safe;
}

function generateId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export const loginUser = async (email, password) => {
  try {
    const users = await readUsers();
    const user = users.find(u => u.email === email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' }
    );

    return { user: sanitizeUser(user), token };
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
};

export const registerUser = async (name, email, password, role = 'user') => {
  try {
    const users = await readUsers();
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = {
      id: generateId(),
      name,
      email,
      password: hashedPassword,
      role,
      created_at: new Date().toISOString()
    };

    users.push(newUser);
    await writeUsers(users);

    return sanitizeUser(newUser);
  } catch (error) {
    throw new Error(`Registration failed: ${error.message}`);
  }
};

export const getUserById = async (userId) => {
  const users = await readUsers();
  const user = users.find(u => u.id === userId);
  if (!user) throw new Error('User not found');
  return sanitizeUser(user);
};
