import { Component,ViewChild,ElementRef,OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams,Platform,LoadingController } from 'ionic-angular';

import { GetstationProvider } from '../../providers/getstation/getstation';
import { BookingProvider } from '../../providers/booking/booking';

import { ShowticketPage } from "../showticket/showticket";
declare var google;
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage  {

  currentlocation:any;
  startlocation: string;
  destinationlocation: string;
  location: Array<{ lat: number, lng: number }> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public getstationProvider:GetstationProvider,public bookingProvider: BookingProvider) {
    let location = this.navParams.get("userlocation");
    this.startlocation = location[0];
    this.destinationlocation = location[1];
    this.licenseplate = [
      {car:location[2],time:location[3]}
    ]
    this.currentlocation = location[4];
    console.log(this.licenseplate)
  }
  ionViewDidLoad() {
    this.initMap();
    //this.licebseplatecompute();
    this.getstationbyjob();
  }
  centerpickUp: any;
  centercropOff: any;
  licenseplate:Array<{car:string,time:string}>;
  currentocationmarker:any
   @ViewChild("map") mapElement: ElementRef;
     map: any;
  //googlemap
     initMap() {
        var image = {
        url: 'https://firebasestorage.googleapis.com/v0/b/paiduay-van.appspot.com/o/resources%2Fpeople-icon.png?alt=media&token=af95d08b-cc1c-40ae-9245-85f1ec11ff51',
        scaledSize: new google.maps.Size(40,40), // scaled size
        origin: new google.maps.Point(0,0), // origin
    //anchor: new google.maps.Point(0,32) // anchor
      }
       this.map = new google.maps.Map(this.mapElement.nativeElement, {
         zoom: 14,
         center: this.currentlocation
       });
           this.currentocationmarker = new google.maps.Marker({
          position: this.currentlocation,
          map: this.map,
          icon:image
          
     });  
       var caroverlay = document.getElementById('car-overlay-one');
       this.map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(caroverlay);
     }

  stationnamepickup:string;
  stationnamedropoff:string;
     showdetail(markerpickup:any,markerdropoff:any){
       var infoWindowpickup = new google.maps.InfoWindow;
       var infowindowContentpickup = document.getElementById('infowindow-contentpickup');
       infoWindowpickup.setContent(infowindowContentpickup);
       infowindowContentpickup.children['Station'].textContent = 'Pickup Location';
       infowindowContentpickup.children['StationName'].textContent = this.stationnamepickup;
       infoWindowpickup.open(this.map,markerpickup);

      var infoWindowdropoff = new google.maps.InfoWindow;
      var infowindowContentdropoff = document.getElementById('infowindow-contentdropoff');
      infoWindowdropoff.setContent(infowindowContentdropoff);
      infowindowContentdropoff.children['Station'].textContent = 'Dropoff Location';
      infowindowContentdropoff.children['StationName'].textContent = this.stationnamedropoff;
      infoWindowdropoff.open(this.map,markerdropoff) 

  
     }
     Markerrender(centerpickUp:any,centercropOff:any) {
       var image = {
        url: 'https://firebasestorage.googleapis.com/v0/b/paiduay-van.appspot.com/o/resources%2Fbus-stop-sign%20(1).png?alt=media&token=7637f24b-39b4-4b0b-8082-c3b930cb0ce3',
        scaledSize: new google.maps.Size(40,40), // scaled size
        origin: new google.maps.Point(0,0), // origin
    //anchor: new google.maps.Point(0,32) // anchor
      }
    
       var markerpickup = new google.maps.Marker({
         position: centerpickUp,
         map: this.map,
         icon: image
       });
          
      
       var markerdropoff = new google.maps.Marker({
         position: centercropOff,
         map: this.map,
         icon: image
       });

     
       this.showdetail(markerpickup,markerdropoff);
       //this.map.setCenter(this.centerlocation);
     }
        getstationbyjob() {
    this.getstationProvider.getstationbyjob(this.startlocation, this.destinationlocation)
      .then((data: any) => {
        console.log(data);
        this.stationnamedropoff = data.dropOff.stationNameEN
        this.stationnamepickup = data.pickUp.stationNameEN
        this.centerpickUp = { lat: data.pickUp.coordinate[0], lng: data.pickUp.coordinate[1] };
        this.centercropOff = { lat: data.dropOff.coordinate[0], lng: data.dropOff.coordinate[1] };

        //this.computelocation(data);
        this.Markerrender(this.centerpickUp, this.centercropOff);
        this.googlemappolyline();
        


        this.pickUpStationId = data.pickUp.stationId;
        this.dropOffStationId = data.dropOff.stationId;
        console.log(this.centercropOff);
        console.log(this.centerpickUp);

      }, (error) => { })
  } 
    googlemappolyline() {
   var decodedPath = google.maps.geometry.encoding.decodePath("{quqBqy}zQ~Sw_AieA{Xyj@|pA~MjG|BcGnDnCbB\\hLuD`Ct@\\nDdHz@td@I??");
       for (var item in decodedPath) {
        this.location.push({lat:decodedPath[item].lat(),lng:decodedPath[item].lng()})
       }
        var flightPath = new google.maps.Polyline({
          path: this.location,
          geodesic: true,
          strokeColor: '#222',
          strokeOpacity: 1.0,
          strokeWeight: 2,

        });
        flightPath.setMap(this.map);

}
     pickUpStationId: any;
     dropOffStationId: any;

  
     bookingbyjob(){
       this.bookingProvider.Bookingbyjob(this.pickUpStationId, this.dropOffStationId)
      .then((data: any) => {
        console.log(data);
        this.navCtrl.push(ShowticketPage);
      }, (error) => { })
       
  }
}
