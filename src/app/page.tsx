import { SignIn, SignOut } from "@/components/home/buttons";
import { Form } from "@/components/home/forms";
import { type Session, getServerSession } from "next-auth";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="flex w-full max-w-sm items-center space-x-2">
				<FormSection />
			</div>
		</main>
	);
}

async function FormSection() {
	const session = (await getServerSession()) as Session;

	return (
		<>
			{session?.user ? (
				<div className="py-4">
					<Form />
					<div className="flex w-fit flex-col items-start gap-y-3 px-2 py-4 md:flex-row md:items-center">
						<div className="pl-0">
							Signed in as&nbsp;
							<span className="rounded-lg bg-slate-600 p-2 text-neutral-300">
								{session?.user?.name}
							</span>
						</div>
						<div className="ml-0 md:ml-4">
							<SignOut />
						</div>
					</div>
				</div>
			) : (
				<div className="flex flex-col items-center">
					<p className="text-lg">Sign in to shorten your URL</p>
					<SignIn />
				</div>
			)}
		</>
	);
}
