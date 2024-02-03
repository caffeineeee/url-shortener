"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { db } from "@/db";
import { urls } from "@/db/schema/urls";
import { users } from "@/db/schema/users";
import { eq, sql } from "drizzle-orm";
import { type Session, getServerSession } from "next-auth";
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

// export async function saveUrls(formData: FormData) {
// 	const session = await getSession();

// 	const createdBy = session?.user?.name as string;

// 	if (!session.user) {
// 		throw new Error("Unauthorized");
// 	}

// 	const long_url = formData.get("longUrl")?.toString() || "";

// 	await db.insert(urls).values({
// 		createdBy: createdBy,
// 		createdAt: sql`CURRENT_TIMESTAMP`,
// 	});

// 	revalidatePath("/users");
// }
