const dotenv = require('dotenv');
const express = require('express');
const fs = require('fs');
const https = require('https');
const path = require('path');

const env = loadEnviroment();

let app = express();

app.use(env.REACT_APP_PUBLIC_URL, express.static('build'));

if (env.TLS_ENABLED === 'true') {
  app = https.createServer(
    {
      cert: fs.readFileSync(env.TLS_CERT),
      key: fs.readFileSync(env.TLS_KEY)
    },
    app
  );
}

function loadEnviroment() {
  dotenv.config({
    path: path.resolve(process.cwd(), '.env')
  });

  return process.env;
}

function createServer() {
  app.listen(env.PORT, env.HOST, () => getServerLogs());
}

function getServerLogs() {
  console.group(`Nestle Nestca Dashboard`);
  console.info(`Time: ${new Date().toString()}`)
  console.info(`Server listening on port ${env.PORT} 🚀`);
  console.info(`Https: ${env.TLS_ENABLED === 'true' ? 'enabled' : 'disabled'}`);
  console.info(`App path: ${env.REACT_APP_PUBLIC_URL}`);
  console.groupEnd();
}

createServer();
