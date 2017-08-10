import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, App,LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { StationPage } from '../station/station';

import { Geolocation } from '@ionic-native/geolocation';

//import firebase from 'firebase';

declare var google;
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  hello = {
    name: "oommi",
    lname: "oommi"
  };
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    public loadingController: LoadingController,
    public geolocation: Geolocation) {
  }
    
  //google map api
   @ViewChild("map") mapElement: ElementRef;
    map: any;
    ionViewDidLoad(){
      this.getcurrentlocation();
      this.googleplaceautocomplete();
    }
 currentocationmarker:any
 mylocation:any
  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 13,
      center: this.currentlocation,
      
    });
   var image = {
        url: 'https://firebasestorage.googleapis.com/v0/b/paiduay-van.appspot.com/o/resources%2Fpeople-icon.png?alt=media&token=af95d08b-cc1c-40ae-9245-85f1ec11ff51',
        scaledSize: new google.maps.Size(40,40), // scaled size
        origin: new google.maps.Point(0,0), // origin
    //anchor: new google.maps.Point(0,32) // anchor
      }
   
        this.currentocationmarker = new google.maps.Marker({
          position: this.currentlocation,
          map: this.map,
          icon:image
          
     });
      

    //google direction api with google map api
   // this.directionsDisplay.setMap(this.map);

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
  console.log(this.currentlocation);
  this.initMap();
  

});

  }

  

// decodeLevels(encodedLevelsString) {
//     var decodedLevels = [];

//     for (var i = 0; i < encodedLevelsString.length; ++i) {
//         var level = encodedLevelsString.charCodeAt(i) - 63;
//         decodedLevels.push(level);
//     }
//     return decodedLevels;
// }

  

  
  //google place autocomplete
  searchBoxStart: any;
  searchBoxEnd: any;
  placeStart: any;
  placeEnd: any
  mark: any
  
 googleplaceautocomplete(){

        var inputStart = document.getElementById("origin-input");
        this.searchBoxStart = new google.maps.places.SearchBox(inputStart);

        // this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputStart);

        var inputEnd = document.getElementById("destination-input");
        this.searchBoxEnd = new google.maps.places.SearchBox(inputEnd);
        // this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputEnd);

 }
 markertest: any
 markertest2:any 
 test1() {
   var inputEnd = document.getElementById("destination-input");
   this.searchBoxEnd = new google.maps.places.SearchBox(inputEnd);
   this.inputEnd = this.searchBoxEnd.getPlaces();
   console.log(this.inputEnd); 
    //  this.markertest = new google.maps.Marker({
    //       position: this.inputEnd[0].geometry.location,
    //       map: this.map,
    //  });
 }
 testvalue1() {
    this.markertest2 = new google.maps.Marker({
          position: {lat: 40.85, lng: -81.65},
          map: this.map,
     });
 } 

 inputStart: any
 inputEnd: any; 
 testvalue() {
   this.inputEnd = this.searchBoxEnd.getPlaces();
   this.inputStart = this.searchBoxStart.getPlaces(); 
   console.log(this.inputStart);
   this.computelocation(this.inputStart, this.inputEnd);
   this.Markerrender(this.inputStart, this.inputEnd);
   this.passdata();
 }  
 passdata() {
   this.navCtrl.push(StationPage,{userlocation: [this.startlocation,this.destinationlocation,this.currentlocation]})
 } 
  //google direction api
//  Mylocation: any;
//  end: string = "";
//   directionsService = new google.maps.DirectionsService;
//   directionsDisplay = new google.maps.DirectionsRenderer;
//    calculateAndDisplayRoute() {
//     this.directionsService.route({
//       origin: this.Mylocation,
//       destination: this.end,
//       travelMode: 'DRIVING'
//     }, (response, status) => {
//       if (status === 'OK') {
//         this.directionsDisplay.setDirections(response);
//         console.log(response);
//       } else {
//         window.alert('Directions request failed due to ' + status);
//       }
//     });
//   }

//focus location map
computelocation(placeStart?: any, placeEnd?: any){
  var centerlatlocation = (placeStart[0].geometry.location.lat() + placeEnd[0].geometry.location.lat())/2
  var centerlnglocation = (placeStart[0].geometry.location.lng() + placeEnd[0].geometry.location.lng())/2
  this.centerlocation.push({lat:centerlatlocation,lng:centerlnglocation});

}
  signOut() {
    localStorage.removeItem("token");
    let nav = this.app.getRootNav();
    nav.setRoot(LoginPage);
  }
  startlocation: string;
  destinationlocation: string;
  centerlocation:Array<{ lat: number, lng: number }> =[];
  Markerrender(placeStart?: any, placeEnd?: any) {
    this.startlocation = placeStart[0].geometry.location.lat() + "," + placeStart[0].geometry.location.lng();
    this.destinationlocation = placeEnd[0].geometry.location.lat() + "," + placeEnd[0].geometry.location.lng();
    var infoWindowstart = new google.maps.InfoWindow;
    var infoWindowend = new google.maps.InfoWindow;
    //  this.map = new google.maps.Map(this.mapElement.nativeElement, {
    //   zoom: 12,
    //   center: this.centerlocation[0],
      
    // });

    
    //  var markerstart = new google.maps.Marker({
    //       position: placeStart[0].geometry.location,
    //       map: this.map,
          
    //  });
    //   infoWindowstart.setContent('Start Location.');
    //   infoWindowstart.open(this.map,markerstart)
    //  var markerend = new google.maps.Marker({
    //       position: placeEnd[0].geometry.location,
    //       map: this.map
    //  });
    //   infoWindowend.setContent('Destination Location.');
    //   infoWindowend.open(this.map,markerend)
    //   console.log(this.centerlocation)

    //   this.map.setCenter(this.centerlocation[0]);
  }

  
}

