import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const { t } = useLanguage();

  const roles = t('hero.roles');

  useEffect(() => {
    const handleType = () => {
      const current = loopNum % roles.length;
      const fullText = roles[current];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, roles]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto py-8">
          {/* Greeting */}
          <p className="text-accent-primary font-mono text-lg mb-4 animate-fade-in">
            {t('hero.greeting')}
          </p>

          {/* Name */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-text-primary via-accent-primary to-accent-secondary bg-clip-text text-transparent animate-fade-in-up">
            {t('hero.name')}
          </h1>

          {/* Typing Animation */}
          <div className="text-2xl md:text-4xl font-semibold mb-8 h-16 flex items-center justify-center">
            {/* <span className="text-text-secondary">I'm a </span> */}
            <span className="text-accent-primary font-mono ml-2">
              {text}
              <span className="animate-pulse">|</span>
            </span>
          </div>

          {/* Description */}
          <p className="text-xl text-text-tertiary mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-1000">
            {t('hero.description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-1500 mb-10">
            <a
              href="#projects"
              className="px-8 py-4 bg-accent-primary text-black font-semibold rounded-lg hover:bg-accent-primary/80 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-accent-primary/25"
            >
              {t('hero.buttons.viewWork')}
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border-2 border-accent-primary text-accent-primary font-semibold rounded-lg hover:bg-accent-primary hover:text-black transition-all duration-300 transform hover:scale-105"
            >
              {t('hero.buttons.getInTouch')}
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center animate-bounce">
            <svg className="w-6 h-6 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;