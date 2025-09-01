// Database setup script for portfolio_db
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

// Database configuration for initial setup (without specific database)
const setupConfig = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
};

// Database configuration for portfolio_db
const dbConfig = {
  ...setupConfig,
  database: process.env.DB_NAME || 'portfolio_db',
};

async function createDatabase() {
  const setupPool = new Pool(setupConfig);
  
  try {
    console.log('🔍 Checking if database exists...');
    
    // Check if database exists
    const checkDb = await setupPool.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [dbConfig.database]
    );
    
    if (checkDb.rows.length === 0) {
      console.log('📦 Creating database...');
      await setupPool.query(`CREATE DATABASE ${dbConfig.database}`);
      console.log('✅ Database created successfully');
    } else {
      console.log('✅ Database already exists');
    }
    
    await setupPool.end();
    return true;
  } catch (err) {
    console.error('❌ Error creating database:', err.message);
    await setupPool.end();
    return false;
  }
}

async function runSQLFile(pool, filePath, description) {
  try {
    console.log(`📄 Running ${description}...`);
    const sql = fs.readFileSync(filePath, 'utf8');
    
    // Split SQL file by semicolons and execute each statement
    const statements = sql
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    for (const statement of statements) {
      if (statement.trim()) {
        await pool.query(statement);
      }
    }
    
    console.log(`✅ ${description} completed successfully`);
    return true;
  } catch (err) {
    console.error(`❌ Error running ${description}:`, err.message);
    return false;
  }
}

async function setupDatabase() {
  console.log('🚀 Starting database setup...\n');
  
  // Step 1: Create database
  const dbCreated = await createDatabase();
  if (!dbCreated) {
    console.log('❌ Failed to create database. Exiting...');
    process.exit(1);
  }
  
  // Step 2: Connect to the portfolio database
  const pool = new Pool(dbConfig);
  
  try {
    // Test connection
    console.log('🔗 Testing database connection...');
    await pool.query('SELECT 1');
    console.log('✅ Connected to portfolio_db\n');
    
    // Step 3: Run schema
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSuccess = await runSQLFile(pool, schemaPath, 'database schema');
    
    if (!schemaSuccess) {
      console.log('❌ Failed to create schema. Exiting...');
      process.exit(1);
    }
    
    // Step 4: Run seed data
    const seedPath = path.join(__dirname, 'seed_data.sql');
    const seedSuccess = await runSQLFile(pool, seedPath, 'seed data');
    
    if (!seedSuccess) {
      console.log('❌ Failed to insert seed data. Exiting...');
      process.exit(1);
    }
    
    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📊 Database Summary:');
    console.log('- Database: portfolio_db');
    console.log('- Tables: users, personal_info, translations, skill_categories, skills, projects, technologies, project_technologies, contact_messages, github_activities, site_settings');
    console.log('- Sample data: ✅ Inserted');
    console.log('- Admin user: admin@portfolio.com (password: admin123)');
    console.log('\n🔧 Next steps:');
    console.log('1. Update your .env file with database credentials');
    console.log('2. Create API endpoints for admin panel');
    console.log('3. Build admin dashboard for content management');
    
  } catch (err) {
    console.error('❌ Database setup error:', err.message);
  } finally {
    await pool.end();
  }
}

// Run setup if this file is executed directly
if (require.main === module) {
  setupDatabase().catch(console.error);
}

module.exports = {
  setupDatabase,
  createDatabase,
  runSQLFile
};