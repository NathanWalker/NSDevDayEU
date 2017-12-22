/* tslint:disable ordered-imports no-import-side-effect*/
// Snapshot the ~/app.css and the theme
import * as application from 'tns-core-modules/application';
import 'ui/styling/style-scope';
const appCssContext = require.context("~/", false, /^\.\/app\.(css|scss|less|sass)$/);
global.registerWebpackModules(appCssContext);
application.loadAppCss();

// std core
import './vendor-platform';

import 'reflect-metadata';

// ng
import '@angular/core';
import '@angular/common';
import '@angular/forms';
import '@angular/http';
import '@angular/platform-browser';
import '@angular/router';
