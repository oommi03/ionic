import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,App } from 'ionic-angular';

import { HomePage } from '../home/home';

import { country } from "./country"
import firebase from 'firebase';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  _countrynumber: any;
  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  //  public countrynumber: country,
    public alertCtrl: AlertController,
    public nav: App) {
    let countrynumber = new country();
    this._countrynumber = countrynumber.countries;
    console.log("hello login");
  }
  test() {
  this.navCtrl.setRoot(HomePage);
}
  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
  'size': 'invisible',
  'callback': function(response) {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
   
  }
});
  }
  signIn(phoneNumber: number, country?: string) {
    var number1: string;
    const appVerifier = this.recaptchaVerifier;
    var number = "" + phoneNumber;
    number1 = number.slice(1, 10);
    const phoneNumberString = '+66' + number1;
    console.log(number);
    console.log(number1);
    console.log(phoneNumberString);
    firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
      .then( (confirmationResult: any) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
       console.log(confirmationResult)
        let prompt = this.alertCtrl.create({
        title: 'Enter the Confirmation code',
        inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
        buttons: [
          { text: 'Cancel',
            handler: data => { console.log('Cancel clicked'); }
          },
          { text: 'Send',
            handler: data => {
              confirmationResult.confirm(data.confirmationCode)
                .then( (result: any) => {
                  // User signed in successfully.
                  let user = result.user;
                  //let uid = user.uid
                  console.log(result.operationType);
                  if (result.operationType == 'signIn') {
                    console.log("oommi")
                     this.navCtrl.push(HomePage);
                  } else {
                    alert("eiei")
                  }
                  
                  firebase.auth().currentUser.getToken(/* forceRefresh */ true).then(function(idToken) {
                  // Send token to your backend via HTTPS
                  // ...
                    console.log(idToken);
                    localStorage.setItem("token", idToken);
                    let nav = this.app.getRootNav();
                     nav.setRoot(HomePage);
                    
                  }).catch(function(error) {
                   // Handle error
                   
                  });
                  
                  
                }).catch(function (error) {
                  // User couldn't sign in (bad verification code?)
                  // ...
                });
            }
          }
        ]
      });
        prompt.present();
       
    })
    .catch(function (error) {
      console.error("SMS not sent", error);
    });
    
  }


}