import { db } from '$lib/db/db';
import { form, formContent } from '$lib/db/schemas';
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
	await db
		.insert(formContent)
		.values({
			id: crypto.randomUUID(),
			formId: id,
			order: 1,
			content: JSON.stringify({ title: '', type: 'identity', description: '', email: true, fullname: true })
		});
	return redirect(303, `/app/form/${id}`);
}) satisfies PageServerLoad;
