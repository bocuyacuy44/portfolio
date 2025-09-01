import { useState } from 'react';
import LazyImage from './LazyImage';

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    image: string;
    video?: string;
    technologies: string[];
    liveUrl: string;
    githubUrl: string;
    featured?: boolean;
    screenshots?: string[];
  };
  index: number;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isScreenshotOpen, setIsScreenshotOpen] = useState(false);
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);

  // Placeholder content for non-featured projects
  const placeholderSvg = "<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><rect width='100%' height='100%' fill='#111827'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#9CA3AF' font-size='96' font-family='monospace'>?</text></svg>";
  const placeholderSrc = `data:image/svg+xml;utf8,${encodeURIComponent(placeholderSvg)}`;

  const displayedImage = project.featured ? project.image : placeholderSrc;
  const displayedTitle = project.featured ? project.title : 'Segera Hadir';
  const displayedDescription = project.featured ? project.description : 'Konten proyek akan segera hadir.';
  const displayedTechnologies = project.featured ? project.technologies : ['Segera Hadir'];

  return (
    <>
      <div
        className={`group relative overflow-hidden rounded-xl border border-border-primary hover:border-accent-primary/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${project.featured ? 'bg-bg-card' : 'bg-bg-card/80'
          }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Project Image/Video */}
        <div className="relative h-48 md:h-56 overflow-hidden">
          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-bg-secondary animate-pulse">
              <div className="flex items-center justify-center h-full">
                <div className="w-12 h-12 border-4 border-accent-primary/30 border-t-accent-primary rounded-full animate-spin"></div>
              </div>
            </div>
          )}

          {/* Main Image */}
          <LazyImage
            src={displayedImage}
            alt={displayedTitle}
            className={`w-full h-full transition-all duration-700 ${isHovered ? 'scale-110' : 'scale-100'
              }`}
            fit="contain"
            onLoad={() => setImageLoaded(true)}
          />

          {/* Video Preview on Hover (if available) */}
          {project.video && isHovered && (
            <video
              src={project.video}
              autoPlay
              muted
              loop
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            />
          )}

          {/* Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-60'
            }`} />

          {/* Coming Soon Badge for non-featured */}
          {!project.featured && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-yellow-400 text-black text-sm font-semibold rounded-full">
              Segera Hadir
            </div>
          )}

          {/* Action Buttons */}
          {project.featured && (
            <div className={`absolute inset-0 flex items-center justify-center space-x-4 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
              <button
                type="button"
                onClick={() => { setCurrentScreenshotIndex(0); setIsScreenshotOpen(true); }}
                className="px-6 py-3 bg-accent-primary text-black font-semibold rounded-lg hover:bg-accent-primary/80 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <span className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h4l2-3h6l2 3h4v12H3V7zm9 10a4 4 0 100-8 4 4 0 000 8z" />
                  </svg>
                  <span>Screenshot Aplikasi</span>
                </span>
              </button>
              {/*
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
          >
            <span className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
                <span>GitHub</span>
            </span>
          </a>
            */}
            </div>
          )}

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-accent-primary text-black text-sm font-semibold rounded-full">
              Featured
            </div>
          )}
        </div>

        {/* Project Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-text-primary mb-3 group-hover:text-accent-primary transition-colors duration-300">
            {displayedTitle}
          </h3>
          <p className="text-text-secondary mb-4 leading-relaxed line-clamp-3">
            {displayedDescription}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {displayedTechnologies.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-3 py-1 bg-bg-secondary text-accent-primary rounded-full text-sm font-mono border border-border-primary hover:border-accent-primary/50 transition-colors duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Animated Border */}
        <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
          style={{ padding: '2px' }}>
          <div className="w-full h-full bg-bg-card rounded-lg"></div>
        </div>
      </div>
      {project.featured && isScreenshotOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80"
          onClick={() => setIsScreenshotOpen(false)}
        >
          <div
            className="relative max-w-3xl w-[90%] bg-bg-card border border-border-primary rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Close"
              onClick={() => setIsScreenshotOpen(false)}
              className="absolute top-3 right-3 p-2 rounded-md bg-bg-secondary/80 hover:bg-bg-secondary text-text-primary border border-border-primary"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-4 md:p-6">
              <h4 className="text-lg font-semibold mb-4 text-text-primary">Screenshot Aplikasi</h4>
              <div className="relative w-full overflow-hidden rounded-lg border border-border-primary bg-bg-secondary">
                <LazyImage
                  src={(project.screenshots && project.screenshots.length > 0 ? project.screenshots[currentScreenshotIndex] : project.image)}
                  alt={`${project.title} - Screenshot ${currentScreenshotIndex + 1}`}
                  className="w-full"
                  imgClassName="w-full h-auto max-h-[70vh] object-contain"
                  fit="contain"
                />

                {(project.screenshots && project.screenshots.length > 1) && (
                  <>
                    <button
                      type="button"
                      aria-label="Sebelumnya"
                      onClick={(e) => {
                        e.stopPropagation(); setCurrentScreenshotIndex((prev) => {
                          const total = project.screenshots ? project.screenshots.length : 1;
                          return (prev - 1 + total) % total;
                        });
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-bg-card/80 border border-border-primary hover:bg-bg-card text-text-primary"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      aria-label="Berikutnya"
                      onClick={(e) => {
                        e.stopPropagation(); setCurrentScreenshotIndex((prev) => {
                          const total = project.screenshots ? project.screenshots.length : 1;
                          return (prev + 1) % total;
                        });
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-bg-card/80 border border-border-primary hover:bg-bg-card text-text-primary"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
              {(project.screenshots && project.screenshots.length > 1) && (
                <div className="mt-4 flex items-center justify-center gap-2">
                  {project.screenshots!.map((_, dotIndex) => (
                    <button
                      key={dotIndex}
                      type="button"
                      aria-label={`Go to slide ${dotIndex + 1}`}
                      onClick={(e) => { e.stopPropagation(); setCurrentScreenshotIndex(dotIndex); }}
                      className={`w-2.5 h-2.5 rounded-full border border-border-primary ${dotIndex === currentScreenshotIndex ? 'bg-accent-primary' : 'bg-bg-secondary hover:bg-bg-card'
                        }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;