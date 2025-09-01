import './App.css'
import { LanguageProvider } from './contexts/LanguageContext'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import GitHubActivity from './components/GitHubActivity'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-bg-primary text-text-primary">
        <Header />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <GitHubActivity />
        <Contact />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
