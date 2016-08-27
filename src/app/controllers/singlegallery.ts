/// <reference path="../../../typings/index.d.ts" />
import {PicasaService, IPGallery} from '../services/picasaService';

/** @ngInject */
class SingleGalleryController {

      public gallery: IPGallery;

      constructor(public $stateParams: ng.ui.IStateParamsService, public picasaService: PicasaService) {
            console.log($stateParams);
            this.picasaService.fetchImageFromGallery('roparat', $stateParams['albumid'])
                  .then((singleGallery: IPGallery) => {
                        this.gallery = singleGallery;
                  });
      }
}

export const singleGallery: ng.ui.IState = {
      url: '/gallery/{albumid:[0-9]+}',
      views: {
            // So this one is targeting the unnamed view within the parent state's template.
            '': {
                  templateUrl: 'app/views/singlegallery.html',
                  controller: SingleGalleryController,
                  controllerAs: 'sgCtrl'
            }
      }

}
