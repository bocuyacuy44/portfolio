// Re-seed database with fresh data
const { pool } = require('./config');
const { runSQLFile } = require('./setup');
const path = require('path');

async function clearData() {
  console.log('🧹 Clearing existing data...');
  
  const clearQueries = [
    'DELETE FROM project_technologies',
    'DELETE FROM contact_messages',
    'DELETE FROM github_activities', 
    'DELETE FROM translations',
    'DELETE FROM skills',
    'DELETE FROM skill_categories',
    'DELETE FROM projects',
    'DELETE FROM technologies',
    'DELETE FROM site_settings',
    'DELETE FROM personal_info',
    'DELETE FROM users WHERE username != \'admin\''
  ];
  
  try {
    for (const query of clearQueries) {
      await pool.query(query);
    }
    console.log('✅ Data cleared successfully');
    return true;
  } catch (err) {
    console.error('❌ Error clearing data:', err.message);
    return false;
  }
}

async function seedDatabase(clearFirst = false) {
  try {
    console.log('🌱 Starting database seeding...\n');
    
    // Test connection
    await pool.query('SELECT 1');
    console.log('✅ Connected to database');
    
    // Clear data if requested
    if (clearFirst) {
      const cleared = await clearData();
      if (!cleared) {
        console.log('❌ Failed to clear data. Exiting...');
        process.exit(1);
      }
    }
    
    // Run seed data
    const seedPath = path.join(__dirname, 'seed_data.sql');
    const seedSuccess = await runSQLFile(pool, seedPath, 'seed data');
    
    if (!seedSuccess) {
      console.log('❌ Failed to insert seed data');
      process.exit(1);
    }
    
    // Show summary
    console.log('\n📊 Seeding Summary:');
    
    const summaryQueries = [
      { table: 'users', description: 'Admin users' },
      { table: 'personal_info', description: 'Personal information' },
      { table: 'skill_categories', description: 'Skill categories' },
      { table: 'skills', description: 'Skills' },
      { table: 'technologies', description: 'Technologies' },
      { table: 'projects', description: 'Projects' },
      { table: 'project_technologies', description: 'Project-Technology relations' },
      { table: 'translations', description: 'Translations' },
      { table: 'site_settings', description: 'Site settings' }
    ];
    
    for (const { table, description } of summaryQueries) {
      try {
        const result = await pool.query(`SELECT COUNT(*) FROM ${table}`);
        console.log(`  • ${description}: ${result.rows[0].count} records`);
      } catch (err) {
        console.log(`  • ${description}: Error counting records`);
      }
    }
    
    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n🔑 Admin Credentials:');
    console.log('  • Email: admin@portfolio.com');
    console.log('  • Password: admin123');
    console.log('  • ⚠️  Remember to change the password in production!');
    
  } catch (err) {
    console.error('❌ Seeding error:', err.message);
  } finally {
    await pool.end();
  }
}

// Command line arguments
const args = process.argv.slice(2);
const clearFirst = args.includes('--clear') || args.includes('-c');

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase(clearFirst).catch(console.error);
}

module.exports = {
  seedDatabase,
  clearData
};