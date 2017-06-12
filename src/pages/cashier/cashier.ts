import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController  } from 'ionic-angular';
import { ApiService } from '../../providers/api-service'
import { GoSettle } from '../go-settle/go-settle';
import { Constants } from '../../providers/constants';
import { GoodsCart } from '../../providers/goods-cart';
import { Common } from '../../providers/common';

@Component({
  selector: 'page-cashier',
  templateUrl: 'cashier.html'
})
export class CashierPage {
  searchType: string = '1';
  constructor(
    public navCtrl: NavController,
    public apiService:ApiService,
    public common:Common,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public goodsCart: GoodsCart
  ) {}
  url = this.apiService.URL;
  shop_code = Constants.shop_code;
  keyword = '';
  goods_cart = this.goodsCart.getGoodsCart();
  ionViewWillEnter(){ //page即将进入时
    this.goods_cart = this.goodsCart.getGoodsCart();
  }
  //页面跳转
  goSettle(){
    this.navCtrl.push(GoSettle,{goods_cart:JSON.parse(JSON.stringify(this.goods_cart))});
  }
  //修改商品数量
  change_goods_num(index, num){
    if (this.goods_cart.goods[index].sl + num * 1 > 0) {
      this.goods_cart.goods[index].sl += num * 1;
      this.goodsCart.refersh_cart();
    }
  }
  //删除商品
  del_goods(index) {
    this.goods_cart.goods.splice(index, 1);
    this.goodsCart.refersh_cart();
  };
  //监听回车键
  onKeyup(event){
    if(event.keyCode == 13) {
      if(this.keyword) {
        if(this.searchType === '1') {
          this.search_goods(this.keyword)
        }else {
          this.search_vip(this.keyword)
        }
      }
    }
  }
  //搜索商品
  search_goods(keyword){
    let loading = this.loadingCtrl.create({
      content: "搜索中...",
      duration: 5000
    });
    loading.present();
    this.apiService.post('stock/dim_allocate_order_record/phone_search_good',{sptm:keyword,shop_code:this.shop_code}).then((res:any) => {
      //console.log(res);
      loading.dismiss();
      if(res.status == 1 && res.data.data && res.data.data[0]) {
        this.goods_cart.goods.push(res.data.data[0]);
        this.goodsCart.refersh_cart();
      }else {
        let toast = this.toastCtrl.create({
          message: '没有找到商品',
          duration: 1000,
          position: 'middle'
        });
        toast.present();
      }
    });
  }

  //搜索会员
  search_vip(keyword){
    let loading = this.loadingCtrl.create({
      content: "搜索中...",
      duration: 5000
    });
    loading.present();
    this.apiService.post('crm/vip/get_qtsy_vip',{vip_code:keyword,shop_code:this.shop_code}).then((res:any) => {
      loading.dismiss();
      if(res.status == 1) {
        this.goodsCart.setVip(res.data);
      }else {
        let toast = this.toastCtrl.create({
          message: '没有找到该会员',
          duration: 1000,
          position: 'middle'
        });
        toast.present();
      }
    });
  }
  //删除vip
  del_vip(){
    this.goodsCart.setVip({});
  }

  //打开扫描
  openScan(){
    this.common.scan(function (data) {
      if(data) {
        this.keyword = data;
        if(this.searchType === '1') {
          this.search_goods(this.keyword)
        }else {
          this.search_vip(this.keyword)
        }
      }
    });
  }
}
