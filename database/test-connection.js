// Test database connection and show database info
const { pool, testConnection } = require('./config');

async function showDatabaseInfo() {
  try {
    console.log('🔍 Testing database connection...\n');
    
    const connected = await testConnection();
    if (!connected) {
      console.log('❌ Cannot connect to database');
      process.exit(1);
    }
    
    console.log('\n📊 Database Information:');
    
    // Get database version
    const versionResult = await pool.query('SELECT version()');
    console.log('🐘 PostgreSQL Version:', versionResult.rows[0].version.split(' ')[1]);
    
    // Get database name and size
    const dbInfoResult = await pool.query(`
      SELECT 
        current_database() as database_name,
        pg_size_pretty(pg_database_size(current_database())) as database_size
    `);
    console.log('📦 Database Name:', dbInfoResult.rows[0].database_name);
    console.log('💾 Database Size:', dbInfoResult.rows[0].database_size);
    
    // Get table count and info
    const tablesResult = await pool.query(`
      SELECT 
        schemaname,
        tablename,
        pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
      FROM pg_tables 
      WHERE schemaname = 'public'
      ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC
    `);
    
    console.log('\n📋 Tables:');
    tablesResult.rows.forEach(table => {
      console.log(`  • ${table.tablename} (${table.size})`);
    });
    
    // Get record counts
    console.log('\n📈 Record Counts:');
    const tables = ['users', 'personal_info', 'skill_categories', 'skills', 'projects', 'technologies', 'project_technologies', 'translations', 'contact_messages', 'site_settings'];
    
    for (const table of tables) {
      try {
        const countResult = await pool.query(`SELECT COUNT(*) FROM ${table}`);
        console.log(`  • ${table}: ${countResult.rows[0].count} records`);
      } catch (err) {
        console.log(`  • ${table}: Table not found`);
      }
    }
    
    // Test some sample queries
    console.log('\n🧪 Sample Data:');
    
    // Get personal info
    const personalInfo = await pool.query('SELECT full_name, title, email FROM personal_info LIMIT 1');
    if (personalInfo.rows.length > 0) {
      const info = personalInfo.rows[0];
      console.log(`  • Personal Info: ${info.full_name} - ${info.title}`);
    }
    
    // Get project count
    const projectCount = await pool.query('SELECT COUNT(*) as total, COUNT(*) FILTER (WHERE is_featured = true) as featured FROM projects WHERE is_active = true');
    if (projectCount.rows.length > 0) {
      const counts = projectCount.rows[0];
      console.log(`  • Projects: ${counts.total} total, ${counts.featured} featured`);
    }
    
    // Get skill categories
    const skillCategories = await pool.query('SELECT COUNT(*) as categories, (SELECT COUNT(*) FROM skills WHERE is_active = true) as skills FROM skill_categories WHERE is_active = true');
    if (skillCategories.rows.length > 0) {
      const counts = skillCategories.rows[0];
      console.log(`  • Skills: ${counts.categories} categories, ${counts.skills} skills`);
    }
    
    // Get translation languages
    const languages = await pool.query('SELECT DISTINCT language_code FROM translations ORDER BY language_code');
    const langCodes = languages.rows.map(row => row.language_code).join(', ');
    console.log(`  • Languages: ${langCodes}`);
    
    console.log('\n✅ Database test completed successfully!');
    
  } catch (err) {
    console.error('❌ Database test error:', err.message);
    console.error('Stack:', err.stack);
  } finally {
    await pool.end();
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  showDatabaseInfo().catch(console.error);
}

module.exports = {
  showDatabaseInfo
};