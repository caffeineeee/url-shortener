"use client";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background">
			<div className="container flex h-16 items-center font-medium text-lg">
				<span className="space-x-4">
					<a href="/" className={cn("text-primary/60 hover:text-primary")}>
						Home
					</a>
					<a href="/login" className={cn("text-primary/60 hover:text-primary")}>
						Login
					</a>
					<a
						href="/sign-up"
						className={cn("text-primary/60 hover:text-primary")}
					>
						Sign Up
					</a>
				</span>
				<div className="flex flex-1 items-center justify-end space-x-4">
					<nav className="flex items-center space-x-2">
						<ThemeToggle />
					</nav>
				</div>
			</div>
		</header>
	);
}
