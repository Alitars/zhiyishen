<template>
  <div class="manageForm">
    <div class="manageForm-box-form">
        <!-- <div class="manageForm-box-form-top">新建发票</div> -->
        <div class="manageForm-box-form-wrap">
            <div>
              <span>发票类型</span>
              <input type="radio" value="1" v-model="find" name="invoice"><span>普通发票</span>
              <input type="radio" value="2" v-model="find" name="invoice"><span>增值税发票</span>
            </div>

            <div class="manage-compamy">
                <!-- <img src="/static/images/star.png" alt=""> -->
                <span class="manageForm-box-form-wrap-name">个人/公司名称</span>
                <input v-model="companyName" type="text" placeholder="请输入" @blur="lose">
                <div class="manage-msg">{{companyNameTip}}</div>
                <div class="manage-catch" v-show="companyshow">
                  <div v-for="(v,k) in arr" @click="addname(v)">{{v}}</div>
                </div>
            </div>

            <div>
                <!-- <img src="/static/images/star.png" alt=""> -->
                <span class="manageForm-box-form-wrap-code">税号</span>
                <input v-model="code" type="text" placeholder="请输入">
            </div>
            <div class="manage-msg">{{codeTip}}</div>

            <!-- <div>
                <img src="/static/images/star.png" alt="">
                <span class="manageForm-box-form-wrap-companyaddress">个人/公司地址</span>
                <el-select v-model="sheng" @change="choseProvince" placeholder="省级地区" class="manageForm-box-form-wrap-select1">
                    <el-option
                    v-for="item in province"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                    </el-option>
                </el-select>
                <el-select v-model="shi" @change="choseCity" placeholder="市级地区" class="manageForm-box-form-wrap-select2">
                    <el-option
                    v-for="item in shi1"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                    </el-option>
                </el-select>
                <el-select v-model="qu" @change="choseBlock" placeholder="区级地区" class="manageForm-box-form-wrap-select3">
                    <el-option
                    v-for="item in qu1"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="manage-msg">{{companyAddressTip}}</div> -->

            <div>
                <!-- <img src="/static/images/star.png" alt=""> -->
                <span class="manageForm-box-form-wrap-detailaddree">详细地址</span>
                <input v-model="detailAddress" type="text" placeholder="请输入">
            </div>
            <div class="manage-msg">{{detailAddressTip}}</div>

            <div>
                <!-- <img src="/static/images/star.png" alt=""> -->
                <span class="manageForm-box-form-wrap-companyphone">个人/公司电话</span>
                <input v-model="fixPhone" type="text" placeholder="如：0551-63668080" maxlength="14">
            </div>
            <div class="manage-msg">{{fixPhoneTip}}</div>

            <div v-show="apper">
                <!-- <img src="/static/images/star.png" alt=""> -->
                <span class="manageForm-box-form-wrap-countbank">开户银行</span>
                <input v-model="countBank" type="text" placeholder="请输入">
            </div>
            <div v-show="apper" class="manage-msg">{{countBankTip}}</div>

            <div v-show="apper">
                <!-- <img src="/static/images/star.png" alt=""> -->
                <span class="manageForm-box-form-wrap-bankcount">银行账户</span>
                <input v-model="bankCount" type="number" placeholder="请输入">
            </div>
            <div v-show="apper" class="manage-msg">{{bankCountTip}}</div>

            <!-- <div class="manageForm-box-content">
              <span>发票内容</span>
              <span>明细</span>
            </div> -->

            <div id="manageForm-box-form-wrap-imgbox">
              <!-- 修改后 -->
              <span @click="manageQuit">取消</span>
              <span @click="addinvoice" v-show="chu">保存</span>
              <span v-show="!chu" @click="editinvoice">修改</span>
              <!-- 修改前 -->
                <!-- <img class="manageForm-box-form-wrap-submit-img" src="/static/images/submit.png" alt="" @click="addinvoice" v-show="chu"> -->
                <!-- <img class="manageForm-box-form-wrap-submit-img" src="/static/images/edit.png" alt="" v-show="!chu" @click="editinvoice"> -->
                <!-- <img @click="manageQuit"  src="/static/images/quit.png" alt=""> -->
            </div>
        </div>
    </div>
    <div style="clear:both;"></div>
  </div>
</template>

<script>
const delay = (function() {
		let timer = 0;
		return function(callback, ms) {
			clearTimeout(timer);
			timer = setTimeout(callback, ms);
		};
	})();
