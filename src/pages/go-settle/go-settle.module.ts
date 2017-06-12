import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoSettle } from './go-settle';

@NgModule({
  declarations: [
    GoSettle,
  ],
  imports: [
    IonicPageModule.forChild(GoSettle),
  ],
  exports: [
    GoSettle
  ]
})
export class GoSettleModule {}
