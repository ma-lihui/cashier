import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the GoodsCart provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GoodsCart {
  goods_cart:any;
  constructor(public http: Http) {
    this.goods_cart = {
      goods: [],
      info: {
        total_money: 0,
        pay_money: 0,
        charge_money: 0,
        daishou_money: 0,
        total_num: 0
      },
      payment: [],
      vip: {},
      pro: []
    };
  }

  initGoodsCart(){
    this.goods_cart = {
      goods: [],
      info: {
        total_money: 0,
        pay_money: 0,
        charge_money: 0,
        daishou_money: 0,
        total_num: 0
      },
      payment: [],
      vip: {},
      pro: []
    };
  }
  //获取商品
  getGoodsCart(){
    return this.goods_cart;
  }
  //设置vip
  setVip(vip){
    this.goods_cart.vip = vip;
    this.refersh_cart();
  }

  //刷新购物车
  refersh_cart(){
    this.goods_cart.info.total_money = 0;
    this.goods_cart.info.total_num = 0;
    this.goods_cart.goods.forEach((g)=>{
      g.dj = (Number(g.bzj) * (this.goods_cart.vip.rebate || 1)).toFixed(2);
      this.goods_cart.info.total_num += g.sl;
      this.goods_cart.info.total_money += g.dj * g.sl;
    });
    this.goods_cart.info.total_money = this.goods_cart.info.total_money.toFixed(2);
  }
}
