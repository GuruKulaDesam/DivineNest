<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	interface Props {
		issueCategory: string;
		mode: 'create' | 'edit';
		initialData?: any;
	}

	let { issueCategory, mode, initialData = {} }: Props = $props();

	// Common fields
	let type = $state('External');
	let status = $state('Reported');
	let location = $state('');
	let contact = $state('');
	let assignedTo = $state('');
	let applicableRole = $state('All');

	// Category-specific fields
	let emergencyType = $state('');
	let severity = $state('');
	let responseTime = $state('');
	let emergencyContacts = $state('');
	let backupPlan = $state('');

	let urgentType = $state('');
	let deadline = $state('');
	let impact = $state('');
	let stakeholders = $state('');
	let actionPlan = $state('');

	let item = $state('');
	let damage = $state('');
	let repairType = $state('');
	let estimatedCost = $state(0);
	let contractor = $state('');
	let parts = $state('');
	let repairStatus = $state('Assessment');

	let system = $state('');
	let maintenanceType = $state('');
	let schedule = $state('');
	let maintenanceContractor = $state('');
	let cost = $state(0);
	let lastService = $state('');
	let nextService = $state('');

	let upgradeType = $state('');
	let benefit = $state('');
	let roi = $state('');
	let budget = $state(0);
	let timeline = $state('');
	let upgradeStatus = $state('Proposed');

	let conflictType = $state('');
	let parties = $state('');
	let description = $state('');
	let conflictImpact = $state('');
	let resolution = $state('');
	let mediator = $state('');
	let conflictStatus = $state('Open');

	let habitType = $state('');
	let habitDescription = $state('');
	let triggers = $state('');
	let consequences = $state('');
	let strategy = $state('');
	let progress = $state('');

	// Initialize form data if editing
	$effect(() => {
		if (mode === 'edit' && initialData) {
			type = initialData.type || 'External';
			status = initialData.status || 'Reported';
			location = initialData.location || '';
			contact = initialData.contact || '';
			assignedTo = initialData.assignedTo || '';
			applicableRole = initialData.applicableRole || 'All';

			// Load category-specific data
			if (issueCategory === 'Emergency' && initialData.emergency) {
				emergencyType = initialData.emergency.emergencyType || '';
				severity = initialData.emergency.severity || '';
				responseTime = initialData.emergency.responseTime || '';
				emergencyContacts = initialData.emergency.emergencyContacts || '';
				backupPlan = initialData.emergency.backupPlan || '';
			}
			// Add similar loading for other categories...
		}
	});

	function submitForm() {
		const formData = {
			type,
			category: issueCategory,
			status,
			location,
			contact,
			assignedTo,
			applicableRole,
			createdAt: new Date(),
			// Category-specific data
			childData: getCategorySpecificData()
		};

		dispatch('submit', { formData });
	}

	function getCategorySpecificData() {
		switch (issueCategory) {
			case 'Emergency':
				return {
					emergencyType,
					severity,
					responseTime,
					emergencyContacts,
					backupPlan,
					status: 'Responding',
					lastUpdated: new Date()
				};
			case 'Urgent':
				return {
					urgentType,
					deadline: deadline ? new Date(deadline) : null,
					impact,
					stakeholders,
					actionPlan,
					status: 'In Progress',
					lastUpdated: new Date()
				};
			case 'Repairs':
				return {
					item,
					damage,
					repairType,
					estimatedCost,
					contractor,
					parts,
					status: repairStatus,
					lastUpdated: new Date()
				};
			case 'Maintenance':
				return {
					system,
					maintenanceType,
					schedule,
					contractor: maintenanceContractor,
					cost,
					lastService: lastService ? new Date(lastService) : null,
					nextService: nextService ? new Date(nextService) : null
				};
			case 'Upgrades':
				return {
					upgradeType,
					benefit,
					roi,
					budget,
					timeline,
					status: upgradeStatus,
					lastUpdated: new Date()
				};
			case 'Conflicts':
				return {
					conflictType,
					parties,
					description,
					impact: conflictImpact,
					resolution,
					mediator,
					status: conflictStatus,
					lastUpdated: new Date()
				};
			case 'Habits':
				return {
					habitType,
					description: habitDescription,
					triggers,
					consequences,
					strategy,
					progress,
					lastUpdated: new Date()
				};
			default:
				return {};
		}
	}

	function cancelForm() {
		dispatch('cancel');
	}
</script>

