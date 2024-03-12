import { relations, sql } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { users } from '.';
import { formContent } from './form-content';

export const form = sqliteTable('form', {
	id: text('id').notNull().primaryKey(),
	title: text('title').default(''),
	description: text('description'),
	authorId: text('author_id').notNull(),
	createdAt: text('created_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: text('updated_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	deletedAt: text('deleted_at')
});

export const formRelation = relations(form, ({ many, one }) => ({
	author: one(users, {
		fields: [form.authorId],
		references: [users.id],
		relationName: 'author'
	}),
	contents: many(formContent)
}));
