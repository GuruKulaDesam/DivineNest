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
		</div>
	{/if}
</div>