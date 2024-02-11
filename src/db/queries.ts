"use server";
import "@/lib/server-only";

import { db } from "@/db";
import { type Url, type User, urls, users } from "@/db/schema";
import { asc, desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

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
	revalidatePath("/");
	return result;
}

export async function getAllUrlsAsc() {
	if (!process.env.DATABASE_URL) {
		return [];
	}
	const result: Url[] = await db
		.select()
		.from(urls)
		.orderBy(asc(urls.createdAt));
	revalidatePath("/");
	return result;
}

export async function getAllUrlsDesc() {
	if (!process.env.DATABASE_URL) {
		return [];
	}
	const result: Url[] = await db
		.select()
		.from(urls)
		.orderBy(desc(urls.createdAt));
	revalidatePath("/");
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
