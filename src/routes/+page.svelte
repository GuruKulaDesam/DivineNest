<script lang="ts">
	import { onMount } from 'svelte';

	let showAllTables = $state(false);

	// Listen for the showAllTables event from the layout
	onMount(() => {
		window.addEventListener('showAllTables', () => {
			showAllTables = true;
		});
	});

	// Real sample data for KPIs
	const kpiData = {
		totalFamilyMembers: 6,
		activeDuties: 12,
		pendingIssues: 3,
		monthlyExpenses: 45000,
		completedTasks: 89,
		healthScore: 85,
		familyHappiness: 92,
		productivityScore: 78
	};

	// Recent activities data
	const recentActivities = [
		{ id: 1, type: 'Duty', title: 'Morning Pooja', status: 'completed', time: '6:00 AM', member: 'Father' },
		{ id: 2, type: 'Issue', title: 'Kitchen light repair', status: 'in-progress', time: '2 hours ago', member: 'Mother' },
		{ id: 3, type: 'Finance', title: 'Grocery shopping', status: 'completed', time: '4 hours ago', member: 'Son' },
		{ id: 4, type: 'Food', title: 'Dinner preparation', status: 'scheduled', time: '7:00 PM', member: 'Daughter' },
		{ id: 5, type: 'Activity', title: 'Family yoga session', status: 'completed', time: 'Yesterday', member: 'All' }
	];

	// Family member stats
	const familyStats = [
		{ name: 'Father', duties: 8, issues: 1, health: 88, happiness: 90 },
		{ name: 'Mother', duties: 10, issues: 2, health: 85, happiness: 95 },
		{ name: 'Son', duties: 6, issues: 0, health: 92, happiness: 88 },
		{ name: 'Daughter', duties: 7, issues: 1, health: 90, happiness: 93 },
		{ name: 'Grandma', duties: 4, issues: 0, health: 82, happiness: 96 },
		{ name: 'Grandpa', duties: 3, issues: 0, health: 80, happiness: 89 }
	];

	// Monthly expense breakdown
	const expenseBreakdown = [
		{ category: 'Food & Groceries', amount: 15000, percentage: 33, color: 'bg-blue-500' },
		{ category: 'Utilities', amount: 8000, percentage: 18, color: 'bg-green-500' },
		{ category: 'Education', amount: 12000, percentage: 27, color: 'bg-purple-500' },
		{ category: 'Healthcare', amount: 6000, percentage: 13, color: 'bg-orange-500' },
		{ category: 'Miscellaneous', amount: 4000, percentage: 9, color: 'bg-pink-500' }
	];

	const quickActions = [
		{
			name: 'duties',
			label: 'Daily Duties',
			icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
			color: 'from-green-400 to-green-600',
			count: kpiData.activeDuties
		},
		{
			name: 'issues',
			label: 'Issues',
			icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>',
			color: 'from-red-400 to-red-600',
			count: kpiData.pendingIssues
		},
		{
			name: 'responsibility',
			label: 'Responsibility',
			icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>',
			color: 'from-blue-400 to-blue-600',
			count: 15
		},
		{
			name: 'reminders',
			label: 'Reminders',
			icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
			color: 'from-purple-400 to-purple-600',
			count: 8
		}
	];

	const allTables = [
		{ name: 'issues', label: 'Issues', icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>' },
		{ name: 'responsibility', label: 'Responsibility', icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>' },
		{ name: 'foods', label: 'Foods', icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>' },
		{ name: 'inventory', label: 'Inventory', icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>' },
		{ name: 'duties', label: 'Duties', icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>' },
		{ name: 'activities', label: 'Activities', icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>' },
		{ name: 'finance', label: 'Finance', icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path></svg>' },
		{ name: 'rewards', label: 'Rewards', icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>' },
		{ name: 'assets', label: 'Assets', icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>' },
		{ name: 'family', label: 'Family', icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>' },
		{ name: 'ai_prompts', label: 'AI Prompts', icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>' },
		{ name: 'directory', label: 'Directory', icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"></path></svg>' },
		{ name: 'reminders', label: 'Reminders', icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>' },
		{ name: 'family_wisdom', label: 'Family Wisdom', icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>' }
	];

	function getStatusColor(status: string) {
		switch (status) {
			case 'completed': return 'text-green-600 bg-green-100';
			case 'in-progress': return 'text-blue-600 bg-blue-100';
			case 'scheduled': return 'text-orange-600 bg-orange-100';
			default: return 'text-gray-600 bg-gray-100';
		}
	}
</script>

<svelte:head>
	<title>Divine Nest - Home</title>
</svelte:head>

<div class="min-h-screen p-4 pb-24">
	{#if showAllTables}
		<div class="max-w-7xl mx-auto">
			<div class="flex justify-between items-center mb-6">
				<h2 class="text-2xl font-bold text-gray-900">All Tables</h2>
				<button
					onclick={() => showAllTables = false}
					class="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
					aria-label="Close all tables view"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
					</svg>
				</button>
			</div>

			<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{#each allTables as table}
					<a
						href={`/${table.name}`}
						class="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-200 group"
					>
						<div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
							<div class="text-white">
								{@html table.icon}
							</div>
						</div>
						<h3 class="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{table.label}</h3>
						<p class="text-sm text-gray-500 mt-1">Manage {table.label.toLowerCase()}</p>
					</a>
				{/each}
			</div>
		</div>
	{:else}
		<div class="max-w-7xl mx-auto space-y-8">
			<!-- Welcome Section -->
			<div class="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
				<div class="absolute inset-0 bg-black/10"></div>
				<div class="relative z-10">
					<h1 class="text-4xl font-bold mb-2">Welcome to Divine Nest</h1>
					<p class="text-xl text-blue-100 mb-6">Your comprehensive family management companion</p>
					<div class="flex items-center space-x-6 text-sm">
						<div class="flex items-center space-x-2">
							<div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
							<span>{kpiData.totalFamilyMembers} Family Members</span>
						</div>
						<div class="flex items-center space-x-2">
							<div class="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
							<span>{kpiData.activeDuties} Active Duties</span>
						</div>
						<div class="flex items-center space-x-2">
							<div class="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
							<span>{kpiData.pendingIssues} Pending Issues</span>
						</div>
					</div>
				</div>
				<div class="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
				<div class="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full"></div>
			</div>

			<!-- KPI Dashboard -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<a href="/family" class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-sm font-medium text-gray-600 mb-1">Family Health</p>
							<p class="text-3xl font-bold text-green-600 group-hover:text-green-700 transition-colors">{kpiData.healthScore}%</p>
							<p class="text-xs text-gray-500 mt-1">↑ 5% from last month</p>
						</div>
						<div class="w-12 h-12 bg-green-100 group-hover:bg-green-200 rounded-full flex items-center justify-center transition-colors">
							<svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
							</svg>
						</div>
					</div>
				</a>

				<a href="/family" class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-sm font-medium text-gray-600 mb-1">Family Happiness</p>
							<p class="text-3xl font-bold text-purple-600 group-hover:text-purple-700 transition-colors">{kpiData.familyHappiness}%</p>
							<p class="text-xs text-gray-500 mt-1">↑ 3% from last month</p>
						</div>
						<div class="w-12 h-12 bg-purple-100 group-hover:bg-purple-200 rounded-full flex items-center justify-center transition-colors">
							<svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l.707.707A1 1 0 0012.414 11H13m-3 3.5A1.5 1.5 0 0110.5 12h3a1.5 1.5 0 011.5 1.5v0A1.5 1.5 0 0113.5 15h-3A1.5 1.5 0 019 13.5v0z"></path>
							</svg>
						</div>
					</div>
				</a>

				<a href="/responsibility" class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-sm font-medium text-gray-600 mb-1">Productivity</p>
							<p class="text-3xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors">{kpiData.productivityScore}%</p>
							<p class="text-xs text-gray-500 mt-1">↑ 8% from last month</p>
						</div>
						<div class="w-12 h-12 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors">
							<svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
							</svg>
						</div>
					</div>
				</a>

				<a href="/finance" class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-sm font-medium text-gray-600 mb-1">Monthly Expenses</p>
							<p class="text-3xl font-bold text-orange-600 group-hover:text-orange-700 transition-colors">₹{kpiData.monthlyExpenses.toLocaleString()}</p>
							<p class="text-xs text-gray-500 mt-1">↓ 2% from last month</p>
						</div>
						<div class="w-12 h-12 bg-orange-100 group-hover:bg-orange-200 rounded-full flex items-center justify-center transition-colors">
							<svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
							</svg>
						</div>
					</div>
				</a>
			</div>

			<!-- Quick Actions -->
			<div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
				<h2 class="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
				<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
					{#each quickActions as action}
						<a
							href={`/${action.name}`}
							class="group relative bg-gradient-to-br {action.color} rounded-xl p-6 text-white hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
						>
							<div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
							<div class="relative z-10">
								<div class="mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
									{@html action.icon}
								</div>
								<h3 class="font-semibold text-lg mb-1">{action.label}</h3>
								<p class="text-sm opacity-90">{action.count} items</p>
							</div>
							<div class="absolute -top-2 -right-2 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
								<span class="text-xs font-bold">{action.count}</span>
							</div>
						</a>
					{/each}
				</div>
			</div>

			<!-- Charts and Analytics Row -->
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<!-- Expense Breakdown Chart -->
				<div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
					<h3 class="text-xl font-bold text-gray-900 mb-6">Monthly Expenses Breakdown</h3>
					<div class="space-y-4">
						{#each expenseBreakdown as expense}
							<div class="flex items-center justify-between">
								<div class="flex items-center space-x-3">
									<div class="w-4 h-4 {expense.color} rounded"></div>
									<span class="text-sm font-medium text-gray-700">{expense.category}</span>
								</div>
								<div class="flex items-center space-x-4">
									<div class="w-24 bg-gray-200 rounded-full h-2">
										<div class="h-2 {expense.color} rounded-full" style="width: {expense.percentage}%"></div>
									</div>
									<span class="text-sm font-semibold text-gray-900">₹{expense.amount.toLocaleString()}</span>
								</div>
							</div>
						{/each}
					</div>
					<div class="mt-6 pt-4 border-t border-gray-200">
						<div class="flex justify-between items-center text-sm">
							<span class="text-gray-600">Total Budget</span>
							<span class="font-semibold text-gray-900">₹{kpiData.monthlyExpenses.toLocaleString()}</span>
						</div>
					</div>
				</div>

				<!-- Family Member Performance -->
				<div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
					<h3 class="text-xl font-bold text-gray-900 mb-6">Family Member Performance</h3>
					<div class="space-y-4">
						{#each familyStats as member}
							<div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
								<div class="flex items-center space-x-3">
									<div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
										<span class="text-white font-semibold text-sm">{member.name.charAt(0)}</span>
									</div>
									<div>
										<p class="font-medium text-gray-900">{member.name}</p>
										<p class="text-xs text-gray-500">{member.duties} duties completed</p>
									</div>
								</div>
								<div class="flex items-center space-x-4">
									<div class="text-right">
										<p class="text-sm font-medium text-green-600">{member.health}% health</p>
										<p class="text-xs text-purple-600">{member.happiness}% happiness</p>
									</div>
									<div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
										<span class="text-xs font-bold text-green-600">{member.duties}</span>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<!-- Recent Activities -->
			<div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
				<h3 class="text-xl font-bold text-gray-900 mb-6">Recent Activities</h3>
				<div class="space-y-4">
					{#each recentActivities as activity}
						<div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
							<div class="flex items-center space-x-4">
								<div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
									{#if activity.type === 'Duty'}
										<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
										</svg>
									{:else if activity.type === 'Issue'}
										<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
										</svg>
									{:else}
										<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
										</svg>
									{/if}
								</div>
								<div class="flex-1">
									<p class="font-medium text-gray-900">{activity.title}</p>
									<p class="text-sm text-gray-500">by {activity.member} • {activity.time}</p>
								</div>
							</div>
							<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {getStatusColor(activity.status)}">
								{activity.status}
							</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.glass-card {
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.2);
	}
	.glass-card:hover {
		background: rgba(255, 255, 255, 0.95);
		transform: translateY(-2px);
	}
</style>
