import { Injectable,Inject } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the GetstationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class GetstationProvider {
lat:number  
  constructor(
    public http: Http,
    @Inject("GETSTATIONAPI_URL") public url: string
  ) {
    console.log('Hello GetstationProvider Provider');
  }
  getstationbyjob(startlocation:string,destinationlocation:string) {
        return new Promise((resolve, reject) => {
      let headers = new Headers({ "Content-Type": "application/x-www-form-urlencoded" });
      let options = new RequestOptions({ headers: headers });
      
      this.http.get(this.url +startlocation + "&destination=" + destinationlocation,options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
          console.log(data);
      }, error => {
        reject(error);
        console.log(error);
      });
    });
  }

}
