<script lang="ts">
	import { onMount } from 'svelte';

	let activeTab = $state('dashboard');
	let selectedCategory = $state<string | null>(null);
	let responsibilities = $state<Array<{
		id: string;
		type: string;
		category: string;
		subCategory: string;
		status: string;
		assignedTo: string;
		priority: 'Low' | 'Medium' | 'High' | 'Critical';
		description: string;
		createdAt: Date;
		dueDate?: Date;
		value?: string;
	}>>([]);

	// Debt data structure
	interface DebtActivity {
		id: string;
		title: string;
		description: string;
		target: number;
		current: number;
		unit: string;
		category: 'temples' | 'rituals' | 'fasting' | 'pooja' | 'financial' | 'property' | 'family' | 'nature' | 'karmic' | 'heavenly';
		color: string;
		icon: string;
		activities: Array<{
			id: string;
			date: Date;
			description: string;
			location?: string;
			notes?: string;
		}>;
	}

	// Debt activities data
	let debts = $state<DebtActivity[]>([
		{
			id: 'temples-108',
			title: 'Visit 108 Temples',
			description: 'Complete pilgrimage to 108 sacred temples',
			target: 108,
			current: 12,
			unit: 'temples',
			category: 'temples',
			color: 'from-orange-500 to-red-600',
			icon: '🕉️',
			activities: [
				{ id: '1', date: new Date('2024-01-15'), description: 'Sri Ranganathaswamy Temple, Srirangam', location: 'Srirangam' },
				{ id: '2', date: new Date('2024-02-20'), description: 'Meenakshi Temple, Madurai', location: 'Madurai' },
				{ id: '3', date: new Date('2024-03-10'), description: 'Kapaleeshwarar Temple, Chennai', location: 'Chennai' },
				{ id: '4', date: new Date('2024-04-05'), description: 'Brihadeeswarar Temple, Thanjavur', location: 'Thanjavur' },
				{ id: '5', date: new Date('2024-05-12'), description: 'Jambukeswarar Temple, Thiruvanaikaval', location: 'Thiruvanaikaval' },
				{ id: '6', date: new Date('2024-06-18'), description: 'Nataraja Temple, Chidambaram', location: 'Chidambaram' },
				{ id: '7', date: new Date('2024-07-22'), description: 'Marundeeswarar Temple, Thiruvanmiyur', location: 'Chennai' },
				{ id: '8', date: new Date('2024-08-14'), description: 'Ekambareswarar Temple, Kanchipuram', location: 'Kanchipuram' },
				{ id: '9', date: new Date('2024-09-08'), description: 'Varadharaja Perumal Temple, Kanchipuram', location: 'Kanchipuram' },
				{ id: '10', date: new Date('2024-10-03'), description: 'Kailasanathar Temple, Kanchipuram', location: 'Kanchipuram' },
				{ id: '11', date: new Date('2024-11-15'), description: 'Airavatesvara Temple, Darasuram', location: 'Darasuram' },
				{ id: '12', date: new Date('2024-12-20'), description: 'Gangaikonda Cholapuram Temple', location: 'Gangaikonda Cholapuram' }
			]
		},
		{
			id: 'abhishegams-48',
			title: '48 Abhishegams',
			description: 'Perform sacred water rituals at temples',
			target: 48,
			current: 8,
			unit: 'rituals',
			category: 'rituals',
			color: 'from-blue-500 to-indigo-600',
			icon: '🪔',
			activities: [
				{ id: '1', date: new Date('2024-01-15'), description: 'Abhishegam at Sri Ranganathaswamy Temple', location: 'Srirangam' },
				{ id: '2', date: new Date('2024-02-20'), description: 'Abhishegam at Meenakshi Temple', location: 'Madurai' },
				{ id: '3', date: new Date('2024-06-18'), description: 'Abhishegam at Nataraja Temple', location: 'Chidambaram' },
				{ id: '4', date: new Date('2024-08-14'), description: 'Abhishegam at Ekambareswarar Temple', location: 'Kanchipuram' },
				{ id: '5', date: new Date('2024-10-03'), description: 'Abhishegam at Kailasanathar Temple', location: 'Kanchipuram' },
				{ id: '6', date: new Date('2024-11-15'), description: 'Abhishegam at Airavatesvara Temple', location: 'Darasuram' },
				{ id: '7', date: new Date('2024-12-20'), description: 'Abhishegam at Gangaikonda Temple', location: 'Gangaikonda Cholapuram' },
				{ id: '8', date: new Date('2025-01-10'), description: 'Abhishegam at Sarangapani Temple', location: 'Kumbakonam' }
			]
		},
		{
			id: 'kula-deivam-28',
			title: '28 Kula Deivam Rituals',
			description: 'Rituals for clan deity protection and blessings',
			target: 28,
			current: 5,
			unit: 'rituals',
			category: 'rituals',
			color: 'from-purple-500 to-pink-600',
			icon: '🙏',
			activities: [
				{ id: '1', date: new Date('2024-01-01'), description: 'Monthly Kula Deivam Pooja', notes: 'Family gathering' },
				{ id: '2', date: new Date('2024-02-01'), description: 'Kula Deivam Abhishegam', notes: 'Special offerings' },
				{ id: '3', date: new Date('2024-03-01'), description: 'Ancestral Ritual', notes: 'Remembering forefathers' },
				{ id: '4', date: new Date('2024-04-01'), description: 'Protection Ceremony', notes: 'Family safety prayers' },
				{ id: '5', date: new Date('2024-05-01'), description: 'Blessing Ritual', notes: 'Health and prosperity' }
			]
		},
		{
			id: 'girivalams-12',
			title: '12 Girivalams',
			description: 'Circumambulate sacred temple hills',
			target: 12,
			current: 3,
			unit: 'circumambulations',
			category: 'temples',
			color: 'from-green-500 to-teal-600',
			icon: '🏔️',
			activities: [
				{ id: '1', date: new Date('2024-03-10'), description: 'Tirupati Tirumala Girivalam', location: 'Tirupati' },
				{ id: '2', date: new Date('2024-07-22'), description: 'Palani Murugan Temple Girivalam', location: 'Palani' },
				{ id: '3', date: new Date('2024-11-15'), description: 'Arunachala Girivalam', location: 'Tiruvannamalai' }
			]
		},
		{
			id: 'head-shaving-7',
			title: '7 Head Shaving Ceremonies',
			description: 'Sacred head shaving for whole family',
			target: 7,
			current: 2,
			unit: 'ceremonies',
			category: 'rituals',
			color: 'from-yellow-500 to-orange-600',
			icon: '💇',
			activities: [
				{ id: '1', date: new Date('2024-02-20'), description: 'Family Head Shaving Ceremony', notes: 'Annual ritual for health and prosperity' },
				{ id: '2', date: new Date('2024-08-14'), description: 'Special Pooja Head Shaving', notes: 'During festival season' }
			]
		},
		{
			id: 'hill-temples-6',
			title: '6 Hill Temples',
			description: 'Visit sacred temples on hills',
			target: 6,
			current: 4,
			unit: 'temples',
			category: 'temples',
			color: 'from-cyan-500 to-blue-600',
			icon: '⛰️',
			activities: [
				{ id: '1', date: new Date('2024-01-15'), description: 'Tirupati Balaji Temple', location: 'Tirupati' },
				{ id: '2', date: new Date('2024-03-10'), description: 'Palani Murugan Temple', location: 'Palani' },
				{ id: '3', date: new Date('2024-05-12'), description: 'Swamimalai Murugan Temple', location: 'Swamimalai' },
				{ id: '4', date: new Date('2024-07-22'), description: 'Thiruparankundram Murugan Temple', location: 'Madurai' }
			]
		},
		{
			id: 'yagnam-3',
			title: '3 Yagnams for Parents',
			description: 'Sacred fire ceremonies for parental blessings',
			target: 3,
			current: 1,
			unit: 'ceremonies',
			category: 'rituals',
			color: 'from-red-500 to-pink-600',
			icon: '🔥',
			activities: [
				{ id: '1', date: new Date('2024-06-18'), description: '60th Wedding Anniversary Yagnam', notes: 'Parents golden jubilee celebration' }
			]
		},
		{
			id: 'viradhams-108',
			title: '108 Viradhams',
			description: 'Sacred fasting by skipping one meal',
			target: 108,
			current: 24,
			unit: 'fasts',
			category: 'fasting',
			color: 'from-emerald-500 to-green-600',
			icon: '🍽️',
			activities: [
				{ id: '1', date: new Date('2024-01-01'), description: 'Ekadashi Viradham', notes: 'Skipped lunch' },
				{ id: '2', date: new Date('2024-01-15'), description: 'Pournami Viradham', notes: 'Skipped dinner' }
			]
		},
		{
			id: 'special-days-28',
			title: '28 Special Day Poojas',
			description: 'Rituals on Shashti, Ekadashi, Sathurthi, Pournami, Amavasai',
			target: 28,
			current: 12,
			unit: 'poojas',
			category: 'pooja',
			color: 'from-violet-500 to-purple-600',
			icon: '🌙',
			activities: [
				{ id: '1', date: new Date('2024-01-01'), description: 'New Year Shashti Pooja', notes: 'Special prayers' },
				{ id: '2', date: new Date('2024-01-15'), description: 'Full Moon Pournami Pooja', notes: 'Moonlight ceremony' }
			]
		},
		{
			id: 'rahu-kala-48',
			title: '48 Rahu Kala Poojas',
			description: 'Special poojas during Rahu Kala period',
			target: 48,
			current: 16,
			unit: 'poojas',
			category: 'pooja',
			color: 'from-slate-500 to-gray-600',
			icon: '🌑',
			activities: [
				{ id: '1', date: new Date('2024-01-05'), description: 'Rahu Kala Pooja for Health', notes: 'Family health prayers' },
				{ id: '2', date: new Date('2024-02-10'), description: 'Rahu Kala Pooja for Prosperity', notes: 'Business success' }
			]
		},
		// Earthly Debts
		{
			id: 'loan-closure',
			title: 'Loan Closure',
			description: 'Clear debts equal to 12 years of cumulative annual salary',
			target: 12000000, // Example: 1M per year for 12 years
			current: 2500000,
			unit: 'rupees',
			category: 'financial',
			color: 'from-emerald-500 to-green-600',
			icon: '💰',
			activities: [
				{ id: '1', date: new Date('2024-01-15'), description: 'Personal Loan Payment - ₹50,000', notes: 'Monthly installment' },
				{ id: '2', date: new Date('2024-02-15'), description: 'Home Loan Payment - ₹75,000', notes: 'Monthly installment' },
				{ id: '3', date: new Date('2024-03-15'), description: 'Education Loan Payment - ₹25,000', notes: 'Monthly installment' }
			]
		},
		{
			id: 'buy-home',
			title: 'Buy a Home',
			description: 'Purchase your dream home',
			target: 1,
			current: 0,
			unit: 'home',
			category: 'property',
			color: 'from-blue-500 to-indigo-600',
			icon: '🏠',
			activities: [
				{ id: '1', date: new Date('2024-01-10'), description: 'Property Search Started', location: 'Chennai', notes: 'Looking for 3BHK apartment' },
				{ id: '2', date: new Date('2024-02-20'), description: 'Shortlisted 3 Properties', notes: 'Budget range: ₹80L-1.2Cr' }
			]
		},
		{
			id: 'buy-land',
			title: 'Buy Land',
			description: 'Purchase agricultural or residential land',
			target: 1,
			current: 0,
			unit: 'plot',
			category: 'property',
			color: 'from-amber-500 to-orange-600',
			icon: '🌱',
			activities: [
				{ id: '1', date: new Date('2024-03-05'), description: 'Land Survey Completed', location: 'Near Chennai', notes: '5 acres agricultural land' }
			]
		},
		{
			id: 'raise-children',
			title: 'Raise Children',
			description: 'Nurture and educate your children',
			target: 2,
			current: 2,
			unit: 'children',
			category: 'family',
			color: 'from-pink-500 to-rose-600',
			icon: '👨‍👩‍👧‍👦',
			activities: [
				{ id: '1', date: new Date('2024-01-01'), description: 'Education Milestone - School Admission', notes: 'Both children in good schools' },
				{ id: '2', date: new Date('2024-06-15'), description: 'Health Checkup Completed', notes: 'Annual medical examination' },
				{ id: '3', date: new Date('2024-08-20'), description: 'Sports Achievement', notes: 'Won inter-school competition' }
			]
		},
		{
			id: 'care-pets',
			title: 'Care for Pets',
			description: 'Provide loving care for your pets',
			target: 5,
			current: 2,
			unit: 'years',
			category: 'family',
			color: 'from-purple-500 to-violet-600',
			icon: '🐾',
			activities: [
				{ id: '1', date: new Date('2024-01-01'), description: 'Pet Adoption - Golden Retriever', notes: 'Named Max, 2 years old' },
				{ id: '2', date: new Date('2024-03-10'), description: 'Pet Adoption - Persian Cat', notes: 'Named Luna, 1 year old' },
				{ id: '3', date: new Date('2024-06-01'), description: 'Vaccination Completed', notes: 'All pets vaccinated' }
			]
		},
		{
			id: 'make-gardens',
			title: 'Create Gardens',
			description: 'Build beautiful gardens (Flowers > Fruits > Vegetables > Other)',
			target: 100,
			current: 35,
			unit: 'plants',
			category: 'nature',
			color: 'from-green-500 to-emerald-600',
			icon: '🌺',
			activities: [
				{ id: '1', date: new Date('2024-01-15'), description: 'Rose Garden - 20 plants', notes: 'Premium flower garden' },
				{ id: '2', date: new Date('2024-02-20'), description: 'Mango Orchard - 10 trees', notes: 'Fruit bearing trees' },
				{ id: '3', date: new Date('2024-03-25'), description: 'Vegetable Patch - 15 varieties', notes: 'Organic vegetables' },
				{ id: '4', date: new Date('2024-04-10'), description: 'Herb Garden - 8 varieties', notes: 'Medicinal and culinary herbs' }
			]
		},
		{
			id: 'raise-tree',
			title: 'Raise a Tree',
			description: 'Plant and nurture a tree to at least 20 feet tall',
			target: 1,
			current: 1,
			unit: 'tree',
			category: 'nature',
			color: 'from-teal-500 to-cyan-600',
			icon: '🌳',
			activities: [
				{ id: '1', date: new Date('2023-06-15'), description: 'Neem Tree Planted', notes: 'Medicinal tree, current height: 18 feet' },
				{ id: '2', date: new Date('2024-01-10'), description: 'Growth Measurement', notes: 'Reached 20 feet milestone!' },
				{ id: '3', date: new Date('2024-06-15'), description: 'Annual Maintenance', notes: 'Pruning and fertilization completed' }
			]
		},
		// Karmic Debt - Service to Others
		{
			id: 'karmic-service-others',
			title: 'Karmic Debt - Service to Others',
			description: 'Fulfill your karmic duty through selfless service to others',
			target: 7,
			current: 2,
			unit: 'services',
			category: 'karmic',
			color: 'from-purple-500 to-indigo-600',
			icon: '🤝',
			activities: [
				{ id: '1', date: new Date('2024-01-15'), description: 'Helped 7 strangers in need', notes: 'Donated food and clothing to homeless shelter' },
				{ id: '2', date: new Date('2024-02-20'), description: 'Caring for spouse - 5 years completed', notes: 'Supporting partner through career transition' },
				{ id: '3', date: new Date('2024-03-10'), description: 'Caring for parents - 8 years completed', notes: 'Daily care and emotional support' },
				{ id: '4', date: new Date('2024-04-05'), description: 'Caring for siblings - 2 years completed', notes: 'Helping younger brother with education' },
				{ id: '5', date: new Date('2024-05-12'), description: 'Community service - 6 months completed', notes: 'Neighborhood cleanup and elderly assistance' },
				{ id: '6', date: new Date('2024-06-18'), description: 'National service - 15 days completed', notes: 'Volunteered in disaster relief efforts' },
				{ id: '7', date: new Date('2024-07-22'), description: 'Self-care practice - 8 years completed', notes: 'Daily meditation and personal development' }
			]
		},
		// Heavenly Debt - Progress Bar Design and Tracking
		{
			id: 'heavenly-progress-tracking',
			title: 'Heavenly Debt - Progress Bar Design and Tracking',
			description: 'Achieve spiritual elevation through divine practices and nature connection',
			target: 7,
			current: 3,
			unit: 'practices',
			category: 'heavenly',
			color: 'from-cyan-500 to-blue-600',
			icon: '✨',
			activities: [
				{ id: '1', date: new Date('2024-01-01'), description: 'Divine mantra recitation - 25,000 times completed', notes: 'Daily practice of sacred mantras' },
				{ id: '2', date: new Date('2024-02-15'), description: 'Home pooja - 45 times completed', notes: 'Regular home worship ceremonies' },
				{ id: '3', date: new Date('2024-03-20'), description: 'Devotional singing - 6 years completed', notes: 'Daily bhajans and devotional music' },
				{ id: '4', date: new Date('2024-04-10'), description: 'Feeding birds/animals - 8 years completed', notes: 'Daily care for nature\'s creatures' },
				{ id: '5', date: new Date('2024-05-05'), description: 'Living near nature - 9 years completed', notes: 'Residing in natural surroundings' },
				{ id: '6', date: new Date('2024-06-12'), description: 'Yoga/meditation - 7 years completed', notes: 'Daily spiritual practices' },
				{ id: '7', date: new Date('2024-07-18'), description: 'Divine pilgrimage - 8 years completed', notes: 'Sacred journeys and spiritual travels' }
			]
		}
	]);

	// Language support
	let language = $state<'english' | 'tamil'>('english');

	// Mock data for responsibilities
	onMount(() => {
		responsibilities = [
			{
				id: '1',
				type: 'Financial',
				category: 'Financial',
				subCategory: 'Budget Planning',
				status: 'In Progress',
				assignedTo: 'Father',
				priority: 'High',
				description: 'Monthly family budget planning and expense tracking',
				createdAt: new Date('2025-10-15'),
				dueDate: new Date('2025-10-31'),
				value: '₹50,000/month'
			},
			{
				id: '2',
				type: 'Legal',
				category: 'Legal',
				subCategory: 'Property Documents',
				status: 'Completed',
				assignedTo: 'Father',
				priority: 'Critical',
				description: 'Update property registration documents',
				createdAt: new Date('2025-10-14'),
				dueDate: new Date('2025-10-20'),
				value: 'Property worth ₹2M'
			},
			{
				id: '3',
				type: 'Administrative',
				category: 'Administrative',
				subCategory: 'Insurance',
				status: 'Pending',
				assignedTo: 'Mother',
				priority: 'Medium',
				description: 'Renew health insurance policies',
				createdAt: new Date('2025-10-13'),
				dueDate: new Date('2025-11-15'),
				value: '₹25,000/year'
			},
			{
				id: '4',
				type: 'Decision Making',
				category: 'Decision Making',
				subCategory: 'Education',
				status: 'In Progress',
				assignedTo: 'Parents',
				priority: 'High',
				description: 'Choose school for children\'s higher education',
				createdAt: new Date('2025-10-12'),
				dueDate: new Date('2025-12-01'),
				value: 'Education investment'
			},
			{
				id: '5',
				type: 'Coordination',
				category: 'Coordination',
				subCategory: 'Family Events',
				status: 'Completed',
				assignedTo: 'Mother',
				priority: 'Medium',
				description: 'Organize Diwali family gathering',
				createdAt: new Date('2025-10-11'),
				dueDate: new Date('2025-10-25'),
				value: 'Family celebration'
			}
		];
	});

	// KPI calculations
	const totalResponsibilities = $derived(responsibilities.length);
	const completedResponsibilities = $derived(responsibilities.filter(r => r.status === 'Completed').length);
	const pendingResponsibilities = $derived(responsibilities.filter(r => r.status === 'Pending').length);
	const inProgressResponsibilities = $derived(responsibilities.filter(r => r.status === 'In Progress').length);
	const completionRate = $derived(totalResponsibilities > 0 ? Math.round((completedResponsibilities / totalResponsibilities) * 100) : 0);

	// Group responsibilities by category for child tables
	const responsibilitiesByCategory = $derived(responsibilities.reduce((acc, responsibility) => {
		if (!acc[responsibility.category]) acc[responsibility.category] = [];
		acc[responsibility.category].push(responsibility);
		return acc;
	}, {} as Record<string, typeof responsibilities>));

	const categories = [
		{ id: 'financial', name: 'Financial', icon: '💰', color: 'from-green-500 to-green-700' },
		{ id: 'legal', name: 'Legal', icon: '⚖️', color: 'from-blue-500 to-blue-700' },
		{ id: 'administrative', name: 'Administrative', icon: '📋', color: 'from-purple-500 to-purple-700' },
		{ id: 'decision-making', name: 'Decision Making', icon: '🎯', color: 'from-orange-500 to-orange-700' },
		{ id: 'coordination', name: 'Coordination', icon: '🤝', color: 'from-pink-500 to-pink-700' },
		{ id: 'oversight', name: 'Oversight', icon: '👁️', color: 'from-indigo-500 to-indigo-700' }
	];

	const tabs = [
		{ id: 'dashboard', label: 'Dashboard', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>' },
		{ id: 'debts', label: 'Debts', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path></svg>' },
		{ id: 'crud', label: 'CRUD Operations', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>' },
		{ id: 'discussion', label: 'Discussion', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>' },
		{ id: 'alerts', label: 'Alerts', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4.868 12.683A17.925 17.925 0 012 21h13.78a3 3 0 002.553-1.453c1.475-2.45 1.553-5.25.177-7.877-3.065-5.84 1.64-10.375 1.64-10.375s-5.83 3.061-8.895 8.901c-1.376 2.627-1.298 5.427.177 7.877A3 3 0 0113.78 21H2a3 3 0 01-2.553-1.453c-1.475-2.45-1.553-5.25-.177-7.877 3.065-5.84-1.64-10.375-1.64-10.375s5.83 3.061 8.895 8.901z"></path></svg>' }
	];

	function getStatusColor(status: string) {
		switch (status) {
			case 'Completed': return 'text-green-600 bg-green-100';
			case 'In Progress': return 'text-blue-600 bg-blue-100';
			case 'Pending': return 'text-orange-600 bg-orange-100';
			default: return 'text-gray-600 bg-gray-100';
		}
	}

	function getPriorityColor(priority: string) {
		switch (priority) {
			case 'Critical': return 'text-red-600 bg-red-100';
			case 'High': return 'text-orange-600 bg-orange-100';
			case 'Medium': return 'text-yellow-600 bg-yellow-100';
			case 'Low': return 'text-green-600 bg-green-100';
			default: return 'text-gray-600 bg-gray-100';
		}
	}

	// Modal and form state
	let showModal = $state(false);
	let editingResponsibility = $state<any>(null);

	function resetForm() {
		editingResponsibility = null;
	}

	function editResponsibility(responsibility: any) {
		editingResponsibility = responsibility;
		showModal = true;
	}

	function deleteResponsibility(id: string) {
		responsibilities = responsibilities.filter(r => r.id !== id);
	}
</script>

<svelte:head>
	<title>Responsibilities - Divine Nest</title>
</svelte:head>

<div class="min-h-screen p-4 pb-24">
	{#if selectedCategory}
		<!-- Category Sub-page -->
		<div class="max-w-7xl mx-auto">
			<div class="flex justify-between items-center mb-6">
				<div class="flex items-center space-x-4">
					<button
						onclick={() => selectedCategory = null}
						class="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
						aria-label="Back to main responsibilities page"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
						</svg>
					</button>
					<div>
						<h1 class="text-3xl font-bold text-gray-900">{categories.find(c => c.id === selectedCategory)?.name} Responsibilities</h1>
						<p class="text-gray-600 mt-1">Manage {categories.find(c => c.id === selectedCategory)?.name.toLowerCase()} related responsibilities</p>
					</div>
				</div>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each responsibilitiesByCategory[categories.find(c => c.id === selectedCategory)?.name || ''] || [] as responsibility}
					<div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 hover:scale-105">
						<div class="flex items-start justify-between mb-4">
							<div class="flex items-center space-x-3">
								<div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
									<span class="text-white font-semibold text-sm">{responsibility.subCategory.charAt(0)}</span>
								</div>
								<div>
									<h3 class="font-semibold text-gray-900">{responsibility.subCategory}</h3>
									<p class="text-sm text-gray-500">{responsibility.type}</p>
								</div>
							</div>
							<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {getPriorityColor(responsibility.priority)}">
								{responsibility.priority}
							</span>
						</div>

						<p class="text-gray-700 mb-4 text-sm">{responsibility.description}</p>

						<div class="space-y-2 mb-4">
							<div class="flex justify-between text-sm">
								<span class="text-gray-500">Assigned:</span>
								<span class="font-medium">{responsibility.assignedTo}</span>
							</div>
							{#if responsibility.dueDate}
								<div class="flex justify-between text-sm">
									<span class="text-gray-500">Due:</span>
									<span class="font-medium text-blue-600">{responsibility.dueDate.toLocaleDateString()}</span>
								</div>
							{/if}
							{#if responsibility.value}
								<div class="flex justify-between text-sm">
									<span class="text-gray-500">Value:</span>
									<span class="font-medium text-green-600">{responsibility.value}</span>
								</div>
							{/if}
						</div>

						<div class="flex items-center justify-between">
							<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {getStatusColor(responsibility.status)}">
								{responsibility.status}
							</span>
							<span class="text-xs text-gray-500">{responsibility.createdAt.toLocaleDateString()}</span>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{:else}
		<!-- Main Responsibilities Dashboard -->
		<div class="max-w-7xl mx-auto space-y-8">
			<!-- Welcome Section -->
			<div class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
				<div class="absolute inset-0 bg-black/10"></div>
				<div class="relative z-10">
					<h1 class="text-4xl font-bold mb-2">Responsibilities Management</h1>
					<p class="text-xl text-indigo-100 mb-6">Track and manage family responsibilities and obligations</p>
					<div class="flex items-center space-x-6 text-sm">
						<div class="flex items-center space-x-2">
							<div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
							<span>{totalResponsibilities} Total Responsibilities</span>
						</div>
						<div class="flex items-center space-x-2">
							<div class="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
							<span>{inProgressResponsibilities} In Progress</span>
						</div>
						<div class="flex items-center space-x-2">
							<div class="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
							<span>{pendingResponsibilities} Pending</span>
						</div>
					</div>
				</div>
				<div class="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
				<div class="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full"></div>
			</div>

			<!-- Tab Navigation -->
			<div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
				<div class="flex flex-wrap gap-2 mb-6">
					{#each tabs as tab}
						<button
							onclick={() => activeTab = tab.id}
							class="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 {activeTab === tab.id
								? 'bg-indigo-600 text-white shadow-lg'
								: 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
						>
							<div class="w-5 h-5 flex-shrink-0" class:text-white={activeTab === tab.id}>
								{@html tab.icon}
							</div>
							<span class="font-medium">{tab.label}</span>
						</button>
					{/each}
				</div>

				<!-- Tab Content -->
				{#if activeTab === 'dashboard'}
					<!-- KPI Dashboard -->
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						<div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
							<div class="flex items-center justify-between">
								<div>
									<p class="text-sm font-medium text-gray-600 mb-1">Total Responsibilities</p>
									<p class="text-3xl font-bold text-blue-600">{totalResponsibilities}</p>
									<p class="text-xs text-gray-500 mt-1">All time</p>
								</div>
								<div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
									<svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
									</svg>
								</div>
							</div>
						</div>

				<div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-sm font-medium text-gray-600 mb-1">Completed</p>
							<p class="text-3xl font-bold text-green-600">{completedResponsibilities}</p>
							<p class="text-xs text-gray-500 mt-1">{completionRate}% completion rate</p>
						</div>
						<div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
							<svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
							</svg>
						</div>
					</div>
				</div>

				<div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-sm font-medium text-gray-600 mb-1">In Progress</p>
							<p class="text-3xl font-bold text-orange-600">{inProgressResponsibilities}</p>
							<p class="text-xs text-gray-500 mt-1">Active responsibilities</p>
						</div>
						<div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
							<svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
							</svg>
						</div>
					</div>
				</div>

				<div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-sm font-medium text-gray-600 mb-1">Pending</p>
							<p class="text-3xl font-bold text-red-600">{pendingResponsibilities}</p>
							<p class="text-xs text-gray-500 mt-1">Awaiting action</p>
						</div>
						<div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
							<svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
							</svg>
						</div>
					</div>
				</div>
			</div>

			<!-- Category Cards -->
			<div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
				<h2 class="text-2xl font-bold text-gray-900 mb-6">Responsibility Categories</h2>
				<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
					{#each categories as category}
						<button
							onclick={() => selectedCategory = category.id}
							class="group relative bg-gradient-to-br {category.color} rounded-xl p-6 text-white hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
						>
							<div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
							<div class="relative z-10">
								<div class="text-3xl mb-3">{category.icon}</div>
								<h3 class="font-semibold text-lg mb-1">{category.name}</h3>
								<p class="text-sm opacity-90">{responsibilitiesByCategory[category.name]?.length || 0} responsibilities</p>
							</div>
							<div class="absolute -top-2 -right-2 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
								<span class="text-xs font-bold">{responsibilitiesByCategory[category.name]?.length || 0}</span>
							</div>
						</button>
					{/each}
				</div>
			</div>

			<!-- Recent Responsibilities -->
			<div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
				<h3 class="text-xl font-bold text-gray-900 mb-6">Recent Responsibilities</h3>
				<div class="space-y-4">
					{#each responsibilities.slice(0, 5) as responsibility}
						<div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
							<div class="flex items-center space-x-4">
								<div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
									<span class="text-white font-semibold text-sm">{responsibility.subCategory.charAt(0)}</span>
								</div>
								<div class="flex-1">
									<p class="font-medium text-gray-900">{responsibility.subCategory} - {responsibility.type}</p>
									<p class="text-sm text-gray-500">Assigned to {responsibility.assignedTo} • {responsibility.createdAt.toLocaleDateString()}</p>
								</div>
							</div>
							<div class="flex items-center space-x-3">
								{#if responsibility.value}
									<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-600">
										{responsibility.value}
									</span>
								{/if}
								<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {getStatusColor(responsibility.status)}">
									{responsibility.status}
								</span>
							</div>
						</div>
					{/each}
				</div>
			</div>
				{:else if activeTab === 'debts'}
					<!-- Debts Tab -->
					<div class="space-y-6">
						<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{#each debts as debt}
								<div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
									<div class="flex items-center justify-between mb-4">
										<div class="flex items-center space-x-3">
											<div class="text-2xl">{debt.icon}</div>
											<div>
												<h3 class="font-semibold text-gray-900">{debt.title}</h3>
												<p class="text-sm text-gray-600">{debt.description}</p>
											</div>
										</div>
										<span class="px-3 py-1 bg-gradient-to-r {debt.color} text-white text-xs font-medium rounded-full">
											{debt.category}
										</span>
									</div>

									<div class="mb-4">
										<div class="flex justify-between text-sm text-gray-600 mb-2">
											<span>Progress</span>
											<span>{debt.current} / {debt.target} {debt.unit}</span>
										</div>
										<div class="w-full bg-gray-200 rounded-full h-3">
											<div
												class="bg-gradient-to-r {debt.color} h-3 rounded-full transition-all duration-500"
												style="width: {Math.min((debt.current / debt.target) * 100, 100)}%"
											></div>
										</div>
										<div class="text-right text-sm text-gray-500 mt-1">
											{Math.round((debt.current / debt.target) * 100)}% Complete
										</div>
									</div>

									{#if debt.activities.length > 0}
										<div class="border-t pt-4">
											<h4 class="font-medium text-gray-900 mb-3">Recent Activities</h4>
											<div class="space-y-2 max-h-32 overflow-y-auto">
												{#each debt.activities.slice(-3) as activity}
													<div class="flex items-start space-x-2 text-sm">
														<div class="w-2 h-2 bg-gradient-to-r {debt.color} rounded-full mt-2 flex-shrink-0"></div>
														<div class="flex-1">
															<div class="font-medium text-gray-900">{activity.description}</div>
															<div class="text-gray-500 text-xs">
																{activity.date.toLocaleDateString()}
																{#if activity.location}
																	• {activity.location}
																{/if}
															</div>
															{#if activity.notes}
																<div class="text-gray-400 text-xs italic">{activity.notes}</div>
															{/if}
														</div>
													</div>
												{/each}
											</div>
										</div>
									{/if}
								</div>
							{/each}
						</div>
					</div>
				{:else if activeTab === 'crud'}
					<!-- CRUD Operations Tab -->
					<div class="space-y-6">
						<div class="flex justify-between items-center">
							<h2 class="text-2xl font-bold text-gray-900">CRUD Operations</h2>
							<button
								onclick={() => { showModal = true; editingResponsibility = null; resetForm(); }}
								class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
							>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
								</svg>
								<span>Add Responsibility</span>
							</button>
						</div>

						<div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
							<div class="overflow-x-auto">
								<table class="w-full">
									<thead>
										<tr class="border-b border-gray-200">
											<th class="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
											<th class="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
											<th class="text-left py-3 px-4 font-semibold text-gray-900">Sub-Category</th>
											<th class="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
											<th class="text-left py-3 px-4 font-semibold text-gray-900">Priority</th>
											<th class="text-left py-3 px-4 font-semibold text-gray-900">Assigned To</th>
											<th class="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
										</tr>
									</thead>
									<tbody>
										{#each responsibilities as responsibility}
											<tr class="border-b border-gray-100 hover:bg-gray-50">
												<td class="py-3 px-4">{responsibility.type}</td>
												<td class="py-3 px-4">{responsibility.category}</td>
												<td class="py-3 px-4">{responsibility.subCategory}</td>
												<td class="py-3 px-4">
													<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {getStatusColor(responsibility.status)}">
														{responsibility.status}
													</span>
												</td>
												<td class="py-3 px-4">
													<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {getPriorityColor(responsibility.priority)}">
														{responsibility.priority}
													</span>
												</td>
												<td class="py-3 px-4">{responsibility.assignedTo}</td>
												<td class="py-3 px-4">
													<div class="flex space-x-2">
														<button
															onclick={() => editResponsibility(responsibility)}
															class="text-blue-600 hover:text-blue-800 p-1"
															aria-label="Edit responsibility {responsibility.title}"
														>
															<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
															</svg>
														</button>
														<button
															onclick={() => deleteResponsibility(responsibility.id)}
															class="text-red-600 hover:text-red-800 p-1"
															aria-label="Delete responsibility {responsibility.title}"
														>
															<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
															</svg>
														</button>
													</div>
												</td>
											</tr>
										{/each}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				{:else if activeTab === 'discussion'}
					<!-- Discussion Tab -->
					<div class="space-y-6">
						<div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
							<h2 class="text-2xl font-bold text-gray-900 mb-6">Discussion Forum</h2>
							<div class="space-y-4">
								<div class="border border-gray-200 rounded-lg p-4">
									<div class="flex items-center space-x-3 mb-3">
										<div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
											<span class="text-white text-sm font-semibold">JD</span>
										</div>
										<div>
											<p class="font-semibold text-gray-900">John Doe</p>
											<p class="text-sm text-gray-500">2 hours ago</p>
										</div>
									</div>
									<p class="text-gray-700">What are the best practices for managing family financial responsibilities?</p>
									<div class="flex items-center space-x-4 mt-3 text-sm text-gray-500">
										<button class="flex items-center space-x-1 hover:text-blue-600">
											<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
											</svg>
											<span>Reply</span>
										</button>
										<span>3 likes</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				{:else if activeTab === 'alerts'}
					<!-- Alerts Tab -->
					<div class="space-y-6">
						<div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
							<h2 class="text-2xl font-bold text-gray-900 mb-6">Alerts & Notifications</h2>
							<div class="space-y-4">
								<div class="flex items-start space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg">
									<div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
										<svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
										</svg>
									</div>
									<div class="flex-1">
										<h3 class="font-semibold text-red-900">Critical Responsibility Due</h3>
										<p class="text-red-700 text-sm">Property document update is overdue by 2 days.</p>
										<p class="text-red-600 text-xs mt-1">2 hours ago</p>
									</div>
								</div>
								<div class="flex items-start space-x-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
									<div class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
										<svg class="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
									</svg>
									</div>
									<div class="flex-1">
										<h3 class="font-semibold text-yellow-900">Upcoming Deadline</h3>
										<p class="text-yellow-700 text-sm">Budget planning review due in 3 days.</p>
										<p class="text-yellow-600 text-xs mt-1">1 day ago</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>