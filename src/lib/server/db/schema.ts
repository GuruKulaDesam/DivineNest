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

// ===== NEW PARENT TABLES FOR ENHANCED FEATURES =====

// Communication & Coordination
export const communication = sqliteTable('communication', {
	id: text('id').primaryKey(),
	type: text('type').notNull(), // Messages, Wish Lists, Suggestions, Discussions, Decisions
	category: text('category').notNull(),
	status: text('status').notNull(), // Open, In Progress, Resolved, Closed
	priority: text('priority'), // High, Medium, Low
	assignedTo: text('assigned_to').references(() => user.id),
	linkedDuty: text('linked_duty'), // Reference to duty/responsibility
	linkedIssue: text('linked_issue'), // Reference to issue
	applicableRole: text('applicable_role'),
	createdBy: text('created_by').references(() => user.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

// Learning & Teaching
export const learning = sqliteTable('learning', {
	id: text('id').primaryKey(),
	type: text('type').notNull(), // Lessons, Courses, Teaching Logs, Study Materials, Exams
	category: text('category').notNull(),
	level: text('level'), // Beginner, Intermediate, Advanced
	duration: text('duration'), // Hours, Days, Weeks
	instructor: text('instructor').references(() => user.id),
	students: text('students'), // JSON array of user IDs
	applicableRole: text('applicable_role'),
	createdBy: text('created_by').references(() => user.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

// Health & Wellness
export const wellness = sqliteTable('wellness', {
	id: text('id').primaryKey(),
	type: text('type').notNull(), // Physical Health, Mental Health, Medicines, Appointments, Remedies
	category: text('category').notNull(),
	severity: text('severity'), // Mild, Moderate, Severe
	frequency: text('frequency'), // Daily, Weekly, Monthly
	linkedInventory: text('linked_inventory'), // Reference to medicines in inventory
	applicableRole: text('applicable_role'),
	createdBy: text('created_by').references(() => user.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

// Karma & Scoring
export const karma = sqliteTable('karma', {
	id: text('id').primaryKey(),
	type: text('type').notNull(), // Karma Log, Karma Score, Karma Penalty, Karma Rewards
	category: text('category').notNull(),
	points: integer('points').notNull(),
	reason: text('reason').notNull(),
	linkedDuty: text('linked_duty'), // Reference to duty/responsibility
	linkedAchievement: text('linked_achievement'), // Reference to achievement
	role: text('role').references(() => user.id),
	applicableRole: text('applicable_role'),
	createdBy: text('created_by').references(() => user.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

// Guest & Hospitality
export const guests = sqliteTable('guests', {
	id: text('id').primaryKey(),
	type: text('type').notNull(), // Guest Profiles, Visit Logs, Gift Logs, Feedback
	category: text('category').notNull(),
	guestName: text('guest_name'),
	relationship: text('relationship'), // Family, Friend, Relative, Visitor
	visitDate: integer('visit_date', { mode: 'timestamp' }),
	duration: text('duration'), // Hours, Days
	applicableRole: text('applicable_role'),
	createdBy: text('created_by').references(() => user.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

// Environment & Nature
export const environment = sqliteTable('environment', {
	id: text('id').primaryKey(),
	type: text('type').notNull(), // Garden Tracker, Animal Care, Nature Duties, Seasonal Prep
	category: text('category').notNull(),
	location: text('location'),
	frequency: text('frequency'), // Daily, Weekly, Monthly, Seasonal
	responsible: text('responsible').references(() => user.id),
	applicableRole: text('applicable_role'),
	createdBy: text('created_by').references(() => user.id),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

// ===== CHILD TABLES FOR NEW PARENT TABLES =====

// Child tables for Communication
export const communicationMessages = sqliteTable('communication_messages', {
	id: text('id').primaryKey(),
	communicationId: text('communication_id').notNull().references(() => communication.id),
	sender: text('sender').references(() => user.id),
	recipient: text('recipient').references(() => user.id),
	message: text('message').notNull(),
	messageType: text('message_type'), // Text, Voice, Video
	readStatus: integer('read_status', { mode: 'boolean' }).default(false),
	sentAt: integer('sent_at', { mode: 'timestamp' }).notNull()
});

export const communicationWishLists = sqliteTable('communication_wish_lists', {
	id: text('id').primaryKey(),
	communicationId: text('communication_id').notNull().references(() => communication.id),
	item: text('item').notNull(),
	category: text('category'), // Personal, Family, Home, Education
	priority: text('priority'), // High, Medium, Low
	estimatedCost: real('estimated_cost'),
	requestedBy: text('requested_by').references(() => user.id)
});

export const communicationSuggestions = sqliteTable('communication_suggestions', {
	id: text('id').primaryKey(),
	communicationId: text('communication_id').notNull().references(() => communication.id),
	suggestion: text('suggestion').notNull(),
	category: text('category'), // Process, Product, Service, Environment
	impact: text('impact'), // High, Medium, Low
	proposedBy: text('proposed_by').references(() => user.id),
	votes: integer('votes').default(0)
});

export const communicationDiscussions = sqliteTable('communication_discussions', {
	id: text('id').primaryKey(),
	communicationId: text('communication_id').notNull().references(() => communication.id),
	topic: text('topic').notNull(),
	participants: text('participants'), // JSON array of user IDs
	status: text('status'), // Open, Closed, Archived
	lastActivity: integer('last_activity', { mode: 'timestamp' })
});

export const communicationDecisions = sqliteTable('communication_decisions', {
	id: text('id').primaryKey(),
	communicationId: text('communication_id').notNull().references(() => communication.id),
	decision: text('decision').notNull(),
	context: text('context'),
	outcome: text('outcome'),
	affectedParties: text('affected_parties'), // JSON array of user IDs
	implemented: integer('implemented', { mode: 'boolean' }).default(false)
});

// Child tables for Learning
export const learningLessons = sqliteTable('learning_lessons', {
	id: text('id').primaryKey(),
	learningId: text('learning_id').notNull().references(() => learning.id),
	lessonTitle: text('lesson_title').notNull(),
	subject: text('subject'),
	objectives: text('objectives'), // JSON array
	materials: text('materials'), // JSON array
	duration: integer('duration'), // minutes
	completed: integer('completed', { mode: 'boolean' }).default(false)
});

export const learningCourses = sqliteTable('learning_courses', {
	id: text('id').primaryKey(),
	learningId: text('learning_id').notNull().references(() => learning.id),
	courseName: text('course_name').notNull(),
	provider: text('provider'), // Internal, External
	platform: text('platform'), // Online, Offline, Hybrid
	certification: integer('certification', { mode: 'boolean' }).default(false),
	completionDate: integer('completion_date', { mode: 'timestamp' })
});

export const learningTeachingLogs = sqliteTable('learning_teaching_logs', {
	id: text('id').primaryKey(),
	learningId: text('learning_id').notNull().references(() => learning.id),
	teacher: text('teacher').references(() => user.id),
	student: text('student').references(() => user.id),
	subject: text('subject'),
	duration: integer('duration'), // minutes
	notes: text('notes'),
	date: integer('date', { mode: 'timestamp' }).notNull()
});

export const learningStudyMaterials = sqliteTable('learning_study_materials', {
	id: text('id').primaryKey(),
	learningId: text('learning_id').notNull().references(() => learning.id),
	materialType: text('material_type'), // Book, Video, Document, Audio
	title: text('title').notNull(),
	author: text('author'),
	source: text('source'),
	accessLink: text('access_link'),
	difficulty: text('difficulty') // Beginner, Intermediate, Advanced
});

export const learningExams = sqliteTable('learning_exams', {
	id: text('id').primaryKey(),
	learningId: text('learning_id').notNull().references(() => learning.id),
	examName: text('exam_name').notNull(),
	subject: text('subject'),
	date: integer('date', { mode: 'timestamp' }).notNull(),
	score: real('score'),
	maxScore: real('max_score'),
	grade: text('grade'),
	certification: integer('certification', { mode: 'boolean' }).default(false)
});

// Child tables for Wellness
export const wellnessPhysicalHealth = sqliteTable('wellness_physical_health', {
	id: text('id').primaryKey(),
	wellnessId: text('wellness_id').notNull().references(() => wellness.id),
	activity: text('activity'), // Exercise, Walk, Yoga, etc.
	duration: integer('duration'), // minutes
	intensity: text('intensity'), // Low, Medium, High
	vitals: text('vitals'), // JSON object with BP, Heart Rate, etc.
	notes: text('notes'),
	date: integer('date', { mode: 'timestamp' }).notNull()
});

export const wellnessMentalHealth = sqliteTable('wellness_mental_health', {
	id: text('id').primaryKey(),
	wellnessId: text('wellness_id').notNull().references(() => wellness.id),
	activity: text('activity'), // Meditation, Journaling, Therapy
	mood: text('mood'), // Happy, Sad, Anxious, Calm
	stressLevel: integer('stress_level'), // 1-10
	reflection: text('reflection'),
	date: integer('date', { mode: 'timestamp' }).notNull()
});

export const wellnessMedicines = sqliteTable('wellness_medicines', {
	id: text('id').primaryKey(),
	wellnessId: text('wellness_id').notNull().references(() => wellness.id),
	medicineName: text('medicine_name').notNull(),
	dosage: text('dosage'),
	frequency: text('frequency'), // Daily, Twice daily, etc.
	purpose: text('purpose'),
	prescribedBy: text('prescribed_by'),
	startDate: integer('start_date', { mode: 'timestamp' }),
	endDate: integer('end_date', { mode: 'timestamp' }),
	linkedInventory: text('linked_inventory') // Reference to inventory
});

export const wellnessAppointments = sqliteTable('wellness_appointments', {
	id: text('id').primaryKey(),
	wellnessId: text('wellness_id').notNull().references(() => wellness.id),
	doctorName: text('doctor_name'),
	specialty: text('specialty'),
	clinic: text('clinic'),
	appointmentDate: integer('appointment_date', { mode: 'timestamp' }).notNull(),
	purpose: text('purpose'),
	notes: text('notes'),
	followUp: integer('follow_up', { mode: 'boolean' }).default(false)
});

export const wellnessRemedies = sqliteTable('wellness_remedies', {
	id: text('id').primaryKey(),
	wellnessId: text('wellness_id').notNull().references(() => wellness.id),
	remedyName: text('remedy_name').notNull(),
	type: text('type'), // Ayurvedic, Homeopathic, Home remedy
	ingredients: text('ingredients'), // JSON array
	preparation: text('preparation'),
	usage: text('usage'),
	effectiveness: text('effectiveness'), // High, Medium, Low
	sideEffects: text('side_effects')
});

// Child tables for Karma
export const karmaLog = sqliteTable('karma_log', {
	id: text('id').primaryKey(),
	karmaId: text('karma_id').notNull().references(() => karma.id),
	dutyId: text('duty_id'), // Reference to duty/responsibility
	action: text('action').notNull(),
	points: integer('points').notNull(),
	context: text('context'),
	witnessedBy: text('witnessed_by').references(() => user.id),
	date: integer('date', { mode: 'timestamp' }).notNull()
});

export const karmaScore = sqliteTable('karma_score', {
	id: text('id').primaryKey(),
	karmaId: text('karma_id').notNull().references(() => karma.id),
	role: text('role').references(() => user.id),
	totalPoints: integer('total_points').default(0),
	level: text('level'), // Beginner, Intermediate, Advanced, Master
	badge: text('badge'),
	lastUpdated: integer('last_updated', { mode: 'timestamp' })
});

export const karmaPenalty = sqliteTable('karma_penalty', {
	id: text('id').primaryKey(),
	karmaId: text('karma_id').notNull().references(() => karma.id),
	dutyId: text('duty_id'), // Reference to missed duty
	reason: text('reason').notNull(),
	points: integer('points').notNull(), // Negative points
	recordedBy: text('recorded_by').references(() => user.id),
	date: integer('date', { mode: 'timestamp' }).notNull()
});

export const karmaRewards = sqliteTable('karma_rewards', {
	id: text('id').primaryKey(),
	karmaId: text('karma_id').notNull().references(() => karma.id),
	achievementId: text('achievement_id'), // Reference to achievement
	reward: text('reward').notNull(),
	points: integer('points').notNull(),
	grantedBy: text('granted_by').references(() => user.id),
	date: integer('date', { mode: 'timestamp' }).notNull()
});

// Child tables for Guests
export const guestProfiles = sqliteTable('guest_profiles', {
	id: text('id').primaryKey(),
	guestId: text('guest_id').notNull().references(() => guests.id),
	name: text('name').notNull(),
	relationship: text('relationship'),
	contact: text('contact'),
	preferences: text('preferences'), // JSON object
	dietaryRestrictions: text('dietary_restrictions'),
	specialNeeds: text('special_needs'),
	lastVisit: integer('last_visit', { mode: 'timestamp' })
});

export const guestVisitLogs = sqliteTable('guest_visit_logs', {
	id: text('id').primaryKey(),
	guestId: text('guest_id').notNull().references(() => guests.id),
	visitDate: integer('visit_date', { mode: 'timestamp' }).notNull(),
	purpose: text('purpose'),
	duration: text('duration'), // Hours, Days
	accommodation: text('accommodation'), // Home, Hotel, etc.
	host: text('host').references(() => user.id),
	activities: text('activities'), // JSON array
	notes: text('notes')
});

export const guestGiftLogs = sqliteTable('guest_gift_logs', {
	id: text('id').primaryKey(),
	guestId: text('guest_id').notNull().references(() => guests.id),
	giftType: text('gift_type'), // Given, Received
	item: text('item').notNull(),
	occasion: text('occasion'),
	value: real('value'),
	fromTo: text('from_to').references(() => user.id),
	date: integer('date', { mode: 'timestamp' }).notNull()
});

export const guestFeedback = sqliteTable('guest_feedback', {
	id: text('id').primaryKey(),
	guestId: text('guest_id').notNull().references(() => guests.id),
	rating: integer('rating'), // 1-5
	feedback: text('feedback'),
	areas: text('areas'), // JSON array of improvement areas
	suggestions: text('suggestions'),
	submittedBy: text('submitted_by').references(() => user.id),
	date: integer('date', { mode: 'timestamp' }).notNull()
});

// Child tables for Environment
export const environmentGarden = sqliteTable('environment_garden', {
	id: text('id').primaryKey(),
	environmentId: text('environment_id').notNull().references(() => environment.id),
	plantName: text('plant_name').notNull(),
	type: text('type'), // Flower, Vegetable, Herb, Tree
	plantedDate: integer('planted_date', { mode: 'timestamp' }),
	wateringSchedule: text('watering_schedule'),
	sunlight: text('sunlight'), // Full sun, Partial, Shade
	health: text('health'), // Healthy, Needs care, Diseased
	lastChecked: integer('last_checked', { mode: 'timestamp' })
});

export const environmentAnimalCare = sqliteTable('environment_animal_care', {
	id: text('id').primaryKey(),
	environmentId: text('environment_id').notNull().references(() => environment.id),
	animalType: text('animal_type'), // Pet, Livestock, Wildlife
	name: text('name'),
	feedingSchedule: text('feeding_schedule'),
	veterinaryCare: text('veterinary_care'),
	lastVetVisit: integer('last_vet_visit', { mode: 'timestamp' }),
	health: text('health'),
	careNotes: text('care_notes')
});

export const environmentNatureDuties = sqliteTable('environment_nature_duties', {
	id: text('id').primaryKey(),
	environmentId: text('environment_id').notNull().references(() => environment.id),
	duty: text('duty').notNull(), // Cleaning, Planting, Conservation, etc.
	location: text('location'),
	schedule: text('schedule'),
	tools: text('tools'), // JSON array
	impact: text('impact'), // Environmental benefit
	lastPerformed: integer('last_performed', { mode: 'timestamp' })
});

export const environmentSeasonalPrep = sqliteTable('environment_seasonal_prep', {
	id: text('id').primaryKey(),
	environmentId: text('environment_id').notNull().references(() => environment.id),
	season: text('season'), // Spring, Summer, Autumn, Winter
	preparation: text('preparation').notNull(),
	timeline: text('timeline'),
	materials: text('materials'), // JSON array
	responsible: text('responsible').references(() => user.id),
	status: text('status'), // Planned, In Progress, Completed
	completionDate: integer('completion_date', { mode: 'timestamp' })
});

// ===== ENHANCED CALENDAR TABLES =====

// Enhanced Calendar Child Tables
export const calendarPanchangam = sqliteTable('calendar_panchangam', {
	id: text('id').primaryKey(),
	date: integer('date', { mode: 'timestamp' }).notNull(),
	tithi: text('tithi'),
	nakshatra: text('nakshatra'),
	yoga: text('yoga'),
	karana: text('karana'),
	sunrise: text('sunrise'),
	sunset: text('sunset'),
	moonrise: text('moonrise'),
	moonset: text('moonset'),
	rahukalam: text('rahukalam'),
	yamakantam: text('yamakantam'),
	gulikai: text('gulikai'),
	durmuhurtham: text('durmuhurtham'),
	varjyam: text('varjyam'),
	amaraka: text('amaraka')
});

export const calendarRitualSchedule = sqliteTable('calendar_ritual_schedule', {
	id: text('id').primaryKey(),
	ritualName: text('ritual_name').notNull(),
	date: integer('date', { mode: 'timestamp' }).notNull(),
	time: text('time'),
	performer: text('performer').references(() => user.id),
	materials: text('materials'), // JSON array
	panchangamConsiderations: text('panchangam_considerations'),
	status: text('status'), // Scheduled, Completed, Postponed
	notes: text('notes')
});

export const calendarFestivals = sqliteTable('calendar_festivals', {
	id: text('id').primaryKey(),
	festivalName: text('festival_name').notNull(),
	date: integer('date', { mode: 'timestamp' }).notNull(),
	traditionalDate: text('traditional_date'), // Lunar calendar date
	celebration: text('celebration'), // JSON array of activities
	familyTraditions: text('family_traditions'),
	preparations: text('preparations'), // JSON array
	significance: text('significance')
});

export const calendarLifeEvents = sqliteTable('calendar_life_events', {
	id: text('id').primaryKey(),
	eventType: text('event_type'), // Birthday, Anniversary, Samskara
	person: text('person').references(() => user.id),
	eventDate: integer('event_date', { mode: 'timestamp' }).notNull(),
	age: integer('age'), // For birthdays
	celebration: text('celebration'),
	traditionalRituals: text('traditional_rituals'), // JSON array
	gifts: text('gifts'), // JSON array
	reminders: text('reminders') // JSON array of reminder dates
});

// ===== NEW RESPONSIBILITY CHILD TABLES =====

// Enhanced Responsibility Child Tables
export const responsibilityHouseCleaning = sqliteTable('responsibility_house_cleaning', {
	id: text('id').primaryKey(),
	responsibilityId: text('responsibility_id').notNull().references(() => tasks.id),
	area: text('area').notNull(), // Kitchen, Bathroom, Living Room, etc.
	task: text('task').notNull(), // Sweep, Mop, Dust, etc.
	frequency: text('frequency'),
	supplies: text('supplies'), // JSON array
	timeEstimate: integer('time_estimate'), // minutes
	lastCompleted: integer('last_completed', { mode: 'timestamp' })
});

export const responsibilityClothWashing = sqliteTable('responsibility_cloth_washing', {
	id: text('id').primaryKey(),
	responsibilityId: text('responsibility_id').notNull().references(() => tasks.id),
	loadType: text('load_type'), // Whites, Colors, Delicates
	machineSettings: text('machine_settings'),
	detergent: text('detergent'),
	timeEstimate: integer('time_estimate'), // minutes
	lastCompleted: integer('last_completed', { mode: 'timestamp' })
});

export const responsibilityFoodPrep = sqliteTable('responsibility_food_prep', {
	id: text('id').primaryKey(),
	responsibilityId: text('responsibility_id').notNull().references(() => tasks.id),
	mealType: text('meal_type'), // Breakfast, Lunch, Dinner, Snacks
	cuisine: text('cuisine'),
	servings: integer('servings'),
	timeEstimate: integer('time_estimate'), // minutes
	lastCompleted: integer('last_completed', { mode: 'timestamp' })
});

export const responsibilityEarning = sqliteTable('responsibility_earning', {
	id: text('id').primaryKey(),
	responsibilityId: text('responsibility_id').notNull().references(() => tasks.id),
	incomeSource: text('income_source'),
	amount: real('amount'),
	frequency: text('frequency'),
	effort: text('effort'), // Hours per week
	lastCompleted: integer('last_completed', { mode: 'timestamp' })
});

export const responsibilityEducation = sqliteTable('responsibility_education', {
	id: text('id').primaryKey(),
	responsibilityId: text('responsibility_id').notNull().references(() => tasks.id),
	subject: text('subject'),
	activity: text('activity'), // Study, Homework, Project
	timeEstimate: integer('time_estimate'), // minutes
	progress: text('progress'),
	lastCompleted: integer('last_completed', { mode: 'timestamp' })
});

export const responsibilityVehicleMaintenance = sqliteTable('responsibility_vehicle_maintenance', {
	id: text('id').primaryKey(),
	responsibilityId: text('responsibility_id').notNull().references(() => tasks.id),
	vehicle: text('vehicle'),
	maintenanceType: text('maintenance_type'), // Oil change, Tire rotation, etc.
	parts: text('parts'), // JSON array
	cost: real('cost'),
	lastCompleted: integer('last_completed', { mode: 'timestamp' })
});

export const responsibilityHouseMaintenance = sqliteTable('responsibility_house_maintenance', {
	id: text('id').primaryKey(),
	responsibilityId: text('responsibility_id').notNull().references(() => tasks.id),
	system: text('system'), // Plumbing, Electrical, HVAC, etc.
	issue: text('issue'),
	urgency: text('urgency'),
	contractor: text('contractor'),
	cost: real('cost'),
	lastCompleted: integer('last_completed', { mode: 'timestamp' })
});

export const responsibilityHouseRepairs = sqliteTable('responsibility_house_repairs', {
	id: text('id').primaryKey(),
	responsibilityId: text('responsibility_id').notNull().references(() => tasks.id),
	area: text('area'),
	damage: text('damage'),
	repairType: text('repair_type'),
	materials: text('materials'), // JSON array
	cost: real('cost'),
	lastCompleted: integer('last_completed', { mode: 'timestamp' })
});

export const responsibilityHouseUpgrades = sqliteTable('responsibility_house_upgrades', {
	id: text('id').primaryKey(),
	responsibilityId: text('responsibility_id').notNull().references(() => tasks.id),
	upgradeType: text('upgrade_type'), // Kitchen, Bathroom, Garden, etc.
	scope: text('scope'),
	budget: real('budget'),
	timeline: text('timeline'),
	status: text('status'), // Planned, In Progress, Completed
	lastUpdated: integer('last_updated', { mode: 'timestamp' })
});

export const responsibilityOrganizing = sqliteTable('responsibility_organizing', {
	id: text('id').primaryKey(),
	responsibilityId: text('responsibility_id').notNull().references(() => tasks.id),
	area: text('area'), // Room, Closet, Garage, etc.
	category: text('category'), // Clothes, Documents, Tools, etc.
	method: text('method'), // Sort, Label, Store
	timeEstimate: integer('time_estimate'), // minutes
	lastCompleted: integer('last_completed', { mode: 'timestamp' })
});

export const responsibilityHealthyEating = sqliteTable('responsibility_healthy_eating', {
	id: text('id').primaryKey(),
	responsibilityId: text('responsibility_id').notNull().references(() => tasks.id),
	mealType: text('meal_type'),
	nutrients: text('nutrients'), // JSON array
	calories: integer('calories'),
	preparation: text('preparation'),
	lastCompleted: integer('last_completed', { mode: 'timestamp' })
});

export const responsibilityMentalWellness = sqliteTable('responsibility_mental_wellness', {
	id: text('id').primaryKey(),
	responsibilityId: text('responsibility_id').notNull().references(() => tasks.id),
	activity: text('activity'), // Meditation, Reading, Exercise
	duration: integer('duration'), // minutes
	technique: text('technique'),
	benefits: text('benefits'),
	lastCompleted: integer('last_completed', { mode: 'timestamp' })
});

export const responsibilityPhysicalWellness = sqliteTable('responsibility_physical_wellness', {
	id: text('id').primaryKey(),
	responsibilityId: text('responsibility_id').notNull().references(() => tasks.id),
	exercise: text('exercise'), // Yoga, Walking, Gym, etc.
	intensity: text('intensity'),
	duration: integer('duration'), // minutes
	targets: text('targets'), // JSON array of body parts/goals
	lastCompleted: integer('last_completed', { mode: 'timestamp' })
});

// ===== NEW ISSUES CHILD TABLES =====

// Enhanced Issues Child Tables
export const issuesEmergency = sqliteTable('issues_emergency', {
	id: text('id').primaryKey(),
	issueId: text('issue_id').notNull().references(() => issues.id),
	emergencyType: text('emergency_type'), // Medical, Safety, Security
	severity: text('severity'), // Critical, High, Medium
	responseTime: text('response_time'),
	emergencyContacts: text('emergency_contacts'), // JSON array
	backupPlan: text('backup_plan'),
	status: text('status'), // Reported, Responding, Resolved
	lastUpdated: integer('last_updated', { mode: 'timestamp' })
});

export const issuesUrgents = sqliteTable('issues_urgents', {
	id: text('id').primaryKey(),
	issueId: text('issue_id').notNull().references(() => issues.id),
	urgentType: text('urgent_type'), // Health, Finance, Legal, etc.
	deadline: integer('deadline', { mode: 'timestamp' }),
	impact: text('impact'), // High, Medium, Low
	stakeholders: text('stakeholders'), // JSON array
	actionPlan: text('action_plan'),
	status: text('status'), // Identified, In Progress, Resolved
	lastUpdated: integer('last_updated', { mode: 'timestamp' })
});

export const issuesRepairs = sqliteTable('issues_repairs', {
	id: text('id').primaryKey(),
	issueId: text('issue_id').notNull().references(() => issues.id),
	item: text('item').notNull(),
	damage: text('damage'),
	repairType: text('repair_type'),
	estimatedCost: real('estimated_cost'),
	contractor: text('contractor'),
	parts: text('parts'), // JSON array
	status: text('status'), // Assessment, Quoted, Approved, In Progress, Completed
	lastUpdated: integer('last_updated', { mode: 'timestamp' })
});

export const issuesMaintenance = sqliteTable('issues_maintenance', {
	id: text('id').primaryKey(),
	issueId: text('issue_id').notNull().references(() => issues.id),
	system: text('system'), // HVAC, Plumbing, Electrical, etc.
	maintenanceType: text('maintenance_type'), // Preventive, Corrective
	schedule: text('schedule'),
	contractor: text('contractor'),
	cost: real('cost'),
	lastService: integer('last_service', { mode: 'timestamp' }),
	nextService: integer('next_service', { mode: 'timestamp' })
});

export const issuesUpgrades = sqliteTable('issues_upgrades', {
	id: text('id').primaryKey(),
	issueId: text('issue_id').notNull().references(() => issues.id),
	upgradeType: text('upgrade_type'), // Technology, Infrastructure, Process
	benefit: text('benefit'),
	roi: text('roi'), // Return on Investment
	budget: real('budget'),
	timeline: text('timeline'),
	status: text('status'), // Proposed, Approved, In Progress, Completed
	lastUpdated: integer('last_updated', { mode: 'timestamp' })
});

export const issuesConflicts = sqliteTable('issues_conflicts', {
	id: text('id').primaryKey(),
	issueId: text('issue_id').notNull().references(() => issues.id),
	conflictType: text('conflict_type'), // Interpersonal, Resource, Schedule
	parties: text('parties'), // JSON array of involved parties
	description: text('description'),
	impact: text('impact'),
	resolution: text('resolution'),
	mediator: text('mediator').references(() => user.id),
	status: text('status'), // Open, Mediated, Resolved
	lastUpdated: integer('last_updated', { mode: 'timestamp' })
});

export const issuesHabits = sqliteTable('issues_habits', {
	id: text('id').primaryKey(),
	issueId: text('issue_id').notNull().references(() => issues.id),
	habitType: text('habit_type'), // Positive, Negative
	description: text('description'),
	triggers: text('triggers'), // JSON array
	consequences: text('consequences'),
	strategy: text('strategy'), // Break, Build, Replace
	progress: text('progress'), // Starting, Improving, Established
	lastUpdated: integer('last_updated', { mode: 'timestamp' })
});

// ===== NEW FOODS CHILD TABLES =====

// Enhanced Foods Child Tables
export const foodsDishes = sqliteTable('foods_dishes', {
	id: text('id').primaryKey(),
	foodId: text('food_id').notNull().references(() => foods.id),
	dishName: text('dish_name').notNull(),
	cuisine: text('cuisine'),
	category: text('category'), // Main Course, Side, Dessert, etc.
	ingredients: text('ingredients'), // JSON array
	instructions: text('instructions'), // JSON array
	prepTime: integer('prep_time'), // minutes
	cookTime: integer('cook_time'), // minutes
	servings: integer('servings'),
	nutrition: text('nutrition'), // JSON object
	difficulty: text('difficulty') // Easy, Medium, Hard
});

export const foodsRecipes = sqliteTable('foods_recipes', {
	id: text('id').primaryKey(),
	foodId: text('food_id').notNull().references(() => foods.id),
	recipeName: text('recipe_name').notNull(),
	author: text('author').references(() => user.id),
	source: text('source'), // Book, Website, Family
	category: text('category'),
	ingredients: text('ingredients'), // JSON array with quantities
	steps: text('steps'), // JSON array
	tips: text('tips'),
	variations: text('variations'), // JSON array
	rating: real('rating'), // 1-5
	lastPrepared: integer('last_prepared', { mode: 'timestamp' })
});

export const foodsMealPlanner = sqliteTable('foods_meal_planner', {
	id: text('id').primaryKey(),
	foodId: text('food_id').notNull().references(() => foods.id),
	mealType: text('meal_type'), // Breakfast, Lunch, Dinner, Snack
	date: integer('date', { mode: 'timestamp' }).notNull(),
	dishes: text('dishes'), // JSON array of dish IDs
	servings: integer('servings'),
	prepTime: integer('prep_time'), // minutes
	shoppingList: text('shopping_list'), // JSON array
	status: text('status'), // Planned, Prepared, Completed
	notes: text('notes')
});

export const foodsSweets = sqliteTable('foods_sweets', {
	id: text('id').primaryKey(),
	foodId: text('food_id').notNull().references(() => foods.id),
	sweetName: text('sweet_name').notNull(),
	type: text('type'), // Traditional, Modern, Festival
	occasion: text('occasion'), // Diwali, Birthday, Daily
	ingredients: text('ingredients'), // JSON array
	preparation: text('preparation'),
	shelfLife: text('shelf_life'),
	storage: text('storage'),
	nutrition: text('nutrition'), // JSON object
	difficulty: text('difficulty')
});

export const foodsSpiceries = sqliteTable('foods_spiceries', {
	id: text('id').primaryKey(),
	foodId: text('food_id').notNull().references(() => foods.id),
	spiceName: text('spice_name').notNull(),
	type: text('type'), // Whole, Powder, Paste
	origin: text('origin'),
	uses: text('uses'), // JSON array
	healthBenefits: text('health_benefits'),
	storage: text('storage'),
	shelfLife: text('shelf_life'),
	substitutes: text('substitutes'), // JSON array
	quantity: real('quantity'),
	unit: text('unit')
});

// ===== NEW INVENTORY CHILD TABLES =====

// Enhanced Inventory Child Tables
export const inventoryIngredients = sqliteTable('inventory_ingredients', {
	id: text('id').primaryKey(),
	inventoryId: text('inventory_id').notNull().references(() => inventory.id),
	name: text('name').notNull(),
	category: text('category'), // Vegetable, Fruit, Grain, Dairy, etc.
	quantity: real('quantity'),
	unit: text('unit'),
	quality: text('quality'), // Fresh, Organic, Local
	source: text('source'),
	expiryDate: integer('expiry_date', { mode: 'timestamp' }),
	storage: text('storage'), // Refrigerator, Pantry, Freezer
	nutrition: text('nutrition'), // JSON object
	lastUpdated: integer('last_updated', { mode: 'timestamp' })
});

export const inventoryGrocery = sqliteTable('inventory_grocery', {
	id: text('id').primaryKey(),
	inventoryId: text('inventory_id').notNull().references(() => inventory.id),
	itemName: text('item_name').notNull(),
	brand: text('brand'),
	category: text('category'), // Canned, Packaged, Beverages, etc.
	quantity: real('quantity'),
	unit: text('unit'),
	price: real('price'),
	purchaseDate: integer('purchase_date', { mode: 'timestamp' }),
	expiryDate: integer('expiry_date', { mode: 'timestamp' }),
	preferred: integer('preferred', { mode: 'boolean' }).default(false)
});

export const inventorySpices = sqliteTable('inventory_spices', {
	id: text('id').primaryKey(),
	inventoryId: text('inventory_id').notNull().references(() => inventory.id),
	spiceName: text('spice_name').notNull(),
	form: text('form'), // Whole, Ground, Paste
	quantity: real('quantity'),
	unit: text('unit'),
	potency: text('potency'), // Strong, Medium, Mild
	purchaseDate: integer('purchase_date', { mode: 'timestamp' }),
	expiryDate: integer('expiry_date', { mode: 'timestamp' }),
	origin: text('origin'),
	uses: text('uses'), // JSON array
});

export const inventoryOils = sqliteTable('inventory_oils', {
	id: text('id').primaryKey(),
	inventoryId: text('inventory_id').notNull().references(() => inventory.id),
	oilName: text('oil_name').notNull(),
	type: text('type'), // Cooking, Essential, Cosmetic
	quantity: real('quantity'),
	unit: text('unit'),
	grade: text('grade'), // Virgin, Extra Virgin, Refined
	uses: text('uses'), // JSON array
	expiryDate: integer('expiry_date', { mode: 'timestamp' }),
	storage: text('storage'),
	benefits: text('benefits')
});

export const inventoryFruits = sqliteTable('inventory_fruits', {
	id: text('id').primaryKey(),
	inventoryId: text('inventory_id').notNull().references(() => inventory.id),
	fruitName: text('fruit_name').notNull(),
	variety: text('variety'),
	quantity: real('quantity'),
	unit: text('unit'),
	season: text('season'),
	ripeness: text('ripeness'), // Unripe, Ripe, Overripe
	source: text('source'), // Local, Imported
	expiryDate: integer('expiry_date', { mode: 'timestamp' }),
	nutrition: text('nutrition'), // JSON object
});

export const inventoryToiletry = sqliteTable('inventory_toiletry', {
	id: text('id').primaryKey(),
	inventoryId: text('inventory_id').notNull().references(() => inventory.id),
	itemName: text('item_name').notNull(),
	category: text('category'), // Soap, Shampoo, Toothpaste, etc.
	brand: text('brand'),
	quantity: real('quantity'),
	unit: text('unit'),
	skinType: text('skin_type'), // For applicable items
	expiryDate: integer('expiry_date', { mode: 'timestamp' }),
	usage: text('usage'), // Daily, Weekly, etc.
	preferred: integer('preferred', { mode: 'boolean' }).default(false)
});

export const inventoryStationery = sqliteTable('inventory_stationery', {
	id: text('id').primaryKey(),
	inventoryId: text('inventory_id').notNull().references(() => inventory.id),
	itemName: text('item_name').notNull(),
	category: text('category'), // Pens, Paper, Books, etc.
	quantity: real('quantity'),
	unit: text('unit'),
	quality: text('quality'), // Standard, Premium
	usage: text('usage'), // School, Office, Art
	expiryDate: integer('expiry_date', { mode: 'timestamp' }),
	reorderPoint: real('reorder_point')
});

export const inventoryRitual = sqliteTable('inventory_ritual', {
	id: text('id').primaryKey(),
	inventoryId: text('inventory_id').notNull().references(() => inventory.id),
	itemName: text('item_name').notNull(),
	ritual: text('ritual'), // Pooja, Homa, Festival
	category: text('category'), // Incense, Flowers, Lamps, etc.
	quantity: real('quantity'),
	unit: text('unit'),
	spirituality: text('spirituality'), // Sacred, Auspicious
	expiryDate: integer('expiry_date', { mode: 'timestamp' }),
	storage: text('storage'), // Temple, Cupboard, etc.
});

export const inventoryHardware = sqliteTable('inventory_hardware', {
	id: text('id').primaryKey(),
	inventoryId: text('inventory_id').notNull().references(() => inventory.id),
	itemName: text('item_name').notNull(),
	category: text('category'), // Tools, Fasteners, Electrical, etc.
	quantity: real('quantity'),
	unit: text('unit'),
	condition: text('condition'), // New, Used, Needs Repair
	location: text('location'), // Garage, Shed, Workshop
	lastUsed: integer('last_used', { mode: 'timestamp' }),
	maintenance: text('maintenance')
});

export const inventorySoftware = sqliteTable('inventory_software', {
	id: text('id').primaryKey(),
	inventoryId: text('inventory_id').notNull().references(() => inventory.id),
	softwareName: text('software_name').notNull(),
	version: text('version'),
	license: text('license'), // Free, Paid, Subscription
	platform: text('platform'), // Windows, Mac, Web, Mobile
	purpose: text('purpose'),
	expiryDate: integer('expiry_date', { mode: 'timestamp' }),
	installedOn: text('installed_on'), // JSON array of devices
	lastUpdated: integer('last_updated', { mode: 'timestamp' })
});

export const inventoryUtensils = sqliteTable('inventory_utensils', {
	id: text('id').primaryKey(),
	inventoryId: text('inventory_id').notNull().references(() => inventory.id),
	itemName: text('item_name').notNull(),
	category: text('category'), // Cooking, Serving, Baking, etc.
	material: text('material'), // Stainless Steel, Copper, Wood, etc.
	quantity: integer('quantity'),
	condition: text('condition'), // New, Good, Needs Cleaning, Damaged
	location: text('location'), // Kitchen, Storage
	lastUsed: integer('last_used', { mode: 'timestamp' }),
	care: text('care') // Hand wash, Dishwasher safe, etc.
});

export const inventoryToys = sqliteTable('inventory_toys', {
	id: text('id').primaryKey(),
	inventoryId: text('inventory_id').notNull().references(() => inventory.id),
	toyName: text('toy_name').notNull(),
	category: text('category'), // Educational, Outdoor, Indoor, etc.
	ageGroup: text('age_group'), // 0-2, 3-5, 6-8, etc.
	condition: text('condition'), // New, Good, Worn
	location: text('location'),
	lastUsed: integer('last_used', { mode: 'timestamp' }),
	safety: text('safety'), // Safe, Needs supervision, Damaged
});

export const inventoryBooks = sqliteTable('inventory_books', {
	id: text('id').primaryKey(),
	inventoryId: text('inventory_id').notNull().references(() => inventory.id),
	title: text('title').notNull(),
	author: text('author'),
	category: text('category'), // Fiction, Non-fiction, Educational, etc.
	isbn: text('isbn'),
	condition: text('condition'), // New, Good, Worn, Damaged
	location: text('location'),
	language: text('language'),
	lastRead: integer('last_read', { mode: 'timestamp' }),
	rating: integer('rating') // 1-5
});

export const inventoryAppliances = sqliteTable('inventory_appliances', {
	id: text('id').primaryKey(),
	inventoryId: text('inventory_id').notNull().references(() => inventory.id),
	applianceName: text('appliance_name').notNull(),
	category: text('category'), // Kitchen, Laundry, Entertainment, etc.
	brand: text('brand'),
	model: text('model'),
	purchaseDate: integer('purchase_date', { mode: 'timestamp' }),
	warrantyExpiry: integer('warranty_expiry', { mode: 'timestamp' }),
	condition: text('condition'), // New, Good, Needs Repair
	location: text('location'),
	maintenance: text('maintenance'), // JSON array of service history
});

export const inventoryClothing = sqliteTable('inventory_clothing', {
	id: text('id').primaryKey(),
	inventoryId: text('inventory_id').notNull().references(() => inventory.id),
	itemName: text('item_name').notNull(),
	category: text('category'), // Shirt, Pants, Dress, etc.
	size: text('size'),
	color: text('color'),
	brand: text('brand'),
	condition: text('condition'), // New, Good, Worn, Stained
	season: text('season'), // Summer, Winter, All season
	lastWorn: integer('last_worn', { mode: 'timestamp' }),
	location: text('location')
});

export const inventoryMedicines = sqliteTable('inventory_medicines', {
	id: text('id').primaryKey(),
	inventoryId: text('inventory_id').notNull().references(() => inventory.id),
	medicineName: text('medicine_name').notNull(),
	type: text('type'), // Tablet, Syrup, Injection, etc.
	dosage: text('dosage'),
	quantity: real('quantity'),
	unit: text('unit'),
	prescribedBy: text('prescribed_by'),
	purchaseDate: integer('purchase_date', { mode: 'timestamp' }),
	expiryDate: integer('expiry_date', { mode: 'timestamp' }),
	storage: text('storage'), // Room temperature, Refrigerator
	usage: text('usage'), // For fever, Pain relief, etc.
});

// ===== NEW DUTIES CHILD TABLES =====

// Enhanced Duties Child Tables
export const dutiesKarmic = sqliteTable('duties_karmic', {
	id: text('id').primaryKey(),
	taskId: text('task_id').notNull().references(() => tasks.id),
	dutyName: text('duty_name').notNull(),
	sanskrit: text('sanskrit'), // Sanskrit name
	meaning: text('meaning'),
	category: text('category'), // Dharma, Artha, Kama, Moksha
	linkedWisdom: text('linked_wisdom'), // Reference to family wisdom
	frequency: text('frequency'),
	karmaPoints: integer('karma_points'),
	responsible: text('responsible').references(() => user.id),
	lastPerformed: integer('last_performed', { mode: 'timestamp' })
});

export const dutiesDharmic = sqliteTable('duties_dharmic', {
	id: text('id').primaryKey(),
	taskId: text('task_id').notNull().references(() => tasks.id),
	dutyName: text('duty_name').notNull(),
	principle: text('principle'), // Righteousness, Justice, Truth
	application: text('application'), // Daily life, Family, Society
	linkedWisdom: text('linked_wisdom'),
	examples: text('examples'), // JSON array
	karmaPoints: integer('karma_points'),
	responsible: text('responsible').references(() => user.id),
	lastPerformed: integer('last_performed', { mode: 'timestamp' })
});

export const dutiesSelf = sqliteTable('duties_self', {
	id: text('id').primaryKey(),
	taskId: text('task_id').notNull().references(() => tasks.id),
	dutyName: text('duty_name').notNull(),
	aspect: text('aspect'), // Physical, Mental, Spiritual
	goal: text('goal'),
	practice: text('practice'),
	linkedWisdom: text('linked_wisdom'),
	progress: text('progress'),
	karmaPoints: integer('karma_points'),
	lastPerformed: integer('last_performed', { mode: 'timestamp' })
});

export const dutiesHeavenly = sqliteTable('duties_heavenly', {
	id: text('id').primaryKey(),
	taskId: text('task_id').notNull().references(() => tasks.id),
	dutyName: text('duty_name').notNull(),
	divine: text('divine'), // Reference to deity or divine principle
	ritual: text('ritual'),
	offering: text('offering'),
	linkedWisdom: text('linked_wisdom'),
	karmaPoints: integer('karma_points'),
	responsible: text('responsible').references(() => user.id),
	lastPerformed: integer('last_performed', { mode: 'timestamp' })
});

export const dutiesDivine = sqliteTable('duties_divine', {
	id: text('id').primaryKey(),
	taskId: text('task_id').notNull().references(() => tasks.id),
	dutyName: text('duty_name').notNull(),
	spirituality: text('spirituality'),
	practice: text('practice'), // Meditation, Prayer, Service
	linkedWisdom: text('linked_wisdom'),
	enlightenment: text('enlightenment'), // Goal or benefit
	karmaPoints: integer('karma_points'),
	responsible: text('responsible').references(() => user.id),
	lastPerformed: integer('last_performed', { mode: 'timestamp' })
});

export const dutiesEarthly = sqliteTable('duties_earthly', {
	id: text('id').primaryKey(),
	taskId: text('task_id').notNull().references(() => tasks.id),
	dutyName: text('duty_name').notNull(),
	nature: text('nature'), // Environment, Animals, Community
	action: text('action'),
	impact: text('impact'),
	linkedWisdom: text('linked_wisdom'),
	karmaPoints: integer('karma_points'),
	responsible: text('responsible').references(() => user.id),
	lastPerformed: integer('last_performed', { mode: 'timestamp' })
});

export const dutiesClan = sqliteTable('duties_clan', {
	id: text('id').primaryKey(),
	taskId: text('task_id').notNull().references(() => tasks.id),
	dutyName: text('duty_name').notNull(),
	clan: text('clan'), // Family lineage, Community
	tradition: text('tradition'),
	obligation: text('obligation'),
	linkedWisdom: text('linked_wisdom'),
	karmaPoints: integer('karma_points'),
	responsible: text('responsible').references(() => user.id),
	lastPerformed: integer('last_performed', { mode: 'timestamp' })
});

// ===== NEW ACTIVITIES CHILD TABLES =====

// Enhanced Activities Child Tables
export const activitiesPhysical = sqliteTable('activities_physical', {
	id: text('id').primaryKey(),
	activityId: text('activity_id').notNull().references(() => activities.id),
	sport: text('sport').notNull(),
	type: text('type'), // Individual, Team, Outdoor, Indoor
	duration: integer('duration'), // minutes
	intensity: text('intensity'), // Low, Medium, High
	equipment: text('equipment'), // JSON array
	benefits: text('benefits'), // JSON array
	coach: text('coach').references(() => user.id),
	lastPerformed: integer('last_performed', { mode: 'timestamp' }),
	progress: text('progress')
});

export const activitiesMental = sqliteTable('activities_mental', {
	id: text('id').primaryKey(),
	activityId: text('activity_id').notNull().references(() => activities.id),
	activity: text('activity').notNull(), // Reading, Learning, Puzzle, etc.
	category: text('category'), // Education, Entertainment, Skill building
	topic: text('topic'),
	resources: text('resources'), // JSON array
	difficulty: text('difficulty'),
	duration: integer('duration'), // minutes
	benefits: text('benefits'), // JSON array
	lastPerformed: integer('last_performed', { mode: 'timestamp' })
});

export const activitiesSoulful = sqliteTable('activities_soulful', {
	id: text('id').primaryKey(),
	activityId: text('activity_id').notNull().references(() => activities.id),
	practice: text('practice').notNull(), // Meditation, Prayer, Yoga, etc.
	tradition: text('tradition'), // Hindu, Buddhist, Christian, etc.
	technique: text('technique'),
	duration: integer('duration'), // minutes
	frequency: text('frequency'),
	benefits: text('benefits'), // JSON array
	guide: text('guide').references(() => user.id),
	lastPerformed: integer('last_performed', { mode: 'timestamp' })
});

export const activitiesSkills = sqliteTable('activities_skills', {
	id: text('id').primaryKey(),
	activityId: text('activity_id').notNull().references(() => activities.id),
	skill: text('skill').notNull(),
	category: text('category'), // Technical, Artistic, Language, etc.
	level: text('level'), // Beginner, Intermediate, Advanced
	instructor: text('instructor').references(() => user.id),
	resources: text('resources'), // JSON array
	progress: text('progress'),
	certification: integer('certification', { mode: 'boolean' }).default(false),
	lastPracticed: integer('last_practiced', { mode: 'timestamp' })
});

export const activitiesExpertise = sqliteTable('activities_expertise', {
	id: text('id').primaryKey(),
	activityId: text('activity_id').notNull().references(() => activities.id),
	field: text('field').notNull(),
	specialization: text('specialization'),
	experience: text('experience'), // Years
	achievements: text('achievements'), // JSON array
	mentoring: integer('mentoring', { mode: 'boolean' }).default(false),
	publications: text('publications'), // JSON array
	lastActive: integer('last_active', { mode: 'timestamp' })
});

export const activitiesAchievements = sqliteTable('activities_achievements', {
	id: text('id').primaryKey(),
	activityId: text('activity_id').notNull().references(() => activities.id),
	achievement: text('achievement').notNull(),
	category: text('category'), // Academic, Sports, Arts, etc.
	date: integer('date', { mode: 'timestamp' }).notNull(),
	recognition: text('recognition'), // Award, Certificate, Trophy
	organizer: text('organizer'),
	significance: text('significance'),
	media: text('media'), // JSON array of photos/videos
	shared: integer('shared', { mode: 'boolean' }).default(false)
});

// ===== NEW FINANCES CHILD TABLES =====

// Enhanced Finances Child Tables
export const financesIncome = sqliteTable('finances_income', {
	id: text('id').primaryKey(),
	financeId: text('finance_id').notNull().references(() => finance.id),
	source: text('source').notNull(), // Salary, Business, Investment, etc.
	type: text('type'), // Active, Passive, One-time
	amount: real('amount').notNull(),
	frequency: text('frequency'), // Monthly, Quarterly, Annual
	taxable: integer('taxable', { mode: 'boolean' }).default(true),
	receivedDate: integer('received_date', { mode: 'timestamp' }),
	notes: text('notes'),
	linkedDuty: text('linked_duty') // Reference to earning responsibility
});

export const financesExpenses = sqliteTable('finances_expenses', {
	id: text('id').primaryKey(),
	financeId: text('finance_id').notNull().references(() => finance.id),
	category: text('category').notNull(), // Food, Transport, Education, etc.
	subCategory: text('sub_category'),
	amount: real('amount').notNull(),
	date: integer('date', { mode: 'timestamp' }).notNull(),
	paymentMode: text('payment_mode'), // Cash, Card, UPI, etc.
	recurring: integer('recurring', { mode: 'boolean' }).default(false),
	necessity: text('necessity'), // Essential, Discretionary
	linkedDuty: text('linked_duty'), // Reference to prime duty
	notes: text('notes')
});

export const financesSavings = sqliteTable('finances_savings', {
	id: text('id').primaryKey(),
	financeId: text('finance_id').notNull().references(() => finance.id),
	fundName: text('fund_name').notNull(),
	type: text('type'), // Emergency, Retirement, Education, etc.
	targetAmount: real('target_amount'),
	currentAmount: real('current_amount').default(0),
	interestRate: real('interest_rate'),
	maturityDate: integer('maturity_date', { mode: 'timestamp' }),
	risk: text('risk'), // Low, Medium, High
	locked: integer('locked', { mode: 'boolean' }).default(false),
	lastUpdated: integer('last_updated', { mode: 'timestamp' })
});

export const financesSettlements = sqliteTable('finances_settlements', {
	id: text('id').primaryKey(),
	financeId: text('finance_id').notNull().references(() => finance.id),
	settlementType: text('settlement_type'), // Loan, Debt, Advance, etc.
	party: text('party'), // Who owes or is owed
	amount: real('amount').notNull(),
	settlementDate: integer('settlement_date', { mode: 'timestamp' }),
	status: text('status'), // Pending, Partial, Completed
	terms: text('terms'),
	linkedDuty: text('linked_duty'), // Reference to prime duty
	notes: text('notes')
});

// ===== NEW ASSETS CHILD TABLES =====

// Enhanced Assets Child Tables
export const assetsDocuments = sqliteTable('assets_documents', {
	id: text('id').primaryKey(),
	assetId: text('asset_id').notNull().references(() => assets.id),
	documentType: text('document_type').notNull(), // ID, Certificate, License, etc.
	documentName: text('document_name').notNull(),
	issuer: text('issuer'),
	issueDate: integer('issue_date', { mode: 'timestamp' }),
	expiryDate: integer('expiry_date', { mode: 'timestamp' }),
	documentNumber: text('document_number'),
	storageLocation: text('storage_location'),
	digitalCopy: integer('digital_copy', { mode: 'boolean' }).default(false),
	renewalReminder: integer('renewal_reminder', { mode: 'boolean' }).default(true),
	lastVerified: integer('last_verified', { mode: 'timestamp' })
});

export const assetsCertificates = sqliteTable('assets_certificates', {
	id: text('id').primaryKey(),
	assetId: text('asset_id').notNull().references(() => assets.id),
	certificateType: text('certificate_type').notNull(), // Education, Professional, Achievement
	title: text('title').notNull(),
	issuer: text('issuer'),
	issueDate: integer('issue_date', { mode: 'timestamp' }),
	expiryDate: integer('expiry_date', { mode: 'timestamp' }),
	grade: text('grade'),
	recipient: text('recipient').references(() => user.id),
	storageLocation: text('storage_location'),
	digitalCopy: integer('digital_copy', { mode: 'boolean' }).default(false),
	verification: text('verification'), // Online verification link
});

export const assetsPhotos = sqliteTable('assets_photos', {
	id: text('id').primaryKey(),
	assetId: text('asset_id').notNull().references(() => assets.id),
	album: text('album').notNull(),
	event: text('event'),
	date: integer('date', { mode: 'timestamp' }),
	location: text('location'),
	photographer: text('photographer'),
	subjects: text('subjects'), // JSON array of people
	tags: text('tags'), // JSON array
	quality: text('quality'), // Digital, Print
	storage: text('storage'), // Digital, Physical album
	description: text('description')
});

export const assetsValuables = sqliteTable('assets_valuables', {
	id: text('id').primaryKey(),
	assetId: text('asset_id').notNull().references(() => assets.id),
	itemName: text('item_name').notNull(),
	category: text('category'), // Jewelry, Antique, Collectible, etc.
	material: text('material'),
	estimatedValue: real('estimated_value'),
	appraisedDate: integer('appraised_date', { mode: 'timestamp' }),
	appraiser: text('appraiser'),
	insured: integer('insured', { mode: 'boolean' }).default(false),
	insuranceValue: real('insurance_value'),
	storageLocation: text('storage_location'),
	condition: text('condition'),
	provenance: text('provenance')
});

export const assetsVehicles = sqliteTable('assets_vehicles', {
	id: text('id').primaryKey(),
	assetId: text('asset_id').notNull().references(() => assets.id),
	vehicleType: text('vehicle_type').notNull(), // Car, Bike, Scooter, etc.
	make: text('make'),
	model: text('model'),
	year: integer('year'),
	registrationNumber: text('registration_number'),
	engineNumber: text('engine_number'),
	chassisNumber: text('chassis_number'),
	color: text('color'),
	fuelType: text('fuel_type'),
	insuranceExpiry: integer('insurance_expiry', { mode: 'timestamp' }),
	pollutionExpiry: integer('pollution_expiry', { mode: 'timestamp' }),
	lastService: integer('last_service', { mode: 'timestamp' }),
	mileage: real('mileage'),
	condition: text('condition')
});

export const assetsLand = sqliteTable('assets_land', {
	id: text('id').primaryKey(),
	assetId: text('asset_id').notNull().references(() => assets.id),
	landType: text('land_type'), // Agricultural, Residential, Commercial
	area: real('area'),
	unit: text('unit'), // Acres, Sq ft, etc.
	location: text('location'),
	surveyNumber: text('survey_number'),
	titleDeed: text('title_deed'),
	owner: text('owner').references(() => user.id),
	encumbrances: text('encumbrances'),
	taxAssessment: real('tax_assessment'),
	lastSurvey: integer('last_survey', { mode: 'timestamp' }),
	coordinates: text('coordinates'), // GPS coordinates
});

export const assetsBuildings = sqliteTable('assets_buildings', {
	id: text('id').primaryKey(),
	assetId: text('asset_id').notNull().references(() => assets.id),
	buildingType: text('building_type'), // House, Apartment, Office, etc.
	address: text('address'),
	size: real('size'),
	unit: text('unit'), // Sq ft, Sq meters
	floors: integer('floors'),
	bedrooms: integer('bedrooms'),
	bathrooms: integer('bathrooms'),
	constructionYear: integer('construction_year'),
	titleDeed: text('title_deed'),
	taxAssessment: real('tax_assessment'),
	insurance: integer('insurance', { mode: 'boolean' }).default(false),
	lastInspection: integer('last_inspection', { mode: 'timestamp' })
});

export const assetsSoftware = sqliteTable('assets_software', {
	id: text('id').primaryKey(),
	assetId: text('asset_id').notNull().references(() => assets.id),
	softwareName: text('software_name').notNull(),
	version: text('version'),
	licenseType: text('license_type'), // Perpetual, Subscription, Open source
	licenseKey: text('license_key'),
	purchaseDate: integer('purchase_date', { mode: 'timestamp' }),
	expiryDate: integer('expiry_date', { mode: 'timestamp' }),
	vendor: text('vendor'),
	cost: real('cost'),
	installedOn: text('installed_on'), // JSON array of devices
	autoRenewal: integer('auto_renewal', { mode: 'boolean' }).default(false),
	lastUpdated: integer('last_updated', { mode: 'timestamp' })
});

export const assetsDigitalArchives = sqliteTable('assets_digital_archives', {
	id: text('id').primaryKey(),
	assetId: text('asset_id').notNull().references(() => assets.id),
	archiveName: text('archive_name').notNull(),
	category: text('archive_category'), // Documents, Photos, Videos, Audio
	format: text('format'), // PDF, JPG, MP4, etc.
	size: real('size'), // in MB/GB
	location: text('location'), // Cloud, Local drive, External drive
	backup: integer('backup', { mode: 'boolean' }).default(false),
	encryption: integer('encryption', { mode: 'boolean' }).default(false),
	lastAccessed: integer('last_accessed', { mode: 'timestamp' }),
	description: text('description'),
	tags: text('tags') // JSON array
});

export const assetsPoojaSets = sqliteTable('assets_pooja_sets', {
	id: text('id').primaryKey(),
	assetId: text('asset_id').notNull().references(() => assets.id),
	setName: text('set_name').notNull(),
	deity: text('deity'),
	components: text('components'), // JSON array of items
	material: text('material'), // Brass, Silver, Wood, etc.
	condition: text('condition'),
	lastUsed: integer('last_used', { mode: 'timestamp' }),
	storage: text('storage'),
	significance: text('significance'),
	handedDown: integer('handed_down', { mode: 'boolean' }).default(false)
});

export const assetsFurniture = sqliteTable('assets_furniture', {
	id: text('id').primaryKey(),
	assetId: text('asset_id').notNull().references(() => assets.id),
	itemName: text('item_name').notNull(),
	category: text('category'), // Seating, Storage, Table, Decor, etc.
	material: text('material'),
	room: text('room'),
	purchaseDate: integer('purchase_date', { mode: 'timestamp' }),
	condition: text('condition'),
	value: real('value'),
	lastPolished: integer('last_polished', { mode: 'timestamp' }),
	maintenance: text('maintenance')
});

export const assetsTools = sqliteTable('assets_tools', {
	id: text('id').primaryKey(),
	assetId: text('asset_id').notNull().references(() => assets.id),
	toolName: text('tool_name').notNull(),
	category: text('category'), // Hand tools, Power tools, Gardening, etc.
	brand: text('brand'),
	purchaseDate: integer('purchase_date', { mode: 'timestamp' }),
	condition: text('condition'),
	location: text('location'),
	lastUsed: integer('last_used', { mode: 'timestamp' }),
	maintenance: text('maintenance'),
	safety: text('safety') // Safety precautions
});

export const assetsEquipments = sqliteTable('assets_equipments', {
	id: text('id').primaryKey(),
	assetId: text('asset_id').notNull().references(() => assets.id),
	equipmentName: text('equipment_name').notNull(),
	category: text('category'), // Kitchen, Fitness, Medical, etc.
	brand: text('brand'),
	model: text('model'),
	purchaseDate: integer('purchase_date', { mode: 'timestamp' }),
	warrantyExpiry: integer('warranty_expiry', { mode: 'timestamp' }),
	condition: text('condition'),
	value: real('value'),
	maintenance: text('maintenance'), // JSON array
	lastServiced: integer('last_serviced', { mode: 'timestamp' })
});

export const assetsMedia = sqliteTable('assets_media', {
	id: text('id').primaryKey(),
	assetId: text('asset_id').notNull().references(() => assets.id),
	title: text('title').notNull(),
	type: text('type'), // Book, DVD, CD, Vinyl, etc.
	category: text('category'), // Movie, Music, Educational, etc.
	creator: text('creator'), // Author, Director, Artist
	publicationYear: integer('publication_year'),
	condition: text('condition'),
	value: real('value'),
	location: text('location'),
	lastAccessed: integer('last_accessed', { mode: 'timestamp' }),
	loaned: integer('loaned', { mode: 'boolean' }).default(false)
});

export const assetsAlbums = sqliteTable('assets_albums', {
	id: text('id').primaryKey(),
	assetId: text('asset_id').notNull().references(() => assets.id),
	albumName: text('album_name').notNull(),
	type: text('type'), // Photo album, Stamp collection, etc.
	theme: text('theme'),
	year: integer('year'),
	creator: text('creator').references(() => user.id),
	pages: integer('pages'),
	condition: text('condition'),
	storage: text('storage'),
	significance: text('significance'),
	lastViewed: integer('last_viewed', { mode: 'timestamp' })
});

export const assetsArts = sqliteTable('assets_arts', {
	id: text('id').primaryKey(),
	assetId: text('asset_id').notNull().references(() => assets.id),
	artworkName: text('artwork_name').notNull(),
	artist: text('artist'),
	type: text('type'), // Painting, Sculpture, Digital art, etc.
	medium: text('medium'), // Oil, Watercolor, Clay, etc.
	year: integer('year'),
	dimensions: text('dimensions'),
	value: real('value'),
	appraisedDate: integer('appraised_date', { mode: 'timestamp' }),
	location: text('location'),
	condition: text('condition'),
	significance: text('significance')
});

// ===== NEW FAMILY CHILD TABLES =====

// Enhanced Family Child Tables
export const familyProfile = sqliteTable('family_profile', {
	id: text('id').primaryKey(),
	familyId: text('family_id').notNull().references(() => family.id),
	memberName: text('member_name').notNull(),
	relation: text('relation'), // Father, Mother, Son, Daughter, etc.
	birthDate: integer('birth_date', { mode: 'timestamp' }),
	birthPlace: text('birth_place'),
	gotram: text('gotram'), // Family lineage
	rashi: text('rashi'), // Zodiac sign
	nakshatra: text('nakshatra'),
	education: text('education'),
	profession: text('profession'),
	achievements: text('achievements'), // JSON array
	personality: text('personality'),
	hobbies: text('hobbies'), // JSON array
	contact: text('contact'),
	emergencyContact: text('emergency_contact'),
	lastUpdated: integer('last_updated', { mode: 'timestamp' })
});

export const familyWisdom = sqliteTable('family_wisdom', {
	id: text('id').primaryKey(),
	familyId: text('family_id').notNull().references(() => family.id),
	lesson: text('lesson').notNull(),
	category: text('category'), // Life, Dharma, Karma, Relationships
	story: text('story'),
	teaching: text('teaching'),
	contributor: text('contributor').references(() => user.id),
	source: text('source'), // Ancestor, Scripture, Experience
	applicableTo: text('applicable_to'), // Children, Adults, All
	mediaType: text('media_type'), // Text, Audio, Video
	verified: integer('verified', { mode: 'boolean' }).default(false),
	lastShared: integer('last_shared', { mode: 'timestamp' })
});

export const familyHeritage = sqliteTable('family_heritage', {
	id: text('id').primaryKey(),
	familyId: text('family_id').notNull().references(() => family.id),
	heritageType: text('heritage_type').notNull(), // Cultural, Spiritual, Material
	title: text('title').notNull(),
	description: text('description'),
	origin: text('origin'), // Which ancestor or period
	significance: text('significance'),
	preservation: text('preservation'), // How it's maintained
	media: text('media'), // JSON array of photos/videos
	shared: integer('shared', { mode: 'boolean' }).default(false),
	lastCelebrated: integer('last_celebrated', { mode: 'timestamp' })
});

export const familyTradition = sqliteTable('family_tradition', {
	id: text('id').primaryKey(),
	familyId: text('family_id').notNull().references(() => family.id),
	traditionName: text('tradition_name').notNull(),
	category: text('category'), // Religious, Cultural, Festival, Daily
	occasion: text('occasion'), // Diwali, Birthday, Daily prayer, etc.
	ritual: text('ritual'), // JSON array of steps
	materials: text('materials'), // JSON array
	participants: text('participants'), // JSON array of roles
	significance: text('significance'),
	lastPerformed: integer('last_performed', { mode: 'timestamp' }),
	documented: integer('documented', { mode: 'boolean' }).default(false)
});

export const familyStories = sqliteTable('family_stories', {
	id: text('id').primaryKey(),
	familyId: text('family_id').notNull().references(() => family.id),
	storyTitle: text('story_title').notNull(),
	category: text('category'), // Historical, Moral, Adventure, Family
	narrator: text('narrator').references(() => user.id),
	mainCharacters: text('main_characters'), // JSON array
	setting: text('setting'), // Time and place
	plot: text('plot'),
	moral: text('moral'),
	lessons: text('lessons'), // JSON array
	media: text('media'), // JSON array
	verified: integer('verified', { mode: 'boolean' }).default(false),
	lastTold: integer('last_told', { mode: 'timestamp' })
});

export const familyLegacy = sqliteTable('family_legacy', {
	id: text('id').primaryKey(),
	familyId: text('family_id').notNull().references(() => family.id),
	legacyType: text('legacy_type').notNull(), // Spiritual, Professional, Social
	title: text('title').notNull(),
	description: text('description'),
	establishedBy: text('established_by'), // Ancestor name
	year: integer('year'),
	currentStatus: text('current_status'),
	continuation: text('continuation'), // How it's maintained
	impact: text('impact'),
	documentation: text('documentation'), // JSON array
	inspiration: text('inspiration')
});

export const familySuccess = sqliteTable('family_success', {
	id: text('id').primaryKey(),
	familyId: text('family_id').notNull().references(() => family.id),
	successType: text('success_type').notNull(), // Personal, Professional, Spiritual
	achievement: text('achievement').notNull(),
	achiever: text('achiever').references(() => user.id),
	date: integer('date', { mode: 'timestamp' }),
	category: text('category'), // Education, Career, Service, etc.
	recognition: text('recognition'),
	impact: text('impact'),
	lessons: text('lessons'),
	media: text('media'), // JSON array
	inspiring: integer('inspiring', { mode: 'boolean' }).default(true)
});

export const familyAchievements = sqliteTable('family_achievements', {
	id: text('id').primaryKey(),
	familyId: text('family_id').notNull().references(() => family.id),
	achievement: text('achievement').notNull(),
	category: text('category'), // Academic, Sports, Arts, Service
	achiever: text('achiever').references(() => user.id),
	date: integer('date', { mode: 'timestamp' }),
	level: text('level'), // Local, State, National, International
	recognition: text('recognition'),
	organizer: text('organizer'),
	significance: text('significance'),
	media: text('media'), // JSON array
	celebrated: integer('celebrated', { mode: 'boolean' }).default(false)
});

export const familyCertifications = sqliteTable('family_certifications', {
	id: text('id').primaryKey(),
	familyId: text('family_id').notNull().references(() => family.id),
	certificationName: text('certification_name').notNull(),
	issuer: text('issuer'),
	recipient: text('recipient').references(() => user.id),
	issueDate: integer('issue_date', { mode: 'timestamp' }),
	expiryDate: integer('expiry_date', { mode: 'timestamp' }),
	category: text('category'), // Professional, Educational, Skill
	grade: text('grade'),
	verification: text('verification'), // Online verification link
	renewal: integer('renewal', { mode: 'boolean' }).default(false),
	displayed: integer('displayed', { mode: 'boolean' }).default(false)
});

export const familyPhotos = sqliteTable('family_photos', {
	id: text('id').primaryKey(),
	familyId: text('family_id').notNull().references(() => family.id),
	event: text('event').notNull(),
	date: integer('date', { mode: 'timestamp' }),
	location: text('location'),
	photographer: text('photographer'),
	subjects: text('subjects'), // JSON array of family members
	description: text('description'),
	album: text('album'),
	quality: text('quality'), // Digital, Print
	storage: text('storage'),
	tags: text('tags'), // JSON array
	shared: integer('shared', { mode: 'boolean' }).default(false)
});

export const familyVideos = sqliteTable('family_videos', {
	id: text('id').primaryKey(),
	familyId: text('family_id').notNull().references(() => family.id),
	videoTitle: text('video_title').notNull(),
	event: text('event'),
	date: integer('date', { mode: 'timestamp' }),
	duration: integer('duration'), // seconds
	location: text('location'),
	subjects: text('subjects'), // JSON array
	description: text('description'),
	format: text('format'), // MP4, AVI, etc.
	quality: text('quality'), // HD, 4K, etc.
	storage: text('storage'),
	tags: text('tags'), // JSON array
	edited: integer('edited', { mode: 'boolean' }).default(false)
});

export const familyLifeLessons = sqliteTable('family_life_lessons', {
	id: text('id').primaryKey(),
	familyId: text('family_id').notNull().references(() => family.id),
	lesson: text('lesson').notNull(),
	category: text('category'), // Dharma, Karma, Relationships, Success
	experience: text('experience'), // Personal experience that taught this
	application: text('application'), // How to apply in daily life
	examples: text('examples'), // JSON array
	teacher: text('teacher').references(() => user.id),
	verified: integer('verified', { mode: 'boolean' }).default(false),
	lastTaught: integer('last_taught', { mode: 'timestamp' })
});

export const familyRules = sqliteTable('family_rules', {
	id: text('id').primaryKey(),
	familyId: text('family_id').notNull().references(() => family.id),
	rule: text('rule').notNull(),
	category: text('category'), // Discipline, Respect, Health, Education
	enforcer: text('enforcer').references(() => user.id),
	consequence: text('consequence'),
	reason: text('reason'),
	flexibility: text('flexibility'), // Strict, Flexible, Situational
	lastEnforced: integer('last_enforced', { mode: 'timestamp' }),
	effective: integer('effective', { mode: 'boolean' }).default(true)
});

export const familyVirtues = sqliteTable('family_virtues', {
	id: text('id').primaryKey(),
	familyId: text('family_id').notNull().references(() => family.id),
	virtue: text('virtue').notNull(), // Honesty, Compassion, Courage, etc.
	sanskrit: text('sanskrit'), // Sanskrit name
	definition: text('definition'),
	practice: text('practice'), // How to cultivate it
	examples: text('examples'), // JSON array from family history
	roleModel: text('role_model').references(() => user.id),
	importance: text('importance'),
	lastDiscussed: integer('last_discussed', { mode: 'timestamp' })
});

export const familyMemories = sqliteTable('family_memories', {
	id: text('id').primaryKey(),
	familyId: text('family_id').notNull().references(() => family.id),
	event: text('event').notNull(),
	date: integer('date', { mode: 'timestamp' }),
	location: text('location'),
	participants: text('participants'), // JSON array
	description: text('description'),
	emotions: text('emotions'), // JSON array
	lessons: text('lessons'),
	media: text('media'), // JSON array
	significance: text('significance'),
	cherished: integer('cherished', { mode: 'boolean' }).default(true),
	lastRecalled: integer('last_recalled', { mode: 'timestamp' })
});

// ===== TYPES =====
