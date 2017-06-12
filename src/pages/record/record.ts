import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiService } from '../../providers/api-service'

@Component({
  selector: 'page-record',
  templateUrl: 'record.html'
})
export class RecordPage {
  keyword = '';
  record_data = {
    record:{},
    record_detail:[],
  };
  constructor(public navCtrl: NavController, public apiService:ApiService) {

  }
  //监听回车键
  onKeyup(event){
    if(event.keyCode == 13) {
      if(this.keyword) {
        this.search_receipt(this.keyword)
      }
    }
  }
  //搜索小票
  search_receipt(keyword){
    if(keyword) {
      this.apiService.post('pos/pos/get_detail',{record_code:keyword}).then((res:any)=>{
        if(res && res.status == 1) {
          this.record_data = res.data;
        }
      });
    }
  }
  //清空小票
  cancel(){
    this.keyword = '';
    this.record_data = {
      record:{},
      record_detail:[],
    };
  }

  //打开扫描
  openScan(){

  }
}
