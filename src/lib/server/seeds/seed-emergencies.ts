import { PrismaClient } from '@prisma/client';

export async function seedEmergencies(prisma: PrismaClient) {
  console.log('Seeding emergencies...');

  const emergencies = [
    {
      issueType: 'Emergency',
      description: 'Sudden illness prevents elder from performing daily lamp ritual',
      preventiveAction: 'Assign backup lamp-lighter role; keep herbal kit and oil lamp ready',
      role: 'Admin',
      urgencyLevel: 'Immediate',
      lifeStage: 'Elder',
    },
    {
      issueType: 'Emergency',
      description: 'Kitchen fire damages sacred altar and prayer books',
      preventiveAction: 'Fireproof altar zone; digitize sacred texts; store backup verses',
      role: 'Grand Mother',
      urgencyLevel: 'Critical',
      lifeStage: 'Householder',
    },
    {
      issueType: 'Emergency',
      description: 'Theft of ancestral vessels and family tree records',
      preventiveAction: 'Lock sacred cabinets; maintain cloud and print backups',
      role: 'Admin',
      urgencyLevel: 'High',
      lifeStage: 'Elder',
    },
    {
      issueType: 'Emergency',
      description: 'Death in extended family disrupts festival and temple routines',
      preventiveAction: 'Prepare condolence rituals; pause duties respectfully',
      role: 'Father',
      urgencyLevel: 'Immediate',
      lifeStage: 'All',
    },
    {
      issueType: 'Emergency',
      description: 'Sudden hospitalization of caregiver disrupts household duties',
      preventiveAction: 'Create emergency duty map; assign backup caregivers',
      role: 'Admin',
      urgencyLevel: 'Immediate',
      lifeStage: 'Householder',
    },
    {
      issueType: 'Emergency',
      description: 'Snake or stray animal enters sacred grove or courtyard',
      preventiveAction: 'Install protective fencing; keep animal control contacts ready',
      role: 'Father',
      urgencyLevel: 'Immediate',
      lifeStage: 'All',
    },
    {
      issueType: 'Emergency',
      description: 'Child injured during festival prep or ritual',
      preventiveAction: 'Keep first-aid kit near ritual zones; assign safety monitor',
      role: 'Mother',
      urgencyLevel: 'Immediate',
      lifeStage: 'Youth',
    },
    {
      issueType: 'Emergency',
      description: 'Firecracker accident during Diwali damages sacred space',
      preventiveAction: 'Designate safe zones; avoid fireworks near puja areas',
      role: 'Admin',
      urgencyLevel: 'Critical',
      lifeStage: 'Youth',
    },
    {
      issueType: 'Emergency',
      description: 'Sudden flood or cyclone damages prayer room and sacred items',
      preventiveAction: 'Elevate altar; waterproof sacred storage; backup verses',
      role: 'Grand Father',
      urgencyLevel: 'Critical',
      lifeStage: 'Elder',
    },
    {
      issueType: 'Emergency',
      description: 'Death of community elder halts temple routines and local rituals',
      preventiveAction: 'Prepare condolence rituals; assign interim temple duties',
      role: 'Admin',
      urgencyLevel: 'Immediate',
      lifeStage: 'Elder',
    },
    {
      issueType: 'Emergency',
      description: 'Sudden power outage during evening puja or chanting',
      preventiveAction: 'Keep oil lamps and battery backups ready',
      role: 'Mother',
      urgencyLevel: 'High',
      lifeStage: 'Householder',
    },
    {
      issueType: 'Emergency',
      description: 'Gas leak or kitchen hazard during festival cooking',
      preventiveAction: 'Install safety alarms; assign cooking safety roles',
      role: 'Father',
      urgencyLevel: 'Critical',
      lifeStage: 'Householder',
    },
    {
      issueType: 'Emergency',
      description: 'Sacred cow or temple animal injured or missing',
      preventiveAction: 'Keep vet contact and animal care supplies ready',
      role: 'Admin',
      urgencyLevel: 'High',
      lifeStage: 'Elder',
    },
    {
      issueType: 'Emergency',
      description: 'Child goes missing during crowded temple festival',
      preventiveAction: 'Create child ID cards; assign child-watch roles',
      role: 'Mother',
      urgencyLevel: 'Critical',
      lifeStage: 'Youth',
    },
    {
      issueType: 'Emergency',
      description: 'Sudden emotional breakdown during ancestral ritual',
      preventiveAction: 'Prepare grief-aware rituals; assign emotional support roles',
      role: 'Grand Mother',
      urgencyLevel: 'Immediate',
      lifeStage: 'Elder',
    },
    {
      issueType: 'Emergency',
      description: 'Fire destroys family memory journal or ancestral records',
      preventiveAction: 'Digitize records; store backups in cloud and print',
      role: 'Admin',
      urgencyLevel: 'Critical',
      lifeStage: 'Elder',
    },
    {
      issueType: 'Emergency',
      description: 'Sudden conflict between elders during festival planning',
      preventiveAction: 'Assign neutral mediator; pause planning and reset roles',
      role: 'Father',
      urgencyLevel: 'Immediate',
      lifeStage: 'Elder',
    },
    {
      issueType: 'Emergency',
      description: 'Pregnancy emergency during ritual or festival',
      preventiveAction: 'Assign emergency medical contact; pause duties respectfully',
      role: 'Admin',
      urgencyLevel: 'Immediate',
      lifeStage: 'Householder',
    },
    {
      issueType: 'Emergency',
      description: 'Sudden temple closure due to legal or political unrest',
      preventiveAction: 'Prepare alternate home rituals; maintain sacred continuity',
      role: 'Grand Father',
      urgencyLevel: 'High',
      lifeStage: 'Elder',
    },
    {
      issueType: 'Emergency',
      description: 'Sacred tree struck by lightning or storm',
      preventiveAction: 'Plant backups; perform renewal ritual; protect grove perimeter',
      role: 'Admin',
      urgencyLevel: 'Critical',
      lifeStage: 'All',
    }
  ];

  for (const emergencyData of emergencies) {
    // Create the emergency
    await prisma.emergency.create({
      data: emergencyData
    });
  }

  console.log('Emergencies seeded successfully');
}