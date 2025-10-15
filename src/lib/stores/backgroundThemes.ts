// Background themes store
import { writable } from 'svelte/store';

export interface BackgroundTheme {
	id: string;
	name: string;
	primaryGradient: string;
	secondaryGradient: string;
	floatingShapes: Array<{
		size: string;
		position: string;
		colors: string;
		animation: string;
		shape?: string;
	}>;
	accentColor: string;
	textColor: string;
	description: string;
}

export const backgroundThemes: BackgroundTheme[] = [
	{
		id: 'family-warm',
		name: 'Family Warmth',
		primaryGradient: 'from-amber-400/30 via-orange-500/20 to-rose-500/30',
		secondaryGradient: 'from-yellow-600/20 via-red-400/15 to-pink-500/25',
		floatingShapes: [
			{ size: 'w-36 h-36', position: 'top-16 left-12', colors: 'from-yellow-300/35 to-orange-400/25', animation: 'animate-float-slow', shape: 'rounded-full' },
			{ size: 'w-28 h-28', position: 'top-40 right-20', colors: 'from-pink-300/30 to-rose-400/20', animation: 'animate-float-medium', shape: 'rounded-lg rotate-45' },
			{ size: 'w-44 h-44', position: 'bottom-40 left-16', colors: 'from-red-300/25 to-pink-400/15', animation: 'animate-float-fast', shape: 'rounded-full' },
			{ size: 'w-32 h-32', position: 'bottom-28 right-40', colors: 'from-orange-300/35 to-amber-400/25', animation: 'animate-float-slow', shape: 'rounded-xl rotate-12' },
			{ size: 'w-24 h-24', position: 'top-2/3 left-1/4', colors: 'from-rose-300/40 to-red-400/30', animation: 'animate-float-medium', shape: 'rounded-full' },
			{ size: 'w-40 h-40', position: 'top-1/4 right-1/3', colors: 'from-amber-300/30 to-yellow-400/20', animation: 'animate-float-fast', shape: 'rounded-lg rotate-30' }
		],
		accentColor: 'from-amber-500 to-orange-600',
		textColor: 'text-amber-800',
		description: 'Warm, welcoming colors perfect for family gatherings'
	},
	{
		id: 'productivity-blue',
		name: 'Productivity Focus',
		primaryGradient: 'from-blue-400/30 via-indigo-500/20 to-purple-500/30',
		secondaryGradient: 'from-cyan-600/20 via-blue-400/15 to-emerald-500/25',
		floatingShapes: [
			{ size: 'w-32 h-32', position: 'top-10 left-10', colors: 'from-blue-300/40 to-purple-400/30', animation: 'animate-float-slow', shape: 'rounded-full' },
			{ size: 'w-24 h-24', position: 'top-32 right-16', colors: 'from-pink-300/35 to-rose-400/25', animation: 'animate-float-medium', shape: 'rounded-lg rotate-45' },
			{ size: 'w-40 h-40', position: 'bottom-32 left-20', colors: 'from-cyan-300/30 to-teal-400/20', animation: 'animate-float-fast', shape: 'rounded-full' },
			{ size: 'w-28 h-28', position: 'bottom-20 right-32', colors: 'from-emerald-300/35 to-green-400/25', animation: 'animate-float-slow', shape: 'rounded-xl rotate-12' },
			{ size: 'w-20 h-20', position: 'top-1/2 left-1/3', colors: 'from-violet-300/40 to-indigo-400/30', animation: 'animate-float-medium', shape: 'rounded-full' },
			{ size: 'w-36 h-36', position: 'top-3/4 right-1/4', colors: 'from-orange-300/30 to-red-400/20', animation: 'animate-float-fast', shape: 'rounded-lg rotate-30' }
		],
		accentColor: 'from-blue-500 to-indigo-600',
		textColor: 'text-blue-800',
		description: 'Cool, focused colors for productivity and planning'
	},
	{
		id: 'nature-serene',
		name: 'Nature Serene',
		primaryGradient: 'from-green-400/30 via-teal-500/20 to-emerald-500/30',
		secondaryGradient: 'from-lime-600/20 via-green-400/15 to-cyan-500/25',
		floatingShapes: [
			{ size: 'w-36 h-36', position: 'top-16 left-12', colors: 'from-green-300/35 to-teal-400/25', animation: 'animate-float-slow', shape: 'rounded-full' },
			{ size: 'w-28 h-28', position: 'top-40 right-20', colors: 'from-emerald-300/30 to-cyan-400/20', animation: 'animate-float-medium', shape: 'rounded-lg rotate-45' },
			{ size: 'w-44 h-44', position: 'bottom-40 left-16', colors: 'from-teal-300/25 to-green-400/15', animation: 'animate-float-fast', shape: 'rounded-full' },
			{ size: 'w-32 h-32', position: 'bottom-28 right-40', colors: 'from-cyan-300/35 to-emerald-400/25', animation: 'animate-float-slow', shape: 'rounded-xl rotate-12' },
			{ size: 'w-24 h-24', position: 'top-2/3 left-1/4', colors: 'from-lime-300/40 to-green-400/30', animation: 'animate-float-medium', shape: 'rounded-full' },
			{ size: 'w-40 h-40', position: 'top-1/4 right-1/3', colors: 'from-emerald-300/30 to-teal-400/20', animation: 'animate-float-fast', shape: 'rounded-lg rotate-30' }
		],
		accentColor: 'from-green-500 to-teal-600',
		textColor: 'text-green-800',
		description: 'Calming nature-inspired colors for peaceful planning'
	},
	{
		id: 'creative-vibrant',
		name: 'Creative Vibrant',
		primaryGradient: 'from-purple-400/30 via-pink-500/20 to-rose-500/30',
		secondaryGradient: 'from-violet-600/20 via-purple-400/15 to-fuchsia-500/25',
		floatingShapes: [
			{ size: 'w-32 h-32', position: 'top-10 left-10', colors: 'from-purple-300/40 to-pink-400/30', animation: 'animate-float-slow', shape: 'rounded-full' },
			{ size: 'w-24 h-24', position: 'top-32 right-16', colors: 'from-pink-300/35 to-rose-400/25', animation: 'animate-float-medium', shape: 'rounded-lg rotate-45' },
			{ size: 'w-40 h-40', position: 'bottom-32 left-20', colors: 'from-violet-300/30 to-purple-400/20', animation: 'animate-float-fast', shape: 'rounded-full' },
			{ size: 'w-28 h-28', position: 'bottom-20 right-32', colors: 'from-fuchsia-300/35 to-pink-400/25', animation: 'animate-float-slow', shape: 'rounded-xl rotate-12' },
			{ size: 'w-20 h-20', position: 'top-1/2 left-1/3', colors: 'from-rose-300/40 to-purple-400/30', animation: 'animate-float-medium', shape: 'rounded-full' },
			{ size: 'w-36 h-36', position: 'top-3/4 right-1/4', colors: 'from-pink-300/30 to-fuchsia-400/20', animation: 'animate-float-fast', shape: 'rounded-lg rotate-30' }
		],
		accentColor: 'from-purple-500 to-pink-600',
		textColor: 'text-purple-800',
		description: 'Vibrant, creative colors for artistic family planning'
	},
	{
		id: 'sunset-golden',
		name: 'Sunset Golden',
		primaryGradient: 'from-yellow-400/30 via-amber-500/20 to-orange-500/30',
		secondaryGradient: 'from-orange-600/20 via-yellow-400/15 to-red-500/25',
		floatingShapes: [
			{ size: 'w-36 h-36', position: 'top-16 left-12', colors: 'from-yellow-300/35 to-amber-400/25', animation: 'animate-float-slow', shape: 'rounded-full' },
			{ size: 'w-28 h-28', position: 'top-40 right-20', colors: 'from-orange-300/30 to-red-400/20', animation: 'animate-float-medium', shape: 'rounded-lg rotate-45' },
			{ size: 'w-44 h-44', position: 'bottom-40 left-16', colors: 'from-amber-300/25 to-orange-400/15', animation: 'animate-float-fast', shape: 'rounded-full' },
			{ size: 'w-32 h-32', position: 'bottom-28 right-40', colors: 'from-red-300/35 to-amber-400/25', animation: 'animate-float-slow', shape: 'rounded-xl rotate-12' },
			{ size: 'w-24 h-24', position: 'top-2/3 left-1/4', colors: 'from-orange-300/40 to-yellow-400/30', animation: 'animate-float-medium', shape: 'rounded-full' },
			{ size: 'w-40 h-40', position: 'top-1/4 right-1/3', colors: 'from-amber-300/30 to-red-400/20', animation: 'animate-float-fast', shape: 'rounded-lg rotate-30' }
		],
		accentColor: 'from-yellow-500 to-orange-600',
		textColor: 'text-yellow-800',
		description: 'Golden sunset colors for warm, inviting family time'
	}
];

// Current theme store
export const currentBackgroundTheme = writable<BackgroundTheme>(backgroundThemes[0]);

// Function to change theme
export function setBackgroundTheme(themeId: string) {
	const theme = backgroundThemes.find(t => t.id === themeId);
	if (theme) {
		backgroundStore.set({
			currentTheme: theme.primaryGradient
		});
		localStorage.setItem('backgroundTheme', themeId);
	}
}

// Load saved theme on app start
export function loadSavedTheme() {
	const savedThemeId = localStorage.getItem('backgroundTheme');
	if (savedThemeId) {
		const theme = backgroundThemes.find(t => t.id === savedThemeId);
		if (theme) {
			backgroundStore.set({
				currentTheme: theme.primaryGradient
			});
		}
	}
}

// Background store object for compatibility
export const backgroundStore = writable({
	currentTheme: backgroundThemes[0].primaryGradient
});