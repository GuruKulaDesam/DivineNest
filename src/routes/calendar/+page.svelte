<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

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

	// View mode: 'blocks', 'hours', 'daily', 'weekly', 'monthly'
	let viewMode = $state<'blocks' | 'hours' | 'daily' | 'weekly' | 'monthly'>('blocks');

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

	// Mock events data
	onMount(() => {
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
			if (deltaY > 0) {
				// Swipe down - switch to blocks view
				viewMode = 'blocks';
			} else {
				// Swipe up - switch to hours view
				viewMode = 'hours';
			}
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

	function getNextViewModeName(): string {
		const views: Array<'blocks' | 'hours' | 'daily' | 'weekly' | 'monthly'> = ['blocks', 'hours', 'daily', 'weekly', 'monthly'];
		const currentIndex = views.indexOf(viewMode);
		const nextIndex = (currentIndex + 1) % views.length;
		const nextView = views[nextIndex];
		
		if (language === 'english') {
			switch (nextView) {
				case 'blocks': return 'Blocks';
				case 'hours': return 'Hours';
				case 'daily': return 'Daily';
				case 'weekly': return 'Weekly';
				case 'monthly': return 'Monthly';
			}
		} else {
			switch (nextView) {
				case 'blocks': return 'தொகுதிகள்';
				case 'hours': return 'மணிநேரம்';
				case 'daily': return 'தினசரி';
				case 'weekly': return 'வாராந்திர';
				case 'monthly': return 'மாதாந்திர';
			}
		}
		return '';
	}

	function toggleViewMode() {
		const views: Array<'blocks' | 'hours' | 'daily' | 'weekly' | 'monthly'> = ['blocks', 'hours', 'daily', 'weekly', 'monthly'];
		const currentIndex = views.indexOf(viewMode);
		const nextIndex = (currentIndex + 1) % views.length;
		viewMode = views[nextIndex];
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

	function removeTimeBlock(blockId: string) {
		// Don't allow removing the last block
		if (timeBlocks.length <= 1) return;
		
		timeBlocks = timeBlocks.filter(block => block.id !== blockId);
		// Move events from removed block to the first remaining block
		events = events.map(event => 
			event.timeBlock === blockId 
				? { ...event, timeBlock: timeBlocks[0].id }
				: event
		);
	}
</script>

<svelte:head>
	<title>Calendar - Divine Nest</title>
</svelte:head>

<div 
	class="min-h-screen bg-gradient-to-br {dayColors[selectedDate.getDay()]} p-4 pb-20"
	bind:this={calendarElement}
	ontouchstart={handleTouchStart}
	ontouchend={handleTouchEnd}
>
	<!-- Header -->
	<div class="glass-card p-6 rounded-xl mb-6">
		<div class="flex items-center justify-between mb-4">
			<h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
				{language === 'english' ? 'Calendar' : 'நாட்காட்டி'}
			</h1>
			<div class="flex space-x-2">
				<button
					onclick={toggleLanguage}
					class="px-3 py-1 bg-white/50 rounded-lg text-sm font-medium hover:bg-white/70 transition-colors"
				>
					{language === 'english' ? 'தமிழ்' : 'English'}
				</button>
				<button
					onclick={toggleViewMode}
					class="px-3 py-1 bg-white/50 rounded-lg text-sm font-medium hover:bg-white/70 transition-colors"
				>
					{getNextViewModeName()}
				</button>
			</div>
		</div>

		<!-- Date Navigation -->
		<div class="flex items-center justify-between">
			<button
				onclick={() => navigateDate('prev')}
				class="p-2 bg-white/50 rounded-lg hover:bg-white/70 transition-colors"
				aria-label={language === 'english' ? 'Previous day' : 'முந்தைய நாள்'}
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
				</svg>
			</button>

			<h2 class="text-xl font-semibold text-gray-800">
				{formatDate(selectedDate)}
			</h2>

			<button
				onclick={() => navigateDate('next')}
				class="p-2 bg-white/50 rounded-lg hover:bg-white/70 transition-colors"
				aria-label={language === 'english' ? 'Next day' : 'அடுத்த நாள்'}
			>
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
				</svg>
			</button>
		</div>
	</div>

	<!-- Calendar Content -->
	{#if viewMode === 'blocks'}
		<!-- Time Blocks View - Full Height -->
		<div class="flex flex-col" style="height: calc(100vh - 200px);">
			{#each timeBlocks as block, index}
				{@const blockEvents = getEventsForDate(selectedDate, block.id)}
				{@const blockHeight = getTimeBlockHeight()}
				<div 
					class="flex-1 bg-gradient-to-br {block.color} glass-card rounded-xl mb-2 overflow-hidden relative"
					style="min-height: {blockHeight};"
				>
					<!-- Block Header -->
					<div class="flex items-center justify-between p-3 bg-black/10 backdrop-blur-sm">
						<div class="flex items-center space-x-3">
							<h3 class="text-lg font-semibold text-white">
								{block.label[language]}
							</h3>
							<span class="text-sm text-white/80">
								{block.time}
							</span>
						</div>
						<div class="flex items-center space-x-2">
							<button
								onclick={() => createEvent(block.id)}
								class="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
								aria-label={language === 'english' ? `Add event to ${block.label.english}` : `${block.label.tamil} இல் நிகழ்வைச் சேர்க்க`}
							>
								<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
								</svg>
							</button>
							{#if timeBlocks.length > 1}
								<button
									onclick={() => removeTimeBlock(block.id)}
									class="p-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors"
									aria-label={language === 'english' ? `Remove ${block.label.english} block` : `${block.label.tamil} தொகுதியை நீக்கு`}
								>
									<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
									</svg>
								</button>
							{/if}
						</div>
					</div>

					<!-- Events Container -->
					<div class="relative h-full p-3">
						{#if blockEvents.length > 0}
							<div class="space-y-1 h-full">
								{#each blockEvents as event}
									{@const eventHeight = calculateEventHeight(event, block)}
									<div 
										class="bg-white/20 backdrop-blur-sm rounded-lg p-2 cursor-pointer hover:bg-white/30 transition-colors"
										style="height: {eventHeight}; min-height: 40px;"
									>
										<h4 class="font-medium text-white text-sm truncate">{event.title}</h4>
										<p class="text-xs text-white/80">{event.startTime} - {event.endTime}</p>
										{#if event.location}
											<p class="text-xs text-white/60 truncate">{event.location}</p>
										{/if}
									</div>
								{/each}
							</div>
						{:else}
							<div class="flex items-center justify-center h-full">
								<div class="text-center">
									<p class="text-white/60 text-sm mb-2">
										{language === 'english' ? 'No events scheduled' : 'நிகழ்வுகள் எதுவும் திட்டமிடப்படவில்லை'}
									</p>
									<button
										onclick={() => createEvent(block.id)}
										class="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-white text-sm"
									>
										{language === 'english' ? '+ Add Event' : '+ நிகழ்வைச் சேர்க்க'}
									</button>
								</div>
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>

		<!-- Add New Block Button -->
		<div class="mt-4 text-center">
			<button
				onclick={() => showAddBlockModal = true}
				class="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors text-white font-medium"
			>
				{language === 'english' ? '+ Add Time Block' : '+ நேர தொகுதியைச் சேர்க்க'}
			</button>
		</div>
	{:else}
		<!-- Hours View -->
		<div class="glass-card p-6 rounded-xl">
			<h3 class="text-lg font-semibold mb-4">
				{language === 'english' ? 'Hourly Schedule' : 'மணிநேர அட்டவணை'}
			</h3>
			<div class="space-y-2">
				{#each Array(24) as _, hour}
					{@const hourEvents = events.filter(event => {
						const eventDate = new Date(event.date);
						const isSameDate = eventDate.toDateString() === selectedDate.toDateString();
						const eventHour = parseInt(event.startTime.split(':')[0]);
						return isSameDate && eventHour === hour;
					})}
					<div class="flex items-center space-x-4 p-3 bg-white/50 rounded-lg">
						<span class="w-16 text-sm font-medium text-gray-600">
							{hour.toString().padStart(2, '0')}:00
						</span>
						<div class="flex-1">
							{#if hourEvents.length > 0}
								{#each hourEvents as event}
									<div class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
										{event.title} ({event.startTime} - {event.endTime})
									</div>
								{/each}
							{:else}
								<span class="text-gray-400 text-sm">
									{language === 'english' ? 'Free' : 'காலியாக உள்ளது'}
								</span>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	{#if viewMode === 'daily'}
		<!-- Daily View -->
		<div class="glass-card p-6 rounded-xl">
			<h3 class="text-lg font-semibold mb-4">
				{language === 'english' ? 'Daily Schedule' : 'தினசரி அட்டவணை'}
			</h3>
			<div class="space-y-3">
				{#each Array(24) as _, hour}
					{@const hourEvents = events.filter(event => {
						const eventDate = new Date(event.date);
						const isSameDate = eventDate.toDateString() === selectedDate.toDateString();
						const eventHour = parseInt(event.startTime.split(':')[0]);
						return isSameDate && eventHour === hour;
					})}
					<div class="flex items-start space-x-4 p-3 bg-white/30 rounded-lg hover:bg-white/40 transition-colors">
						<span class="w-16 text-sm font-medium text-gray-700 flex-shrink-0">
							{hour.toString().padStart(2, '0')}:00
						</span>
						<div class="flex-1 min-h-[2rem]">
							{#if hourEvents.length > 0}
								<div class="space-y-2">
									{#each hourEvents as event}
										<div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg shadow-sm">
											<div class="font-medium">{event.title}</div>
											<div class="text-sm opacity-90">{event.startTime} - {event.endTime}</div>
											{#if event.location}
												<div class="text-sm opacity-75">📍 {event.location}</div>
											{/if}
										</div>
									{/each}
								</div>
							{:else}
								<div class="text-gray-400 text-sm italic flex items-center h-full">
									{language === 'english' ? 'Free' : 'காலியாக உள்ளது'}
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	{#if viewMode === 'weekly'}
		<!-- Weekly View -->
		<div class="glass-card p-6 rounded-xl">
			<h3 class="text-lg font-semibold mb-4">
				{language === 'english' ? 'Weekly Overview' : 'வாராந்திர கண்ணோட்டம்'}
			</h3>
			<div class="grid grid-cols-7 gap-2">
				{#each Array(7) as _, dayOffset}
					{@const dayDate = new Date(selectedDate)}
					{dayDate.setDate(selectedDate.getDate() - selectedDate.getDay() + dayOffset)}
					{@const dayEvents = events.filter(event => {
						const eventDate = new Date(event.date);
						return eventDate.toDateString() === dayDate.toDateString();
					})}
					{@const isToday = dayDate.toDateString() === new Date().toDateString()}
					{@const isSelected = dayDate.toDateString() === selectedDate.toDateString()}
					
					<div 
						class="p-3 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md {
							isSelected ? 'border-blue-500 bg-blue-50' : 
							isToday ? 'border-green-500 bg-green-50' : 
							'border-gray-200 bg-white/50'
						}"
						onclick={() => selectedDate = new Date(dayDate)}
					>
						<div class="text-center">
							<div class="text-xs font-medium text-gray-500 mb-1">
								{dayDate.toLocaleDateString(language === 'english' ? 'en' : 'ta', { weekday: 'short' })}
							</div>
							<div class="text-lg font-bold {isToday ? 'text-green-600' : isSelected ? 'text-blue-600' : 'text-gray-800'}">
								{dayDate.getDate()}
							</div>
							{#if dayEvents.length > 0}
								<div class="mt-2 space-y-1">
									{#each dayEvents.slice(0, 3) as event}
										<div class="text-xs bg-gradient-to-r from-blue-400 to-purple-500 text-white px-1 py-0.5 rounded truncate">
											{event.title}
										</div>
									{/each}
									{#if dayEvents.length > 3}
										<div class="text-xs text-gray-500">
											+{dayEvents.length - 3} more
										</div>
									{/if}
								</div>
							{/if}
						</div>
					</div>
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
					
					<div 
						class="min-h-[80px] p-2 border rounded-lg cursor-pointer transition-all hover:shadow-sm {
							isSelected ? 'border-blue-500 bg-blue-50' : 
							isToday ? 'border-green-500 bg-green-50' : 
							isCurrentMonth ? 'border-gray-200 bg-white/50' : 'border-gray-100 bg-gray-50'
						}"
						onclick={() => selectedDate = new Date(currentDate)}
					>
						<div class="text-right mb-1">
							<span class="text-sm font-medium {isCurrentMonth ? 'text-gray-800' : 'text-gray-400'}">
								{currentDate.getDate()}
							</span>
						</div>
						{#if dayEvents.length > 0}
							<div class="space-y-0.5">
								{#each dayEvents.slice(0, 2) as event}
									<div class="text-xs bg-gradient-to-r from-blue-400 to-purple-500 text-white px-1 py-0.5 rounded truncate">
										{event.title}
									</div>
								{/each}
								{#if dayEvents.length > 2}
									<div class="text-xs text-gray-500">
										+{dayEvents.length - 2}
									</div>
								{/if}
							</div>
						{/if}
					</div>
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
						<label class="block text-sm font-medium text-gray-700 mb-1">
							{language === 'english' ? 'Color Theme' : 'வண்ண தீம்'}
						</label>
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

<style>
	.glass-card {
		background: rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.18);
		transition: all 0.3s ease-in-out;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
	}
</style>