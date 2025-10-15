<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { currentBackgroundTheme, loadSavedTheme } from '$lib/stores/backgroundThemes';

	// Get debt ID from URL params
	let { debtId } = $page.params;

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

	// Mock debt data - in real app this would come from a store/API
	let debt = $state<DebtActivity | null>(null);
	let language = $state<'english' | 'tamil'>('english');
	let showAddActivityModal = $state(false);
	let newActivity = $state({
		date: new Date().toISOString().split('T')[0],
		description: '',
		location: '',
		notes: ''
	});

	// Load debt data based on ID
	function loadDebtData() {
		// Mock data - replace with actual data fetching
		const allDebts: DebtActivity[] = [
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
				target: 12000000,
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
		];

		debt = allDebts.find(d => d.id === debtId) || null;
	}

	// Load saved background theme
	onMount(() => {
		loadSavedTheme();
		loadDebtData();
	});

	function getProgressPercentage(): number {
		if (!debt) return 0;
		return Math.round((debt.current / debt.target) * 100);
	}

	function getProgressColor(): string {
		const percentage = getProgressPercentage();
		if (percentage >= 35) return 'text-green-600';
		if (percentage >= 20) return 'text-yellow-600';
		return 'text-red-600';
	}

	function getProgressBarColor(): string {
		const percentage = getProgressPercentage();
		if (percentage >= 35) return 'bg-green-500';
		if (percentage >= 20) return 'bg-yellow-500';
		return 'bg-red-500';
	}

	function toggleLanguage() {
		language = language === 'english' ? 'tamil' : 'english';
	}

	function addNewActivity() {
		if (!debt || !newActivity.description.trim()) return;

		const activity = {
			id: Date.now().toString(),
			date: new Date(newActivity.date),
			description: newActivity.description,
			location: newActivity.location || undefined,
			notes: newActivity.notes || undefined
		};

		debt.activities = [...debt.activities, activity];
		debt.current += 1; // Increment current count

		showAddActivityModal = false;
		resetNewActivity();
	}

	function resetNewActivity() {
		newActivity = {
			date: new Date().toISOString().split('T')[0],
			description: '',
			location: '',
			notes: ''
		};
	}

	function deleteActivity(activityId: string) {
		if (!debt) return;

		debt.activities = debt.activities.filter(a => a.id !== activityId);
		debt.current = Math.max(0, debt.current - 1);
	}

	function goBack() {
		window.history.back();
	}
</script>

<svelte:head>
	<title>{debt?.title || 'Debt Details'} - Divine Nest</title>
</svelte:head>

