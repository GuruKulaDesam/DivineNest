<script lang="ts">
	import { onMount } from 'svelte';

	interface Table {
		name: string;
		type: string;
		description: string;
		childTables: string[];
		href: string;
		color: string;
	}

	let showTableOverview = $state(false);
	let selectedTable = $state<Table | null>(null);

	// All tables we built - updated for Prisma schema
	const allTables: Table[] = [
		// Main Tables
		{
			name: 'Duty Types',
			type: 'Reference',
			description: '7 Vedic duty categories (கர்ம யோகம், தர்ம கடமை, etc.)',
			childTables: [],
			href: '/duties',
			color: 'bg-orange-500'
		},
		{
			name: 'Duties',
			type: 'Main',
			description: 'Role-based duties with frequency and priority',
			childTables: [],
			href: '/duties',
			color: 'bg-blue-500'
		},
		{
			name: 'Responsibilities',
			type: 'Detail',
			description: 'Specific activities and tasks for each duty',
			childTables: [],
			href: '/duties',
			color: 'bg-green-500'
		}
	];

	onMount(() => {
		// Automatically show the overview when this component mounts
		showTableOverview = true;
	});

	function closeOverview() {
		showTableOverview = false;
		selectedTable = null;
	}

	function selectTable(table: Table) {
		selectedTable = table;
	}
</script>

{#if showTableOverview}
	<!-- Modal Overlay -->
	<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
		<div class="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
			<!-- Header -->
			<div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
				<div class="flex justify-between items-center">
					<div>
						<h2 class="text-2xl font-bold">All Database Tables</h2>
						<p class="text-blue-100 mt-1">Complete overview of our family management system</p>
					</div>
					<button
						onclick={closeOverview}
						class="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
						aria-label="Close table overview"
					>
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
						</svg>
					</button>
				</div>
			</div>

			<!-- Content -->
			<div class="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
				{#if !selectedTable}
					<!-- Table Grid -->
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{#each allTables as table}
							<div
								class="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer group"
								role="button"
								tabindex="0"
								aria-label="View details for {table.name} table"
								onclick={() => selectTable(table)}
								onkeydown={(e) => e.key === 'Enter' && selectTable(table)}
							>
								<div class="flex items-start justify-between mb-3">
									<div class="flex-1">
										<h3 class="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
											{table.name}
										</h3>
										<span class="inline-block px-2 py-1 text-xs font-medium {table.color} text-white rounded-full mt-1">
											{table.type}
										</span>
									</div>
									<div class="text-2xl opacity-20 group-hover:opacity-40 transition-opacity">
										📊
									</div>
								</div>
								<p class="text-sm text-gray-600 mb-3">{table.description}</p>
								<div class="flex flex-wrap gap-1">
									{#each table.childTables.slice(0, 3) as child}
										<span class="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
											{child}
										</span>
									{/each}
									{#if table.childTables.length > 3}
										<span class="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
											+{table.childTables.length - 3} more
										</span>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<!-- Table Detail View -->
					<div class="space-y-6">
						<div class="flex items-center gap-4">
							<button
								onclick={() => selectedTable = null}
								class="text-blue-600 hover:text-blue-800 flex items-center gap-2"
							>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
								</svg>
								Back to All Tables
							</button>
						</div>

						<div class="bg-gradient-to-r {selectedTable.color} to-blue-600 text-white p-6 rounded-xl">
							<h3 class="text-2xl font-bold mb-2">{selectedTable.name}</h3>
							<p class="text-blue-100">{selectedTable.description}</p>
							<div class="mt-4">
								<span class="inline-block px-3 py-1 text-sm font-medium bg-white/20 text-white rounded-full">
									{selectedTable.type} Table
								</span>
							</div>
						</div>

						<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
							<div class="bg-white border border-gray-200 rounded-xl p-6">
								<h4 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">
									<svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
									</svg>
									Child Tables ({selectedTable.childTables.length})
								</h4>
								{#if selectedTable.childTables.length > 0}
									<div class="grid grid-cols-2 gap-2">
										{#each selectedTable.childTables as child}
											<div class="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-700">
												{child}
											</div>
										{/each}
									</div>
								{:else}
									<p class="text-gray-500 text-sm">No child tables defined yet</p>
								{/if}
							</div>

							<div class="bg-white border border-gray-200 rounded-xl p-6">
								<h4 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">
									<svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
									</svg>
									Actions
								</h4>
								<div class="space-y-3">
									<a
										href={selectedTable.href}
										class="block w-full bg-blue-600 text-white text-center py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
									>
										Go to {selectedTable.name} Page
									</a>
									<button class="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors">
										View Schema Details
									</button>
									<button class="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors">
										Export Data
									</button>
								</div>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}