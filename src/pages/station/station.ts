import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
//provider
import { GetstationProvider } from '../../providers/getstation/getstation';
import { BookingProvider } from '../../providers/booking/booking';

//page
import { HomePage } from "../home/home";
import { VanselectorPage } from "../vanselector/vanselector";

declare var google;
@IonicPage()
@Component({
  selector: 'page-station',
  templateUrl: 'station.html',
  providers: [BookingProvider]
})
export class StationPage {
  startlocation: string;
  destinationlocation: string;
  location: Array<{ lat: number, lng: number }> = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public getstationProvider: GetstationProvider,
    public bookingProvider: BookingProvider,
    public geolocation:Geolocation
   ) {
    let location = this.navParams.get("userlocation");
    this.startlocation = location[0];
    this.destinationlocation = location[1];
    this.currentlocation = location[2];
  }
  ionViewDidLoad() {
    
    this.initMap();
    this.getstationbyjob(); 
    
  }
  testvalue() {
    
  }
  passdata() {
   this.navCtrl.push(VanselectorPage,{userlocation: [this.startlocation,this.destinationlocation,this.currentlocation]})
 } 
    getstationbyjob() {
      
    this.getstationProvider.getstationbyjob(this.startlocation, this.destinationlocation)
      .then((data: any) => {
        console.log('test');
        console.log(data)
        this.stationnamedropoff = data.dropOff.stationNameEN
        this.stationnamepickup = data.pickUp.stationNameEN
        this.centerpickUp = { lat: data.pickUp.coordinate[0], lng: data.pickUp.coordinate[1] };
        this.centercropOff = { lat: data.dropOff.coordinate[0], lng: data.dropOff.coordinate[1] };

        this.computelocation(data);
        this.Markerrender(this.centerpickUp, this.centercropOff);
        this.googlemappolyline();
        


     

      }, (error) => { console.log(error)})
  }  
  centerpickUp: any;
  centercropOff: any;
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
        var caroverlay = document.getElementById('booking-button');
       this.map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(caroverlay);
        
     }
//geolocation get currentlocation
  currentlocation:any
getcurrentlocation(){
  
this.geolocation.getCurrentPosition().then((resp) => {

 // resp.coords.latitude
 // resp.coords.longitude
}).catch((error) => {
  console.log('Error getting location', error);
});

let watch = this.geolocation.watchPosition();
watch.subscribe((data) => {
 // data can be a set of coordinates, or an error (if an error occurred).
 // data.coords.latitude
 this.currentlocation = { lat: data.coords.latitude,lng: data.coords.longitude};

});
     
}   
  //google map polyline
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
  //google Marker
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


     //windowinfo googlemap
  stationnamepickup:string;
  stationnamedropoff:string;
     showdetail(markerpickup:any,markerdropoff:any){
       var infoWindowpickup = new google.maps.InfoWindow;
       var infowindowContentpickup = document.getElementById('infowindow-contentpickup');
       infoWindowpickup.setContent(infowindowContentpickup);
       infowindowContentpickup.children['Station'].textContent = 'Pickup Location';
       infowindowContentpickup.children['StationName'].textContent = this.stationnamepickup;
       

      var infoWindowdropoff = new google.maps.InfoWindow;
      var infowindowContentdropoff = document.getElementById('infowindow-contentdropoff');
      infoWindowdropoff.setContent(infowindowContentdropoff);
      infowindowContentdropoff.children['Station'].textContent = 'Dropoff Location';
      infowindowContentdropoff.children['StationName'].textContent = this.stationnamedropoff;
      infoWindowdropoff.open(this.map,markerdropoff) 
      infoWindowpickup.open(this.map,markerpickup);
  
     }
    //focus location map
    centerlocation:any;
     computelocation(data:any){
     var centerlatlocation = (data.pickUp.coordinate[0] + data.dropOff.coordinate[0])/2
     var centerlnglocation = (data.dropOff.coordinate[0] + data.dropOff.coordinate[1])/2
     this.centerlocation = {lat:centerlatlocation,lng:centerlnglocation}; 
   
      var marker = new google.maps.Marker({
         position: this.centerlocation,
         map: this.map
       });
}
  
  
}
