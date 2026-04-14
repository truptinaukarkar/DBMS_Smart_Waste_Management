import supabase, { isDemoSupabase } from '../config/supabaseClient.js';
import fs from 'node:fs/promises';
import path from 'node:path';

const TASKS_FILE = path.resolve(process.cwd(), 'database', 'mockTasks.json');

async function ensureTasksFile() {
  try {
    await fs.access(TASKS_FILE);
  } catch {
    await fs.mkdir(path.dirname(TASKS_FILE), { recursive: true });
    await fs.writeFile(TASKS_FILE, JSON.stringify([], null, 2), 'utf8');
  }
}

async function readTasks() {
  await ensureTasksFile();
  const raw = await fs.readFile(TASKS_FILE, 'utf8');
  const tasks = JSON.parse(raw);
  return Array.isArray(tasks) ? tasks : [];
}

async function writeTasks(tasks) {
  await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2), 'utf8');
}

function sortNewestFirst(a, b) {
  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
}

function generateId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export const createTask = async (bin_id, user_id, fill_level, photo_url) => {
  if (isDemoSupabase) {
    const tasks = await readTasks();
    const task = {
      id: generateId(),
      bin_id,
      user_id,
      fill_level: Number(fill_level),
      photo_url,
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    tasks.unshift(task);
    await writeTasks(tasks);
    return task;
  }

  try {
    const { data, error } = await supabase
      .from('tasks')
      .insert([
        {
          bin_id,
          user_id,
          fill_level,
          photo_url,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    throw new Error(`Failed to create task: ${error.message}`);
  }
};

export const getTasksByBin = async (bin_id) => {
  if (isDemoSupabase) {
    const tasks = await readTasks();
    return tasks.filter(t => t.bin_id === bin_id).sort(sortNewestFirst);
  }

  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('bin_id', bin_id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    throw new Error(`Failed to get tasks: ${error.message}`);
  }
};

export const getTasksByUser = async (user_id) => {
  if (isDemoSupabase) {
    const tasks = await readTasks();
    return tasks.filter(t => t.user_id === user_id).sort(sortNewestFirst);
  }

  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    throw new Error(`Failed to get user tasks: ${error.message}`);
  }
};

export const getAllTasks = async () => {
  if (isDemoSupabase) {
    const tasks = await readTasks();
    return tasks.sort(sortNewestFirst);
  }

  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    throw new Error(`Failed to get all tasks: ${error.message}`);
  }
};