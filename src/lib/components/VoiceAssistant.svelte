<script lang="ts">
	import { onMount } from 'svelte';
	import { SpeechRecognition } from '@capacitor-community/speech-recognition';
	import { TextToSpeech } from '@capacitor-community/text-to-speech';
	import { getVoiceResponse } from '$lib/openai';

	let isListening = $state(false);
	let isProcessing = $state(false);

	onMount(async () => {
		// Request permissions
		await SpeechRecognition.requestPermissions();
	});

	async function startListening() {
		try {
			isListening = true;
			const result = await SpeechRecognition.start({
				language: 'en-US',
				maxResults: 1,
				prompt: 'Say something',
				partialResults: false,
				popup: false
			});

			if (result.matches && result.matches.length > 0) {
				const transcript = result.matches[0];
				await processVoiceCommand(transcript);
			}
		} catch (error) {
			console.error('Speech recognition error:', error);
		} finally {
			isListening = false;
		}
	}

	async function processVoiceCommand(command: string) {
		isProcessing = true;
		try {
			const response = await getVoiceResponse(command);
			await speakResponse(response);
		} catch (error) {
			console.error('Voice processing error:', error);
			await speakResponse('Sorry, I encountered an error.');
		} finally {
			isProcessing = false;
		}
	}

	async function speakResponse(text: string) {
		await TextToSpeech.speak({
			text,
			lang: 'en-US',
			rate: 1.0,
			pitch: 1.0,
			volume: 1.0
		});
	}
</script>

<!-- Floating Voice Button -->
<button
	class="fixed bottom-20 right-4 w-16 h-16 bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white text-2xl transition-all {isListening ? 'bg-red-500 animate-pulse' : ''} {isProcessing ? 'bg-yellow-500' : ''}"
	onclick={startListening}
	disabled={isListening || isProcessing}
>
	{#if isProcessing}
		<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
		</svg>
	{:else if isListening}
		<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
		</svg>
	{:else}
		<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
		</svg>
	{/if}
</button>

<style>
	@keyframes pulse {
		0%, 100% { transform: scale(1); }
		50% { transform: scale(1.1); }
	}
	.animate-pulse {
		animation: pulse 1s infinite;
	}
</style>