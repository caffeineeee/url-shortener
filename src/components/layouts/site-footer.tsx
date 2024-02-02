export function SiteFooter() {
	return (
		<footer className="w-full border-t bg-background">
			<div className="container grid items-center gap-8 pb-8 pt-6 md:py-8">
				<section
					id="footer-bottom"
					aria-labelledby="footer-bottom-heading"
					className="flex items-center space-x-4"
				>
					<div className="flex-1 text-left text-sm leading-loose text-muted-foreground">
						URL Shortener
					</div>
					<div className="flex items-center space-x-1">
						URL Shortener &copy; {new Date().getFullYear()}
					</div>
				</section>
			</div>
		</footer>
	);
}
