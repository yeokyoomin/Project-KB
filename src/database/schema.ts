import { integer } from 'drizzle-orm/pg-core';
import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const purchases = pgTable('purchases', {
    user_id: text('user_id').primaryKey(),
    item_id: text('item_id').notNull()
});

export const users = pgTable('users', {
    id: text('id').primaryKey(),
    username: text('username').notNull(),
    discriminator: text('discriminator').notNull(),
    points: integer('points').default(0)
});