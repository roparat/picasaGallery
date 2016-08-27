/// <reference path="../../../typings/index.d.ts" />

const picasaApi = '//picasaweb.google.com/data/feed/api/user';

export class PicasaService {

      /** @ngInject */
      constructor(private $q: ng.IQService, private $http: ng.IHttpService) {
      }

      fetchGalleryList(username: String) {
            return this.$q((resolve, reject) => {
                  /*var options = {
                        thumbSize: 320,
                        thumbCrop: false,
                        imageSize: 1024,
                  };*/

                  var url = picasaApi + '/' + username + '?alt=json&kind=album&access=public';

                  this.$http({
                        method: 'GET',
                        url: url,
                  }).then((success) => {
                        var galleryList = parseAlbumList(success);
                        resolve(galleryList);
                  }, (error) => {
                        reject(error);
                  });

            });
      }

      fetchImageFromGallery(username: string, albumid: string) {
            return this.$q((resolve, reject) => {
                  var options = {
                        thumbSize: 320,
                        thumbCrop: false,
                        imageSize: 1024,
                  };


                  var url = picasaApi + '/' + username + '/album/' + albumid
                        + '?alt=json&kind=photo&thumbsize=' + options.thumbSize + (options.thumbCrop ? 'c' : 'u') + '&start-index=1';

                  this.$http({
                        method: 'GET',
                        url: url,
                  }).then((success) => {
                        var gallery = parseImageFromGallery(success);
                        resolve(gallery);
                  }, (error) => {
                        reject(error);
                  });

            });
      }
}

export interface IPImage {
      thumbnail: {
            url: string,
            width: number,
            height: number,
      };
      image: {
            url: string,
      };
      title: string;
      info: {
            width: number,
            height: number,
      };
}

export interface IPGallery {
      albumid: string;
      author: string;
      title: string;
      subtitle?: string;
      location: string;
      albumCover: string;
      numphotos: number;
      photos?: IPImage[];
}

export interface IPGalleryList {
      author: string;
      thumbnail: string;
      userid: string;
      gallerys: IPGallery[];
}

function parseAlbumList(response: any): IPGalleryList {
      // console.log(response);
      var feed = response.data.feed;
      var gallerylist: IPGalleryList = {
            author: feed.gphoto$nickname.$t,
            thumbnail: feed.gphoto$thumbnail.$t,
            userid: feed.gphoto$user.$t,
            gallerys: []
      };

      gallerylist.gallerys = feed.entry.map(parseGalleryHeader);

      return gallerylist;
}

function parseGalleryHeader(feed: any): IPGallery {
      // console.log(feed);
      return {
            albumid: feed.gphoto$id.$t,
            author: feed.gphoto$nickname.$t,
            title: feed.title.$t,

            location: feed.gphoto$location.$t,
            albumCover: (feed.media$group) ? (feed.media$group.media$thumbnail.url) : undefined,
            numphotos: parseInt(feed.gphoto$numphotos.$t, 10),
      };
}

function parseImageFromGallery(response: any): IPGallery {
      var feed = response.data.feed;
      var galObj: IPGallery = parseGalleryHeader(feed);
      galObj.subtitle = feed.subtitle.$t;

      galObj.photos = feed.entry.map( (singleImage: any) => {
            // console.log(singleImage);
            var thumbnail = singleImage.media$group.media$thumbnail[0];
            var actualImage = singleImage.media$group.media$content[0];
            var actualImageUrl = actualImage.url;

            var pathSpilt = splitUrl(actualImageUrl);
            // var pathspilt = actualImageUrl.split(/\/{1}/);
            // var baseurl = pathspilt.slice(0,1)+'//'+pathspilt.slice(2,pathspilt.length-1).join('/')+'/';
            // var filename = pathspilt[pathspilt.length-1];
            var imageAtDesiredSize = pathSpilt[0] + 's' + 1024 + '/' + pathSpilt[1];

            return {
                  thumbnail: {
                        url: thumbnail.url,
                        width: thumbnail.width,
                        height: thumbnail.height,
                  },
                  image: {
                        url: imageAtDesiredSize,
                  },
                  title: singleImage.summary.$t,
                  info: {
                        width: singleImage.gphoto$width.$t,
                        height: singleImage.gphoto$height.$t,
                  }
            };
      });

      return galObj;
}

function splitUrl(url: string) {
      var pathspilt = url.split(/\/{1}/);
      var baseurl = pathspilt.slice(0, 1) + '//' + pathspilt.slice(2, pathspilt.length - 1).join('/') + '/';
      var filename = pathspilt[pathspilt.length - 1];
      return [baseurl, filename];
}
