ALTER TABLE `order` ADD `seller_id` text NOT NULL REFERENCES user(id);--> statement-breakpoint
ALTER TABLE `order` ADD `status` text NOT NULL;