import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface User {
	id: string;
	username: string;
	nickname: string;
	email: string;
	phoneNumber: string;
	emergencyContact: string;
	emergencyContactPhone: string;
	role: string;
	age: number;
	location: string;
	timezone: string;
	preferredLanguage: string;
	isActive: boolean;
}

const defaultUser: User = {
	id: 'default-user',
	username: 'family_member',
	nickname: 'Family Member',
	email: 'family@example.com',
	phoneNumber: '',
	emergencyContact: '',
	emergencyContactPhone: '',
	role: 'Parent',
	age: 35,
	location: 'New York, NY, USA',
	timezone: 'America/New_York',
	preferredLanguage: 'en',
	isActive: true
};

function createUserStore() {
	const { subscribe, set, update } = writable<User>(defaultUser);

	return {
		subscribe,
		set,
		update,
		loadFromStorage: () => {
			if (browser) {
				const stored = localStorage.getItem('divine-nest-user');
				if (stored) {
					try {
						const userData = JSON.parse(stored);
						set({ ...defaultUser, ...userData });
					} catch (error) {
						console.error('Error loading user data:', error);
						set(defaultUser);
					}
				}
			}
		},
		saveToStorage: (user: User) => {
			if (browser) {
				localStorage.setItem('divine-nest-user', JSON.stringify(user));
			}
		},
		updateUser: (updates: Partial<User>) => {
			update(user => {
				const updatedUser = { ...user, ...updates };
				if (browser) {
					localStorage.setItem('divine-nest-user', JSON.stringify(updatedUser));
				}
				return updatedUser;
			});
		}
	};
}

export const userStore = createUserStore();