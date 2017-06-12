import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { RecordPage } from '../pages/record/record';
import { SetPage } from '../pages/set/set';
import { CashierPage } from '../pages/cashier/cashier';
import { GoSettle, Settle, PopoverPage} from '../pages/go-settle/go-settle';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiService } from '../providers/api-service';
import { GoodsCart } from '../providers/goods-cart';
import { Common } from '../providers/common';
import { Md5 } from 'ts-md5/dist/md5';

@NgModule({
  declarations: [
    MyApp,
    RecordPage,
    SetPage,
    CashierPage,
    GoSettle,
    Settle,
    PopoverPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      mode:'ios',
      backButtonText: '返回'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RecordPage,
    SetPage,
    CashierPage,
    GoSettle,
    Settle,
    PopoverPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ApiService,
    GoodsCart,
    Common,
    Md5,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