<div class="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
	<!-- Header -->
	<div class="bg-gradient-to-r from-red-500 to-orange-500 text-white p-6">
		<div class="flex justify-between items-center">
			<div>
				<h2 class="text-2xl font-bold">
					{mode === 'create' ? 'Create' : 'Edit'} {issueCategory} Issue
				</h2>
				<p class="text-red-100 mt-1">
					{mode === 'create' ? 'Add a new issue to track' : 'Update existing issue details'}
				</p>
			</div>
			<button
				onclick={cancelForm}
				class="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
				aria-label="Close form"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
				</svg>
			</button>
		</div>
	</div>

	<!-- Form Content -->
	<div class="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
		<form onsubmit={submitForm} class="space-y-6">
			<!-- Common Fields -->
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label for="type" class="block text-sm font-medium text-gray-700 mb-2">Type</label>
					<select
						id="type"
						bind:value={type}
						class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
					>
						<option value="External">External</option>
						<option value="Internal">Internal</option>
					</select>
				</div>

				<div>
					<label for="status" class="block text-sm font-medium text-gray-700 mb-2">Status</label>
					<select
						id="status"
						bind:value={status}
						class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
					>
						<option value="Reported">Reported</option>
						<option value="Assigned">Assigned</option>
						<option value="In Progress">In Progress</option>
						<option value="Resolved">Resolved</option>
					</select>
				</div>

				<div>
					<label for="location" class="block text-sm font-medium text-gray-700 mb-2">Location</label>
					<input
						type="text"
						id="location"
						bind:value={location}
						placeholder="e.g., Kitchen, Bedroom, Garden"
						class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
					/>
				</div>

				<div>
					<label for="contact" class="block text-sm font-medium text-gray-700 mb-2">Contact</label>
					<input
						type="text"
						id="contact"
						bind:value={contact}
						placeholder="e.g., Plumber: +91-9876543210"
						class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
					/>
				</div>

				<div>
					<label for="assignedTo" class="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
					<select
						id="assignedTo"
						bind:value={assignedTo}
						class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
					>
						<option value="">Select person</option>
						<option value="user-1">Ramu (Father)</option>
						<option value="user-2">Lakshmi (Mother)</option>
						<option value="user-3">Arjun (Son)</option>
						<option value="user-4">Priya (Daughter)</option>
					</select>
				</div>

				<div>
					<label for="applicableRole" class="block text-sm font-medium text-gray-700 mb-2">Applicable Role</label>
					<select
						id="applicableRole"
						bind:value={applicableRole}
						class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
					>
						<option value="All">All</option>
						<option value="Parents">Parents</option>
						<option value="Children">Children</option>
						<option value="Father">Father</option>
						<option value="Mother">Mother</option>
					</select>
				</div>
			</div>

			<!-- Category-Specific Fields -->
			{#if issueCategory === 'Emergency'}
				<div class="border-t pt-6">
					<h3 class="text-lg font-semibold text-gray-900 mb-4">Emergency Details</h3>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label for="emergencyType" class="block text-sm font-medium text-gray-700 mb-2">Emergency Type</label>
							<select
								id="emergencyType"
								bind:value={emergencyType}
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
							>
								<option value="">Select type</option>
								<option value="Medical">Medical</option>
								<option value="Safety">Safety</option>
								<option value="Security">Security</option>
								<option value="Electrical">Electrical</option>
								<option value="Plumbing">Plumbing</option>
							</select>
						</div>

						<div>
							<label for="severity" class="block text-sm font-medium text-gray-700 mb-2">Severity</label>
							<select
								id="severity"
								bind:value={severity}
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
							>
								<option value="">Select severity</option>
								<option value="Critical">Critical</option>
								<option value="High">High</option>
								<option value="Medium">Medium</option>
								<option value="Low">Low</option>
							</select>
						</div>

						<div>
							<label for="responseTime" class="block text-sm font-medium text-gray-700 mb-2">Response Time</label>
							<input
								type="text"
								id="responseTime"
								bind:value={responseTime}
								placeholder="e.g., Immediate, Within 1 hour"
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
							/>
						</div>

						<div class="md:col-span-2">
							<label for="emergencyContacts" class="block text-sm font-medium text-gray-700 mb-2">Emergency Contacts</label>
							<textarea
								id="emergencyContacts"
								bind:value={emergencyContacts}
								rows="3"
								placeholder="List emergency contact numbers and people"
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
							></textarea>
						</div>

						<div class="md:col-span-2">
							<label for="backupPlan" class="block text-sm font-medium text-gray-700 mb-2">Backup Plan</label>
							<textarea
								id="backupPlan"
								bind:value={backupPlan}
								rows="3"
								placeholder="Describe backup plan if primary response fails"
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
							></textarea>
						</div>
					</div>
				</div>
			{:else if issueCategory === 'Repairs'}
				<div class="border-t pt-6">
					<h3 class="text-lg font-semibold text-gray-900 mb-4">Repair Details</h3>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label for="item" class="block text-sm font-medium text-gray-700 mb-2">Item to Repair</label>
							<input
								type="text"
								id="item"
								bind:value={item}
								placeholder="e.g., Kitchen Sink, Door, Light Fixture"
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
							/>
						</div>

						<div>
							<label for="damage" class="block text-sm font-medium text-gray-700 mb-2">Damage Description</label>
							<input
								type="text"
								id="damage"
								bind:value={damage}
								placeholder="Describe the damage"
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
							/>
						</div>

						<div>
							<label for="repairType" class="block text-sm font-medium text-gray-700 mb-2">Repair Type</label>
							<select
								id="repairType"
								bind:value={repairType}
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
							>
								<option value="">Select type</option>
								<option value="Plumbing">Plumbing</option>
								<option value="Electrical">Electrical</option>
								<option value="Carpentry">Carpentry</option>
								<option value="Painting">Painting</option>
								<option value="Appliance">Appliance</option>
							</select>
						</div>

						<div>
							<label for="estimatedCost" class="block text-sm font-medium text-gray-700 mb-2">Estimated Cost (₹)</label>
							<input
								type="number"
								id="estimatedCost"
								bind:value={estimatedCost}
								min="0"
								step="0.01"
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
							/>
						</div>

						<div>
							<label for="contractor" class="block text-sm font-medium text-gray-700 mb-2">Contractor</label>
							<input
								type="text"
								id="contractor"
								bind:value={contractor}
								placeholder="Contractor name or company"
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
							/>
						</div>

						<div>
							<label for="repairStatus" class="block text-sm font-medium text-gray-700 mb-2">Repair Status</label>
							<select
								id="repairStatus"
								bind:value={repairStatus}
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
							>
								<option value="Assessment">Assessment</option>
								<option value="Quoted">Quoted</option>
								<option value="Approved">Approved</option>
								<option value="In Progress">In Progress</option>
								<option value="Completed">Completed</option>
							</select>
						</div>

						<div class="md:col-span-2">
							<label for="parts" class="block text-sm font-medium text-gray-700 mb-2">Parts Needed</label>
							<textarea
								id="parts"
								bind:value={parts}
								rows="3"
								placeholder="List parts and materials needed"
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
							></textarea>
						</div>
					</div>
				</div>
			{:else if issueCategory === 'Maintenance'}
				<div class="border-t pt-6">
					<h3 class="text-lg font-semibold text-gray-900 mb-4">Maintenance Details</h3>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label for="system" class="block text-sm font-medium text-gray-700 mb-2">System</label>
							<select
								id="system"
								bind:value={system}
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
							>
								<option value="">Select system</option>
								<option value="HVAC">HVAC</option>
								<option value="Plumbing">Plumbing</option>
								<option value="Electrical">Electrical</option>
								<option value="Roofing">Roofing</option>
								<option value="Gardening">Gardening</option>
								<option value="Appliance">Appliance</option>
							</select>
						</div>

						<div>
							<label for="maintenanceType" class="block text-sm font-medium text-gray-700 mb-2">Maintenance Type</label>
							<select
								id="maintenanceType"
								bind:value={maintenanceType}
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
							>
								<option value="">Select type</option>
								<option value="Preventive">Preventive</option>
								<option value="Corrective">Corrective</option>
								<option value="Predictive">Predictive</option>
							</select>
						</div>

						<div>
							<label for="schedule" class="block text-sm font-medium text-gray-700 mb-2">Schedule</label>
							<select
								id="schedule"
								bind:value={schedule}
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
							>
								<option value="">Select schedule</option>
								<option value="Daily">Daily</option>
								<option value="Weekly">Weekly</option>
								<option value="Monthly">Monthly</option>
								<option value="Quarterly">Quarterly</option>
								<option value="Annually">Annually</option>
								<option value="As Needed">As Needed</option>
							</select>
						</div>

						<div>
							<label for="maintenanceContractor" class="block text-sm font-medium text-gray-700 mb-2">Contractor</label>
							<input
								type="text"
								id="maintenanceContractor"
								bind:value={maintenanceContractor}
								placeholder="Maintenance service provider"
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
							/>
						</div>

						<div>
							<label for="cost" class="block text-sm font-medium text-gray-700 mb-2">Cost (₹)</label>
							<input
								type="number"
								id="cost"
								bind:value={cost}
								min="0"
								step="0.01"
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
							/>
						</div>

						<div>
							<label for="lastService" class="block text-sm font-medium text-gray-700 mb-2">Last Service Date</label>
							<input
								type="date"
								id="lastService"
								bind:value={lastService}
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
							/>
						</div>

						<div>
							<label for="nextService" class="block text-sm font-medium text-gray-700 mb-2">Next Service Date</label>
							<input
								type="date"
								id="nextService"
								bind:value={nextService}
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
							/>
						</div>
					</div>
				</div>
			{/if}

			<!-- Form Actions -->
			<div class="flex justify-end space-x-4 pt-6 border-t">
				<button
					type="button"
					onclick={cancelForm}
					class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
				>
					Cancel
				</button>
				<button
					type="submit"
					class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
				>
					{mode === 'create' ? 'Create Issue' : 'Update Issue'}
				</button>
			</div>
		</form>
	</div>
</div>