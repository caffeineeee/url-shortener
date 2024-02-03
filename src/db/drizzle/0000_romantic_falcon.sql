CREATE TABLE `urls` (
	`id` text(128) PRIMARY KEY NOT NULL,
	`long_url` text NOT NULL,
	`short_url` text NOT NULL,
	`created_by` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text(128) PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `urls_short_url_unique` ON `urls` (`short_url`);--> statement-breakpoint
CREATE INDEX `short_url_idx` ON `urls` (`short_url`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);