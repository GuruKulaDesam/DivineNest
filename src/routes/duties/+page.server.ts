import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		// Load duty types
		const dutyTypesData = await db.dutyType.findMany({
			orderBy: { code: 'asc' }
		});

		// Load duties with their types
		const dutiesData = await db.duty.findMany({
			include: {
				dutyType: true,
				responsibilities: true
			},
			orderBy: { createdAt: 'desc' }
		});

		// Load responsibilities with their duties and types
		const responsibilitiesData = await db.responsibility.findMany({
			include: {
				duty: {
					include: {
						dutyType: true
					}
				}
			},
			orderBy: { createdAt: 'desc' }
		});

		// Group responsibilities by duty type code
		const responsibilitiesByType = responsibilitiesData.reduce((acc: Record<string, typeof responsibilitiesData[0][]>, resp: typeof responsibilitiesData[0]) => {
			const typeCode = resp.duty?.dutyType?.code;
			if (typeCode && !acc[typeCode]) {
				acc[typeCode] = [];
			}
			if (typeCode) {
				acc[typeCode].push(resp);
			}
			return acc;
		}, {});

		return {
			dutyTypes: dutyTypesData,
			duties: dutiesData,
			responsibilitiesByType
		};
	} catch (error) {
		console.error('Error loading duties:', error);
		return {
			dutyTypes: [],
			duties: [],
			responsibilitiesByType: {}
		};
	}
};