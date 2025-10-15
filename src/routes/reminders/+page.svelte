<script lang="ts">
	import { onMount } from 'svelte';
	import { currentBackgroundTheme, loadSavedTheme } from '$lib/stores/backgroundThemes';
	import BackgroundThemeSelector from '$lib/components/BackgroundThemeSelector.svelte';

	let activeTab = $state('dashboard');
	let selectedCategory = $state<string | null>(null);
	let reminders = $state<Array<{
		id: string;
		type: string;
		category: string;
		subCategory: string;
		frequency: string;
		status: string;
		triggerTime: string;
		message: string;
		priority: 'Low' | 'Medium' | 'High' | 'Critical';
		description: string;
		createdAt: Date;
		nextTrigger?: Date;
	}>>([]);

	// Load saved background theme
	onMount(() => {
		loadSavedTheme();
		reminders = [
			{
				id: '1',
				type: 'SMS',
				category: 'Daily',
				subCategory: 'Morning Prayers',
				frequency: 'Daily',
				status: 'Active',
				triggerTime: '06:00',
				message: 'Sandhyavandanam time - Start your day with prayers',
				priority: 'High',
				description: 'Morning prayer reminder for all family members',
				createdAt: new Date('2025-10-15'),
				nextTrigger: new Date('2025-10-16T06:00:00')
			},
			{
				id: '2',
				type: 'Alarm',
				category: 'Daily',
				subCategory: 'Homework',
				frequency: 'Daily',
				status: 'Active',
				triggerTime: '17:00',
				message: 'Homework time - Complete your studies',
				priority: 'Medium',
				description: 'Evening homework reminder for children',
				createdAt: new Date('2025-10-14'),
				nextTrigger: new Date('2025-10-15T17:00:00')
			},
			{
				id: '3',
				type: 'Email',
				category: 'Weekly',
				subCategory: 'Grocery Shopping',
				frequency: 'Weekly',
				status: 'Active',
				triggerTime: 'Saturday 10:00',
				message: 'Weekly grocery shopping reminder',
				priority: 'Medium',
				description: 'Weekly grocery list preparation and shopping',
				createdAt: new Date('2025-10-13'),
				nextTrigger: new Date('2025-10-19T10:00:00')
			},
			{
				id: '4',
				type: 'Notification',
				category: 'Monthly',
				subCategory: 'Bill Payments',
				frequency: 'Monthly',
				status: 'Active',
				triggerTime: '1st of month',
				message: 'Monthly bill payment reminder',
				priority: 'High',
				description: 'Electricity, water, and other utility bill payments',
				createdAt: new Date('2025-10-12'),
				nextTrigger: new Date('2025-11-01T09:00:00')
			},
			{
				id: '5',
				type: 'SMS',
				category: 'Seasonal',
				subCategory: 'Festival Preparation',
				frequency: 'Seasonal',
				status: 'Active',
				triggerTime: 'Diwali reminder',
				message: 'Diwali preparations - 2 weeks remaining',
				priority: 'High',
				description: 'Festival preparation and shopping reminders',
				createdAt: new Date('2025-10-11'),
				nextTrigger: new Date('2025-10-25T08:00:00')
			}
		];

		// Listen for calendar reminders
		const handleCalendarReminder = (event: CustomEvent) => {
			const newReminder = event.detail;
			reminders = [...reminders, newReminder];
		};

		window.addEventListener('addCalendarReminder', handleCalendarReminder as EventListener);

		return () => {
			window.removeEventListener('addCalendarReminder', handleCalendarReminder as EventListener);
		};
	});

	// KPI calculations
	const totalReminders = $derived(reminders.length);
	const activeReminders = $derived(reminders.filter(r => r.status === 'Active').length);
	const pendingReminders = $derived(reminders.filter(r => r.status === 'Pending').length);
	const inactiveReminders = $derived(reminders.filter(r => r.status === 'Inactive').length);
	const activeRate = $derived(totalReminders > 0 ? Math.round((activeReminders / totalReminders) * 100) : 0);

	// Group reminders by category for child tables
	const remindersByCategory = $derived(reminders.reduce((acc, reminder) => {
		if (!acc[reminder.category]) acc[reminder.category] = [];
		acc[reminder.category].push(reminder);
		return acc;
	}, {} as Record<string, typeof reminders>));

	const categories = [
		{ id: 'daily', name: 'Daily', icon: '📅', color: 'from-blue-500 to-blue-700' },
		{ id: 'weekly', name: 'Weekly', icon: '📊', color: 'from-green-500 to-green-700' },
		{ id: 'monthly', name: 'Monthly', icon: '📆', color: 'from-purple-500 to-purple-700' },
		{ id: 'seasonal', name: 'Seasonal', icon: '🌸', color: 'from-pink-500 to-pink-700' },
		{ id: 'special-occasions', name: 'Special Occasions', icon: '🎉', color: 'from-orange-500 to-orange-700' },
		{ id: 'health', name: 'Health', icon: '🏥', color: 'from-red-500 to-red-700' }
	];

	const tabs = [
		{ id: 'dashboard', label: 'Dashboard', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>' },
		{ id: 'crud', label: 'CRUD Operations', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>' },
		{ id: 'discussion', label: 'Discussion', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>' },
		{ id: 'alerts', label: 'Alerts', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4.868 12.683A17.925 17.925 0 012 21h13.78a3 3 0 002.553-1.453c1.475-2.45 1.553-5.25.177-7.877-3.065-5.84 1.64-10.375 1.64-10.375s-5.83 3.061-8.895 8.901c-1.376 2.627-1.298 5.427.177 7.877A3 3 0 0113.78 21H2a3 3 0 01-2.553-1.453c-1.475-2.45-1.553-5.25-.177-7.877 3.065-5.84-1.64-10.375-1.64-10.375s5.83 3.061 8.895 8.901z"></path></svg>' }
	];

	function getStatusColor(status: string) {
		switch (status) {
			case 'Active': return 'text-green-600 bg-green-100';
			case 'Pending': return 'text-orange-600 bg-orange-100';
			case 'Inactive': return 'text-gray-600 bg-gray-100';
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

	function getTypeColor(type: string) {
		switch (type) {
			case 'SMS': return 'text-blue-600 bg-blue-100';
			case 'Email': return 'text-green-600 bg-green-100';
			case 'Notification': return 'text-purple-600 bg-purple-100';
			case 'Alarm': return 'text-orange-600 bg-orange-100';
			default: return 'text-gray-600 bg-gray-100';
		}
	}
</script>

<svelte:head>
	<title>Reminders - Divine Nest</title>
</svelte:head>

<div class="min-h-screen relative overflow-hidden p-4 pb-24">
	<!-- 3D Background Layers for Reminders Page -->
	<div class="absolute inset-0 opacity-50">
		<!-- Primary notification gradient layer -->
		<div class="absolute inset-0 bg-gradient-to-br from-yellow-400/30 via-orange-500/20 to-red-500/30"></div>
		
		<!-- Secondary depth layer -->
		<div class="absolute inset-0 bg-gradient-to-tl from-amber-600/20 via-orange-400/15 to-pink-500/25"></div>
		
		<!-- Floating notification-themed shapes -->
		<div class="absolute top-24 left-20 w-42 h-42 bg-gradient-to-br from-yellow-300/35 to-orange-400/25 rounded-full blur-xl animate-float-slow"></div>
		<div class="absolute top-52 right-28 w-34 h-34 bg-gradient-to-br from-red-300/30 to-pink-400/20 rounded-lg rotate-45 animate-float-medium"></div>
		<div class="absolute bottom-52 left-24 w-50 h-50 bg-gradient-to-br from-orange-300/25 to-red-400/15 rounded-full blur-lg animate-float-fast"></div>
		<div class="absolute bottom-40 right-48 w-38 h-38 bg-gradient-to-br from-pink-300/35 to-orange-400/25 rounded-xl rotate-12 animate-float-slow"></div>
		<div class="absolute top-1/2 left-1/3 w-30 h-30 bg-gradient-to-br from-amber-300/40 to-yellow-400/30 rounded-full blur-sm animate-float-medium"></div>
		<div class="absolute top-1/3 right-1/3 w-46 h-46 bg-gradient-to-br from-red-300/30 to-pink-400/20 rounded-lg rotate-30 animate-float-fast"></div>
		
		<!-- Bell shapes for reminders theme -->
		<div class="absolute top-44 left-2/3 w-26 h-26 bg-gradient-to-br from-orange-400/40 to-red-500/30 rounded-full blur-md animate-float-slow" style="clip-path: polygon(50% 0%, 80% 0%, 90% 20%, 90% 80%, 80% 100%, 20% 100%, 10% 80%, 10% 20%, 20% 0%);"></div>
		<div class="absolute bottom-44 right-1/3 w-22 h-22 bg-gradient-to-br from-red-400/35 to-orange-500/25 rounded-full blur-sm animate-float-medium" style="clip-path: polygon(50% 0%, 80% 0%, 90% 20%, 90% 80%, 80% 100%, 20% 100%, 10% 80%, 10% 20%, 20% 0%);"></div>
		
		<!-- Mesh overlay for 3D effect -->
		<div class="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
		<div class="absolute inset-0 bg-gradient-to-tl from-transparent via-orange-100/3 to-transparent"></div>
	</div>
	{#if selectedCategory}
		<!-- Category Sub-page -->
		<div class="max-w-7xl mx-auto">
			<div class="flex justify-between items-center mb-6">
				<div class="flex items-center space-x-4">
					<button
						onclick={() => selectedCategory = null}
						class="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
						aria-label="Back to main reminders page"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
						</svg>
					</button>
					<div>
						<h1 class="text-3xl font-bold text-gray-900">{categories.find(c => c.id === selectedCategory)?.name} Reminders</h1>
						<p class="text-gray-600 mt-1">Manage {categories.find(c => c.id === selectedCategory)?.name.toLowerCase()} reminder notifications</p>
					</div>
				</div>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each remindersByCategory[categories.find(c => c.id === selectedCategory)?.name || ''] || [] as reminder}
					<div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 hover:scale-105">
						<div class="flex items-start justify-between mb-4">
							<div class="flex items-center space-x-3">
								<div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
									<span class="text-white font-semibold text-sm">{reminder.subCategory.charAt(0)}</span>
								</div>
								<div>
									<h3 class="font-semibold text-gray-900">{reminder.subCategory}</h3>
									<p class="text-sm text-gray-500">{reminder.frequency}</p>
								</div>
							</div>
							<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {getPriorityColor(reminder.priority)}">
								{reminder.priority}
							</span>
						</div>

						<p class="text-gray-700 mb-4 text-sm">{reminder.description}</p>

						<div class="space-y-2 mb-4">
							<div class="flex justify-between text-sm">
								<span class="text-gray-500">Type:</span>
								<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {getTypeColor(reminder.type)}">
									{reminder.type}
								</span>
							</div>
							<div class="flex justify-between text-sm">
								<span class="text-gray-500">Trigger:</span>
								<span class="font-medium text-blue-600">{reminder.triggerTime}</span>
							</div>
							{#if reminder.nextTrigger}
								<div class="flex justify-between text-sm">
									<span class="text-gray-500">Next:</span>
									<span class="font-medium text-green-600">{reminder.nextTrigger.toLocaleDateString()} {reminder.nextTrigger.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
								</div>
							{/if}
						</div>

						<div class="flex items-center justify-between">
							<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {getStatusColor(reminder.status)}">
								{reminder.status}
							</span>
							<span class="text-xs text-gray-500">{reminder.createdAt.toLocaleDateString()}</span>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{:else}
		<!-- Main Reminders Dashboard -->
		<div class="max-w-7xl mx-auto space-y-8">
			<!-- Welcome Section -->
			<div class="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
				<div class="absolute inset-0 bg-black/10"></div>
				<div class="relative z-10">
					<h1 class="text-4xl font-bold mb-2">Reminders Management</h1>
					<p class="text-xl text-cyan-100 mb-6">Stay organized with automated notifications and alerts</p>
					<div class="flex items-center space-x-6 text-sm">
						<div class="flex items-center space-x-2">
							<div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
							<span>{totalReminders} Total Reminders</span>
						</div>
						<div class="flex items-center space-x-2">
							<div class="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
							<span>{activeReminders} Active</span>
						</div>
						<div class="flex items-center space-x-2">
							<div class="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
							<span>{pendingReminders} Pending</span>
						</div>
					</div>
				</div>
				<div class="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
				<div class="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full"></div>
			</div>

			<!-- KPI Dashboard -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-sm font-medium text-gray-600 mb-1">Total Reminders</p>
							<p class="text-3xl font-bold text-blue-600">{totalReminders}</p>
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
							<p class="text-sm font-medium text-gray-600 mb-1">Active</p>
							<p class="text-3xl font-bold text-green-600">{activeReminders}</p>
							<p class="text-xs text-gray-500 mt-1">{activeRate}% active rate</p>
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
							<p class="text-sm font-medium text-gray-600 mb-1">Pending</p>
							<p class="text-3xl font-bold text-orange-600">{pendingReminders}</p>
							<p class="text-xs text-gray-500 mt-1">Awaiting setup</p>
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
							<p class="text-sm font-medium text-gray-600 mb-1">Inactive</p>
							<p class="text-3xl font-bold text-red-600">{inactiveReminders}</p>
							<p class="text-xs text-gray-500 mt-1">Disabled reminders</p>
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
				<h2 class="text-2xl font-bold text-gray-900 mb-6">Reminder Categories</h2>
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
								<p class="text-sm opacity-90">{remindersByCategory[category.name]?.length || 0} reminders</p>
							</div>
							<div class="absolute -top-2 -right-2 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
								<span class="text-xs font-bold">{remindersByCategory[category.name]?.length || 0}</span>
							</div>
						</button>
					{/each}
				</div>
			</div>

			<!-- Recent Reminders -->
			<div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
				<h3 class="text-xl font-bold text-gray-900 mb-6">Recent Reminders</h3>
				<div class="space-y-4">
					{#each reminders.slice(0, 5) as reminder}
						<div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
							<div class="flex items-center space-x-4">
								<div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
									<span class="text-white font-semibold text-sm">{reminder.subCategory.charAt(0)}</span>
								</div>
								<div class="flex-1">
									<p class="font-medium text-gray-900">{reminder.subCategory} - {reminder.triggerTime}</p>
									<p class="text-sm text-gray-500">{reminder.message}</p>
								</div>
							</div>
							<div class="flex items-center space-x-3">
								<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {getTypeColor(reminder.type)}">
									{reminder.type}
								</span>
								<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {getStatusColor(reminder.status)}">
									{reminder.status}
								</span>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	/* 3D Floating Animations */
	@keyframes float-slow {
		0%, 100% { transform: translateY(0px) rotate(0deg); }
		50% { transform: translateY(-20px) rotate(5deg); }
	}
	
	@keyframes float-medium {
		0%, 100% { transform: translateY(0px) rotate(0deg); }
		50% { transform: translateY(-15px) rotate(-3deg); }
	}
	
	@keyframes float-fast {
		0%, 100% { transform: translateY(0px) rotate(0deg); }
		50% { transform: translateY(-25px) rotate(8deg); }
	}
	
	.animate-float-slow {
		animation: float-slow 6s ease-in-out infinite;
	}
	
	.animate-float-medium {
		animation: float-medium 4s ease-in-out infinite;
	}
	
	.animate-float-fast {
		animation: float-fast 3s ease-in-out infinite;
	}
</style>