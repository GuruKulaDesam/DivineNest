<script lang="ts">
	import { onMount } from 'svelte';
	import { userStore } from '$lib/stores/user';
	import { backgroundStore } from '$lib/stores/backgroundThemes';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let tasks: any[] = data.tasks || [];
	let projectsList: any[] = data.projects || [];
	let labels: any[] = data.labels || [];
	let showAddTaskModal = false;
	let showAddProjectModal = false;
	let showAddLabelModal = false;
	let searchQuery = '';
	let filterPriority = 'all';
	let filterProject = 'all';
	let filterStatus = 'all';

	// Form data
	let newTask = {
		title: '',
		description: '',
		priority: 'medium',
		projectId: null,
		dueDate: '',
		labels: []
	};

	let newProject = {
		name: '',
		color: '#3b82f6',
		description: ''
	};

	let newLabel = {
		name: '',
		color: '#10b981'
	};

	$: filteredTasks = tasks.filter(task => {
		const matchesSearch = !searchQuery ||
			task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			task.description?.toLowerCase().includes(searchQuery.toLowerCase());

		const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
		const matchesProject = filterProject === 'all' || task.projectId === parseInt(filterProject);
		const matchesStatus = filterStatus === 'all' ||
			(filterStatus === 'completed' && task.completed) ||
			(filterStatus === 'pending' && !task.completed);

		return matchesSearch && matchesPriority && matchesProject && matchesStatus;
	});

	function getPriorityColor(priority: string) {
		switch (priority) {
			case 'high': return 'text-red-400';
			case 'medium': return 'text-yellow-400';
			case 'low': return 'text-green-400';
			default: return 'text-gray-400';
		}
	}

	function getPriorityIcon(priority: string) {
		switch (priority) {
			case 'high': return '🔴';
			case 'medium': return '🟡';
			case 'low': return '🟢';
			default: return '⚪';
		}
	}

	// Handle successful form submissions
	$: if (form?.success) {
		// Refresh data after successful operations
		invalidateAll();
	}
</script>

<svelte:head>
	<title>Tasks - Divine Nest</title>
</svelte:head>

