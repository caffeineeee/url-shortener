import { users } from "@/db/schema/users";
import { createId } from "@paralleldrive/cuid2";
import { relations, sql } from "drizzle-orm";
import { index, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const urls = sqliteTable(
	"urls",
	{
		id: text("id", { length: 128 })
			.$defaultFn(() => createId())
			.notNull()
			.primaryKey(),
		longUrl: text("long_url").notNull(),
		shortUrl: text("short_url").notNull().unique(),
		createdBy: text("created_by")
			.notNull()
			.references(() => users.id),
		createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
	},
	(table) => {
		return {
			nameIdx: index("short_url_idx").on(table.shortUrl),
		};
	},
);

export const urlsRelations = relations(urls, ({ one }) => ({
	author: one(users, {
		fields: [urls.createdBy],
		references: [users.id],
	}),
}));
