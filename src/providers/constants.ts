//全局常量的定义
export const Constants = {
  api_url: 'http://218.242.57.203:8422/ipos+lite/api/web/?app_act=index/route&api=',
  gateway: 'https://ipos-plus.baison.com.cn/saas_api/index.php?app_act=index/route&api=base/system/gateway',
  key: 'lite',
  password: '123456',
  // shop_code: 'BSSD',
  // shop_id: '58',
  // user_code: 'BSSD_000',
  shop_code: 'BJ01',
  shop_id: '56',
  user_code: 'BJ01_000',
  user_name: '默认店长',
  cloud_print_url: '',
  cloud_print_sn: '',
  cloud_print_key: '',
  check_list:[
    {
      check_code:'001',
      check_name:'现金',
      class_name:'xj',
    },
    {
      check_code:'002',
      check_name:'银行卡',
      class_name:'yhk',
    },
    {
      check_code:'011',
      check_name:'支付宝',
      class_name:'zfb',
    },
    {
      check_code:'008',
      check_name:'微信',
      class_name:'wx',
    },
    {
      check_code:'007',
      check_name:'现金券',
      class_name:'xjq',
    },
  ]
};
