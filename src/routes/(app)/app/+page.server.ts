import { db } from '$lib/db/db';
import { eq, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { form } from '$lib/db/schemas';

export const load = (async (event) => {
	const session = await event.locals.auth();
	const userId = session?.user?.id;
	const page = parseInt(event.url.searchParams.get('page') ?? '1');
	return {
		dataForms: data.getAllFormByUserId(userId, page)
	};
}) satisfies PageServerLoad;

const data = {
	getAllFormByUserId: async (userId?: string, page: number = 1) => {
		if (!userId) throw new Error('User not found');
		const listForms = await db.query.form.findMany({
			orderBy(fields, operators) {
				return operators.desc(fields.createdAt);
			},
			where(fields, { eq }) {
				return eq(fields.authorId, userId ?? '');
			},
			limit: 18,
			offset: page - 1
		});

		const totalForms = await db
			.select({ total: sql<number>`cast(count(${form.id}) as int)` })
			.from(form)
			.where(eq(form.authorId, userId ?? '')).then((res) => res[0].total);

		const pagination = {
			page,
			totalPages: Math.ceil(totalForms / 18),
			hasPrevPage: page > 1,
			hasNextPage: totalForms > page * 18,
		};
		return { listForms, pagination };
	}
};
