import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { SearchPage } from '../pages/search/search';
import { AutocompletePage } from '../pages/autocomplete/autocomplete';
import { MapPage } from '../pages/map/map';
import { StationPage } from '../pages/station/station';
import { ShowticketPage } from '../pages/showticket/showticket';
import { VerifyotpPage } from '../pages/verifyotp/verifyotp';
import { VanselectorPage } from '../pages/vanselector/vanselector';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';




import firebase from 'firebase';
import { GetstationProvider } from '../providers/getstation/getstation';
import { GooglemapProvider } from '../providers/googlemap/googlemap';
import { Geolocation } from '@ionic-native/geolocation';
import { BookingProvider } from '../providers/booking/booking';
import { NativeGeocoder,NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';



  var config = {
    apiKey: "AIzaSyCM_swaJbNX7w4qWDZBhbdNJ_HOTEb3Ivs",
    authDomain: "paiduay-van.firebaseapp.com",
    databaseURL: "https://paiduay-van.firebaseio.com",
    projectId: "paiduay-van",
    storageBucket: "paiduay-van.appspot.com",
    messagingSenderId: "433452527491"
  };
  firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AboutPage,
    LoginPage,
    SearchPage,
    AutocompletePage,
    MapPage,
    StationPage,
    ShowticketPage,
    VerifyotpPage,
    VanselectorPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AboutPage,
    LoginPage,
    SearchPage,
    AutocompletePage,
    MapPage,
    StationPage,
    ShowticketPage,
    VerifyotpPage,
    VanselectorPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: "GETSTATIONAPI_URL", useValue: "http://van.paiduayapp.com/api/v1/passenger/planning?origin=" },
    GetstationProvider,
    GooglemapProvider,
    Geolocation,
    { provide: "BOOKINGAPI_URL", useValue: "http://van.paiduayapp.com/api/v1/passenger/booking"},
    BookingProvider,
    NativeGeocoder,
     

  ]
})
export class AppModule {}
