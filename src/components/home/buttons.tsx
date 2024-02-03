"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";

export function SignIn() {
	return (
		<div className="flex flex-col gap-2 p-8">
			<Button
				className="inline-flex w-48 items-center rounded border border-neutral-200 bg-neutral-50 p-1 px-3 py-2 text-sm font-medium leading-4 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
				onClick={() => signIn("google")}
			>
				<Icons.google className="h-4 w-4" aria-hidden="true" />
				<div className="ml-3">Sign in with Google</div>
			</Button>
		</div>
	);
}

export function SignOut() {
	return (
		<>
			<Button
				onClick={() => signOut()}
				className="h-8 w-full border border-neutral-500 bg-neutral-200 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-100"
			>
				<div className="text-neutral-700 dark:text-neutral-300">Sign out</div>
				<Icons.logout className="ml-2 h-4 w-4" aria-hidden="true" />
			</Button>
		</>
	);
}
