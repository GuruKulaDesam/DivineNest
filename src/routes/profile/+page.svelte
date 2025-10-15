<script lang="ts">
	let activeTab = $state('profile');
	let touchStartX = $state(0);
	let touchStartY = $state(0);
	let isEdgeSwipe = $state(false);

	// Modern Android Features
	let volumeLevel = $state(75);
	let isSnackBarVisible = $state(false);
	let snackBarMessage = $state('');
	let snackBarType = $state<'success' | 'error' | 'info'>('info');
	let isSeekBarDragging = $state(false);
	let topNavExpanded = $state(false);

	const tabs = [
		{ id: 'profile', label: 'Profile Settings', icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>' }
	];

	// Profile form data
	let profileData = $state({
		username: 'family_member',
		nickname: 'Family Member',
		email: 'family@example.com',
		phoneNumber: '',
		role: 'Parent', // Child, Parent, Relative, Visitor, Admin
		age: 35,
		location: 'New York, NY, USA',
		locationCoordinates: '',
		timezone: 'America/New_York',
		preferredLanguage: 'en',
		emergencyContact: '',
		emergencyContactPhone: '',
		pictureUrl: '',
		isActive: true
	});

	const userRoles = [
		{ value: 'Child', label: 'Child' },
		{ value: 'Parent', label: 'Parent' },
		{ value: 'Relative', label: 'Relative' },
		{ value: 'Visitor', label: 'Visitor' },
		{ value: 'Admin', label: 'Administrator' }
	];

	const languages = [
		{ value: 'en', label: 'English' },
		{ value: 'es', label: 'Spanish' },
		{ value: 'hi', label: 'Hindi' },
		{ value: 'te', label: 'Telugu' },
		{ value: 'ta', label: 'Tamil' }
	];

	const timezones = [
		{ value: 'America/New_York', label: 'Eastern Time (ET)' },
		{ value: 'America/Chicago', label: 'Central Time (CT)' },
		{ value: 'America/Denver', label: 'Mountain Time (MT)' },
		{ value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
		{ value: 'Asia/Kolkata', label: 'India Time (IST)' }
	];





	function saveProfile(event: Event) {
		event.preventDefault();
		// TODO: Implement save functionality
		console.log('Saving profile:', profileData);
		showSnackBar('Profile settings saved successfully!', 'success');
	}

	function showSnackBar(message: string, type: 'success' | 'error' | 'info' = 'info') {
		snackBarMessage = message;
		snackBarType = type;
		isSnackBarVisible = true;
		setTimeout(() => {
			isSnackBarVisible = false;
		}, 4000);
	}

	function handleSeekBarChange(event: Event) {
		const target = event.target as HTMLInputElement;
		volumeLevel = parseInt(target.value);
		showSnackBar(`Volume set to ${volumeLevel}%`, 'info');
	}

	function toggleTopNav() {
		topNavExpanded = !topNavExpanded;
	}

	function updateRoleBasedSettings() {
		// Reset all role-based settings
		// This function is kept for compatibility but no longer used since preferences moved to settings page
	}

	function getCurrentTabIndex() {
		return tabs.findIndex(tab => tab.id === activeTab);
	}	function getPrevTab() {
		const currentIndex = getCurrentTabIndex();
		const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
		return tabs[prevIndex];
	}

	function getNextTab() {
		const currentIndex = getCurrentTabIndex();
		const nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
		return tabs[nextIndex];
	}

	function navigateToTab(direction: 'prev' | 'next') {
		const currentIndex = getCurrentTabIndex();
		let newIndex;

		if (direction === 'prev') {
			newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
		} else {
			newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
		}

		activeTab = tabs[newIndex].id;
	}

	function handleTouchStart(event: TouchEvent) {
		const touch = event.touches[0];
		touchStartX = touch.clientX;
		touchStartY = touch.clientY;

		// Check if touch started near edges (within 50px of screen edges)
		const screenWidth = window.innerWidth;
		isEdgeSwipe = touchStartX < 50 || touchStartX > screenWidth - 50;
	}

	function handleTouchEnd(event: TouchEvent) {
		if (!isEdgeSwipe) return;

		const touch = event.changedTouches[0];
		const touchEndX = touch.clientX;
		const touchEndY = touch.clientY;

		const deltaX = touchEndX - touchStartX;
		const deltaY = touchEndY - touchStartY;

		// Only consider horizontal swipes (more horizontal than vertical movement)
		if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
			if (touchStartX < 50 && deltaX > 0) {
				// Swipe right from left edge = previous page
				navigateToTab('prev');
			} else if (touchStartX > window.innerWidth - 50 && deltaX < 0) {
				// Swipe left from right edge = next page
				navigateToTab('next');
			}
		}

		isEdgeSwipe = false;
	}

	// Update role-based settings when role changes
	$effect(() => {
		updateRoleBasedSettings();
	});
</script>

<svelte:head>
	<title>User Profile Settings - Divine Nest</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 pb-20">

	<!-- Top Navigation Bar - Xbox Blade Style -->
	<div class="fixed top-0 left-0 right-0 z-30 glass-nav elevation-2 animate-slideDown">
		<div class="flex items-center justify-between px-4 py-3">
			<!-- Left Section with Logo and Greeting -->
			<div class="flex items-center space-x-4">
				<!-- Divine Nest Logo -->
				<div class="flex items-center space-x-2">
					<img
						src="/Divine_Nest_Logo_Light.png"
						alt="Divine Nest Logo"
						class="w-8 h-8 object-contain"
					/>
					<div class="flex flex-col">
						<span class="text-xs text-gray-500 uppercase tracking-wide">Welcome back</span>
						<span class="text-sm font-semibold text-gray-700">
							{profileData.nickname || profileData.username || 'Family Member'}
						</span>
					</div>
				</div>
			</div>

			<!-- Center Section - Dynamic Seek Bar -->
			<div class="flex-1 max-w-xs mx-4">
				<div class="flex items-center space-x-3">
					<svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
					</svg>
					<div class="flex-1 relative">
						<input
							type="range"
							min="0"
							max="100"
							bind:value={volumeLevel}
							oninput={handleSeekBarChange}
							class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
						/>
						<div class="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 font-medium">
							{volumeLevel}%
						</div>
					</div>
				</div>
			</div>

			<!-- Right Section -->
			<div class="flex items-center space-x-2">
				<button
					class="ripple p-2 rounded-xl bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-300 border border-green-200/50 shadow-sm"
					onclick={() => showSnackBar('Settings synchronized!', 'success')}
					aria-label="Sync"
				>
					<svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
					</svg>
				</button>
				<button
					class="ripple p-2 rounded-xl bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all duration-300 border border-purple-200/50 shadow-sm"
					onclick={() => showSnackBar('Help & Support', 'info')}
					aria-label="Help"
				>
					<svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
					</svg>
				</button>
			</div>
		</div>
	</div>

	<!-- Add padding for fixed top nav -->
	<div class="pt-16">

	<!-- Xbox 360 Blades-Style Navigation -->
	<div class="relative mb-8">
		<!-- Main Navigation Bar -->
		<div class="flex items-center justify-center bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/20">
			<!-- Previous Page -->
			<button
				class="flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 border border-blue-200/50 shadow-sm"
				onclick={() => navigateToTab('prev')}
				aria-label={`Go to ${getPrevTab().label}`}
			>
				<svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
				</svg>
				<div class="text-left">
					<div class="text-xs text-blue-600 font-medium uppercase tracking-wide">Previous</div>
					<div class="text-sm font-semibold text-blue-800">{getPrevTab().label}</div>
				</div>
			</button>

			<!-- Current Page Indicator -->
			<div class="mx-8 text-center">
				<div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
					<span class="text-white font-bold text-lg">{getCurrentTabIndex() + 1}</span>
				</div>
				<div class="mt-2 text-sm font-semibold text-gray-700">{tabs.find(tab => tab.id === activeTab)?.label}</div>
				<div class="text-xs text-gray-500">{getCurrentTabIndex() + 1} of {tabs.length}</div>
			</div>

			<!-- Next Page -->
			<button
				class="flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-300 border border-green-200/50 shadow-sm"
				onclick={() => navigateToTab('next')}
				aria-label={`Go to ${getNextTab().label}`}
			>
				<div class="text-right">
					<div class="text-xs text-green-600 font-medium uppercase tracking-wide">Next</div>
					<div class="text-sm font-semibold text-green-800">{getNextTab().label}</div>
				</div>
				<svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
				</svg>
			</button>
		</div>

		<!-- Progress Bar -->
		<div class="mt-4 flex justify-center">
			<div class="flex space-x-2">
				{#each tabs as tab, index}
					<div
						class="h-1 rounded-full transition-all duration-500 {activeTab === tab.id ? 'bg-blue-500 w-8' : 'bg-gray-300 w-4'}"
					></div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Xbox 360 Blades-Style Edge Navigation -->
	<div class="fixed left-4 top-1/2 transform -translate-y-1/2 z-20 pointer-events-none">
		<div class="bg-gradient-to-r from-blue-500/20 to-blue-500/5 backdrop-blur-sm rounded-r-2xl p-4 border-r border-blue-300/30 shadow-lg">
			<div class="flex items-center space-x-3">
				<svg class="w-6 h-6 text-blue-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
				</svg>
				<div class="text-left">
					<div class="text-xs text-blue-700 font-bold uppercase tracking-wider">PREV</div>
					<div class="text-sm font-semibold text-blue-800">{getPrevTab().label}</div>
				</div>
			</div>
		</div>
	</div>

	<div class="fixed right-4 top-1/2 transform -translate-y-1/2 z-20 pointer-events-none">
		<div class="bg-gradient-to-l from-green-500/20 to-green-500/5 backdrop-blur-sm rounded-l-2xl p-4 border-l border-green-300/30 shadow-lg">
			<div class="flex items-center space-x-3">
				<div class="text-right">
					<div class="text-xs text-green-700 font-bold uppercase tracking-wider">NEXT</div>
					<div class="text-sm font-semibold text-green-800">{getNextTab().label}</div>
				</div>
				<svg class="w-6 h-6 text-green-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
				</svg>
			</div>
		</div>
	</div>

	<!-- Tab Content -->
	{#if activeTab === 'profile'}
		<div class="glass-card p-6 rounded-xl">
			<h2 class="text-xl font-semibold mb-6">Personal Information</h2>

			<form class="space-y-6" onsubmit={saveProfile}>
				<!-- Basic Information -->
				<div class="bg-white/50 p-4 rounded-lg">
					<h3 class="font-semibold text-gray-800 mb-4">Basic Information</h3>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label for="username" class="block text-sm font-medium text-gray-700 mb-1">Username</label>
							<input
								id="username"
								type="text"
								bind:value={profileData.username}
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
							/>
						</div>
						<div>
							<label for="nickname" class="block text-sm font-medium text-gray-700 mb-1">Nickname</label>
							<input
								id="nickname"
								type="text"
								bind:value={profileData.nickname}
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
							<input
								id="email"
								type="email"
								bind:value={profileData.email}
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label for="phoneNumber" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
							<input
								id="phoneNumber"
								type="tel"
								bind:value={profileData.phoneNumber}
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label for="role" class="block text-sm font-medium text-gray-700 mb-1">Role</label>
							<select
								id="role"
								bind:value={profileData.role}
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								{#each userRoles as role}
									<option value={role.value}>{role.label}</option>
								{/each}
							</select>
						</div>
						<div>
							<label for="age" class="block text-sm font-medium text-gray-700 mb-1">Age</label>
							<input
								id="age"
								type="number"
								bind:value={profileData.age}
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								min="1"
								max="120"
							/>
						</div>
						<div>
							<label for="location" class="block text-sm font-medium text-gray-700 mb-1">Location</label>
							<input
								id="location"
								type="text"
								bind:value={profileData.location}
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label for="timezone" class="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
							<select
								id="timezone"
								bind:value={profileData.timezone}
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								{#each timezones as tz}
									<option value={tz.value}>{tz.label}</option>
								{/each}
							</select>
						</div>
						<div>
							<label for="preferredLanguage" class="block text-sm font-medium text-gray-700 mb-1">Preferred Language</label>
							<select
								id="preferredLanguage"
								bind:value={profileData.preferredLanguage}
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								{#each languages as lang}
									<option value={lang.value}>{lang.label}</option>
								{/each}
							</select>
						</div>
					</div>
				</div>

				<!-- Emergency Contact -->
				<div class="bg-white/50 p-4 rounded-lg">
					<h3 class="font-semibold text-gray-800 mb-4">Emergency Contact</h3>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label for="emergencyContact" class="block text-sm font-medium text-gray-700 mb-1">Emergency Contact Name</label>
							<input
								id="emergencyContact"
								type="text"
								bind:value={profileData.emergencyContact}
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label for="emergencyContactPhone" class="block text-sm font-medium text-gray-700 mb-1">Emergency Contact Phone</label>
							<input
								id="emergencyContactPhone"
								type="tel"
								bind:value={profileData.emergencyContactPhone}
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
					</div>
				</div>

				<div class="flex justify-end">
					<button
						type="submit"
						class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						Save Profile
					</button>
				</div>
			</form>
		</div>
	{/if}
</div>
</div>

<style>
	.glass-card {
		background: rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.18);
		transition: all 0.3s ease-in-out;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
	}

	/* Xbox 360 Blades-style animations */
	.glass-card {
		animation: bladeSlideIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}

	@keyframes bladeSlideIn {
		from {
			opacity: 0;
			transform: translateX(30px) scale(0.95);
		}
		to {
			opacity: 1;
			transform: translateX(0) scale(1);
		}
	}

	/* Xbox 360-style glow effects */
	.fixed.left-4 > div, .fixed.right-4 > div {
		box-shadow:
			0 0 20px rgba(59, 130, 246, 0.3),
			0 0 40px rgba(59, 130, 246, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
	}

	.fixed.right-4 > div {
		box-shadow:
			0 0 20px rgba(34, 197, 94, 0.3),
			0 0 40px rgba(34, 197, 94, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
	}

	/* Navigation buttons with Xbox 360 feel */
	button:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
	}

	/* Progress bar animation */
	.h-1 {
		transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}

	/* Current page indicator glow */
	.w-16 {
		box-shadow:
			0 0 30px rgba(59, 130, 246, 0.4),
			0 0 60px rgba(59, 130, 246, 0.2),
			inset 0 2px 4px rgba(255, 255, 255, 0.1);
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0%, 100% {
			box-shadow:
				0 0 30px rgba(59, 130, 246, 0.4),
				0 0 60px rgba(59, 130, 246, 0.2),
				inset 0 2px 4px rgba(255, 255, 255, 0.1);
		}
		50% {
			box-shadow:
				0 0 40px rgba(59, 130, 246, 0.6),
				0 0 80px rgba(59, 130, 246, 0.3),
				inset 0 2px 4px rgba(255, 255, 255, 0.2);
		}
	}

	/* Responsive design for Xbox Blades feel */
	@media (max-width: 768px) {
		.fixed.left-4, .fixed.right-4 {
			display: block;
		}

		/* Make edge navigation more prominent on mobile */
		.fixed.left-4 > div, .fixed.right-4 > div {
			padding: 0.75rem;
			min-width: 140px;
		}
	}

	@media (min-width: 769px) {
		.fixed.left-4, .fixed.right-4 {
			display: block;
		}
	}

	/* Xbox 360-style text effects */
	.uppercase {
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
	}

	/* Modern Android Seek Bar Styling */
	.slider-thumb::-webkit-slider-thumb {
		appearance: none;
		height: 20px;
		width: 20px;
		border-radius: 50%;
		background: linear-gradient(135deg, #3b82f6, #1d4ed8);
		cursor: pointer;
		box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
		transition: all 0.2s ease;
	}

	.slider-thumb::-webkit-slider-thumb:hover {
		transform: scale(1.1);
		box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
	}

	.slider-thumb::-webkit-slider-track {
		background: linear-gradient(90deg, #e5e7eb, #d1d5db);
		height: 8px;
		border-radius: 4px;
	}

	.slider-thumb::-moz-range-thumb {
		height: 20px;
		width: 20px;
		border-radius: 50%;
		background: linear-gradient(135deg, #3b82f6, #1d4ed8);
		cursor: pointer;
		border: none;
		box-shadow: 0 2px 6px rgba(59, 130, 246, 0.3);
	}

	/* Modern Android Animations */
	@keyframes slideUp {
		from {
			transform: translateY(100%);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@keyframes slideDown {
		from {
			transform: translateY(-100%);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.animate-slideDown {
		animation: slideDown 0.3s ease-out;
	}

	/* Material Design Elevation */
	.elevation-2 {
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
	}

	/* Ripple Effect */
	.ripple {
		position: relative;
		overflow: hidden;
	}

	.ripple::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 0;
		height: 0;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.3);
		transform: translate(-50%, -50%);
		transition: width 0.6s, height 0.6s;
	}

	.ripple:active::before {
		width: 300px;
		height: 300px;
	}

	/* Glass morphism effects */
	.glass-nav {
		background: rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.2);
	}
</style>