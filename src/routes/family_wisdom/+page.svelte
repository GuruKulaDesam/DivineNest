<script lang="ts">
	let activeView = $state('dashboard');

	const discussions = [
		{ id: 1, user: 'முன்னோர்', message: 'இந்த கடமைகள் குடும்பத்தின் ஒற்றுமையை வலுப்படுத்தும்.', time: '2h ago' },
		{ id: 2, user: 'அம்மா', message: 'தினசரி செய்ய இது உதவியாக இருக்கும்.', time: '1h ago' }
	];

	const alerts = [
		{ id: 1, title: 'காலை சந்த்யாவந்தனம் நினைவூட்டல்', time: '6:00 AM', active: true },
		{ id: 2, title: 'பூஜை நேரம்', time: '7:00 AM', active: true }
	];
</script>

<svelte:head>
	<title>Family Wisdom - Vedic Reference</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4 pb-20">
	<div class="max-w-4xl mx-auto">
		<!-- Header -->
		<div class="mb-6">
			<h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-2">குடும்ப உறுப்பினர்களுக்கான தினசரி கடமைகள்</h1>
			<p class="text-gray-600 dark:text-gray-300">஋ணம் → கடன் அடிப்படையில்</p>
		</div>

		<!-- Tabs -->
		<div class="flex space-x-1 mb-6 bg-white/50 dark:bg-gray-800/50 p-1 rounded-xl backdrop-blur-sm">
			<button
				class="flex-1 py-3 px-4 rounded-lg font-medium transition-all {activeView === 'dashboard' ? 'bg-white dark:bg-gray-700 shadow-md text-blue-600' : 'text-gray-600 dark:text-gray-300 hover:bg-white/50'}"
				onclick={() => activeView = 'dashboard'}
			>
				<svg class="w-5 h-5 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
				Dashboard
			</button>
			<button
				class="flex-1 py-3 px-4 rounded-lg font-medium transition-all {activeView === 'discussion' ? 'bg-white dark:bg-gray-700 shadow-md text-blue-600' : 'text-gray-600 dark:text-gray-300 hover:bg-white/50'}"
				onclick={() => activeView = 'discussion'}
			>
				<svg class="w-5 h-5 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
				Discussion
			</button>
			<button
				class="flex-1 py-3 px-4 rounded-lg font-medium transition-all {activeView === 'alerts' ? 'bg-white dark:bg-gray-700 shadow-md text-blue-600' : 'text-gray-600 dark:text-gray-300 hover:bg-white/50'}"
				onclick={() => activeView = 'alerts'}
			>
				<svg class="w-5 h-5 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4.868 12.683A17.925 17.925 0 012 21h13.78a3 3 0 002.553-1.453c1.475-2.45 1.553-5.25.177-7.877-3.065-5.84 1.64-10.375 1.64-10.375s-5.83 3.061-8.895 8.901c-1.376 2.627-1.298 5.427.177 7.877A3 3 0 0113.78 21H2a3 3 0 01-2.553-1.453c-1.475-2.45-1.553-5.25-.177-7.877 3.065-5.84-1.64-10.375-1.64-10.375s5.83 3.061 8.895 8.901z"></path></svg>
				Alerts
			</button>
		</div>

		<!-- Dashboard View -->
		{#if activeView === 'dashboard'}
			<div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
				<div class="prose dark:prose-invert max-w-none">
					<h2>அப்பா (கிருஹஸ்தர், கர்ம யோகி)</h2>
					<p><strong>முக்கிய கடன்கள்</strong>: தேவ கடன், பித்ரு கடன், ரிஷி கடன், நர கடன்</p>
					<p><strong>தினசரி கடமைகள்</strong>:</p>
					<ul>
						<li>காலை மற்றும் மாலை <strong>சந்த்யாவந்தனம்</strong> செய்வது (தேவ கடன்)</li>
						<li>முன்னோர்களுக்காக <strong>தர்ப்பணம் அல்லது ஜலதானம்</strong> செய்வது (பித்ரு கடன்)</li>
						<li><strong>பகவத் கீதை அல்லது உபநிஷதம்</strong> வாசிப்பது (ரிஷி கடன்)</li>
						<li>குடும்பத்தில் ஒரு கோரிக்கையை தீர்ப்பது (நர கடன்)</li>
						<li>வீட்டை விட்டு வெளியேறுவதற்கு முன் <strong>பறவைகளுக்கு உணவு</strong>, <strong>தாவரங்களுக்கு நீர்</strong> (பூத கடன்)</li>
					</ul>

					<h2>அம்மா (கிருஹஸ்தர், பராமரிப்பாளர்)</h2>
					<p><strong>முக்கிய கடன்கள்</strong>: தேவ கடன், பித்ரு கடன், நர கடன், பூத கடன்</p>
					<p><strong>தினசரி கடமைகள்</strong>:</p>
					<ul>
						<li><strong>வீட்டு ஆலயத்தில் விளக்கு ஏற்றி</strong> பூஜை செய்வது (தேவ கடன்)</li>
						<li>குழந்தைகளுக்கு <strong>குடும்பக் கதைகள் அல்லது பழமொழிகள்</strong> பகிர்வது (பித்ரு கடன்)</li>
						<li>சமையலில் <strong>முதல் பகுதியை பெரியவர்களுக்கு அல்லது இயற்கைக்கு</strong> வழங்குவது (நர + பூத கடன்)</li>
						<li><strong>விருந்தினர்களை வரவேற்பது</strong>, அண்டை வீட்டாருக்கு உதவுவது (நர கடன்)</li>
						<li><strong>பூஜை அறை மற்றும் சமையலறையை சுத்தமாக</strong> வைத்திருப்பது (பூத கடன்)</li>
					</ul>

					<h2>குழந்தை (பிரம்மச்சரியம், கற்றல் நிலை)</h2>
					<p><strong>முக்கிய கடன்கள்</strong>: ரிஷி கடன், பித்ரு கடன், நர கடன்</p>
					<p><strong>தினசரி கடமைகள்</strong>:</p>
					<ul>
						<li>ஒரு <strong>ச்லோகம் அல்லது பழமொழி</strong> கற்றல் மற்றும் சிந்தித்தல் (ரிஷி கடன்)</li>
						<li><strong>பெரியவர்களுக்கு உதவுதல்</strong> (பித்ரு கடன்)</li>
						<li><strong>குடும்ப உறுப்பினர்களை மரியாதையுடன்</strong> வரவேற்பது (நர கடன்)</li>
						<li><strong>மிருகங்களுக்கு உணவு</strong>, <strong>தாவரங்களுக்கு நீர்</strong> (பூத கடன்)</li>
						<li><strong>தினசரி கற்றலை ஒரு குறிப்பேட்டில் பதிவு</strong> செய்வது (ரிஷி கடன்)</li>
					</ul>

					<h2>பாட்டி/தாத்தா (வானப்ரஸ்தம், ஞான வழிகாட்டி)</h2>
					<p><strong>முக்கிய கடன்கள்</strong>: பித்ரு கடன், ரிஷி கடன், பூத கடன்</p>
					<p><strong>தினசரி கடமைகள்</strong>:</p>
					<ul>
						<li><strong>குழந்தைகளுக்கு ஆசீர்வாதம்</strong>, <strong>குடும்ப வரலாறு பகிர்வு</strong> (பித்ரு கடன்)</li>
						<li><strong>வேதம் அல்லது ஆன்மிக நூல்கள்</strong> வாசித்தல் அல்லது கேட்பது (ரிஷி கடன்)</li>
						<li><strong>பூஜை வழிகாட்டுதல்</strong>, பூஜைக்கு தேவையான பொருட்கள் தயார் செய்தல் (தேவ கடன்)</li>
						<li><strong>இயற்கையில் அமர்ந்து</strong>, <strong>மிருகங்களுக்கு உணவு வழங்குதல்</strong> (பூத கடன்)</li>
						<li><strong>10 நிமிடங்கள் தியானம் அல்லது அமைதியான சிந்தனை</strong> (ரிஷி கடன்)</li>
					</ul>

					<h2>விருந்தினர் (அதிதி, நர கடன் மையமாக)</h2>
					<p><strong>முக்கிய கடன்</strong>: நர கடன்</p>
					<p><strong>தினசரி கடமைகள்</strong>:</p>
					<ul>
						<li><strong>விருந்தோம்பலை நன்றியுடன்</strong> ஏற்கும்</li>
						<li><strong>ஆசீர்வாதம் அல்லது நல்ல வார்த்தைகள்</strong> வழங்கும்</li>
						<li><strong>வீட்டில் சீர்கேடு இல்லாமல்</strong> நடந்து கொள்வது</li>
						<li><strong>பூஜை அல்லது உணவுகளில் மரியாதையுடன்</strong> பங்கேற்பது</li>
					</ul>
				</div>
			</div>
		{/if}

		<!-- Discussion View -->
		{#if activeView === 'discussion'}
			<div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
				<h3 class="text-xl font-bold mb-4">Discussion</h3>
				<div class="space-y-4">
					{#each discussions as discussion}
						<div class="flex space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
							<div class="flex-shrink-0">
								<div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
									{discussion.user[0]}
								</div>
							</div>
							<div class="flex-1">
								<p class="font-medium">{discussion.user}</p>
								<p class="text-gray-600 dark:text-gray-300">{discussion.message}</p>
								<p class="text-xs text-gray-500">{discussion.time}</p>
							</div>
						</div>
					{/each}
				</div>
				<div class="mt-4">
					<textarea
						class="w-full p-3 border rounded-lg resize-none"
						rows="3"
						placeholder="Add your comment..."
					></textarea>
					<button class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
						Post Comment
					</button>
				</div>
			</div>
		{/if}

		<!-- Alerts View -->
		{#if activeView === 'alerts'}
			<div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
				<h3 class="text-xl font-bold mb-4">Alerts & Reminders</h3>
				<div class="space-y-4">
					{#each alerts as alert}
						<div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
							<div>
								<p class="font-medium">{alert.title}</p>
								<p class="text-sm text-gray-600 dark:text-gray-300">{alert.time}</p>
							</div>
							<label class="relative inline-flex items-center cursor-pointer">
								<input type="checkbox" class="sr-only peer" checked={alert.active}>
								<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
							</label>
						</div>
					{/each}
				</div>
				<div class="mt-4">
					<button class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
						Add New Alert
					</button>
				</div>
			</div>
		{/if}
	</div>
</div>