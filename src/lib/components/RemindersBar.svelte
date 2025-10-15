<script lang="ts">
	import { userStore } from '$lib/stores/user';

	let { showRemindersBar = $bindable(false) } = $props();

	// Sample reminders data - in a real app, this would come from a store or API
	const reminders = [
		{
			id: 1,
			title: 'Morning Prayer',
			time: '6:00 AM',
			category: 'Spiritual',
			completed: false
		},
		{
			id: 2,
			title: 'Temple Visit',
			time: '10:00 AM',
			category: 'Temple',
			completed: false
		},
		{
			id: 3,
			title: 'Evening Meditation',
			time: '7:00 PM',
			category: 'Spiritual',
			completed: true
		}
	];

	function toggleReminder(id: number) {
		const reminder = reminders.find(r => r.id === id);
		if (reminder) {
			reminder.completed = !reminder.completed;
		}
	}

	function closeRemindersBar() {
		showRemindersBar = false;
	}
</script>

{#if showRemindersBar}
	<!-- Floating Reminders Bar -->
	<div class="fixed bottom-20 left-4 right-4 z-50 animate-in slide-in-from-bottom-4 duration-300">
		<div class="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
			<!-- Header -->
			<div class="flex items-center justify-between p-4 border-b border-gray-100">
				<div class="flex items-center space-x-3">
					<div class="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
						<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
						</svg>
					</div>
					<div>
						<h3 class="font-semibold text-gray-900">Reminders</h3>
						<p class="text-xs text-gray-500">Stay on track with your spiritual journey</p>
					</div>
				</div>
				<button
					onclick={closeRemindersBar}
					class="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
					aria-label="Close reminders"
				>
					<svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
					</svg>
				</button>
			</div>

			<!-- Reminders List -->
			<div class="max-h-64 overflow-y-auto">
				{#each reminders as reminder}
					<div class="flex items-center space-x-3 p-4 border-b border-gray-50 last:border-b-0 hover:bg-gray-50/50 transition-colors">
						<button
							onclick={() => toggleReminder(reminder.id)}
							class="w-5 h-5 rounded border-2 flex items-center justify-center transition-colors {reminder.completed ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-green-400'}"
							aria-label="Toggle reminder completion"
						>
							{#if reminder.completed}
								<svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
								</svg>
							{/if}
						</button>

						<div class="flex-1 min-w-0">
							<div class="flex items-center space-x-2">
								<p class="text-sm font-medium text-gray-900 truncate {reminder.completed ? 'line-through text-gray-500' : ''}">
									{reminder.title}
								</p>
								<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium {reminder.category === 'Spiritual' ? 'bg-purple-100 text-purple-800' : reminder.category === 'Temple' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}">
									{reminder.category}
								</span>
							</div>
							<p class="text-xs text-gray-500 mt-1">{reminder.time}</p>
						</div>

						<div class="flex items-center space-x-1">
							<button class="w-6 h-6 text-gray-400 hover:text-gray-600 rounded transition-colors" aria-label="Edit reminder">
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
								</svg>
							</button>
							<button class="w-6 h-6 text-gray-400 hover:text-red-500 rounded transition-colors" aria-label="Delete reminder">
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
								</svg>
							</button>
						</div>
					</div>
				{/each}
			</div>

			<!-- Footer with Add Button -->
			<div class="p-4 border-t border-gray-100">
				<button class="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-lg transition-all duration-200 font-medium">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
					</svg>
					<span>Add New Reminder</span>
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	@keyframes slide-in-from-bottom-4 {
		from {
			opacity: 0;
			transform: translateY(16px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-in {
		animation: slide-in-from-bottom-4 0.3s ease-out;
	}
</style>