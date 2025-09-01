import { useLanguage } from '../contexts/LanguageContext';
import AnimatedCounter from './AnimatedCounter';

const About = () => {
  const { t } = useLanguage();
  const stats = t('about.stats');

  return (
    <section id="about" className="py-20 bg-bg-secondary/50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-green-400 font-mono">&lt;</span>
              {t('about.title')}
              <span className="text-green-400 font-mono">/&gt;</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t('about.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="space-y-6">
                {t('about.paragraphs').map((paragraph: string, index: number) => (
                  <p key={index} className="text-lg text-gray-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}

                {/* Technologies */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-green-400 mb-4 font-mono">
                    {t('about.techTitle')}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'TypeScript', 'React.js', 'Node.js',
                      'MySQL', 'PostgreSQL',
                      'Tailwind CSS', 'Git & GitHub', 'Docker', 'Laravel'
                    ].map((tech) => (
                      <div key={tech} className="flex items-center space-x-2">
                        <span className="text-green-400">▹</span>
                        <span className="text-gray-300">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Stats */}
            <div className="lg:pl-12">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat: { number: string; label: string }, index: number) => {
                  // Extract number and suffix from stat.number (e.g., "3+" -> 3 and "+")
                  const match = stat.number.match(/(\d+)(.*)/) || ['', '0', ''];
                  const numValue = parseInt(match[1]);
                  const suffix = match[2];
                  
                  return (
                    <div
                      key={index}
                      className="bg-bg-card p-6 rounded-lg border border-border-primary hover:border-accent-primary/50 transition-all duration-300 text-center group hover:transform hover:scale-105"
                    >
                      <div className="text-3xl font-bold text-accent-primary mb-2 font-mono group-hover:text-accent-secondary">
                        <AnimatedCounter 
                          end={numValue} 
                          suffix={suffix}
                          duration={2000}
                        />
                      </div>
                      <div className="text-text-tertiary group-hover:text-text-secondary">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Code Block Decoration */}
              <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="font-mono text-sm">
                  <div className="text-purple-400">const <span className="text-blue-400">developer</span> = {`{`}</div>
                  <div className="ml-4 text-gray-300">
                    name: <span className="text-green-400">'{t('about.codeComment.name')}'</span>,
                  </div>
                  <div className="ml-4 text-gray-300">
                    skills: <span className="text-yellow-400">{t('about.codeComment.skills')}</span>,
                  </div>
                  <div className="ml-4 text-gray-300">
                    passion: <span className="text-green-400">'{t('about.codeComment.passion')}'</span>
                  </div>
                  <div className="text-purple-400">{`}`}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;