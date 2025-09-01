import { useLanguage } from '../contexts/LanguageContext';

const Skills = () => {
  const { t } = useLanguage();
  const skillCategories = t('skills.categories');

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-green-400 font-mono">&lt;</span>
              {t('skills.title')}
              <span className="text-green-400 font-mono">/&gt;</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t('skills.subtitle')}
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                {/* Category Header */}
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-2xl">{category.icon}</span>
                  <h3 className="text-xl font-semibold text-green-400 font-mono">
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-green-400 font-mono text-sm">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <div className="bg-gray-800/30 rounded-lg p-8 border border-gray-700">
              <h3 className="text-2xl font-semibold text-green-400 mb-4 font-mono">
                {t('skills.alwaysLearning.title')}
              </h3>
              <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                {t('skills.alwaysLearning.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;