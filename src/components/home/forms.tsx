"use client";

import { Button } from "@/components/ui/button";
import { insertUrl } from "@/db/actions";
import { type Session } from "next-auth";
import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { ErrorBoundary } from "react-error-boundary";
import { toast } from "sonner";

export function Form({ session }: { session: Session }) {
	const formRef = useRef<HTMLFormElement>(null);
	const { pending } = useFormStatus();

	return (
		<>
			<ErrorBoundary fallback={<div>Something went wrong</div>}>
				<form
					style={{ opacity: !pending || session?.user?.email ? 1 : 0.7 }}
					className="flex flex-col space-y-8"
					ref={formRef}
					action={async (formData) => {
						await insertUrl(formData);
						formRef.current?.reset();
						toast.success("Short URL has successfully been created.");
					}}
				>
					<span className="space-y-2">
						<p className="text-xl font-bold">Paste a long URL</p>
						<input
							aria-label="Your URL"
							placeholder="Example: https://super-long-url.com/shorten-it-pls"
							disabled={pending || !session?.user?.email}
							name="longUrl"
							type="url"
							required
							className="block h-16 rounded-md border border-neutral-400 bg-gray-100 py-2 pl-4 text-neutral-900 text-xl truncate xl:w-[66rem] lg:w-[52rem] md:w-[44rem] sm:w-[36rem] w-[85dvw]"
						/>
					</span>
					{session?.user?.email && (
						<Button
							className="flex rounded px-6 py-6 font-medium border border-neutral-200 bg-blue-700 hover:bg-blue-800 text-neutral-200 hover:text-neutral-200 place-self-start sm:w-fit w-[85dvw]"
							disabled={pending || !session?.user?.email}
							type="submit"
							variant="outline"
						>
							<p className="text-lg text-center truncate">Shorten URL</p>
						</Button>
					)}
				</form>
			</ErrorBoundary>
		</>
	);
}
