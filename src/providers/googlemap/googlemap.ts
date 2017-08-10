import { Injectable,ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { NativeGeocoder,
         NativeGeocoderReverseResult,
         NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';


/*
  Generated class for the GooglemapProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
declare var google
@Injectable()
export class GooglemapProvider {
  
  constructor(public http: Http,public _GEOCODE  : NativeGeocoder) {
    console.log('Hello GooglemapProvider Provider');
  }
  reverseGeocode(lat : number, lng : number) : Promise<any>
{
   return new Promise((resolve, reject) =>
   {
      this._GEOCODE.reverseGeocode(lat, lng)
      .then((result : NativeGeocoderReverseResult) =>
      {
         let str : string   = `The reverseGeocode address is ${result.street} in ${result.countryCode}`;
         resolve(str);
      })
      .catch((error: any) =>
      {
         reject(error);
      });
   });
}
}
