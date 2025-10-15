import { integer, sqliteTable, text, real } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: text('id').primaryKey(),
	age: integer('age'),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	role: text('role').notNull(), // Child, Parent, Relative, Visitor, Admin
	nickname: text('nickname'),
	email: text('email'),
	location: text('location'), // City, State, Country for geo-based services
	locationCoordinates: text('location_coordinates'), // Latitude,Longitude for precise location
	timezone: text('timezone'),
	preferredLanguage: text('preferred_language'),
	phoneNumber: text('phone_number'),
	emergencyContact: text('emergency_contact'),
	emergencyContactPhone: text('emergency_contact_phone'),
	joinedDate: integer('joined_date', { mode: 'timestamp' }),
	pictureUrl: text('picture_url'),
	isActive: integer('is_active', { mode: 'boolean' }).default(true),
	lastLogin: integer('last_login', { mode: 'timestamp' }),
	preferences: text('preferences') // JSON string for user preferences
});

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

// Parent tables
export const issues = sqliteTable('issues', {
	id: text('id').primaryKey(),
	type: text('type').notNull(), // External, Internal
	category: text('category').notNull(), // Repairs, Emergency, etc.
	status: text('status').notNull(), // Reported, Assigned, In Progress, Resolved
	location: text('location'),
	contact: text('contact'),
	assignedTo: text('assigned_to').references(() => user.id),
	createdBy: text('created_by').references(() => user.id),
	applicableRole: text('applicable_role'),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

export const requests = sqliteTable('requests', {
	id: text('id').primaryKey(),
	category: text('category').notNull(), // Suggestion, Repairs, etc.
	status: text('status').notNull(),
	location: text('location'),
	contact: text('contact'),
	applicableRole: text('applicable_role'),
	createdBy: text('created_by').references(() => user.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

export const foods = sqliteTable('foods', {
	id: text('id').primaryKey(),
	type: text('type').notNull(), // Breakfast, Lunch, etc.
	category: text('category').notNull(), // South Indian, etc.
	healthFactor: text('health_factor'),
	time: text('time'),
	cost: real('cost'),
	applicableRole: text('applicable_role'),
	createdBy: text('created_by').references(() => user.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

export const inventory = sqliteTable('inventory', {
	id: text('id').primaryKey(),
	type: text('type').notNull(), // Food Ingredient, Grocery, etc.
	category: text('category').notNull(),
	quantity: real('quantity'),
	unit: text('unit'),
	location: text('location'),
	applicableRole: text('applicable_role'),
	expiryDate: integer('expiry_date', { mode: 'timestamp' }),
	createdBy: text('created_by').references(() => user.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

export const tasks = sqliteTable('tasks', {
	id: text('id').primaryKey(),
	type: text('type').notNull(), // Duty, Responsibility, Ritual
	category: text('category').notNull(),
	frequency: text('frequency'),
	location: text('location'),
	applicableRole: text('applicable_role'),
	createdBy: text('created_by').references(() => user.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

export const activities = sqliteTable('activities', {
	id: text('id').primaryKey(),
	type: text('type').notNull(), // Physical, Mental, Soulful
	category: text('category').notNull(),
	frequency: text('frequency'),
	timeOfDay: text('time_of_day'),
	applicableRole: text('applicable_role'),
	createdBy: text('created_by').references(() => user.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

export const finance = sqliteTable('finance', {
	id: text('id').primaryKey(),
	type: text('type').notNull(), // Expense, Income, etc.
	category: text('category').notNull(),
	amount: real('amount').notNull(),
	date: integer('date', { mode: 'timestamp' }).notNull(),
	actor: text('actor').references(() => user.id),
	applicableRole: text('applicable_role'),
	createdBy: text('created_by').references(() => user.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

export const rewards = sqliteTable('rewards', {
	id: text('id').primaryKey(),
	type: text('type').notNull(), // Star, Karma
	reason: text('reason').notNull(),
	points: integer('points').notNull(),
	date: integer('date', { mode: 'timestamp' }).notNull(),
	person: text('person').references(() => user.id),
	applicableRole: text('applicable_role'),
	createdBy: text('created_by').references(() => user.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

export const assets = sqliteTable('assets', {
	id: text('id').primaryKey(),
	category: text('category').notNull(), // Documents, Valuables, etc.
	subCategory: text('sub_category'),
	name: text('name').notNull(),
	location: text('location'),
	owner: text('owner').references(() => user.id),
	dateAdded: integer('date_added', { mode: 'timestamp' }),
	applicableRole: text('applicable_role'),
	expiryDate: integer('expiry_date', { mode: 'timestamp' }),
	createdBy: text('created_by').references(() => user.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

export const family = sqliteTable('family', {
	id: text('id').primaryKey(),
	category: text('category').notNull(), // Wisdom, Heritage, etc.
	subCategory: text('sub_category'),
	title: text('title'),
	location: text('location'),
	mediaType: text('media_type'),
	applicableRole: text('applicable_role'),
	createdBy: text('created_by').references(() => user.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

export const aiPrompts = sqliteTable('ai_prompts', {
	id: text('id').primaryKey(),
	type: text('type').notNull(), // Alert, Notes, etc.
	category: text('category').notNull(),
	purpose: text('purpose'),
	triggerTime: text('trigger_time'),
	location: text('location'),
	frequency: text('frequency'),
	applicableRole: text('applicable_role'),
	createdBy: text('created_by').references(() => user.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

export const directory = sqliteTable('directory', {
	id: text('id').primaryKey(),
	type: text('type').notNull(), // Service Provider, Family Contact, etc.
	category: text('category').notNull(),
	name: text('name').notNull(),
	area: text('area'),
	contact: text('contact'),
	verified: integer('verified', { mode: 'boolean' }),
	applicableRole: text('applicable_role'),
	createdBy: text('created_by').references(() => user.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

export const alerts = sqliteTable('alerts', {
	id: text('id').primaryKey(),
	type: text('type').notNull(), // SMS, Email, etc.
	category: text('category').notNull(),
	subCategory: text('sub_category'),
	triggerTime: text('trigger_time'),
	location: text('location'),
	sourceTable: text('source_table'),
	applicableRole: text('applicable_role'),
	createdBy: text('created_by').references(() => user.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

// Child tables for issues
export const issueEmergency = sqliteTable('issue_emergency', {
	id: text('id').primaryKey(),
	issueId: text('issue_id').notNull().references(() => issues.id),
	severity: text('severity').notNull(), // High, Medium, Low
	symptoms: text('symptoms'), // JSON array
	responseTimeGoal: integer('response_time_goal'), // minutes
	escalationContact: text('escalation_contact'),
	backupPlan: text('backup_plan')
});

export const issueRepairs = sqliteTable('issue_repairs', {
	id: text('id').primaryKey(),
	issueId: text('issue_id').notNull().references(() => issues.id),
	item: text('item'),
	damageDescription: text('damage_description'),
	ageOfItem: text('age_of_item'),
	repairUrgency: text('repair_urgency') // Immediate, Soon, Can Wait
});

export const issueMaintenance = sqliteTable('issue_maintenance', {
	id: text('id').primaryKey(),
	issueId: text('issue_id').notNull().references(() => issues.id),
	system: text('system'), // AC, Fridge, etc.
	lastServicedDate: integer('last_serviced_date', { mode: 'timestamp' }),
	serviceType: text('service_type') // Cleaning, Inspection, Tune-up
});

export const issueUpgrades = sqliteTable('issue_upgrades', {
	id: text('id').primaryKey(),
	issueId: text('issue_id').notNull().references(() => issues.id),
	upgradeType: text('upgrade_type'),
	estimatedCost: real('estimated_cost'),
	priority: text('priority')
});

export const issueOther = sqliteTable('issue_other', {
	id: text('id').primaryKey(),
	issueId: text('issue_id').notNull().references(() => issues.id),
	description: text('description'),
	category: text('category')
});

// Child tables for requests
export const requestSuggestion = sqliteTable('request_suggestion', {
	id: text('id').primaryKey(),
	requestId: text('request_id').notNull().references(() => requests.id),
	ideaType: text('idea_type'), // Wish List, Improvement, Creative
	proposedBy: text('proposed_by'),
	justification: text('justification'),
	votes: integer('votes')
});

export const requestRepairs = sqliteTable('request_repairs', {
	id: text('id').primaryKey(),
	requestId: text('request_id').notNull().references(() => requests.id),
	item: text('item'),
	issueObserved: text('issue_observed'),
	suggestedFix: text('suggested_fix')
});

export const requestMaintenance = sqliteTable('request_maintenance', {
	id: text('id').primaryKey(),
	requestId: text('request_id').notNull().references(() => requests.id),
	system: text('system'),
	schedule: text('schedule')
});

export const requestEmergency = sqliteTable('request_emergency', {
	id: text('id').primaryKey(),
	requestId: text('request_id').notNull().references(() => requests.id),
	emergencyType: text('emergency_type'),
	urgency: text('urgency')
});

// Child tables for foods
export const foodSouthIndian = sqliteTable('food_south_indian', {
	id: text('id').primaryKey(),
	foodId: text('food_id').notNull().references(() => foods.id),
	dishName: text('dish_name'),
	ingredients: text('ingredients'), // JSON array
	preparationSteps: text('preparation_steps'), // JSON array
	ritualLink: text('ritual_link'),
	healthBenefits: text('health_benefits'),
	tasteProfile: text('taste_profile') // Spicy, Savory, Sweet
});

export const foodNorthIndian = sqliteTable('food_north_indian', {
	id: text('id').primaryKey(),
	foodId: text('food_id').notNull().references(() => foods.id),
	dishName: text('dish_name'),
	ingredients: text('ingredients'),
	preparationSteps: text('preparation_steps'),
	spiceLevel: text('spice_level'),
	vegetarian: integer('vegetarian', { mode: 'boolean' })
});

export const foodChinese = sqliteTable('food_chinese', {
	id: text('id').primaryKey(),
	foodId: text('food_id').notNull().references(() => foods.id),
	dishName: text('dish_name'),
	spiceLevel: text('spice_level'), // Mild, Medium, Hot
	oilType: text('oil_type'),
	vegetarian: integer('vegetarian', { mode: 'boolean' })
});

export const foodEuropean = sqliteTable('food_european', {
	id: text('id').primaryKey(),
	foodId: text('food_id').notNull().references(() => foods.id),
	dishName: text('dish_name'),
	mainIngredient: text('main_ingredient'),
	cookingMethod: text('cooking_method')
});

export const foodAmerican = sqliteTable('food_american', {
	id: text('id').primaryKey(),
	foodId: text('food_id').notNull().references(() => foods.id),
	dishName: text('dish_name'),
	calories: integer('calories'),
	popularity: text('popularity')
});

// Child tables for inventory
export const inventoryPooja = sqliteTable('inventory_pooja', {
	id: text('id').primaryKey(),
	inventoryId: text('inventory_id').notNull().references(() => inventory.id),
	itemName: text('item_name'),
	spiritualUse: text('spiritual_use'),
	expiryDate: integer('expiry_date', { mode: 'timestamp' }),
	storageInstructions: text('storage_instructions')
});

export const inventoryGrocery = sqliteTable('inventory_grocery', {
	id: text('id').primaryKey(),
	inventoryId: text('inventory_id').notNull().references(() => inventory.id),
	itemName: text('item_name'),
	brand: text('brand'),
	shelfLifeDays: integer('shelf_life_days'),
	preferredVendor: text('preferred_vendor')
});

export const inventoryToiletry = sqliteTable('inventory_toiletry', {
	id: text('id').primaryKey(),
	inventoryId: text('inventory_id').notNull().references(() => inventory.id),
	itemName: text('item_name'),
	usage: text('usage'),
	quantity: real('quantity')
});

// Child tables for tasks
export const taskDuty = sqliteTable('task_duty', {
	id: text('id').primaryKey(),
	taskId: text('task_id').notNull().references(() => tasks.id),
	dutyType: text('duty_type'),
	responsible: text('responsible'),
	checklist: text('checklist') // JSON array
});

export const taskResponsibility = sqliteTable('task_responsibility', {
	id: text('id').primaryKey(),
	taskId: text('task_id').notNull().references(() => tasks.id),
	domain: text('domain'), // Parenting, Health, Education
	dependent: text('dependent'),
	expectedOutcome: text('expected_outcome')
});

export const taskRitual = sqliteTable('task_ritual', {
	id: text('id').primaryKey(),
	taskId: text('task_id').notNull().references(() => tasks.id),
	ritualName: text('ritual_name'),
	panchangamLink: text('panchangam_link'),
	materialsNeeded: text('materials_needed'), // JSON array
	performerRole: text('performer_role'),
	timeOfDay: text('time_of_day') // Morning, Evening
});

// Child tables for activities
export const activityPhysical = sqliteTable('activity_physical', {
	id: text('id').primaryKey(),
	activityId: text('activity_id').notNull().references(() => activities.id),
	sport: text('sport'),
	durationMinutes: integer('duration_minutes'),
	equipmentNeeded: text('equipment_needed')
});

export const activityMental = sqliteTable('activity_mental', {
	id: text('id').primaryKey(),
	activityId: text('activity_id').notNull().references(() => activities.id),
	activity: text('activity'), // Reading, Learning, etc.
	topic: text('topic'),
	resources: text('resources')
});

export const activitySoulful = sqliteTable('activity_soulful', {
	id: text('id').primaryKey(),
	activityId: text('activity_id').notNull().references(() => activities.id),
	practice: text('practice'),
	reflectionNotes: text('reflection_notes'),
	frequency: text('frequency'),
	location: text('location')
});

// Child tables for finance
export const financeExpense = sqliteTable('finance_expense', {
	id: text('id').primaryKey(),
	financeId: text('finance_id').notNull().references(() => finance.id),
	category: text('category'),
	subCategory: text('sub_category'),
	amount: real('amount'),
	paidBy: text('paid_by'),
	recurring: integer('recurring', { mode: 'boolean' }),
	paymentMode: text('payment_mode') // Cash, UPI, Card, Other
});

export const financeIncome = sqliteTable('finance_income', {
	id: text('id').primaryKey(),
	financeId: text('finance_id').notNull().references(() => finance.id),
	source: text('source'),
	amount: real('amount'),
	receivedBy: text('received_by'),
	frequency: text('frequency') // One-time, Monthly, etc.
});

export const financeBudget = sqliteTable('finance_budget', {
	id: text('id').primaryKey(),
	financeId: text('finance_id').notNull().references(() => finance.id),
	category: text('category'),
	allocatedAmount: real('allocated_amount'),
	spentAmount: real('spent_amount')
});

export const financeSavings = sqliteTable('finance_savings', {
	id: text('id').primaryKey(),
	financeId: text('finance_id').notNull().references(() => finance.id),
	fundName: text('fund_name'),
	targetAmount: real('target_amount'),
	currentAmount: real('current_amount')
});

// Child tables for rewards
export const rewardStar = sqliteTable('reward_star', {
	id: text('id').primaryKey(),
	rewardId: text('reward_id').notNull().references(() => rewards.id),
	taskCompleted: text('task_completed'),
	points: integer('points'),
	awardedBy: text('awarded_by'),
	notes: text('notes')
});

export const rewardKarma = sqliteTable('reward_karma', {
	id: text('id').primaryKey(),
	rewardId: text('reward_id').notNull().references(() => rewards.id),
	virtue: text('virtue'),
	context: text('context'),
	points: integer('points'),
	witnessedBy: text('witnessed_by')
});

// Child tables for assets
export const assetDocuments = sqliteTable('asset_documents', {
	id: text('id').primaryKey(),
	assetId: text('asset_id').notNull().references(() => assets.id),
	documentType: text('document_type'),
	owner: text('owner'),
	expiryDate: integer('expiry_date', { mode: 'timestamp' }),
	storageLocation: text('storage_location')
});

export const assetValuables = sqliteTable('asset_valuables', {
	id: text('id').primaryKey(),
	assetId: text('asset_id').notNull().references(() => assets.id),
	item: text('item'),
	estimatedValue: real('estimated_value'),
	insured: integer('insured', { mode: 'boolean' }),
	storageLocation: text('storage_location')
});

export const assetInventory = sqliteTable('asset_inventory', {
	id: text('id').primaryKey(),
	assetId: text('asset_id').notNull().references(() => assets.id),
	itemName: text('item_name'),
	quantity: integer('quantity'),
	value: real('value')
});

export const assetVehicles = sqliteTable('asset_vehicles', {
	id: text('id').primaryKey(),
	assetId: text('asset_id').notNull().references(() => assets.id),
	vehicleType: text('vehicle_type'),
	model: text('model'),
	registration: text('registration')
});

export const assetLand = sqliteTable('asset_land', {
	id: text('id').primaryKey(),
	assetId: text('asset_id').notNull().references(() => assets.id),
	area: real('area'),
	location: text('location'),
	titleDeed: text('title_deed')
});

export const assetBuildings = sqliteTable('asset_buildings', {
	id: text('id').primaryKey(),
	assetId: text('asset_id').notNull().references(() => assets.id),
	buildingType: text('building_type'),
	address: text('address'),
	size: real('size')
});

export const assetSoftware = sqliteTable('asset_software', {
	id: text('id').primaryKey(),
	assetId: text('asset_id').notNull().references(() => assets.id),
	softwareName: text('software_name'),
	licenseKey: text('license_key'),
	expiryDate: integer('expiry_date', { mode: 'timestamp' })
});

export const assetHardware = sqliteTable('asset_hardware', {
	id: text('id').primaryKey(),
	assetId: text('asset_id').notNull().references(() => assets.id),
	itemName: text('item_name'),
	model: text('model'),
	warrantyExpiry: integer('warranty_expiry', { mode: 'timestamp' })
});

// Child tables for family
export const familyProfile = sqliteTable('family_profile', {
	id: text('id').primaryKey(),
	familyId: text('family_id').notNull().references(() => family.id),
	memberName: text('member_name'),
	role: text('role'),
	birthDate: integer('birth_date', { mode: 'timestamp' })
});

export const familyWisdom = sqliteTable('family_wisdom', {
	id: text('id').primaryKey(),
	familyId: text('family_id').notNull().references(() => family.id),
	lesson: text('lesson'),
	story: text('story'),
	contributor: text('contributor'),
	mediaType: text('media_type') // Blog, Audio, Video
});

export const familyHeritage = sqliteTable('family_heritage', {
	id: text('id').primaryKey(),
	familyId: text('family_id').notNull().references(() => family.id),
	heritageType: text('heritage_type'),
	description: text('description'),
	media: text('media')
});

export const familyTraditions = sqliteTable('family_traditions', {
	id: text('id').primaryKey(),
	familyId: text('family_id').notNull().references(() => family.id),
	traditionName: text('tradition_name'),
	celebrationDate: integer('celebration_date', { mode: 'timestamp' }),
	participants: text('participants')
});

export const familyMemories = sqliteTable('family_memories', {
	id: text('id').primaryKey(),
	familyId: text('family_id').notNull().references(() => family.id),
	event: text('event'),
	date: integer('date', { mode: 'timestamp' }),
	mediaType: text('media_type'), // Photo, Video, Audio
	description: text('description')
});

export const familyRules = sqliteTable('family_rules', {
	id: text('id').primaryKey(),
	familyId: text('family_id').notNull().references(() => family.id),
	rule: text('rule'),
	enforcer: text('enforcer'),
	consequence: text('consequence')
});

export const familyAchievements = sqliteTable('family_achievements', {
	id: text('id').primaryKey(),
	familyId: text('family_id').notNull().references(() => family.id),
	achievement: text('achievement'),
	achiever: text('achiever'),
	date: integer('date', { mode: 'timestamp' })
});

export const calendarEvents = sqliteTable('calendar_events', {
	id: text('id').primaryKey(),
	title: text('title').notNull(),
	description: text('description'),
	date: integer('date', { mode: 'timestamp' }).notNull(),
	startTime: text('start_time').notNull(),
	endTime: text('end_time').notNull(),
	location: text('location'),
	recurring: text('recurring'), // 'daily', 'weekly', 'monthly', 'yearly'
	recurringEndDate: integer('recurring_end_date', { mode: 'timestamp' }),
	alerts: integer('alerts', { mode: 'boolean' }).default(false),
	alertMinutes: integer('alert_minutes'), // minutes before event to alert
	timeBlock: text('time_block').notNull(), // 'morning', 'noon', 'afternoon', 'night'
	color: text('color'),
	createdBy: text('created_by').references(() => user.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
});

// Types
export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
