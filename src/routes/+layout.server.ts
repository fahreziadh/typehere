import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, platform }) => {
	platform?.env?.myKv.put('layout', 'server');

	console.log(await platform?.env?.myKv.get('layout'))
	return {
		session: await locals.auth()
	};
};
