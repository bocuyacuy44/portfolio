# Portfolio Database Documentation

## Overview
Database `portfolio_db` dirancang untuk menyimpan semua data portfolio yang dapat dikelola melalui panel admin. Database ini mendukung multi-bahasa dan memiliki struktur yang fleksibel untuk pengembangan ke depan.

## Prerequisites
- PostgreSQL 12+ terinstall
- Node.js 16+ terinstall
- npm atau yarn package manager

## Quick Setup

### 1. Install Dependencies
```bash
npm install pg dotenv bcrypt
```

### 2. Setup Environment
```bash
cp .env.example .env
# Edit .env file dengan kredensial database Anda
```

### 3. Run Database Setup
```bash
node database/setup.js
```

## Database Schema

### Core Tables

#### `users`
Tabel untuk autentikasi admin panel
- `id` (UUID, Primary Key)
- `username` (VARCHAR, Unique)
- `email` (VARCHAR, Unique)
- `password_hash` (VARCHAR)
- `full_name` (VARCHAR)
- `role` (VARCHAR) - 'admin' atau 'super_admin'
- `is_active` (BOOLEAN)
- `created_at`, `updated_at` (TIMESTAMP)

#### `personal_info`
Informasi pribadi untuk section Hero dan About
- `id` (UUID, Primary Key)
- `full_name` (VARCHAR)
- `title` (VARCHAR)
- `bio` (TEXT)
- `location`, `email`, `phone` (VARCHAR)
- `github_url`, `linkedin_url`, `twitter_url` (VARCHAR)
- `resume_url`, `profile_image` (VARCHAR)
- `years_experience`, `projects_completed`, `happy_clients` (INTEGER)
- `created_at`, `updated_at` (TIMESTAMP)

#### `translations`
Sistem multi-bahasa untuk semua teks
- `id` (UUID, Primary Key)
- `translation_key` (VARCHAR) - Key untuk teks
- `language_code` (VARCHAR) - 'en', 'id', dll
- `translation_value` (TEXT) - Teks yang diterjemahkan
- `section` (VARCHAR) - 'hero', 'about', 'skills', dll
- `created_at`, `updated_at` (TIMESTAMP)

#### `skill_categories`
Kategori keahlian (Frontend, Backend, Tools)
- `id` (UUID, Primary Key)
- `name` (VARCHAR)
- `icon` (VARCHAR) - Emoji atau icon class
- `display_order` (INTEGER)
- `is_active` (BOOLEAN)
- `created_at`, `updated_at` (TIMESTAMP)

#### `skills`
Daftar keahlian dengan level
- `id` (UUID, Primary Key)
- `category_id` (UUID, Foreign Key)
- `name` (VARCHAR)
- `level` (INTEGER) - 0-100
- `display_order` (INTEGER)
- `is_active` (BOOLEAN)
- `created_at`, `updated_at` (TIMESTAMP)

#### `projects`
Daftar project portfolio
- `id` (UUID, Primary Key)
- `title` (VARCHAR)
- `description` (TEXT)
- `image_url`, `video_url` (VARCHAR)
- `live_url`, `github_url` (VARCHAR)
- `is_featured` (BOOLEAN)
- `display_order` (INTEGER)
- `is_active` (BOOLEAN)
- `created_at`, `updated_at` (TIMESTAMP)

#### `technologies`
Master data teknologi
- `id` (UUID, Primary Key)
- `name` (VARCHAR, Unique)
- `color` (VARCHAR) - Hex color code
- `icon` (VARCHAR) - Icon class atau emoji
- `created_at` (TIMESTAMP)

#### `project_technologies`
Relasi many-to-many antara projects dan technologies
- `project_id` (UUID, Foreign Key)
- `technology_id` (UUID, Foreign Key)
- Primary Key: (project_id, technology_id)

#### `contact_messages`
Pesan dari contact form
- `id` (UUID, Primary Key)
- `name`, `email` (VARCHAR)
- `message` (TEXT)
- `is_read` (BOOLEAN)
- `replied_at` (TIMESTAMP)
- `created_at` (TIMESTAMP)

