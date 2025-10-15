<script lang="ts">
	import { backgroundThemes, currentBackgroundTheme, setBackgroundTheme } from '$lib/stores/backgroundThemes';
	import { onMount } from 'svelte';

	let showThemeSelector = $state(false);
	let currentTheme = $state(backgroundThemes[0]);

	// Subscribe to theme changes
	const unsubscribe = currentBackgroundTheme.subscribe(theme => {
		currentTheme = theme;
	});

	onMount(() => {
		return unsubscribe;
	});

	function selectTheme(themeId: string) {
		setBackgroundTheme(themeId);
		showThemeSelector = false;
	}
</script>

<!-- Background Theme Selector Button -->
<div class="fixed top-4 right-4 z-50">
	<button
		onclick={() => showThemeSelector = !showThemeSelector}
		class="glass-card p-3 rounded-full hover:scale-105 transition-transform shadow-lg"
		aria-label="Change background theme"
	>
		<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
		</svg>
	</button>
</div>

<!-- Theme Selector Modal -->
{#if showThemeSelector}
	<div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
		<div class="glass-card p-6 rounded-2xl w-full max-w-md max-h-[80vh] overflow-y-auto">
			<div class="flex items-center justify-between mb-6">
				<h3 class="text-xl font-bold">Choose Background Theme</h3>
				<button
					onclick={() => showThemeSelector = false}
					class="p-2 hover:bg-white/20 rounded-lg transition-colors"
					aria-label="Close theme selector"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
					</svg>
				</button>
			</div>

			<div class="space-y-3">
				{#each backgroundThemes as theme}
					<button
						onclick={() => selectTheme(theme.id)}
						class="w-full p-4 rounded-xl border-2 transition-all hover:scale-105 {
							currentTheme.id === theme.id
								? 'border-blue-400 bg-blue-50/20 shadow-lg'
								: 'border-gray-200/50 bg-white/10 hover:border-gray-300/70'
						}"
					>
						<div class="flex items-center space-x-4">
							<!-- Theme Preview -->
							<div class="w-16 h-16 rounded-lg overflow-hidden border border-white/20">
								<div class="w-full h-full bg-gradient-to-br {theme.primaryGradient} relative">
									<div class="absolute inset-0 bg-gradient-to-tl {theme.secondaryGradient} opacity-60"></div>
									<div class="absolute top-1 left-1 w-3 h-3 rounded-full bg-gradient-to-br {theme.floatingShapes[0]?.colors || 'from-white/30 to-white/20'}"></div>
								</div>
							</div>

							<!-- Theme Info -->
							<div class="flex-1 text-left">
								<h4 class="font-semibold text-gray-800">{theme.name}</h4>
								<p class="text-sm text-gray-600">{theme.description}</p>
							</div>

							<!-- Selected Indicator -->
							{#if currentTheme.id === theme.id}
								<div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
									<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
									</svg>
								</div>
							{/if}
						</div>
					</button>
				{/each}
			</div>
		</div>
	</div>
{/if}

<style>
	.glass-card {
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
	}
</style>