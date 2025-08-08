import { integer } from 'drizzle-orm/pg-core';
import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const purchases = pgTable('purchases', {
    id: text('id').primaryKey(),
    user_id: text('username').primaryKey(),
    item_id: integer('item_id').default(0)
});

export const users = pgTable('users', {
    id: text('id').primaryKey(),
    username: text('username').notNull(),
    discriminator: text('discriminator').notNull(),
    points: integer('points').default(0),
    exp: integer('exp').default(0)
});