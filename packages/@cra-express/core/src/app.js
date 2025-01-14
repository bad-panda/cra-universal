const express = require('express');
const staticLoader = require('@cra-express/static-loader').default;
const universalLoader = require('@cra-express/universal-loader').default;

function createReactAppExpress (options, app=null) {
  if (!app) {
    app = express();
  }
  staticLoader(app, options);
  universalLoader(app, options);
  return app;
}

export default createReactAppExpress;
