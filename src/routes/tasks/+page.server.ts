import { db } from '$lib/server/db';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		// Load duties data with their types and responsibilities
		const dutiesData = await db.duty.findMany({
			include: {
				dutyType: true,
				responsibilities: true
			},
			orderBy: { createdAt: 'desc' }
		});

		return {
			duties: dutiesData
		};
	} catch (error) {
		console.error('Error loading duties:', error);
		return {
			duties: []
		};
	}
};

export const actions: Actions = {
	createDuty: async ({ request }) => {
		try {
			const data = await request.formData();
			const dutyCode = data.get('dutyCode') as string;
			const title = data.get('title') as string;
			const description = data.get('description') as string;
			const role = data.get('role') as string;
			const frequency = data.get('frequency') as string;

			if (!dutyCode?.trim() || !title?.trim()) {
				return fail(400, { error: 'Duty code and title are required' });
			}

			await db.duty.create({
				data: {
					dutyCode: dutyCode.trim(),
					title: title.trim(),
					description: description?.trim() || null,
					role: role?.trim() || 'All',
					frequency: frequency?.trim() || 'Daily',
					sourceText: data.get('sourceText')?.toString()?.trim() || null
				}
			});

			return { success: true };
		} catch (error) {
			console.error('Error creating duty:', error);
			return fail(500, { error: 'Failed to create duty' });
		}
	},

	updateDuty: async ({ request }) => {
		try {
			const data = await request.formData();
			const id = parseInt(data.get('id') as string);
			const title = data.get('title') as string;
			const description = data.get('description') as string;
			const role = data.get('role') as string;
			const frequency = data.get('frequency') as string;

			if (!id || !title?.trim()) {
				return fail(400, { error: 'ID and title are required' });
			}

			await db.duty.update({
				where: { id },
				data: {
					title: title.trim(),
					description: description?.trim() || null,
					role: role?.trim() || 'All',
					frequency: frequency?.trim() || 'Daily',
					sourceText: data.get('sourceText')?.toString()?.trim() || null
				}
			});

			return { success: true };
		} catch (error) {
			console.error('Error updating duty:', error);
			return fail(500, { error: 'Failed to update duty' });
		}
	},

	deleteDuty: async ({ request }) => {
		try {
			const data = await request.formData();
			const id = parseInt(data.get('id') as string);

			if (!id) {
				return fail(400, { error: 'ID is required' });
			}

			await db.duty.delete({
				where: { id }
			});

			return { success: true };
		} catch (error) {
			console.error('Error deleting duty:', error);
			return fail(500, { error: 'Failed to delete duty' });
		}
	}
};