{#if debt}
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
				<button
					onclick={goBack}
					class="flex items-center space-x-2 p-2 bg-white/50 rounded-lg hover:bg-white/70 transition-colors"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
					</svg>
					<span class="text-sm font-medium">
						{language === 'english' ? 'Back' : 'பின்செல்'}
					</span>
				</button>
				<button
					onclick={toggleLanguage}
					class="px-4 py-2 bg-white/50 rounded-lg text-sm font-medium hover:bg-white/70 transition-colors"
				>
					{language === 'english' ? 'தமிழ்' : 'English'}
				</button>
			</div>

			<!-- Debt Header -->
			<div class="text-center mb-6">
				<div class="text-5xl mb-4">{debt.icon}</div>
				<h1 class="text-3xl font-bold bg-gradient-to-r {debt.color} bg-clip-text text-transparent mb-2">
					{debt.title}
				</h1>
				<p class="text-gray-600 text-lg">{debt.description}</p>
			</div>

			<!-- Progress Overview -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
				<div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
					<div class="text-3xl font-bold text-blue-600 mb-1">
						{debt.current}/{debt.target}
					</div>
					<div class="text-sm text-blue-700 font-medium">
						{language === 'english' ? 'Completed' : 'நிறைவடைந்தது'}
					</div>
					<div class="text-xs text-blue-600 mt-1">{debt.unit}</div>
				</div>
				<div class="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
					<div class="text-3xl font-bold {getProgressColor()} mb-1">
						{getProgressPercentage()}%
					</div>
					<div class="text-sm text-green-700 font-medium">
						{language === 'english' ? 'Progress' : 'முன்னேற்றம்'}
					</div>
					<div class="text-xs text-green-600 mt-1">
						{language === 'english' ? 'Towards Goal' : 'இலக்கை நோக்கி'}
					</div>
				</div>
				<div class="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200">
					<div class="text-3xl font-bold text-orange-600 mb-1">
						{debt.activities.length}
					</div>
					<div class="text-sm text-orange-700 font-medium">
						{language === 'english' ? 'Activities' : 'செயல்பாடுகள்'}
					</div>
					<div class="text-xs text-orange-600 mt-1">
						{language === 'english' ? 'Logged' : 'பதிவு செய்யப்பட்டது'}
					</div>
				</div>
			</div>

			<!-- Progress Bar -->
			<div class="mb-4">
				<div class="flex justify-between items-center mb-2">
					<span class="text-sm font-medium text-gray-700">
						{language === 'english' ? 'Overall Progress' : 'ஒட்டுமொத்த முன்னேற்றம்'}
					</span>
					<span class="text-sm font-bold {getProgressColor()}">
						{debt.current} / {debt.target} {debt.unit}
					</span>
				</div>
				<div class="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
					<div
						class="h-full {getProgressBarColor()} transition-all duration-1000 ease-out rounded-full"
						style="width: {getProgressPercentage()}%"
					></div>
				</div>
				<div class="text-center mt-2">
					<span class="text-sm {getProgressPercentage() >= 35 ? 'text-green-600 font-bold' : 'text-gray-600'}">
						{getProgressPercentage() >= 35
							? (language === 'english' ? '🎉 Sacred milestone achieved!' : '🎉 புனித மைல்கல் அடைந்தது!')
							: (language === 'english' ? `${35 - getProgressPercentage()}% more to reach sacred milestone` : `புனித மைல்கல்லை அடைய இன்னும் ${35 - getProgressPercentage()}% தேவை`)}
					</span>
				</div>
			</div>

			<!-- Add Activity Button -->
			<div class="text-center">
				<button
					onclick={() => showAddActivityModal = true}
					class="px-6 py-3 bg-gradient-to-r {debt.color} text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
				>
					{language === 'english' ? '+ Add New Activity' : '+ புதிய செயல்பாட்டைச் சேர்க்க'}
				</button>
			</div>
		</div>

		<!-- Activities Table -->
		<div class="relative z-10 glass-card p-6 rounded-xl">
			<h2 class="text-xl font-bold mb-4 text-gray-800">
				{language === 'english' ? 'Activity Log' : 'செயல்பாட்டு பதிவு'}
			</h2>

			{#if debt.activities.length === 0}
				<div class="text-center py-16">
					<div class="text-6xl mb-4">📝</div>
					<div class="text-2xl font-bold text-gray-600 mb-2">
						{language === 'english' ? 'No Activities Yet' : 'இன்னும் செயல்பாடுகள் இல்லை'}
					</div>
					<div class="text-lg text-gray-500">
						{language === 'english' ? 'Start your spiritual journey by adding your first activity!' : 'உங்கள் முதல் செயல்பாட்டைச் சேர்ப்பதன் மூலம் ஆன்மீக பயணத்தைத் தொடங்குங்கள்!'}
					</div>
				</div>
			{:else}
				<div class="overflow-x-auto">
					<table class="w-full">
						<thead>
							<tr class="border-b border-gray-200">
								<th class="text-left py-3 px-4 font-semibold text-gray-700">
									{language === 'english' ? 'Date' : 'தேதி'}
								</th>
								<th class="text-left py-3 px-4 font-semibold text-gray-700">
									{language === 'english' ? 'Activity' : 'செயல்பாடு'}
								</th>
								<th class="text-left py-3 px-4 font-semibold text-gray-700">
									{language === 'english' ? 'Location' : 'இடம்'}
								</th>
								<th class="text-left py-3 px-4 font-semibold text-gray-700">
									{language === 'english' ? 'Notes' : 'குறிப்புகள்'}
								</th>
								<th class="text-center py-3 px-4 font-semibold text-gray-700">
									{language === 'english' ? 'Actions' : 'செயல்கள்'}
								</th>
							</tr>
						</thead>
						<tbody>
							{#each debt.activities.slice().reverse() as activity}
								<tr class="border-b border-gray-100 hover:bg-white/50 transition-colors">
									<td class="py-3 px-4 text-sm text-gray-600">
										{activity.date.toLocaleDateString(language === 'english' ? 'en-IN' : 'ta-IN', {
											year: 'numeric',
											month: 'short',
											day: 'numeric'
										})}
									</td>
									<td class="py-3 px-4">
										<div class="font-medium text-gray-800">{activity.description}</div>
									</td>
									<td class="py-3 px-4 text-sm text-gray-600">
										{activity.location || '-'}
									</td>
									<td class="py-3 px-4 text-sm text-gray-600">
										{activity.notes || '-'}
									</td>
									<td class="py-3 px-4 text-center">
										<button
											onclick={() => deleteActivity(activity.id)}
											class="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
											title={language === 'english' ? 'Delete Activity' : 'செயல்பாட்டை நீக்கு'}
										>
											<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
											</svg>
										</button>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
		</div>

		<!-- Add Activity Modal -->
		{#if showAddActivityModal}
			<div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
				<div class="glass-card p-6 rounded-xl w-full max-w-md">
					<h3 class="text-lg font-semibold mb-4">
						{language === 'english' ? 'Add New Activity' : 'புதிய செயல்பாட்டைச் சேர்க்க'}
					</h3>

					<div class="space-y-4">
						<div>
							<label for="activity-date" class="block text-sm font-medium mb-1">
								{language === 'english' ? 'Date' : 'தேதி'}
							</label>
							<input
								id="activity-date"
								type="date"
								bind:value={newActivity.date}
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						<div>
							<label for="activity-description" class="block text-sm font-medium mb-1">
								{language === 'english' ? 'Activity Description' : 'செயல்பாட்டு விவரம்'}
							</label>
							<input
								id="activity-description"
								type="text"
								bind:value={newActivity.description}
								placeholder={language === 'english' ? 'Describe the activity' : 'செயல்பாட்டை விவரிக்க'}
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						<div>
							<label for="activity-location" class="block text-sm font-medium mb-1">
								{language === 'english' ? 'Location (Optional)' : 'இடம் (விருப்பமானது)'}
							</label>
							<input
								id="activity-location"
								type="text"
								bind:value={newActivity.location}
								placeholder={language === 'english' ? 'Temple or location name' : 'கோவில் அல்லது இடத்தின் பெயர்'}
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						<div>
							<label for="activity-notes" class="block text-sm font-medium mb-1">
								{language === 'english' ? 'Notes (Optional)' : 'குறிப்புகள் (விருப்பமானது)'}
							</label>
							<textarea
								id="activity-notes"
								bind:value={newActivity.notes}
								placeholder={language === 'english' ? 'Additional notes or observations' : 'கூடுதல் குறிப்புகள் அல்லது கவனிப்புகள்'}
								rows="3"
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							></textarea>
						</div>
					</div>

					<div class="flex space-x-3 mt-6">
						<button
							onclick={() => { showAddActivityModal = false; resetNewActivity(); }}
							class="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
						>
							{language === 'english' ? 'Cancel' : 'ரத்து செய்'}
						</button>
						<button
							onclick={addNewActivity}
							disabled={!newActivity.description.trim()}
							class="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
						>
							{language === 'english' ? 'Add Activity' : 'செயல்பாட்டைச் சேர்க்க'}
						</button>
					</div>
				</div>
			</div>
		{/if}
	</div>
{:else}
	<div class="min-h-screen flex items-center justify-center">
		<div class="text-center">
			<div class="text-6xl mb-4">🔍</div>
			<h1 class="text-2xl font-bold text-gray-800 mb-2">
				{language === 'english' ? 'Debt Not Found' : 'கடன் கிடைக்கவில்லை'}
			</h1>
			<p class="text-gray-600 mb-4">
				{language === 'english' ? 'The requested spiritual debt could not be found.' : 'கோரப்பட்ட ஆன்மீக கடன் கிடைக்கவில்லை.'}
			</p>
			<button
				onclick={goBack}
				class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
			>
				{language === 'english' ? 'Go Back' : 'பின்செல்'}
			</button>
		</div>
	</div>
{/if}

<style>
	.glass-card {
		background: rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.18);
		transition: all 0.3s ease-in-out;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
	}
</style>