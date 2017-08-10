import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, App ,ModalController} from 'ionic-angular';
import { FormControl } from "@angular/forms";


/**
 * Generated class for the AboutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  
  constructor(
    private navCtrl: NavController,
    private modalCtrl:ModalController) {

  }

  ionViewWillEnter(){
    this.initMap();
  }

  
    map: any;
    test: any;
    user: string = "xx"
    searchBox: any;
 initMap() {
      this.map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.8688, lng: 151.2195},
          zoom: 13,
          mapTypeId: 'roadmap'
        });

       // new AutocompleteDirectionsHandler(map);
    // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        this.searchBox = new google.maps.places.SearchBox(input);
        this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        var x = this.searchBox.getPlaces();
        console.log(x);
    
      }
 testControl = new FormControl();

 testvalue() {
   console.log(this.testControl);
   var input = this.searchBox.getPlaces();
   console.log(input);
  


   
 }
 
}
