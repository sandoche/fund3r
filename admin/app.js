require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSMongoose = require('@adminjs/mongoose');
const basicAuth = require('express-basic-auth');

const grantApplication = require('./resources/GrantApplication');
const logger = require('./utilities/logger');
const config = require('./config/app');

AdminJS.registerAdapter(AdminJSMongoose);

// Options
const setup = async () => {
  const app = express();

  // Set up mongodb
  mongoose.connect(config.mongoUrl);
  const db = mongoose.connection;
  db.on('error', logger.error.bind(logger, '[Mongodb] connection error'));
  db.once('open', () => {
    logger.info('[Mongodb] Connected successfully');
  });

  // Set up middlewares
  app.use(morgan('dev'));

  app.use(
    basicAuth({
      users: { [config.adminLogin]: config.adminPassword },
      challenge: true,
    }),
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  // Set up adminJS
  const adminJs = new AdminJS({
    rootPath: `/${config.adminToken}`,
    resources: [grantApplication],
    branding: {
      companyName: config.appName,
    },
  });

  const router = AdminJSExpress.buildRouter(adminJs);

  // Set up routes
  app.use(adminJs.options.rootPath, router);

  // Set up error catching
  app.use((req, res, next) => {
    next(createError(404));
  });
  app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
  });

  return app;
};

module.exports = setup;
