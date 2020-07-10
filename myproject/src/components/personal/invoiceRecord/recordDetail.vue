<template>
  <div class="recordDetail-container">
    <div class="detail-box">
      <!-- <div class="detail-box-top">
        <div>开票详情</div>
      </div> -->
      <!--  -->
      <div class="detail-box-detail" v-if="status == 1">
          <div class="detail-box-detail-infor">发票信息</div>
          <div class="detail-box-detail-all">
            <div>
              <div class="detail-box-detail-all-move1">
                <span>发票类型：</span>
                <span>{{invoice_type}}</span>
              </div>
              <div class="detail-box-detail-all-move1">
                <span>发票状态：</span>
                <span>{{invoice_status}}</span>
              </div>
              <!-- <div class="detail-box-detail-all-move1">
                <span>单位名称：</span>
                <span>祁域科技有限公司</span>
              </div> -->
              <div class="detail-box-detail-all-move1">
                <span>公司地址：</span>
                <span :title="invoice.detail_address">{{invoice.detail_address}}</span>
              </div>
              <div class="detail-box-detail-all-move1">
                <span>开户银行：</span>
                <span :title="invoice.bank">{{invoice.bank}}</span>
              </div>
              <!-- <div>
                <span>收票人姓名：</span>
                <span>蔡徐坤</span>
              </div>
              <div>
                <span>收票人地址：</span>
                <span>松江区松江新城镇文诚路78号</span>
              </div> -->
              <div class="detail-box-detail-all-move1">
                <span>开票日期：</span>
                <span>{{update_time}}</span>
              </div>
              <div class="detail-box-detail-all-move1">
                <span>邮寄日期：</span>
                <span>{{mail_time}}</span>
              </div>
              <div class="detail-box-detail-all-move4">
                <span>电子发票：</span>
                <img :src="GLOBAL.base_url+this.code_img" alt="" v-if="code_img">
              </div>
            </div>
            <div>
              <div class="detail-box-detail-all-move2">
                <span>发票抬头：</span>
                <span :title="invoice.company_name">{{invoice.company_name}}</span>
              </div>
              <!-- <div class="detail-box-detail-all-move2">
                <span>订单编号：</span>
                <span>GLW2019070311284837752822</span>
              </div> -->
              <div class="detail-box-detail-all-move3">
                <span>税号：</span>
                <span>{{invoice.credit_code}}</span>
              </div>
              <div class="detail-box-detail-all-move2">
                <span>公司电话：</span>
                <span>{{invoice.mobile}}</span>
              </div>
              <div class="detail-box-detail-all-move2">
                <span>银行账户：</span>
                <span>{{invoice.bank_count}}</span>
              </div>
              <div class="detail-box-detail-all-move2">
                <span>快递公司：</span>
                <span>{{express_company}}</span>
              </div>
              <div class="detail-box-detail-all-move2">
                <span>快递单号：</span>
                <span>{{express_num}}</span>
              </div>
            </div>
          </div>
          <div class="detail-box-detail-about">关联订单信息</div>
          <div class="detail-box-information" v-for="(v,k) in about" :key="k">
            <div>
              <div class="bgc">订单编号</div>
              <div>{{v.order_id}}</div>
            </div>
            <!-- <div>
              <div class="bgc">商品名称</div>
              <div>{{v.good_name}}</div>
            </div> -->
            <div>
              <div class="bgc">商品名称</div>
              <div>{{v.good_name}}</div>
            </div>
            <div>
              <div class="bgc">订单金额</div>
              <div>￥{{v.price}}</div>
            </div>
            <div>
              <div class="bgc">实付金额</div>
              <div>￥{{v.total_price}}</div>
            </div>
            <div>
              <div class="bgc">下单时间</div>
              <div>{{v.created_at}}</div>
            </div>
          </div>
      </div>
      <!-- 专利 -->
      <div class="detail-box-detail" v-if="status == 2">
          <div class="detail-box-detail-infor">发票信息</div>
          <div class="detail-box-detail-all">
            <div>
              <div class="detail-box-detail-all-move1">
                <span>发票类型：</span>
                <span>{{invoice_type}}</span>
              </div>
              <div class="detail-box-detail-all-move1">
                <span>发票状态：</span>
                <span>{{invoice_status}}</span>
              </div>
              <!-- <div class="detail-box-detail-all-move1">
                <span>单位名称：</span>
                <span>祁域科技有限公司</span>
              </div> -->
              <div class="detail-box-detail-all-move1">
                <span>公司地址：</span>
                <span :title="address">{{address}}</span>
              </div>
              <div class="detail-box-detail-all-move1">
                <span>开户银行：</span>
                <span :title="bank">{{bank}}</span>
              </div>
              <!-- <div>
                <span>收票人姓名：</span>
                <span>蔡徐坤</span>
              </div>
              <div>
                <span>收票人地址：</span>
                <span>松江区松江新城镇文诚路78号</span>
              </div> -->
              <div class="detail-box-detail-all-move1">
                <span>开票日期：</span>
                <span>{{update_time}}</span>
              </div>
              <div class="detail-box-detail-all-move1">
                <span>邮寄日期：</span>
                <span>{{mail_time}}</span>
              </div>
              <div class="detail-box-detail-all-move4">
                <span>电子发票：</span>
                <img :src="GLOBAL.base_url+this.code_img" alt="" v-if="code_img">
              </div>
            </div>
            <div>
              <div class="detail-box-detail-all-move2">
                <span>发票抬头：</span>
                <span :title="company_name">{{company_name}}</span>
              </div>
              <!-- <div class="detail-box-detail-all-move2">
                <span>订单编号：</span>
                <span>GLW2019070311284837752822</span>
              </div> -->
              <div class="detail-box-detail-all-move3">
                <span>税号：</span>
                <span>{{credit_code}}</span>
              </div>
              <div class="detail-box-detail-all-move2">
                <span>公司电话：</span>
                <span>{{mobile}}</span>
              </div>
              <div class="detail-box-detail-all-move2">
                <span>银行账户：</span>
                <span>{{bank_count}}</span>
              </div>
              <div class="detail-box-detail-all-move2">
                <span>快递公司：</span>
                <span>{{express_company}}</span>
              </div>
              <div class="detail-box-detail-all-move2">
                <span>快递单号：</span>
                <span>{{express_num}}</span>
              </div>
            </div>
          </div>
          <div class="detail-box-detail-about">关联订单信息</div>
          <div class="detail-box-information" v-for="(v,k) in about" :key="k">
            <div>
              <div class="bgc">订单编号</div>
              <div>{{v.order_id}}</div>
            </div>
            <div>
              <div class="bgc">商品名称</div>
              <div>{{v.good_name}}</div>
            </div>
            <div>
              <div class="bgc">订单金额</div>
              <div v-if="status == 1">￥{{v.price}}</div>
               <div v-if="status == 2">￥{{v.total_price}}</div>
               <div v-if="status == 3">￥{{v.total_price}}</div>
            </div>
            <div>
              <div class="bgc">实付金额</div>
              <div>￥{{v.total_price}}</div>
            </div>
            <div>
              <div class="bgc">下单时间</div>
              <div>{{v.created_at}}</div>
            </div>
          </div>
      </div>
      <!-- 版权 -->
      <div class="detail-box-detail" v-if="status == 3">
          <div class="detail-box-detail-infor">发票信息</div>
          <div class="detail-box-detail-all">
            <div>
              <div class="detail-box-detail-all-move1">
                <span>发票类型：</span>
                <span>{{invoice_type}}</span>
              </div>
              <div class="detail-box-detail-all-move1">
                <span>发票状态：</span>
                <span>{{invoice_status}}</span>
              </div>
              <!-- <div class="detail-box-detail-all-move1">
                <span>单位名称：</span>
                <span>祁域科技有限公司</span>
              </div> -->
              <div class="detail-box-detail-all-move1">
                <span>公司地址：</span>
                <span :title="address">{{address}}</span>
              </div>
              <div class="detail-box-detail-all-move1">
                <span>开户银行：</span>
                <span :title="bank">{{bank}}</span>
              </div>
              <!-- <div>
                <span>收票人姓名：</span>
                <span>蔡徐坤</span>
              </div>
              <div>
                <span>收票人地址：</span>
                <span>松江区松江新城镇文诚路78号</span>
              </div> -->
              <div class="detail-box-detail-all-move1">
                <span>开票日期：</span>
                <span>{{update_time}}</span>
              </div>
              <div class="detail-box-detail-all-move1">
                <span>邮寄日期：</span>
                <span>{{mail_time}}</span>
              </div>
              <div class="detail-box-detail-all-move4">
                <span>电子发票：</span>
                <img :src="GLOBAL.base_url+this.code_img" alt="" v-if="code_img">
              </div>
            </div>
            <div>
              <div class="detail-box-detail-all-move2">
                <span>发票抬头：</span>
                <span :title="company_name">{{company_name}}</span>
              </div>
              <!-- <div class="detail-box-detail-all-move2">
                <span>订单编号：</span>
                <span>GLW2019070311284837752822</span>
              </div> -->
              <div class="detail-box-detail-all-move3">
                <span>税号：</span>
                <span>{{credit_code}}</span>
              </div>
              <div class="detail-box-detail-all-move2">
                <span>公司电话：</span>
                <span>{{mobile}}</span>
              </div>
              <div class="detail-box-detail-all-move2">
                <span>银行账户：</span>
                <span>{{bank_count}}</span>
              </div>
              <div class="detail-box-detail-all-move2">
                <span>快递公司：</span>
                <span>{{express_company}}</span>
              </div>
              <div class="detail-box-detail-all-move2">
                <span>快递单号：</span>
                <span>{{express_num}}</span>
              </div>
            </div>
          </div>
          <div class="detail-box-detail-about">关联订单信息</div>
          <div class="detail-box-information" v-for="(v,k) in about" :key="k">
            <div>
              <div class="bgc">订单编号</div>
              <div>{{v.order_id}}</div>
            </div>
            <div>
              <div class="bgc">商品名称</div>
              <div>{{v.good_name}}</div>
            </div>
            <div>
              <div class="bgc">订单金额</div>
              <div v-if="status == 1">￥{{v.price}}</div>
               <div v-if="status == 2">￥{{v.total_price}}</div>
               <div v-if="status == 3">￥{{v.total_price}}</div>
            </div>
            <div>
              <div class="bgc">实付金额</div>
              <div>￥{{v.total_price}}</div>
            </div>
            <div>
              <div class="bgc">下单时间</div>
              <div>{{v.created_at}}</div>
            </div>
          </div>
      </div>

    </div>
    <div style="clear:both;"></div>
  </div>
