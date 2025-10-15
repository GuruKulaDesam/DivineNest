import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './db/schema';

// For seeding, use the same DATABASE_URL as in .env
const client = createClient({ url: 'file:local.db' });
const db = drizzle(client, { schema });

// Seed data based on the provided sample data
async function seed() {
	console.log('Seeding database...');

	// Users
	const users = [
		{ id: 'father', username: 'father', passwordHash: '$2b$10$dummy.hash.for.demo', role: 'Father', nickname: 'Appa', email: 'ramesh@home.com', location: 'Kovaipudur', joinedDate: new Date('2025-01-01'), pictureUrl: '(URL)' },
		{ id: 'mother', username: 'mother', passwordHash: '$2b$10$dummy.hash.for.demo', role: 'Mother', nickname: 'Amma', email: 'lakshmi@home.com', location: 'Kovaipudur', joinedDate: new Date('2025-01-01'), pictureUrl: '(URL)' },
		{ id: 'child', username: 'child', passwordHash: '$2b$10$dummy.hash.for.demo', role: 'Child', nickname: 'Kutty', email: 'arjun@home.com', location: 'Kovaipudur', joinedDate: new Date('2025-01-01'), pictureUrl: '(URL)' },
		{ id: 'grandparent', username: 'grandparent', passwordHash: '$2b$10$dummy.hash.for.demo', role: 'Grandparent', nickname: 'Paati', email: 'saroja@home.com', location: 'Kovaipudur', joinedDate: new Date('2025-01-01'), pictureUrl: '(URL)' },
		{ id: 'admin', username: 'admin', passwordHash: '$2b$10$dummy.hash.for.demo', role: 'Admin', nickname: 'Nagu', email: 'nagarajan@home.com', location: 'Kovaipudur', joinedDate: new Date('2025-01-01'), pictureUrl: '(URL)' },
		{ id: 'guest', username: 'guest', passwordHash: '$2b$10$dummy.hash.for.demo', role: 'Guest', nickname: 'GuestMeena', email: 'meena@guest.com', location: 'Chennai', joinedDate: new Date('2025-10-01'), pictureUrl: '(URL)' },
		{ id: 'service1', username: 'service1', passwordHash: '$2b$10$dummy.hash.for.demo', role: 'Service Provider', nickname: 'RameshP', email: 'ramesh@plumber.com', location: 'Kovaipudur', joinedDate: new Date('2025-09-15'), pictureUrl: '(URL)' },
		{ id: 'service2', username: 'service2', passwordHash: '$2b$10$dummy.hash.for.demo', role: 'Service Provider', nickname: 'KumarE', email: 'kumar@electric.com', location: 'Kuniyamuthur', joinedDate: new Date('2025-09-20'), pictureUrl: '(URL)' },
		{ id: 'child2', username: 'child2', passwordHash: '$2b$10$dummy.hash.for.demo', role: 'Child', nickname: 'Anu', email: 'ananya@home.com', location: 'Kovaipudur', joinedDate: new Date('2025-01-01'), pictureUrl: '(URL)' },
		{ id: 'admin2', username: 'admin2', passwordHash: '$2b$10$dummy.hash.for.demo', role: 'Admin', nickname: 'AdminPriya', email: 'priya@home.com', location: 'Kovaipudur', joinedDate: new Date('2025-01-01'), pictureUrl: '(URL)' }
	];

	await db.insert(schema.user).values(users);
	console.log('Users seeded');

	// Issues
	const issues = [
		{ id: '1', type: 'External', category: 'Repairs', status: 'Assigned', location: 'Kitchen Sink', contact: '9876543210', assignedTo: 'father', createdBy: 'father', createdAt: new Date() },
		{ id: '2', type: 'External', category: 'Emergency', status: 'In Progress', location: 'Entire House', contact: '9876543211', assignedTo: 'admin', createdBy: 'admin', createdAt: new Date() },
		{ id: '3', type: 'External', category: 'Maintenance', status: 'Reported', location: 'Bedroom', contact: '9876543212', assignedTo: 'mother', createdBy: 'mother', createdAt: new Date() },
		{ id: '4', type: 'External', category: 'Upgrades', status: 'Resolved', location: 'Bathroom', contact: '9876543213', assignedTo: 'admin', createdBy: 'admin', createdAt: new Date() },
		{ id: '5', type: 'External', category: 'Repairs', status: 'Assigned', location: 'Study Room', contact: '9876543214', assignedTo: 'father', createdBy: 'father', createdAt: new Date() },
		{ id: '6', type: 'External', category: 'Emergency', status: 'Reported', location: 'Kitchen', contact: '9876543215', assignedTo: 'admin', createdBy: 'admin', createdAt: new Date() },
		{ id: '7', type: 'External', category: 'Maintenance', status: 'Resolved', location: 'Kitchen', contact: '9876543216', assignedTo: 'mother', createdBy: 'mother', createdAt: new Date() },
		{ id: '8', type: 'External', category: 'Upgrades', status: 'Assigned', location: 'Main Door', contact: '9876543217', assignedTo: 'admin', createdBy: 'admin', createdAt: new Date() },
		{ id: '9', type: 'External', category: 'Urgents', status: 'In Progress', location: 'Living Room', contact: '9876543218', assignedTo: 'father', createdBy: 'father', createdAt: new Date() },
		{ id: '10', type: 'External', category: 'Other', status: 'Reported', location: 'Balcony', contact: '9876543219', assignedTo: 'admin', createdBy: 'admin', createdAt: new Date() }
	];

	await db.insert(schema.issues).values(issues);
	console.log('Issues seeded');

	// Issue Emergency
	await db.insert(schema.issueEmergency).values([
		{ id: '1', issueId: '2', severity: 'High', symptoms: JSON.stringify(['Power outage']), responseTimeGoal: 30, escalationContact: 'Emergency Services', backupPlan: 'Use generator' },
		{ id: '2', issueId: '6', severity: 'High', symptoms: JSON.stringify(['Gas leak']), responseTimeGoal: 15, escalationContact: 'Fire Department' }
	]);

	// Issue Repairs
	await db.insert(schema.issueRepairs).values([
		{ id: '1', issueId: '1', item: 'Sink', damageDescription: 'Leak', repairUrgency: 'Immediate' },
		{ id: '2', issueId: '5', item: 'Internet', damageDescription: 'No connection', repairUrgency: 'Soon' },
		{ id: '3', issueId: '9', item: 'Window', damageDescription: 'Broken', repairUrgency: 'Immediate' }
	]);

	// Issue Maintenance
	await db.insert(schema.issueMaintenance).values([
		{ id: '1', issueId: '3', system: 'AC', lastServicedDate: new Date('2025-08-01'), serviceType: 'Cleaning' },
		{ id: '2', issueId: '7', system: 'Fridge', lastServicedDate: new Date('2025-09-01'), serviceType: 'Cleaning' }
	]);

	// Requests
	const requests = [
		{ id: '1', category: 'Suggestion', status: 'Assigned', location: 'Balcony', contact: '9876543210', applicableRole: 'Mother', createdBy: 'mother', createdAt: new Date() },
		{ id: '2', category: 'Repairs', status: 'Reported', location: 'Study Room', contact: '9876543211', applicableRole: 'Father', createdBy: 'father', createdAt: new Date() },
		{ id: '3', category: 'Maintenance', status: 'In Progress', location: 'Kitchen', contact: '9876543212', applicableRole: 'Mother', createdBy: 'mother', createdAt: new Date() },
		{ id: '4', category: 'Upgrades', status: 'Resolved', location: 'Living Room', contact: '9876543213', applicableRole: 'Admin', createdBy: 'admin', createdAt: new Date() },
		{ id: '5', category: 'Emergency', status: 'Assigned', location: 'Bathroom', contact: '9876543214', applicableRole: 'Father', createdBy: 'father', createdAt: new Date() },
		{ id: '6', category: 'Suggestion', status: 'Reported', location: 'Terrace', contact: '9876543215', applicableRole: 'Mother', createdBy: 'mother', createdAt: new Date() },
		{ id: '7', category: 'Urgents', status: 'In Progress', location: 'Entrance', contact: '9876543216', applicableRole: 'Child', createdBy: 'child', createdAt: new Date() },
		{ id: '8', category: 'Repairs', status: 'Resolved', location: 'Dining Room', contact: '9876543217', applicableRole: 'Grandparent', createdBy: 'grandparent', createdAt: new Date() },
		{ id: '9', category: 'Maintenance', status: 'Assigned', location: 'Study Room', contact: '9876543218', applicableRole: 'Child', createdBy: 'child', createdAt: new Date() },
		{ id: '10', category: 'Suggestion', status: 'Reported', location: 'Living Room', contact: '9876543219', applicableRole: 'Mother', createdBy: 'mother', createdAt: new Date() }
	];

	await db.insert(schema.requests).values(requests);
	console.log('Requests seeded');

	// Request Suggestion
	await db.insert(schema.requestSuggestion).values([
		{ id: '1', requestId: '1', ideaType: 'Wish List', proposedBy: 'Mother', justification: 'Relaxation space' },
		{ id: '2', requestId: '6', ideaType: 'Wish List', proposedBy: 'Mother', justification: 'Meditation space' },
		{ id: '3', requestId: '10', ideaType: 'Improvement', proposedBy: 'Mother', justification: 'Better decor' }
	]);

	// Request Repairs
	await db.insert(schema.requestRepairs).values([
		{ id: '1', requestId: '2', item: 'Study Table', issueObserved: 'Wobbly', suggestedFix: 'Tighten screws' },
		{ id: '2', requestId: '8', item: 'Clock', issueObserved: 'Not working', suggestedFix: 'Replace battery' }
	]);

	// Foods
	const foods = [
		{ id: '1', type: 'Breakfast', category: 'South Indian', healthFactor: 'Good for digestion', time: '20m', cost: 15, applicableRole: 'Mother', createdBy: 'mother', createdAt: new Date() },
		{ id: '2', type: 'Lunch', category: 'North Indian', healthFactor: 'Protein-rich', time: '45m', cost: 40, applicableRole: 'Mother', createdBy: 'mother', createdAt: new Date() },
		{ id: '3', type: 'Dinner', category: 'Chinese', healthFactor: 'Energy booster', time: '30m', cost: 35, applicableRole: 'Mother', createdBy: 'mother', createdAt: new Date() },
		{ id: '4', type: 'Snacks', category: 'American', healthFactor: 'Low calorie', time: '10m', cost: 10, applicableRole: 'Child', createdBy: 'child', createdAt: new Date() },
		{ id: '5', type: 'Drinks', category: 'Indian', healthFactor: 'Hydration', time: '5m', cost: 5, applicableRole: 'All', createdBy: 'admin', createdAt: new Date() },
		{ id: '6', type: 'Lunch', category: 'South Indian', healthFactor: 'Immunity booster', time: '40m', cost: 30, applicableRole: 'Mother', createdBy: 'mother', createdAt: new Date() },
		{ id: '7', type: 'Dinner', category: 'European', healthFactor: 'High carb', time: '35m', cost: 50, applicableRole: 'Father', createdBy: 'father', createdAt: new Date() },
		{ id: '8', type: 'Snacks', category: 'Indian', healthFactor: 'Crunchy treat', time: '25m', cost: 20, applicableRole: 'Grandparent', createdBy: 'grandparent', createdAt: new Date() },
		{ id: '9', type: 'Breakfast', category: 'American', healthFactor: 'Energy-rich', time: '30m', cost: 25, applicableRole: 'Child', createdBy: 'child', createdAt: new Date() },
		{ id: '10', type: 'Drinks', category: 'Indian', healthFactor: 'Stimulating', time: '10m', cost: 10, applicableRole: 'Father', createdBy: 'father', createdAt: new Date() }
	];

	await db.insert(schema.foods).values(foods);
	console.log('Foods seeded');

	// Food South Indian
	await db.insert(schema.foodSouthIndian).values([
		{ id: '1', foodId: '1', dishName: 'Idli', ingredients: JSON.stringify(['Rice', 'Urad dal']), preparationSteps: JSON.stringify(['Soak', 'Grind', 'Ferment', 'Steam']), healthBenefits: 'Digestive health', tasteProfile: 'Savory' },
		{ id: '2', foodId: '6', dishName: 'Sambar Rice', ingredients: JSON.stringify(['Rice', 'Toor dal', 'Vegetables']), preparationSteps: JSON.stringify(['Cook rice', 'Make sambar', 'Mix']), healthBenefits: 'Immunity', tasteProfile: 'Spicy' }
	]);

	// Food Chinese
	await db.insert(schema.foodChinese).values([
		{ id: '1', foodId: '3', dishName: 'Veg Noodles', spiceLevel: 'Medium', oilType: 'Vegetable', vegetarian: true }
	]);

	// Inventory
	const inventory = [
		{ id: '1', type: 'Food Ingredient', category: 'Dry Goods', quantity: 5, unit: 'kg', location: 'Kitchen Shelf', applicableRole: 'Mother', createdBy: 'mother', createdAt: new Date() },
		{ id: '2', type: 'Grocery', category: 'Cleaning', quantity: 2, unit: 'packets', location: 'Utility Room', applicableRole: 'Mother', createdBy: 'mother', createdAt: new Date() },
		{ id: '3', type: 'Toiletry', category: 'Personal Care', quantity: 3, unit: 'tubes', location: 'Bathroom', applicableRole: 'Father', createdBy: 'father', createdAt: new Date() },
		{ id: '4', type: 'Pooja Item', category: 'Ritual Supplies', quantity: 50, unit: 'pieces', location: 'Pooja Room', applicableRole: 'Grandparent', createdBy: 'grandparent', createdAt: new Date() },
		{ id: '5', type: 'Grocery', category: 'Fresh Produce', quantity: 1, unit: 'kg', location: 'Fridge', applicableRole: 'Mother', createdBy: 'mother', createdAt: new Date() },
		{ id: '6', type: 'Toiletry', category: 'Personal Care', quantity: 1, unit: 'bottle', location: 'Bathroom', applicableRole: 'Mother', createdBy: 'mother', createdAt: new Date() },
		{ id: '7', type: 'Food Ingredient', category: 'Spices', quantity: 0.25, unit: 'kg', location: 'Spice Rack', applicableRole: 'Mother', createdBy: 'mother', createdAt: new Date() },
		{ id: '8', type: 'Pooja Item', category: 'Ritual Supplies', quantity: 100, unit: 'g', location: 'Pooja Shelf', applicableRole: 'Grandparent', createdBy: 'grandparent', createdAt: new Date() },
		{ id: '9', type: 'Grocery', category: 'Dry Goods', quantity: 2, unit: 'kg', location: 'Kitchen Shelf', applicableRole: 'Mother', createdBy: 'mother', createdAt: new Date() },
		{ id: '10', type: 'Food Ingredient', category: 'Dry Goods', quantity: 3, unit: 'kg', location: 'Pantry', applicableRole: 'Mother', createdBy: 'mother', createdAt: new Date() }
	];

	await db.insert(schema.inventory).values(inventory);
	console.log('Inventory seeded');

	// Inventory Pooja
	await db.insert(schema.inventoryPooja).values([
		{ id: '1', inventoryId: '4', itemName: 'Camphor', spiritualUse: 'Aromatic offering', storageInstructions: 'Keep dry' },
		{ id: '2', inventoryId: '8', itemName: 'Kumkum', spiritualUse: 'Tilak application', storageInstructions: 'Cool place' }
	]);

	// Inventory Grocery
	await db.insert(schema.inventoryGrocery).values([
		{ id: '1', inventoryId: '1', itemName: 'Rice', preferredVendor: 'Local market' },
		{ id: '2', inventoryId: '2', itemName: 'Detergent', preferredVendor: 'Supermarket' },
		{ id: '3', inventoryId: '5', itemName: 'Tomatoes', shelfLifeDays: 7, preferredVendor: 'Vegetable vendor' },
		{ id: '4', inventoryId: '9', itemName: 'Sugar', preferredVendor: 'Grocery store' },
		{ id: '5', inventoryId: '10', itemName: 'Dal', preferredVendor: 'Local market' }
	]);

	// Tasks
	const tasks = [
		{ id: '1', type: 'Duty', category: 'Household', frequency: 'Daily', location: 'Entire House', applicableRole: 'Child', createdBy: 'child', createdAt: new Date() },
		{ id: '2', type: 'Responsibility', category: 'Parenting', frequency: 'Daily', location: 'Study Room', applicableRole: 'Father', createdBy: 'father', createdAt: new Date() },
		{ id: '3', type: 'Ritual', category: 'Spiritual', frequency: 'Daily', location: 'Pooja Room', applicableRole: 'Grandparent', createdBy: 'grandparent', createdAt: new Date() },
		{ id: '4', type: 'Duty', category: 'Self', frequency: 'Weekly', location: 'Balcony', applicableRole: 'Child', createdBy: 'child', createdAt: new Date() },
		{ id: '5', type: 'Responsibility', category: 'Health', frequency: 'Monthly', location: 'Clinic', applicableRole: 'Mother', createdBy: 'mother', createdAt: new Date() },
		{ id: '6', type: 'Ritual', category: 'Spiritual', frequency: 'Monthly', location: 'Pooja Room', applicableRole: 'Father', createdBy: 'father', createdAt: new Date() },
		{ id: '7', type: 'Duty', category: 'Household', frequency: 'Daily', location: 'Kitchen', applicableRole: 'Mother', createdBy: 'mother', createdAt: new Date() },
		{ id: '8', type: 'Responsibility', category: 'Education', frequency: 'Weekly', location: 'Study Room', applicableRole: 'Admin', createdBy: 'admin', createdAt: new Date() },
		{ id: '9', type: 'Ritual', category: 'Spiritual', frequency: 'Yearly', location: 'Living Room', applicableRole: 'Mother', createdBy: 'mother', createdAt: new Date() },
		{ id: '10', type: 'Duty', category: 'Household', frequency: 'Daily', location: 'Entrance', applicableRole: 'Child', createdBy: 'child', createdAt: new Date() }
	];

	await db.insert(schema.tasks).values(tasks);
	console.log('Tasks seeded');

	// Task Ritual
	await db.insert(schema.taskRitual).values([
		{ id: '1', taskId: '3', ritualName: 'Sandhyavandanam', materialsNeeded: JSON.stringify(['Water', 'Flowers']), performerRole: 'Grandparent', timeOfDay: 'Morning' },
		{ id: '2', taskId: '6', ritualName: 'Amavasya Tarpanam', panchangamLink: 'https://panchangam.com', materialsNeeded: JSON.stringify(['Rice', 'Water']), performerRole: 'Father', timeOfDay: 'Morning' },
		{ id: '3', taskId: '9', ritualName: 'Navaratri Setup', materialsNeeded: JSON.stringify(['Flowers', 'Lamps']), performerRole: 'Mother', timeOfDay: 'Evening' }
	]);

	// Task Responsibility
	await db.insert(schema.taskResponsibility).values([
		{ id: '1', taskId: '2', domain: 'Parenting', dependent: 'Child', expectedOutcome: 'Completed homework' },
		{ id: '2', taskId: '5', domain: 'Health', dependent: 'Family', expectedOutcome: 'Health checkup done' },
		{ id: '3', taskId: '8', domain: 'Education', dependent: 'Child', expectedOutcome: 'Tuition arranged' }
	]);

	// Activities
	const activities = [
		{ id: '1', type: 'Physical', category: 'Sports', frequency: 'Weekly', timeOfDay: 'Evening', applicableRole: 'Father', createdBy: 'father', createdAt: new Date() },
		{ id: '2', type: 'Mental', category: 'Reading', frequency: 'Daily', timeOfDay: 'Morning', applicableRole: 'Grandparent', createdBy: 'grandparent', createdAt: new Date() },
		{ id: '3', type: 'Soulful', category: 'Meditation', frequency: 'Daily', timeOfDay: 'Night', applicableRole: 'Mother', createdBy: 'mother', createdAt: new Date() },
		{ id: '4', type: 'Physical', category: 'Yoga', frequency: 'Daily', timeOfDay: 'Morning', applicableRole: 'Mother', createdBy: 'mother', createdAt: new Date() },
		{ id: '5', type: 'Mental', category: 'Learning', frequency: 'Weekly', timeOfDay: 'Afternoon', applicableRole: 'Child', createdBy: 'child', createdAt: new Date() },
		{ id: '6', type: 'Soulful', category: 'Music', frequency: 'Weekly', timeOfDay: 'Evening', applicableRole: 'Child', createdBy: 'child', createdAt: new Date() },
		{ id: '7', type: 'Mental', category: 'Crafting', frequency: 'Monthly', timeOfDay: 'Weekend', applicableRole: 'Child', createdBy: 'child', createdAt: new Date() },
		{ id: '8', type: 'Physical', category: 'Walking', frequency: 'Daily', timeOfDay: 'Morning', applicableRole: 'Grandparent', createdBy: 'grandparent', createdAt: new Date() },
		{ id: '9', type: 'Soulful', category: 'Art', frequency: 'Monthly', timeOfDay: 'Festival Day', applicableRole: 'Mother', createdBy: 'mother', createdAt: new Date() },
		{ id: '10', type: 'Mental', category: 'Coding', frequency: 'Weekly', timeOfDay: 'Evening', applicableRole: 'Child', createdBy: 'child', createdAt: new Date() }
	];

	await db.insert(schema.activities).values(activities);
	console.log('Activities seeded');

	// Activity Physical
	await db.insert(schema.activityPhysical).values([
		{ id: '1', activityId: '1', sport: 'Badminton', durationMinutes: 60, equipmentNeeded: 'Racket' },
		{ id: '2', activityId: '4', sport: 'Surya Namaskar', durationMinutes: 30 },
		{ id: '3', activityId: '8', sport: 'Morning Walk', durationMinutes: 45 }
	]);

	// Activity Mental
	await db.insert(schema.activityMental).values([
		{ id: '1', activityId: '2', activity: 'Reading', topic: 'Bhagavad Gita', resources: JSON.stringify(['Book']) },
		{ id: '2', activityId: '5', activity: 'Learning', topic: 'Tamil Proverbs', resources: JSON.stringify(['Online courses']) },
		{ id: '3', activityId: '7', activity: 'Crafting', topic: 'Origami', resources: JSON.stringify(['Paper']) },
		{ id: '4', activityId: '10', activity: 'Coding', topic: 'Scratch Projects', resources: JSON.stringify(['Computer']) }
	]);

	// Activity Soulful
	await db.insert(schema.activitySoulful).values([
		{ id: '1', activityId: '3', practice: 'Guided Breathing', reflectionNotes: 'Peaceful session', frequency: 'Daily', location: 'Bedroom' },
		{ id: '2', activityId: '6', practice: 'Flute Practice', reflectionNotes: 'Melodious tunes', frequency: 'Weekly', location: 'Living Room' },
		{ id: '3', activityId: '9', practice: 'Rangoli Design', reflectionNotes: 'Creative expression', frequency: 'Monthly', location: 'Entrance' }
	]);

	// Finance
	const finance = [
		{ id: '1', type: 'Expense', category: 'Groceries', amount: 2500, date: new Date('2025-10-01'), actor: 'mother', applicableRole: 'Mother', createdBy: 'mother', createdAt: new Date() },
		{ id: '2', type: 'Income', category: 'Salary', amount: 45000, date: new Date('2025-10-05'), actor: 'father', applicableRole: 'Father', createdBy: 'father', createdAt: new Date() },
		{ id: '3', type: 'Expense', category: 'Education', amount: 3000, date: new Date('2025-10-10'), actor: 'admin', applicableRole: 'Admin', createdBy: 'admin', createdAt: new Date() },
		{ id: '4', type: 'Savings', category: 'Festival Fund', amount: 5000, date: new Date('2025-09-30'), actor: 'mother', applicableRole: 'Mother', createdBy: 'mother', createdAt: new Date() },
		{ id: '5', type: 'Budget', category: 'Rituals', amount: 2000, date: new Date('2025-09-25'), actor: 'admin', applicableRole: 'Admin', createdBy: 'admin', createdAt: new Date() },
		{ id: '6', type: 'Expense', category: 'Health', amount: 800, date: new Date('2025-10-03'), actor: 'father', applicableRole: 'Father', createdBy: 'father', createdAt: new Date() },
		{ id: '7', type: 'Income', category: 'Freelance', amount: 1500, date: new Date('2025-10-07'), actor: 'child', applicableRole: 'Child', createdBy: 'child', createdAt: new Date() },
		{ id: '8', type: 'Expense', category: 'Utilities', amount: 1200, date: new Date('2025-10-02'), actor: 'admin', applicableRole: 'Admin', createdBy: 'admin', createdAt: new Date() },
		{ id: '9', type: 'Savings', category: 'Emergency Fund', amount: 3000, date: new Date('2025-10-01'), actor: 'father', applicableRole: 'Father', createdBy: 'father', createdAt: new Date() },
		{ id: '10', type: 'Budget', category: 'Travel', amount: 2500, date: new Date('2025-10-15'), actor: 'mother', applicableRole: 'Mother', createdBy: 'mother', createdAt: new Date() }
	];

	await db.insert(schema.finance).values(finance);
	console.log('Finance seeded');

	// Finance Expense
	await db.insert(schema.financeExpense).values([
		{ id: '1', financeId: '1', category: 'Groceries', subCategory: 'Monthly Shopping', amount: 2500, paidBy: 'Mother', recurring: true, paymentMode: 'Cash' },
		{ id: '2', financeId: '3', category: 'Education', subCategory: 'Tuition Fee', amount: 3000, paidBy: 'Admin', recurring: false, paymentMode: 'UPI' },
		{ id: '3', financeId: '6', category: 'Health', subCategory: 'Doctor Visit', amount: 800, paidBy: 'Father', recurring: false, paymentMode: 'Card' },
		{ id: '4', financeId: '8', category: 'Utilities', subCategory: 'Electricity Bill', amount: 1200, paidBy: 'Admin', recurring: true, paymentMode: 'UPI' }
	]);

	// Finance Income
	await db.insert(schema.financeIncome).values([
		{ id: '1', financeId: '2', source: 'Salary', amount: 45000, receivedBy: 'Father', frequency: 'Monthly' },
		{ id: '2', financeId: '7', source: 'Logo Design', amount: 1500, receivedBy: 'Child', frequency: 'One-time' }
	]);

	// Rewards
	const rewards = [
		{ id: '1', type: 'Star', reason: 'Finished Homework Early', points: 5, date: new Date('2025-10-10'), person: 'child', applicableRole: 'Child', createdBy: 'child', createdAt: new Date() },
		{ id: '2', type: 'Karma', reason: 'Helped Grandparent', points: 10, date: new Date('2025-10-09'), person: 'child', applicableRole: 'Child', createdBy: 'child', createdAt: new Date() },
		{ id: '3', type: 'Karma', reason: 'Performed Ritual', points: 15, date: new Date('2025-10-08'), person: 'father', applicableRole: 'Father', createdBy: 'father', createdAt: new Date() },
		{ id: '4', type: 'Star', reason: 'Cleaned Room', points: 3, date: new Date('2025-10-07'), person: 'child', applicableRole: 'Child', createdBy: 'child', createdAt: new Date() },
		{ id: '5', type: 'Karma', reason: 'Donated to Temple', points: 20, date: new Date('2025-10-06'), person: 'mother', applicableRole: 'Mother', createdBy: 'mother', createdAt: new Date() },
		{ id: '6', type: 'Star', reason: 'Learned New Skill', points: 7, date: new Date('2025-10-05'), person: 'child', applicableRole: 'Child', createdBy: 'child', createdAt: new Date() },
		{ id: '7', type: 'Karma', reason: 'Resolved Family Issue', points: 25, date: new Date('2025-10-04'), person: 'admin', applicableRole: 'Admin', createdBy: 'admin', createdAt: new Date() },
		{ id: '8', type: 'Star', reason: 'Helped with Cooking', points: 4, date: new Date('2025-10-03'), person: 'child', applicableRole: 'Child', createdBy: 'child', createdAt: new Date() },
		{ id: '9', type: 'Karma', reason: 'Maintained Discipline', points: 10, date: new Date('2025-10-02'), person: 'father', applicableRole: 'Father', createdBy: 'father', createdAt: new Date() },
		{ id: '10', type: 'Karma', reason: 'Participated in Ritual', points: 15, date: new Date('2025-10-01'), person: 'grandparent', applicableRole: 'Grandparent', createdBy: 'grandparent', createdAt: new Date() }
	];

	await db.insert(schema.rewards).values(rewards);
	console.log('Rewards seeded');

	// Reward Star
	await db.insert(schema.rewardStar).values([
		{ id: '1', rewardId: '1', taskCompleted: 'Homework', points: 5, awardedBy: 'Father', notes: 'Completed early' },
		{ id: '2', rewardId: '4', taskCompleted: 'Room cleaning', points: 3, awardedBy: 'Mother' },
		{ id: '3', rewardId: '6', taskCompleted: 'New skill', points: 7, awardedBy: 'Grandparent', notes: 'Great effort' },
		{ id: '4', rewardId: '8', taskCompleted: 'Cooking help', points: 4, awardedBy: 'Mother' }
	]);

	// Reward Karma
	await db.insert(schema.rewardKarma).values([
		{ id: '1', rewardId: '2', virtue: 'Helpfulness', context: 'Helped grandparent with chores', points: 10, witnessedBy: 'Grandparent' },
		{ id: '2', rewardId: '3', virtue: 'Spirituality', context: 'Performed daily ritual', points: 15 },
		{ id: '3', rewardId: '5', virtue: 'Charity', context: 'Temple donation', points: 20 },
		{ id: '4', rewardId: '7', virtue: 'Leadership', context: 'Resolved family discussion', points: 25 },
		{ id: '5', rewardId: '9', virtue: 'Discipline', context: 'Maintained family rules', points: 10 },
		{ id: '6', rewardId: '10', virtue: 'Devotion', context: 'Participated in ritual', points: 15 }
	]);

	// Assets
	const assets = [
		{ id: '1', category: 'Documents', subCategory: 'Aadhar Card', name: "Father's Aadhar", location: 'File Cabinet', owner: 'father', dateAdded: new Date('2025-09-01'), applicableRole: 'Admin', createdBy: 'admin', createdAt: new Date() },
		{ id: '2', category: 'Certificates', subCategory: 'School Certificate', name: "Child's Grade 5", location: 'Study Drawer', owner: 'child', dateAdded: new Date('2025-09-05'), applicableRole: 'Admin', createdBy: 'admin', createdAt: new Date() },
		{ id: '3', category: 'Photos', subCategory: 'Wedding Album', name: 'Wedding 2010', location: 'Cloud Drive', owner: 'mother', dateAdded: new Date('2025-09-10'), applicableRole: 'Admin', createdBy: 'admin', createdAt: new Date() },
		{ id: '4', category: 'Valuables', subCategory: 'Gold Chain', name: "Mother's Chain", location: 'Locker', owner: 'mother', dateAdded: new Date('2025-09-15'), applicableRole: 'Admin', createdBy: 'admin', createdAt: new Date() },
		{ id: '5', category: 'Inventory', subCategory: 'Laptop', name: 'Lenovo Yoga', location: 'Study Room', owner: 'father', dateAdded: new Date('2025-09-20'), applicableRole: 'Admin', createdBy: 'admin', createdAt: new Date() },
		{ id: '6', category: 'Vehicles', subCategory: 'Scooter', name: 'Honda Activa', location: 'Parking Area', owner: 'father', dateAdded: new Date('2025-09-25'), applicableRole: 'Admin', createdBy: 'admin', createdAt: new Date() },
		{ id: '7', category: 'Land', subCategory: 'Plot', name: 'Coimbatore Plot', location: 'Registry File', owner: 'father', dateAdded: new Date('2025-09-30'), applicableRole: 'Admin', createdBy: 'admin', createdAt: new Date() },
		{ id: '8', category: 'Buildings', subCategory: 'House', name: 'Divine Nest', location: 'Kovaipudur', owner: 'admin', dateAdded: new Date('2025-10-01'), applicableRole: 'Admin', createdBy: 'admin', createdAt: new Date() },
		{ id: '9', category: 'Software', subCategory: 'Antivirus', name: 'Norton License', location: 'Laptop', owner: 'father', dateAdded: new Date('2025-10-02'), applicableRole: 'Admin', createdBy: 'admin', createdAt: new Date() },
		{ id: '10', category: 'Hardware', subCategory: 'Printer', name: 'HP LaserJet', location: 'Study Room', owner: 'admin', dateAdded: new Date('2025-10-03'), applicableRole: 'Admin', createdBy: 'admin', createdAt: new Date() }
	];

	await db.insert(schema.assets).values(assets);
	console.log('Assets seeded');

	// Asset Documents
	await db.insert(schema.assetDocuments).values([
		{ id: '1', assetId: '1', documentType: 'ID Proof', owner: 'Father', storageLocation: 'File Cabinet' }
	]);

	// Asset Valuables
	await db.insert(schema.assetValuables).values([
		{ id: '1', assetId: '4', item: 'Gold Chain', estimatedValue: 50000, insured: true, storageLocation: 'Locker' }
	]);

	// Family
	const family = [
		{ id: '1', category: 'Wisdom', subCategory: 'Life Lessons', title: '"Respect Elders"', location: 'Home Archive', mediaType: 'Blog', applicableRole: 'Grandparent', createdBy: 'grandparent', createdAt: new Date() },
		{ id: '2', category: 'Heritage', subCategory: 'Family Line', title: '"Our Ancestry"', location: 'Family Tree', mediaType: 'Photo', applicableRole: 'Admin', createdBy: 'admin', createdAt: new Date() },
		{ id: '3', category: 'Tradition', subCategory: 'Festivals', title: '"Navaratri Rituals"', location: 'Pooja Room', mediaType: 'Video', applicableRole: 'Mother', createdBy: 'mother', createdAt: new Date() },
		{ id: '4', category: 'Stories', subCategory: 'Childhood Memory', title: '"Rainy Day Story"', location: 'Living Room', mediaType: 'Audio', applicableRole: 'Father', createdBy: 'father', createdAt: new Date() },
		{ id: '5', category: 'Legacy', subCategory: 'Achievements', title: '"First Graduate"', location: 'Study Room', mediaType: 'Blog', applicableRole: 'Admin', createdBy: 'admin', createdAt: new Date() },
		{ id: '6', category: 'Rules', subCategory: 'Habits to Avoid', title: '"No TV Before Study"', location: 'Family Board', mediaType: 'Notes', applicableRole: 'Mother', createdBy: 'mother', createdAt: new Date() },
		{ id: '7', category: 'Memories', subCategory: 'Rituals', title: '"Pongal Celebration"', location: 'Backyard', mediaType: 'Photo', applicableRole: 'Admin', createdBy: 'admin', createdAt: new Date() },
		{ id: '8', category: 'Success', subCategory: 'Certifications', title: '"Music Diploma"', location: 'Study Shelf', mediaType: 'Certificate', applicableRole: 'Child', createdBy: 'child', createdAt: new Date() },
		{ id: '9', category: 'Virtues', subCategory: 'Kindness', title: '"Helping Neighbours"', location: 'Garden', mediaType: 'Blog', applicableRole: 'Child', createdBy: 'child', createdAt: new Date() },
		{ id: '10', category: 'Profile', subCategory: 'Members', title: '"Meet Our Family"', location: 'Home Page', mediaType: 'Photo', applicableRole: 'Admin', createdBy: 'admin', createdAt: new Date() }
	];

	await db.insert(schema.family).values(family);
	console.log('Family seeded');

	// Family Wisdom
	await db.insert(schema.familyWisdom).values([
		{ id: '1', familyId: '1', lesson: 'Respect Elders', story: 'Story about respecting elders', contributor: 'Grandparent', mediaType: 'Blog' }
	]);

	// Family Memories
	await db.insert(schema.familyMemories).values([
		{ id: '1', familyId: '7', event: 'Pongal Celebration', date: new Date('2025-01-15'), mediaType: 'Photo', description: 'Family celebration' }
	]);

	// AI Prompts
	const aiPrompts = [
		{ id: '1', type: 'Alert', category: 'SMS', purpose: 'Wake-up Reminder', triggerTime: '06:00', location: 'Bedroom', frequency: 'Daily', applicableRole: 'Father', createdBy: 'father', createdAt: new Date() },
		{ id: '2', type: 'Notes', category: 'Calendar', purpose: 'Temple Visit', triggerTime: '07:30', location: 'Temple', frequency: 'Weekly', applicableRole: 'Mother', createdBy: 'mother', createdAt: new Date() },
		{ id: '3', type: 'Checklist', category: 'Alarm', purpose: 'Homework Reminder', triggerTime: '17:00', location: 'Study Room', frequency: 'Daily', applicableRole: 'Child', createdBy: 'child', createdAt: new Date() },
		{ id: '4', type: 'Query', category: 'Email', purpose: 'Grocery Restock', triggerTime: '10:00', location: 'Kitchen', frequency: 'Weekly', applicableRole: 'Mother', createdBy: 'mother', createdAt: new Date() },
		{ id: '5', type: 'Alert', category: 'WhatsApp', purpose: 'Ritual Prep Alert', triggerTime: '05:00', location: 'Pooja Room', frequency: 'Monthly', applicableRole: 'Grandparent', createdBy: 'grandparent', createdAt: new Date() },
		{ id: '6', type: 'Notes', category: 'SMS', purpose: 'Meditation Reminder', triggerTime: '21:00', location: 'Terrace', frequency: 'Daily', applicableRole: 'Mother', createdBy: 'mother', createdAt: new Date() },
		{ id: '7', type: 'Alert', category: 'Alarm', purpose: 'Cooking Start', triggerTime: '11:00', location: 'Kitchen', frequency: 'Daily', applicableRole: 'Mother', createdBy: 'mother', createdAt: new Date() },
		{ id: '8', type: 'Checklist', category: 'Calendar', purpose: 'Festival Prep', triggerTime: '08:00', location: 'Living Room', frequency: 'Yearly', applicableRole: 'Admin', createdBy: 'admin', createdAt: new Date() },
		{ id: '9', type: 'Alert', category: 'Email', purpose: 'Health Checkup', triggerTime: '09:00', location: 'Clinic', frequency: 'Monthly', applicableRole: 'Father', createdBy: 'father', createdAt: new Date() },
		{ id: '10', type: 'Notes', category: 'WhatsApp', purpose: 'Music Practice', triggerTime: '18:00', location: 'Study Room', frequency: 'Weekly', applicableRole: 'Child', createdBy: 'child', createdAt: new Date() }
	];

	await db.insert(schema.aiPrompts).values(aiPrompts);
	console.log('AI Prompts seeded');

	// Directory
	const directory = [
		{ id: '1', type: 'Service Provider', category: 'Plumbing', name: 'Ramesh Plumber', area: 'Kovaipudur', contact: '9876543201', verified: true, applicableRole: 'Admin', createdBy: 'admin', createdAt: new Date() },
		{ id: '2', type: 'Service Provider', category: 'Electrical', name: 'Kumar Electrician', area: 'Kuniyamuthur', contact: '9876543202', verified: true, applicableRole: 'Admin', createdBy: 'admin', createdAt: new Date() },
		{ id: '3', type: 'Service Provider', category: 'Internet', name: 'Airtel Support', area: 'Coimbatore', contact: '9876543203', verified: true, applicableRole: 'Admin', createdBy: 'admin', createdAt: new Date() },
		{ id: '4', type: 'Ritual Helper', category: 'Priest', name: 'Perur Temple', area: '9876543204', contact: '9876543204', verified: true, applicableRole: 'Admin', createdBy: 'admin', createdAt: new Date() },
		{ id: '5', type: 'Family Contact', category: 'Uncle', name: 'Uncle Rajan', area: 'Pollachi', contact: '9876543205', verified: true, applicableRole: 'Admin', createdBy: 'admin', createdAt: new Date() },
		{ id: '6', type: 'Service Provider', category: 'Carpenter', name: 'Mani Carpenter', area: 'Sundakkamuthur', contact: '9876543206', verified: false, applicableRole: 'Admin', createdBy: 'admin', createdAt: new Date() },
		{ id: '7', type: 'Family Contact', category: 'Cousin', name: 'Cousin Meena', area: 'Chennai', contact: '9876543207', verified: true, applicableRole: 'Admin', createdBy: 'admin', createdAt: new Date() },
		{ id: '8', type: 'Ritual Helper', category: 'Flower Vendor', name: 'Lakshmi Flowers', area: 'Ukkadam', contact: '9876543208', verified: true, applicableRole: 'Admin', createdBy: 'admin', createdAt: new Date() },
		{ id: '9', type: 'Service Provider', category: 'Painter', name: 'Ravi Paints', area: 'Kovaipudur', contact: '9876543209', verified: false, applicableRole: 'Admin', createdBy: 'admin', createdAt: new Date() },
		{ id: '10', type: 'Family Contact', category: 'Neighbour', name: 'Neighbour Uma', area: 'Kovaipudur', contact: '9876543210', verified: true, applicableRole: 'Admin', createdBy: 'admin', createdAt: new Date() }
	];

	await db.insert(schema.directory).values(directory);
	console.log('Directory seeded');

	// Alerts
	const alerts = [
		{ id: '1', type: 'SMS', category: 'Rituals', subCategory: 'Sandhyavandanam', triggerTime: '06:00', location: 'Pooja Room', sourceTable: 'tasks', applicableRole: 'Grandparent', createdBy: 'grandparent', createdAt: new Date() },
		{ id: '2', type: 'Alarm', category: 'Tasks', subCategory: 'Homework Reminder', triggerTime: '17:00', location: 'Study Room', sourceTable: 'tasks', applicableRole: 'Child', createdBy: 'child', createdAt: new Date() },
		{ id: '3', type: 'Email', category: 'Inventory', subCategory: 'Rice Low Alert', triggerTime: '10:00', location: 'Kitchen Shelf', sourceTable: 'inventory', applicableRole: 'Mother', createdBy: 'mother', createdAt: new Date() },
		{ id: '4', type: 'WhatsApp', category: 'Requests', subCategory: 'Curtain Upgrade', triggerTime: '09:00', location: 'Living Room', sourceTable: 'requests', applicableRole: 'Father', createdBy: 'father', createdAt: new Date() },
		{ id: '5', type: 'SMS', category: 'Finance', subCategory: 'Electricity Bill Due', triggerTime: '08:00', location: 'Utility Room', sourceTable: 'finance', applicableRole: 'Admin', createdBy: 'admin', createdAt: new Date() },
		{ id: '6', type: 'Alarm', category: 'Foods', subCategory: 'Start Cooking Lunch', triggerTime: '11:00', location: 'Kitchen', sourceTable: 'foods', applicableRole: 'Mother', createdBy: 'mother', createdAt: new Date() },
		{ id: '7', type: 'Email', category: 'Activities', subCategory: 'Flute Practice', triggerTime: '18:00', location: 'Study Room', sourceTable: 'activities', applicableRole: 'Child', createdBy: 'child', createdAt: new Date() },
		{ id: '8', type: 'SMS', category: 'Assets', subCategory: 'Insurance Expiry', triggerTime: '07:00', location: 'File Cabinet', sourceTable: 'assets', applicableRole: 'Admin', createdBy: 'admin', createdAt: new Date() },
		{ id: '9', type: 'WhatsApp', category: 'Family', subCategory: 'Pongal Memory Share', triggerTime: '20:00', location: 'Living Room', sourceTable: 'family', applicableRole: 'Admin', createdBy: 'admin', createdAt: new Date() },
		{ id: '10', type: 'Alarm', category: 'AI Prompts', subCategory: 'Wake-up Reminder', triggerTime: '06:00', location: 'Bedroom', sourceTable: 'ai_prompts', applicableRole: 'Father', createdBy: 'father', createdAt: new Date() }
	];

	await db.insert(schema.alerts).values(alerts);
	console.log('Alerts seeded');

	console.log('Database seeding completed successfully!');
}

seed().catch(console.error);