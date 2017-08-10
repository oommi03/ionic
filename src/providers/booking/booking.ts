import { Injectable,Inject } from '@angular/core';
import { Http,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the BookingProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
  let apiUrl = 'http://van.paiduayapp.com/api/v1/passenger/booking'
@Injectable()
export class BookingProvider {

  token:string
 constructor(
    public http: Http,
    @Inject("BOOKINGAPI_URL") public url: string
  ) {
    
    this.token = 'Bearer '+ localStorage.getItem('token')
    console.log(this.token)
  }
  Bookingbyjob(pickUpStationId: any, dropOffStationId: any) {
    return new Promise((resolve, reject) => {
      let headers = new Headers({ 'Content-Type':'application/x-www-form-urlencoded','Authorization':this.token });
      pickUpStationId = 2
      let options = new RequestOptions({ headers: headers });
      let body = 'dropOffStationId=' + dropOffStationId + '&pickUpStationId=' + pickUpStationId;
      console.log(body);
      console.log(this.url);
        this.http.post(this.url,body,options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
          console.log(data);
          console.log('ok');
        }, (error: any) => {
          console.log(error);
        reject(error);
      });
    });
 } 



  

}