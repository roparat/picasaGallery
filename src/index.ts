/// <reference path="../typings/index.d.ts" />

import * as angular from 'angular';

import {main} from './app/controllers/main';
import {PicasaService} from './app/services/picasaService';
import {galleryList} from './app/controllers/gallerys';
import 'angular-ui-router';
import routesConfig from './routes';
import 'angular-clipboard';

import './index.less';

export const app: string = 'app';

angular
  .module(app, ['ui.router','angular-clipboard'])
  .config(routesConfig)
  .component('app', main)
  .service('picasaService', PicasaService)
  .component('galleryList', galleryList);