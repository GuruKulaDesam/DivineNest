<script lang="ts">
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let activeTab = $state('dashboard');
	let selectedCategory = $state<string | null>(null);

	// Use real data from server load
	let dutyTypes = $derived(data.dutyTypes);
	let duties = $derived(data.duties);
	let responsibilitiesByType = $derived(data.responsibilitiesByType);

	// KPI calculations
	const totalDuties = $derived(duties.length);
	const totalResponsibilities = $derived(Object.values(responsibilitiesByType).flat().length);
	const completedResponsibilities = $derived(Object.values(responsibilitiesByType).flat().filter(r => r.status === 'completed').length);
	const pendingResponsibilities = $derived(Object.values(responsibilitiesByType).flat().filter(r => r.status === 'pending').length);
	const completionRate = $derived(totalResponsibilities > 0 ? Math.round((completedResponsibilities / totalResponsibilities) * 100) : 0);

	// Group duties by type for display
	const dutiesByType = $derived(duties.reduce((acc, duty) => {
		if (!acc[duty.dutyType.code]) acc[duty.dutyType.code] = [];
		acc[duty.dutyType.code].push(duty);
		return acc;
	}, {} as Record<string, typeof duties>));

	const categories = $derived(dutyTypes.map(type => ({
		id: type.code,
		name: type.label,
		icon: '🕉️', // Default icon for all Vedic duties
		color: 'from-orange-500 to-red-700' // Default color
	})));

	const tabs = [
		{ id: 'dashboard', label: 'Dashboard', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>' },
		{ id: 'crud', label: 'CRUD Operations', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>' },
		{ id: 'discussion', label: 'Discussion', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>' },
		{ id: 'alerts', label: 'Alerts', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4.868 12.683A17.925 17.925 0 012 21h13.78a3 3 0 002.553-1.453c1.475-2.45 1.553-5.25.177-7.877-3.065-5.84 1.64-10.375 1.64-10.375s-5.83 3.061-8.895 8.901c-1.376 2.627-1.298 5.427.177 7.877A3 3 0 0113.78 21H2a3 3 0 01-2.553-1.453c-1.475-2.45-1.553-5.25-.177-7.877 3.065-5.84-1.64-10.375-1.64-10.375s5.83 3.061 8.895 8.901z"></path></svg>' }
	];

	function getStatusColor(status: string) {
		switch (status) {
			case 'Completed': return 'text-green-600 bg-green-100';
			case 'Active': return 'text-blue-600 bg-blue-100';
			case 'Pending': return 'text-orange-600 bg-orange-100';
			default: return 'text-gray-600 bg-gray-100';
		}
	}

	function getPriorityColor(priority: string) {
		switch (priority) {
			case 'High': return 'text-red-600 bg-red-100';
			case 'Medium': return 'text-orange-600 bg-orange-100';
			case 'Low': return 'text-green-600 bg-green-100';
			default: return 'text-gray-600 bg-gray-100';
		}
	}
</script>

<svelte:head>
	<title>Duties - Divine Nest</title>
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
						aria-label="Back to main duties page"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
						</svg>
					</button>
					<div>
						<h1 class="text-3xl font-bold text-gray-900">{categories.find(c => c.id === selectedCategory)?.name} Duties</h1>
						<p class="text-gray-600 mt-1">Manage {categories.find(c => c.id === selectedCategory)?.name.toLowerCase()} related duties</p>
					</div>
				</div>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each dutiesByType[selectedCategory] || [] as duty}
					<div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 hover:scale-105">
						<div class="flex items-start justify-between mb-4">
							<div class="flex items-center space-x-3">
								<div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
									<span class="text-white font-semibold text-sm">{duty.title.charAt(0)}</span>
								</div>
								<div>
									<h3 class="font-semibold text-gray-900">{duty.title}</h3>
									<p class="text-sm text-gray-500">{duty.role}</p>
								</div>
							</div>
							<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
								{duty.frequency}
							</span>
						</div>

						{#if duty.description}
							<p class="text-gray-700 mb-4 text-sm">{duty.description}</p>
						{/if}

						<div class="space-y-2 mb-4">
							<h4 class="font-medium text-gray-900 text-sm">பொறுப்புகள் (Responsibilities):</h4>
							{#each duty.responsibilities as responsibility}
								<div class="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
									<div class="flex-1">
										<p class="text-sm font-medium text-gray-900">{responsibility.activity}</p>
										{#if responsibility.description}
											<p class="text-xs text-gray-600">{responsibility.description}</p>
										{/if}
									</div>
									<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {getStatusColor(responsibility.status)}">
										{responsibility.status}
									</span>
								</div>
							{/each}
						</div>

						<div class="text-xs text-gray-500">
							Created: {duty.createdAt.toLocaleDateString()}
						</div>
					</div>
				{/each}
			</div>
		</div>
	{:else}
		<!-- Main Duties Dashboard -->
		<div class="max-w-7xl mx-auto space-y-8">
			<!-- Welcome Section -->
			<div class="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
				<div class="absolute inset-0 bg-black/10"></div>
				<div class="relative z-10">
					<h1 class="text-4xl font-bold mb-2">Duties Management</h1>
					<p class="text-xl text-purple-100 mb-6">Track and manage family duties and responsibilities</p>
					<div class="flex items-center space-x-6 text-sm">
						<div class="flex items-center space-x-2">
							<div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
							<span>{totalDuties} Total Duties</span>
						</div>
						<div class="flex items-center space-x-2">
							<div class="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
							<span>{totalResponsibilities} Responsibilities</span>
						</div>
						<div class="flex items-center space-x-2">
							<div class="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
							<span>{completionRate}% Complete</span>
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
							<p class="text-sm font-medium text-gray-600 mb-1">Total Duties</p>
							<p class="text-3xl font-bold text-blue-600">{totalDuties}</p>
							<p class="text-xs text-gray-500 mt-1">Across {dutyTypes.length} categories</p>
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
							<p class="text-sm font-medium text-gray-600 mb-1">Responsibilities</p>
							<p class="text-3xl font-bold text-green-600">{totalResponsibilities}</p>
							<p class="text-xs text-gray-500 mt-1">{completedResponsibilities} completed</p>
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
							<p class="text-sm font-medium text-gray-600 mb-1">Completion Rate</p>
							<p class="text-3xl font-bold text-orange-600">{completionRate}%</p>
							<p class="text-xs text-gray-500 mt-1">{pendingResponsibilities} pending</p>
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
							<p class="text-sm font-medium text-gray-600 mb-1">Duty Types</p>
							<p class="text-3xl font-bold text-red-600">{dutyTypes.length}</p>
							<p class="text-xs text-gray-500 mt-1">Vedic categories</p>
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
				<h2 class="text-2xl font-bold text-gray-900 mb-6">Duty Categories</h2>
				<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{#each categories as category}
						<button
							onclick={() => selectedCategory = category.id}
							class="group relative bg-gradient-to-br {category.color} rounded-xl p-6 text-white hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
						>
							<div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
							<div class="relative z-10">
								<div class="text-3xl mb-3">{category.icon}</div>
								<h3 class="font-semibold text-lg mb-1">{category.name}</h3>
								<p class="text-sm opacity-90">{dutiesByType[category.id]?.length || 0} duties</p>
							</div>
							<div class="absolute -top-2 -right-2 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
								<span class="text-xs font-bold">{dutiesByType[category.id]?.length || 0}</span>
							</div>
						</button>
					{/each}
				</div>
			</div>

			<!-- Recent Duties -->
			<div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
				<h3 class="text-xl font-bold text-gray-900 mb-6">Recent Duties</h3>
				<div class="space-y-4">
					{#each duties.slice(0, 5) as duty}
						<div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
							<div class="flex items-center space-x-4">
								<div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
									<span class="text-white font-semibold text-sm">{duty.title.charAt(0)}</span>
								</div>
								<div class="flex-1">
									<p class="font-medium text-gray-900">{duty.title} - {duty.dutyType.label}</p>
									<p class="text-sm text-gray-500">Role: {duty.role} • {duty.createdAt.toLocaleDateString()}</p>
								</div>
							</div>
							<div class="flex items-center space-x-3">
								<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
									{duty.frequency}
								</span>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>