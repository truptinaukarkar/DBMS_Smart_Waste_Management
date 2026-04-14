import dotenv from 'dotenv';
import { testConnection, initializeDatabase } from '../src/services/databaseService.js';

dotenv.config();

async function setupDatabase() {
  console.log('Setting up database connection...\n');

  try {
    const connectionTest = await testConnection();
    
    if (connectionTest.success) {
      console.log('Database connection successful!');
    } else {
      console.log('Database connection failed:', connectionTest.message);
      console.log('\nPlease check your environment variables:');
      console.log('- SUPABASE_URL');
      console.log('- SUPABASE_KEY');
      process.exit(1);
    }

    console.log('\n🔍 Checking database tables...');
    const initResult = await initializeDatabase();
    
    if (initResult.success) {
      console.log('Database tables are ready!');
      console.log('\nTable Status:');
      initResult.tables.forEach(table => {
        const status = table.status === 'success' ? '✅' : '❌';
        console.log(`${status} ${table.table}: ${table.message}`);
      });
    } else {
      console.log('Database initialization failed:', initResult.message);
      process.exit(1);
    }

    console.log('\n Database setup completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Run the server: npm run dev');
    console.log('2. Test the API: http://localhost:3000/api/health');
    
  } catch (error) {
    console.error('Setup failed:', error.message);
    process.exit(1);
  }
}

setupDatabase();
