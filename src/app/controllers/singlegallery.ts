/// <reference path="../../../typings/index.d.ts" />
import {PicasaService, IPGallery, IPImage, getImageUrl} from '../services/picasaService';

interface IPImageExtend extends IPImage{
      copyURL?:string;
      id:string;
}

/** @ngInject */
class SingleGalleryController {

      public gallery: IPGallery;
      public copySize: number = 1024;

      constructor(public $stateParams: ng.ui.IStateParamsService, public picasaService: PicasaService, public clipboard ) {
            console.log($stateParams);
            this.picasaService.fetchImageFromGallery('roparat', $stateParams['albumid'])
                  .then((singleGallery: IPGallery) => {
                        var count = 0;
                        this.gallery = singleGallery;
                        this.gallery.photos.forEach((image:IPImageExtend)=>{
                              image.copyURL = image.image.url;
                              image.id = ""+(count++);
                        });
                  });
      }

      changeCopySize(){
            this.gallery.photos.forEach((image: IPImageExtend) => {
                  image.copyURL = getImageUrl(image.image.url,this.copySize,false);
            });
      }

      copyURL($event:ng.IAngularEvent, arg1:string, arg2:string){
            this.clipboard.copyText(arg2);
      }
}

export const singleGallery: ng.ui.IState = {
      url: '/gallery/{albumid:[0-9]+}',
      views: {
            // So this one is targeting the unnamed view within the parent state's template.
            '': {
                  template: require('../views/singlegallery.html'),
                  controller: SingleGalleryController,
                  controllerAs: 'sgCtrl'
            }
      }

}
