import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface GitHubEvent {
  id: string;
  type: string;
  actor: {
    login: string;
    avatar_url: string;
  };
  repo: {
    name: string;
    url: string;
  };
  payload: any;
  created_at: string;
}

const GitHubActivity = () => {
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // GitHub username - ganti dengan username GitHub Anda yang sebenarnya
  const githubUsername = 'bocuyacuy44'; // Demo username, ganti dengan username GitHub Anda

  useEffect(() => {
    const fetchGitHubActivity = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.github.com/users/${githubUsername}/events/public`);

        if (!response.ok) {
          throw new Error('Failed to fetch GitHub activity');
        }

        const data = await response.json();
        setEvents(data.slice(0, 10)); // Ambil 10 aktivitas terbaru
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        // Fallback data untuk demo
        setEvents([
          {
            id: '1',
            type: 'PushEvent',
            actor: { login: githubUsername, avatar_url: 'https://github.com/github.png' },
            repo: { name: 'yusupmuhamad/portfolio-website', url: 'https://github.com/yusupmuhamad/portfolio-website' },
            payload: { commits: [{ message: 'Add dark theme implementation' }] },
            created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '2',
            type: 'CreateEvent',
            actor: { login: githubUsername, avatar_url: 'https://github.com/github.png' },
            repo: { name: 'yusupmuhamad/react-components', url: 'https://github.com/yusupmuhamad/react-components' },
            payload: { ref_type: 'repository' },
            created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '3',
            type: 'IssuesEvent',
            actor: { login: githubUsername, avatar_url: 'https://github.com/github.png' },
            repo: { name: 'yusupmuhamad/task-manager', url: 'https://github.com/yusupmuhamad/task-manager' },
            payload: { action: 'opened', issue: { title: 'Add real-time notifications' } },
            created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubActivity();
  }, [githubUsername]);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'PushEvent':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
        );
      case 'CreateEvent':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
          </svg>
        );
      case 'IssuesEvent':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0z" />
          </svg>
        );
      case 'PullRequestEvent':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M7.177 3.073L9.573.677A.25.25 0 0 1 10 .854v4.792a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354zM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zm-2.25.75a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25zM11 2.5h-1V4h1a1 1 0 0 1 1 1v5.628a2.251 2.251 0 1 1-1.5 0V5a2.5 2.5 0 0 0-2.5-2.5h-1v-1.5h1A4 4 0 0 1 12 5v5.628a2.251 2.251 0 1 1-1.5 0V5a2.5 2.5 0 0 0-2.5-2.5z" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />
          </svg>
        );
    }
  };

  const getEventDescription = (event: GitHubEvent) => {
    const repoName = event.repo.name.split('/')[1];

    switch (event.type) {
      case 'PushEvent':
        const commitCount = event.payload.commits?.length || 1;
        const commitMessage = event.payload.commits?.[0]?.message || 'Updated code';
        return `Pushed ${commitCount} commit${commitCount > 1 ? 's' : ''} to ${repoName}: "${commitMessage}"`;

      case 'CreateEvent':
        if (event.payload.ref_type === 'repository') {
          return `Created repository ${repoName}`;
        }
        return `Created ${event.payload.ref_type} ${event.payload.ref} in ${repoName}`;

      case 'IssuesEvent':
        const action = event.payload.action;
        const issueTitle = event.payload.issue?.title || 'issue';
        return `${action.charAt(0).toUpperCase() + action.slice(1)} issue in ${repoName}: "${issueTitle}"`;

      case 'PullRequestEvent':
        const prAction = event.payload.action;
        const prTitle = event.payload.pull_request?.title || 'pull request';
        return `${prAction.charAt(0).toUpperCase() + prAction.slice(1)} pull request in ${repoName}: "${prTitle}"`;

      case 'WatchEvent':
        return `Starred ${repoName}`;

      case 'ForkEvent':
        return `Forked ${repoName}`;

      default:
        return `Activity in ${repoName}`;
    }
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <section id="github" className="py-20 bg-bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-accent-primary font-mono">&lt;</span>
              GitHub Activity
              <span className="text-accent-primary font-mono">/&gt;</span>
            </h2>
            <p className="text-xl text-text-tertiary">
              Latest contributions and activities from my GitHub
            </p>
          </div>

          {/* Collapse Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="flex items-center space-x-2 px-4 py-2 bg-bg-card border border-border-primary rounded-lg hover:border-accent-primary/50 transition-all duration-300 group"
            >
              <span className="text-text-secondary group-hover:text-accent-primary text-sm font-medium">
                {isCollapsed ? 'Show Activity' : 'Hide Activity'}
              </span>
              <svg
                className={`w-4 h-4 text-text-secondary group-hover:text-accent-primary transition-all duration-300 ${isCollapsed ? 'rotate-180' : 'rotate-0'
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* GitHub Activity Feed */}
          <div className={`bg-bg-card rounded-xl border border-border-primary transition-all duration-500 overflow-hidden ${isCollapsed ? 'max-h-40 opacity-70' : 'max-h-none opacity-100'
            }`}>
            <div className="p-6">
              {loading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-start space-x-4 animate-pulse">
                      <div className="w-8 h-8 bg-bg-secondary rounded-full"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-bg-secondary rounded w-3/4"></div>
                        <div className="h-3 bg-bg-secondary rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <div className="text-red-400 mb-2">⚠️ Unable to load GitHub activity</div>
                  <div className="text-text-tertiary text-sm">Showing demo data instead</div>
                </div>
              ) : null}

              {/* Activity List */}
              {!isCollapsed && (
                <div className="space-y-4">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-bg-secondary/50 transition-colors duration-300 group"
                    >
                      {/* Event Icon */}
                      <div className="flex-shrink-0 w-8 h-8 bg-accent-primary/10 rounded-full flex items-center justify-center text-accent-primary group-hover:bg-accent-primary/20 transition-colors">
                        {getEventIcon(event.type)}
                      </div>

                      {/* Event Content */}
                      <div className="flex-1 min-w-0">
                        <p className="text-text-secondary text-sm leading-relaxed">
                          {getEventDescription(event)}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-text-muted">
                          <span>{getTimeAgo(event.created_at)}</span>
                          <a
                            href={`https://github.com/${event.repo.name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-accent-primary transition-colors"
                          >
                            View Repository →
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Collapsed State Preview */}
              {isCollapsed && (
                <div className="text-center py-6">
                  <div className="text-text-tertiary">
                    <svg className="w-6 h-6 mx-auto mb-2 opacity-60" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <p className="text-sm font-medium">GitHub Activity Hidden</p>
                    <p className="text-xs mt-1 opacity-75">Click "Show Activity" above to view recent activities</p>
                  </div>
                </div>
              )}

              {/* GitHub Profile Link */}
              {!isCollapsed && (
                <div className="mt-8 pt-6 border-t border-border-primary text-center">
                  <a
                    href={`https://github.com/${githubUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-accent-primary text-black font-semibold rounded-lg hover:bg-accent-primary/80 transition-all duration-300 transform hover:scale-105"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span>View Full GitHub Profile</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubActivity;