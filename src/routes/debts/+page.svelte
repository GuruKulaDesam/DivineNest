<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { currentBackgroundTheme, loadSavedTheme } from '$lib/stores/backgroundThemes';

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

	// Load saved background theme
	onMount(() => {
		loadSavedTheme();
	});

	function getProgressPercentage(debt: DebtActivity): number {
		return Math.round((debt.current / debt.target) * 100);
	}

	function getProgressColor(debt: DebtActivity): string {
		const percentage = getProgressPercentage(debt);
		if (percentage >= 35) return 'text-green-600';
		if (percentage >= 20) return 'text-yellow-600';
		return 'text-red-600';
	}

	function getProgressBarColor(debt: DebtActivity): string {
		const percentage = getProgressPercentage(debt);
		if (percentage >= 35) return 'bg-green-500';
		if (percentage >= 20) return 'bg-yellow-500';
		return 'bg-red-500';
	}

	function toggleLanguage() {
		language = language === 'english' ? 'tamil' : 'english';
	}

	function navigateToDebtDetail(debtId: string) {
		window.location.href = `/debts/${debtId}`;
	}

	function getCategoryName(category: string): string {
		if (language === 'english') {
			switch (category) {
				case 'temples': return 'Temple Visits';
				case 'rituals': return 'Sacred Rituals';
				case 'fasting': return 'Fasting Practices';
				case 'pooja': return 'Special Poojas';
				case 'financial': return 'Financial Freedom';
				case 'property': return 'Property Goals';
				case 'family': return 'Family Care';
				case 'nature': return 'Nature & Gardens';
				case 'karmic': return 'Karmic Service';
				case 'heavenly': return 'Heavenly Practices';
				default: return category;
			}
		} else {
			switch (category) {
				case 'temples': return 'கோவில் பயணங்கள்';
				case 'rituals': return 'புனித சடங்குகள்';
				case 'fasting': return 'உபவாசம்';
				case 'pooja': return 'சிறப்பு பூஜைகள்';
				case 'financial': return 'நிதி விடுவிப்பு';
				case 'property': return 'சொத்து இலக்குகள்';
				case 'family': return 'குடும்ப பராமரிப்பு';
				case 'nature': return 'இயற்கை & தோட்டங்கள்';
				case 'karmic': return 'கர்ம சேவை';
				case 'heavenly': return 'சுவர்க்க நடைமுறைகள்';
				default: return category;
			}
		}
	}

	// Group debts by category
	function getDebtsByCategory() {
		const categories = ['temples', 'rituals', 'fasting', 'pooja', 'financial', 'property', 'family', 'nature', 'karmic', 'heavenly'];
		return categories.map(category => ({
			name: getCategoryName(category),
			debts: debts.filter(debt => debt.category === category)
		}));
	}
</script>

<svelte:head>
	<title>Spiritual Debts - Divine Nest</title>
</svelte:head>

