const fs = require('fs');
const path = require('path');

console.log('\n🔍 Verifying .agent installation...\n');

const checks = [
  { name: '.agent directory', path: '.agent', type: 'dir' },
  { name: 'PRIMER.md', path: '.agent/PRIMER.md', type: 'file' },
  { name: 'INSTALLATION.md', path: '.agent/INSTALLATION.md', type: 'file' },
  { name: 'PERMISSIONS.md', path: '.agent/PERMISSIONS.md', type: 'file' },
  { name: 'IDE_COMPATIBILITY.md', path: '.agent/IDE_COMPATIBILITY.md', type: 'file' },
  { name: 'STATE.md', path: '.agent/STATE.md', type: 'file' },
  { name: 'AGENTS.md', path: '.agent/AGENTS.md', type: 'file' },
  { name: 'DESIGN_PRINCIPLES.md', path: '.agent/DESIGN_PRINCIPLES.md', type: 'file' },
  { name: 'skills folder', path: '.agent/skills', type: 'dir' },
  { name: 'workflows folder', path: '.agent/workflows', type: 'dir' },
  { name: 'VS Code settings', path: '.vscode/settings.json', type: 'file' },
  { name: 'Claude settings', path: '.claude/settings.local.json', type: 'file', optional: true },
];

let passed = 0;
let failed = 0;
let optional = 0;

checks.forEach((check) => {
  const exists = fs.existsSync(check.path);

  if (!exists && check.optional) {
    console.log(`⚠️  ${check.name} (optional, not found)`);
    optional++;
    return;
  }

  const isCorrectType =
    exists &&
    ((check.type === 'dir' && fs.lstatSync(check.path).isDirectory()) ||
      (check.type === 'file' && fs.lstatSync(check.path).isFile()));

  if (isCorrectType) {
    console.log(`✅ ${check.name}`);
    passed++;
  } else {
    console.log(`❌ ${check.name} ${exists ? '(wrong type)' : '(missing)'}`);
    failed++;
  }
});

// Check for skills
if (fs.existsSync('.agent/skills')) {
  try {
    const skills = fs
      .readdirSync('.agent/skills')
      .filter((item) => fs.statSync(path.join('.agent/skills', item)).isDirectory());

    if (skills.length > 0) {
      console.log(`✅ ${skills.length} skill(s) found: ${skills.join(', ')}`);
      passed++;
    } else {
      console.log(`⚠️  No skills found in .agent/skills (this is OK)`);
      optional++;
    }
  } catch (e) {
    console.log(`❌ Error reading skills: ${e.message}`);
    failed++;
  }
}

// Check for workflows
if (fs.existsSync('.agent/workflows')) {
  try {
    const workflows = fs.readdirSync('.agent/workflows').filter((item) => item.endsWith('.md'));

    if (workflows.length > 0) {
      console.log(
        `✅ ${workflows.length} workflow(s) found: ${workflows.map((w) => w.replace('.md', '')).join(', ')}`
      );
      passed++;
    } else {
      console.log(`⚠️  No workflows found in .agent/workflows (this is OK)`);
      optional++;
    }
  } catch (e) {
    console.log(`❌ Error reading workflows: ${e.message}`);
    failed++;
  }
}

// Summary
console.log(`\n${'='.repeat(50)}`);
console.log(`✅ ${passed} passed | ❌ ${failed} failed | ⚠️  ${optional} optional`);
console.log(`${'='.repeat(50)}\n`);

if (failed > 0) {
  console.log('❌ Verification failed. Please check the errors above.\n');
  process.exit(1);
} else {
  console.log('✨ Installation verified successfully!\n');

  // IDE-specific verification hints
  console.log('🎯 IDE-Specific Verification:\n');

  console.log('  🌌 AntiGravity:');
  console.log('     Ask: "What is the brand voice?" → Should quote PRIMER.md\n');

  console.log('  🔵 VS Code:');
  console.log('     Press Ctrl+Shift+P → "Tasks: Run Task" → See agent tasks\n');

  console.log('  💬 Claude Code:');
  console.log('     Type: /code-review → Should recognize workflow\n');

  process.exit(0);
}
