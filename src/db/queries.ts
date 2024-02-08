"use server";
import "@/lib/server-only";

import { db } from "@/db";
import { type Url, type User, urls, users } from "@/db/schema";
import { asc, desc } from "drizzle-orm";

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
	const result: User[] = await db
		.select({
			id: users.id,
			email: users.email,
			createdAt: users.createdAt,
		})
		.from(users)
		.orderBy(desc(users.createdAt));
	return result;
}

export async function getAllUrls() {
	if (!process.env.DATABASE_URL) {
		return [];
	}
	const result: Url[] = await db
		.select({
			id: urls.id,
			longUrl: urls.longUrl,
			shortUrl: urls.shortUrl,
			createdBy: urls.createdBy,
			createdAt: urls.createdAt,
		})
		.from(urls)
		.orderBy(asc(urls.createdAt));
	return result;
}
