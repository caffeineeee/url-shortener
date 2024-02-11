import SessionProvider from "@/components/session-provider";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "URL Shortener",
	description: "Shorten your URL",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await getServerSession();

	return (
		<html lang="en">
			<body className={dmSans.className}>
				<SessionProvider session={session}>{children}</SessionProvider>
			</body>
		</html>
	);
}
