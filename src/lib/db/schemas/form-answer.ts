import { relations, sql } from 'drizzle-orm';
import { index,  sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { formContent } from './form-content';

export const formAnswer = sqliteTable(
	'form_answer',
	{
		id: text('id').notNull().primaryKey(),
		formContentId: text('form_content_id').notNull(),
    email: text('email'),
    fullName: text('full_name'),
		answer: text('content'),
		createdAt: text('created_at')
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		updatedAt: text('updated_at')
			.default(sql`CURRENT_TIMESTAMP`)
			.notNull(),
		deletedAt: text('deleted_at')
	},
	(table) => {
		return {
			formContentIdIndex: index('form_content_id_index').on(table.formContentId),
      contentAndEmailAnswerIndex: index('content_email_index').on(table.formContentId, table.email),
		};
	}
);

export const formAnswerRelation = relations(formAnswer, ({ one }) => ({
	formContent: one(formContent, {
		fields: [formAnswer.formContentId],
		references: [formContent.id],
		relationName: 'form'
	})
}));
