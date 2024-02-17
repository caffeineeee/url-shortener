import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const urls = sqliteTable("urls", {
	id: text("id", { length: 128 }).primaryKey().notNull(),
	longUrl: text("long_url").notNull(),
	shortUrl: text("short_url").unique().notNull(),
	createdBy: text("created_by")
		.references(() => users.email, { onDelete: "cascade" })
		.notNull(),
	createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const users = sqliteTable("users", {
	id: text("id", { length: 128 }).primaryKey().notNull(),
	email: text("email").unique().notNull(),
	createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Url = typeof urls.$inferSelect;
export type NewUrl = typeof urls.$inferInsert;
