<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { currentBackgroundTheme, loadSavedTheme } from '$lib/stores/backgroundThemes';
	import BackgroundThemeSelector from '$lib/components/BackgroundThemeSelector.svelte';

	// Current date state
	let currentDate = $state(new Date());
	let selectedDate = $state(new Date());

	// Calendar events store
	let events = $state<Array<{
		id: string;
		title: string;
		date: Date;
		startTime: string;
		endTime: string;
		location?: string;
		description?: string;
		recurring?: 'daily' | 'weekly' | 'monthly' | 'yearly';
		alerts?: boolean;
		color?: string;
		timeBlock: string;
	}>>([]);

	// View mode: 'daily', 'weekly', 'monthly'
	let viewMode = $state<'daily' | 'weekly' | 'monthly'>('daily');

	// Language: 'english' or 'tamil'
	let language = $state<'english' | 'tamil'>('english');

	// Swipe handling
	let startX = $state(0);
	let startY = $state(0);
	let isSwiping = $state(false);
	let calendarElement: HTMLElement;

	// Event creation modal
	let showEventModal = $state(false);
	let selectedTimeBlock = $state<'morning' | 'noon' | 'afternoon' | 'night'>('morning');
	let newEvent = $state({
		title: '',
		description: '',
		startTime: '',
		endTime: '',
		location: '',
		recurring: '' as 'daily' | 'weekly' | 'monthly' | 'yearly' | '',
		alerts: false,
		alertMinutes: 15
	});

	// Time blocks configuration - now dynamic
	let timeBlocks = $state([
		{ id: 'morning', label: { english: 'Morning', tamil: 'காலை' }, time: '6:00 - 12:00', color: 'from-orange-500 to-amber-600', startHour: 6, endHour: 12 },
		{ id: 'noon', label: { english: 'Noon', tamil: 'மதியம்' }, time: '12:00 - 18:00', color: 'from-yellow-500 to-orange-600', startHour: 12, endHour: 18 },
		{ id: 'afternoon', label: { english: 'Afternoon', tamil: 'மாலை' }, time: '18:00 - 21:00', color: 'from-blue-600 to-indigo-700', startHour: 18, endHour: 21 },
		{ id: 'night', label: { english: 'Night', tamil: 'இரவு' }, time: '21:00 - 6:00', color: 'from-purple-600 to-pink-700', startHour: 21, endHour: 6 }
	]);

	// Add new time block modal
	let showAddBlockModal = $state(false);
	let newBlock = $state({
		labelEnglish: '',
		labelTamil: '',
		startHour: 0,
		endHour: 0,
		color: 'from-gray-600 to-gray-700'
	});

	// Day colors based on day of week
	const dayColors: Record<number, string> = {
		0: 'from-blue-100 to-blue-200', // Sunday
		1: 'from-green-100 to-green-200', // Monday
		2: 'from-yellow-100 to-yellow-200', // Tuesday
		3: 'from-orange-100 to-orange-200', // Wednesday
		4: 'from-red-100 to-red-200', // Thursday
		5: 'from-purple-100 to-purple-200', // Friday
		6: 'from-pink-100 to-pink-200' // Saturday
	};

	// Load saved background theme
	onMount(async () => {
		loadSavedTheme();
		await fetchWeather();
		
		// Mock events data
		events = [
			{
				id: '1',
				title: 'Morning Prayer',
				date: new Date(),
				startTime: '06:00',
				endTime: '07:00',
				location: 'Home Temple',
				description: 'Daily morning prayers',
				recurring: 'daily',
				alerts: true,
				color: 'bg-orange-200',
				timeBlock: 'morning'
			},
			{
				id: '2',
				title: 'School Pickup',
				date: new Date(),
				startTime: '15:30',
				endTime: '16:00',
				location: 'School',
				description: 'Pick up children from school',
				recurring: 'daily',
				alerts: true,
				color: 'bg-blue-200',
				timeBlock: 'afternoon'
			}
		];
	});

	function navigateDate(direction: 'prev' | 'next') {
		const newDate = new Date(selectedDate);
		if (direction === 'prev') {
			newDate.setDate(newDate.getDate() - 1);
		} else {
			newDate.setDate(newDate.getDate() + 1);
		}
		selectedDate = newDate;
	}

	function handleTouchStart(event: TouchEvent) {
		startX = event.touches[0].clientX;
		startY = event.touches[0].clientY;
		isSwiping = true;
	}

	function handleTouchEnd(event: TouchEvent) {
		if (!isSwiping) return;

		const endX = event.changedTouches[0].clientX;
		const endY = event.changedTouches[0].clientY;
		const deltaX = endX - startX;
		const deltaY = endY - startY;

		// Determine if it's a horizontal or vertical swipe
		if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
			// Horizontal swipe - navigate dates
			if (deltaX > 0) {
				navigateDate('prev'); // Swipe right = previous day
			} else {
				navigateDate('next'); // Swipe left = next day
			}
		} else if (Math.abs(deltaY) > 50) {
			// Vertical swipe - change view mode
			toggleViewMode();
		}

		isSwiping = false;
	}

	function getEventsForDate(date: Date, timeBlock?: string) {
		return events.filter(event => {
			const eventDate = new Date(event.date);
			const isSameDate = eventDate.toDateString() === date.toDateString();
			const isSameBlock = !timeBlock || event.timeBlock === timeBlock;
			return isSameDate && isSameBlock;
		});
	}

	function formatDate(date: Date): string {
		const options: Intl.DateTimeFormatOptions = {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		};
		return date.toLocaleDateString(language === 'english' ? 'en-US' : 'ta-IN', options);
	}

	function toggleViewMode() {
		const views: Array<'daily' | 'weekly' | 'monthly'> = ['daily', 'weekly', 'monthly'];
		const currentIndex = views.indexOf(viewMode);
		const nextIndex = (currentIndex + 1) % views.length;
		viewMode = views[nextIndex];
	}

	function getNextViewModeName(): string {
		const views: Array<'daily' | 'weekly' | 'monthly'> = ['daily', 'weekly', 'monthly'];
		const currentIndex = views.indexOf(viewMode);
		const nextIndex = (currentIndex + 1) % views.length;
		const nextView = views[nextIndex];
		
		if (language === 'english') {
			switch (nextView) {
				case 'daily': return 'Daily';
				case 'weekly': return 'Weekly';
				case 'monthly': return 'Monthly';
			}
		} else {
			switch (nextView) {
				case 'daily': return 'தினசரி';
				case 'weekly': return 'வாராந்திர';
				case 'monthly': return 'மாதாந்திர';
			}
		}
		return '';
	}

	function toggleLanguage() {
		language = language === 'english' ? 'tamil' : 'english';
	}

	function createEvent(timeBlock: string) {
		selectedTimeBlock = timeBlock as 'morning' | 'noon' | 'afternoon' | 'night';
		// Set default times based on time block
		switch (timeBlock) {
			case 'morning':
				newEvent.startTime = '06:00';
				newEvent.endTime = '07:00';
				break;
			case 'noon':
				newEvent.startTime = '12:00';
				newEvent.endTime = '13:00';
				break;
			case 'afternoon':
				newEvent.startTime = '18:00';
				newEvent.endTime = '19:00';
				break;
			case 'night':
				newEvent.startTime = '21:00';
				newEvent.endTime = '22:00';
				break;
		}
		showEventModal = true;
	}

	function saveEvent() {
		if (!newEvent.title.trim()) return;

		const event = {
			id: Date.now().toString(),
			title: newEvent.title,
			date: selectedDate,
			startTime: newEvent.startTime,
			endTime: newEvent.endTime,
			location: newEvent.location || undefined,
			description: newEvent.description || undefined,
			recurring: newEvent.recurring || undefined,
			alerts: newEvent.alerts,
			color: getTimeBlockColor(selectedTimeBlock),
			timeBlock: selectedTimeBlock
		};

		events = [...events, event];

		// Create reminder if alerts are enabled
		if (newEvent.alerts) {
			createReminderForEvent(event);
		}

		showEventModal = false;
		resetNewEvent();
	}

	function createReminderForEvent(event: any) {
		const reminder = {
			id: `event-${event.id}`,
			type: 'Notification',
			category: 'Calendar',
			subCategory: event.timeBlock,
			frequency: event.recurring || 'One-time',
			status: 'Active',
			triggerTime: event.startTime,
			message: `${event.title} at ${event.startTime}`,
			priority: 'Medium' as const,
			description: event.description || `${event.title} scheduled`,
			createdAt: new Date(),
			nextTrigger: new Date(`${event.date.toISOString().split('T')[0]}T${event.startTime}:00`)
		};

		// Dispatch custom event to notify reminders page
		const eventData = new CustomEvent('addCalendarReminder', { detail: reminder });
		window.dispatchEvent(eventData);
	}

	function resetNewEvent() {
		newEvent = {
			title: '',
			description: '',
			startTime: '',
			endTime: '',
			location: '',
			recurring: '',
			alerts: false,
			alertMinutes: 15
		};
	}

	function getTimeBlockColor(timeBlock: string): string {
		const colors = {
			morning: 'bg-orange-200',
			noon: 'bg-yellow-200',
			afternoon: 'bg-blue-200',
			night: 'bg-purple-200'
		};
		return colors[timeBlock as keyof typeof colors] || 'bg-gray-200';
	}

	function getTimeBlockHeight(): string {
		const totalBlocks = timeBlocks.length;
		return `calc((100vh - 200px) / ${totalBlocks})`;
	}

	function calculateEventHeight(event: any, block: any): string {
		const startTime = event.startTime.split(':').map(Number);
		const endTime = event.endTime.split(':').map(Number);
		
		const startMinutes = startTime[0] * 60 + startTime[1];
		const endMinutes = endTime[0] * 60 + endTime[1];
		
		// Handle overnight events (end time is next day)
		let durationMinutes = endMinutes - startMinutes;
		if (durationMinutes <= 0) {
			durationMinutes += 24 * 60; // Add 24 hours in minutes
		}
		
		const blockStartMinutes = block.startHour * 60;
		const blockEndMinutes = block.endHour * 60;
		let blockDurationMinutes = blockEndMinutes - blockStartMinutes;
		
		// Handle overnight blocks
		if (blockDurationMinutes <= 0) {
			blockDurationMinutes += 24 * 60;
		}
		
		const heightPercentage = (durationMinutes / blockDurationMinutes) * 100;
		return `${Math.max(heightPercentage, 8)}%`; // Minimum 8% height
	}

	function addNewTimeBlock() {
		if (!newBlock.labelEnglish.trim()) return;

		const blockId = `custom-${Date.now()}`;
		const newTimeBlock = {
			id: blockId,
			label: { 
				english: newBlock.labelEnglish, 
				tamil: newBlock.labelTamil || newBlock.labelEnglish 
			},
			time: `${newBlock.startHour}:00 - ${newBlock.endHour}:00`,
			color: newBlock.color,
			startHour: newBlock.startHour,
			endHour: newBlock.endHour
		};

		timeBlocks = [...timeBlocks, newTimeBlock];
		showAddBlockModal = false;
		resetNewBlock();
	}

	function resetNewBlock() {
		newBlock = {
			labelEnglish: '',
			labelTamil: '',
			startHour: 0,
			endHour: 0,
			color: 'from-gray-600 to-gray-700'
		};
	}

	// Natural language parsing
	let naturalLanguageInput = $state('');
	let showSmartInput = $state(false);

	// Weather integration
	let weatherData = $state<{
		temperature: number;
		condition: string;
		icon: string;
		location: string;
	} | null>(null);
	let showWeather = $state(true);

	function parseNaturalLanguage(text: string) {
		const parsed = {
			title: '',
			date: selectedDate,
			startTime: '',
			endTime: '',
			location: '',
			description: ''
		};

		// Simple natural language parsing
		const lowerText = text.toLowerCase();

		// Extract time patterns
		const timePatterns = [
			/\b(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\b/gi,
			/\b(\d{1,2})\s*(am|pm)\b/gi
		];

		let times = [];
		for (const pattern of timePatterns) {
			let match;
			while ((match = pattern.exec(lowerText)) !== null) {
				let hour = parseInt(match[1]);
				let minute = match[2] ? parseInt(match[2]) : 0;
				let ampm = match[3] || match[4];

				if (ampm === 'pm' && hour !== 12) hour += 12;
				if (ampm === 'am' && hour === 12) hour = 0;

				times.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
			}
		}

		if (times.length >= 1) {
			parsed.startTime = times[0];
			if (times.length >= 2) {
				parsed.endTime = times[1];
			} else {
				// Default 1 hour duration
				const [hour, minute] = parsed.startTime.split(':').map(Number);
				const endHour = hour + 1;
				parsed.endTime = `${endHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
			}
		}

		// Extract date patterns
		if (lowerText.includes('tomorrow')) {
			const tomorrow = new Date(selectedDate);
			tomorrow.setDate(tomorrow.getDate() + 1);
			parsed.date = tomorrow;
		} else if (lowerText.includes('next week')) {
			const nextWeek = new Date(selectedDate);
			nextWeek.setDate(nextWeek.getDate() + 7);
			parsed.date = nextWeek;
		}

		// Extract location patterns
		const locationPatterns = [
			/\bat\s+(.+?)(?:\s+at|\s+tomorrow|\s+next|$)/i,
			/\bin\s+(.+?)(?:\s+at|\s+tomorrow|\s+next|$)/i
		];

		for (const pattern of locationPatterns) {
			const match = text.match(pattern);
			if (match) {
				parsed.location = match[1].trim();
				break;
			}
		}

		// Extract title (everything before time/location keywords)
		let titleText = text;
		titleText = titleText.replace(/\s+(at|in|tomorrow|next week|next)\s+.*/i, '');
		titleText = titleText.replace(/\s+\d{1,2}(?::\d{2})?\s*(am|pm)?/gi, '');
		parsed.title = titleText.trim();

		// Set description to original text for context
		parsed.description = text;

		return parsed;
	}

	function createEventFromNaturalLanguage() {
		if (!naturalLanguageInput.trim()) return;

		const parsed = parseNaturalLanguage(naturalLanguageInput);

		const event = {
			id: Date.now().toString(),
			title: parsed.title || 'New Event',
			date: parsed.date,
			startTime: parsed.startTime || '09:00',
			endTime: parsed.endTime || '10:00',
			location: parsed.location || undefined,
			description: parsed.description || undefined,
			recurring: undefined,
			alerts: true,
			color: getTimeBlockColor('morning'),
			timeBlock: 'morning' as const
		};

		events = [...events, event];

		// Create reminder if alerts are enabled
		if (event.alerts) {
			createReminderForEvent(event);
		}

		naturalLanguageInput = '';
		showSmartInput = false;
	}

	async function fetchWeather() {
		try {
			// Using WeatherAPI (you'll need to replace with your API key)
			const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=demo&q=auto:ip`);
			if (response.ok) {
				const data = await response.json();
				weatherData = {
					temperature: Math.round(data.current.temp_c),
					condition: data.current.condition.text,
					icon: data.current.condition.icon,
					location: data.location.name
				};
			}
		} catch (error) {
			console.log('Weather fetch failed, using demo data');
			// Fallback demo data
			weatherData = {
				temperature: 28,
				condition: 'Sunny',
				icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
				location: 'Chennai'
			};
		}
	}
</script>

<svelte:head>
	<title>Calendar - Divine Nest</title>
</svelte:head>

<div 
	class="min-h-screen relative overflow-hidden p-4 pb-20"
	bind:this={calendarElement}
	ontouchstart={handleTouchStart}
	ontouchend={handleTouchEnd}
>
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
	<!-- Header -->
	<div class="glass-card p-6 rounded-2xl mb-6 shadow-xl border border-white/20">
		<div class="flex items-center justify-between mb-6">
			<div class="flex items-center space-x-4">
				<div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
					<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
					</svg>
				</div>
				<div>
					<h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
						{language === 'english' ? 'Calendar' : 'நாட்காட்டி'}
					</h1>
					<p class="text-gray-600 text-sm mt-1">
						{language === 'english' ? 'Organize, coordinate, and conquer your day' : 'உங்கள் நாளை ஒழுங்கமைக்க, ஒருங்கிணைக்க மற்றும் வெல்ல'}
					</p>
				</div>
			</div>

			<!-- Weather Widget -->
			{#if showWeather && weatherData}
				<div class="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
					<img 
						src={weatherData.icon} 
						alt={weatherData.condition}
						class="w-8 h-8"
					/>
					<div class="text-right">
						<div class="text-lg font-semibold text-gray-800">
							{weatherData.temperature}°C
						</div>
						<div class="text-xs text-gray-600">
							{weatherData.condition}
						</div>
						<div class="text-xs text-gray-500">
							{weatherData.location}
						</div>
					</div>
					<button
						onclick={() => showWeather = false}
						class="text-gray-400 hover:text-gray-600 transition-colors"
						title={language === 'english' ? 'Hide weather' : 'வானிலையை மறை'}
					>
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
						</svg>
					</button>
				</div>
			{:else if showWeather && !weatherData}
				<div class="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
					<div class="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-600"></div>
					<span class="text-sm text-gray-600">
						{language === 'english' ? 'Loading weather...' : 'வானிலை ஏற்றப்படுகிறது...'}
					</span>
				</div>
			{/if}

			<div class="flex items-center space-x-3">
				<!-- Quick Actions -->
				<div class="flex space-x-2">
					<button
						onclick={() => createEvent('morning')}
						class="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
					>
						<svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
						</svg>
						{language === 'english' ? 'New Event' : 'புதிய நிகழ்வு'}
					</button>
					<button
						onclick={() => showSmartInput = true}
						class="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
						title={language === 'english' ? 'Smart Event Creation' : 'புத்திசாலி நிகழ்வு உருவாக்கம்'}
					>
						<svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
						</svg>
						{language === 'english' ? 'Smart Add' : 'புத்திசாலி சேர்'}
					</button>
					<button
						onclick={() => showAddBlockModal = true}
						class="px-4 py-2 bg-white/10 backdrop-blur-sm text-gray-700 rounded-xl hover:bg-white/20 transition-all duration-200 border border-white/20"
					>
						<svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
						</svg>
						{language === 'english' ? 'Time Block' : 'நேர தொகுதி'}
					</button>
				</div>
				<div class="flex space-x-2">
					<button
						onclick={() => { showWeather = !showWeather; if (showWeather && !weatherData) fetchWeather(); }}
						class="px-3 py-2 bg-white/10 backdrop-blur-sm text-gray-700 rounded-xl hover:bg-white/20 transition-all duration-200 border border-white/20"
						title={language === 'english' ? 'Toggle weather' : 'வானிலையை மாற்ற'}
					>
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.9"></path>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.9"></path>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.5 12l-2 2 2 2"></path>
						</svg>
					</button>
					<button
						onclick={toggleLanguage}
						class="px-3 py-2 bg-white/10 backdrop-blur-sm text-gray-700 rounded-xl hover:bg-white/20 transition-all duration-200 border border-white/20"
					>
						{language === 'english' ? 'தமிழ்' : 'English'}
					</button>
					<div class="relative">
						<button
							onclick={() => {/* Toggle view menu */}}
							class="px-3 py-2 bg-white/10 backdrop-blur-sm text-gray-700 rounded-xl hover:bg-white/20 transition-all duration-200 border border-white/20 flex items-center"
						>
							<span class="mr-2">{getNextViewModeName()}</span>
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- Date Navigation -->
		<div class="flex items-center justify-between bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
			<button
				onclick={() => navigateDate('prev')}
				class="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-200 group"
				aria-label={language === 'english' ? 'Previous day' : 'முந்தைய நாள்'}
			>
				<svg class="w-6 h-6 text-gray-600 group-hover:text-gray-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
				</svg>
			</button>

			<div class="text-center">
				<h2 class="text-2xl font-bold text-gray-800 mb-1">
					{formatDate(selectedDate)}
				</h2>
				<div class="flex items-center justify-center space-x-4 text-sm text-gray-600">
					<span class="flex items-center">
						<div class={`w-2 h-2 rounded-full mr-2 ${selectedDate.getDay() === 0 || selectedDate.getDay() === 6 ? 'bg-red-400' : 'bg-green-400'}`}></div>
						{selectedDate.getDay() === 0 || selectedDate.getDay() === 6 ? 'Weekend' : 'Weekday'}
					</span>
					<span>•</span>
					<span>{selectedDate.toLocaleDateString(language === 'english' ? 'en' : 'ta', { month: 'long', year: 'numeric' })}</span>
				</div>
			</div>

			<button
				onclick={() => navigateDate('next')}
				class="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-200 group"
				aria-label={language === 'english' ? 'Next day' : 'அடுத்த நாள்'}
			>
				<svg class="w-6 h-6 text-gray-600 group-hover:text-gray-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
				</svg>
			</button>
		</div>
	</div>

	<!-- Calendar Content -->
	{#if viewMode === 'daily'}
		<!-- Daily View -->
		{@const dayEvents = events.filter(event => {
			const eventDate = new Date(event.date);
			return eventDate.toDateString() === selectedDate.toDateString();
		})}
		<div class="space-y-6">
			<!-- Weather Card -->
			<div class="glass-card p-6 rounded-2xl shadow-xl border border-white/20">
				<div class="flex items-center justify-between mb-4">
					<div class="flex items-center space-x-3">
						<div class="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
							<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
							</svg>
						</div>
						<div>
							<h3 class="text-lg font-semibold text-gray-800">
								{language === 'english' ? 'Today\'s Weather' : 'இன்றைய வானிலை'}
							</h3>
							<p class="text-sm text-gray-600">
								{language === 'english' ? 'Sunny, 28°C • Feels like 30°C' : 'எண்ணெய், 28°C • 30°C போல உணர்கிறது'}
							</p>
						</div>
					</div>
					<div class="text-right">
						<div class="text-2xl font-bold text-gray-800">28°</div>
						<div class="text-xs text-gray-500">
							{language === 'english' ? 'H:32° L:24°' : 'அ:32° க:24°'}
						</div>
					</div>
				</div>
				<div class="flex items-center justify-between text-sm text-gray-600">
					<span>🌅 6:15 AM</span>
					<span>🌇 6:45 PM</span>
					<span class="text-blue-600 font-medium">
						{language === 'english' ? 'Perfect day for outdoor activities' : 'வெளிப்புற நடவடிக்கைகளுக்கு சரியான நாள்'}
					</span>
				</div>
			</div>

			<!-- Events Card -->
			<div class="glass-card p-6 rounded-2xl shadow-xl border border-white/20">
				<div class="flex items-center justify-between mb-6">
					<h3 class="text-xl font-bold text-gray-800">
						{language === 'english' ? 'Today\'s Events' : 'இன்றைய நிகழ்வுகள்'}
					</h3>
					<div class="flex items-center space-x-2 text-sm text-gray-600">
						<span>{dayEvents.length}</span>
						<span>{language === 'english' ? 'events' : 'நிகழ்வுகள்'}</span>
					</div>
				</div>
				
				{#if dayEvents.length === 0}
					<div class="text-center py-16">
						<div class="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
							<svg class="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
							</svg>
						</div>
						<h4 class="text-xl font-semibold text-gray-700 mb-2">
							{language === 'english' ? 'No Events Today' : 'இன்று நிகழ்வுகள் இல்லை'}
						</h4>
						<p class="text-gray-500 mb-6">
							{language === 'english' 
								? 'Enjoy your day! Add events using natural language like "Lunch with Sarah at 1pm tomorrow"' 
								: 'உங்கள் நாளை அனுபவிக்க! "நாளை மதியம் 1 மணிக்கு சாராவுடன் மதிய உணவு" போன்ற இயற்கை மொழியைப் பயன்படுத்தி நிகழ்வுகளைச் சேர்க்க'}
						</p>
						<button
							onclick={() => createEvent('morning')}
							class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
						>
							{language === 'english' ? 'Create Your First Event' : 'உங்கள் முதல் நிகழ்வை உருவாக்க'}
						</button>
					</div>
				{:else}
					<div class="space-y-4">
						{#each dayEvents as event}
							<div class="bg-gradient-to-r from-white/80 to-white/40 backdrop-blur-sm border border-white/20 rounded-2xl p-5 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
								<div class="flex items-start justify-between mb-3">
									<div class="flex-1">
										<h4 class="text-lg font-semibold text-gray-800 mb-1">{event.title}</h4>
										<div class="flex items-center space-x-4 text-sm text-gray-600 mb-2">
											<span class="flex items-center">
												<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
												</svg>
												{event.startTime} - {event.endTime}
											</span>
											{#if event.location}
												<span class="flex items-center">
													<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
													</svg>
													{event.location}
												</span>
											{/if}
											{#if event.recurring}
												<span class="flex items-center text-blue-600">
													<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
													</svg>
													{event.recurring}
												</span>
											{/if}
										</div>
										{#if event.description}
											<p class="text-gray-700 text-sm leading-relaxed">{event.description}</p>
										{/if}
									</div>
									<div class="flex items-center space-x-2 ml-4">
										{#if event.alerts}
											<div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
												<svg class="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4.868 12.683A17.925 17.925 0 0112 21c7.962 0 12-1.21 12-2.683m-12 2.683a17.925 17.925 0 01-7.132-8.317M12 21V9m0 0a3 3 0 100-6 3 3 0 000 6z"></path>
												</svg>
											</div>
										{/if}
										<div class={`px-3 py-1 rounded-full text-xs font-medium ${
											event.timeBlock === 'morning' ? 'bg-orange-100 text-orange-700' :
											event.timeBlock === 'noon' ? 'bg-yellow-100 text-yellow-700' :
											event.timeBlock === 'afternoon' ? 'bg-blue-100 text-blue-700' :
											'bg-purple-100 text-purple-700'
										}`}>
											{timeBlocks.find(block => block.id === event.timeBlock)?.label[language] || event.timeBlock}
										</div>
									</div>
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	{/if}

	{#if viewMode === 'weekly'}
		<!-- Weekly View -->
		<div class="glass-card p-6 rounded-xl">
			<h3 class="text-lg font-semibold mb-4">
				{language === 'english' ? 'Weekly Overview' : 'வாராந்திர கண்ணோட்டம்'}
			</h3>
			<div class="grid grid-cols-7 gap-3">
				{#each Array(7) as _, dayOffset}
					{@const dayDate = new Date(selectedDate)}
					{dayDate.setDate(selectedDate.getDate() - selectedDate.getDay() + dayOffset)}
					{@const dayEvents = events.filter(event => {
						const eventDate = new Date(event.date);
						return eventDate.toDateString() === dayDate.toDateString();
					})}
					{@const isToday = dayDate.toDateString() === new Date().toDateString()}
					{@const isSelected = dayDate.toDateString() === selectedDate.toDateString()}
					{@const isWeekend = dayDate.getDay() === 0 || dayDate.getDay() === 6}
					
					<button 
						class="min-h-[200px] p-4 rounded-2xl border-2 transition-all hover:scale-105 hover:shadow-xl {
							isSelected ? 'border-blue-500 bg-blue-50/90 shadow-xl ring-2 ring-blue-200' : 
							isToday ? 'border-green-500 bg-green-50/90 shadow-lg ring-1 ring-green-200' : 
							isWeekend ? 'border-red-300 bg-red-50/70 shadow-md' : 'border-gray-300 bg-white/80 shadow-lg'
						}"
						onclick={() => selectedDate = new Date(dayDate)}
						aria-label={`Select ${dayDate.toLocaleDateString(language === 'english' ? 'en' : 'ta', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`}
					>
						<div class="text-center mb-4">
							<div class="text-sm font-semibold text-gray-600 mb-1">
								{dayDate.toLocaleDateString(language === 'english' ? 'en' : 'ta', { weekday: 'short' })}
							</div>
							<div class="text-3xl font-bold {isToday ? 'text-green-600' : isSelected ? 'text-blue-600' : (isWeekend ? 'text-red-600' : 'text-gray-800')}">
								{dayDate.getDate()}
							</div>
							{#if isWeekend}
								<div class="text-xs text-red-500 font-medium mt-1">Weekend</div>
							{:else}
								<div class="text-xs text-gray-500 font-medium mt-1">Weekday</div>
							{/if}
						</div>
						
						{#if dayEvents.length > 0}
							<div class="space-y-2">
								{#each dayEvents.slice(0, 4) as event}
									<div class="text-xs bg-gradient-to-r {$currentBackgroundTheme.accentColor} text-white px-3 py-2 rounded-lg truncate font-semibold shadow-sm">
										<div class="font-bold">{event.title}</div>
										<div class="text-xs opacity-90">{event.startTime}</div>
									</div>
								{/each}
								{#if dayEvents.length > 4}
									<div class="text-xs text-gray-600 font-bold text-center bg-gray-100/80 px-2 py-1 rounded-md">
										+{dayEvents.length - 4} more events
									</div>
								{/if}
							</div>
						{:else}
							<div class="text-center text-gray-400 text-sm font-medium mt-4">
								No events
							</div>
						{/if}
					</button>
				{/each}
			</div>
		</div>
	{/if}

	{#if viewMode === 'monthly'}
		{@const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)}
		{@const lastDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0)}
		{@const startDate = new Date(firstDay)}
		{startDate.setDate(startDate.getDate() - firstDay.getDay())}
		
		<!-- Monthly View -->
		<div class="glass-card p-6 rounded-xl">
			<div class="flex items-center justify-between mb-4">
				<h3 class="text-lg font-semibold">
					{language === 'english' ? 'Monthly Calendar' : 'மாதாந்திர நாட்காட்டி'}
				</h3>
				<div class="flex space-x-2">
					<button
						onclick={() => {
							selectedDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1);
						}}
						class="p-2 bg-white/50 rounded-lg hover:bg-white/70 transition-colors"
						aria-label={language === 'english' ? 'Previous month' : 'முந்தைய மாதம்'}
					>
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
						</svg>
					</button>
					<span class="text-sm font-medium px-3 py-2">
						{selectedDate.toLocaleDateString(language === 'english' ? 'en' : 'ta', { month: 'long', year: 'numeric' })}
					</span>
					<button
						onclick={() => {
							selectedDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1);
						}}
						class="p-2 bg-white/50 rounded-lg hover:bg-white/70 transition-colors"
						aria-label={language === 'english' ? 'Next month' : 'அடுத்த மாதம்'}
					>
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
						</svg>
					</button>
				</div>
			</div>
			
			<!-- Calendar Grid -->
			<div class="grid grid-cols-7 gap-1 mb-2">
				{#each ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as day}
					<div class="p-2 text-center text-sm font-medium text-gray-500">
						{language === 'english' ? day : 
						 day === 'Sun' ? 'ஞாயிறு' :
						 day === 'Mon' ? 'திங்கள்' :
						 day === 'Tue' ? 'செவ்வாய்' :
						 day === 'Wed' ? 'புதன்' :
						 day === 'Thu' ? 'வியாழன்' :
						 day === 'Fri' ? 'வெள்ளி' : 'சனி'}
					</div>
				{/each}
			</div>
			
			<div class="grid grid-cols-7 gap-1">
				
				{#each Array(42) as _, i}
					{@const currentDate = new Date(startDate)}
					{currentDate.setDate(startDate.getDate() + i)}
					{@const dayEvents = events.filter(event => {
						const eventDate = new Date(event.date);
						return eventDate.toDateString() === currentDate.toDateString();
					})}
					{@const isCurrentMonth = currentDate.getMonth() === selectedDate.getMonth()}
					{@const isToday = currentDate.toDateString() === new Date().toDateString()}
					{@const isSelected = currentDate.toDateString() === selectedDate.toDateString()}
					{@const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6}
					
					<button 
						class="min-h-[100px] p-3 border-2 rounded-xl transition-all hover:scale-105 hover:shadow-lg {
							isSelected ? 'border-blue-500 bg-blue-50/80 shadow-lg ring-2 ring-blue-200' : 
							isToday ? 'border-green-500 bg-green-50/80 shadow-md ring-1 ring-green-200' : 
							isCurrentMonth ? (isWeekend ? 'border-gray-300 bg-red-50/60' : 'border-gray-300 bg-white/70') : 'border-gray-200 bg-gray-50/50'
						}"
						onclick={() => selectedDate = new Date(currentDate)}
						aria-label={`Select ${currentDate.toLocaleDateString(language === 'english' ? 'en' : 'ta', { year: 'numeric', month: 'long', day: 'numeric' })}`}
					>
						<div class="text-right mb-2">
							<span class="text-lg font-bold {isCurrentMonth ? (isWeekend ? 'text-red-700' : 'text-gray-800') : 'text-gray-400'}">
								{currentDate.getDate()}
							</span>
							{#if isWeekend && isCurrentMonth}
								<span class="text-xs text-red-600 ml-1">•</span>
							{/if}
						</div>
						{#if dayEvents.length > 0}
							<div class="space-y-1">
								{#each dayEvents.slice(0, 3) as event}
									<div class="text-xs bg-gradient-to-r {$currentBackgroundTheme.accentColor} text-white px-2 py-1 rounded-md truncate font-medium shadow-sm">
										{event.title}
									</div>
								{/each}
								{#if dayEvents.length > 3}
									<div class="text-xs text-gray-600 font-medium">
										+{dayEvents.length - 3} more
									</div>
								{/if}
							</div>
						{/if}
					</button>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Swipe Instructions -->
	<div class="fixed bottom-24 left-4 right-4 text-center">
		<div class="glass-card p-3 rounded-lg">
			<p class="text-sm text-gray-600">
				{language === 'english' 
					? 'Swipe left/right to change days • Tap view button to cycle through views' 
					: 'நாட்களை மாற்ற இடது/வலது தேய்க்க • காட்சிகளை மாற்ற காட்சி பொத்தானை தட்டு'}
			</p>
		</div>
	</div>

	<!-- Event Creation Modal -->
	{#if showEventModal}
		<div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
			<div class="glass-card p-6 rounded-xl w-full max-w-md">
				<h3 class="text-lg font-semibold mb-4">
					{language === 'english' ? 'Create Event' : 'நிகழ்வை உருவாக்கு'}
				</h3>

				<div class="space-y-4">
					<div>
						<label for="event-title" class="block text-sm font-medium mb-1">
							{language === 'english' ? 'Title' : 'தலைப்பு'}
						</label>
						<input
							id="event-title"
							type="text"
							bind:value={newEvent.title}
							class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder={language === 'english' ? 'Event title' : 'நிகழ்வின் தலைப்பு'}
						/>
					</div>

					<div class="grid grid-cols-2 gap-4">
						<div>
							<label for="event-start-time" class="block text-sm font-medium mb-1">
								{language === 'english' ? 'Start Time' : 'தொடக்க நேரம்'}
							</label>
							<input
								id="event-start-time"
								type="time"
								bind:value={newEvent.startTime}
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label for="event-end-time" class="block text-sm font-medium mb-1">
								{language === 'english' ? 'End Time' : 'முடிவு நேரம்'}
							</label>
							<input
								id="event-end-time"
								type="time"
								bind:value={newEvent.endTime}
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
					</div>

					<div>
						<label for="event-location" class="block text-sm font-medium mb-1">
							{language === 'english' ? 'Location' : 'இடம்'}
						</label>
						<input
							id="event-location"
							type="text"
							bind:value={newEvent.location}
							class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder={language === 'english' ? 'Event location' : 'நிகழ்வின் இடம்'}
						/>
					</div>

					<div>
						<label for="event-recurring" class="block text-sm font-medium mb-1">
							{language === 'english' ? 'Recurring' : 'மீண்டும் மீண்டும்'}
						</label>
						<select
							id="event-recurring"
							bind:value={newEvent.recurring}
							class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="">
								{language === 'english' ? 'One-time event' : 'ஒரு முறை நிகழ்வு'}
							</option>
							<option value="daily">
								{language === 'english' ? 'Daily' : 'தினமும்'}
							</option>
							<option value="weekly">
								{language === 'english' ? 'Weekly' : 'வாரமும்'}
							</option>
							<option value="monthly">
								{language === 'english' ? 'Monthly' : 'மாதமும்'}
							</option>
							<option value="yearly">
								{language === 'english' ? 'Yearly' : 'வருடமும்'}
							</option>
						</select>
					</div>

					<div class="flex items-center space-x-2">
						<input
							type="checkbox"
							id="alerts"
							bind:checked={newEvent.alerts}
							class="rounded"
						/>
						<label for="alerts" class="text-sm">
							{language === 'english' ? 'Enable alerts' : 'எச்சரிக்கைகளை இயக்கு'}
						</label>
					</div>

					{#if newEvent.alerts}
						<div>
							<label for="alert-minutes" class="block text-sm font-medium mb-1">
								{language === 'english' ? 'Alert before (minutes)' : 'எச்சரிக்கைக்கு முன் (நிமிடங்கள்)'}
							</label>
							<input
								id="alert-minutes"
								type="number"
								bind:value={newEvent.alertMinutes}
								min="1"
								max="1440"
								class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
					{/if}
				</div>

				<div class="flex space-x-3 mt-6">
					<button
						onclick={() => { showEventModal = false; resetNewEvent(); }}
						class="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
					>
						{language === 'english' ? 'Cancel' : 'ரத்து செய்'}
					</button>
					<button
						onclick={saveEvent}
						class="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
					>
						{language === 'english' ? 'Save Event' : 'நிகழ்வை சேமி'}
					</button>
				</div>
			</div>
		</div>
	{/if}

	<!-- Add Time Block Modal -->
	{#if showAddBlockModal}
		<div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
			<div class="bg-white rounded-2xl p-6 w-full max-w-md">
				<h3 class="text-xl font-bold mb-4 text-gray-800">
					{language === 'english' ? 'Add Time Block' : 'நேர தொகுதியைச் சேர்க்க'}
				</h3>

				<div class="space-y-4">
					<div>
						<label for="block-label-english" class="block text-sm font-medium text-gray-700 mb-1">
							{language === 'english' ? 'Block Name (English)' : 'தொகுதி பெயர் (ஆங்கிலம்)'}
						</label>
						<input
							id="block-label-english"
							type="text"
							bind:value={newBlock.labelEnglish}
							placeholder="e.g., Morning"
							class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>

					<div>
						<label for="block-label-tamil" class="block text-sm font-medium text-gray-700 mb-1">
							{language === 'english' ? 'Block Name (Tamil)' : 'தொகுதி பெயர் (தமிழ்)'}
						</label>
						<input
							id="block-label-tamil"
							type="text"
							bind:value={newBlock.labelTamil}
							placeholder="e.g., காலை"
							class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>

					<div class="grid grid-cols-2 gap-3">
						<div>
							<label for="block-start-hour" class="block text-sm font-medium text-gray-700 mb-1">
								{language === 'english' ? 'Start Hour' : 'தொடக்க மணிநேரம்'}
							</label>
							<input
								id="block-start-hour"
								type="number"
								bind:value={newBlock.startHour}
								min="0"
								max="23"
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
						</div>
						<div>
							<label for="block-end-hour" class="block text-sm font-medium text-gray-700 mb-1">
								{language === 'english' ? 'End Hour' : 'முடிவு மணிநேரம்'}
							</label>
							<input
								id="block-end-hour"
								type="number"
								bind:value={newBlock.endHour}
								min="0"
								max="23"
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
						</div>
					</div>

					<div>
						<div class="block text-sm font-medium text-gray-700 mb-1">
							{language === 'english' ? 'Color Theme' : 'வண்ண தீம்'}
						</div>
						<div class="grid grid-cols-4 gap-2">
							{#each ['from-blue-600 to-purple-700', 'from-green-600 to-teal-700', 'from-orange-600 to-red-700', 'from-pink-600 to-rose-700', 'from-indigo-600 to-blue-700', 'from-emerald-600 to-green-700', 'from-amber-600 to-orange-700', 'from-violet-600 to-purple-700'] as color}
								<button
									class="h-10 rounded-lg bg-gradient-to-br {color} border-2 {newBlock.color === color ? 'border-white' : 'border-gray-300'}"
									onclick={() => newBlock.color = color}
									aria-label={`Select ${color} color`}
								></button>
							{/each}
						</div>
					</div>
				</div>

				<div class="flex space-x-3 mt-6">
					<button
						onclick={() => { showAddBlockModal = false; resetNewBlock(); }}
						class="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
					>
						{language === 'english' ? 'Cancel' : 'ரத்து செய்'}
					</button>
					<button
						onclick={() => addNewTimeBlock()}
						disabled={!newBlock.labelEnglish.trim() || newBlock.startHour >= newBlock.endHour}
						class="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						{language === 'english' ? 'Add Block' : 'தொகுதியைச் சேர்க்க'}
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>

<!-- Smart Event Input Modal -->
{#if showSmartInput}
	<div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
		<div class="glass-card p-6 rounded-xl w-full max-w-md">
			<h3 class="text-lg font-semibold mb-4 flex items-center">
				<svg class="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
				</svg>
				{language === 'english' ? 'Smart Event Creation' : 'புத்திசாலி நிகழ்வு உருவாக்கம்'}
			</h3>

			<div class="space-y-4">
				<div>
					<label for="smart-input" class="block text-sm font-medium mb-2">
						{language === 'english' ? 'Describe your event naturally' : 'உங்கள் நிகழ்வை இயல்பாக விவரிக்க'}
					</label>
					<textarea
						id="smart-input"
						bind:value={naturalLanguageInput}
						class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
						rows="3"
						placeholder={language === 'english' 
							? 'e.g., "Lunch with Sarah at 1pm tomorrow" or "Team meeting at 3pm in conference room"'
							: 'எ.கா., "சாராவுடன் நாளை மதியம் 1 மணிக்கு மதிய உணவு" அல்லது "குழு கூட்டம் மாலை 3 மணிக்கு கான்பரன்ஸ் அறையில்"'
						}
						onkeydown={(e) => {
							if (e.key === 'Enter' && !e.shiftKey) {
								e.preventDefault();
								createEventFromNaturalLanguage();
							}
						}}
					></textarea>
				</div>

				<div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
					<h4 class="text-sm font-medium text-blue-800 mb-2">
						{language === 'english' ? 'Examples:' : 'எடுத்துக்காட்டுகள்:'}
					</h4>
					<ul class="text-xs text-blue-700 space-y-1">
						<li>• {language === 'english' ? '"Coffee with John at 10am"' : '"ஜானுடன் காலை 10 மணிக்கு காபி"'}</li>
						<li>• {language === 'english' ? '"Dentist appointment tomorrow at 2pm"' : '"நாளை மாலை 2 மணிக்கு பற்களை சுத்தம் செய்ய"'}</li>
						<li>• {language === 'english' ? '"Weekly team meeting every Monday at 9am"' : '"ஒவ்வொரு திங்கட்கிழமையும் காலை 9 மணிக்கு வாராந்திர குழு கூட்டம்"'}</li>
					</ul>
				</div>
			</div>

			<div class="flex space-x-3 mt-6">
				<button
					onclick={() => { showSmartInput = false; naturalLanguageInput = ''; }}
					class="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
				>
					{language === 'english' ? 'Cancel' : 'ரத்து செய்'}
				</button>
				<button
					onclick={createEventFromNaturalLanguage}
					disabled={!naturalLanguageInput.trim()}
					class="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
				>
					{language === 'english' ? 'Create Event' : 'நிகழ்வை உருவாக்கு'}
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.glass-card {
		background: rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.18);
		transition: all 0.3s ease-in-out;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
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