const fs = require('fs');
const path = require('path');

const workflowName = process.argv[2];
const workflowsDir = path.join(__dirname, '../workflows');
const workflowPath = path.join(workflowsDir, `${workflowName}.md`);

console.log('\n--- JayLife Workflow Launcher ---\n');

if (!workflowName) {
  console.log('Usage: node run-workflow.js <workflow-name>');
  console.log('\nAvailable workflows:');
  try {
    const workflows = fs.readdirSync(workflowsDir).filter((f) => f.endsWith('.md'));
    workflows.forEach((w) => console.log(` - ${w.replace('.md', '')}`));
  } catch (e) {
    console.log(' (No workflows found or workflows directory missing)');
  }
  process.exit(1);
}

if (!fs.existsSync(workflowPath)) {
  console.error(`❌ Error: Workflow "${workflowName}" not found at ${workflowPath}`);
  process.exit(1);
}

const workflowContent = fs.readFileSync(workflowPath, 'utf-8');
console.log(`📋 Running Workflow: ${workflowName.toUpperCase()}\n`);
console.log('================================================================================');
console.log(workflowContent);
console.log('================================================================================');
console.log(`\n✅ Workflow steps displayed. Follow the instructions above.`);
