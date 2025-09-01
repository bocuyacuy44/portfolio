-- Portfolio Database Seed Data
-- Run this after creating the schema

-- =============================================
-- INSERT PERSONAL INFO
-- =============================================
INSERT INTO personal_info (
    full_name, title, bio, location, email, phone, 
    github_url, linkedin_url, twitter_url,
    years_experience, projects_completed, happy_clients
) VALUES (
    'Yusup Muhamad',
    'Full Stack Developer',
    'Passionate about creating innovative web solutions with modern technologies. I transform ideas into elegant, scalable, and user-friendly applications.',
    'Jakarta, Indonesia',
    'yusupmuhamad9945@gmail.com',
    '+62 819-1281-2802',
    'https://github.com/yusupmuhamad',
    'https://linkedin.com/in/yusupmuhamad',
    'https://twitter.com/yusupmuhamad',
    3,
    50,
    20
);

-- =============================================
-- INSERT SKILL CATEGORIES
-- =============================================
INSERT INTO skill_categories (name, icon, display_order) VALUES
('Frontend', '🎨', 1),
('Backend', '⚙️', 2),
('Tools & Others', '🛠️', 3);

-- =============================================
-- INSERT SKILLS
-- =============================================
-- Get category IDs for reference
WITH categories AS (
    SELECT id, name FROM skill_categories
)
INSERT INTO skills (category_id, name, level, display_order) VALUES
-- Frontend Skills
((SELECT id FROM categories WHERE name = 'Frontend'), 'React.js', 90, 1),
((SELECT id FROM categories WHERE name = 'Frontend'), 'TypeScript', 85, 2),
((SELECT id FROM categories WHERE name = 'Frontend'), 'Next.js', 80, 3),
((SELECT id FROM categories WHERE name = 'Frontend'), 'Tailwind CSS', 95, 4),
((SELECT id FROM categories WHERE name = 'Frontend'), 'JavaScript', 90, 5),
((SELECT id FROM categories WHERE name = 'Frontend'), 'HTML/CSS', 95, 6),

-- Backend Skills
((SELECT id FROM categories WHERE name = 'Backend'), 'Node.js', 85, 1),
((SELECT id FROM categories WHERE name = 'Backend'), 'Express.js', 80, 2),
((SELECT id FROM categories WHERE name = 'Backend'), 'MongoDB', 75, 3),
((SELECT id FROM categories WHERE name = 'Backend'), 'PostgreSQL', 70, 4),
((SELECT id FROM categories WHERE name = 'Backend'), 'REST APIs', 85, 5),
((SELECT id FROM categories WHERE name = 'Backend'), 'GraphQL', 65, 6),

-- Tools & Others
((SELECT id FROM categories WHERE name = 'Tools & Others'), 'Git & GitHub', 90, 1),
((SELECT id FROM categories WHERE name = 'Tools & Others'), 'Docker', 70, 2),
((SELECT id FROM categories WHERE name = 'Tools & Others'), 'AWS', 65, 3),
((SELECT id FROM categories WHERE name = 'Tools & Others'), 'Figma', 80, 4),
((SELECT id FROM categories WHERE name = 'Tools & Others'), 'VS Code', 95, 5),
((SELECT id FROM categories WHERE name = 'Tools & Others'), 'Linux', 75, 6);

-- =============================================
-- INSERT TECHNOLOGIES
-- =============================================
INSERT INTO technologies (name, color, icon) VALUES
('React', '#61DAFB', '⚛️'),
('Node.js', '#339933', '🟢'),
('MongoDB', '#47A248', '🍃'),
('Stripe', '#635BFF', '💳'),
('Tailwind CSS', '#06B6D4', '🎨'),
('Socket.io', '#010101', '🔌'),
('Next.js', '#000000', '▲'),
('TypeScript', '#3178C6', '📘'),
('PostgreSQL', '#336791', '🐘'),
('Prisma', '#2D3748', '🔺'),
('Framer Motion', '#0055FF', '🎭'),
('OpenWeather API', '#FF6B35', '🌤️'),
('Chart.js', '#FF6384', '📊'),
('Geolocation', '#4285F4', '📍'),
('PWA', '#5A0FC8', '📱'),
('Vue.js', '#4FC08D', '💚'),
('D3.js', '#F68E56', '📈'),
('Express.js', '#000000', '🚀'),
('Redis', '#DC382D', '🔴'),
('Docker', '#2496ED', '🐳'),
('CoinGecko API', '#8DC647', '🪙'),
('Firebase', '#FFCA28', '🔥'),
('WebSocket', '#010101', '🔗'),
('Supabase', '#3ECF8E', '⚡'),
('Video.js', '#000000', '🎥');

