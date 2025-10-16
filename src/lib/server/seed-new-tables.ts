import { db } from './db';

// Seed data for NEW tables only (Communication, Learning, Wellness, Karma, Guests, Environment)
async function seedNewTables() {
	try {
		console.log('🌱 Seeding new database tables...');

		// Duty Types Lookup
		const dutyTypesLookup = [
			{ id: 1, dutyTypeTitle: 'Karmic Duty', description: 'Survival and material responsibilities for maintaining life and family sustenance' },
			{ id: 2, dutyTypeTitle: 'Dharmic Duty', description: 'Righteous duties aligned with cosmic order and moral obligations' },
			{ id: 3, dutyTypeTitle: 'Self Duty', description: 'Personal development and soul evolution responsibilities' },
			{ id: 4, dutyTypeTitle: 'Heavenly Duty', description: 'Spiritual practices and divine service obligations' },
			{ id: 5, dutyTypeTitle: 'Divinely Duty', description: 'Sacred rituals and transcendental responsibilities' },
			{ id: 6, dutyTypeTitle: 'Earthly Duty', description: 'Worldly affairs and material world responsibilities' },
			{ id: 7, dutyTypeTitle: 'Clan Duty', description: 'Family lineage and ancestral responsibilities' }
		];

		await db.dutyTypesLookup.createMany({ data: dutyTypesLookup });
		console.log('✅ Duty Types Lookup seeded');

		// Responsibility Types Lookup
		const responsibilityTypesLookup = [
			{ id: 1, responsibilityTypeTitle: 'Physical Responsibility', description: 'Body maintenance, health, and physical well-being duties' },
			{ id: 2, responsibilityTypeTitle: 'Mental Responsibility', description: 'Intellectual development, learning, and cognitive growth duties' },
			{ id: 3, responsibilityTypeTitle: 'Soulful Responsibility', description: 'Spiritual practices, meditation, and inner peace duties' },
			{ id: 4, responsibilityTypeTitle: 'Skills Responsibility', description: 'Practical skills development and craftsmanship duties' },
			{ id: 5, responsibilityTypeTitle: 'Expertise Responsibility', description: 'Specialized knowledge and professional development duties' },
			{ id: 6, responsibilityTypeTitle: 'Achievement Responsibility', description: 'Goal setting, accomplishment, and milestone tracking duties' }
		];

		await db.responsibilityTypesLookup.createMany({ data: responsibilityTypesLookup });
		console.log('✅ Responsibility Types Lookup seeded');

		// Communication & Coordination
		const communications = [
			{ id: 'comm-1', type: 'Messages', category: 'Family Updates', status: 'Open', priority: 'Medium', applicableRole: 'All', createdBy: 'father', createdAt: new Date() },
			{ id: 'comm-2', type: 'Wish Lists', category: 'Birthday Wishes', status: 'Open', priority: 'Low', applicableRole: 'All', createdBy: 'mother', createdAt: new Date() },
			{ id: 'comm-3', type: 'Suggestions', category: 'Home Improvements', status: 'In Progress', priority: 'High', applicableRole: 'Parents', createdBy: 'father', createdAt: new Date() },
			{ id: 'comm-4', type: 'Discussions', category: 'Education Planning', status: 'Open', priority: 'High', applicableRole: 'Parents', createdBy: 'mother', createdAt: new Date() },
			{ id: 'comm-5', type: 'Decisions', category: 'Festival Celebrations', status: 'Resolved', priority: 'Medium', applicableRole: 'All', createdBy: 'father', createdAt: new Date() },
			{ id: 'comm-6', type: 'Messages', category: 'Daily Updates', status: 'Open', priority: 'Low', applicableRole: 'All', createdBy: 'mother', createdAt: new Date() },
			{ id: 'comm-7', type: 'Wish Lists', category: 'Diwali Gifts', status: 'Open', priority: 'Medium', applicableRole: 'Children', createdBy: 'child', createdAt: new Date() },
			{ id: 'comm-8', type: 'Suggestions', category: 'Kitchen Organization', status: 'Open', priority: 'Medium', applicableRole: 'Parents', createdBy: 'mother', createdAt: new Date() }
		];

		await db.communication.createMany({ data: communications });
		console.log('✅ Communications seeded');

		// Communication Messages
		await db.communicationMessage.createMany({ data: [
			{ id: 'msg-1', communicationId: 'comm-1', sender: 'father', recipient: 'mother', message: 'Good morning! Hope everyone is doing well today.', messageType: 'Text', readStatus: true, sentAt: new Date('2024-10-15T08:00:00') },
			{ id: 'msg-2', communicationId: 'comm-1', sender: 'mother', recipient: 'father', message: 'Very well, thank you! Children are getting ready for school.', messageType: 'Text', readStatus: true, sentAt: new Date('2024-10-15T08:05:00') },
			{ id: 'msg-3', communicationId: 'comm-1', sender: 'child', recipient: 'father', message: 'Appa, can you pick me up early today? I have extra classes.', messageType: 'Text', readStatus: false, sentAt: new Date('2024-10-15T07:30:00') },
			{ id: 'msg-4', communicationId: 'comm-6', sender: 'child2', recipient: 'mother', message: 'Amma, I finished my homework. Can I watch TV now?', messageType: 'Text', readStatus: true, sentAt: new Date('2024-10-15T18:00:00') },
			{ id: 'msg-5', communicationId: 'comm-6', sender: 'mother', recipient: 'child2', message: 'Good job on homework! You can watch TV for 30 minutes.', messageType: 'Text', readStatus: true, sentAt: new Date('2024-10-15T18:05:00') }
		] });

		// Communication Wish Lists
		await db.communicationWishList.createMany({ data: [
			{ id: 'wish-1', communicationId: 'comm-2', item: 'New Cricket Bat', category: 'Sports', priority: 'High', estimatedCost: 2500, requestedBy: 'child' },
			{ id: 'wish-2', communicationId: 'comm-2', item: 'Art Supplies Set', category: 'Education', priority: 'Medium', estimatedCost: 1200, requestedBy: 'child2' },
			{ id: 'wish-3', communicationId: 'comm-7', item: 'Traditional Kolam Powder', category: 'Cultural', priority: 'Low', estimatedCost: 300, requestedBy: 'mother' },
			{ id: 'wish-4', communicationId: 'comm-7', item: 'Diwali Lamps', category: 'Festival', priority: 'Medium', estimatedCost: 800, requestedBy: 'father' },
			{ id: 'wish-5', communicationId: 'comm-2', item: 'Science Experiment Kit', category: 'Education', priority: 'High', estimatedCost: 1800, requestedBy: 'child' }
		] });

		// Communication Suggestions
		await db.communicationSuggestion.createMany({ data: [
			{ id: 'sugg-1', communicationId: 'comm-3', suggestion: 'Install additional shelves in the kitchen for better organization', category: 'Home', impact: 'High', proposedBy: 'mother', votes: 3 },
			{ id: 'sugg-2', communicationId: 'comm-3', suggestion: 'Create a dedicated study area for children', category: 'Education', impact: 'High', proposedBy: 'father', votes: 4 },
			{ id: 'sugg-3', communicationId: 'comm-8', suggestion: 'Organize spices alphabetically in the rack', category: 'Kitchen', impact: 'Medium', proposedBy: 'mother', votes: 2 },
			{ id: 'sugg-4', communicationId: 'comm-3', suggestion: 'Install energy-efficient LED bulbs throughout the house', category: 'Utilities', impact: 'Medium', proposedBy: 'father', votes: 3 }
		] });

		// Communication Discussions
		await db.communicationDiscussion.createMany({ data: [
			{ id: 'disc-1', communicationId: 'comm-4', topic: 'Choosing the right school for Arjun next year', participants: '["father","mother"]', status: 'Open', lastActivity: new Date('2024-10-14T20:00:00') },
			{ id: 'disc-2', communicationId: 'comm-4', topic: 'Priya\'s interest in Bharatanatyam classes', participants: '["father","mother","child2"]', status: 'Open', lastActivity: new Date('2024-10-13T19:30:00') },
			{ id: 'disc-3', communicationId: 'comm-4', topic: 'Weekend family outing plans', participants: '["father","mother","child","child2"]', status: 'Closed', lastActivity: new Date('2024-10-12T21:00:00') }
		] });

		// Communication Decisions
		await db.communicationDecision.createMany({
			data: [
				{ id: 'dec-1', communicationId: 'comm-5', decision: 'Celebrate Diwali with full traditional rituals and family gathering', context: 'Annual festival planning', outcome: 'Approved budget of ₹15,000', affectedParties: '["father","mother","child","child2"]', implemented: true },
				{ id: 'dec-2', communicationId: 'comm-5', decision: 'Enroll Priya in Bharatanatyam classes starting next month', context: 'Cultural education development', outcome: 'Monthly fee ₹2,500, classes on Saturdays', affectedParties: '["mother","child2"]', implemented: false },
				{ id: 'dec-3', communicationId: 'comm-5', decision: 'Family trip to Tirupati during December holidays', context: 'Spiritual pilgrimage planning', outcome: 'Book tickets for 4 people, temple accommodation', affectedParties: '["father","mother","child","child2"]', implemented: false }
			]
		});

		// Learning & Teaching
		const learnings = [
			{ id: 'learn-1', type: 'Lessons', category: 'Mathematics', level: 'Intermediate', duration: '2 hours', applicableRole: 'Children', createdBy: 'father', createdAt: new Date() },
			{ id: 'learn-2', type: 'Courses', category: 'Carnatic Music', level: 'Beginner', duration: '6 months', applicableRole: 'Children', createdBy: 'mother', createdAt: new Date() },
			{ id: 'learn-3', type: 'Teaching Logs', category: 'Hindu Mythology', level: 'All', duration: '1 hour', applicableRole: 'Family', createdBy: 'father', createdAt: new Date() },
			{ id: 'learn-4', type: 'Study Materials', category: 'Science', level: 'Advanced', duration: 'Ongoing', applicableRole: 'Children', createdBy: 'mother', createdAt: new Date() },
			{ id: 'learn-5', type: 'Exams', category: 'School Exams', level: 'Intermediate', duration: '2 days', applicableRole: 'Children', createdBy: 'father', createdAt: new Date() },
			{ id: 'learn-6', type: 'Lessons', category: 'Tamil Language', level: 'Beginner', duration: '1 hour', applicableRole: 'Children', createdBy: 'mother', createdAt: new Date() },
			{ id: 'learn-7', type: 'Courses', category: 'Yoga', level: 'Beginner', duration: '3 months', applicableRole: 'Family', createdBy: 'father', createdAt: new Date() }
		];

		await db.learning.createMany({ data: learnings });
		console.log('✅ Learning tables seeded');

		// Learning child tables
		await db.learningLesson.createMany({ data: [
			{ id: 'lesson-1', learningId: 'learn-1', lessonTitle: 'Algebra Fundamentals', subject: 'Mathematics', objectives: '["Learn basic algebraic operations","Solve linear equations"]', materials: '["Textbook","Notebook","Calculator"]', duration: 90, completed: true },
			{ id: 'lesson-2', learningId: 'learn-1', lessonTitle: 'Geometry Basics', subject: 'Mathematics', objectives: '["Understand shapes and angles","Calculate area and perimeter"]', materials: '["Ruler","Compass","Graph paper"]', duration: 90, completed: false },
			{ id: 'lesson-3', learningId: 'learn-6', lessonTitle: 'Tamil Vowels and Consonants', subject: 'Language', objectives: '["Learn Tamil script","Practice pronunciation"]', materials: '["Tamil alphabet chart","Practice workbook"]', duration: 60, completed: true },
			{ id: 'lesson-4', learningId: 'learn-6', lessonTitle: 'Simple Tamil Sentences', subject: 'Language', objectives: '["Form basic sentences","Learn common phrases"]', materials: '["Vocabulary cards","Audio recordings"]', duration: 60, completed: false }
		] });

		await db.learningCourse.createMany({ data: [
			{ id: 'course-1', learningId: 'learn-2', courseName: 'Carnatic Vocal Training', provider: 'External', platform: 'Offline', certification: true, completionDate: new Date('2024-12-31') },
			{ id: 'course-2', learningId: 'learn-7', courseName: 'Hatha Yoga for Beginners', provider: 'Internal', platform: 'Hybrid', certification: false, completionDate: new Date('2025-01-31') },
			{ id: 'course-3', learningId: 'learn-2', courseName: 'Bharatanatyam Dance', provider: 'External', platform: 'Offline', certification: true, completionDate: new Date('2025-06-30') }
		] });

		await db.learningTeachingLog.createMany({ data: [
			{ id: 'teach-1', learningId: 'learn-3', teacher: 'father', student: 'child', subject: 'Ramayana Stories', duration: 60, notes: 'Covered the story of Lord Rama and Sita', date: new Date('2024-10-10T18:00:00') },
			{ id: 'teach-2', learningId: 'learn-3', teacher: 'mother', student: 'child2', subject: 'Pooja Procedures', duration: 45, notes: 'Taught morning prayer rituals and mantras', date: new Date('2024-10-11T07:00:00') },
			{ id: 'teach-3', learningId: 'learn-3', teacher: 'father', student: 'child', subject: 'Mahabharata Stories', duration: 75, notes: 'Discussed Krishna\'s teachings and dharma', date: new Date('2024-10-12T19:00:00') },
			{ id: 'teach-4', learningId: 'learn-3', teacher: 'grandparent', student: 'child2', subject: 'Festival Significance', duration: 50, notes: 'Explained the meaning behind Diwali celebrations', date: new Date('2024-10-13T16:00:00') }
		] });

		await db.learningStudyMaterial.createMany({ data: [
			{ id: 'material-1', learningId: 'learn-4', materialType: 'Book', title: 'NCERT Science Textbook Class 8', author: 'NCERT', source: 'School', accessLink: null, difficulty: 'Intermediate' },
			{ id: 'material-2', learningId: 'learn-4', materialType: 'Video', title: 'Photosynthesis Explained', author: 'Khan Academy', source: 'Online', accessLink: 'https://www.khanacademy.org/science/biology/photosynthesis-in-plants', difficulty: 'Beginner' },
			{ id: 'material-3', learningId: 'learn-4', materialType: 'Document', title: 'Periodic Table Study Guide', author: 'School Teacher', source: 'School', accessLink: null, difficulty: 'Intermediate' },
			{ id: 'material-4', learningId: 'learn-4', materialType: 'Audio', title: 'Tamil Pronunciation Guide', author: 'Language Lab', source: 'Educational App', accessLink: null, difficulty: 'Beginner' }
		] });

		await db.learningExam.createMany({
			data: [
				{ id: 'exam-1', learningId: 'learn-5', examName: 'Mathematics Mid-term Exam', subject: 'Mathematics', date: new Date('2024-10-20T10:00:00'), score: 85, maxScore: 100, grade: 'A', certification: false },
				{ id: 'exam-2', learningId: 'learn-5', examName: 'Science Quarterly Exam', subject: 'Science', date: new Date('2024-10-25T10:00:00'), score: 92, maxScore: 100, grade: 'A+', certification: false },
				{ id: 'exam-3', learningId: 'learn-5', examName: 'Tamil Language Test', subject: 'Tamil', date: new Date('2024-10-18T09:00:00'), score: 78, maxScore: 100, grade: 'B+', certification: false },
				{ id: 'exam-4', learningId: 'learn-5', examName: 'Social Studies Final Exam', subject: 'Social Studies', date: new Date('2024-11-05T10:00:00'), score: null, maxScore: 100, grade: null, certification: false }
			]
		});

		// Health & Wellness
		const wellnessRecords = [
			{ id: 'well-1', type: 'Physical Health Logs', category: 'Exercise', severity: 'Low', frequency: 'Daily', applicableRole: 'Family', createdBy: 'father', createdAt: new Date() },
			{ id: 'well-2', type: 'Mental Health Logs', category: 'Meditation', severity: 'Low', frequency: 'Daily', applicableRole: 'Family', createdBy: 'mother', createdAt: new Date() },
			{ id: 'well-3', type: 'Medicines Tracker', category: 'Ayurvedic', severity: 'Medium', frequency: 'As needed', applicableRole: 'Family', createdBy: 'mother', createdAt: new Date() },
			{ id: 'well-4', type: 'Appointments', category: 'Doctor Visits', severity: 'High', frequency: 'Monthly', applicableRole: 'Family', createdBy: 'father', createdAt: new Date() },
			{ id: 'well-5', type: 'Remedies', category: 'Home Remedies', severity: 'Low', frequency: 'Weekly', applicableRole: 'Family', createdBy: 'grandparent', createdAt: new Date() },
			{ id: 'well-6', type: 'Physical Health Logs', category: 'Walking', severity: 'Low', frequency: 'Daily', applicableRole: 'Adults', createdBy: 'father', createdAt: new Date() },
			{ id: 'well-7', type: 'Mental Health Logs', category: 'Reading', severity: 'Low', frequency: 'Daily', applicableRole: 'Children', createdBy: 'mother', createdAt: new Date() }
		];

		await db.wellness.createMany({ data: wellnessRecords });
		console.log('✅ Wellness tables seeded');

		// Wellness Physical Health
		await db.wellnessPhysicalHealth.createMany({ data: [
			{ id: 'phys-1', wellnessId: 'well-1', activity: 'Morning Walk', duration: 30, intensity: 'Medium', vitals: '{"heart_rate": 72, "steps": 3000}', notes: 'Walked around the neighborhood', date: new Date('2024-10-15T06:30:00') },
			{ id: 'phys-2', wellnessId: 'well-1', activity: 'Yoga Session', duration: 45, intensity: 'Low', vitals: '{"heart_rate": 68}', notes: 'Sun Salutation and breathing exercises', date: new Date('2024-10-14T07:00:00') },
			{ id: 'phys-3', wellnessId: 'well-6', activity: 'Evening Walk', duration: 20, intensity: 'Low', vitals: '{"heart_rate": 75}', notes: 'Light walk after dinner', date: new Date('2024-10-15T18:00:00') },
			{ id: 'phys-4', wellnessId: 'well-1', activity: 'Gardening', duration: 60, intensity: 'Medium', vitals: '{"heart_rate": 78}', notes: 'Watered plants and weeded the garden', date: new Date('2024-10-13T16:00:00') }
		] });

		// Karma & Scoring
		const karmaRecords = [
			{ id: 'karma-1', type: 'Karma Log', category: 'Duties', points: 10, reason: 'Completed morning pooja on time', linkedDuty: 'pooja-duty', role: 'father', applicableRole: 'Adults', createdBy: 'father', createdAt: new Date() },
			{ id: 'karma-2', type: 'Karma Score', category: 'Weekly Total', points: 85, reason: 'Weekly karma assessment', role: 'father', applicableRole: 'Adults', createdBy: 'admin', createdAt: new Date() },
			{ id: 'karma-3', type: 'Karma Penalty', category: 'Missed Duty', points: -5, reason: 'Late for family dinner', linkedDuty: 'dinner-prep', role: 'mother', applicableRole: 'Adults', createdBy: 'admin', createdAt: new Date() },
			{ id: 'karma-4', type: 'Karma Rewards', category: 'Achievement', points: 20, reason: 'Helped neighbor with medical emergency', linkedAchievement: 'community-help', role: 'father', applicableRole: 'Adults', createdBy: 'admin', createdAt: new Date() },
			{ id: 'karma-5', type: 'Karma Log', category: 'Duties', points: 15, reason: 'Taught children Tamil stories', linkedDuty: 'teaching-duty', role: 'grandparent', applicableRole: 'Seniors', createdBy: 'grandparent', createdAt: new Date() }
		];

		await db.karma.createMany({ data: karmaRecords });
		console.log('✅ Karma tables seeded');

		// Guest & Hospitality
		const guestRecords = [
			{ id: 'guest-1', type: 'Guest Profiles', category: 'Family', visitPurpose: 'Family gathering', expectedArrival: new Date('2024-10-20'), expectedDeparture: new Date('2024-10-23'), applicableRole: 'All', createdBy: 'father', createdAt: new Date() },
			{ id: 'guest-2', type: 'Visit Logs', category: 'Family Visit', visitPurpose: 'Birthday celebration', expectedArrival: new Date('2024-09-15'), expectedDeparture: new Date('2024-09-22'), applicableRole: 'All', createdBy: 'mother', createdAt: new Date() },
			{ id: 'guest-3', type: 'Gift Logs', category: 'Festival Gift', visitPurpose: 'Diwali celebration', expectedArrival: new Date('2024-10-02'), expectedDeparture: new Date('2024-10-04'), applicableRole: 'Children', createdBy: 'child2', createdAt: new Date() },
			{ id: 'guest-4', type: 'Feedback', category: 'Visit Experience', visitPurpose: 'Casual visit', expectedArrival: new Date('2024-08-10'), expectedDeparture: new Date('2024-08-10'), applicableRole: 'Adults', createdBy: 'mother', createdAt: new Date() },
			{ id: 'guest-5', type: 'Guest Profiles', category: 'Religious', visitPurpose: 'Spiritual guidance', expectedArrival: new Date('2024-11-15'), expectedDeparture: new Date('2024-11-17'), applicableRole: 'All', createdBy: 'grandparent', createdAt: new Date() }
		];

		await db.guest.createMany({ data: guestRecords });
		console.log('✅ Guest tables seeded');

		// Environment & Nature
		const environmentRecords = [
			{ id: 'env-1', type: 'Garden Tracker', category: 'Vegetable Garden', condition: 'Good', maintenanceSchedule: 'Daily watering', lastMaintenance: new Date('2024-10-15'), responsiblePerson: 'father', applicableRole: 'Adults', createdBy: 'father', createdAt: new Date() },
			{ id: 'env-2', type: 'Animal Care', category: 'Bird Feeding', condition: 'Excellent', maintenanceSchedule: 'Daily feeding', lastMaintenance: new Date('2024-10-15'), responsiblePerson: 'mother', applicableRole: 'Family', createdBy: 'mother', createdAt: new Date() },
			{ id: 'env-3', type: 'Nature Duties', category: 'Temple Cleaning', condition: 'Good', maintenanceSchedule: 'Weekly cleaning', lastMaintenance: new Date('2024-10-12'), responsiblePerson: 'grandparent', applicableRole: 'Seniors', createdBy: 'grandparent', createdAt: new Date() },
			{ id: 'env-4', type: 'Seasonal Prep', category: 'Monsoon Preparation', condition: 'Fair', maintenanceSchedule: 'Seasonal checks', lastMaintenance: new Date('2024-10-01'), responsiblePerson: 'father', applicableRole: 'Adults', createdBy: 'father', createdAt: new Date() },
			{ id: 'env-5', type: 'Garden Tracker', category: 'Flower Garden', condition: 'Excellent', maintenanceSchedule: 'Weekly care', lastMaintenance: new Date('2024-10-14'), responsiblePerson: 'child2', applicableRole: 'Children', createdBy: 'child2', createdAt: new Date() }
		];

		await db.environment.createMany({ data: environmentRecords });
		console.log('✅ Environment tables seeded');

		// Finances
		const finances = [
			{ id: 'fin-1', type: 'Income', category: 'Salary', amount: 85000, date: new Date('2024-10-01'), actor: 'father', applicableRole: 'Adults', createdBy: 'father', createdAt: new Date() },
			{ id: 'fin-2', type: 'Expense', category: 'Groceries', amount: 5200, date: new Date('2024-10-05'), actor: 'mother', applicableRole: 'All', createdBy: 'mother', createdAt: new Date() },
			{ id: 'fin-3', type: 'Expense', category: 'Temple Donations', amount: 2100, date: new Date('2024-10-02'), actor: 'father', applicableRole: 'Adults', createdBy: 'father', createdAt: new Date() },
			{ id: 'fin-4', type: 'Income', category: 'Business', amount: 15000, date: new Date('2024-10-10'), actor: 'mother', applicableRole: 'Adults', createdBy: 'mother', createdAt: new Date() },
			{ id: 'fin-5', type: 'Expense', category: 'Education', amount: 8000, date: new Date('2024-10-08'), actor: 'father', applicableRole: 'Parents', createdBy: 'father', createdAt: new Date() },
			{ id: 'fin-6', type: 'Expense', category: 'Utilities', amount: 3200, date: new Date('2024-10-03'), actor: 'father', applicableRole: 'Adults', createdBy: 'father', createdAt: new Date() },
			{ id: 'fin-7', type: 'Income', category: 'Investments', amount: 25000, date: new Date('2024-10-12'), actor: 'father', applicableRole: 'Adults', createdBy: 'father', createdAt: new Date() },
			{ id: 'fin-8', type: 'Expense', category: 'Medical', amount: 4500, date: new Date('2024-10-06'), actor: 'mother', applicableRole: 'All', createdBy: 'mother', createdAt: new Date() }
		];

		await db.finance.createMany({ data: finances });
		console.log('✅ Finances seeded');

		// Foods
		const foods = [
			{ id: 'food-1', type: 'Breakfast', category: 'South Indian', healthFactor: 'High Protein', time: '7:00 AM', cost: 150, applicableRole: 'All', createdBy: 'mother', createdAt: new Date() },
			{ id: 'food-2', type: 'Lunch', category: 'Traditional', healthFactor: 'Balanced', time: '1:00 PM', cost: 200, applicableRole: 'All', createdBy: 'mother', createdAt: new Date() },
			{ id: 'food-3', type: 'Dinner', category: 'Vegetarian', healthFactor: 'Light', time: '8:00 PM', cost: 180, applicableRole: 'All', createdBy: 'mother', createdAt: new Date() },
			{ id: 'food-4', type: 'Snacks', category: 'Healthy', healthFactor: 'Nutritious', time: '4:00 PM', cost: 80, applicableRole: 'Children', createdBy: 'mother', createdAt: new Date() },
			{ id: 'food-5', type: 'Festival', category: 'Sweet', healthFactor: 'Occasional', time: 'Special', cost: 300, applicableRole: 'All', createdBy: 'mother', createdAt: new Date() },
			{ id: 'food-6', type: 'Breakfast', category: 'Quick', healthFactor: 'Basic', time: '7:30 AM', cost: 100, applicableRole: 'Children', createdBy: 'child', createdAt: new Date() },
			{ id: 'food-7', type: 'Lunch', category: 'Rice-based', healthFactor: 'Carbs', time: '12:30 PM', cost: 150, applicableRole: 'Adults', createdBy: 'father', createdAt: new Date() },
			{ id: 'food-8', type: 'Dinner', category: 'Simple', healthFactor: 'Digestive', time: '7:30 PM', cost: 120, applicableRole: 'All', createdBy: 'mother', createdAt: new Date() }
		];

		await db.food.createMany({ data: foods });
		console.log('✅ Foods seeded');

		// Inventory
		const inventory = [
			{ id: 'inv-1', type: 'Ingredients', category: 'Rice', quantity: 25, unit: 'kg', location: 'Kitchen Pantry', applicableRole: 'Adults', expiryDate: new Date('2025-06-01'), createdBy: 'mother', createdAt: new Date() },
			{ id: 'inv-2', type: 'Spices', category: 'Turmeric', quantity: 2, unit: 'kg', location: 'Spice Rack', applicableRole: 'Adults', expiryDate: new Date('2025-12-01'), createdBy: 'mother', createdAt: new Date() },
			{ id: 'inv-3', type: 'Grocery', category: 'Lentils', quantity: 10, unit: 'kg', location: 'Kitchen Storage', applicableRole: 'Adults', expiryDate: new Date('2025-08-01'), createdBy: 'father', createdAt: new Date() },
			{ id: 'inv-4', type: 'Medicines', category: 'Ayurvedic', quantity: 50, unit: 'tablets', location: 'Medicine Cabinet', applicableRole: 'All', expiryDate: new Date('2025-03-01'), createdBy: 'mother', createdAt: new Date() },
			{ id: 'inv-5', type: 'Toiletries', category: 'Soap', quantity: 20, unit: 'bars', location: 'Bathroom', applicableRole: 'All', expiryDate: null, createdBy: 'father', createdAt: new Date() },
			{ id: 'inv-6', type: 'Stationery', category: 'Notebooks', quantity: 30, unit: 'pieces', location: 'Study Room', applicableRole: 'Children', expiryDate: null, createdBy: 'child', createdAt: new Date() },
			{ id: 'inv-7', type: 'Ritual', category: 'Incense', quantity: 100, unit: 'sticks', location: 'Pooja Room', applicableRole: 'Adults', expiryDate: new Date('2025-10-01'), createdBy: 'father', createdAt: new Date() },
			{ id: 'inv-8', type: 'Books', category: 'Spiritual', quantity: 15, unit: 'books', location: 'Library', applicableRole: 'All', expiryDate: null, createdBy: 'mother', createdAt: new Date() }
		];

		await db.inventory.createMany({ data: inventory });
		console.log('✅ Inventory seeded');

		console.log('🎉 New tables seeding completed successfully!');
	} catch (error) {
		console.error('❌ Error seeding new tables:', error);
		throw error;
	}
}

// Run the seed function
seedNewTables();