"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";

export function SignIn() {
	return (
		<div className="flex flex-col py-4">
			<Button
				className="flex rounded px-6 py-6 font-medium border border-neutral-200 bg-blue-700 hover:bg-blue-800 text-neutral-200 hover:text-neutral-200 place-self-start sm:w-fit w-[85dvw]"
				onClick={() => signIn("google")}
				variant="outline"
			>
				<Icons.google className="h-4 w-4 mr-2" aria-hidden="true" />
				<p className="text-base text-center truncate">
					Sign in and get your URL
				</p>
			</Button>
		</div>
	);
}

export function SignOut() {
	return (
		<Button
			onClick={() => signOut()}
			variant="outline"
			className="inline-flex w-32 items-center rounded text-sm font-medium leading-4 border border-neutral-500 bg-neutral-200 text-neutral-900"
		>
			<div className="text-neutral-700">Sign out?</div>
			<Icons.logout className="ml-2 h-4 w-4" aria-hidden="true" />
		</Button>
	);
}
