import { db } from '$lib/server/db';
import { enhancedTasks, projects, taskLabels } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		// Load initial data
		const tasksResult = await db.select({
			id: enhancedTasks.id,
			title: enhancedTasks.title,
			description: enhancedTasks.description,
			completed: enhancedTasks.completed,
			priority: enhancedTasks.priority,
			dueDate: enhancedTasks.dueDate,
			projectId: enhancedTasks.projectId,
			createdAt: enhancedTasks.createdAt,
			updatedAt: enhancedTasks.updatedAt,
			project: {
				id: projects.id,
				name: projects.name,
				color: projects.color
			},
			labels: {
				id: taskLabels.id,
				name: taskLabels.name,
				color: taskLabels.color
			}
		})
		.from(enhancedTasks)
		.leftJoin(projects, eq(enhancedTasks.projectId, projects.id))
		.leftJoin(taskLabels, eq(enhancedTasks.id, taskLabels.id)) // This might need adjustment based on your schema
		.orderBy(desc(enhancedTasks.createdAt));

		const projectsList = await db.select().from(projects).orderBy(projects.name);
		const labels = await db.select().from(taskLabels).orderBy(taskLabels.name);

		return {
			tasks: tasksResult,
			projects: projectsList,
			labels: labels
		};
	} catch (error) {
		console.error('Error loading tasks:', error);
		return {
			tasks: [],
			projects: [],
			labels: []
		};
	}
};

export const actions: Actions = {
	createTask: async ({ request }) => {
		try {
			const data = await request.formData();
			const title = data.get('title') as string;
			const description = data.get('description') as string;
			const priority = data.get('priority') as string;
			const dueDate = data.get('dueDate') as string;
			const projectId = data.get('projectId') as string;

			if (!title?.trim()) {
				return fail(400, { error: 'Title is required' });
			}

			await db.insert(enhancedTasks).values({
				id: crypto.randomUUID(),
				title: title.trim(),
				description: description?.trim() || null,
				priority: priority === 'high' ? 1 : priority === 'medium' ? 2 : priority === 'low' ? 3 : 4,
				dueDate: dueDate ? new Date(dueDate) : null,
				projectId: projectId ? projectId : null,
				isCompleted: false,
				createdBy: 'system', // TODO: Get from user session
				createdAt: new Date(),
				updatedAt: new Date()
			});

			return { success: true };
		} catch (error) {
			console.error('Error creating task:', error);
			return fail(500, { error: 'Failed to create task' });
		}
	},

	updateTask: async ({ request }) => {
		try {
			const data = await request.formData();
			const id = data.get('id') as string;
			const title = data.get('title') as string;
			const description = data.get('description') as string;
			const completed = data.get('completed') === 'true';
			const priority = data.get('priority') as string;
			const dueDate = data.get('dueDate') as string;
			const projectId = data.get('projectId') as string;

			if (!id) {
				return fail(400, { error: 'Task ID is required' });
			}

			await db.update(enhancedTasks)
				.set({
					title: title?.trim() || undefined,
					description: description?.trim() || undefined,
					completed: completed,
					priority: priority || undefined,
					dueDate: dueDate ? new Date(dueDate) : undefined,
					projectId: projectId ? parseInt(projectId) : undefined,
					updatedAt: new Date()
				})
				.where(eq(enhancedTasks.id, parseInt(id)));

			return { success: true };
		} catch (error) {
			console.error('Error updating task:', error);
			return fail(500, { error: 'Failed to update task' });
		}
	},

	deleteTask: async ({ request }) => {
		try {
			const data = await request.formData();
			const id = data.get('id') as string;

			if (!id) {
				return fail(400, { error: 'Task ID is required' });
			}

			await db.delete(enhancedTasks).where(eq(enhancedTasks.id, parseInt(id)));

			return { success: true };
		} catch (error) {
			console.error('Error deleting task:', error);
			return fail(500, { error: 'Failed to delete task' });
		}
	},

	createProject: async ({ request }) => {
		try {
			const data = await request.formData();
			const name = data.get('name') as string;
			const color = data.get('color') as string;

			if (!name?.trim()) {
				return fail(400, { error: 'Project name is required' });
			}

			await db.insert(projects).values({
				id: crypto.randomUUID(),
				name: name.trim(),
				color: color || '#3B82F6',
				createdAt: new Date()
			});

			return { success: true };
		} catch (error) {
			console.error('Error creating project:', error);
			return fail(500, { error: 'Failed to create project' });
		}
	},

	createLabel: async ({ request }) => {
		try {
			const data = await request.formData();
			const name = data.get('name') as string;
			const color = data.get('color') as string;

			if (!name?.trim()) {
				return fail(400, { error: 'Label name is required' });
			}

			await db.insert(taskLabels).values({
				id: crypto.randomUUID(),
				name: name.trim(),
				color: color || '#6B7280',
				createdBy: 'system', // TODO: Get from user session
				createdAt: new Date()
			});

			return { success: true };
		} catch (error) {
			console.error('Error creating label:', error);
			return fail(500, { error: 'Failed to create label' });
		}
	}
};