import { db } from '$lib/db/db';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const session = await event.locals.auth();
	const userId = session?.user?.id;

	const listForm = await db.query.form.findMany({
		where(fields, { eq }) {
			return eq(fields.authorId, userId ?? '');
		}
	});

	return {
		listForm
	};
}) satisfies PageServerLoad;
