"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { insertUrl } from "@/db/actions";
import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { ErrorBoundary } from "react-error-boundary";

export function Form() {
	const formRef = useRef<HTMLFormElement>(null);
	const { pending } = useFormStatus();

	return (
		<ErrorBoundary fallback={<div>Something went wrong</div>}>
			<form
				style={{ opacity: !pending ? 1 : 0.7 }}
				className="flex flex-col space-y-8"
				ref={formRef}
				action={async (formData) => {
					await insertUrl(formData);
					formRef.current?.reset();
				}}
			>
				<span className="space-y-2">
					<p className="text-xl font-bold">Paste a long URL</p>
					<input
						aria-label="Your URL"
						placeholder="Example: https://super-long-url.com/shorten-it-pls"
						disabled={pending}
						name="longUrl"
						type="url"
						required
						className="block h-16 rounded-md border-neutral-300 bg-gray-100 py-2 pl-4 text-neutral-900 focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100 text-xl truncate xl:w-[66rem] lg:w-[52rem] md:w-[44rem] sm:w-[36rem] w-[85dvw]"
					/>
				</span>
				<Button
					className="flex rounded bg-neutral-200 px-6 py-6 font-medium text-neutral-900 dark:bg-blue-800 dark:text-neutral-100 place-self-start sm:w-fit w-[85dvw]"
					disabled={pending}
					type="submit"
					variant="outline"
				>
					<p className="text-lg text-center truncate">Shorten URL</p>
				</Button>
			</form>
		</ErrorBoundary>
	);
}