export default {
  name: 'manageForm',
  data(){
      return{
        chu:true,
        mapJson:'../../../static/json/map.json',
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
        find:"1",
        apper:false,
        // 表单数据
        companyName:'',
        companyNameTip:'',
        code:'',
        codeTip:'',
        companyAddress:'',
        companyAddressTip:'',
        fixPhone:'',
        fixPhoneTip:'',
        countBank:'',
        countBankTip:'',
        bankCount:'',
        bankCountTip:'',
        detailAddress:'',
        detailAddressTip:'',
        arr:[],
        companyshow:false
      }
  },
  watch:{
      'find'(newValue){
        if(newValue == "1"){
                this.countBank = '';
                this.bankCount = '';
                this.apper = false;
            }
            if(newValue == "2"){
                this.apper = true;
            }
      },
      'companyName'(newValue){
            if(newValue == ""){
              this.companyshow = false;
                return this.companyNameTip='请输入个人或公司名称';
            }else{
              this.companyshow = true;
            for(var i =0;i<this.arr.length;i++){
              if(this.arr[i] == newValue){
                this.companyshow = false;
              }
            }
            delay(() => {
                this.fetchData();
            }, 200);
            }
            this.companyNameTip= ""
        },
        'code'(newValue){
            if(newValue == ""){
                return this.codeTip='请输入税号';
            }
            this.codeTip= ""
        },
        'companyAddress'(newValue){
            if(newValue == ""){
                return this.companyAddressTip='请输入个人或公司地址';
            }
            this.companyAddressTip= ""
        },
        'fixPhone'(newValue){
            let reg1 = /^0\d{2,3}-?\d{7,8}$/;
            let reg2=/^[1][3,4,5,7,8][0-9]{9}$/;
            if(newValue == ""){
                return this.fixPhoneTip='请输入个人或公司电话';
            }else if(!reg1.test(newValue)&&!reg2.test(newValue)){
                return this.fixPhoneTip='请填写正确的号码';
            }
            this.fixPhoneTip= ""
        },
        'countBank'(newValue){
            if(newValue == ""){
                return this.countBankTip='请输入开户银行';
            }
            this.countBankTip= ""
        },
        'bankCount'(newValue){
            if(newValue == ""){
                return this.bankCountTip='请输入银行账户';
            }
            this.bankCountTip= ""
        },
        // 'a'(newValue){
        //     if(newValue == ""){
        //         return this.companyAddressTip='请输入个人/公司地址';
        //     }
        //     this.companyAddressTip= ""
        // },
        'detailAddress'(newValue){
            if(newValue == ""){
                return this.detailAddressTip='请输入个人或公司地址';
            }
            this.detailAddressTip= ""
        },
  },
  methods:{
    tip(type,msg){
          return this.$message({
              type:type,
              message:msg,
              showClose:true,
              duration:1500
          })
      },
      manageQuit(){
          if(this.$route.query.checkorder == "0"){
              this.$router.go(-1)
            }else{
              this.$router.push('/personal/manageList')
            }
      },
      // 抓取企业名称
      async fetchData(val) {
				this.$http.get(this.GLOBAL.base_url+'/api/authentication/findcom?company_name='+this.companyName).then(res=>{
          // console.log(res);
          if(res.data.code == "1"){
            this.arr = res.data.data;
          }
        })
      },
      lose(){
        setTimeout(() => {
               this.companyshow = false;
          }, 1000);
          if(this.companyName != ''){
            this.$http.post(this.GLOBAL.base_url+'/api/authentication/businessTian',{
              company_name:this.companyName
            }).then(res=>{
                // console.log(res)
               if(res.data.code == "1"){
                 this.code = res.data.data.result.taxNumber;
                 this.detailAddress = res.data.data.result.regLocation;
               }else{
                 this.code = '';
                 this.detailAddress = '';
               }
              });
          }

      },
      addname(val){
        this.companyName = val;
        this.lose()
      },
        // 加载china地点数据，三级
      // getCityData:function(){
      //   var that = this
      //   that.$http.get(this.mapJson).then(function(response){
      //     if (response.status==200) {
      //       var data = response.data
      //       that.province = []
      //       that.city = []
      //       that.block = []
      //       // 省市区数据分类
      //       for (var item in data) {
      //         if (item.match(/0000$/)) {//省
      //           that.province.push({id: item, value: data[item], children: []})
      //         } else if (item.match(/00$/)) {//市
      //           that.city.push({id: item, value: data[item], children: []})
      //         } else {//区
      //           that.block.push({id: item, value: data[item]})
      //         }
      //       }
      //       // 分类市级
      //       for (var index in that.province) {
      //         for (var index1 in that.city) {
      //           if (that.province[index].id.slice(0, 2) === that.city[index1].id.slice(0, 2)) {
      //             that.province[index].children.push(that.city[index1])
      //           }
      //         }
      //       }
      //       // 分类区级
      //       for(var item1 in that.city) {
      //         for(var item2 in that.block) {
      //           if (that.block[item2].id.slice(0, 4) === that.city[item1].id.slice(0, 4)) {
      //             that.city[item1].children.push(that.block[item2])
      //           }
      //         }
      //       }
      //     }
      //     else{
      //       console.log(response.status)
      //     }
      //   }).catch(function(error){console.log(typeof+ error)})
      // },
      // // 选省
      // choseProvince:function(e) {
      //   for (var index2 in this.province) {
      //     if (e === this.province[index2].id) {
      //       this.shi1 = this.province[index2].children
      //       this.shi = this.province[index2].children[0].value
      //       this.qu1 =this.province[index2].children[0].children
      //       this.qu = this.province[index2].children[0].children[0].value
      //       this.E = this.qu1[0].id
      //       // console.log(this.province[index2].value);
      //      this.a =  this.province[index2].value
      //     }
      //   }
      // },
      // // 选市
      // choseCity:function(e) {
      //   for (var index3 in this.city) {
      //     if (e === this.city[index3].id) {
      //       this.qu1 = this.city[index3].children
      //       this.qu = this.city[index3].children[0].value
      //       this.E = this.qu1[0].id
      //       // console.log(this.city[index3].value);
      //       this.b = this.city[index3].value
      //     }
      //   }
      // },
      // // 选区
      // choseBlock:function(e) {
      //   this.E=e;
      //   for(var index4 in this.qu1){
      //     if(e === this.qu1[index4].id){
      //       // console.log(this.qu1[index4].value)
      //       this.c =this.qu1[index4].value
      //     }
      //   }

      // },
      addinvoice(){

        // 判断当联系地址选择省的时候 市和区是否默认的第一个
        // if(this.b == ''){
        //   var shi = this.shi;
        // }else{
        //    var shi = this.b;
        // }
        // if(this.c == ''){
        //   var qu = this.qu;
        // }else{
        //    var qu = this.c;
        // }
        if(this.find == "1"){
          if(this.companyName == ''){
            this.companyNameTip = "请输入个人或公司名称"
            return false
          }else if(this.code == ''){
            this.codeTip = "请输入税号"
            return false
          }else if(this.detailAddress == ''){
            this.detailAddressTip = '请输入个人或公司地址'
            return false
          }else if(this.fixPhone == ''){
            this.fixPhoneTip = '请输入个人和公司电话'
            return false
          }else if(this.fixPhoneTip=='请填写正确的号码'){
            return false
          }else{
            // console.log(123)
            this.$http.post(this.GLOBAL.base_url+'/api/usercenter/addinvoices',{
                      invoice_type:1,
                      uid:this.$cookie.getCookie('u_id'),
                      company_name:this.companyName,
                      credit_code:this.code,
                      recive_address:'',
                      recive_address_city:'',
                      recive_address_area:'',
                      detail_address:this.detailAddress,
                      mobile:this.fixPhone,
                      bank:this.countBank,
                      bank_count:this.bankCount,
                      content:''
                  }).then(res=>{
                    if(res.data.code == "1"){
                      this.tip('success',res.data.msg);
                      if(this.$route.query.checkorder == "0"){
                        this.$router.push('/personal/manageList')
                      }else{
                        this.$router.go(-1)
                      }
                    }
                  })
            }
        }
        if(this.find == "2"){
          if(this.companyName == ''){
            this.companyNameTip = "请输入个人或公司名称"
            return false
          }else if(this.code == ''){
            this.codeTip = "请输入税号"
            return false
          }else if(this.detailAddress == ''){
            this.detailAddressTip = '请输入个人或公司地址'
            return false
          }else if(this.fixPhone == ''){
            this.fixPhoneTip = '请输入个人和公司电话'
            return false
          }else if(this.countBank == ''){
            this.countBankTip = '请输入开户银行'
            return false
          }else if(this.bankCount == ''){
            this.bankCountTip = '请输入银行账户'
            return false
          }else if(this.fixPhoneTip=='请填写正确的号码'){
            return false
          }else{
            this.$http.post(this.GLOBAL.base_url+'/api/usercenter/addinvoices',{
                      invoice_type:2,
                      uid:this.$cookie.getCookie('u_id'),
                      company_name:this.companyName,
                      credit_code:this.code,
                      recive_address:'',
                      recive_address_city:'',
                      recive_address_area:'',
                      detail_address:this.detailAddress,
                      mobile:this.fixPhone,
                      bank:this.countBank,
                      bank_count:this.bankCount,
                      content:''
                  }).then(res=>{
                    if(res.data.code == "1"){
                      this.tip('success',res.data.msg);
                      if(this.$route.query.checkorder == "0"){
                        this.$router.push('/personal/manageList')
                      }else{
                        this.$router.go(-1)
                      }
                    }
                  })
            }
        }
      },
      editinvoice(){
        if(this.$route.query.id){

            if(this.find == "1"){
          if(this.companyName == ''){
            this.companyNameTip = "请输入个人或公司名称"
            return false
          }else if(this.code == ''){
            this.codeTip = "请输入税号"
            return false
          }else if(this.detailAddress == ''){
            this.detailAddressTip = '请输入个人或公司地址'
            return false
          }else if(this.fixPhone == ''){
            this.fixPhoneTip = '请输入个人和公司电话'
            return false
          }else if(this.fixPhoneTip=='请填写正确的号码'){
            return false
          }else{
            this.$http.post(this.GLOBAL.base_url+'/api/usercenter/editinvoices',{
                      id:this.$route.query.id,
                      invoice_type:1,
                      uid:this.$cookie.getCookie('u_id'),
                      company_name:this.companyName,
                      credit_code:this.code,
                      recive_address:'',
                      recive_address_city:'',
                      recive_address_area:'',
                      detail_address:this.detailAddress,
                      mobile:this.fixPhone,
                      bank:this.countBank,
                      bank_count:this.bankCount,
                      content:''
                  }).then(res=>{
                    if(res.data.code == "1"){
                      this.tip('success',res.data.msg);
                      this.$router.push('/personal/manageList')
                    }
                  })
            }
        }
        if(this.find == "2"){
          if(this.companyName == ''){
            this.companyNameTip = "请输入个人或公司名称"
            return false
          }else if(this.code == ''){
            this.codeTip = "请输入税号"
            return false
          }else if(this.detailAddress == ''){
            this.detailAddressTip = '请输入个人或公司地址'
            return false
          }else if(this.fixPhone == ''){
            this.fixPhoneTip = '请输入个人或公司电话'
            return false
          }else if(this.countBank == ''||this.countBank ==null){
            this.countBankTip = '请输入开户银行'
            return false
          }else if(this.bankCount == ''||this.bankCount == null){
            // console.log(123)
            this.bankCountTip = '请输入银行账户'
            return false
          }else if(this.fixPhoneTip=='请填写正确的号码'){
            return false
          }else{
            this.$http.post(this.GLOBAL.base_url+'/api/usercenter/editinvoices',{
                      id:this.$route.query.id,
                      invoice_type:2,
                      uid:this.$cookie.getCookie('u_id'),
                      company_name:this.companyName,
                      credit_code:this.code,
                      recive_address:'',
                      recive_address_city:'',
                      recive_address_area:'',
                      detail_address:this.detailAddress,
                      mobile:this.fixPhone,
                      bank:this.countBank,
                      bank_count:this.bankCount,
                      content:''
                  }).then(res=>{
                    if(res.data.code == "1"){
                      this.tip('success',res.data.msg);
                      this.$router.push('/personal/manageList')
                    }
                  })
            }
        }
        }
      },
      getdata(){
        this.$http.get(this.GLOBAL.base_url+'/api/usercenter/detailinvoices',{params:{
                    id:this.$route.query.id
              }}).then(res=>{
                // console.log(res)
                if(res.data.code == "1"){
                  this.companyName = res.data.data.company_name;
                  this.find = res.data.data.invoice_type;
                  this.code = res.data.data.credit_code;
                  // this.sheng = res.data.data.recive_address;
                  // this.a = res.data.data.recive_address;
                  // this.shi=res.data.data.recive_address_city;
                  // this.qu=res.data.data.recive_address_area;
                  this.detailAddress = res.data.data.detail_address;
                  this.fixPhone = res.data.data.mobile;
                  this.countBank = res.data.data.bank;
                  this.bankCount = res.data.data.bank_count;
                }
              })
      },

  },
  created:function(){
      // this.getCityData()
    },
    mounted(){
      if(this.$route.query.id){
        this.chu = false;
        this.getdata()
      }
    },
  components: {
  }
}

