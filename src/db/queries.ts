"use server";
import "@/lib/server-only";

import { db } from "@/db";
import { type Url, type User, urls, users } from "@/db/schema";
import { asc, desc, eq } from "drizzle-orm";

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
		.select()
		.from(urls)
		.orderBy(asc(urls.createdAt));
	return result;
}

export async function getOneLatestUrl(): Promise<Url | null> {
	if (!process.env.DATABASE_URL) {
		return null;
	}
	const result: Url[] = await db
		.select()
		.from(urls)
		.orderBy(desc(urls.createdAt))
		.limit(1);
	const singleResult = result[0];
	return singleResult;
}

export async function getMatchingUrl(url: string): Promise<Url | null> {
	if (!process.env.DATABASE_URL) {
		return null;
	}
	const result: Url[] = await db
		.select()
		.from(urls)
		.where(eq(urls.shortUrl, url));
	const singleResult = result[0];
	return singleResult;
}
