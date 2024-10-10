/* eslint-disable */
const { execSync } = require('child_process');

const sourceBranch = 'develop'; // Основная ветка, которую сливаем
const targetBranches = ['main']; // Ветки, в которые будем делать merge

// Функция для выполнения команд
function runCommand(command) {
  try {
    console.info(`Running: ${command}`);
    execSync(command, { stdio: 'inherit' }); // stdio: 'inherit' — выводит результат команды в консоль
  } catch (error) {
    console.error(`Error running command: ${command}`, error);
    process.exit(1); // Завершает выполнение скрипта в случае ошибки
  }
}

// Основная логика
try {
  // Обновляем информацию о всех ветках с удалённого репозитория
  console.info('Fetching latest changes from remote');
  runCommand('git fetch --all');

  // Переключаемся на основную ветку и обновляем её
  console.info(`Switching to ${sourceBranch} and pulling latest changes`);
  runCommand(`git checkout ${sourceBranch}`);
  runCommand(`git pull origin ${sourceBranch}`);

  for (const branch of targetBranches) {
    console.info(`\nProcessing branch: ${branch}`);

    // Переключаемся на целевую ветку
    runCommand(`git checkout ${branch}`);

    // Обновляем целевую ветку с удалённого репозитория
    console.info(`Pulling latest changes for ${branch}`);
    runCommand(`git pull origin ${branch}`);

    // Выполняем слияние с основной веткой
    console.info(`Merging ${sourceBranch} into ${branch}`);
    try {
      runCommand(`git merge ${sourceBranch}`);
    } catch (error) {
      console.error(`Merge conflict in ${branch}. Resolve conflicts and try again.`);
      process.exit(1);
    }

    // Пушим изменения в удалённый репозиторий
    console.info(`Pushing changes to ${branch}`);
    runCommand(`git push origin ${branch}`);
  }

  // Возвращаемся обратно на основную ветку
  runCommand(`git checkout ${sourceBranch}`);
  console.info('All branches merged successfully!');
} catch (error) {
  console.error('Error:', error);
}