<div class="min-h-screen relative overflow-hidden p-4 pb-24">
	<!-- Dynamic 3D Background Layers -->
	<div class="absolute inset-0 opacity-50">
		<!-- Primary gradient layer -->
		<div class="absolute inset-0 bg-gradient-to-br {$currentBackgroundTheme.primaryGradient}"></div>

		<!-- Secondary depth layer -->
		<div class="absolute inset-0 bg-gradient-to-tl {$currentBackgroundTheme.secondaryGradient}"></div>

		<!-- Floating geometric shapes -->
		{#each $currentBackgroundTheme.floatingShapes as shape}
			<div class="absolute {shape.position} {shape.size} bg-gradient-to-br {shape.colors} {shape.shape} {shape.animation}"></div>
		{/each}

		<!-- Mesh overlay for 3D effect -->
		<div class="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
		<div class="absolute inset-0 bg-gradient-to-tl from-transparent via-blue-100/3 to-transparent"></div>
	</div>

	<!-- Header -->
	<div class="relative z-10 glass-card p-6 rounded-xl mb-6">
		<div class="flex items-center justify-between mb-4">
			<div>
				<h1 class="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
					{language === 'english' ? 'Divine & Earthly Debts' : 'தெய்வீக & பூமிய கடன்கள்'}
				</h1>
				<p class="text-gray-600">
					{language === 'english' ? 'Track your sacred spiritual commitments and worldly responsibilities' : 'உங்கள் புனித ஆன்மீக உறுதிமொழிகளையும் பூமிய பொறுப்புகளையும் கண்காணிக்க'}
				</p>
			</div>
			<div class="flex space-x-2">
				<button
					onclick={toggleLanguage}
					class="px-4 py-2 bg-white/50 rounded-lg text-sm font-medium hover:bg-white/70 transition-colors"
				>
					{language === 'english' ? 'தமிழ்' : 'English'}
				</button>
			</div>
		</div>

		<!-- Overall Progress Summary -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
			<div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
				<div class="text-2xl font-bold text-blue-600">
					{Math.round(debts.reduce((sum, debt) => sum + (debt.current / debt.target), 0) / debts.length * 100)}%
				</div>
				<div class="text-sm text-blue-700 font-medium">
					{language === 'english' ? 'Overall Progress' : 'ஒட்டுமொத்த முன்னேற்றம்'}
				</div>
			</div>
			<div class="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
				<div class="text-2xl font-bold text-green-600">
					{debts.filter(debt => getProgressPercentage(debt) >= 35).length}
				</div>
				<div class="text-sm text-green-700 font-medium">
					{language === 'english' ? 'Completed Debts' : 'நிறைவடைந்த கடன்கள்'}
				</div>
			</div>
			<div class="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
				<div class="text-2xl font-bold text-orange-600">
					{debts.reduce((sum, debt) => sum + debt.activities.length, 0)}
				</div>
				<div class="text-sm text-orange-700 font-medium">
					{language === 'english' ? 'Total Activities' : 'மொத்த செயல்பாடுகள்'}
				</div>
			</div>
		</div>
	</div>

	<!-- Debt Categories -->
	{#each getDebtsByCategory() as category}
		<div class="relative z-10 mb-8">
			<h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
				<span class="mr-2">{category.name}</span>
				<div class="h-px bg-gradient-to-r from-gray-300 to-transparent flex-1"></div>
			</h2>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each category.debts as debt}
					<div
						class="glass-card p-6 rounded-xl cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-2xl border-2 {getProgressPercentage(debt) >= 35 ? 'border-green-300 bg-green-50/50' : 'border-gray-200'}"
						onclick={() => navigateToDebtDetail(debt.id)}
						onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigateToDebtDetail(debt.id); } }}
						role="button"
						tabindex="0"
						aria-label={`${debt.title} - ${getProgressPercentage(debt)}% complete. Click to view details.`}
					>
						<!-- Header with Icon and Title -->
						<div class="flex items-center justify-between mb-4">
							<div class="flex items-center space-x-3">
								<div class="text-3xl">{debt.icon}</div>
								<div>
									<h3 class="font-bold text-gray-800 text-lg">{debt.title}</h3>
									<p class="text-sm text-gray-600">{debt.description}</p>
								</div>
							</div>
							<div class="text-right">
								<div class="text-2xl font-bold {getProgressColor(debt)}">
									{debt.current}/{debt.target}
								</div>
								<div class="text-xs text-gray-500">{debt.unit}</div>
							</div>
						</div>

						<!-- Progress Bar -->
						<div class="mb-4">
							<div class="flex justify-between items-center mb-2">
								<span class="text-sm font-medium text-gray-700">
									{language === 'english' ? 'Progress' : 'முன்னேற்றம்'}
								</span>
								<span class="text-sm font-bold {getProgressColor(debt)}">
									{getProgressPercentage(debt)}%
								</span>
							</div>
							<div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
								<div
									class="h-full {getProgressBarColor(debt)} transition-all duration-1000 ease-out rounded-full"
									style="width: {getProgressPercentage(debt)}%"
								></div>
							</div>
						</div>

						<!-- Status Indicator -->
						<div class="flex items-center justify-between">
							<div class="flex items-center space-x-2">
								<div class="w-3 h-3 rounded-full {getProgressPercentage(debt) >= 35 ? 'bg-green-500' : 'bg-red-500'}"></div>
								<span class="text-sm font-medium {getProgressPercentage(debt) >= 35 ? 'text-green-700' : 'text-red-700'}">
									{getProgressPercentage(debt) >= 35
										? (language === 'english' ? 'On Track' : 'சரியான பாதையில்')
										: (language === 'english' ? 'Needs Attention' : 'கவனம் தேவை')}
								</span>
							</div>
							<div class="text-xs text-gray-500">
								{debt.activities.length} {language === 'english' ? 'activities' : 'செயல்பாடுகள்'}
							</div>
						</div>

						<!-- Recent Activity -->
						{#if debt.activities.length > 0}
							<div class="mt-4 pt-4 border-t border-gray-200">
								<div class="text-xs text-gray-500 mb-2">
									{language === 'english' ? 'Latest Activity' : 'சமீபத்திய செயல்பாடு'}
								</div>
								<div class="text-sm text-gray-700">
									{debt.activities[debt.activities.length - 1].description}
								</div>
								<div class="text-xs text-gray-500 mt-1">
									{debt.activities[debt.activities.length - 1].date.toLocaleDateString()}
								</div>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	{/each}

	<!-- Instructions -->
	<div class="relative z-10 glass-card p-4 rounded-xl">
		<div class="text-center">
			<p class="text-sm text-gray-600">
				{language === 'english'
					? 'Tap on any debt card to view detailed activities and track progress'
					: 'விவரங்களையும் முன்னேற்றத்தையும் காண எந்த கடன் அட்டையிலும் தட்டு'}
			</p>
			<p class="text-xs text-gray-500 mt-2">
				{language === 'english'
					? 'Green status indicates 35%+ completion - a sacred milestone achieved!'
					: 'பச்சை நிலை 35%+ நிறைவை குறிக்கிறது - புனித மைல்கல் அடைந்தது!'}
			</p>
		</div>
	</div>
</div>

<style>
	.glass-card {
		background: rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.18);
		transition: all 0.3s ease-in-out;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
	}

	.glass-card:hover {
		background: rgba(255, 255, 255, 0.35);
		transform: translateY(-2px);
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
	}
</style>