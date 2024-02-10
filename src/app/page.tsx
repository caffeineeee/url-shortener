import { SignIn, SignOut } from "@/components/home/buttons";
import { Form } from "@/components/home/forms";
import { getOneLatestUrl } from "@/db/queries";
import { type Session, getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
	const start = Date.now().toLocaleString();
	const oneLatestUrl = await getOneLatestUrl();
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="flex flex-col items-center">
				<div className="flex flex-col">
					<p>from db: {oneLatestUrl?.createdAt}</p>
					<p>start: {start}</p>
				</div>

				<FormSection />
			</div>
		</main>
	);
}

async function FormSection() {
	const session = (await getServerSession()) as Session;
	const oneLatestUrl = await getOneLatestUrl();
	return (
		<>
			<div className="py-4">
				<Form session={session} />
				{session?.user ? (
					<div>
						<SignOut />
					</div>
				) : (
					<SignIn />
				)}
				<div className="flex flex-col items-center *:p-4">
					<p className="text-lg text-center">
						Signed in as {session?.user?.email ?? ""}
					</p>
					<span className="text-lg border-2 text-center">
						Your shortened URL:{" "}
						<Link
							href={oneLatestUrl?.shortUrl ?? ""}
							className="hover:underline hover:underline-offset-2"
						>
							{oneLatestUrl?.shortUrl}
						</Link>
					</span>
				</div>
			</div>
		</>
	);
}
