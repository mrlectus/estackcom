ALTER TABLE `cart` ADD `name` text NOT NULL;--> statement-breakpoint
ALTER TABLE `cart` ADD `key` text;--> statement-breakpoint
ALTER TABLE `cart` ADD `description` text;--> statement-breakpoint
ALTER TABLE `cart` ADD `price` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `cart` ADD `stock` integer DEFAULT 0 NOT NULL;