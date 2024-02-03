"use server";

import { db } from "@/db";
import { urls } from "@/db/schema/urls";
import { users } from "@/db/schema/users";
import { desc } from "drizzle-orm";

// export async function getUsersEntries() {
// 	if (!process.env.DATABASE_URL) {
// 		return [];
// 	}
// 	const entries = db
// 		.select({
// 			id: users.id,
// 			body: users.body,
// 			created_by: users.created_by,
// 		})
// 		.from(users)
// 		.orderBy(desc(users.created_at))
// 		.limit(100);
// 	return entries;
// }

export async function getAllUsers() {
	if (!process.env.DATABASE_URL) {
		return [];
	}
	const allUsers = db
		.select({
			id: users.id,
			email: users.email,
			createdAt: users.createdAt,
		})
		.from(users)
		.orderBy(desc(users.createdAt));
	return allUsers;
}
