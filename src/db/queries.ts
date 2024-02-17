"use server";
import "@/lib/server-only";

import { db } from "@/db";
import { type Url, type User, urls, users } from "@/db/schema";
import { asc, desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getAllUsers(): Promise<User[] | null | undefined> {
	if (!process.env.DATABASE_URL) {
		return [];
	}

	try {
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
	} catch (error) {
		console.error(error);
	}
}

export async function getAllUrlsAsc(): Promise<Url[] | null | undefined> {
	if (!process.env.DATABASE_URL) {
		return [];
	}

	try {
		const result: Url[] = await db
			.select()
			.from(urls)
			.orderBy(asc(urls.createdAt));
		revalidatePath("/");
		return result;
	} catch (error) {
		console.error(error);
	}
}

export async function getAllUrlsDesc(): Promise<Url[] | null | undefined> {
	if (!process.env.DATABASE_URL) {
		return [];
	}

	try {
		const result: Url[] = await db
			.select()
			.from(urls)
			.orderBy(desc(urls.createdAt));
		revalidatePath("/");
		return result;
	} catch (error) {
		console.error(error);
	}
}

export async function getOneLatestUrl(): Promise<Url | null | undefined> {
	if (!process.env.DATABASE_URL) {
		return null;
	}
	try {
		const result: Url[] = await db
			.select()
			.from(urls)
			.orderBy(desc(urls.createdAt))
			.limit(1);
		const singleResult = result[0];
		return singleResult;
	} catch (error) {
		console.error(error);
	}
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
