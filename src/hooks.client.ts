import { browser } from '$app/environment';

// Register service worker
if (browser && 'serviceWorker' in navigator) {
	// Wait for the page to load before registering
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/service-worker.js', { scope: '/' })
			.then((registration) => {
				console.log('[SW] Service worker registered successfully:', registration.scope);

				// Handle updates
				registration.addEventListener('updatefound', () => {
					const newWorker = registration.installing;
					if (newWorker) {
						newWorker.addEventListener('statechange', () => {
							if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
								console.log('[SW] New content is available and will be used when all tabs for this page are closed.');
							}
						});
					}
				});
			})
			.catch((error) => {
				console.error('[SW] Service worker registration failed:', error);
			});
	});
}

export async function handleError({ error, event }: { error: unknown; event: unknown }) {
	console.error('Client error:', error, event);
	return {
		message: 'An unexpected error occurred'
	};
}

export async function init() {
	// Client-side initialization
	console.log('Client hooks initialized');
}