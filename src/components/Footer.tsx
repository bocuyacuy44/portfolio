import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="text-2xl font-mono font-bold text-green-400 mb-4">
                {t('header.logo')}
              </div>
              <p className="text-gray-400 leading-relaxed">
                {t('footer.description')}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">{t('footer.quickLinks')}</h3>
              <div className="space-y-2">
                {[
                  { name: t('header.nav.home'), href: '#home' },
                  { name: t('header.nav.about'), href: '#about' },
                  { name: t('header.nav.skills'), href: '#skills' },
                  { name: t('header.nav.projects'), href: '#projects' },
                  { name: t('header.nav.contact'), href: '#contact' }
                ].map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block text-gray-400 hover:text-green-400 transition-colors duration-300"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">{t('footer.getInTouch')}</h3>
              <div className="space-y-2 text-gray-400">
                {t('contact.info').map((info: any, index: number) => (
                  <p key={index}>{info.icon} {info.value}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} {t('hero.name')}. {t('footer.copyright')}
            </p>
            <p className="text-gray-400 text-sm mt-4 md:mt-0">
              {t('footer.builtWith')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;