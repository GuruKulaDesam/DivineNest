<script lang="ts">
	import TableOverview from '$lib/components/TableOverview.svelte';
</script>

<svelte:head>
	<title>All Database Tables - Divine Nest</title>
	<meta name="description" content="Complete overview of all database tables in our family management system" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 py-8">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-8">
			<h1 class="text-4xl font-bold text-gray-900 mb-4">Database Schema Overview</h1>
			<p class="text-xl text-gray-600 max-w-3xl mx-auto">
				Explore all the tables we've built for comprehensive family management.
				From spiritual duties to household inventory, our system covers every aspect of family life.
			</p>
		</div>

		<!-- Statistics Cards -->
		<div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
			<div class="bg-white rounded-xl shadow-lg p-6 text-center">
				<div class="text-3xl font-bold text-blue-600 mb-2">18</div>
				<div class="text-gray-600">Parent Tables</div>
			</div>
			<div class="bg-white rounded-xl shadow-lg p-6 text-center">
				<div class="text-3xl font-bold text-green-600 mb-2">100+</div>
				<div class="text-gray-600">Child Tables</div>
			</div>
			<div class="bg-white rounded-xl shadow-lg p-6 text-center">
				<div class="text-3xl font-bold text-purple-600 mb-2">16</div>
				<div class="text-gray-600">Main Sections</div>
			</div>
			<div class="bg-white rounded-xl shadow-lg p-6 text-center">
				<div class="text-3xl font-bold text-orange-600 mb-2">∞</div>
				<div class="text-gray-600">Possibilities</div>
			</div>
		</div>

		<!-- Table Overview Component -->
		<div class="bg-white rounded-2xl shadow-xl p-8">
			<TableOverview />
		</div>

		<!-- Footer Info -->
		<div class="mt-12 text-center text-gray-500">
			<p class="mb-4">
				This comprehensive database schema supports spiritual growth, practical management,
				and the harmonious balance of family life.
			</p>
			<div class="flex flex-wrap justify-center gap-4 text-sm">
				<span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">🕉️ Dharma</span>
				<span class="bg-green-100 text-green-800 px-3 py-1 rounded-full">📚 Learning</span>
				<span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">❤️ Wellness</span>
				<span class="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">⚡ Karma</span>
				<span class="bg-pink-100 text-pink-800 px-3 py-1 rounded-full">🏠 Hospitality</span>
				<span class="bg-teal-100 text-teal-800 px-3 py-1 rounded-full">🌱 Environment</span>
			</div>
		</div>
	</div>
</div>