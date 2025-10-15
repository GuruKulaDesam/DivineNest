CREATE TABLE `activities` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`category` text NOT NULL,
	`frequency` text,
	`time_of_day` text,
	`applicable_role` text,
	`created_by` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `activity_mental` (
	`id` text PRIMARY KEY NOT NULL,
	`activity_id` text NOT NULL,
	`activity` text,
	`topic` text,
	`resources` text,
	FOREIGN KEY (`activity_id`) REFERENCES `activities`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `activity_physical` (
	`id` text PRIMARY KEY NOT NULL,
	`activity_id` text NOT NULL,
	`sport` text,
	`duration_minutes` integer,
	`equipment_needed` text,
	FOREIGN KEY (`activity_id`) REFERENCES `activities`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `activity_soulful` (
	`id` text PRIMARY KEY NOT NULL,
	`activity_id` text NOT NULL,
	`practice` text,
	`reflection_notes` text,
	`frequency` text,
	`location` text,
	FOREIGN KEY (`activity_id`) REFERENCES `activities`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `ai_prompts` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`category` text NOT NULL,
	`purpose` text,
	`trigger_time` text,
	`location` text,
	`frequency` text,
	`applicable_role` text,
	`created_by` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `alerts` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`category` text NOT NULL,
	`sub_category` text,
	`trigger_time` text,
	`location` text,
	`source_table` text,
	`applicable_role` text,
	`created_by` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `asset_buildings` (
	`id` text PRIMARY KEY NOT NULL,
	`voice_id` text NOT NULL,
	`building_type` text,
	`address` text,
	`size` real,
	FOREIGN KEY (`voice_id`) REFERENCES `assets`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `asset_documents` (
	`id` text PRIMARY KEY NOT NULL,
	`asset_id` text NOT NULL,
	`document_type` text,
	`owner` text,
	`expiry_date` integer,
	`storage_location` text,
	FOREIGN KEY (`asset_id`) REFERENCES `assets`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `asset_hardware` (
	`id` text PRIMARY KEY NOT NULL,
	`asset_id` text NOT NULL,
	`item_name` text,
	`model` text,
	`warranty_expiry` integer,
	FOREIGN KEY (`asset_id`) REFERENCES `assets`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `asset_inventory` (
	`id` text PRIMARY KEY NOT NULL,
	`asset_id` text NOT NULL,
	`item_name` text,
	`quantity` integer,
	`value` real,
	FOREIGN KEY (`asset_id`) REFERENCES `assets`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `asset_land` (
	`id` text PRIMARY KEY NOT NULL,
	`asset_id` text NOT NULL,
	`area` real,
	`location` text,
	`title_deed` text,
	FOREIGN KEY (`asset_id`) REFERENCES `assets`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `asset_software` (
	`id` text PRIMARY KEY NOT NULL,
	`asset_id` text NOT NULL,
	`software_name` text,
	`license_key` text,
	`expiry_date` integer,
	FOREIGN KEY (`asset_id`) REFERENCES `assets`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `asset_valuables` (
	`id` text PRIMARY KEY NOT NULL,
	`asset_id` text NOT NULL,
	`item` text,
	`estimated_value` real,
	`insured` integer,
	`storage_location` text,
	FOREIGN KEY (`asset_id`) REFERENCES `assets`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `asset_vehicles` (
	`id` text PRIMARY KEY NOT NULL,
	`asset_id` text NOT NULL,
	`vehicle_type` text,
	`model` text,
	`registration` text,
	FOREIGN KEY (`asset_id`) REFERENCES `assets`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `assets` (
	`id` text PRIMARY KEY NOT NULL,
	`category` text NOT NULL,
	`sub_category` text,
	`name` text NOT NULL,
	`location` text,
	`owner` text,
	`date_added` integer,
	`applicable_role` text,
	`expiry_date` integer,
	`created_by` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`owner`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `directory` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`category` text NOT NULL,
	`name` text NOT NULL,
	`area` text,
	`contact` text,
	`verified` integer,
	`applicable_role` text,
	`created_by` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `family` (
	`id` text PRIMARY KEY NOT NULL,
	`category` text NOT NULL,
	`sub_category` text,
	`title` text,
	`location` text,
	`media_type` text,
	`applicable_role` text,
	`created_by` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `family_achievements` (
	`id` text PRIMARY KEY NOT NULL,
	`family_id` text NOT NULL,
	`achievement` text,
	`achiever` text,
	`date` integer,
	FOREIGN KEY (`family_id`) REFERENCES `family`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `family_heritage` (
	`id` text PRIMARY KEY NOT NULL,
	`family_id` text NOT NULL,
	`heritage_type` text,
	`description` text,
	`media` text,
	FOREIGN KEY (`family_id`) REFERENCES `family`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `family_memories` (
	`id` text PRIMARY KEY NOT NULL,
	`family_id` text NOT NULL,
	`event` text,
	`date` integer,
	`media_type` text,
	`description` text,
	FOREIGN KEY (`family_id`) REFERENCES `family`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `family_profile` (
	`id` text PRIMARY KEY NOT NULL,
	`family_id` text NOT NULL,
	`member_name` text,
	`role` text,
	`birth_date` integer,
	FOREIGN KEY (`family_id`) REFERENCES `family`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `family_rules` (
	`id` text PRIMARY KEY NOT NULL,
	`family_id` text NOT NULL,
	`rule` text,
	`enforcer` text,
	`consequence` text,
	FOREIGN KEY (`family_id`) REFERENCES `family`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `family_traditions` (
	`id` text PRIMARY KEY NOT NULL,
	`family_id` text NOT NULL,
	`tradition_name` text,
	`celebration_date` integer,
	`participants` text,
	FOREIGN KEY (`family_id`) REFERENCES `family`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `family_wisdom` (
	`id` text PRIMARY KEY NOT NULL,
	`family_id` text NOT NULL,
	`lesson` text,
	`story` text,
	`contributor` text,
	`media_type` text,
	FOREIGN KEY (`family_id`) REFERENCES `family`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `finance` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`category` text NOT NULL,
	`amount` real NOT NULL,
	`date` integer NOT NULL,
	`actor` text,
	`applicable_role` text,
	`created_by` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`actor`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `finance_budget` (
	`id` text PRIMARY KEY NOT NULL,
	`finance_id` text NOT NULL,
	`category` text,
	`allocated_amount` real,
	`spent_amount` real,
	FOREIGN KEY (`finance_id`) REFERENCES `finance`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `finance_expense` (
	`id` text PRIMARY KEY NOT NULL,
	`finance_id` text NOT NULL,
	`category` text,
	`sub_category` text,
	`amount` real,
	`paid_by` text,
	`recurring` integer,
	`payment_mode` text,
	FOREIGN KEY (`finance_id`) REFERENCES `finance`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `finance_income` (
	`id` text PRIMARY KEY NOT NULL,
	`finance_id` text NOT NULL,
	`source` text,
	`amount` real,
	`received_by` text,
	`frequency` text,
	FOREIGN KEY (`finance_id`) REFERENCES `finance`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `finance_savings` (
	`id` text PRIMARY KEY NOT NULL,
	`finance_id` text NOT NULL,
	`fund_name` text,
	`target_amount` real,
	`current_amount` real,
	FOREIGN KEY (`finance_id`) REFERENCES `finance`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `food_american` (
	`id` text PRIMARY KEY NOT NULL,
	`food_id` text NOT NULL,
	`dish_name` text,
	`calories` integer,
	`popularity` text,
	FOREIGN KEY (`food_id`) REFERENCES `foods`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `food_chinese` (
	`id` text PRIMARY KEY NOT NULL,
	`food_id` text NOT NULL,
	`dish_name` text,
	`spice_level` text,
	`oil_type` text,
	`vegetarian` integer,
	FOREIGN KEY (`food_id`) REFERENCES `foods`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `food_european` (
	`id` text PRIMARY KEY NOT NULL,
	`food_id` text NOT NULL,
	`dish_name` text,
	`main_ingredient` text,
	`cooking_method` text,
	FOREIGN KEY (`food_id`) REFERENCES `foods`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `food_north_indian` (
	`id` text PRIMARY KEY NOT NULL,
	`food_id` text NOT NULL,
	`dish_name` text,
	`ingredients` text,
	`preparation_steps` text,
	`spice_level` text,
	`vegetarian` integer,
	FOREIGN KEY (`food_id`) REFERENCES `foods`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `food_south_indian` (
	`id` text PRIMARY KEY NOT NULL,
	`food_id` text NOT NULL,
	`dish_name` text,
	`ingredients` text,
	`preparation_steps` text,
	`ritual_link` text,
	`health_benefits` text,
	`taste_profile` text,
	FOREIGN KEY (`food_id`) REFERENCES `foods`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `foods` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`category` text NOT NULL,
	`health_factor` text,
	`time` text,
	`cost` real,
	`applicable_role` text,
	`created_by` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `inventory` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`category` text NOT NULL,
	`quantity` real,
	`unit` text,
	`location` text,
	`applicable_role` text,
	`expiry_date` integer,
	`created_by` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `inventory_grocery` (
	`id` text PRIMARY KEY NOT NULL,
	`inventory_id` text NOT NULL,
	`item_name` text,
	`brand` text,
	`shelf_life_days` integer,
	`preferred_vendor` text,
	FOREIGN KEY (`inventory_id`) REFERENCES `inventory`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `inventory_pooja` (
	`id` text PRIMARY KEY NOT NULL,
	`inventory_id` text NOT NULL,
	`item_name` text,
	`spiritual_use` text,
	`expiry_date` integer,
	`storage_instructions` text,
	FOREIGN KEY (`inventory_id`) REFERENCES `inventory`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `inventory_toiletry` (
	`id` text PRIMARY KEY NOT NULL,
	`inventory_id` text NOT NULL,
	`item_name` text,
	`usage` text,
	`quantity` real,
	FOREIGN KEY (`inventory_id`) REFERENCES `inventory`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `issue_emergency` (
	`id` text PRIMARY KEY NOT NULL,
	`issue_id` text NOT NULL,
	`severity` text NOT NULL,
	`symptoms` text,
	`response_time_goal` integer,
	`escalation_contact` text,
	`backup_plan` text,
	FOREIGN KEY (`issue_id`) REFERENCES `issues`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `issue_maintenance` (
	`id` text PRIMARY KEY NOT NULL,
	`issue_id` text NOT NULL,
	`system` text,
	`last_serviced_date` integer,
	`service_type` text,
	FOREIGN KEY (`issue_id`) REFERENCES `issues`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `issue_other` (
	`id` text PRIMARY KEY NOT NULL,
	`issue_id` text NOT NULL,
	`description` text,
	`category` text,
	FOREIGN KEY (`issue_id`) REFERENCES `issues`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `issue_repairs` (
	`id` text PRIMARY KEY NOT NULL,
	`issue_id` text NOT NULL,
	`item` text,
	`damage_description` text,
	`age_of_item` text,
	`repair_urgency` text,
	FOREIGN KEY (`issue_id`) REFERENCES `issues`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `issue_upgrades` (
	`id` text PRIMARY KEY NOT NULL,
	`issue_id` text NOT NULL,
	`upgrade_type` text,
	`estimated_cost` real,
	`priority` text,
	FOREIGN KEY (`issue_id`) REFERENCES `issues`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `issues` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`category` text NOT NULL,
	`status` text NOT NULL,
	`location` text,
	`contact` text,
	`assigned_to` text,
	`created_by` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`assigned_to`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `request_emergency` (
	`id` text PRIMARY KEY NOT NULL,
	`request_id` text NOT NULL,
	`emergency_type` text,
	`urgency` text,
	FOREIGN KEY (`request_id`) REFERENCES `requests`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `request_maintenance` (
	`id` text PRIMARY KEY NOT NULL,
	`request_id` text NOT NULL,
	`system` text,
	`schedule` text,
	FOREIGN KEY (`request_id`) REFERENCES `requests`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `request_repairs` (
	`id` text PRIMARY KEY NOT NULL,
	`request_id` text NOT NULL,
	`item` text,
	`issue_observed` text,
	`suggested_fix` text,
	FOREIGN KEY (`request_id`) REFERENCES `requests`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `request_suggestion` (
	`id` text PRIMARY KEY NOT NULL,
	`request_id` text NOT NULL,
	`idea_type` text,
	`proposed_by` text,
	`justification` text,
	`votes` integer,
	FOREIGN KEY (`request_id`) REFERENCES `requests`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `requests` (
	`id` text PRIMARY KEY NOT NULL,
	`category` text NOT NULL,
	`status` text NOT NULL,
	`location` text,
	`contact` text,
	`applicable_role` text,
	`created_by` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `reward_karma` (
	`id` text PRIMARY KEY NOT NULL,
	`reward_id` text NOT NULL,
	`virtue` text,
	`context` text,
	`points` integer,
	`witnessed_by` text,
	FOREIGN KEY (`reward_id`) REFERENCES `rewards`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `reward_star` (
	`id` text PRIMARY KEY NOT NULL,
	`reward_id` text NOT NULL,
	`task_completed` text,
	`points` integer,
	`awarded_by` text,
	`notes` text,
	FOREIGN KEY (`reward_id`) REFERENCES `rewards`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `rewards` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`reason` text NOT NULL,
	`points` integer NOT NULL,
	`date` integer NOT NULL,
	`person` text,
	`applicable_role` text,
	`created_by` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`person`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `task_duty` (
	`id` text PRIMARY KEY NOT NULL,
	`task_id` text NOT NULL,
	`duty_type` text,
	`responsible` text,
	`checklist` text,
	FOREIGN KEY (`task_id`) REFERENCES `tasks`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `task_responsibility` (
	`id` text PRIMARY KEY NOT NULL,
	`task_id` text NOT NULL,
	`domain` text,
	`dependent` text,
	`expected_outcome` text,
	FOREIGN KEY (`task_id`) REFERENCES `tasks`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `task_ritual` (
	`id` text PRIMARY KEY NOT NULL,
	`task_id` text NOT NULL,
	`ritual_name` text,
	`panchangam_link` text,
	`materials_needed` text,
	`performer_role` text,
	`time_of_day` text,
	FOREIGN KEY (`task_id`) REFERENCES `tasks`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tasks` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`category` text NOT NULL,
	`frequency` text,
	`location` text,
	`applicable_role` text,
	`created_by` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`age` integer,
	`username` text NOT NULL,
	`password_hash` text NOT NULL,
	`role` text NOT NULL,
	`nickname` text,
	`email` text,
	`location` text,
	`joined_date` integer,
	`picture_url` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);