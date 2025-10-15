<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let activeTab = $state('dashboard');
	let requests = $state<Array<{id: string; category: string; status: string; location: string}>>([]);

	// Mock data for now
	onMount(() => {
		requests = [
			{ id: '1', category: 'Suggestion', status: 'Assigned', location: 'Balcony' },
			{ id: '2', category: 'Repairs', status: 'Reported', location: 'Study Room' }
		];
	});

	const tabs = [
		{ id: 'dashboard', label: 'Dashboard', icon: '📊' },
		{ id: 'crud', label: 'CRUD Operations', icon: '✏️' },
		{ id: 'discussion', label: 'Discussion', icon: '💬' },
		{ id: 'alerts', label: 'Alerts', icon: '🔔' }
	];
</script>

<svelte:head>
	<title>Requests - Divine Nest</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 pb-20">
	<h1 class="text-2xl font-bold mb-6 text-gray-800">Requests</h1>

	<!-- Tabs -->
	<div class="flex space-x-1 mb-6 bg-white/50 p-1 rounded-lg backdrop-blur-sm">
		{#each tabs as tab}
			<button
				class="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all {activeTab === tab.id ? 'bg-white shadow-md text-blue-600' : 'text-gray-600 hover:text-gray-800'}"
				onclick={() => activeTab = tab.id}
			>
				<span class="mr-2">{tab.icon}</span>
				{tab.label}
			</button>
		{/each}
	</div>

	<!-- Tab Content -->
	{#if activeTab === 'dashboard'}
		<div class="glass-card p-6 rounded-xl">
			<h2 class="text-xl font-semibold mb-4">Requests Dashboard</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div class="bg-green-100 p-4 rounded-lg">
					<h3 class="font-semibold text-green-800">Suggestions</h3>
					<p class="text-2xl font-bold text-green-600">5</p>
				</div>
				<div class="bg-blue-100 p-4 rounded-lg">
					<h3 class="font-semibold text-blue-800">Repairs</h3>
					<p class="text-2xl font-bold text-blue-600">3</p>
				</div>
				<div class="bg-purple-100 p-4 rounded-lg">
					<h3 class="font-semibold text-purple-800">Maintenance</h3>
					<p class="text-2xl font-bold text-purple-600">2</p>
				</div>
			</div>
		</div>
	{:else if activeTab === 'crud'}
		<div class="glass-card p-6 rounded-xl">
			<h2 class="text-xl font-semibold mb-4">CRUD Operations</h2>
			<button class="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-600">Add New Request</button>
			<div class="space-y-2">
				{#each requests as request}
					<div class="bg-white/50 p-4 rounded-lg flex justify-between items-center">
						<div>
							<h3 class="font-semibold">{request.category} - {request.location}</h3>
							<p class="text-sm text-gray-600">Status: {request.status}</p>
						</div>
						<div class="space-x-2">
							<button class="bg-yellow-500 text-white px-3 py-1 rounded text-sm">Edit</button>
							<button class="bg-red-500 text-white px-3 py-1 rounded text-sm">Delete</button>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{:else if activeTab === 'discussion'}
		<div class="glass-card p-6 rounded-xl">
			<h2 class="text-xl font-semibold mb-4">Discussion</h2>
			<div class="space-y-4">
				<div class="bg-white/50 p-4 rounded-lg">
					<p class="font-semibold">Mother: Can we add a swing chair in the balcony?</p>
					<p class="text-sm text-gray-600">1 day ago</p>
				</div>
				<div class="bg-white/50 p-4 rounded-lg">
					<p class="font-semibold">Admin: Great idea! I'll look into it.</p>
					<p class="text-sm text-gray-600">12 hours ago</p>
				</div>
			</div>
			<textarea class="w-full mt-4 p-2 border rounded-lg" placeholder="Add a comment..."></textarea>
			<button class="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2">Post Comment</button>
		</div>
	{:else if activeTab === 'alerts'}
		<div class="glass-card p-6 rounded-xl">
			<h2 class="text-xl font-semibold mb-4">Alerts</h2>
			<div class="space-y-2">
				<div class="bg-yellow-100 p-4 rounded-lg border-l-4 border-yellow-500">
					<h3 class="font-semibold text-yellow-800">New Suggestion: Swing Chair</h3>
					<p class="text-sm">From Mother</p>
				</div>
				<div class="bg-blue-100 p-4 rounded-lg border-l-4 border-blue-500">
					<h3 class="font-semibold text-blue-800">Repair Request: Study Table</h3>
					<p class="text-sm">Urgent</p>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.glass-card {
		background: rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.18);
	}
</style>