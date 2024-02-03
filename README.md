# url-shortener

Shorten your URL

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Database Schema

```sql
CREATE TABLE `urls` (
        `id` text(128) PRIMARY KEY NOT NULL,
        `long_url` text NOT NULL,
        `short_url` text NOT NULL,
        `created_by` text NOT NULL,
        `created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
        FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);

CREATE TABLE `users` (
        `id` text(128) PRIMARY KEY NOT NULL,
        `email` text NOT NULL,
        `created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE UNIQUE INDEX `urls_short_url_unique` ON `urls` (`short_url`);
CREATE INDEX `short_url_idx` ON `urls` (`short_url`);
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);
```