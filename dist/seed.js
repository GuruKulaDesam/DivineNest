"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
// Sample data for South Indian family context
async function seedDatabase() {
    try {
        console.log('🌱 Starting database seeding...');
        // First, create some sample users
        await index_1.db.user.createMany({
            data: [
                {
                    id: 'user-1',
                    username: 'ramu',
                    passwordHash: 'hashed_password',
                    role: 'Parent',
                    nickname: 'Appa',
                    email: 'ramu@family.com',
                    joinedDate: new Date('2024-01-01'),
                    isActive: true
                },
                {
                    id: 'user-2',
                    username: 'lakshmi',
                    passwordHash: 'hashed_password',
                    role: 'Parent',
                    nickname: 'Amma',
                    email: 'lakshmi@family.com',
                    joinedDate: new Date('2024-01-01'),
                    isActive: true
                },
                {
                    id: 'user-3',
                    username: 'arjun',
                    passwordHash: 'hashed_password',
                    role: 'Child',
                    nickname: 'Arjun',
                    email: 'arjun@family.com',
                    joinedDate: new Date('2024-01-15'),
                    isActive: true
                },
                {
                    id: 'user-4',
                    username: 'priya',
                    passwordHash: 'hashed_password',
                    role: 'Child',
                    nickname: 'Priya',
                    email: 'priya@family.com',
                    joinedDate: new Date('2024-01-20'),
                    isActive: true
                }
            ]
        });
        console.log('✅ Created sample users');
        // Seed Communication tables
        await index_1.db.communication.createMany({
            data: [
                { id: 'comm-1', type: 'Messages', category: 'Family Updates', status: 'Open', priority: 'Medium', applicableRole: 'All', createdBy: 'user-1', createdAt: new Date() },
                { id: 'comm-2', type: 'Wish Lists', category: 'Birthday Wishes', status: 'Open', priority: 'Low', applicableRole: 'All', createdBy: 'user-2', createdAt: new Date() },
                { id: 'comm-3', type: 'Suggestions', category: 'Home Improvements', status: 'In Progress', priority: 'High', applicableRole: 'Parents', createdBy: 'user-1', createdAt: new Date() },
                { id: 'comm-4', type: 'Discussions', category: 'Education Planning', status: 'Open', priority: 'High', applicableRole: 'Parents', createdBy: 'user-2', createdAt: new Date() },
                { id: 'comm-5', type: 'Decisions', category: 'Festival Celebrations', status: 'Resolved', priority: 'Medium', applicableRole: 'All', createdBy: 'user-1', createdAt: new Date() },
                { id: 'comm-6', type: 'Messages', category: 'Daily Updates', status: 'Open', priority: 'Low', applicableRole: 'All', createdBy: 'user-2', createdAt: new Date() },
                { id: 'comm-7', type: 'Wish Lists', category: 'Diwali Gifts', status: 'Open', priority: 'Medium', applicableRole: 'Children', createdBy: 'user-3', createdAt: new Date() },
                { id: 'comm-8', type: 'Suggestions', category: 'Kitchen Organization', status: 'Open', priority: 'Medium', applicableRole: 'Parents', createdBy: 'user-2', createdAt: new Date() }
            ]
        });
        // Seed Communication Messages
        await index_1.db.communicationMessage.createMany({
            data: [
                { id: 'msg-1', communicationId: 'comm-1', sender: 'user-1', recipient: 'user-2', message: 'Good morning! Hope everyone is doing well today.', messageType: 'Text', readStatus: true, sentAt: new Date('2024-10-15T08:00:00') },
                { id: 'msg-2', communicationId: 'comm-1', sender: 'user-2', recipient: 'user-1', message: 'Very well, thank you! Children are getting ready for school.', messageType: 'Text', readStatus: true, sentAt: new Date('2024-10-15T08:05:00') },
                { id: 'msg-3', communicationId: 'comm-1', sender: 'user-3', recipient: 'user-1', message: 'Appa, can you pick me up early today? I have extra classes.', messageType: 'Text', readStatus: false, sentAt: new Date('2024-10-15T07:30:00') },
                { id: 'msg-4', communicationId: 'comm-6', sender: 'user-4', recipient: 'user-2', message: 'Amma, I finished my homework. Can I watch TV now?', messageType: 'Text', readStatus: true, sentAt: new Date('2024-10-15T18:00:00') },
                { id: 'msg-5', communicationId: 'comm-6', sender: 'user-2', recipient: 'user-4', message: 'Good job on homework! You can watch TV for 30 minutes.', messageType: 'Text', readStatus: true, sentAt: new Date('2024-10-15T18:05:00') }
            ]
        });
        // Seed Communication Wish Lists
        await index_1.db.communicationWishList.createMany({
            data: [
                { id: 'wish-1', communicationId: 'comm-2', item: 'New Cricket Bat', category: 'Sports', priority: 'High', estimatedCost: 2500, requestedBy: 'user-3' },
                { id: 'wish-2', communicationId: 'comm-2', item: 'Art Supplies Set', category: 'Education', priority: 'Medium', estimatedCost: 1200, requestedBy: 'user-4' },
                { id: 'wish-3', communicationId: 'comm-7', item: 'Traditional Kolam Powder', category: 'Cultural', priority: 'Low', estimatedCost: 300, requestedBy: 'user-2' },
                { id: 'wish-4', communicationId: 'comm-7', item: 'Diwali Lamps', category: 'Festival', priority: 'Medium', estimatedCost: 800, requestedBy: 'user-1' },
                { id: 'wish-5', communicationId: 'comm-2', item: 'Science Experiment Kit', category: 'Education', priority: 'High', estimatedCost: 1800, requestedBy: 'user-3' }
            ]
        });
        // Seed Communication Suggestions
        await index_1.db.communicationSuggestion.createMany({
            data: [
                { id: 'sugg-1', communicationId: 'comm-3', suggestion: 'Install additional shelves in the kitchen for better organization', category: 'Home', impact: 'High', proposedBy: 'user-2', votes: 3 },
                { id: 'sugg-2', communicationId: 'comm-3', suggestion: 'Create a dedicated study area for children', category: 'Education', impact: 'High', proposedBy: 'user-1', votes: 4 },
                { id: 'sugg-3', communicationId: 'comm-8', suggestion: 'Organize spices alphabetically in the rack', category: 'Kitchen', impact: 'Medium', proposedBy: 'user-2', votes: 2 },
                { id: 'sugg-4', communicationId: 'comm-3', suggestion: 'Install energy-efficient LED bulbs throughout the house', category: 'Utilities', impact: 'Medium', proposedBy: 'user-1', votes: 3 }
            ]
        });
        // Seed Communication Discussions
        await index_1.db.communicationDiscussion.createMany({
            data: [
                { id: 'disc-1', communicationId: 'comm-4', topic: 'Choosing the right school for Arjun next year', participants: '["user-1","user-2"]', status: 'Open', lastActivity: new Date('2024-10-14T20:00:00') },
                { id: 'disc-2', communicationId: 'comm-4', topic: 'Priya\'s interest in Bharatanatyam classes', participants: '["user-1","user-2","user-4"]', status: 'Open', lastActivity: new Date('2024-10-13T19:30:00') },
                { id: 'disc-3', communicationId: 'comm-4', topic: 'Weekend family outing plans', participants: '["user-1","user-2","user-3","user-4"]', status: 'Closed', lastActivity: new Date('2024-10-12T21:00:00') }
            ]
        });
        // Seed Communication Decisions
        await index_1.db.communicationDecision.createMany({
            data: [
                { id: 'dec-1', communicationId: 'comm-5', decision: 'Celebrate Diwali with full traditional rituals and family gathering', context: 'Annual festival planning', outcome: 'Approved budget of ₹15,000', affectedParties: '["user-1","user-2","user-3","user-4"]', implemented: true },
                { id: 'dec-2', communicationId: 'comm-5', decision: 'Enroll Priya in Bharatanatyam classes starting next month', context: 'Cultural education development', outcome: 'Monthly fee ₹2,500, classes on Saturdays', affectedParties: '["user-2","user-4"]', implemented: false },
                { id: 'dec-3', communicationId: 'comm-5', decision: 'Family trip to Tirupati during December holidays', context: 'Spiritual pilgrimage planning', outcome: 'Book tickets for 4 people, temple accommodation', affectedParties: '["user-1","user-2","user-3","user-4"]', implemented: false }
            ]
        });
        console.log('✅ Seeded Communication tables');
        // Seed Learning tables
        await index_1.db.learning.createMany({
            data: [
                { id: 'learn-1', type: 'Lessons', category: 'Mathematics', level: 'Intermediate', duration: '2 hours', applicableRole: 'Children', createdBy: 'user-1', createdAt: new Date() },
                { id: 'learn-2', type: 'Courses', category: 'Carnatic Music', level: 'Beginner', duration: '6 months', applicableRole: 'Children', createdBy: 'user-2', createdAt: new Date() },
                { id: 'learn-3', type: 'Teaching Logs', category: 'Hindu Mythology', level: 'All', duration: '1 hour', applicableRole: 'Family', createdBy: 'user-1', createdAt: new Date() },
                { id: 'learn-4', type: 'Study Materials', category: 'Science', level: 'Advanced', duration: 'Ongoing', applicableRole: 'Children', createdBy: 'user-2', createdAt: new Date() },
                { id: 'learn-5', type: 'Exams', category: 'School Exams', level: 'Intermediate', duration: '2 days', applicableRole: 'Children', createdBy: 'user-1', createdAt: new Date() },
                { id: 'learn-6', type: 'Lessons', category: 'Tamil Language', level: 'Beginner', duration: '1 hour', applicableRole: 'Children', createdBy: 'user-2', createdAt: new Date() },
                { id: 'learn-7', type: 'Courses', category: 'Yoga', level: 'Beginner', duration: '3 months', applicableRole: 'Family', createdBy: 'user-1', createdAt: new Date() }
            ]
        });
        // Seed Learning Lessons
        await index_1.db.learningLesson.createMany({
            data: [
                { id: 'lesson-1', learningId: 'learn-1', lessonTitle: 'Algebra Fundamentals', subject: 'Mathematics', objectives: '["Learn basic algebraic operations","Solve linear equations"]', materials: '["Textbook","Notebook","Calculator"]', duration: 90, completed: true },
                { id: 'lesson-2', learningId: 'learn-1', lessonTitle: 'Geometry Basics', subject: 'Mathematics', objectives: '["Understand shapes and angles","Calculate area and perimeter"]', materials: '["Ruler","Compass","Graph paper"]', duration: 90, completed: false },
                { id: 'lesson-3', learningId: 'learn-6', lessonTitle: 'Tamil Vowels and Consonants', subject: 'Language', objectives: '["Learn Tamil script","Practice pronunciation"]', materials: '["Tamil alphabet chart","Practice workbook"]', duration: 60, completed: true },
                { id: 'lesson-4', learningId: 'learn-6', lessonTitle: 'Simple Tamil Sentences', subject: 'Language', objectives: '["Form basic sentences","Learn common phrases"]', materials: '["Vocabulary cards","Audio recordings"]', duration: 60, completed: false }
            ]
        });
        // Seed Learning Courses
        await index_1.db.learningCourse.createMany({
            data: [
                { id: 'course-1', learningId: 'learn-2', courseName: 'Carnatic Vocal Training', provider: 'External', platform: 'Offline', certification: true, completionDate: new Date('2024-12-31') },
                { id: 'course-2', learningId: 'learn-7', courseName: 'Hatha Yoga for Beginners', provider: 'Internal', platform: 'Hybrid', certification: false, completionDate: new Date('2025-01-31') },
                { id: 'course-3', learningId: 'learn-2', courseName: 'Bharatanatyam Dance', provider: 'External', platform: 'Offline', certification: true, completionDate: new Date('2025-06-30') }
            ]
        });
        // Seed Learning Teaching Logs
        await index_1.db.learningTeachingLog.createMany({
            data: [
                { id: 'teach-1', learningId: 'learn-3', teacher: 'user-1', student: 'user-3', subject: 'Ramayana Stories', duration: 60, notes: 'Covered the story of Lord Rama and Sita', date: new Date('2024-10-10T18:00:00') },
                { id: 'teach-2', learningId: 'learn-3', teacher: 'user-2', student: 'user-4', subject: 'Pooja Procedures', duration: 45, notes: 'Taught morning prayer rituals and mantras', date: new Date('2024-10-11T07:00:00') },
                { id: 'teach-3', learningId: 'learn-3', teacher: 'user-1', student: 'user-3', subject: 'Mahabharata Stories', duration: 75, notes: 'Discussed Krishna\'s teachings and dharma', date: new Date('2024-10-12T19:00:00') },
                { id: 'teach-4', learningId: 'learn-3', teacher: 'user-2', student: 'user-4', subject: 'Festival Significance', duration: 50, notes: 'Explained the meaning behind Diwali celebrations', date: new Date('2024-10-13T16:00:00') }
            ]
        });
        // Seed Learning Study Materials
        await index_1.db.learningStudyMaterial.createMany({
            data: [
                { id: 'material-1', learningId: 'learn-4', materialType: 'Book', title: 'NCERT Science Textbook Class 8', author: 'NCERT', source: 'School', accessLink: null, difficulty: 'Intermediate' },
                { id: 'material-2', learningId: 'learn-4', materialType: 'Video', title: 'Photosynthesis Explained', author: 'Khan Academy', source: 'Online', accessLink: 'https://www.khanacademy.org/science/biology/photosynthesis-in-plants', difficulty: 'Beginner' },
                { id: 'material-3', learningId: 'learn-4', materialType: 'Document', title: 'Periodic Table Study Guide', author: 'School Teacher', source: 'School', accessLink: null, difficulty: 'Intermediate' },
                { id: 'material-4', learningId: 'learn-4', materialType: 'Audio', title: 'Tamil Pronunciation Guide', author: 'Language Lab', source: 'Educational App', accessLink: null, difficulty: 'Beginner' }
            ]
        });
        // Seed Learning Exams
        await index_1.db.learningExam.createMany({
            data: [
                { id: 'exam-1', learningId: 'learn-5', examName: 'Mathematics Mid-term Exam', subject: 'Mathematics', date: new Date('2024-10-20T10:00:00'), score: 85, maxScore: 100, grade: 'A', certification: false },
                { id: 'exam-2', learningId: 'learn-5', examName: 'Science Quarterly Exam', subject: 'Science', date: new Date('2024-10-25T10:00:00'), score: 92, maxScore: 100, grade: 'A+', certification: false },
                { id: 'exam-3', learningId: 'learn-5', examName: 'Tamil Language Test', subject: 'Tamil', date: new Date('2024-10-18T09:00:00'), score: 78, maxScore: 100, grade: 'B+', certification: false },
                { id: 'exam-4', learningId: 'learn-5', examName: 'Social Studies Final Exam', subject: 'Social Studies', date: new Date('2024-11-05T10:00:00'), score: null, maxScore: 100, grade: null, certification: false }
            ]
        });
        console.log('✅ Seeded Learning tables');
        // Seed Learning Duty and Art Forms
        const learningDuty = await index_1.db.learningDuty.create({
            data: {
                title: 'Classical Indian Arts (Chatusshasti Kalas)',
                description: 'The 64 classical arts and sciences of ancient India, providing comprehensive cultural and spiritual development',
                category: 'Art Forms',
                vedicSource: 'Ancient Indian tradition of 64 arts'
            }
        });
        await index_1.db.artForm.createMany({
            data: [
                { learningDutyId: learningDuty.id, artId: 1, artTitle: 'Geet Vidya', description: 'Sacred singing for joy, devotion, and memory', virtueIds: '[28,35,46]', dutyType: 'Emotional', lifeStage: 'Youth', frequency: 'Weekly', karmaPoints: 5 },
                { learningDutyId: learningDuty.id, artId: 2, artTitle: 'Vadya Vidya', description: 'Playing musical instruments to express sacred rhythm', virtueIds: '[28,25,44]', dutyType: 'Festival', lifeStage: 'Youth', frequency: 'Monthly', karmaPoints: 6 },
                { learningDutyId: learningDuty.id, artId: 3, artTitle: 'Nritya Vidya', description: 'Dance as ritual offering and emotional expression', virtueIds: '[28,22,25]', dutyType: 'Festival', lifeStage: 'Youth', frequency: 'Monthly', karmaPoints: 6 },
                { learningDutyId: learningDuty.id, artId: 4, artTitle: 'Natya Vidya', description: 'Drama and storytelling to preserve memory and dharma', virtueIds: '[46,25,43]', dutyType: 'Festival', lifeStage: 'Youth', frequency: 'Monthly', karmaPoints: 5 },
                { learningDutyId: learningDuty.id, artId: 5, artTitle: 'Alekhya Vidya', description: 'Painting and drawing to beautify sacred spaces', virtueIds: '[48,39,28]', dutyType: 'Emotional', lifeStage: 'Youth', frequency: 'Monthly', karmaPoints: 4 },
                { learningDutyId: learningDuty.id, artId: 6, artTitle: 'Suci-vaya-karma', description: 'Needlework and embroidery for ritual and hospitality', virtueIds: '[44,22,35]', dutyType: 'Logistical', lifeStage: 'Householder', frequency: 'Monthly', karmaPoints: 3 },
                { learningDutyId: learningDuty.id, artId: 7, artTitle: 'Bhakshya-vikara-kriya', description: 'Cooking with restraint and sacred intention', virtueIds: '[33,22,44]', dutyType: 'Daily', lifeStage: 'Householder', frequency: 'Weekly', karmaPoints: 5 },
                { learningDutyId: learningDuty.id, artId: 8, artTitle: 'Dhatu-vada', description: 'Metallurgy and crafting for temple and home use', virtueIds: '[44,50,48]', dutyType: 'Logistical', lifeStage: 'Householder', frequency: 'Quarterly', karmaPoints: 6 },
                { learningDutyId: learningDuty.id, artId: 9, artTitle: 'Prahelika', description: 'Riddle creation and solving to sharpen memory and wit', virtueIds: '[43,46,35]', dutyType: 'Emotional', lifeStage: 'Youth', frequency: 'Weekly', karmaPoints: 4 },
                { learningDutyId: learningDuty.id, artId: 10, artTitle: 'Pustaka-vacana', description: 'Book recitation and chanting for learning and devotion', virtueIds: '[43,45,46]', dutyType: 'Ritual', lifeStage: 'Youth', frequency: 'Weekly', karmaPoints: 5 },
                { learningDutyId: learningDuty.id, artId: 11, artTitle: 'Dasana-vasananga-raga', description: 'Cleansing and beautification of body and space', virtueIds: '[39,48,35]', dutyType: 'Daily', lifeStage: 'All', frequency: 'Weekly', karmaPoints: 3 },
                { learningDutyId: learningDuty.id, artId: 12, artTitle: 'Sugandha-yukti', description: 'Use of aromatics and scents in rituals and hosting', virtueIds: '[22,39,28]', dutyType: 'Ritual', lifeStage: 'Householder', frequency: 'Monthly', karmaPoints: 4 },
                { learningDutyId: learningDuty.id, artId: 13, artTitle: 'Udaka-vadya', description: 'Creating music with water and natural elements', virtueIds: '[28,50,25]', dutyType: 'Festival', lifeStage: 'Youth', frequency: 'Festival', karmaPoints: 5 },
                { learningDutyId: learningDuty.id, artId: 14, artTitle: 'Aindra-jala', description: 'Juggling and illusion for joy and hospitality', virtueIds: '[28,25,22]', dutyType: 'Festival', lifeStage: 'Youth', frequency: 'Festival', karmaPoints: 4 },
                { learningDutyId: learningDuty.id, artId: 15, artTitle: 'Kavya-samasya-purana', description: 'Solving poetic puzzles to preserve memory and dharma', virtueIds: '[43,46,44]', dutyType: 'Emotional', lifeStage: 'Youth', frequency: 'Monthly', karmaPoints: 5 },
                { learningDutyId: learningDuty.id, artId: 16, artTitle: 'Pushpa-shastra', description: 'Flower arrangement for altar and hospitality', virtueIds: '[48,22,28]', dutyType: 'Ritual', lifeStage: 'Householder', frequency: 'Weekly', karmaPoints: 3 },
                { learningDutyId: learningDuty.id, artId: 17, artTitle: 'Shayana-racana', description: 'Designing sacred sleeping spaces and bedding', virtueIds: '[48,39,25]', dutyType: 'Logistical', lifeStage: 'Householder', frequency: 'Monthly', karmaPoints: 3 },
                { learningDutyId: learningDuty.id, artId: 18, artTitle: 'Chitra-karma', description: 'Creating symbolic art for rituals and memory', virtueIds: '[46,48,28]', dutyType: 'Ritual', lifeStage: 'Youth', frequency: 'Monthly', karmaPoints: 4 },
                { learningDutyId: learningDuty.id, artId: 19, artTitle: 'Mani-bhushana-kriya', description: 'Jewelry design for sacred occasions', virtueIds: '[28,25,39]', dutyType: 'Festival', lifeStage: 'Youth', frequency: 'Festival', karmaPoints: 4 },
                { learningDutyId: learningDuty.id, artId: 20, artTitle: 'Shilpa-shastra', description: 'Sculpting and temple architecture', virtueIds: '[44,48,50]', dutyType: 'Ritual', lifeStage: 'Householder', frequency: 'Quarterly', karmaPoints: 6 }
            ]
        });
        console.log('✅ Seeded Learning Duty and Art Forms'); // TODO: Fix issues seeding - schema mismatch
        // // Clear existing issues data first
        // await db.issuesEmergency.deleteMany();
        // await db.issuesUrgent.deleteMany();
        // await db.issuesRepair.deleteMany();
        // await db.issuesMaintenance.deleteMany();
        // await db.issuesUpgrade.deleteMany();
        // await db.issuesConflict.deleteMany();
        // await db.issuesHabit.deleteMany();
        // await db.issue.deleteMany();
        // console.log('🗑️ Cleared existing issues data');
        // // Seed Issues tables
        // await db.issue.createMany({
        // 	data: [
        // 	{ id: 1, type: 'External', category: 'Repairs', status: 'Reported', location: 'Kitchen', contact: 'Plumber: +91-9876543210', assignedTo: 'user-1', createdBy: 'user-2', applicableRole: 'Parents', createdAt: new Date('2024-10-15') },
        // 	{ id: 2, type: 'Internal', category: 'Emergency', status: 'In Progress', location: 'Bathroom', contact: 'Electrician: +91-9876543211', assignedTo: 'user-3', createdBy: 'user-1', applicableRole: 'All', createdAt: new Date('2024-10-14') },
        // 	{ id: 3, type: 'External', category: 'Maintenance', status: 'Resolved', location: 'Garden', contact: 'Gardener: +91-9876543212', assignedTo: 'user-2', createdBy: 'user-4', applicableRole: 'Parents', createdAt: new Date('2024-10-13') },
        // 	{ id: 4, type: 'External', category: 'Upgrades', status: 'Reported', location: 'Home Office', contact: 'ISP: +91-9876543213', assignedTo: 'user-1', createdBy: 'user-3', applicableRole: 'Parents', createdAt: new Date('2024-10-12') },
        // 	{ id: 5, type: 'Internal', category: 'Urgent', status: 'In Progress', location: 'Living Room', contact: 'Internal', assignedTo: 'user-4', createdBy: 'user-2', applicableRole: 'All', createdAt: new Date('2024-10-11') },
        // 	{ id: 6, type: 'Internal', category: 'Conflicts', status: 'Open', location: 'Home', contact: 'Family Mediation', assignedTo: 'user-1', createdBy: 'user-2', applicableRole: 'Parents', createdAt: new Date('2024-10-10') },
        // 	{ id: 7, type: 'Internal', category: 'Habits', status: 'In Progress', location: 'Study Room', contact: 'Internal', assignedTo: 'user-3', createdBy: 'user-1', applicableRole: 'Children', createdAt: new Date('2024-10-09') }
        // ]});
        // // Seed Issues Emergency
        // await db.issuesEmergency.createMany({
        // 	data: [
        // 	{ 
        // 		id: 'emerg-1', 
        // 		issueId: 2, 
        // 		emergencyType: 'Safety', 
        // 		severity: 'High', 
        // 		responseTime: 'Immediate', 
        // 		emergencyContacts: JSON.stringify(['+91-9876543211', '+91-100']), 
        // 		backupPlan: 'Use mobile phone flashlight and call electrician immediately', 
        // 		status: 'Responding', 
        // 		lastUpdated: new Date('2024-10-14T10:00:00') 
        // 	}
        // ]});
        // // Seed Issues Urgents
        // await db.issuesUrgent.createMany({
        // 	data: [
        // 	{ 
        // 		id: 'urgent-1', 
        // 		issueId: 5, 
        // 		urgentType: 'Health', 
        // 		deadline: new Date('2024-10-16'), 
        // 		impact: 'High', 
        // 		stakeholders: JSON.stringify(['user-2', 'user-4']), 
        // 		actionPlan: 'Deep clean living room, organize Diwali decorations, prepare welcome area', 
        // 		status: 'In Progress', 
        // 		lastUpdated: new Date('2024-10-15T09:00:00') 
        // 	}
        // ]});
        // // Seed Issues Repairs
        // await db.issuesRepair.createMany({
        // 	data: [
        // 	{ 
        // 		id: 'repair-1', 
        // 		issueId: 1, 
        // 		item: 'Kitchen Sink', 
        // 		damage: 'Leak in pipe joint', 
        // 		repairType: 'Plumbing', 
        // 		estimatedCost: 2500, 
        // 		contractor: 'Raj Plumbing Services', 
        // 		parts: JSON.stringify(['Pipe joint', 'Sealant', 'Tools']), 
        // 		status: 'Assessment', 
        // 		lastUpdated: new Date('2024-10-15T08:00:00') 
        // 	}
        // ]});
        // // Seed Issues Maintenance
        // await db.issuesMaintenance.createMany({
        // 	data: [
        // 	{ 
        // 		id: 'maint-1', 
        // 		issueId: 3, 
        // 		system: 'Gardening', 
        // 		maintenanceType: 'Preventive', 
        // 		schedule: 'Weekly', 
        // 		contractor: 'Green Thumb Gardeners', 
        // 		cost: 1500, 
        // 		lastService: new Date('2024-10-10'), 
        // 		nextService: new Date('2024-10-17') 
        // 	}
        // ]});
        // // Seed Issues Upgrades
        // await db.issuesUpgrade.createMany({
        // 	data: [
        // 	{ 
        // 		id: 'upgrade-1', 
        // 		issueId: 4, 
        // 		upgradeType: 'Technology', 
        // 		benefit: 'Faster internet for online classes and work', 
        // 		roi: 'High - Essential for education and work productivity', 
        // 		budget: 5000, 
        // 		timeline: '2 weeks', 
        // 		status: 'Proposed', 
        // 		lastUpdated: new Date('2024-10-12T14:00:00') 
        // 	}
        // ]});
        // // Seed Issues Conflicts
        // await db.issuesConflict.createMany({
        // 	data: [
        // 	{ 
        // 		id: 'conflict-1', 
        // 		issueId: 6, 
        // 		conflictType: 'Schedule', 
        // 		parties: JSON.stringify(['user-3', 'user-4']), 
        // 		description: 'Children arguing over TV time and study schedule conflicts', 
        // 		impact: 'Medium - Affects daily routine and study time', 
        // 		resolution: 'Create structured schedule with designated TV and study times', 
        // 		mediator: 'user-1', 
        // 		status: 'Mediated', 
        // 		lastUpdated: new Date('2024-10-14T16:00:00') 
        // 	}
        // ]});
        // // Seed Issues Habits
        // await db.issuesHabit.createMany({
        // 	data: [
        // 	{ 
        // 		id: 'habit-1', 
        // 		issueId: 7, 
        // 		habitType: 'Negative', 
        // 		description: 'Excessive mobile phone usage during study time', 
        // 		triggers: JSON.stringify(['Boredom', 'Social media notifications']), 
        // 		consequences: 'Poor academic performance, eye strain, reduced family interaction', 
        // 		strategy: 'Replace with reading books, set phone time limits, create phone-free zones', 
        // 		progress: 'Improving', 
        // 		lastUpdated: new Date('2024-10-13T18:00:00') 
        // 	}
        // ]});
        // console.log('✅ Seeded Issues tables');
        console.log('🎉 Database seeding completed successfully!');
        // TODO: Fix issues seeding - schema mismatch
        // // Clear existing issues data first
        // await db.issuesEmergency.deleteMany();
        // await db.issuesUrgent.deleteMany();
        // await db.issuesRepair.deleteMany();
        // await db.issuesMaintenance.deleteMany();
        // await db.issuesUpgrade.deleteMany();
        // await db.issuesConflict.deleteMany();
        // await db.issuesHabit.deleteMany();
        // await db.issue.deleteMany();
        // console.log('🗑️ Cleared existing issues data');
        // // Seed Issues tables
        // await db.issue.createMany({
        // 	data: [
        // 	{ id: 1, type: 'External', category: 'Repairs', status: 'Reported', location: 'Kitchen', contact: 'Plumber: +91-9876543210', assignedTo: 'user-1', createdBy: 'user-2', applicableRole: 'Parents', createdAt: new Date('2024-10-15') },
        // 	{ id: 2, type: 'Internal', category: 'Emergency', status: 'In Progress', location: 'Bathroom', contact: 'Electrician: +91-9876543211', assignedTo: 'user-3', createdBy: 'user-1', applicableRole: 'All', createdAt: new Date('2024-10-14') },
        // 	{ id: 3, type: 'External', category: 'Maintenance', status: 'Resolved', location: 'Garden', contact: 'Gardener: +91-9876543212', assignedTo: 'user-2', createdBy: 'user-4', applicableRole: 'Parents', createdAt: new Date('2024-10-13') },
        // 	{ id: 4, type: 'External', category: 'Upgrades', status: 'Reported', location: 'Home Office', contact: 'ISP: +91-9876543213', assignedTo: 'user-1', createdBy: 'user-3', applicableRole: 'Parents', createdAt: new Date('2024-10-12') },
        // 	{ id: 5, type: 'Internal', category: 'Urgent', status: 'In Progress', location: 'Living Room', contact: 'Internal', assignedTo: 'user-4', createdBy: 'user-2', applicableRole: 'All', createdAt: new Date('2024-10-11') },
        // 	{ id: 6, type: 'Internal', category: 'Conflicts', status: 'Open', location: 'Home', contact: 'Family Mediation', assignedTo: 'user-1', createdBy: 'user-2', applicableRole: 'Parents', createdAt: new Date('2024-10-10') },
        // 	{ id: 7, type: 'Internal', category: 'Habits', status: 'In Progress', location: 'Study Room', contact: 'Internal', assignedTo: 'user-3', createdBy: 'user-1', applicableRole: 'Children', createdAt: new Date('2024-10-09') }
        // ]});
        // // Seed Issues Emergency
        // await db.issuesEmergency.createMany({
        // 	data: [
        // 	{ 
        // 		id: 'emerg-1', 
        // 		issueId: 2, 
        // 		emergencyType: 'Safety', 
        // 		severity: 'High', 
        // 		responseTime: 'Immediate', 
        // 		emergencyContacts: JSON.stringify(['+91-9876543211', '+91-100']), 
        // 		backupPlan: 'Use mobile phone flashlight and call electrician immediately', 
        // 		status: 'Responding', 
        // 		lastUpdated: new Date('2024-10-14T10:00:00') 
        // 	}
        // ]});
        // // Seed Issues Urgents
        // await db.issuesUrgent.createMany({
        // 	data: [
        // 	{ 
        // 		id: 'urgent-1', 
        // 		issueId: 5, 
        // 		urgentType: 'Health', 
        // 		deadline: new Date('2024-10-16'), 
        // 		impact: 'High', 
        // 		stakeholders: JSON.stringify(['user-2', 'user-4']), 
        // 		actionPlan: 'Deep clean living room, organize Diwali decorations, prepare welcome area', 
        // 		status: 'In Progress', 
        // 		lastUpdated: new Date('2024-10-15T09:00:00') 
        // 	}
        // ]});
        // // Seed Issues Repairs
        // await db.issuesRepair.createMany({
        // 	data: [
        // 	{ 
        // 		id: 'repair-1', 
        // 		issueId: 1, 
        // 		item: 'Kitchen Sink', 
        // 		damage: 'Leak in pipe joint', 
        // 		repairType: 'Plumbing', 
        // 		estimatedCost: 2500, 
        // 		contractor: 'Raj Plumbing Services', 
        // 		parts: JSON.stringify(['Pipe joint', 'Sealant', 'Tools']), 
        // 		status: 'Assessment', 
        // 		lastUpdated: new Date('2024-10-15T08:00:00') 
        // 	}
        // ]});
        // // Seed Issues Maintenance
        // await db.issuesMaintenance.createMany({
        // 	data: [
        // 	{ 
        // 		id: 'maint-1', 
        // 		issueId: 3, 
        // 		system: 'Gardening', 
        // 		maintenanceType: 'Preventive', 
        // 		schedule: 'Weekly', 
        // 		contractor: 'Green Thumb Gardeners', 
        // 		cost: 1500, 
        // 		lastService: new Date('2024-10-10'), 
        // 		nextService: new Date('2024-10-17') 
        // 	}
        // ]});
        // // Seed Issues Upgrades
        // await db.issuesUpgrade.createMany({
        // 	data: [
        // 	{ 
        // 		id: 'upgrade-1', 
        // 		issueId: 4, 
        // 		upgradeType: 'Technology', 
        // 		benefit: 'Faster internet for online classes and work', 
        // 		roi: 'High - Essential for education and work productivity', 
        // 		budget: 5000, 
        // 		timeline: '2 weeks', 
        // 		status: 'Proposed', 
        // 		lastUpdated: new Date('2024-10-12T14:00:00') 
        // 	}
        // ]});
        // // Seed Issues Conflicts
        // await db.issuesConflict.createMany({
        // 	data: [
        // 	{ 
        // 		id: 'conflict-1', 
        // 		issueId: 6, 
        // 		conflictType: 'Schedule', 
        // 		parties: JSON.stringify(['user-3', 'user-4']), 
        // 		description: 'Children arguing over TV time and study schedule conflicts', 
        // 		impact: 'Medium - Affects daily routine and study time', 
        // 		resolution: 'Create structured schedule with designated TV and study times', 
        // 		mediator: 'user-1', 
        // 		status: 'Mediated', 
        // 		lastUpdated: new Date('2024-10-14T16:00:00') 
        // 	}
        // ]});
        // // Seed Issues Habits
        // await db.issuesHabit.createMany({
        // 	data: [
        // 	{ 
        // 		id: 'habit-1', 
        // 		issueId: 7, 
        // 		habitType: 'Negative', 
        // 		description: 'Excessive mobile phone usage during study time', 
        // 		triggers: JSON.stringify(['Boredom', 'Social media notifications']), 
        // 		consequences: 'Poor academic performance, eye strain, reduced family interaction', 
        // 		strategy: 'Replace with reading books, set phone time limits, create phone-free zones', 
        // 		progress: 'Improving', 
        // 		lastUpdated: new Date('2024-10-13T18:00:00') 
        // 	}
        // ]});
        // console.log('✅ Seeded Issues tables');
        console.log('🎉 Database seeding completed successfully!');
    }
    catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    }
}
// Run the seed function
seedDatabase();