</template>

<script>
export default {
  name: 'recordDetail',
  data(){
    return{
      invoice_type:'',
      invoice:{},
      invoice_status:'',
      update_time:'',
      about:[],
      express_company:'',
      express_num:'',
      mail_time:'',
      company_name:'',
      credit_code:'',
      mobile:'',
      bank_count:'',
      address:'',
      bank:'',
      status:'',
      code_img:''
    }
  },
  components: {
  },
  methods:{
    getdata(){
     this.$http.post(this.GLOBAL.base_url+'/api/InvoiceApply/invoiceRecordDetail',{
                    id:this.$route.query.id,
                    type:this.$route.query.type
              }).then(res=>{
                // console.log(res)
                if(res.data.code == "1"){
                  this.invoice_type = res.data.data.invoice_type;
                  this.invoice = res.data.data.invoice;
                  this.invoice_status = res.data.data.invoice_status;
                  this.update_time = res.data.data.update_time;
                  this.about = res.data.data.order;
                  this.express_company = res.data.data.express_company;
                  this.express_num = res.data.data.express_num;
                  this.mail_time = res.data.data.mail_time;
                  this.code_img = res.data.data.code_img;
                }
              })
    },
    getList(){
      this.$http.post(this.GLOBAL.base_url+'/api/patent/invoiceDetail',{
        user_id:this.$cookie.getCookie('u_id'),
        id:this.$route.query.id
      }).then(res => {
        // console.log(res)
        if(res.data.code = '1') {
          this.invoice_type = res.data.data.type
          this.invoice_status = res.data.data.status
          this.address = res.data.data.address
          this.bank = res.data.data.bank
          this.update_time = res.data.data.apply_time
          this.mail_time = res.data.data.mail_time
          this.company_name = res.data.data.name
          this.credit_code = res.data.data.code
          this.mobile = res.data.data.mobile
          this.bank_count = res.data.data.bank_name
          this.express_company = res.data.data.express_company
          this.express_num = res.data.data.express_num
          this.about = res.data.data.order_list
          this.code_img = res.data.data.code_img;
        }
      })
    },
    get(){
      this.$http.post(this.GLOBAL.base_url+'/api/copyRight/invoiceDetail',{
        user_id:this.$cookie.getCookie('u_id'),
        id:this.$route.query.id
      }).then(res => {
        // console.log(res)
        if(res.data.code = '1') {
          this.invoice_type = res.data.data.type
          this.invoice_status = res.data.data.status
          this.address = res.data.data.address
          this.bank = res.data.data.bank
          this.update_time = res.data.data.apply_time
          this.mail_time = res.data.data.mail_time
          this.company_name = res.data.data.name
          this.credit_code = res.data.data.code
          this.mobile = res.data.data.mobile
          this.bank_count = res.data.data.bank_name
          this.express_company = res.data.data.express_company
          this.express_num = res.data.data.express_num
          this.about = res.data.data.order_list
          this.code_img = res.data.data.code_img;
        }
      })
    }
  },
  mounted(){
    if(this.$route.query.edit == 1) {
      this.getdata()
      this.status = this.$route.query.edit
    }else if(this.$route.query.edit == 2) {
      this.getList()
      this.status = this.$route.query.edit
    }else {
      this.get()
      this.status = this.$route.query.edit
    }
  }
}

