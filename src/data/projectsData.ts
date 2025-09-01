import dental1 from '@assets/garutDentalCare.jpg';
import dental2 from '@assets/garutDentalCare1.jpg';
import dental3 from '@assets/garutDentalCare2.jpg';
import dental4 from '@assets/garutDentalCare3.jpg';
import dental5 from '@assets/garutDentalCare4.jpg';
import dental6 from '@assets/garutDentalCare5.jpg';
import dental7 from '@assets/garutDentalCare6.jpg';
import dental8 from '@assets/garutDentalCare7.jpg';
import rumfee1 from '@assets/rumfee.jpg';
import rumfee2 from '@assets/rumfee1.jpg';
import rumfee3 from '@assets/rumfee2.jpg';
import rumfee4 from '@assets/rumfee3.jpg';
import rumfee5 from '@assets/rumfee4.jpg';


export const projectsData = [
  {
    title: 'Garut Dental Care',
    description: 'Sistem informasi manajemen klinik gigi berbasis web untuk memudahkan administrasi, penjadwalan, dan pengelolaan rekam medis secara digital bagi klinik dental care garut.',
    image: dental1,
    video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4', // Demo video
    screenshots: [dental2, dental3, dental4, dental5, dental6, dental7, dental8],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', "JavaScript"],
    liveUrl: 'https://demo-ecommerce.example.com',
    githubUrl: 'https://github.com/yusupmuhamad/ecommerce-platform',
    featured: true
  },
  {
    title: 'Rumfee',
    description: 'Apliksi berbasis web dengan tampilan mobile first untuk pembelian makanan dan minuman secara online, dengan terintegrasi dengan pembayaran midtrans.',
    image: rumfee1,
    video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    screenshots: [rumfee2, rumfee3, rumfee4, rumfee5],
    technologies: ['PHP', 'MySQL', 'CSS', 'XAMPP', 'Midtrans', 'JavaScript'],
    liveUrl: 'https://taskmanager-demo.example.com',
    githubUrl: 'https://github.com/yusupmuhamad/task-manager',
    featured: true
  },
  {
    title: 'Weather Dashboard',
    description: 'Beautiful weather application with location-based forecasts, interactive maps, detailed weather analytics, and personalized weather alerts.',
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop&auto=format',
    technologies: ['React', 'OpenWeather API', 'Chart.js', 'Geolocation', 'PWA'],
    liveUrl: 'https://weather-dashboard.example.com',
    githubUrl: 'https://github.com/yusupmuhamad/weather-dashboard',
    featured: false
  },
  {
    title: 'Social Media Dashboard',
    description: 'Analytics dashboard for social media management with data visualization, automated reporting, and multi-platform integration.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&auto=format',
    technologies: ['Vue.js', 'D3.js', 'Express.js', 'Redis', 'Docker', 'Chart.js'],
    liveUrl: 'https://social-dashboard.example.com',
    githubUrl: 'https://github.com/yusupmuhamad/social-dashboard',
    featured: false
  },
  {
    title: 'Cryptocurrency Tracker',
    description: 'Real-time cryptocurrency tracking application with portfolio management, price alerts, and advanced trading analytics.',
    image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&h=400&fit=crop&auto=format',
    technologies: ['React', 'CoinGecko API', 'Firebase', 'PWA', 'WebSocket'],
    liveUrl: 'https://crypto-tracker.example.com',
    githubUrl: 'https://github.com/yusupmuhamad/crypto-tracker',
    featured: false
  },
  {
    title: 'Learning Management System',
    description: 'Educational platform with course management, video streaming, interactive quizzes, progress tracking, and student analytics.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&auto=format',
    technologies: ['Next.js', 'Supabase', 'Stripe', 'Video.js', 'Tailwind', 'Prisma'],
    liveUrl: 'https://lms-platform.example.com',
    githubUrl: 'https://github.com/yusupmuhamad/lms-platform',
    featured: false
  }
];