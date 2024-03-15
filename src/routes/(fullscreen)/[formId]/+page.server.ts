import { db } from '$lib/db/db';
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
	return { dataForm };
}) satisfies PageServerLoad;
