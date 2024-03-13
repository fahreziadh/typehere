import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { form } from './form';

export const formContent = sqliteTable('form_content', {
	id: text('id').notNull().primaryKey(),
	formId: text('form_id').notNull(),
	content: text('content', { mode: 'json' }), // should be formated as JSON
	order: integer('order'),
	createdAt: text('created_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: text('updated_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	deletedAt: text('deleted_at')
});

export const formContentRelation = relations(formContent, ({ one }) => ({
	form: one(form, {
		fields: [formContent.formId],
		references: [form.id],
		relationName: 'form'
	})
}));
