<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import divineNestLogo from '$lib/assets/Divine_Nest_Logo_Light.svg';
	import shivohmLogo from '$lib/assets/Shivohm_Logo.svg';
	import VoiceAssistant from '$lib/components/VoiceAssistant.svelte';
	import RemindersBar from '$lib/components/RemindersBar.svelte';
	import TableOverview from '$lib/components/TableOverview.svelte';
	import { page } from '$app/stores';
	import { userStore } from '$lib/stores/user';
	import { onMount } from 'svelte';

	let { children } = $props();
	let showMenu = $state(false);
	let showRemindersBar = $state(false);

	// Load user data on mount
	onMount(() => {
		userStore.loadFromStorage();
	});

	interface NavItem {
		name: string;
		icon: string;
		color: string;
		href?: string;
		action?: string;
	}

	const navItems: NavItem[] = [
		{ name: 'Home', href: '/', icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>', color: 'text-cyan-300' },
		{ name: 'Calendar', href: '/calendar', icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>', color: 'text-blue-300' },
		{ name: 'Duties', href: '/duties', icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>', color: 'text-emerald-300' },
		{ name: 'Issues', href: '/issues', icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>', color: 'text-violet-300' },
		{ name: 'Responsibility', href: '/responsibility', icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>', color: 'text-indigo-300' },
		{ name: 'Reminders', action: 'toggleReminders', icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>', color: 'text-rose-300' }
	];

	const menuItems = [
		{ name: 'Profile', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>', href: '/profile' },
		{ name: 'Communication', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>', href: '/communication' },
		{ name: 'Learning', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>', href: '/learning' },
		{ name: 'Wellness', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>', href: '/wellness' },
		{ name: 'Karma', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>', href: '/karma' },
		{ name: 'Guests', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>', href: '/guests' },
		{ name: 'Environment', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"></path></svg>', href: '/environment' },
		{ name: 'Foods', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>', href: '/foods' },
		{ name: 'Inventory', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>', href: '/inventory' },
		{ name: 'Activities', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>', href: '/activities' },
		{ name: 'Finances', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path></svg>', href: '/finances' },
		{ name: 'Assets', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>', href: '/assets' },
		{ name: 'Family', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>', href: '/family' },
		{ name: 'Settings', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>', href: '/settings' },
		{ name: 'All Tables', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>', href: '/tables' }
	];

	function toggleMenu() {
		showMenu = !showMenu;
	}

	function toggleReminders() {
		showRemindersBar = !showRemindersBar;
	}

	function handleMenuClick(item: any) {
		if (item.href) {
			window.location.href = item.href;
		}
		showMenu = false;
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 font-['Inter'] antialiased">
	<!-- Modern Top Header with Glass-Inspired Background -->
	<header class="relative overflow-hidden">
		<!-- Elegant Glass Background -->
		<div class="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
			<!-- Glass morphism overlay with subtle patterns -->
			<div class="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5">
				<!-- Subtle geometric patterns -->
				<div class="absolute inset-0 opacity-10">
					<svg class="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="xMidYMid slice">
						<defs>
							<pattern id="glass-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
								<!-- Hexagonal glass facets -->
								<path d="M30,5 L45,15 L45,35 L30,45 L15,35 L15,15 Z" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>
								<path d="M30,5 L45,15 L30,25 L15,15 Z" fill="rgba(255,255,255,0.03)"/>
								<path d="M30,25 L45,35 L30,45 L15,35 Z" fill="rgba(255,255,255,0.02)"/>
							</pattern>
						</defs>
						<rect width="100%" height="100%" fill="url(#glass-pattern)"/>
					</svg>
				</div>
			</div>
			<!-- Enhanced glass overlay -->
			<div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 backdrop-blur-[1px]"></div>
		</div>

		<!-- Header Content -->
		<div class="relative z-10 bg-white/10 backdrop-blur-2xl border-b border-white/20 shadow-2xl">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex justify-between items-center h-16">
					<!-- Logo/Brand with Greeting -->
					<div class="flex items-center space-x-4">
						<!-- Divine Nest Logo -->
						<div class="flex items-center space-x-3">
							<img
								src={divineNestLogo}
								alt="Divine Nest Logo"
								class="w-8 h-8 object-contain drop-shadow-lg"
							/>
							<div class="flex flex-col">
								<h1 class="text-lg font-bold text-white drop-shadow-2xl">
									Greetings {$userStore.nickname}!
								</h1>
								<span class="text-xs text-slate-200 uppercase tracking-wide drop-shadow-lg">Welcome to Divine Nest</span>
							</div>
						</div>
					</div>

				<!-- User Menu -->
				<div class="relative">
					<button
						onclick={toggleMenu}
						class="flex items-center space-x-2 p-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group shadow-lg"
						aria-label="User menu"
					>
						<div class="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-inner">
							<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
							</svg>
						</div>
						<svg class="w-4 h-4 text-white/80 group-hover:text-white transition-colors drop-shadow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
						</svg>
					</button>

					<!-- Dropdown Menu -->
					{#if showMenu}
						<div class="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/30 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
							<div class="p-2">
								{#each menuItems as item}
									<a
										href={item.href}
										class="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-700 hover:bg-slate-50/80 hover:text-slate-800 rounded-xl transition-all duration-200 group"
										onclick={() => showMenu = false}
									>
											<div class="w-8 h-8 bg-slate-100/80 backdrop-blur-sm group-hover:bg-slate-200/80 rounded-lg flex items-center justify-center transition-colors border border-white/20">
												<span class="text-slate-600 group-hover:text-slate-700">{@html item.icon}</span>
											</div>
											<span class="font-medium">{item.name}</span>
										</a>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="flex-1">
		{@render children()}
	</main>

	<!-- Modern Curved Bottom Navigation with Glass Theme -->
	<nav class="fixed bottom-0 left-0 right-0 z-40">
		<!-- Curved background -->
		<div class="relative">
			<!-- Main navigation background with enhanced glass curve -->
			<div class="bg-gradient-to-r from-slate-800/90 via-slate-700/90 to-slate-800/90 backdrop-blur-2xl shadow-2xl relative overflow-hidden border-t border-white/20">
				<!-- Top curve with glass effect -->
				<svg class="absolute top-0 left-0 w-full h-8" viewBox="0 0 400 32" preserveAspectRatio="none">
					<path d="M0,32 Q200,0 400,32 L400,0 L0,0 Z" fill="rgba(148, 163, 184, 0.15)"/>
				</svg>

				<div class="relative pt-4 pb-2">
					<div class="max-w-7xl mx-auto px-4">
						<div class="flex justify-around items-end">
							{#each navItems as item, index}
								{#if item.action}
									<button
										onclick={() => handleMenuClick(item)}
										class="flex flex-col items-center justify-end space-y-1 p-3 rounded-2xl transition-all duration-300 hover:scale-105 group min-w-0 flex-1 relative {index === 2 ? 'mb-2' : ''}"
										class:active={showRemindersBar && item.action === 'toggleReminders'}
									>
										<!-- Enhanced glass icon containers -->
										<div class="w-12 h-12 bg-white/15 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 flex items-center justify-center {(showRemindersBar && item.action === 'toggleReminders') ? 'bg-white/25 shadow-2xl scale-110 border-white/30' : 'hover:bg-white/20'} transition-all duration-300">
											<div class="w-6 h-6 {(showRemindersBar && item.action === 'toggleReminders') ? 'text-slate-800' : 'text-white/90 group-hover:text-white'} transition-colors drop-shadow-lg">
												{@html item.icon}
											</div>
											<!-- Enhanced active indicator glow -->
											{#if showRemindersBar && item.action === 'toggleReminders'}
												<div class="absolute -inset-1 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-2xl blur-md"></div>
											{/if}
										</div>
										<span class="text-xs font-medium {(showRemindersBar && item.action === 'toggleReminders') ? 'text-slate-800' : 'text-white/90 group-hover:text-white'} transition-colors mt-1 drop-shadow-lg">
											{item.name}
										</span>
									</button>
								{:else}
									<a
										href={item.href}
										class="flex flex-col items-center justify-end space-y-1 p-3 rounded-2xl transition-all duration-300 hover:scale-105 group min-w-0 flex-1 relative {index === 2 ? 'mb-2' : ''}"
										class:active={$page.url.pathname === item.href}
									>
										<!-- Enhanced glass icon containers -->
										<div class="w-12 h-12 bg-white/15 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 flex items-center justify-center {$page.url.pathname === item.href ? 'bg-white/25 shadow-2xl scale-110 border-white/30' : 'hover:bg-white/20'} transition-all duration-300">
											<div class="w-6 h-6 {$page.url.pathname === item.href ? 'text-slate-800' : 'text-white/90 group-hover:text-white'} transition-colors drop-shadow-lg">
												{@html item.icon}
											</div>
											<!-- Enhanced active indicator glow -->
											{#if $page.url.pathname === item.href}
												<div class="absolute -inset-1 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-2xl blur-md"></div>
											{/if}
										</div>
										<span class="text-xs font-medium {$page.url.pathname === item.href ? 'text-slate-800' : 'text-white/90 group-hover:text-white'} transition-colors mt-1 drop-shadow-lg">
											{item.name}
										</span>
									</a>
								{/if}
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>

	<!-- Voice Assistant Component -->
	<VoiceAssistant />

	<!-- Reminders Bar Component -->
	<RemindersBar bind:showRemindersBar />

	<!-- Table Overview Component -->
	<TableOverview />

	<!-- Footer with Shivohm Logo -->
	<footer class="bg-white/80 backdrop-blur-2xl border-t border-white/30 mt-16 shadow-lg">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
			<div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
				<!-- Shivohm Logo and Attribution -->
				<div class="flex items-center space-x-3">
					<img
						src={shivohmLogo}
						alt="Shivohm Logo"
						class="w-8 h-8 object-contain drop-shadow-lg"
					/>
					<div class="flex flex-col">
						<span class="text-sm font-medium text-slate-700 drop-shadow">Powered by Shivohm</span>
						<span class="text-xs text-slate-500">Spiritual Technology Solutions</span>
					</div>
				</div>

				<!-- Copyright and Links -->
				<div class="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-slate-600">
					<span>&copy; 2024 Divine Nest. All rights reserved.</span>
					<div class="flex space-x-4">
						<a href="/privacy" class="hover:text-slate-800 transition-colors drop-shadow">Privacy Policy</a>
						<a href="/terms" class="hover:text-slate-800 transition-colors drop-shadow">Terms of Service</a>
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
