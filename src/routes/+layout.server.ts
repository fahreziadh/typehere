import dayjs from 'dayjs';
import type { LayoutServerLoad } from './$types';
import { GITHUB_TOKEN, ENVIRONMENT } from "$env/static/private"

export const load: LayoutServerLoad = async ({ locals, platform }) => {
  let githubStar = 0;
  const oldGithubStarKv = await platform?.env?.myKv.get('githubStar');

  if (oldGithubStarKv) {
    const { c, r, lr } = JSON.parse(oldGithubStarKv);
    const lastRevalidate = new Date(lr);
    const shouldRevalidate = dayjs(lastRevalidate).add(r, 'second').isBefore(dayjs());

    if (!shouldRevalidate) {
      githubStar = c;
    } else {
      githubStar = await fetchAndStoreGithubStar(platform);
    }
  } else {
    githubStar = await fetchAndStoreGithubStar(platform);
  }

  return {
    session: await locals.auth(),
    githubStar
  };
};

async function fetchAndStoreGithubStar(platform: Readonly<App.Platform> | undefined) {
  const githubStar = await getGithubStar();
  await platform?.env?.myKv.put(
    'githubStar',
    JSON.stringify({
      c: githubStar,
      r: 60 * 60, // 1 hour
      lr: Date.now()
    })
  );
  return githubStar;
}

async function getGithubStar() {
  if (!GITHUB_TOKEN || ENVIRONMENT !== 'production') {
    return 0;
  }

  try {
    const res = await fetch('https://api.github.com/repos/fahreziadh/typehere', {
      headers: {
        "Accept": "application/vnd.github+json",
        'X-GitHub-Api-Version': '2022-11-28',
        "User-Agent": "fahreziadh",
        'Authorization': `token ${GITHUB_TOKEN}`
      }
    });

    if (!res.ok) {
      console.error(`GitHub API request failed with status ${res.status}: ${res.statusText}`);
      return 0;
    }

    const data = await res.json();
    return data.stargazers_count as number;
  } catch (error) {
    console.error(`Failed to fetch GitHub star count: ${error}`);
    return 0;
  }
}