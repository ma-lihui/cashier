import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Platform, ViewController, PopoverController ,LoadingController, AlertController } from 'ionic-angular';
import { ApiService } from '../../providers/api-service'
import { Constants } from '../../providers/constants';
import { GoodsCart } from '../../providers/goods-cart';
import { Common } from '../../providers/common';

/**
 * Generated class for the GoSettle page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-go-settle',
  templateUrl: 'go-settle.html',
})
export class GoSettle {
  url = this.apiService.URL;
  goods_cart:any;
  constructor(public navCtrl: NavController, public apiService:ApiService, public navParams: NavParams,params: NavParams, public modalCtrl: ModalController) {
    this.goods_cart = params.data.goods_cart;
    let param = {
      zddm:Constants.shop_code,
      zd_id:Constants.shop_id,
      mx:this.goods_cart.goods,
      vpdm:this.goods_cart.vip.vip_code || '',
      vpzk:this.goods_cart.vip.rebate || 1
    };
    this.apiService.post('pro/promotion/get_promotion', param).then((res:any)=>{
      if(res.status == 1) {
        let pro = res;
        this.goods_cart.pro = [];
        let goods = [];
        pro.mx.forEach((n:any, i)=> {
          if(n.kb_id > 0 && n.kbzddz_no) {   //捆绑促销
            this.goods_cart.pro.push(n.kbzddz_no[n.kb_id]);
          }
          if(n.zdcx_id > 0 && n.kbzddz_no) {   //捆绑促销
            this.goods_cart.pro.push(n.kbzddz_no[n.zdcx_id]);
          }
          if (n.index != 9999) {
            this.goods_cart.goods.some((g:any,j)=> {
              if(g.sp_id == n.sp_id && g.gg1_id == n.gg1_id && g.gg2_id == n.gg2_id) {
                n.spmc = g.spmc;
                n.gg1dm = g.gg1dm;
                n.gg1mc = g.gg1mc;
                n.gg2dm = g.gg2dm;
                n.gg2mc = g.gg2mc;
                n.sp_status = g.sp_status;
                n.dj = Number(n.dj*1 + n.cx_rl*1).toFixed(2);
                n.je = n.dj * n.sl;
                goods.push(n);
                return true;
              }
            });
          }
        });
        this.goods_cart.info.total_money = pro.total_je;
        if(goods.length > 0) {
          this.goods_cart.goods = goods;
        }
      }
    });
  }
  //关闭本页
  close(){
    this.navCtrl.pop();
  }
  //打开支付窗口
  openModal() {
    let modal = this.modalCtrl.create(Settle, {goods_cart:this.goods_cart,navCtrl:this.navCtrl});
    modal.present();
  }
}
@Component({
  selector: 'page-settle',
  templateUrl: 'settle.html',
})
export class Settle {
  goods_cart:any;
  check_list:any[];
  param:any;
  constructor(
      public platform: Platform,
      public params: NavParams,
      public viewCtrl: ViewController,
      public popoverCtrl: PopoverController,
      public navCtrl: NavController,
      public apiService:ApiService,
      public goodsCart:GoodsCart,
      public loadingCtrl: LoadingController,
      public alertCtrl: AlertController,
      public common: Common
  ) {
    this.goods_cart = params.data.goods_cart;
    this.navCtrl = params.data.navCtrl;
    this.check_list = Constants.check_list;
  }
  //关闭窗口
  dismiss() {
    this.viewCtrl.dismiss();
  }
  presentPopover(check){
    let popover = this.popoverCtrl.create(PopoverPage, {goods_cart:this.goods_cart,check:check},{cssClass:'settlement'});
    popover.present();
  }
  pay(check){
    this.presentPopover(check);
  }
  //重置结算
  reset(){
    this.goods_cart.info.pay_money = 0;
    this.goods_cart.info.charge_money = 0;
    this.goods_cart.info.payment = [];
  }
  //结算
  settleAct(){
    if( this.goods_cart.info.pay_money < this.goods_cart.info.total_money ) {
      let alert = this.alertCtrl.create({
        title: '提示',
        subTitle: '请完成支付',
        buttons: ['确定']
      });
      alert.present();
      return;
    }
    let record_code = 'POS' + Number(new Date());
    let date = this.common.dateFormat('yyyy-MM-dd');
    let datetime = this.common.dateFormat('yyyy-MM-dd hh:mm:ss');
    let user_code = Constants.user_code;
    let user_name = Constants.user_name;
    let post_data = {
      record_code: record_code,
      record:{},
      payment: [],
      record_data: {
        record: [{
          cashDate: date,
          cashNum: "1",
          cashStore: "000",
          charge_money: this.goods_cart.info.charge_money,
          comment: "未上传",
          customer_code: "",
          cut_money: 0,
          deviceId: "4C4C4544-0047-3310-8052-C6C04F373358",
          discount_money: 0,
          final_money: this.goods_cart.info.total_money,
          gc: 0,
          guide_user_code: user_code,
          guide_user_name: user_name,
          hz: 0,
          hzsj: null,
          init_code: "",
          integral: 0,
          is_cancel: null,
          is_cancel_person: null,
          is_cancel_time: null,
          is_checkout: 1,
          is_checkout_person: null,
          is_checkout_time: datetime,
          is_pending: 0,
          is_pending_person: null,
          is_return: 0,
          is_return_person: null,
          is_return_time: null,
          is_upload: 0,
          kwmc: "普通库位",
          lastchanged: datetime,
          money: this.goods_cart.info.total_money,
          num: this.goods_cart.info.total_num,
          organ_code: '',
          organ_name: "总部",
          pay_money: this.goods_cart.info.pay_money,
          record_code: record_code,
          record_time: datetime,
          remark: "",
          return_num: 1,
          sale_type_selected: "",
          shop_code: Constants.shop_code,
          trade_user_code: user_code,
          trade_user_name: user_name,
          user_code: user_code,
          user_name: user_name,
          vip_code: "",
          xjqbh: "",
          xjqje: ""
        }],
        record_detail: []
      }
    };
    this.goods_cart.goods.forEach( (g:any, i) => {
      post_data.record_data.record_detail.push({
        batch_code: "",
        batch_name: "",
        birthday_offers: "",
        cashStore: "000",
        color_code: g.gg1dm,
        color_name: g.gg1mc,
        detail_index: Number(new Date()) + '' + i,
        dzbh: "",
        dzyhje: 0,
        dzzk: 1,
        final_money: 0,
        gift: 0,
        goods_code: g.spdm,
        goods_name: g.spmc,
        goods_status: 1,
        guide_user_code: user_code,
        guide_user_name: user_name,
        integral_rate: 1,
        is_return: 0,
        is_sr: 0,
        is_xe: 0,
        money: g.je,
        num: g.sl,
        ppdm: "000",
        ppmc: '',
        price: g.dj,
        rebate: 1,
        record_code: record_code,
        refer_price: g.ckj,
        remark: '',
        size_code: g.gg2dm,
        size_name: g.gg2mc,
        sku: ''+ g.spdm + g.gg1dm + g.gg2dm,
      });
    });
    this.goods_cart.payment.forEach((n)=> {
      post_data.payment.push({
        coupon_code: n.coupon_code || '',
        integral: 0,
        money: n.pay_money,
        pay_money: n.pay_money,
        record_code: record_code,
        remark: '',
        trade_type_code: n.check_code
      });
    });
    post_data.record = post_data.record_data.record[0];
    let loading = this.loadingCtrl.create({
      content: "请稍候...",
      duration: 60000

    });
    loading.present();
    this.apiService.post('pos/pos/update',post_data).then((res:any) => {
      loading.dismiss();
      if(res.status == 1) {
        let loading = this.loadingCtrl.create({
          content: "结算成功！",
          duration: 1000
        });
        loading.present();

        setTimeout(()=> {
          this.dismiss();
          this.navCtrl.pop();
          this.goodsCart.initGoodsCart();
        },1000);

      }else {
        let alert = this.alertCtrl.create({
          title: '结算失败',
          subTitle: res.message,
          buttons: ['确定']
        });
        alert.present();
      }
    });
  }
}
//=============支付弹出层==================
@Component({
  selector: 'popover-page',
  templateUrl: 'popover-page.html',
})
export class PopoverPage {
  goods_cart:any;
  check:any;
  pay_money:number;
  coupon_code:string;
  constructor(public params: NavParams,public viewCtrl: ViewController) {
    this.goods_cart = params.data.goods_cart;
    this.check = params.data.check;
    this.pay_money = this.goods_cart.info.total_money - this.goods_cart.info.pay_money;
    this.goods_cart.payment.forEach((n)=>{
      if(n.check_code == this.check.check_code) {
        this.pay_money = n.pay_money;
      }
    })
  }
  //支付方式确认
  confirm(pay_money){
    let flag = false;
    this.goods_cart.info.pay_money = 0;
    this.goods_cart.payment.some ((n,i)=>{
      if(n.check_code == this.check.check_code) {
        this.goods_cart.payment[i].pay_money = this.pay_money;
        this.goods_cart.payment[i].coupon_code = this.coupon_code;
        return flag = true;
      }
    });
    if(!flag) {
      this.check.pay_money = this.pay_money;
      this.goods_cart.payment.push(this.check);
    }
    this.refresh_pay();
    this.dismiss()
  }
  //刷新支付
  refresh_pay(){
    this.goods_cart.info.pay_money = 0;
    this.goods_cart.payment.forEach((n)=>{
      this.goods_cart.info.pay_money += n.pay_money*1;
    })
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  on_input(pay_money){
    this.goods_cart.info.charge_money = (Number(pay_money) || 0) - this.goods_cart.info.total_money;
    this.goods_cart.info.charge_money = this.goods_cart.info.charge_money > 0 ? this.goods_cart.info.charge_money : 0;
  }
}
