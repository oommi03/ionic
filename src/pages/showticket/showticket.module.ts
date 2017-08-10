import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowticketPage } from './showticket';

@NgModule({
  declarations: [
    ShowticketPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowticketPage),
  ],
  exports: [
    ShowticketPage
  ]
})
export class ShowticketPageModule {}
