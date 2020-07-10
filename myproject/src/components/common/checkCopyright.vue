<template>
  <div class="checkOrdercontainer">
    <Top></Top>
    <Fix></Fix>
    <!-- top -->
    <div class="check-box-top">
      <div class="check-box-top-div">
        <img src="/static/images/net.png" alt="">
        <span>订单支付</span>
      </div>
    </div>
    <!-- 支付信息 -->
    <div class="check-box-big">
      <!-- 邮寄地址 -->
      <div class="check-box-big-address">
        <div class="address-div1">
          <div>邮寄地址：</div>
          <div>
            <select v-model="chose" @change="pick">
              <option selected="true">请选择邮寄地址</option>
              <option v-for="(v,k) in dataArr" :value="v.id">{{v.province}}{{v.city}}{{v.area}}{{v.address}}</option>
            </select>
          </div>
          <div>
            <span>{{name}}</span>
            <span>{{telephone}}</span>
          </div>
        </div>
        <div class="address-div2" @click="addaddress">+邮寄地址</div>
      </div>
      <!-- 订单信息 -->
      <div class="order-infor">订单信息:</div>
      <div class="check-box-big-order">
        <div class="check-box-big-order-top">
          <div>订单编号</div>
          <div>商品名称</div>
          <div>服务类型</div>
          <div>类别</div>
          <div>价格</div>
        </div>
        <div class="check-box-big-order-list" v-for="(v,k) in paylist">
          <div>{{v.order_id}}</div>
          <div>{{v.good_type}}</div>
          <div>{{v.good_name}}</div>
          <div>{{v.click_type}}</div>
          <div>￥{{v.total_price}}</div>
        </div>
      </div>
      <!-- 优惠券 -->
      <div class="check-box-big-discount" v-show="zeroshow">
        <div>优惠券：</div>
        <select name="" id="" v-model="select" @change='getValue'>
          <option>请选择</option>
          <option  v-for="(v,k) in conpon" v-bind:value="v.id" :key="k">{{v.title}}</option>
        </select>
      </div>
      <!-- 发票 -->
      <div class="check-box-big-invoice" v-show="zeroshow">
        <div class="invoice-is">是否开发票：</div>
        <div class="invoice-radio">
          <div>
            <input class="radio1" value="1" v-model="get" name="type" type="radio"><span>否</span>
            <input class="radio2" value="2" v-model="get" name="type" type="radio"><span>是</span>
          </div>
          <div @click="widnopen" v-show="voiceshow">添加发票</div>
        </div>
      </div>
      <div class="check-chose"  v-show="toushow">
         <span>发票抬头:</span>
         <span>{{picktou}}</span>
       </div>
      <!-- 支付方式 -->
      <div class="check-box-big-pay" v-show="zeroshow">
        <div class="check-box-big-pay-type">支付方式：</div>
        <div :class="active">
          <div class="div1" @click="makeActive('company')">
            <img src="/static/images/7m.png" alt="">
          </div>
          <div class="div2"  @click="makeActive('bao')">
            <img src="/static/images/bao.png" alt="">
          </div>
          <div class="div3"  @click="makeActive('wei')">
            <img src="/static/images/wei.png" alt="">
          </div>
          <div class="div4"  @click="makeActive('yin')" v-show="false">
            <img src="/static/images/yin.png" alt="">
          </div>
        </div>
        <div class="test-div" v-show="testshow">
          <span>汇款公司名称</span>
          <input type="text" v-model="countcompany">
        </div>
      </div>

      <!-- <div class="test-div" v-show="testshow">
         <div class="test-div1">企业认证：</div>
         <div class="test-div2">
             <div>
               <select>
                 <option>选择认证</option>
                 <option v-for="(v,k) in companyarr" v-bind:value="v.id">{{v.company_name}}</option>
               </select>
             </div>
             <div @click="tocomfire">添加认证</div>
             <div>生成合同</div>
         </div>
      </div> -->
      <!-- 价格 -->
      <div class="check-box-big-price">
        <div>总计价格:</div>
        <div>
          <span>RMB</span>
          <span :="money" id="money">{{this.paytotal}}</span>
        </div>
      </div>
      <!-- 按钮 -->
      <div class="check-box-big-commit">
         <div @click="back">返回</div>
         <div @click="Tonext">确认支付</div>
      </div>
    </div>
    <!-- 邮寄地址弹框 -->
    <div class="add-address" v-show="addressshow">
      <div class="address-form">
        <img src="/static/images/cha.png" alt="" @click="cha">
        <div class="form-div">
          <div class="recevie-people">
            <span>收货人</span>
            <input type="text" v-model="people">
          </div>
          <div>
            <span>联系电话</span>
            <input class="deal" type="text" v-model="moblie" maxlength="14">
          </div>
          <div class="address-div">
             <span>所在区</span>
              <el-select v-model="sheng" @change="choseProvince" placeholder="选择省" class="select1">
                <el-option
                v-for="item in province"
                :key="item.id"
                :label="item.value"
                :value="item.id">
                </el-option>
              </el-select>
              <el-select v-model="shi" @change="choseCity" placeholder="选择市" class="select1">
                <el-option
                v-for="item in shi1"
                :key="item.id"
                :label="item.value"
                :value="item.id">
                </el-option>
              </el-select>
              <el-select v-model="qu" @change="choseBlock" placeholder="选择区" class="select1">
                <el-option
                v-for="item in qu1"
                :key="item.id"
                :label="item.value"
                :value="item.id">
                </el-option>
              </el-select>
          </div>
          <div>
             <span>详细地址</span>
             <input type="text" v-model="detailaddress">
          </div>
          <div class="count" @click="count">保存</div>
        </div>
      </div>
    </div>
    <!-- 申请发票弹框 -->
    <div class="check-box-tan" v-show="tan">
      <div class="check-box-tan-div">
        <span>申请发票</span>
        <img @click="cha2" src="/static/images/cha.png" alt="">
        <div class="check-box-tan-type">
          <span class="check-box-tan-type-span1">选择开票类型：</span>
          <input v-model="kai" value="one" name="piao"  type="radio"><span class="check-box-tan-type-span2">普通发票</span>
          <input v-model="kai" value="two" name="piao" type="radio"><span>增值税发票</span>
        </div>
        <div class="check-box-tan-add">
          <span>已有开票信息：</span>
          <select v-model="pickcompany">
            <option value="0">请选择</option>
            <option v-for="(v,k) in arr2" v-bind:value="v.id">{{v.company_name}}</option>
          </select>
          <div @click="addInvoice">新增</div>
        </div>
        <div @click="comfire"  class="check-box-tan-comfire">确定</div>
      </div>
    </div>
    <div class="weixin" v-show="weishow">
        <img @click="weicha" src="/static/images/cha.png" alt="">
        <img :src="GLOBAL.base_url+'/'+this.xingimg" alt="">
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Top from '../ui/top.vue';
import Foot from '../ui/foot.vue';
import Fix from '../ui/fix.vue';
export default {
  name: 'checkCopyright',
  data(){
    return{
      // 三级联动
       mapJson:'../../static/json/map.json',
        province:'',
        sheng: '',
        shi: '',
        shi1: [],
        qu: '',
        qu1: [],
        city:'',
        block:'',
        a:'',
        b:'',
        c:'',
      active:'company',
      paylist:[],
      type:2,
      total:'',
      paytotal:'',
      // 优惠劵
      conpon:[],
      select:'请选择',
      get:'1',
      testshow:true,
      addressshow:false,
      voiceshow:false,
      people:'',
      moblie:'',
      detailaddress:'',
      dataArr:[],
      name:'',
      telephone:'',
      chose:'请选择邮寄地址',
      tan:false,
      kai:"one",
      pickcompany:'0',
      arr2:[],
      companyarr:[],
      // 当支付是0元时
      zeroshow:true,
      name:'',
      apply:'',
      xingimg:'',
      pay_order_no:'',
      weishow:false,
      timer: null,
      // 公司转账名称
      countcompany:'',
      picktou:'',
      toushow:'',
      c_id:''
    }
  },
  components: {
      Top,
      Foot,
      Fix
  },
  watch:{
    "get"(newValue){
          if(newValue =='1'){
            this.toushow = false;
            this.countcompany = '';
            this.voiceshow=false;
          }else if(newValue=='2'){
            this.voiceshow=true;
          }
    },
    "kai"(newValue){
          if(newValue =='one'){
              this.getlist();
          }else if(newValue=='two'){
            this.getlist();
          }
    },
    // "paytotal"(newValue){
      //       if(newValue ==0){
      //           this.zeroshow=false;
      //       }else{
      //         this.zeroshow=true;
      //       }
    // },
  },
  computed:{
    money(){
      // if(this.select == "请选择"){
      //
      //     }
       this.paytotal = this.total;
    }
  },
  methods:{
    // 提示弹框
    tip(type,msg){
          return this.$message({
              type:type,
              message:msg,
              showClose:true,
              duration:1500
          })
    },
    weicha(){
      this.weishow = false;
      clearInterval(this.timer);
      this.timer = null;
    },
    // 获取 城市三件选择
    getCityData:function(){
        var that = this
        that.$http.get(this.mapJson).then(function(response){
          if (response.status==200) {
            var data = response.data
            that.province = []
            that.city = []
            that.block = []
            // 省市区数据分类
            for (var item in data) {
              if (item.match(/0000$/)) {//省
                that.province.push({id: item, value: data[item], children: []})
              } else if (item.match(/00$/)) {//市
                that.city.push({id: item, value: data[item], children: []})
              } else {//区
                that.block.push({id: item, value: data[item]})
              }
            }
            // 分类市级
            for (var index in that.province) {
              for (var index1 in that.city) {
                if (that.province[index].id.slice(0, 2) === that.city[index1].id.slice(0, 2)) {
                  that.province[index].children.push(that.city[index1])
                }
              }
            }
            // 分类区级
            for(var item1 in that.city) {
              for(var item2 in that.block) {
                if (that.block[item2].id.slice(0, 4) === that.city[item1].id.slice(0, 4)) {
                  that.city[item1].children.push(that.block[item2])
                }
              }
            }
          }
          else{
            console.log(response.status)
          }
        }).catch(function(error){console.log(typeof+ error)})
    },
    // 选省
    choseProvince:function(e) {
      for (var index2 in this.province) {
        if (e === this.province[index2].id) {
          this.shi1 = this.province[index2].children
          this.shi = this.province[index2].children[0].value
          this.qu1 =this.province[index2].children[0].children
          this.qu = this.province[index2].children[0].children[0].value
          this.E = this.qu1[0].id
          // console.log(this.province[index2].value);
         this.a =  this.province[index2].value
        }
      }
    },
    // 选市
    choseCity:function(e) {
      for (var index3 in this.city) {
        if (e === this.city[index3].id) {
          this.qu1 = this.city[index3].children
          this.qu = this.city[index3].children[0].value
          this.E = this.qu1[0].id
          // console.log(this.city[index3].value);
          this.b = this.city[index3].value
        }
      }
    },
    // 选区
    choseBlock:function(e) {
        this.E=e;
      for(var index4 in this.qu1){
        if(e === this.qu1[index4].id){
          // console.log(this.qu1[index4].value)
          this.c =this.qu1[index4].value
        }
      }
    },
    // 弹框弹出
    addaddress(){
      this.addressshow = true;
    },
    // 弹框关闭
    cha(){
      this.addressshow = false;
    },
    cha2(){
      this.tan= false;
    },
    // 邮寄地址保存
    count(){
      let reg1 = /^0\d{2,3}-?\d{7,8}$/;
      let reg2=/^[1][3,4,5,7,8][0-9]{9}$/;
      if(this.people == ""||this.moblie== ""||this.a==""||this.detailaddress ==""){
        return false;
      }else if(!reg1.test(this.moblie)&&!reg2.test(this.moblie)){
        this.tip('error','请填写正确的号码')
      }else{
        if(this.b == ''){
          var shi = this.shi;
        }else{
          var shi = this.b;
        }
        if(this.c == ''){
          var qu = this.qu;
        }else{
          var qu = this.c;
        }
        this.$http.post(this.GLOBAL.base_url+'/api/shippingAddress/addShippAddress',{
            user_id:this.$cookie.getCookie('u_id'),
            consignee:this.people,
            mobile:this.moblie,
            province:this.a,
            city:shi,
            area:qu,
            address:this.detailaddress,
          }).then(res=>{
            if(res.data.code == "1"){
              this.people = '';
              this.moblie = '';
              this.detailaddress = '';
              this.addressshow = false;
              this.getPaylist();
            }
          })
      }
    },
    // 下拉选择
    pick(){
      if(this.chose == "请选择邮寄地址"){
        this.name = '';
        this.telephone = '';
      }else{
        for(var i = 0;i<this.dataArr.length;i++){
          if(this.chose == this.dataArr[i].id){
            this.name = this.dataArr[i].consignee;
            this.telephone = this.dataArr[i].mobile;
          }
        }
      }
    },
    // 添加发票弹框显示
    widnopen(){
      this.getlist()
      this.tan = true;
    },
    // 添加发票弹框隐藏
    comfire(){
      if(this.pickcompany == '0'){
         this.tip('error','请选择发票抬头')
       }else{
         this.tan = false;
          for(var i =0;i<this.arr2.length;i++){
            if(this.pickcompany == this.arr2[i].id){
              this.picktou = this.arr2[i].company_name;
            }
          }
          this.countcompany = this.picktou;
          this.toushow = true;
       }
    },
    // 支付方式
    makeActive(item){
      this.active = item;
      if(this.active == "company"){
        this.testshow = true
      }else{
        this.testshow = false
      }
    },
    // 确认支付
    Tonext(){
      var a = '';
      for (var i = 0;i< this.paylist.length; i++) {
            a+=this.paylist[i].id+',';
      }
      a =  a.substring(0,a.length-1);
      if(this.chose == "请选择邮寄地址"){
            this.tip('error','请选择邮寄地址')
            return false
      }else if(this.get == "2"&&this.pickcompany == '0'){
        this.tip('error','请添加发票信息')
        return false
      }
      if(this.paytotal == 0 ){
        // if(this.select == "请选择"){
        //       this.select = 0
        //     }]
        for(var i = 0;i<this.dataArr.length;i++){
            this.chose = this.dataArr[i].id
        }
            if(this.pickcompany == "0"){
              this.pickcompany = 0
            }
        this.$http.post(this.GLOBAL.base_url+'/api/copyRight/orderPay',{
              user_id:this.$cookie.getCookie('u_id'),
              id:a,
              // c_id:this.select,
              pay_type:0,
              address_id:this.chose,
              invoice_id:this.pickcompany,
              coupon_id:this.c_id
            }).then(res=>{
              if(res.data.code == "1"){
                this.tip('success','支付成功')
                this.$router.push('/personal/orderCopyright?status=all')
              }else{
                this.tip('error',res.msg)
              }
            })
      }
      // 公司转账
      if(this.active == "company"&& this.paytotal != 0){
        // if(this.select == "请选择"){
        //       this.select = 0
        //     }
            if(this.pickcompany == "0"){
              this.pickcompany = 0
            }
            if(this.countcompany == ''){
              this.tip('error','请输入转账公司名称');
              return false;
            }
        // 公司支付
        this.$http.post(this.GLOBAL.base_url+'/api/copyRight/orderPay',{
              user_id:this.$cookie.getCookie('u_id'),
              id:a,
              // c_id:this.select,
              type:4,
              address_id:this.chose,
              company_name:this.countcompany,
              invoice_id:this.pickcompany,
              coupon_id:this.c_id
            }).then(res=>{
              // console.log(res)
              if(res.data.code == "1"){
                this.$router.push('/personal/orderCopyright?status=all')
              }
            })

      }
      // 支付宝
      if(this.active == "bao"&&this.paytotal != 0){
        //  if(this.select == "请选择"){
        //       this.select = 0
        //     }
            if(this.pickcompany == "0"){
              this.pickcompany = 0
            }
          this.$http.post(this.GLOBAL.base_url+'/api/copyRight/orderPay',{
              user_id:this.$cookie.getCookie('u_id'),
              id:a,
              type:1,
              address_id:this.chose,
              invoice_id:this.pickcompany,
              coupon_id:this.c_id
            }).then(res=>{
              // console.log(res)
              if(res.data.code == "0"){
                this.tip('error',res.data.msg)
              }else{
                const div = document.createElement('div');
                div.innerHTML = res.data;
                document.body.appendChild(div);
                document.forms[0].submit();
              }
            })
      }
      // 微信
      if(this.paytotal != 0&&this.active == "wei"){
            this.$http.post(this.GLOBAL.base_url+'/api/copyRight/orderPay',{
            user_id:this.$cookie.getCookie('u_id'),
            id:this.$route.query.id,
            type:2,
            address_id:this.chose,
            invoice_id:this.pickcompany,
              coupon_id:this.c_id
            }).then(res=>{
              if(res.data.code == "1"){
                this.weishow = true
                this.xingimg = res.data.data.filename;
                this.pay_order_no = res.data.data.id;

              }else{
                this.tip('error',res.data.msg)
              }
            })
      }
      // 银联
      if(this.active == "yin"){
        console.log(4)
      }
    },
    // 微信支付成功的定时器
    sucess(){
      if(this.pay_order_no != ''){
        this.$http.get(this.GLOBAL.base_url+'/api/copyRight/checkPay',{params:{
              id:this.pay_order_no,
              user_id:this.$cookie.getCookie('u_id'),
              status:1
        }}).then(res=>{
              if(res.data.data == 1){
                this.weishow = false;
                this.$router.push('/personal/orderCopyright?status=all')
              }
            })
      }
    },
    // 获取 发票数据
    getlist(){
        var a;
       if(this.kai == 'one'){
          a = 1
       }else{
         a= 2
       }
       this.$http.get(this.GLOBAL.base_url+'/api/usercenter/checkinvoices',{params:{
                    user_id:this.$cookie.getCookie('u_id'),
                    type:a
                }}).then(res=>{
                  // console.log(res)
                  this.arr2 = res.data.data;
                })
    },
    // 发票弹框新增跳转
    addInvoice(){
      let routeData = this.$router.resolve({ path: '/personal/manageForm', query: { checkorder: 0 }});
      window.open(routeData.href, '_blank');
      this.tan = false;
    },
    // 优惠券
      getValue(){
            if(this.select == "请选择"){
              this.paytotal = this.total;
            }else{
              for(var i=0;i<this.conpon.length;i++){
                if(this.select == this.conpon[i].id){
                  this.paytotal = this.total - this.conpon[i].user_total;
                  this.c_id = this.conpon[i].id
                }
              }
            }
      },
    // 获取 认证数据
    getData1(){
      this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/applyList',{
              user_id:this.$cookie.getCookie('u_id')
          }).then(res=>{
            if(res.data.code == "1"){
              this.companyarr= res.data.business;
            }
          });
    },
    // 添加认证
    tocomfire(){
      this.$router.push({
        path:'/personal/companyForm',
        query:{
          checkorder:0
        }
      })
    },
    // 返回
    back(){
      this.$router.go(-1);
    },
    // 订单信息数据
    getPaylist() {
      this.$http.post(this.GLOBAL.base_url+'/api/copyRight/pODetail',{
          id:this.$route.query.id,
          user_id:this.$cookie.getCookie('u_id'),
          click_type:this.$route.query.click_type
        }).then(res=>{
          // console.log(res)
            if(res.data.code == "1"){
              this.paylist = res.data.data;
              this.dataArr = res.data.others;
              this.total = res.data.price
              this.gitConpon()
            }
        })
    },
    gitConpon(){
      this.$http.post(this.GLOBAL.base_url+'/api/coupon/getLists',{
        user_id:this.$cookie.getCookie('u_id'),
        money:this.total
      }).then(res => {
        // console.log(res)
        this.conpon = res.data.data
      })
    }
  },
  mounted(){
    this.getPaylist();
    this.getCityData();
    this.getlist();
    this.getData1();
    this.timer = setInterval(() =>{
      this.sucess()
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  }
}

</script>

<style scoped>
  .check-box-top{
    width: 100%;
    height: 188px;
    background-color: #f8f8f8;
  }
  .check-box-top-div{
    width: 1040px;
    height: 188px;
    margin: 0 auto;
    line-height: 188px;
  }
  .check-box-top-div>img{
    vertical-align: middle;
    margin-right: 25px;
  }
  .check-box-top-div>span{
    font-family: "PingFangSC-Semibold";
    font-size: 36px;
    font-weight: 600;
    color: #111111;
    vertical-align: middle;
  }
  .check-box-big{
    width: 1040px;
    margin: 40px auto 100px;
    /* border:1px solid red; */
  }
  .check-box-big-address{
    margin-bottom: 36px;
    height: 125px;
  }
  .address-div1{
    float: left;
  }
  .address-div1>div:nth-of-type(1){
    font-size: 22px;
    font-weight: 600;
    font-family: "PingFangSC-Medium";
    margin-bottom: 16px;
    color: #333333;
  }
  .address-div1>div:nth-of-type(2){
    margin-bottom: 16px;
  }
  .address-div1>div:nth-of-type(2)>select{
    width: 480px;
    height: 40px;
    border-radius: 4px;
    outline: none;
    border: solid 1px #d6d6d6;
    padding-left: 14px;
    font-family: "PingFangSC-Regular";
    font-size: 18px;
    color: #333333;
    cursor: pointer;
  }
  .address-div1>div:nth-of-type(3)>span{
    font-size: 16px;
    color: #f96006;
  }
  .address-div1>div:nth-of-type(3)>span:nth-of-type(1){
    color: #333333;
    margin: 0 226px 0 12px;
  }
  .address-div2{
    float: right;
    width: 120px;
    height: 36px;
    border-radius: 4px;
    background: #f96006;
    font-size: 14px;
    line-height: 36px;
    text-align: center;
    color: #ffffff;
    cursor: pointer;
  }
  .order-infor{
    font-size: 22px;
    font-weight: 600;
    color: #333333;
    margin:40px 0 16px;
  }
  .check-box-big-order{
    padding: 24px 0;
    border-top:1px solid #d8d8d8;
    border-bottom:1px solid #d8d8d8;
  }
  .check-box-big-order-top{
    height: 25px;
  }
  .check-box-big-order-top>div{
    font-family: "PingFangSC-Medium";
    font-size: 18px;
    font-weight: 500;
    color: #333333;
    float: left;
    width: 208px;
    text-align: center;
  }
  .check-box-big-order-list{
    height: 18px;
    margin-top: 30px;
  }
  .check-box-big-order-list>div{
    float: left;
    width: 208px;
    height: 18px;
    text-align: center;
    font-family: "PingFangSC-Regular";
    font-size: 13px;
    color: #343434;
  }
  #edit{
    color: #f96006;
    cursor: pointer;
  }
  .check-box-big-discount{
    margin: 48px 0 24px;
  }
  .check-box-big-discount>div{
    font-family: "PingFangSC-Semibold";
    font-size: 22px;
    font-weight: 600;
    color: #333333;
    margin-bottom: 16px;
  }
  .check-box-big-discount>select{
    width: 480px;
    height: 40px;
    border-radius: 4px;
    outline: none;
    border: solid 1px #d6d6d6;
    padding-left: 15px;
    font-family: "PingFangSC-Regular";
    font-size: 18px;
    color: #999999;
  }
  .check-box-big-invoice{
    margin-bottom: 30px;
    margin-top: 30px;
  }
  .invoice-is{
    font-size: 22px;
    font-weight: 600;
    color: #333333;
    margin-bottom: 24px;
  }
  .invoice-radio{
    height: 25px;
  }
  .invoice-radio>div{
    float: left;
  }
  .invoice-radio>div:nth-of-type(1)>input{
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-right: 10px;
    cursor: pointer;
  }
  .invoice-radio>div:nth-of-type(1)>span{
    font-size: 18px;
    font-weight: 300;
    color: #333333;
    vertical-align: middle;
  }
  .invoice-radio>div:nth-of-type(1)>span:nth-of-type(1){
    margin-right: 80px;
  }
  .invoice-radio>div:nth-of-type(2){
    margin-left: 64px;
    font-size: 18px;
    color: #f96006;
    cursor: pointer;
  }
  .check-box-big-pay{
    padding-bottom: 24px;
    border-bottom: solid 1px #d8d8d8;
    /* margin-bottom: 24px; */
  }
  .check-box-big-pay-type{
    font-family: "PingFangSC-Semibold";
    font-size: 22px;
    font-weight: 600;
    color: #333333;
  }
  .div1,.div2,.div3,.div4{
    width: 464px;
    height: 48px;
    border-radius: 4px;
    border: solid 1px #d6d6d6;
    margin-top: 16px;
    padding: 16px 0 16px 16px;
    cursor: pointer;
  }
  .company .div1,.bao .div2,.wei .div3,.yin .div4{
    border:1px solid red;
  }
  .test-div{
    height: 86px;
    margin: 24px 0;
  }
  .test-div1{
    font-family: "PingFangSC-Semibold";
    font-size: 22px;
    font-weight: 600;
    color: #333333;
    margin-bottom: 16px;
  }
  .test-div2{
    height: 40px;
    line-height: 40px;
  }
  .test-div2>div{
    float: left;
  }
  .test-div2>div:nth-of-type(1){
    margin-right: 45px;
  }
  .test-div2>div:nth-of-type(1)>select{
    width: 480px;
    height: 40px;
    border-radius: 4px;
    outline: none;
    border: solid 1px #d6d6d6;
    padding-left: 14px;
    font-family: "PingFangSC-Regular";
    font-size: 18px;
    color: #333333;
    cursor: pointer;
  }
  .test-div2>div:nth-of-type(2){
    cursor: pointer;
    font-size: 18px;
    color: #f96006;
    margin-right: 324px;
  }
  .test-div2>div:nth-of-type(3){
    width: 115px;
    height: 36px;
    border-radius: 4px;
    background-color: #f96006;
    font-size: 14px;
    color: #ffffff;
    line-height: 36px;
    text-align: center;
    cursor: pointer;
  }
  .check-box-big-price{
    height: 37px;
    margin-bottom: 16px;
    margin-top: 24px;
    line-height: 37px;
    font-family: "PingFangSC-Semibold";
  }
  .check-box-big-price>div:nth-of-type(1){
    float: left;
    font-size: 22px;
    font-weight: 600;
    color: #333333;
  }
  .check-box-big-price>div:nth-of-type(2){
    float: right;
    font-size: 26px;
    font-weight: 600;
    letter-spacing: -2px;
    color: #333333;
  }
  #money{
    color: #f96006;
  }
  .check-box-big-commit{
    height: 54px;
    line-height: 54px;
  }
 .check-box-big-commit>div:nth-of-type(1){
    margin-left: 580px;
    font-family: "PingFangSC-Regular";
    font-size: 14px;
    color: #f96006;
    cursor: pointer;
    float: left;
 }
 .check-box-big-commit>div:nth-of-type(2){
    cursor: pointer;
    float: right;
    width: 363px;
    height: 54px;
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    border-image-source: linear-gradient(to top, #ba6100, #dc773b);
    border-image-slice: 1;
    background-image: linear-gradient(to bottom, #f79000, #f96006), linear-gradient(to top, #ba6100, #dc773b);
    background-origin: border-box;
    background-clip: content-box, border-box;
    font-family: "PingFangSC-Regular";
    font-size: 14px;
    line-height: 54px;
    text-align: center;
    color: #ffffff;
 }
 .add-address{
   background: rgba(0,0,0, 0.8);
    position: fixed;
    z-index: 20;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
 }
 .address-form{
   width: 582px;
   height: 434px;
   background: #ffffff;
   position: absolute;
   top:50%;
   left: 50%;
   z-index: 30;
   transform: translate(-50%,-50%);
 }
 .address-form>img{
   width: 24px;
   height: 24px;
   position: absolute;
   right:20px;
   top:20px;
   cursor: pointer;
 }
 .form-div{
   position: absolute;
   top:81px;
   left: 96px;
 }
 .form-div>div{
   margin-bottom: 30px;
 }
 .form-div>div>span{
   font-size: 14px;
   margin-right: 16px;
   color: #333333;
 }
 .form-div>div>input{
    width: 290px;
    height: 32px;
    border-radius: 4px;
    border: solid 1px #d6d6d6;
    outline: none;
    padding-left: 10px
 }
 .recevie-people>span,.address-div>span{
   margin-left: 14px;
 }
 .select1{
   width: 96px;
  height: 32px;
  border-radius: 4px;
  margin-right: 2px;
 }
 .count{
   width: 108px;
  height: 36px;
  border-radius: 4px;
  background-color:#f96006;
  margin: 0 auto;
  text-align: center;
  line-height: 36px;
  font-size: 14px;
  color: #ffffff;
  cursor: pointer;
 }
  .check-box-tan{
    background: rgba(0,0,0, 0.8);
    position: fixed;
    z-index: 20;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .check-box-tan-div{
    width: 687px;
    height: 361px;
    background-color: #ffffff;
    position: absolute;
    top:50%;
    left: 50%;
    z-index: 30;
    transform: translate(-50%,-50%);
  }
  .check-box-tan-div>span{
    font-family: "PingFangSC-Regular";
    font-size: 24px;
    color: #333333;
    position: absolute;
    top: 16px;
    left: 293px;
  }
  .check-box-tan-div>img{
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
  }
  .check-box-tan-type{
    position: absolute;
    height: 28px;
    top: 103px;
    left: 62px;
  }
  .check-box-tan-type>span,.check-box-tan-add>span{
    font-family: "PingFangSC-Light";
    font-size: 20px;
    font-weight: 300;
    vertical-align: middle;
    color: #333333;
  }
  .check-box-tan-type-span1{
    margin-right: 30px;
  }
  .check-box-tan-type>input{
    width: 24px;
    height: 24px;
    margin-right: 12px;
    vertical-align: middle;
    cursor: pointer;
  }
  .check-box-tan-type-span2{
    margin-right: 38px;
  }
  .check-box-tan-add{
     position: absolute;
     width: 563px;
     height: 40px;
     line-height: 40px;
     top: 153px;
     left: 62px;
  }
  .check-box-tan-add>span{
    margin-right: 30px;
  }
  .check-box-tan-add>div{
    float: right;
    width: 122px;
    height: 36px;
    border-radius: 8px;
    border-style: solid;
    border-width: 2px;
    border-image-source: linear-gradient(to top, #d6d6d6, #d6d6d6);
    border-image-slice: 1;
    background-image: linear-gradient(to bottom, #ffffff, #e3e3e3), linear-gradient(to top, #d6d6d6, #d6d6d6);
    background-origin: border-box;
    background-clip: content-box, border-box;
    text-align: center;
    line-height: 36px;
    font-family: "PingFangSC-Regular";
    font-size: 20px;
    color: #f96006;
    cursor: pointer;
  }
  .check-box-tan-add>select{
    width: 229px;
    height: 40px;
    border-radius: 4px;
    padding-left:15px;
    outline: none;
    border: solid 1px #d6d6d6;
  }
  .check-box-tan-comfire{
    position: absolute;
    width: 563px;
    height: 40px;
    line-height: 40px;
    bottom: 33px;
    left: 300px;
    width: 136px;
    height: 45px;
    border-radius: 8px;
    border-style: solid;
    border-width: 2px;
    border-image-source: linear-gradient(to top, #ba6100, #dc773b);
    border-image-slice: 1;
    background-image: linear-gradient(to bottom, #f79000, #f96006), linear-gradient(to top, #ba6100, #dc773b);
    background-origin: border-box;
    background-clip: content-box, border-box;
    font-family: "PingFangSC-Regular";
    font-size: 24px;
    line-height: 45px;
    text-align: center;
    color: #ffffff;
    cursor: pointer;
  }
  .weixin{
     background: rgba(0,0,0, 0.8);
    position: fixed;
    z-index: 20;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.weixin>img:nth-of-type(1){
    width: 25px;
    height: 25px;
    position: absolute;
    top:35.5%;
    left: 55.5%;
    z-index: 30;
    cursor: pointer;
}
.weixin>img:nth-of-type(2){
    width: 200px;
    height: 200px;
    background-color: #ffffff;
    position: absolute;
    top:50%;
    left: 50%;
    z-index: 30;
    transform: translate(-50%,-50%);
}
 .test-div{
    height: 40px;
    margin: 24px 0 0 0;
  }
  .test-div>span{
    font-size: 18px;
    font-weight: 300;
    color: #333333;
    vertical-align: middle;
  }
  .test-div>input{
    width: 300px;
    height: 30px;
    border: solid 1px #d6d6d6;
    border-radius: 4px;
    outline: none;
    padding-left: 10px;
  }
  .check-chose{
  margin: 10px 0 24px;
  font-size: 18px;
  color: #333333;
  }
</style>