-- =============================================
-- INSERT PROJECTS
-- =============================================
INSERT INTO projects (
    title, description, image_url, video_url, live_url, github_url, is_featured, display_order
) VALUES
(
    'E-Commerce Platform',
    'Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment integration, admin dashboard, and real-time inventory management.',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&auto=format',
    'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    'https://demo-ecommerce.example.com',
    'https://github.com/yusupmuhamad/ecommerce-platform',
    true,
    1
),
(
    'Task Management App',
    'Collaborative task management application with real-time updates, drag-and-drop functionality, team collaboration features, and advanced project analytics.',
    'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&auto=format',
    'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    'https://taskmanager-demo.example.com',
    'https://github.com/yusupmuhamad/task-manager',
    true,
    2
),
(
    'Weather Dashboard',
    'Beautiful weather application with location-based forecasts, interactive maps, detailed weather analytics, and personalized weather alerts.',
    'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop&auto=format',
    null,
    'https://weather-dashboard.example.com',
    'https://github.com/yusupmuhamad/weather-dashboard',
    false,
    3
),
(
    'Social Media Dashboard',
    'Analytics dashboard for social media management with data visualization, automated reporting, and multi-platform integration.',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format',
    null,
    'https://social-dashboard.example.com',
    'https://github.com/yusupmuhamad/social-dashboard',
    false,
    4
),
(
    'Cryptocurrency Tracker',
    'Real-time cryptocurrency tracking application with portfolio management, price alerts, and advanced trading analytics.',
    'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&h=400&fit=crop&auto=format',
    null,
    'https://crypto-tracker.example.com',
    'https://github.com/yusupmuhamad/crypto-tracker',
    false,
    5
),
(
    'Learning Management System',
    'Educational platform with course management, video streaming, interactive quizzes, progress tracking, and student analytics.',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&auto=format',
    null,
    'https://lms-platform.example.com',
    'https://github.com/yusupmuhamad/lms-platform',
    false,
    6
);

-- =============================================
-- INSERT PROJECT TECHNOLOGIES (Many-to-Many relationships)
-- =============================================

-- E-Commerce Platform technologies
WITH project AS (SELECT id FROM projects WHERE title = 'E-Commerce Platform')
INSERT INTO project_technologies (project_id, technology_id)
SELECT 
    (SELECT id FROM project),
    t.id
FROM technologies t
WHERE t.name IN ('React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS', 'Socket.io');

-- Task Management App technologies
WITH project AS (SELECT id FROM projects WHERE title = 'Task Management App')
INSERT INTO project_technologies (project_id, technology_id)
SELECT 
    (SELECT id FROM project),
    t.id
FROM technologies t
WHERE t.name IN ('Next.js', 'TypeScript', 'PostgreSQL', 'Socket.io', 'Prisma', 'Framer Motion');

-- Weather Dashboard technologies
WITH project AS (SELECT id FROM projects WHERE title = 'Weather Dashboard')
INSERT INTO project_technologies (project_id, technology_id)
SELECT 
    (SELECT id FROM project),
    t.id
FROM technologies t
WHERE t.name IN ('React', 'OpenWeather API', 'Chart.js', 'Geolocation', 'PWA');

-- Social Media Dashboard technologies
WITH project AS (SELECT id FROM projects WHERE title = 'Social Media Dashboard')
INSERT INTO project_technologies (project_id, technology_id)
SELECT 
    (SELECT id FROM project),
    t.id
FROM technologies t
WHERE t.name IN ('Vue.js', 'D3.js', 'Express.js', 'Redis', 'Docker', 'Chart.js');

-- Cryptocurrency Tracker technologies
WITH project AS (SELECT id FROM projects WHERE title = 'Cryptocurrency Tracker')
INSERT INTO project_technologies (project_id, technology_id)
SELECT 
    (SELECT id FROM project),
    t.id
FROM technologies t
WHERE t.name IN ('React', 'CoinGecko API', 'Firebase', 'PWA', 'WebSocket');

-- Learning Management System technologies
WITH project AS (SELECT id FROM projects WHERE title = 'Learning Management System')
INSERT INTO project_technologies (project_id, technology_id)
SELECT 
    (SELECT id FROM project),
    t.id
FROM technologies t
WHERE t.name IN ('Next.js', 'Supabase', 'Stripe', 'Video.js', 'Tailwind CSS', 'Prisma');

-- =============================================
-- INSERT SITE SETTINGS
-- =============================================
INSERT INTO site_settings (setting_key, setting_value, setting_type, description) VALUES
('site_title', 'Yusup Muhamad - Portfolio', 'text', 'Main site title'),
('site_description', 'Full Stack Developer passionate about creating innovative web solutions', 'text', 'Site meta description'),
('default_language', 'en', 'text', 'Default site language'),
('enable_contact_form', 'true', 'boolean', 'Enable/disable contact form'),
('github_username', 'yusupmuhamad', 'text', 'GitHub username for activity feed'),
('particles_enabled', 'true', 'boolean', 'Enable/disable particle background'),
('theme_color', '#10B981', 'text', 'Primary theme color'),
('items_per_page', '6', 'number', 'Number of items per page in admin'),
('maintenance_mode', 'false', 'boolean', 'Enable maintenance mode');

-- =============================================
-- INSERT DEFAULT ADMIN USER
-- =============================================
-- Password: admin123 (hashed with bcrypt)
-- Note: In production, use proper password hashing
INSERT INTO users (username, email, password_hash, full_name, role) VALUES
('admin', 'admin@portfolio.com', '$2b$10$rOzJqQZQZQZQZQZQZQZQZOzJqQZQZQZQZQZQZQZQZOzJqQZQZQZQZQ', 'Administrator', 'super_admin');

