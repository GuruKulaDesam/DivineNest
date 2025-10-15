<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import divineNestLogo from '$lib/assets/Divine_Nest_Logo_Light.svg';
	import shivohmLogo from '$lib/assets/Shivohm_Logo.svg';
	import VoiceAssistant from '$lib/components/VoiceAssistant.svelte';
	import { page } from '$app/stores';
	import { userStore } from '$lib/stores/user';
	import { onMount } from 'svelte';

	let { children } = $props();
	let showMenu = $state(false);

	// Load user data on mount
	onMount(() => {
		userStore.loadFromStorage();
	});

	const navItems = [
		{ name: 'Home', href: '/', icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>' },
		{ name: 'Calendar', href: '/calendar', icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>' },
		{ name: 'Debts', href: '/debts', icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path></svg>' },
		{ name: 'Duties', href: '/duties', icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>' },
		{ name: 'Issues', href: '/issues', icon: '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>' },
		{ name: 'Responsibility', href: '/responsibility', icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>' },
		{ name: 'Reminders', href: '/reminders', icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>' }
	];

	const menuItems = [
		{ name: 'Profile', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>', href: '/profile' },
		{ name: 'Settings', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>', href: '/settings' },
		{ name: 'All Tables', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>', action: 'showAllTables' }
	];

	function toggleMenu() {
		showMenu = !showMenu;
	}

	function handleMenuClick(item: any) {
		if (item.action === 'showAllTables') {
			showAllTables();
		} else if (item.href) {
			window.location.href = item.href;
		}
		showMenu = false;
	}

	function showAllTables() {
		// This will be handled by the home page component
		const event = new CustomEvent('showAllTables');
		window.dispatchEvent(event);
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 font-['Inter'] antialiased">
	<!-- Modern Top Header with Peacock Background -->
	<header class="relative overflow-hidden">
		<!-- Peacock Background Pattern -->
		<div class="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600">
			<!-- Peacock feather pattern overlay -->
			<div class="absolute inset-0 opacity-20">
				<svg class="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="xMidYMid slice">
					<defs>
						<pattern id="peacock-feathers" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
							<!-- Peacock eye -->
							<circle cx="50" cy="50" r="8" fill="#1a365d" opacity="0.8"/>
							<circle cx="50" cy="50" r="5" fill="#2d3748" opacity="0.9"/>
							<circle cx="50" cy="50" r="2" fill="#fbbf24" opacity="1"/>
							<!-- Feather arcs -->
							<path d="M50,50 Q30,20 10,50 Q30,80 50,50" fill="none" stroke="#1a365d" stroke-width="2" opacity="0.6"/>
							<path d="M50,50 Q70,20 90,50 Q70,80 50,50" fill="none" stroke="#1a365d" stroke-width="2" opacity="0.6"/>
							<path d="M50,50 Q20,30 50,10 Q80,30 50,50" fill="none" stroke="#1a365d" stroke-width="2" opacity="0.6"/>
							<path d="M50,50 Q20,70 50,90 Q80,70 50,50" fill="none" stroke="#1a365d" stroke-width="2" opacity="0.6"/>
						</pattern>
					</defs>
					<rect width="100%" height="100%" fill="url(#peacock-feathers)"/>
				</svg>
			</div>
			<!-- Gradient overlay for better text readability -->
			<div class="absolute inset-0 bg-gradient-to-r from-amber-500/80 via-orange-500/80 to-amber-500/80 backdrop-blur-sm"></div>
		</div>

		<!-- Header Content -->
		<div class="relative z-10 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex justify-between items-center h-16">
					<!-- Logo/Brand with Greeting -->
					<div class="flex items-center space-x-4">
						<!-- Divine Nest Logo -->
						<div class="flex items-center space-x-3">
							<img
								src={divineNestLogo}
								alt="Divine Nest Logo"
								class="w-8 h-8 object-contain"
							/>
							<div class="flex flex-col">
								<h1 class="text-lg font-bold text-white drop-shadow-lg">
									Greetings {$userStore.nickname}!
								</h1>
								<span class="text-xs text-amber-100 uppercase tracking-wide drop-shadow">Welcome to Divine Nest</span>
							</div>
						</div>
					</div>

				<!-- User Menu -->
				<div class="relative">
					<button
						onclick={toggleMenu}
						class="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100/50 transition-all duration-200 group"
						aria-label="User menu"
					>
						<div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
							<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
							</svg>
						</div>
						<svg class="w-4 h-4 text-gray-600 group-hover:text-gray-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
						</svg>
					</button>

					<!-- Dropdown Menu -->
					{#if showMenu}
						<div class="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
							<div class="p-2">
								{#each menuItems as item}
									{#if item.action}
										<button
											onclick={() => handleMenuClick(item)}
											class="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all duration-200 group"
										>
											<div class="w-8 h-8 bg-gray-100 group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors">
												<span class="text-gray-600 group-hover:text-blue-600">{@html item.icon}</span>
											</div>
											<span class="font-medium">{item.name}</span>
										</button>
									{:else}
										<a
											href={item.href}
											class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all duration-200 group"
											onclick={() => showMenu = false}
										>
											<div class="w-8 h-8 bg-gray-100 group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors">
												<span class="text-gray-600 group-hover:text-blue-600">{@html item.icon}</span>
											</div>
											<span class="font-medium">{item.name}</span>
										</a>
									{/if}
								{/each}
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="flex-1">
		{@render children()}
	</main>

	<!-- Modern Curved Bottom Navigation with Green Theme -->
	<nav class="fixed bottom-0 left-0 right-0 z-40">
		<!-- Curved background -->
		<div class="relative">
			<!-- Main navigation background with curve -->
			<div class="bg-gradient-to-r from-green-500 via-emerald-600 to-green-700 backdrop-blur-xl shadow-2xl relative overflow-hidden border-t border-green-400/30">
				<!-- Top curve -->
				<svg class="absolute top-0 left-0 w-full h-8" viewBox="0 0 400 32" preserveAspectRatio="none">
					<path d="M0,32 Q200,0 400,32 L400,0 L0,0 Z" fill="rgba(34, 197, 94, 0.95)"/>
				</svg>

				<div class="relative pt-4 pb-2">
					<div class="max-w-7xl mx-auto px-4">
						<div class="flex justify-around items-end">
							{#each navItems as item, index}
								<a
									href={item.href}
									class="flex flex-col items-center justify-end space-y-1 p-3 rounded-2xl transition-all duration-300 hover:scale-105 group min-w-0 flex-1 relative {index === 2 ? 'mb-2' : ''}"
									class:active={$page.url.pathname === item.href}
								>
									<!-- All items get consistent glassy treatment with green theme -->
									<div class="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl shadow-lg border border-white/30 flex items-center justify-center {$page.url.pathname === item.href ? 'bg-white/30 shadow-xl scale-110' : 'hover:bg-white/25'} transition-all duration-300">
										<div class="w-6 h-6 {$page.url.pathname === item.href ? 'text-green-800' : 'text-white group-hover:text-green-200'} transition-colors">
											{@html item.icon}
										</div>
										<!-- Active indicator glow -->
										{#if $page.url.pathname === item.href}
											<div class="absolute -inset-1 bg-gradient-to-br from-green-400/30 to-emerald-400/30 rounded-2xl blur-sm"></div>
										{/if}
									</div>
									<span class="text-xs font-medium {$page.url.pathname === item.href ? 'text-green-800' : 'text-white/90 group-hover:text-white'} transition-colors mt-1 drop-shadow">
										{item.name}
									</span>
								</a>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>

	<!-- Voice Assistant Component -->
	<VoiceAssistant />

	<!-- Footer with Shivohm Logo -->
	<footer class="bg-white/80 backdrop-blur-xl border-t border-white/20 mt-16">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
			<div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
				<!-- Shivohm Logo and Attribution -->
				<div class="flex items-center space-x-3">
					<img
						src={shivohmLogo}
						alt="Shivohm Logo"
						class="w-8 h-8 object-contain"
					/>
					<div class="flex flex-col">
						<span class="text-sm font-medium text-gray-700">Powered by Shivohm</span>
						<span class="text-xs text-gray-500">Spiritual Technology Solutions</span>
					</div>
				</div>

				<!-- Copyright and Links -->
				<div class="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-600">
					<span>&copy; 2024 Divine Nest. All rights reserved.</span>
					<div class="flex space-x-4">
						<a href="/privacy" class="hover:text-blue-600 transition-colors">Privacy Policy</a>
						<a href="/terms" class="hover:text-blue-600 transition-colors">Terms of Service</a>
					</div>
				</div>
			</div>
		</div>
	</footer>
</div>

<style>
	@keyframes slide-in-from-top-2 {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-in {
		animation: slide-in-from-top-2 0.2s ease-out;
	}
</style>
