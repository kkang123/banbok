import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const member = pgTable('member', {
  id: serial('id').primaryKey(),

  email: text('email').notNull().unique(),

  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});
