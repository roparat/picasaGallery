/// <reference path="../../../typings/index.d.ts" />

import {PicasaService, IPGalleryList} from '../services/picasaService';

/** @ngInject */
class GalleryListController {
      public galleryList: IPGalleryList;

      constructor(private picasaService: PicasaService) {
            picasaService.fetchGalleryList('roparat').then((gl: IPGalleryList) => {
                  console.log(gl);
                  this.galleryList = gl;
            });
      }
}

// angular
//       .module('app')
//       .service('picasaService', PicasaService)
//       .component('galleryList', {
//             templateUrl: 'app/views/gallerys.html',
//             controller: GalleryListController
//       });

console.log('hello');

export const galleryList: angular.IComponentOptions = {
  template: require('../views/gallerys.html'),
  controller: GalleryListController,
};