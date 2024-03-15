import dayjs from 'dayjs';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, platform }) => {
	let githubStar = 0;
	const oldGithubStarKv = await platform?.env?.myKv.get('githubStar'); // expected value json string {c: 'content', r: 60, lr: 'iso date string last revalidate'}

	if (oldGithubStarKv) {
		const { c, r, lr } = JSON.parse(oldGithubStarKv);
		const lastRevalidate = new Date(lr);
		const shouldRevalidate = dayjs(lastRevalidate).add(r, 'second').isBefore(dayjs());

		if (shouldRevalidate) {
			githubStar = await getGithubStar();
			await platform?.env?.myKv.put(
				'githubStar',
				JSON.stringify({
					c: githubStar,
					r: 60 * 60, // 1 hour
					lr: new Date().toISOString()
				})
			);
		} else {
			githubStar = c;
		}
	}
	return {
		session: await locals.auth(),
		githubStar
	};
};

async function getGithubStar() {
	const res = await fetch('https://api.github.com/repos/fahreziadh/typehere');
	const data = await res.json();
	return data.stargazers_count as number;
}
