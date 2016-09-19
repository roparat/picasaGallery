/// <reference path="../../../typings/index.d.ts" />

import {PicasaService, IPGalleryList, IPGallery, getImageUrl} from '../services/picasaService';

/** @ngInject */
class GalleryListController {
      public galleryList: IPGalleryList;

      constructor(private picasaService: PicasaService) {
            picasaService.fetchGalleryList('roparat').then((gl: IPGalleryList) => {
                  console.log(gl);
                  this.galleryList = gl;
                  this.galleryList.gallerys.forEach((sg:IPGallery) => {
                        sg.albumCover = getImageUrl(sg.albumCover,240,true);
                  });
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