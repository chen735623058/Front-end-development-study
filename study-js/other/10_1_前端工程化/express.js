/**
 * create by sxf on 2019/5/16.
 * 功能:
 */
const Express = require('express');
const WebPackDevMiddleware = require('webpack-dev-middleware');
const App = Express();
const Webpack = require('webpack');
const WebpackCompiler = Webpack(WebpackConf);

App.use(WebPackDevMiddleware(WebpackCompiler));
