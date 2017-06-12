import { Component } from '@angular/core';

import { RecordPage } from '../record/record';
import { SetPage } from '../set/set';
import { CashierPage } from '../cashier/cashier';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = CashierPage;
  tab2Root = RecordPage;
  tab3Root = SetPage;

  constructor() {

  }
}
