<script lang="ts">
	import type { PageData } from './$types';
	import IssueForm from '$lib/components/IssueForm.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let activeTab = $state('dashboard');
	let selectedCategory = $state<string | null>(null);
	let issues = $state<any[]>(data.issues);
	let showForm = $state(false);
	let formMode = $state<'create' | 'edit'>('create');
	let selectedIssueCategory = $state('');
	let editingIssue = $state<any>(null);

	// KPI calculations
	const totalIssues = $derived(issues.length);
	const resolvedIssues = $derived(issues.filter(i => i.status === 'Resolved').length);
	const pendingIssues = $derived(issues.filter(i => i.status === 'Reported').length);
	const inProgressIssues = $derived(issues.filter(i => i.status === 'In Progress').length);
	const resolutionRate = $derived(totalIssues > 0 ? Math.round((resolvedIssues / totalIssues) * 100) : 0);

	// Group issues by category for child tables
	const issuesByCategory = $derived(issues.reduce((acc, issue) => {
		if (!acc[issue.category]) acc[issue.category] = [];
		acc[issue.category].push(issue);
		return acc;
	}, {} as Record<string, typeof issues>));

	const categories = [
		{ id: 'emergency', name: 'Emergency', icon: '🚨', color: 'from-red-500 to-red-700' },
		{ id: 'urgent', name: 'Urgent', icon: '⚡', color: 'from-orange-500 to-orange-700' },
		{ id: 'repairs', name: 'Repairs', icon: '🔧', color: 'from-blue-500 to-blue-700' },
		{ id: 'maintenance', name: 'Maintenance', icon: '⚙️', color: 'from-green-500 to-green-700' },
		{ id: 'upgrades', name: 'Upgrades', icon: '⬆️', color: 'from-purple-500 to-purple-700' },
		{ id: 'other', name: 'Other', icon: '📋', color: 'from-gray-500 to-gray-700' }
	];

	const tabs = [
		{ id: 'dashboard', label: 'Dashboard', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>' },
		{ id: 'crud', label: 'CRUD Operations', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>' },
		{ id: 'discussion', label: 'Discussion', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>' },
		{ id: 'alerts', label: 'Alerts', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4.868 12.683A17.925 17.925 0 012 21h13.78a3 3 0 002.553-1.453c1.475-2.45 1.553-5.25.177-7.877-3.065-5.84 1.64-10.375 1.64-10.375s-5.83 3.061-8.895 8.901c-1.376 2.627-1.298 5.427.177 7.877A3 3 0 0113.78 21H2a3 3 0 01-2.553-1.453c-1.475-2.45-1.553-5.25-.177-7.877 3.065-5.84-1.64-10.375-1.64-10.375s5.83 3.061 8.895 8.901z"></path></svg>' }
	];

	function getStatusColor(status: string) {
		switch (status) {
			case 'Resolved': return 'text-green-600 bg-green-100';
			case 'In Progress': return 'text-blue-600 bg-blue-100';
			case 'Reported': return 'text-orange-600 bg-orange-100';
			default: return 'text-gray-600 bg-gray-100';
		}
	}

	function openCreateForm(category: string) {
		selectedIssueCategory = category;
		formMode = 'create';
		editingIssue = null;
		showForm = true;
	}

	function openEditForm(issue: any) {
		selectedIssueCategory = issue.category;
		formMode = 'edit';
		editingIssue = issue;
		showForm = true;
	}

	function closeForm() {
		showForm = false;
		selectedIssueCategory = '';
		editingIssue = null;
	}

	async function handleFormSubmit(event: CustomEvent) {
		const { formData } = event.detail;

		try {
			const formDataObj = new FormData();
			Object.entries(formData).forEach(([key, value]) => {
				if (key === 'childData') {
					formDataObj.append(key, JSON.stringify(value));
				} else {
					formDataObj.append(key, value as string);
				}
			});

			if (formMode === 'edit' && editingIssue) {
				formDataObj.append('id', editingIssue.id);
			}

			const action = formMode === 'create' ? '?/createIssue' : '?/updateIssue';
			const response = await fetch(action, {
				method: 'POST',
				body: formDataObj
			});

			if (response.ok) {
				// Reload the page to get updated data
				window.location.reload();
			} else {
				console.error('Error saving issue');
				// In a real app, you'd show an error message to the user
			}
		} catch (error) {
			console.error('Error saving issue:', error);
			// In a real app, you'd show an error message to the user
		}
	}
</script>

<svelte:head>
	<title>Issues - Divine Nest</title>
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
						aria-label="Back to main issues page"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
						</svg>
					</button>
					<div>
						<h1 class="text-3xl font-bold text-gray-900">{categories.find(c => c.id === selectedCategory)?.name} Issues</h1>
						<p class="text-gray-600 mt-1">Manage {categories.find(c => c.id === selectedCategory)?.name.toLowerCase()} related issues</p>
					</div>
				</div>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each issuesByCategory[categories.find(c => c.id === selectedCategory)?.name || ''] || [] as issue}
					<div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 hover:scale-105">
						<div class="flex items-start justify-between mb-4">
							<div class="flex items-center space-x-3">
								<div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
									<span class="text-white font-semibold text-sm">{issue.category.charAt(0)}</span>
								</div>
								<div>
									<h3 class="font-semibold text-gray-900">{issue.category}</h3>
									<p class="text-sm text-gray-500">{issue.location}</p>
								</div>
							</div>
							<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {getStatusColor(issue.status)}">
								{issue.status}
							</span>
						</div>

						<div class="space-y-2 mb-4">
							<div class="flex justify-between text-sm">
								<span class="text-gray-500">Type:</span>
								<span class="font-medium">{issue.type}</span>
							</div>
							<div class="flex justify-between text-sm">
								<span class="text-gray-500">Contact:</span>
								<span class="font-medium">{issue.contact || 'N/A'}</span>
							</div>
							<div class="flex justify-between text-sm">
								<span class="text-gray-500">Assigned:</span>
								<span class="font-medium">{issue.assignedTo || 'Unassigned'}</span>
							</div>
						</div>

						<div class="flex justify-end space-x-2">
							<button
								onclick={() => openEditForm(issue)}
								class="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors"
							>
								Edit
							</button>
						</div>

						<div class="flex items-center justify-between">
							<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {getStatusColor(issue.status)}">
								{issue.status}
							</span>
							<span class="text-xs text-gray-500">{issue.createdAt.toLocaleDateString()}</span>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{:else}
		<!-- Main Issues Dashboard -->
		<div class="max-w-7xl mx-auto space-y-8">
			<!-- Welcome Section -->
			<div class="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
				<div class="absolute inset-0 bg-black/10"></div>
				<div class="relative z-10">
					<h1 class="text-4xl font-bold mb-2">Issues Management</h1>
					<p class="text-xl text-red-100 mb-6">Track and resolve household issues efficiently</p>
					<div class="flex items-center space-x-6 text-sm">
						<div class="flex items-center space-x-2">
							<div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
							<span>{totalIssues} Total Issues</span>
						</div>
						<div class="flex items-center space-x-2">
							<div class="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
							<span>{inProgressIssues} In Progress</span>
						</div>
						<div class="flex items-center space-x-2">
							<div class="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
							<span>{pendingIssues} Pending</span>
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
							<p class="text-sm font-medium text-gray-600 mb-1">Total Issues</p>
							<p class="text-3xl font-bold text-blue-600">{totalIssues}</p>
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
							<p class="text-sm font-medium text-gray-600 mb-1">Resolved</p>
							<p class="text-3xl font-bold text-green-600">{resolvedIssues}</p>
							<p class="text-xs text-gray-500 mt-1">{resolutionRate}% resolution rate</p>
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
							<p class="text-3xl font-bold text-orange-600">{inProgressIssues}</p>
							<p class="text-xs text-gray-500 mt-1">Active issues</p>
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
							<p class="text-3xl font-bold text-red-600">{pendingIssues}</p>
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
				<h2 class="text-2xl font-bold text-gray-900 mb-6">Issue Categories</h2>
				<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
					{#each categories as category}
						<div class="group relative bg-gradient-to-br {category.color} rounded-xl p-6 text-white hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
							<div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
							<div class="relative z-10">
								<div class="text-3xl mb-3">{category.icon}</div>
								<h3 class="font-semibold text-lg mb-1">{category.name}</h3>
								<p class="text-sm opacity-90">{issuesByCategory[category.name]?.length || 0} issues</p>
								<div class="flex space-x-2 mt-4">
									<button
										onclick={() => selectedCategory = category.id}
										class="flex-1 bg-white/20 hover:bg-white/30 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors"
									>
										View
									</button>
									<button
										onclick={() => openCreateForm(category.name)}
										class="bg-white/20 hover:bg-white/30 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors"
									>
										+
									</button>
								</div>
							</div>
							<div class="absolute -top-2 -right-2 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
								<span class="text-xs font-bold">{issuesByCategory[category.name]?.length || 0}</span>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Recent Issues -->
			<div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
				<h3 class="text-xl font-bold text-gray-900 mb-6">Recent Issues</h3>
				<div class="space-y-4">
					{#each issues.slice(0, 5) as issue}
						<div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
							<div class="flex items-center space-x-4">
								<div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
									<span class="text-white font-semibold text-sm">{issue.category.charAt(0)}</span>
								</div>
								<div class="flex-1">
									<p class="font-medium text-gray-900">{issue.category} - {issue.location}</p>
									<p class="text-sm text-gray-500">by {issue.createdBy} • {issue.createdAt.toLocaleDateString()}</p>
								</div>
							</div>
							<div class="flex items-center space-x-3">
								<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {getStatusColor(issue.status)}">
									{issue.status}
								</span>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}

	<!-- Issue Form Modal -->
	{#if showForm}
		<div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
			<IssueForm
				issueCategory={selectedIssueCategory}
				mode={formMode}
				initialData={editingIssue}
				on:submit={handleFormSubmit}
				on:cancel={closeForm}
			/>
		</div>
	{/if}
</div>