</script>

<style scoped>
  .detail-box{
    width: 1015px;
    min-height: 1024px;
    float: left;
    margin: 12px 0 0px 16px;
    background-color: #fff;
    padding-top: 36px;
    box-sizing: border-box;
  }
  .detail-box-top{
    width: 870px;
    height: 50px;
    border-bottom: 1px solid #d8d8d8;
  }
  .detail-box-top>div{
    font-family: "PingFangSC-Thin";
    font-size: 22px;
    font-weight: 100;
    color: #999999;
    margin: 58px 0 14px 29px;
  }
  .detail-box-detail{
    padding:0 94px 0 116px;
  }
  .detail-box-detail-infor{
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 600;
    color: #353535;
    margin: 0 0 33px;
  }
  .detail-box-detail-all{
    height: 380px;
  }
  .detail-box-detail-all>div:nth-of-type(1){
    float: left;
  }
  .detail-box-detail-all>div>div{
    margin-bottom: 18px;
    width: 346px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .detail-box-detail-all>div:nth-of-type(1)>div:nth-of-type(8){
    margin-bottom: 0;
  }
  .detail-box-detail-all>div>div>span{
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 500;
    color: #333333;
  }
  .detail-box-detail-all>div>div>span:nth-of-type(1){
    color: #999999;
    font-weight: 100;
  }
  .detail-box-detail-all>div:nth-of-type(2){
    width: 351px;
    float: right;
  }
  .detail-box-detail-all-move1{
    margin-left: 6px;
  }
  .detail-box-detail-all-move2{
    margin-left: 32px;
  }
  .detail-box-detail-all-move3{
    margin-left: 63px;
  }
  .detail-box-detail-all-move4{
    height: 120px;
    margin-left: 6px;
  }
  .detail-box-detail-all-move4>span{
    vertical-align: top;
  }
  .detail-box-detail-all-move4>img{
    width: 100px;
    height: 100px;
  }
  .detail-box-detail-about{
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 600;
    color: #353535;
    margin: 0 0 20px ;
  }
  .detail-box-information {
    /* width: 650px; */
    margin: 0 auto;
  }
  .detail-box-information>div{
    float: left;
    /* margin-right: 30px; */
    /* text-align: center; */
    margin-bottom: 30px;
    border: 1px solid #eee;
    width: 154px;
    text-align: center;
    border-right: none;
    border-left: none;
  }
  .detail-box-information>div:nth-child(1) {
    width: 180px;
    border-left: 1px solid #eee;
  }
  .detail-box-information>div:nth-child(5) {
    /* width: 160px; */
    border-right: 1px solid #eee;
  }
  /* .detail-box-information>div:nth-of-type(5){
    margin-right: 0;
  } */
  .detail-box-information>div>div:nth-of-type(1){
    font-family: "PingFangSC";
    font-size: 14px;
    /* font-weight: 100; */
    color: #333;
    /* margin-bottom: 14px; */
    border-bottom: 1px solid #eee;
  }
  .detail-box-information>div>div:nth-of-type(2){
    font-size: 14px;
    color: #333333;
    height: 36px;
    line-height: 36px;
    font-weight: 100;
  }
  .bgc {
    background-color: #fafafa;
    height: 36px;
    line-height: 36px;
    /* font-weight: 500; */
  }
</style>