</script>

<style scoped>
    .manageForm-box-form{
      width: 1015px;
      float: left;
      margin: 12px 0 0px 16px;
      background-color: #fff;
      padding-top: 38px;
      min-height: 950px;
      box-sizing: border-box;
  }
  /* .manageForm-box-form-top{
      margin: 0 0 14px 43px;
      font-size: 22px;
      font-weight: 100;
      color: #999999;
      font-family: "PingFangSC-Thin";
  } */
  .manageForm-box-form-wrap{
      width: 550px;
      /* border-top:1px solid #d8d8d8; */
      /* padding-left: 30px; */
      margin: 0 auto;
  }
  .manageForm-box-form-wrap>div:nth-of-type(1){
      /* margin-top: 20px; */
      margin-bottom:30px;
  }
  .manageForm-box-form-wrap>div:nth-of-type(1)>input{
    width: 16px;
    height: 16px;
    cursor: pointer;
    vertical-align: middle;
    margin-right: 10px;
  }
  .manageForm-box-form-wrap>div:nth-of-type(1)>span:nth-of-type(1){
    margin:0 20px 0 32px;
  }
  .manageForm-box-form-wrap>div:nth-of-type(1)>span:nth-of-type(2){
    margin-right: 20px;
  }
  .manage-compamy{
    position: relative;
  }
  .manage-catch{
    width: 360px;
    height: 220px;
    overflow-y: auto;
    position: absolute;
    z-index: 10;
    background: #ffffff;
    left: 111px;
    top: 39px;
    border:1px solid #d8d8d8;
  }
  .manage-catch::-webkit-scrollbar {
            width: 8px;
            height: 8px;
    }
    .manage-catch::-webkit-scrollbar-thumb {
        border-radius: 5px;
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    }
    .manage-catch::-webkit-scrollbar-track {
            opacity: 0;
    }
  .manage-catch>div{
    color: #333333;
    padding-left: 10px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .manage-catch>div:hover{
    background-color: #f96006;
  }
    .manage-msg{
        height: 32px;
        color: red;
        line-height: 32px;
        font-size: 14px;
        margin-left: 110px;
    }
  .manageForm-box-form-wrap>div>input{
      width: 360px;
      height: 40px;
      border-radius: 4px;
      border: solid 1px #d6d6d6;
      font-family: "PingFangSC";
      font-size: 14px;
      color: #999999;
      outline: none;
      padding-left: 7px;
      margin-left: 16px;
      box-sizing: border-box;
  }
  input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    input[type="number"]{
        -moz-appearance: textfield;
    }
  .manageForm-box-form-wrap>div>span{
      font-size: 14px;
      font-family: "PingFangSC";
      color: #333333;
      vertical-align: middle;
  }
  .manageForm-box-form-wrap>div>img{
      vertical-align: middle;
  }
  /* .manageForm-box-form-wrap-name,.manageForm-box-form-wrap-companyaddress,.manageForm-box-form-wrap-companyphone{
    margin-left: 25px;
  } */
  .manageForm-box-form-wrap-bankcount,.manageForm-box-form-wrap-countbank,.manageForm-box-form-wrap-detailaddree{
      margin-left: 34px;
  }
  .manageForm-box-form-wrap-code{
      margin-left: 62px;
  }
  .manageForm-box-form-wrap-ticknum{
      margin-left: 34px;
  }
  .manageForm-box-form-wrap-select1{
      width: 108px;
      height: 32px;
      margin: 0 14px 0 16px;
  }
  .manageForm-box-form-wrap-select2{
      width: 108px;
      height: 40px;
      margin-right:14px;
  }
  .manageForm-box-form-wrap-select3{
       width: 108px;
      height: 40px;
  }
  #manageForm-box-form-wrap-imgbox{
    margin-top: 38px;
    margin-left: 128px;
  }
  #manageForm-box-form-wrap-imgbox> span {
    display: inline-block;
    width: 80px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    margin-bottom: 64px;
    cursor: pointer;
  }
  #manageForm-box-form-wrap-imgbox> span:nth-child(1) {
    background: url(/static/images/invalid-name1h.png);
    color: #f96006;
    margin-right: 32px;
  }
  #manageForm-box-form-wrap-imgbox> span:nth-child(2) {
    background: url(/static/images/invalid-name1f.png);
    color: #fff;
  }
  #manageForm-box-form-wrap-imgbox> span:nth-child(3) {
    background: url(/static/images/invalid-name1f.png);
    color: #fff;
  }
  /* #manageForm-box-form-wrap-imgbox>img{
      cursor: pointer;
  }
  .manageForm-box-form-wrap-submit-img{
    margin: 0 36px  0 90px;
  }
  .manageForm-box-content>span:nth-of-type(1){
    margin: 0 25px 0 32px;
  } */
  /* .el-input__inner {
    height: 32px !important;
  } */
</style>
<style >
  /* .el-input__inner {
    height: 32px !important;
  } */
</style>
