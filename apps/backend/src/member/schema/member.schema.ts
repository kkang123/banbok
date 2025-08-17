import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const member = pgTable('member', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  provider: text('provider').notNull(),
  providerId: text('providerId').notNull(),
  profileImage: text('profileImage'),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow(),
});
