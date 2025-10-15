<script lang="ts">
	import { onMount } from 'svelte';
	import { currentBackgroundTheme, loadSavedTheme } from '$lib/stores/backgroundThemes';
	import BackgroundThemeSelector from '$lib/components/BackgroundThemeSelector.svelte';

	let activeTab = $state('dashboard');
	let tasks = $state<Array<{id: string; type: string; category: string; frequency: string; status: string}>>([]);

	// Load saved background theme
	onMount(() => {
		loadSavedTheme();
		
		// Mock data for now
		tasks = [
			{ id: '1', type: 'Duty', category: 'Household', frequency: 'Daily', status: 'Pending' },
			{ id: '2', type: 'Ritual', category: 'Spiritual', frequency: 'Daily', status: 'Completed' }
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
	<title>Tasks - Divine Nest</title>
</svelte:head>

<div class="min-h-screen relative overflow-hidden p-4 pb-20">
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

	<!-- Background Theme Selector -->
	<BackgroundThemeSelector />
	<h1 class="text-2xl font-bold mb-6 text-gray-800">Tasks</h1>

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
			<h2 class="text-xl font-semibold mb-4">Tasks Dashboard</h2>
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div class="bg-red-100 p-4 rounded-lg">
					<h3 class="font-semibold text-red-800">Pending</h3>
					<p class="text-2xl font-bold text-red-600">12</p>
				</div>
				<div class="bg-yellow-100 p-4 rounded-lg">
					<h3 class="font-semibold text-yellow-800">In Progress</h3>
					<p class="text-2xl font-bold text-yellow-600">5</p>
				</div>
				<div class="bg-green-100 p-4 rounded-lg">
					<h3 class="font-semibold text-green-800">Completed</h3>
					<p class="text-2xl font-bold text-green-600">23</p>
				</div>
			</div>
		</div>
	{:else if activeTab === 'crud'}
		<div class="glass-card p-6 rounded-xl">
			<h2 class="text-xl font-semibold mb-4">CRUD Operations</h2>
			<button class="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-600">Add New Task</button>
			<div class="space-y-2">
				{#each tasks as task}
					<div class="bg-white/50 p-4 rounded-lg flex justify-between items-center">
						<div>
							<h3 class="font-semibold">{task.category} - {task.type}</h3>
							<p class="text-sm text-gray-600">Frequency: {task.frequency} | Status: {task.status}</p>
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
					<p class="font-semibold">Child: I completed my homework task!</p>
					<p class="text-sm text-gray-600">3 hours ago</p>
				</div>
				<div class="bg-white/50 p-4 rounded-lg">
					<p class="font-semibold">Father: Great job! Keep it up.</p>
					<p class="text-sm text-gray-600">2 hours ago</p>
				</div>
			</div>
			<textarea class="w-full mt-4 p-2 border rounded-lg" placeholder="Add a comment..."></textarea>
			<button class="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2">Post Comment</button>
		</div>
	{:else if activeTab === 'alerts'}
		<div class="glass-card p-6 rounded-xl">
			<h2 class="text-xl font-semibold mb-4">Alerts</h2>
			<div class="space-y-2">
				<div class="bg-orange-100 p-4 rounded-lg border-l-4 border-orange-500">
					<h3 class="font-semibold text-orange-800">Task Due: Water Plants</h3>
					<p class="text-sm">Weekly task reminder</p>
				</div>
				<div class="bg-blue-100 p-4 rounded-lg border-l-4 border-blue-500">
					<h3 class="font-semibold text-blue-800">Ritual Reminder: Sandhyavandanam</h3>
					<p class="text-sm">Daily at 06:00</p>
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