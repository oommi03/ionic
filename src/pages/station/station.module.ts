import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StationPage } from './station';

@NgModule({
  declarations: [
    StationPage,
  ],
  imports: [
    IonicPageModule.forChild(StationPage),
  ],
  exports: [
    StationPage
  ]
})
export class StationPageModule {}
