const config = {
  env: process.env.NODE_ENV || 'development',
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/fund3r',
  appName: process.env.APP_NAME || 'FUND3R',
  adminToken: process.env.ADMIN_TOKEN || 'admin',
  adminLogin: process.env.ADMIN_LOGIN || 'admin',
  adminPassword: process.env.ADMIN_PASSWORD || 'supersecret',
  backendHost: process.env.BACKEND_HOST || 'http://localhost:4000',
  backendAdminToken: process.env.BACKEND_ADMIN_TOKEN,
};

module.exports = config;
