const fs = require('fs');
const path = require('path');

const skillName = process.argv[2];
const skillsDir = path.join(__dirname, '../skills');
const skillPath = path.join(skillsDir, skillName, 'SKILL.md');

console.log('\n--- JayLife Skill Launcher ---\n');

if (!skillName) {
  console.log('Usage: node run-skill.js <skill-name>');
  console.log('\nAvailable skills:');
  try {
    const skills = fs
      .readdirSync(skillsDir)
      .filter((f) => fs.statSync(path.join(skillsDir, f)).isDirectory());
    skills.forEach((s) => console.log(` - ${s}`));
  } catch (e) {
    console.log(' (No skills found or skills directory missing)');
  }
  process.exit(1);
}

if (!fs.existsSync(skillPath)) {
  console.error(`❌ Error: Skill "${skillName}" not found at ${skillPath}`);
  process.exit(1);
}

const skillContent = fs.readFileSync(skillPath, 'utf-8');
console.log(`📖 Loading Skill: ${skillName.toUpperCase()}\n`);
console.log('================================================================================');
console.log(skillContent);
console.log('================================================================================');
console.log(`\n✅ Skill loaded. Apply the instructions above to your task.`);
