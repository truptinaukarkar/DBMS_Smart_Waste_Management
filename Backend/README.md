# Smart Waste Management Backend

A comprehensive backend system for managing waste bins, tasks, and user operations.

## Features

- **User Authentication**: Register, login, and profile management with JWT tokens
- **Bin Management**: CRUD operations for waste bins with location tracking
- **Task Management**: Create and track waste collection tasks with photo uploads
- **Role-based Access Control**: Admin, worker, and user roles
- **Image Storage**: Photo uploads via Supabase Storage
- **Database**: PostgreSQL database with comprehensive schema

## Tech Stack

- **Node.js** with ES modules
- **Express.js** for REST API
- **Supabase** for database and storage
- **JWT** for authentication
- **bcryptjs** for password hashing
- **multer** for file uploads

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Configure your environment variables in `.env`:
   - `SUPABASE_URL`: Your Supabase project URL (get from Supabase dashboard)
   - `SUPABASE_KEY`: Your Supabase anon key (get from Supabase dashboard)
   - `JWT_SECRET`: Generate a secure secret key for JWT tokens

5. Set up the database:
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Run the contents of `database/schema.sql` to create all tables

6. Test the database connection:
   ```bash
   npm run setup
   ```

## Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server runs on port 3000 by default.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Bins
- `GET /api/bins` - Get all bins (optional status filter)
- `GET /api/bins/:id` - Get specific bin
- `POST /api/bins` - Create new bin (admin only)
- `PUT /api/bins/:id/status` - Update bin status (admin/worker)
- `DELETE /api/bins/:id` - Delete bin (admin only)

### Tasks
- `POST /api/tasks` - Create new task (with photo upload)
- `GET /api/tasks` - Get all tasks (admin/worker)
- `GET /api/tasks/my-tasks` - Get current user's tasks
- `GET /api/tasks/bin/:bin_id` - Get tasks for specific bin

### Health Check
- `GET /api/health` - Server health check

## Database Schema

The system includes tables for:
- `users` - User accounts and authentication
- `bins` - Waste bin locations and status
- `tasks` - Waste collection tasks
- `collections` - Collection records
- `notifications` - User notifications

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## File Uploads

Photos are uploaded to Supabase Storage and stored in the `waste-images` bucket.
