import { db } from '$lib/db/db';
import { form } from '$lib/db/schemas';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { nanoid } from 'nanoid';

export const load = (async (event) => {
	const session = await event.locals.auth();
	const userId = session?.user?.id;
	if (!userId) {
		return {};
	}
	const id = nanoid(7);
	await db.insert(form).values({ id: id, authorId: userId });
	return redirect(303, `/app/form/${id}`);
}) satisfies PageServerLoad;
