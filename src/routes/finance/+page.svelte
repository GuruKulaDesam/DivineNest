<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let activeTab = $state('dashboard');
	let finances = $state<Array<{id: string; type: string; category: string; amount: number; date: string}>>([]);

	// Mock data for now
	onMount(() => {
		finances = [
			{ id: '1', type: 'Income', category: 'Salary', amount: 50000, date: '2025-01-01' },
			{ id: '2', type: 'Expense', category: 'Groceries', amount: 5000, date: '2025-01-15' }
		];
	});

	const tabs = [
		{ id: 'dashboard', label: 'Dashboard', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>' },
		{ id: 'crud', label: 'CRUD Operations', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>' },
		{ id: 'discussion', label: 'Discussion', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>' },
		{ id: 'alerts', label: 'Alerts', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4.868 12.683A17.925 17.925 0 012 21h13.78a3 3 0 002.553-1.453c1.475-2.45 1.553-5.25.177-7.877-3.065-5.84 1.64-10.375 1.64-10.375s-5.83 3.061-8.895 8.901c-1.376 2.627-1.298 5.427.177 7.877A3 3 0 0113.78 21H2a3 3 0 01-2.553-1.453c-1.475-2.45-1.553-5.25-.177-7.877 3.065-5.84-1.64-10.375-1.64-10.375s5.83 3.061 8.895 8.901z"></path></svg>' }
	];
</script>

<svelte:head>
	<title>Finance - Divine Nest</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 pb-20">
	<h1 class="text-2xl font-bold mb-6 text-gray-800">Finance</h1>

	<!-- Tabs -->
	<div class="flex space-x-1 mb-6 bg-white/50 p-1 rounded-lg backdrop-blur-sm">
		{#each tabs as tab}
			<button
				class="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all {activeTab === tab.id ? 'bg-white shadow-md text-blue-600' : 'text-gray-600 hover:text-gray-800'}"
				onclick={() => activeTab = tab.id}
			>
				<span class="mr-2">{@html tab.icon}</span>
				{tab.label}
			</button>
		{/each}
	</div>

	<!-- Tab Content -->
	{#if activeTab === 'dashboard'}
		<div class="glass-card p-6 rounded-xl">
			<h2 class="text-xl font-semibold mb-4">Finance Dashboard</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div class="bg-green-100 p-4 rounded-lg">
					<h3 class="font-semibold text-green-800">Total Income</h3>
					<p class="text-2xl font-bold text-green-600">₹85,000</p>
				</div>
				<div class="bg-red-100 p-4 rounded-lg">
					<h3 class="font-semibold text-red-800">Total Expenses</h3>
					<p class="text-2xl font-bold text-red-600">₹42,000</p>
				</div>
				<div class="bg-blue-100 p-4 rounded-lg">
					<h3 class="font-semibold text-blue-800">Net Savings</h3>
					<p class="text-2xl font-bold text-blue-600">₹43,000</p>
				</div>
			</div>
		</div>
	{:else if activeTab === 'crud'}
		<div class="glass-card p-6 rounded-xl">
			<h2 class="text-xl font-semibold mb-4">CRUD Operations</h2>
			<button class="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-600">Add New Transaction</button>
			<div class="space-y-2">
				{#each finances as finance}
					<div class="bg-white/50 p-4 rounded-lg flex justify-between items-center">
						<div>
							<h3 class="font-semibold">{finance.category} - {finance.type}</h3>
							<p class="text-sm text-gray-600">Amount: ₹{finance.amount} | Date: {finance.date}</p>
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
					<h3 class="font-semibold">Budget Planning</h3>
					<p class="text-sm text-gray-600 mb-2">Started by Father • 2 days ago</p>
					<p>How should we allocate the monthly budget?</p>
					<div class="mt-2 flex space-x-2">
						<button class="bg-blue-500 text-white px-3 py-1 rounded text-sm">Reply</button>
						<span class="text-sm text-gray-500">4 replies</span>
					</div>
				</div>
			</div>
		</div>
	{:else if activeTab === 'alerts'}
		<div class="glass-card p-6 rounded-xl">
			<h2 class="text-xl font-semibold mb-4">Alerts</h2>
			<div class="space-y-2">
				<div class="bg-yellow-100 border-l-4 border-yellow-500 p-4">
					<h3 class="font-semibold text-yellow-800">Bill Due</h3>
					<p class="text-sm text-yellow-700">Electricity bill of ₹2,500 is due tomorrow</p>
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