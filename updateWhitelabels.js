/* eslint-disable */
const { execSync } = require('child_process');

const sourceBranch = 'develop';
const targetBranches = ['main'];

function runCommand(command) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error running command: ${command}`, error);
    process.exit(1);
  }
}

try {
  runCommand('git fetch --all');
  runCommand(`git checkout ${sourceBranch}`);
  runCommand(`git pull origin ${sourceBranch}`);

  for (const branch of targetBranches) {
    runCommand(`git checkout ${branch}`);
    runCommand(`git pull origin ${branch}`);

    try {
      runCommand(`git merge ${sourceBranch}`);
    } catch (error) {
      console.error(`Merge conflict in ${branch}. Resolve conflicts and try again.`);
      process.exit(1);
    }

    runCommand(`git push origin ${branch}`);
  }

  runCommand(`git checkout ${sourceBranch}`);
  console.info('All branches merged successfully!');
} catch (error) {
  console.error('Error:', error);
}
