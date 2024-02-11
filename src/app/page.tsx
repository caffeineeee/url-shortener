import { SignIn, SignOut } from "@/components/home/buttons";
import { Form } from "@/components/home/forms";
import { Icons } from "@/components/icons";
import { Separator } from "@/components/ui/separator";
import { getAllUrlsDesc, getOneLatestUrl } from "@/db/queries";
import { type Session, getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
	const allUrls = await getAllUrlsDesc();
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="flex flex-col items-center">
				<FormSection />
				<Separator className="mt-10 mb-2 py-0.5 bg-slate-700" />
				<div>
					<h1 className="text-center text-xl my-2">
						All ShortURLs that have been created
					</h1>
					{allUrls.map((url) => {
						return (
							<div key={url.id} className="pb-4 text-sm">
								<p>
									Short URL:{" "}
									<Link
										href={url.shortUrl}
										className="underline hover:no-underline"
									>
										{url.shortUrl}
									</Link>
								</p>
								<p>
									Original URL:{" "}
									<Link
										href={url.longUrl}
										className="underline hover:no-underline"
									>
										{url.longUrl}
									</Link>
								</p>
							</div>
						);
					})}
				</div>
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
				{session?.user ? null : <SignIn />}
				{session?.user ? (
					<div className="flex flex-col items-center *:p-4">
						{session?.user?.email === oneLatestUrl?.createdBy ? (
							<span className="flex flex-col sm:flex-row items-center text-lg border-2 mt-4 text-center">
								Your lastly created short URL:&nbsp;
								<span className="flex flex-row items-center">
									<Link
										href={oneLatestUrl?.shortUrl ?? ""}
										className="underline hover:no-underline underline-offset-2"
										target="_blank"
									>
										{oneLatestUrl?.shortUrl}
									</Link>
									<Icons.arrowUpRightFromSquare
										className="h-[14px] w-[14px] -mt-4"
										aria-hidden="true"
									/>
								</span>
							</span>
						) : null}
						<span className="flex flex-col sm:flex-row items-center gap-x-2">
							You&apos;re signed in as {session?.user?.email ?? ""}
							<SignOut />
						</span>
					</div>
				) : null}
			</div>
		</>
	);
}
