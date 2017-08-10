import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VanselectorPage } from './vanselector';

@NgModule({
  declarations: [
    VanselectorPage,
  ],
  imports: [
    IonicPageModule.forChild(VanselectorPage),
  ],
  exports: [
    VanselectorPage
  ]
})
export class VanselectorPageModule {}
