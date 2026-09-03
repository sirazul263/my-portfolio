import { site } from "@/content/site";

export type GithubRepo = {
  name: string;
  url: string;
  description: string | null;
  language: string | null;
  homepage: string | null;
  pushedAt: string;
  stars: number;
  /** Repository size in KB, as reported by GitHub. */
  size: number;
};

export type GithubProfile = {
  publicRepos: number;
  followers: number;
  /** Every non-fork repository, most recently pushed first. */
  repos: GithubRepo[];
  languages: { name: string; count: number }[];
};

type RawRepo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  homepage: string | null;
  pushed_at: string;
  stargazers_count: number;
  size: number;
  fork: boolean;
};

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  PHP: "#4f5d95",
  Blade: "#f7523f",
  HTML: "#e34c26",
  CSS: "#663399",
  Python: "#3572a5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  Dart: "#00b4ab",
  Vue: "#41b883",
};

export function languageColor(language: string | null) {
  return (language && LANGUAGE_COLORS[language]) || "var(--accent)";
}

export function formatRepoSize(kb: number) {
  return kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`;
}

function headers(): HeadersInit {
  return {
    Accept: "application/vnd.github+json",
    "User-Agent": "sirazul-portfolio",
    ...(process.env.GITHUB_TOKEN
      ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
      : {}),
  };
}

/**
 * Public GitHub data, revalidated hourly. Returns null on any failure so the
 * UI can degrade gracefully (rate limits, offline builds).
 */
export async function getGithubProfile(): Promise<GithubProfile | null> {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${site.githubUser}`, {
        headers: headers(),
        next: { revalidate: 3600 },
      }),
      fetch(
        `https://api.github.com/users/${site.githubUser}/repos?per_page=100&sort=pushed`,
        { headers: headers(), next: { revalidate: 3600 } },
      ),
    ]);
    if (!userRes.ok || !reposRes.ok) return null;

    const user = (await userRes.json()) as {
      public_repos: number;
      followers: number;
    };
    const raw = (await reposRes.json()) as RawRepo[];

    const repos = raw
      .filter((r) => !r.fork)
      .map<GithubRepo>((r) => ({
        name: r.name,
        url: r.html_url,
        description: r.description,
        language: r.language,
        homepage: r.homepage || null,
        pushedAt: r.pushed_at,
        stars: r.stargazers_count,
        size: r.size,
      }));

    const langCount = new Map<string, number>();
    for (const r of repos) {
      if (r.language) {
        langCount.set(r.language, (langCount.get(r.language) ?? 0) + 1);
      }
    }

    return {
      publicRepos: user.public_repos,
      followers: user.followers,
      repos,
      languages: [...langCount.entries()]
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5),
    };
  } catch {
    return null;
  }
}
