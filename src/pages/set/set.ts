import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-set',
  templateUrl: 'set.html'
})
export class SetPage {
  coloudPrintToggle = true;
  constructor(public navCtrl: NavController) {

  }

}
