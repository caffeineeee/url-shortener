"use server";
import "@/lib/server-only";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { db } from "@/db";
import { type Url, urls, users } from "@/db/schema";
import { createShortUrl } from "@/lib/utils";
import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { type Profile, type Session, getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

async function getSession(): Promise<Session> {
	const session = (await getServerSession(authOptions)) as Session;
	if (!session || !session.user) {
		throw new Error("Unauthorized");
	}
	return session;
}

// export async function deleteUser(id: number) {
// 	try {
// 		await db.delete(users).where(eq(users.id, id));
// 	} catch (error) {
// 		console.error("Error in deleteUser: ", error);
// 	}
// 	revalidatePath("/users");
// }

export async function insertUrl(formData: FormData) {
	const session = await getSession();

	if (!session.user) {
		throw new Error("Unauthorized");
	}

	const urlId = createId();

	const getExistingShortUrl: Url[] = await db
		.select()
		.from(urls)
		.where(eq(urls.id, urlId));

	const isSameShortUrlExist = getExistingShortUrl.length > 0;

	if (isSameShortUrlExist) {
		console.log("The same shortUrl already exists!");
		console.log("shortUrl: ", getExistingShortUrl[0].shortUrl);
		return getExistingShortUrl[0].shortUrl;
	}

	const longUrl = formData.get("longUrl")?.toString() || "";
	const longUrlBuffer = Buffer.from(longUrl);
	const shortUrl = createShortUrl(longUrlBuffer);
	const createdBy = session?.user?.email ?? "";

	try {
		const insertedUrl = await db
			.insert(urls)
			.values({
				id: urlId,
				longUrl: longUrl,
				shortUrl: shortUrl,
				createdBy: createdBy,
			})
			.onConflictDoNothing({ target: urls.shortUrl });
		return insertedUrl;
	} catch (error) {
		console.error(error);
	}
	revalidatePath("/");
}

export async function insertUser(profile?: Profile) {
	const userId = createId();

	try {
		const insertedUser = await db
			.insert(users)
			.values({
				id: userId,
				email: profile?.email ?? "",
			})
			.onConflictDoNothing({ target: users.email });

		return insertedUser;
	} catch (error) {
		console.error(error);
	}
}
