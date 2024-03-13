import { db } from '$lib/db/db';
import { form, formContent } from '$lib/db/schemas';
import { and, eq, gte, ne, sql } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	return {
		form: await data.getFormById(params.id)
	};
}) satisfies PageServerLoad;

const data = {
	getFormById: async (id: string) => {
		if (!id) throw new Error('Need id bruh!');

		return await db.query.form.findFirst({
			with: {
				contents: {
					orderBy(fields, operators) {
						return operators.asc(fields.order);
					}
				}
			},
			where(fields, { eq }) {
				return eq(fields.id, id ?? '');
			}
		});
	}
};

/* ================ACTIONS================ */

import type { Actions } from './$types';

export const actions = {
	updateForm: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id')?.toString();
		const title = data.get('title')?.toString();

		await db
			.update(form)
			.set({
				title: title ?? ''
			})
			.where(eq(form.id, id ?? ''));
	},
	addMoreContent: async ({ request }) => {
		const data = await request.formData();
		const formId = data.get('formId')?.toString();
		const content = data.get('content')?.toString();
		const order = data.get('order')?.toString();
		const id = data.get('id')?.toString();

		if (!formId || !id) {
			return;
		}

		await db.insert(formContent).values({
			id: id,
			formId: formId,
			order: parseInt(order ?? '1'),
			content: content ?? ''
		});

		await db
			.update(formContent)
			.set({
				order: sql`${formContent.order}+1`
			})
			.where(
				and(
					ne(formContent.id, id),
					eq(formContent.formId, formId ?? ''),
					gte(formContent.order, parseInt(order ?? '1'))
				)
			);
	},
	deleteContent: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id')?.toString();
		const formId = data.get('formId')?.toString();
		const order = data.get('order')?.toString();

		if (!formId || !id) {
			return;
		}

		await db.delete(formContent).where(eq(formContent.id, id ?? ''));

		await db
			.update(formContent)
			.set({
				order: sql`${formContent.order}-1`
			})
			.where(
				and(
					eq(formContent.formId, formId ?? ''),
					gte(formContent.order, parseInt(order ?? '1'))
				)
			);
	},
	updateContent: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id')?.toString();
		const content = data.get('content')?.toString();

		await db
			.update(formContent)
			.set({
				content: content ?? ''
			})
			.where(eq(formContent.id, id ?? ''));
	}
} satisfies Actions;
