import { getMatchingUrl } from "@/db/queries";
import { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
	const completeUrlPathname =
		process.env.NEXT_PUBLIC_APP_URL + request.nextUrl.pathname;
	const firstMatchingUrl = await getMatchingUrl(completeUrlPathname);

	if (firstMatchingUrl) {
		/*
		 * longUrl ex: "https://medium.com/@sandeep4.verma/system-design-scalable-url-shortener-service-like-tinyurl-106f30f23a82"
		 */
		return NextResponse.redirect(new URL(firstMatchingUrl.longUrl));
	}
	return; // return if there is no matching url
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
	],
};