-- =============================================
-- SAMPLE TRANSLATIONS (English)
-- =============================================
INSERT INTO translations (translation_key, language_code, translation_value, section) VALUES
-- Header
('header.logo', 'en', '<YusupMuhamad />', 'header'),
('header.nav.home', 'en', 'Home', 'header'),
('header.nav.about', 'en', 'About', 'header'),
('header.nav.skills', 'en', 'Skills', 'header'),
('header.nav.projects', 'en', 'Projects', 'header'),
('header.nav.contact', 'en', 'Contact', 'header'),

-- Hero
('hero.greeting', 'en', 'Hello, I''m', 'hero'),
('hero.name', 'en', 'Yusup Muhamad', 'hero'),
('hero.description', 'en', 'Passionate about creating innovative web solutions with modern technologies. I transform ideas into elegant, scalable, and user-friendly applications.', 'hero'),
('hero.buttons.viewWork', 'en', 'View My Work', 'hero'),
('hero.buttons.getInTouch', 'en', 'Get In Touch', 'hero'),

-- About
('about.title', 'en', 'About Me', 'about'),
('about.subtitle', 'en', 'Passionate developer with a love for clean code and innovative solutions', 'about'),

-- Skills
('skills.title', 'en', 'Skills', 'skills'),
('skills.subtitle', 'en', 'Technologies and tools I use to bring ideas to life', 'skills'),

-- Projects
('projects.title', 'en', 'Projects', 'projects'),
('projects.subtitle', 'en', 'Some of my recent work that I''m proud to share', 'projects'),
('projects.featuredTitle', 'en', 'Featured Projects', 'projects'),
('projects.otherTitle', 'en', 'Other Projects', 'projects'),
('projects.buttons.liveDemo', 'en', 'Live Demo', 'projects'),
('projects.buttons.github', 'en', 'GitHub', 'projects'),

-- Contact
('contact.title', 'en', 'Get In Touch', 'contact'),
('contact.subtitle', 'en', 'Have a project in mind? Let''s work together to bring your ideas to life!', 'contact'),
('contact.form.name', 'en', 'Name', 'contact'),
('contact.form.email', 'en', 'Email', 'contact'),
('contact.form.message', 'en', 'Message', 'contact'),
('contact.form.submit', 'en', 'Send Message', 'contact');

-- =============================================
-- SAMPLE TRANSLATIONS (Indonesian)
-- =============================================
INSERT INTO translations (translation_key, language_code, translation_value, section) VALUES
-- Header
('header.logo', 'id', '<YusupMuhamad />', 'header'),
('header.nav.home', 'id', 'Beranda', 'header'),
('header.nav.about', 'id', 'Tentang', 'header'),
('header.nav.skills', 'id', 'Keahlian', 'header'),
('header.nav.projects', 'id', 'Proyek', 'header'),
('header.nav.contact', 'id', 'Kontak', 'header'),

-- Hero
('hero.greeting', 'id', 'Halo, saya', 'hero'),
('hero.name', 'id', 'Yusup Muhamad', 'hero'),
('hero.description', 'id', 'Bersemangat menciptakan solusi web inovatif dengan teknologi modern. Saya mengubah ide menjadi aplikasi yang elegan, scalable, dan user-friendly.', 'hero'),
('hero.buttons.viewWork', 'id', 'Lihat Karya Saya', 'hero'),
('hero.buttons.getInTouch', 'id', 'Hubungi Saya', 'hero'),

-- About
('about.title', 'id', 'Tentang Saya', 'about'),
('about.subtitle', 'id', 'Developer yang bersemangat dengan kecintaan pada kode yang bersih dan solusi inovatif', 'about'),

-- Skills
('skills.title', 'id', 'Keahlian', 'skills'),
('skills.subtitle', 'id', 'Teknologi dan tools yang saya gunakan untuk mewujudkan ide', 'skills'),

-- Projects
('projects.title', 'id', 'Proyek', 'projects'),
('projects.subtitle', 'id', 'Beberapa karya terbaru saya yang ingin saya bagikan', 'projects'),
('projects.featuredTitle', 'id', 'Proyek Unggulan', 'projects'),
('projects.otherTitle', 'id', 'Proyek Lainnya', 'projects'),
('projects.buttons.liveDemo', 'id', 'Demo Langsung', 'projects'),
('projects.buttons.github', 'id', 'GitHub', 'projects'),

-- Contact
('contact.title', 'id', 'Mari Berkolaborasi', 'contact'),
('contact.subtitle', 'id', 'Punya proyek dalam pikiran? Mari bekerja sama untuk mewujudkan ide Anda!', 'contact'),
('contact.form.name', 'id', 'Nama', 'contact'),
('contact.form.email', 'id', 'Email', 'contact'),
('contact.form.message', 'id', 'Pesan', 'contact'),
('contact.form.submit', 'id', 'Kirim Pesan', 'contact');