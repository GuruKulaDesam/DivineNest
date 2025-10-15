import { deLocalizeUrl } from '$lib/paraglide/runtime';

export const reroute = (request: { url: URL }) => deLocalizeUrl(request.url).pathname;

export async function transport({ from, to, route }: { from: string; to: string; route: { id: string } }) {
	// Handle route transitions
	console.log('Route transition:', { from, to, route });
}
