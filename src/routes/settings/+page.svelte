<script lang="ts">
	let activeTab = $state('preferences');
	import { currentBackgroundTheme, loadSavedTheme } from '$lib/stores/backgroundThemes';
	import BackgroundThemeSelector from '$lib/components/BackgroundThemeSelector.svelte';
	import { onMount } from 'svelte';

	// Load saved background theme
	onMount(() => {
		loadSavedTheme();
	});

	const tabs = [
		{ id: 'preferences', label: 'Preferences', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>' },
		{ id: 'security', label: 'Security', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>' },
		{ id: 'notifications', label: 'Notifications', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4.868 12.683A17.925 17.925 0 012 21h13.78a3 3 0 002.553-1.453c1.475-2.45 1.553-5.25.177-7.877-3.065-5.84 1.64-10.375 1.64-10.375s-5.83 3.061-8.895 8.901c-1.376 2.627-1.298 5.427.177 7.877A3 3 0 0113.78 21H2a3 3 0 01-2.553-1.453c-1.475-2.45-1.553-5.25-.177-7.877 3.065-5.84-1.64-10.375-1.64-10.375s5.83 3.061 8.895 8.901z"></path></svg>' }
	];

	const defaultWakeWords = [
		'Shiva', 'Shiv', 'Shish', 'Ish', 'Sish', 'Bro', 'Shakthi'
	];

	const wakeMethods = [
		{ id: 'wakeVolumeButtons', label: 'Volume UP/DOWN buttons (2 times)', description: 'Press volume up or down twice quickly' },
		{ id: 'wakeLongPressHome', label: 'Long Press Home Button', description: 'Hold home button for 2 seconds' },
		{ id: 'wakeLongPressBack', label: 'Long Press Back Button', description: 'Hold back button for 2 seconds' },
		{ id: 'wakeLongPressNext', label: 'Long Press Next Button', description: 'Hold next/forward button for 2 seconds' },
		{ id: 'wakeDoubleTapHome', label: 'Double Tap Home Screen', description: 'Double tap on empty home screen area' },
		{ id: 'wakeDoubleTapScreen', label: 'Double Tap Phone Screen', description: 'Double tap anywhere on screen (even when locked)' },
		{ id: 'wakeFrontCamera', label: 'Touch Front Camera Hole', description: 'Touch the front camera pinhole once' },
		{ id: 'wakeBackCamera', label: 'Touch Back Camera Hole', description: 'Touch the back camera pinhole once' }
	];

	// Preferences
	let preferences = $state({
		theme: 'light',
		notifications: true,
		emailAlerts: true,
		smsAlerts: false,
		voiceAssistant: true,
		locationServices: true,
		dataSharing: false,
		// Wake settings
		wakeWords: ['Shiva', 'Shiv'],
		customWakeWord: '',
		wakeVolumeButtons: false,
		wakeLongPressHome: false,
		wakeLongPressBack: false,
		wakeLongPressNext: false,
		wakeDoubleTapHome: false,
		wakeDoubleTapScreen: false,
		wakeFrontCamera: false,
		wakeBackCamera: false,
		// Role-based settings
		childSafetyMode: false,
		emergencyWakeEnabled: true,
		voiceGuidance: true,
		simplifiedInterface: false,
		parentalControls: false,
		elderlyAssistance: false,
		guestMode: false,
		adminPrivileges: false,
		// Family & Home features
		familyLocationSharing: false,
		smartHomeIntegration: false,
		mealPlanning: false,
		medicationReminders: false,
		emergencySOS: true,
		childMonitoring: false,
		homeMaintenance: false,
		recipeSuggestions: false
	});

	// Security settings
	let securityData = $state({
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
		twoFactorEnabled: false
	});

	// Notification settings
	let notificationSettings = $state({
		issues: true,
		requests: true,
		reminders: true,
		alerts: true,
		familyUpdates: true,
		systemUpdates: false
	});

	function savePreferences(event: Event) {
		event.preventDefault();
		// TODO: Implement save functionality
		console.log('Saving preferences:', preferences);
		showSnackBar('Preferences updated successfully!', 'success');
	}

	function changePassword(event: Event) {
		event.preventDefault();
		// TODO: Implement password change functionality
		if (securityData.newPassword !== securityData.confirmPassword) {
			showSnackBar('New passwords do not match!', 'error');
			return;
		}
		console.log('Changing password');
		showSnackBar('Password changed successfully!', 'success');
	}

	function saveNotifications(event: Event) {
		event.preventDefault();
		// TODO: Implement save functionality
		console.log('Saving notifications:', notificationSettings);
		showSnackBar('Notification settings saved!', 'success');
	}

	function addWakeWord(word: string) {
		if (word && !preferences.wakeWords.includes(word)) {
			preferences.wakeWords = [...preferences.wakeWords, word];
		}
	}

	function removeWakeWord(word: string) {
		preferences.wakeWords = preferences.wakeWords.filter(w => w !== word);
	}

	function showSnackBar(message: string, type: 'success' | 'error' | 'info' = 'info') {
		// TODO: Implement snackbar
		console.log(`${type}: ${message}`);
	}
</script>

<svelte:head>
	<title>Settings - Divine Nest</title>
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
		<div class="absolute inset-0 bg-gradient-to-tl from-transparent via-gray-100/3 to-transparent"></div>
	</div>

	<!-- Background Theme Selector -->
	<BackgroundThemeSelector />
	<!-- 3D Background Layers for Settings Page -->
	<div class="absolute inset-0 opacity-50">
		<!-- Primary settings gradient layer -->
		<div class="absolute inset-0 bg-gradient-to-br from-slate-400/30 via-gray-500/20 to-zinc-500/30"></div>
		
		<!-- Secondary depth layer -->
		<div class="absolute inset-0 bg-gradient-to-tl from-stone-600/20 via-neutral-400/15 to-gray-500/25"></div>
		
		<!-- Floating settings-themed shapes -->
		<div class="absolute top-28 left-24 w-44 h-44 bg-gradient-to-br from-slate-300/35 to-gray-400/25 rounded-full blur-xl animate-float-slow"></div>
		<div class="absolute top-56 right-32 w-36 h-36 bg-gradient-to-br from-zinc-300/30 to-stone-400/20 rounded-lg rotate-45 animate-float-medium"></div>
		<div class="absolute bottom-56 left-28 w-52 h-52 bg-gradient-to-br from-gray-300/25 to-slate-400/15 rounded-full blur-lg animate-float-fast"></div>
		<div class="absolute bottom-44 right-52 w-40 h-40 bg-gradient-to-br from-stone-300/35 to-zinc-400/25 rounded-xl rotate-12 animate-float-slow"></div>
		<div class="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-br from-neutral-300/40 to-slate-400/30 rounded-full blur-sm animate-float-medium"></div>
		<div class="absolute top-1/3 right-1/3 w-48 h-48 bg-gradient-to-br from-gray-300/30 to-stone-400/20 rounded-lg rotate-30 animate-float-fast"></div>
		
		<!-- Gear shapes for settings theme -->
		<div class="absolute top-48 left-2/3 w-28 h-28 bg-gradient-to-br from-gray-400/40 to-slate-500/30 rounded-full blur-md animate-float-slow" style="clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);"></div>
		<div class="absolute bottom-48 right-1/3 w-24 h-24 bg-gradient-to-br from-slate-400/35 to-gray-500/25 rounded-full blur-sm animate-float-medium" style="clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);"></div>
		
		<!-- Mesh overlay for 3D effect -->
		<div class="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
		<div class="absolute inset-0 bg-gradient-to-tl from-transparent via-gray-100/3 to-transparent"></div>
	</div>
	<h1 class="text-2xl font-bold mb-6 text-gray-800">Settings</h1>

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
	{#if activeTab === 'preferences'}
		<div class="glass-card p-6 rounded-xl">
			<h2 class="text-xl font-semibold mb-6">Preferences</h2>

			<form class="space-y-6" onsubmit={savePreferences}>
				<!-- Theme Settings -->
				<div class="bg-white/50 p-4 rounded-lg">
					<h3 class="font-semibold text-gray-800 mb-4">Appearance</h3>
					<div class="space-y-4">
						<div>
							<label for="theme" class="block text-sm font-medium text-gray-700 mb-2">Theme</label>
							<select
								id="theme"
								bind:value={preferences.theme}
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<option value="light">Light</option>
								<option value="dark">Dark</option>
								<option value="auto">Auto (System)</option>
							</select>
						</div>
					</div>
				</div>

				<!-- Notification Settings -->
				<div class="bg-white/50 p-4 rounded-lg">
					<h3 class="font-semibold text-gray-800 mb-4">Notifications</h3>
					<div class="space-y-4">
						<div class="flex items-center justify-between">
							<div>
								<span class="text-gray-700">Push Notifications</span>
								<p class="text-sm text-gray-500">Receive push notifications on your device</p>
							</div>
							<label class="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									bind:checked={preferences.notifications}
									class="sr-only peer"
								/>
								<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
							</label>
						</div>
						<div class="flex items-center justify-between">
							<div>
								<span class="text-gray-700">Email Alerts</span>
								<p class="text-sm text-gray-500">Receive important updates via email</p>
							</div>
							<label class="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									bind:checked={preferences.emailAlerts}
									class="sr-only peer"
								/>
								<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
							</label>
						</div>
						<div class="flex items-center justify-between">
							<div>
								<span class="text-gray-700">SMS Alerts</span>
								<p class="text-sm text-gray-500">Receive critical alerts via SMS</p>
							</div>
							<label class="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									bind:checked={preferences.smsAlerts}
									class="sr-only peer"
								/>
								<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
							</label>
						</div>
					</div>
				</div>

				<!-- Voice Assistant Settings -->
				<div class="bg-white/50 p-4 rounded-lg">
					<h3 class="font-semibold text-gray-800 mb-4">Voice Assistant</h3>
					<div class="space-y-4">
						<div class="flex items-center justify-between">
							<div>
								<span class="text-gray-700">Voice Assistant</span>
								<p class="text-sm text-gray-500">Enable voice commands and responses</p>
							</div>
							<label class="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									bind:checked={preferences.voiceAssistant}
									class="sr-only peer"
								/>
								<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
							</label>
						</div>

						<!-- Wake Words -->
						<div>
							<label for="wakeWords" class="block text-sm font-medium text-gray-700 mb-2">Wake Words</label>
							<div class="flex flex-wrap gap-2 mb-2">
								{#each preferences.wakeWords as word}
									<span class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
										{word}
										<button
											type="button"
											onclick={() => removeWakeWord(word)}
											class="ml-2 text-blue-600 hover:text-blue-800"
											aria-label={`Remove ${word}`}
										>
											<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
											</svg>
										</button>
									</span>
								{/each}
							</div>
							<div class="flex gap-2">
								<select
									bind:value={preferences.customWakeWord}
									class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								>
									<option value="">Select from common words</option>
									{#each defaultWakeWords as word}
										<option value={word}>{word}</option>
									{/each}
								</select>
								<input
									type="text"
									bind:value={preferences.customWakeWord}
									class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="Custom wake word"
									onkeydown={(e) => {
										if (e.key === 'Enter') {
											e.preventDefault();
											addWakeWord(preferences.customWakeWord);
											preferences.customWakeWord = '';
										}
									}}
								/>
								<button
									type="button"
									onclick={() => {
										addWakeWord(preferences.customWakeWord);
										preferences.customWakeWord = '';
									}}
									class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
								>
									Add
								</button>
							</div>
						</div>

						<!-- Wake Methods -->
						<div>
							<h4 class="block text-sm font-medium text-gray-700 mb-2">Wake Methods</h4>
							<div class="space-y-3">
								{#each wakeMethods as method}
									<div class="flex items-start space-x-3">
										<label class="relative inline-flex items-center cursor-pointer">
											<input
												type="checkbox"
												bind:checked={preferences[method.id as keyof typeof preferences] as boolean}
												class="sr-only peer"
											/>
											<div class="w-5 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:left-[1px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
										</label>
										<div class="flex-1">
											<div class="text-sm font-medium text-gray-700">{method.label}</div>
											<div class="text-xs text-gray-500">{method.description}</div>
										</div>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>

				<!-- Privacy Settings -->
				<div class="bg-white/50 p-4 rounded-lg">
					<h3 class="font-semibold text-gray-800 mb-4">Privacy & Data</h3>
					<div class="space-y-4">
						<div class="flex items-center justify-between">
							<div>
								<span class="text-gray-700">Location Services</span>
								<p class="text-sm text-gray-500">Allow access to location for personalized features</p>
							</div>
							<label class="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									bind:checked={preferences.locationServices}
									class="sr-only peer"
								/>
								<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
							</label>
						</div>
						<div class="flex items-center justify-between">
							<div>
								<span class="text-gray-700">Data Sharing</span>
								<p class="text-sm text-gray-500">Share anonymized data to improve our services</p>
							</div>
							<label class="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									bind:checked={preferences.dataSharing}
									class="sr-only peer"
								/>
								<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
							</label>
						</div>
					</div>
				</div>

				<div class="flex justify-end">
					<button
						type="submit"
						class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						Save Preferences
					</button>
				</div>
			</form>
		</div>
	{:else if activeTab === 'security'}
		<div class="glass-card p-6 rounded-xl">
			<h2 class="text-xl font-semibold mb-6">Security Settings</h2>

			<form class="space-y-6" onsubmit={changePassword}>
				<!-- Password Change -->
				<div class="bg-white/50 p-4 rounded-lg">
					<h3 class="font-semibold text-gray-800 mb-4">Change Password</h3>
					<div class="space-y-4">
						<div>
							<label for="currentPassword" class="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
							<input
								id="currentPassword"
								type="password"
								bind:value={securityData.currentPassword}
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
							/>
						</div>
						<div>
							<label for="newPassword" class="block text-sm font-medium text-gray-700 mb-1">New Password</label>
							<input
								id="newPassword"
								type="password"
								bind:value={securityData.newPassword}
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
							/>
						</div>
						<div>
							<label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
							<input
								id="confirmPassword"
								type="password"
								bind:value={securityData.confirmPassword}
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
							/>
						</div>
					</div>
				</div>

				<div class="flex justify-end">
					<button
						type="submit"
						class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						Change Password
					</button>
				</div>
			</form>
		</div>
	{:else if activeTab === 'notifications'}
		<div class="glass-card p-6 rounded-xl">
			<h2 class="text-xl font-semibold mb-6">Notification Settings</h2>

			<form class="space-y-6" onsubmit={saveNotifications}>
				<!-- Notification Preferences -->
				<div class="bg-white/50 p-4 rounded-lg">
					<h3 class="font-semibold text-gray-800 mb-4">Notification Preferences</h3>
					<div class="space-y-4">
						<div class="flex items-center justify-between">
							<div>
								<span class="text-gray-700">Reminders</span>
								<p class="text-sm text-gray-500">Daily reminders and scheduled notifications</p>
							</div>
							<label class="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									bind:checked={notificationSettings.reminders}
									class="sr-only peer"
								/>
								<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
							</label>
						</div>
						<div class="flex items-center justify-between">
							<div>
								<span class="text-gray-700">Alerts</span>
								<p class="text-sm text-gray-500">Emergency and urgent notifications</p>
							</div>
							<label class="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									bind:checked={notificationSettings.alerts}
									class="sr-only peer"
								/>
								<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
							</label>
						</div>
						<div class="flex items-center justify-between">
							<div>
								<span class="text-gray-700">Family Updates</span>
								<p class="text-sm text-gray-500">Updates about family activities and events</p>
							</div>
							<label class="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									bind:checked={notificationSettings.familyUpdates}
									class="sr-only peer"
								/>
								<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
							</label>
						</div>
						<div class="flex items-center justify-between">
							<div>
								<span class="text-gray-700">System Updates</span>
								<p class="text-sm text-gray-500">Updates about system changes and new features</p>
							</div>
							<label class="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									bind:checked={notificationSettings.systemUpdates}
									class="sr-only peer"
								/>
								<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
							</label>
						</div>
					</div>
				</div>

				<div class="flex justify-end">
					<button
						type="submit"
						class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						Save Notification Settings
					</button>
				</div>
			</form>
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