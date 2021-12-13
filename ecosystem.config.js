const TARGET_SERVER_HOST = process.env.TARGET_SERVER_HOST
  ? process.env.TARGET_SERVER_HOST.trim()
  : '';
const TARGET_SERVER_USER = process.env.TARGET_SERVER_USER
  ? process.env.TARGET_SERVER_USER.trim()
  : '';
const TARGET_SERVER_APP_PATH = `/home/${TARGET_SERVER_USER}/app`;

const MONGODB_HOST = process.env.MONGODB_HOST
  ? process.env.MONGODB_HOST.trim()
  : '';

const MONGODB_NAME = process.env.MONGODB_NAME
  ? process.env.MONGODB_NAME.trim()
  : '';

const MYSQL_DBNAME = process.env.MYSQL_DBNAME
  ? process.env.MYSQL_DBNAME.trim()
  : '';

const MYSQL_HOST = process.env.MYSQL_HOST ? process.env.MYSQL_HOST.trim() : '';

const MYSQL_USERNAME = process.env.MYSQL_USERNAME
  ? process.env.MYSQL_USERNAME.trim()
  : '';

const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD
  ? process.env.MYSQL_PASSWORD.trim()
  : '';

const APP_NAME = process.env.APP_NAME ? process.env.APP_NAME.trim() : '';

const REPO = 'git@gitlab.lineclub.ru:smartmoviescreator_com/node.git';

module.exports = {
  apps: [
    {
      name: 'smc',
      script: 'dist/main.js',
      instances: 1,
      autorestart: true,
      watch: false,
      log: '~/.pm2/logs/master.outerr.log',
      log_type: 'json',
      log_date_format: 'YYYY-MM-DD HH:mm:ss.SSSS',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],

  deploy: {
    production: {
      user: TARGET_SERVER_USER,
      host: TARGET_SERVER_HOST,
      ref: 'origin/master',
      repo: REPO,
      ssh_options: 'StrictHostKeyChecking=no',
      path: TARGET_SERVER_APP_PATH,
      env: {
        MONGODB_HOST,
        MONGODB_NAME,
        MYSQL_DBNAME,
        MYSQL_HOST,
        MYSQL_USERNAME,
        MYSQL_PASSWORD,
        APP_NAME,
      },
      'post-deploy':
        'npm install --production' +
        ' && npm run build' +
        ' && pm2 startOrRestart ecosystem.config.js --env=production' +
        ' && pm2 save',
    },
  },
};
