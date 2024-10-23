const dashName = 'nestle-nestca-dashboard-front';

module.exports = {
  apps: [
    {
      name: dashName,
      script: './server.js',
      output: '../logs/' + dashName + '_OUTPUT.log',
      error: '../logs/' + dashName + '_ERROR.log',
      watch: true,
      ignore_watch: ['']
    }
  ]
};

// To start with ecosystem
// pm2 start ecosystem.config.js
// pm2 start ecosystem.config.js --only <app_name>
