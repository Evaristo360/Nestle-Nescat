const fs = require('fs');
const { spawn } = require('child_process');

fs.copyFile('./.env.example', './.env', (err) => {
  if (err) {
    console.error('Setup failed (cp .env.example .env)');
    return;
  }
  console.log('.env file created!');

  const install = spawn('yarn', ['install']);

  install.stdout.on('data', (data) => {
    console.log(Buffer.from(data).toString());
  });

  install.stderr.on('data', (data) => {
    console.error(`${Buffer.from(data).toString()}`);
  });

  install.on('close', (code) => {
    console.log(`Setup finsished (${code})`);
  });
});
