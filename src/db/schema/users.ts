import { urls } from "@/db/schema/urls";
import { createId } from "@paralleldrive/cuid2";
import { relations, sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
	id: text("id", { length: 128 })
		.$defaultFn(() => createId())
		.notNull()
		.primaryKey(),
	email: text("email").notNull().unique(),
	createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
	urls: many(urls),
}));