<div class="min-h-screen {$backgroundStore.currentTheme} p-4">
	<div class="max-w-7xl mx-auto">
		<!-- Header -->
		<div class="glass-card p-6 mb-6">
			<div class="flex items-center justify-between mb-4">
				<div>
					<h1 class="text-3xl font-bold text-white mb-2">Tasks</h1>
					<p class="text-gray-300">Manage your tasks with priorities, projects, and due dates</p>
				</div>
				<div class="flex gap-3">
					<button
						on:click={() => showAddLabelModal = true}
						class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
					>
						+ Label
					</button>
					<button
						on:click={() => showAddProjectModal = true}
						class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
					>
						+ Project
					</button>
					<button
						on:click={() => showAddTaskModal = true}
						class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
					>
						+ Task
					</button>
				</div>
			</div>

			<!-- Filters -->
			<div class="flex flex-wrap gap-4">
				<div class="flex-1 min-w-64">
					<input
						bind:value={searchQuery}
						type="text"
						placeholder="Search tasks..."
						class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<select
					bind:value={filterPriority}
					class="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					<option value="all">All Priorities</option>
					<option value="high">High</option>
					<option value="medium">Medium</option>
					<option value="low">Low</option>
				</select>
				<select
					bind:value={filterProject}
					class="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					<option value="all">All Projects</option>
					{#each projectsList as project}
						<option value={project.id}>{project.name}</option>
					{/each}
				</select>
				<select
					bind:value={filterStatus}
					class="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					<option value="all">All Status</option>
					<option value="pending">Pending</option>
					<option value="completed">Completed</option>
				</select>
			</div>
		</div>

		<!-- Tasks Grid -->
		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each filteredTasks as task}
				<div class="glass-card p-4 hover:scale-105 transition-transform">
					<div class="flex items-start justify-between mb-3">
						<div class="flex items-center gap-3">
							<form method="POST" action="?/updateTask" use:enhance class="inline">
								<input type="hidden" name="id" value={task.id} />
								<input type="hidden" name="completed" value={!task.completed} />
								<button
									type="submit"
									class="w-6 h-6 rounded-full border-2 border-white/30 flex items-center justify-center hover:border-white transition-colors"
									class:border-green-400={task.completed}
									class:bg-green-400={task.completed}
								>
									{#if task.completed}
										<svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
											<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
										</svg>
									{/if}
								</button>
							</form>
							<div>
								<h3 class="text-lg font-semibold text-white {task.completed ? 'line-through opacity-60' : ''}">
									{task.title}
								</h3>
								<div class="flex items-center gap-2 mt-1">
									<span class="text-sm {getPriorityColor(task.priority)}">
										{getPriorityIcon(task.priority)} {task.priority}
									</span>
									{#if task.project}
										<span class="text-sm px-2 py-1 rounded-full text-white" style="background-color: {task.project.color}">
											{task.project.name}
										</span>
									{/if}
									{#if task.dueDate}
										<span class="text-sm text-gray-300">
											Due: {new Date(task.dueDate).toLocaleDateString()}
										</span>
									{/if}
								</div>
							</div>
						</div>
						<form method="POST" action="?/deleteTask" use:enhance class="inline">
							<input type="hidden" name="id" value={task.id} />
							<button
								type="submit"
								class="text-red-400 hover:text-red-300 transition-colors"
								aria-label="Delete task {task.title}"
								on:click={(e) => {
									if (!confirm('Are you sure you want to delete this task?')) {
										e.preventDefault();
									}
								}}
							>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H5.862a2 2 0 01-1.995-1.858L3 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
								</svg>
							</button>
						</form>
					</div>

					{#if task.description}
						<p class="text-gray-300 text-sm mb-3 {task.completed ? 'line-through opacity-60' : ''}">
							{task.description}
						</p>
					{/if}

					{#if task.labels && task.labels.length > 0}
						<div class="flex flex-wrap gap-2">
							{#each task.labels as label}
								<span
									class="text-xs px-2 py-1 rounded-full text-white"
									style="background-color: {label.color}"
								>
									{label.name}
								</span>
							{/each}
						</div>
					{/if}
				</div>
			{/each}
		</div>

		{#if filteredTasks.length === 0}
			<div class="glass-card p-8 text-center">
				<div class="text-6xl mb-4">📋</div>
				<h3 class="text-xl font-semibold text-white mb-2">No tasks found</h3>
				<p class="text-gray-300">Create your first task to get started!</p>
			</div>
		{/if}
	</div>
</div>

<!-- Add Task Modal -->
{#if showAddTaskModal}
	<div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
		<div class="glass-card p-6 w-full max-w-md">
			<h2 class="text-2xl font-bold text-white mb-4">Add New Task</h2>
			<form method="POST" action="?/createTask" use:enhance>
				<div class="space-y-4">
					<div>
						<label for="task-title" class="block text-sm font-medium text-gray-300 mb-1">Title *</label>
						<input
							name="title"
							id="task-title"
							bind:value={newTask.title}
							type="text"
							required
							class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter task title"
						/>
					</div>

					<div>
						<label for="task-description" class="block text-sm font-medium text-gray-300 mb-1">Description</label>
						<textarea
							name="description"
							id="task-description"
							bind:value={newTask.description}
							rows="3"
							class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter task description"
						></textarea>
					</div>

					<div>
						<label for="priority-select" class="block text-sm font-medium text-gray-300 mb-1">Priority</label>
						<select
							name="priority"
							id="priority-select"
							bind:value={newTask.priority}
							class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="low">Low</option>
							<option value="medium">Medium</option>
							<option value="high">High</option>
						</select>
					</div>

					<div>
						<label for="project-select" class="block text-sm font-medium text-gray-300 mb-1">Project</label>
						<select
							name="projectId"
							id="project-select"
							bind:value={newTask.projectId}
							class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value={null}>No Project</option>
							{#each projectsList as project}
								<option value={project.id}>{project.name}</option>
							{/each}
						</select>
					</div>

					<div>
						<label for="due-date-input" class="block text-sm font-medium text-gray-300 mb-1">Due Date</label>
						<input
							name="dueDate"
							id="due-date-input"
							bind:value={newTask.dueDate}
							type="date"
							class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div>
						<h3 class="block text-sm font-medium text-gray-300 mb-1">Labels</h3>
						<div class="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
							{#each labels as label}
								<label for="label-{label.id}" class="flex items-center gap-2 cursor-pointer">
									<input
										id="label-{label.id}"
										type="checkbox"
										bind:group={newTask.labels}
										value={label.id}
										class="rounded border-white/20 text-blue-600 focus:ring-blue-500"
									/>
									<span
										class="text-xs px-2 py-1 rounded-full text-white"
										style="background-color: {label.color}"
									>
										{label.name}
									</span>
								</label>
							{/each}
						</div>
					</div>
				</div>

				<div class="flex gap-3 mt-6">
					<button
						type="button"
						on:click={() => showAddTaskModal = false}
						class="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
					>
						Cancel
					</button>
					<button
						type="submit"
						class="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
					>
						Add Task
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<!-- Add Project Modal -->
{#if showAddProjectModal}
	<div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
		<div class="glass-card p-6 w-full max-w-md">
			<h2 class="text-2xl font-bold text-white mb-4">Add New Project</h2>
			<form method="POST" action="?/createProject" use:enhance>
				<div class="space-y-4">
					<div>
						<label for="project-name-input" class="block text-sm font-medium text-gray-300 mb-1">Name *</label>
						<input
							name="name"
							id="project-name-input"
							bind:value={newProject.name}
							type="text"
							required
							class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter project name"
						/>
					</div>

					<div>
						<label for="project-color-input" class="block text-sm font-medium text-gray-300 mb-1">Color</label>
						<input
							name="color"
							id="project-color-input"
							bind:value={newProject.color}
							type="color"
							class="w-full h-10 bg-white/10 border border-white/20 rounded-lg cursor-pointer"
						/>
					</div>

					<div>
						<label for="project-description-textarea" class="block text-sm font-medium text-gray-300 mb-1">Description</label>
						<textarea
							id="project-description-textarea"
							bind:value={newProject.description}
							rows="3"
							class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter project description"
						></textarea>
					</div>
				</div>

				<div class="flex gap-3 mt-6">
					<button
						type="button"
						on:click={() => showAddProjectModal = false}
						class="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
					>
						Cancel
					</button>
					<button
						type="submit"
						class="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
					>
						Add Project
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<!-- Add Label Modal -->
{#if showAddLabelModal}
	<div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
		<div class="glass-card p-6 w-full max-w-md">
			<h2 class="text-2xl font-bold text-white mb-4">Add New Label</h2>
			<form method="POST" action="?/createLabel" use:enhance>
				<div class="space-y-4">
					<div>
						<label for="label-name-input" class="block text-sm font-medium text-gray-300 mb-1">Name *</label>
						<input
							name="name"
							id="label-name-input"
							bind:value={newLabel.name}
							type="text"
							required
							class="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter label name"
						/>
					</div>

					<div>
						<label for="label-color-input" class="block text-sm font-medium text-gray-300 mb-1">Color</label>
						<input
							name="color"
							id="label-color-input"
							bind:value={newLabel.color}
							type="color"
							class="w-full h-10 bg-white/10 border border-white/20 rounded-lg cursor-pointer"
						/>
					</div>
				</div>

				<div class="flex gap-3 mt-6">
					<button
						type="button"
						on:click={() => showAddLabelModal = false}
						class="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
					>
						Cancel
					</button>
					<button
						type="submit"
						class="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
					>
						Add Label
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
	.glass-card {
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 12px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
	}
</style>