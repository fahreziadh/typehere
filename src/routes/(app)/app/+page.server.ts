import { db } from '$lib/db/db';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const session = await event.locals.auth();
	const userId = session?.user?.id;

	return {
		listForm: data.getAllFormByUserId(userId)
	};
}) satisfies PageServerLoad;

const data = {
	getAllFormByUserId: async (userId?: string) => {
		if (!userId) throw new Error('User not found');

		return await db.query.form.findMany({
			where(fields, { eq }) {
				return eq(fields.authorId, userId ?? '');
			},
			limit: 18,
			offset: 0
		});
	}
};
