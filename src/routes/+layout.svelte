<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import VoiceAssistant from '$lib/components/VoiceAssistant.svelte';
	import { page } from '$app/stores';

	let { children } = $props();
	let showMenu = $state(false);

	const navItems = [
		{ name: 'Home', href: '/', icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>' },
		{ name: 'Calendar', href: '/calendar', icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>' },
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

<div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-['Inter'] antialiased">
	<!-- Modern Top Header -->
	<header class="bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg sticky top-0 z-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between items-center h-16">
				<!-- Logo/Brand with Greeting -->
				<div class="flex items-center space-x-4">
					<!-- Divine Nest Logo -->
					<div class="flex items-center space-x-3">
						<img
							src="/Divine_Nest_Logo_Light.png"
							alt="Divine Nest Logo"
							class="w-10 h-10 object-contain"
						/>
						<div class="flex flex-col">
							<h1 class="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
								Divine Nest
							</h1>
							<span class="text-xs text-gray-500 uppercase tracking-wide">Welcome Home</span>
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

	<!-- Modern Curved Bottom Navigation -->
	<nav class="fixed bottom-0 left-0 right-0 z-40">
		<!-- Curved background -->
		<div class="relative">
			<!-- Main navigation background with curve -->
			<div class="bg-white/95 backdrop-blur-xl shadow-2xl relative overflow-hidden">
				<!-- Top curve -->
				<svg class="absolute top-0 left-0 w-full h-8" viewBox="0 0 400 32" preserveAspectRatio="none">
					<path d="M0,32 Q200,0 400,32 L400,0 L0,0 Z" fill="rgba(255,255,255,0.95)"/>
				</svg>

				<div class="relative pt-4 pb-2">
					<div class="max-w-7xl mx-auto px-4">
						<div class="flex justify-around items-end">
							{#each navItems as item, index}
								<a
									href={item.href}
									class="flex flex-col items-center justify-end space-y-1 p-2 rounded-xl transition-all duration-300 hover:scale-105 group min-w-0 flex-1 relative {index === 2 ? 'mb-4' : ''}"
									class:active={$page.url.pathname === item.href}
								>
									<!-- Center item gets special treatment -->
									{#if index === 2}
										<!-- Center item background circle -->
										<div class="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg border-4 border-white flex items-center justify-center {$page.url.pathname === item.href ? 'scale-110' : ''} transition-transform duration-300">
											<div class="w-8 h-8 text-white {$page.url.pathname === item.href ? 'scale-110' : ''} transition-transform duration-300">
												{@html item.icon}
											</div>
											<!-- Active indicator ring -->
											{#if $page.url.pathname === item.href}
												<div class="absolute -inset-1 border-2 border-red-300 rounded-full animate-pulse"></div>
											{/if}
										</div>
										<!-- Center item label -->
										<span class="text-xs font-bold text-red-600 {$page.url.pathname === item.href ? 'text-red-700' : ''} transition-colors mt-8">
											{item.name}
										</span>
									{:else}
										<!-- Regular items -->
										<div class="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors {$page.url.pathname === item.href ? 'text-blue-600' : ''}">
											{@html item.icon}
										</div>
										<span class="text-xs font-medium text-gray-600 group-hover:text-blue-600 transition-colors {$page.url.pathname === item.href ? 'text-blue-600' : ''} truncate">
											{item.name}
										</span>
										{#if $page.url.pathname === item.href}
											<div class="w-1 h-1 bg-blue-600 rounded-full"></div>
										{/if}
									{/if}
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
