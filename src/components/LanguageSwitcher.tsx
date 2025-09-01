import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 ${
          language === 'en'
            ? 'bg-accent-primary text-black'
            : 'text-text-secondary hover:text-accent-primary hover:bg-bg-card'
        }`}
      >
        🇺🇸 EN
      </button>
      <button
        onClick={() => setLanguage('id')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 ${
          language === 'id'
            ? 'bg-accent-primary text-black'
            : 'text-text-secondary hover:text-accent-primary hover:bg-bg-card'
        }`}
      >
        🇮🇩 ID
      </button>
    </div>
  );
};

export default LanguageSwitcher;