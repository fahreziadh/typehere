import { db } from '$lib/db/db';
import { formAnswer } from '$lib/db/schemas';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const formId = params.formId;

	const dataForm = await db.query.form.findFirst({
		with: {
			contents: {
				orderBy(fields, operators) {
					return operators.asc(fields.order);
				}
			}
		},
		where(fields, operators) {
			return operators.and(
				operators.eq(fields.id, formId),
				operators.eq(fields.isPublished, true),
				operators.isNull(fields.deletedAt)
			);
		}
	});

	if (!dataForm) {
		error(404, {
			message: 'Not found'
		});
	}

	console.log('dataForm', dataForm);
	return { dataForm };
}) satisfies PageServerLoad;

/* ================ACTIONS================ */

import type { Actions } from './$types';

export const actions: Actions = {
	answerForm: async ({ request }) => {
		const data = await request.formData();
		const answers = JSON.parse(data.get('answers')?.toString() ?? '[]') as {
			answer: string;
			formContentId: string;
			type: string;
		}[];

		if (!answers || !answers.length) {
			return;
		}

		const email = answers.find((answer) => answer.type === 'email')?.answer ?? '';
		const fullName = answers.find((answer) => answer.type === 'fullname')?.answer ?? '';

		const inputAnswers = answers.map((answer) => ({
			answer: answer.answer,
			formContentId: answer.formContentId,
			email,
			fullName,
			id: crypto.randomUUID()
		}));
		await db.insert(formAnswer).values(inputAnswers);

		return {};
	}
};
