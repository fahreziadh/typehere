import dayjs from 'dayjs';
import type { LayoutServerLoad } from './$types';
import {GITHUB_TOKEN} from "$env/static/private"

export const load: LayoutServerLoad = async ({ locals, platform }) => {
	let githubStar = 0;
	const oldGithubStarKv = await platform?.env?.myKv.get('githubStar'); // expected value json string {c: 'content', r: 60, lr: 'iso date string last revalidate'}

	if (oldGithubStarKv) {
		const { c, r, lr } = JSON.parse(oldGithubStarKv);
		const lastRevalidate = new Date(lr);
		const shouldRevalidate = dayjs(lastRevalidate).add(r, 'second').isBefore(dayjs());

		if (!shouldRevalidate) {
			githubStar = c;
		} else {
			githubStar = await getGithubStar();
			await platform?.env?.myKv.put(
				'githubStar',
				JSON.stringify({
					c: githubStar,
					r: 60 * 60, // 1 hour
					lr: Date.now()
				})
			);
		}
	}else{
		githubStar = await getGithubStar();
		await platform?.env?.myKv.put(
			'githubStar',
			JSON.stringify({
				c: githubStar,
				r: 60 * 60, // 1 hour
				lr: Date.now()
			})
		);
	}
	return {
		session: await locals.auth(),
		githubStar
	};
};

async function getGithubStar() {
	if (!GITHUB_TOKEN) {
		return 0;
	}


	const res = await fetch('https://api.github.com/repos/fahreziadh/typehere', {
		headers:{
			"Accept": "application/vnd.github+json",
			'X-GitHub-Api-Version': '2022-11-28',
			"User-Agent": "fahreziadh",
			'Authorization': `token ${GITHUB_TOKEN}`
		}
	});
	console.log(res.status, res.statusText)
	const data = await res.json();
	return data.stargazers_count as number;
}