#### `github_activities`
Cache aktivitas GitHub
- `id` (UUID, Primary Key)
- `activity_type` (VARCHAR) - 'commit', 'pr', 'issue', 'release'
- `repository_name` (VARCHAR)
- `activity_title`, `activity_url` (VARCHAR)
- `activity_date` (TIMESTAMP)
- `created_at` (TIMESTAMP)

#### `site_settings`
Pengaturan umum website
- `id` (UUID, Primary Key)
- `setting_key` (VARCHAR, Unique)
- `setting_value` (TEXT)
- `setting_type` (VARCHAR) - 'text', 'number', 'boolean', 'json'
- `description` (TEXT)
- `created_at`, `updated_at` (TIMESTAMP)

## Default Data

### Admin User
- **Username**: admin
- **Email**: admin@portfolio.com
- **Password**: admin123 (⚠️ Ganti di production!)

### Sample Data
- Personal info untuk Yusup Muhamad
- 3 kategori skills dengan 18 skills
- 6 sample projects dengan technologies
- 25+ technologies
- Translations untuk bahasa EN dan ID
- Site settings default

## Database Operations

### Test Connection
```javascript
const { testConnection } = require('./database/config');
testConnection();
```

### Query Examples
```javascript
const { pool } = require('./database/config');

// Get all projects with technologies
const getProjectsWithTech = async () => {
  const query = `
    SELECT 
      p.*,
      array_agg(t.name) as technologies
    FROM projects p
    LEFT JOIN project_technologies pt ON p.id = pt.project_id
    LEFT JOIN technologies t ON pt.technology_id = t.id
    WHERE p.is_active = true
    GROUP BY p.id
    ORDER BY p.display_order
  `;
  return await pool.query(query);
};

// Get skills by category
const getSkillsByCategory = async () => {
  const query = `
    SELECT 
      sc.name as category,
      sc.icon,
      json_agg(
        json_build_object(
          'name', s.name,
          'level', s.level
        ) ORDER BY s.display_order
      ) as skills
    FROM skill_categories sc
    LEFT JOIN skills s ON sc.id = s.category_id
    WHERE sc.is_active = true AND s.is_active = true
    GROUP BY sc.id, sc.name, sc.icon
    ORDER BY sc.display_order
  `;
  return await pool.query(query);
};

// Get translations for specific language
const getTranslations = async (langCode = 'en') => {
  const query = `
    SELECT translation_key, translation_value
    FROM translations
    WHERE language_code = $1
  `;
  return await pool.query(query, [langCode]);
};
```

## Maintenance

### Backup Database
```bash
pg_dump -h localhost -U postgres portfolio_db > backup_$(date +%Y%m%d).sql
```

### Restore Database
```bash
psql -h localhost -U postgres portfolio_db < backup_20240101.sql
```

### Reset Database
```bash
# Drop and recreate
dropdb portfolio_db
node database/setup.js
```

## Security Notes

1. **Password Hashing**: Gunakan bcrypt dengan minimal 12 rounds
2. **Environment Variables**: Jangan commit file .env ke repository
3. **Database Access**: Gunakan user database dengan privilege terbatas di production
4. **SQL Injection**: Selalu gunakan parameterized queries
5. **Admin Password**: Ganti password default setelah setup

## API Integration

Database ini dirancang untuk diintegrasikan dengan:
- REST API untuk admin panel
- GraphQL endpoint (opsional)
- Real-time updates dengan WebSocket
- File upload untuk images/documents

## Next Steps

1. **Create API Layer**: Buat Express.js API untuk CRUD operations
2. **Admin Panel**: Develop React admin dashboard
3. **Authentication**: Implement JWT-based auth
4. **File Upload**: Setup multer untuk image uploads
5. **Email Service**: Integrate nodemailer untuk contact form
6. **GitHub Integration**: Fetch real GitHub activity
7. **Caching**: Implement Redis untuk performance
8. **Monitoring**: Setup logging dan monitoring

## Support

Jika ada pertanyaan atau masalah dengan database setup, silakan buat issue atau hubungi developer.