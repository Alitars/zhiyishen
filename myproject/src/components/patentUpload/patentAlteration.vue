<template>
  <div class="patentAlteration" style="position: relative;">
    <Top></Top>
    <Fix></Fix>
    <div class="patentAlteration-box">
      <!-- 头部 -->
      <div class="patentAlteration-box-top">专利变更申请</div>
       <div class="fail" v-if="this.$route.query.status == '资料审核不通过'">审核不通过原因：{{remark}}</div>
      <!-- 类型 -->
      <div class="patentAlteration-box-type">
        <span>申请人类型</span>
        <input type="radio" value="1" v-model="find" name="invoice" >
        <span>企业</span>
        <input type="radio" value="2" v-model="find" name="invoice" >
        <span>个人</span>
      </div>
      <!-- 企业申请人 -->
      <div class="patentAlteration-box-applicant" v-show="divshow">
        <span>申请人：</span>
        <select v-model="chose" @change='getValue1'>
          <option value="0">请选择</option>
          <option  v-for="(v,k) in arr2" v-bind:value="v.id">{{v.company_name}}</option>
        </select>
        <span  @click="toconfire1()">添加申请人</span>
        <div class="form-msg">{{choseName}}</div>
        <div class="remarks">
          <img src="/static/images/alert1.png" alt="">
          <span>申请人为变更后专利权主体</span>
        </div>
      </div>
      <!-- 个人申请人 -->
      <div class="patentAlteration-box-applicant" v-show="!divshow">
        <span>申请人：</span>
        <select v-model="chose1" @click='getValue2'>
          <option value="0">请选择</option>
          <option v-for="(v,k) in arr1" v-bind:value="v.id">{{v.chinese_name}}</option>
        </select>
        <span @click="toconfire3()">添加申请人</span>
        <div class="form-msg">{{choseName}}</div>
        <div class="remarks">
          <img src="/static/images/alert1.png" alt="">
          <span>申请人为变更后专利权主体</span>
        </div>
      </div>
      <!-- 专利申请号： -->
      <div class="patentAlteration-box-one">
        <span>专利申请号：</span>
        <input v-model="chineseName" type="text">
        <div class="form-msg">{{chineseNameTip}}</div>
      </div>
      <!--  专利名称： -->
      <div class="patentAlteration-box-one">
        <span>专利名称：</span>
        <input v-model="identity"  maxlength="18" type="text">
        <div class="form-msg">{{identityId}}</div>
      </div>
      <!-- 代理机构： -->
      <div class="patentAlteration-box-one">
        <span>代理机构：</span>
        <input v-model="jsmobile" type="text">
        <div class="form-msg">{{jsmobileId}}</div>
      </div>
      <!-- 代理机构解聘书： -->
      <div class="patentAlteration-box-two">
        <span>代理机构解聘书：</span>
        <input type="text" v-model="name1" disabled='disabled'>
        <label for="fileNone"></label>
        <input type="file" id="fileNone" @change="update" ref="file" style="display:none;">
        <span>（上传文件格式为pdf、word或压缩包文件）</span>
        <div class="remarks mt26">
          <img src="/static/images/alert1.png" alt="">
          <span>代理机构发生变化需上传</span>
        </div>
      </div>
      <!-- 准予变更登记通知书： -->
      <div class="patentAlteration-box-two">
        <span>准予变更登记通知书：</span>
        <input type="text" v-model="name2" disabled='disabled'>
        <label for="fileNone1"></label>
        <input type="file" id="fileNone1" name="file" @change="updateCAD" style="display:none;">
        <span>（上传文件格式为pdf、word或压缩包文件）</span>
        <div class="form-msg">{{name2Ip}}</div>
        <div class="remarks1">
          <img src="/static/images/alert25.png" alt="">
          <span @click="openIn1()">查看模板</span>
        </div>
      </div>
      <!-- 提交取消 -->
      <div class="patentAlteration-box-delSub">
        <button  @click="back()">取消</button>
        <button @click="addinvoice" :disabled = "isDisabled">提交</button>
      </div>
    </div>
    <div class="change" v-show="openIn">
      <div class="change-del" @click="down">
        <img src="/static/images/cha.png" alt="">
      </div>
      <img src="/static/images/biangen.jpg" alt="">
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Top from '../ui/top.vue';
import Foot from '../ui/foot.vue';
import Fix from '../ui/fix.vue';
export default {
  name:'patentAlteration',
  components: {
      Top,
      Foot,
      Fix
    },
    data () {
      return {
        // 表单数据
        find:'1',
        // 企业申请人
        arr2:[],
        // 个人申请人
        arr1:[],
        // 申请人
        chose:'0',
        chose1:'0',
        choseName:'',
        // 专利申请号 数据
        chineseName:'',
        chineseNameTip:'',
        // 专利名称 数据
        identity:'',
        identityId:'',
        // 代理机构 数据
        jsmobile:'',
        jsmobileId:'',
        // 代理机构解聘书 传给后台数据
        book1:'',
        // 代理机构解聘书 展示在页面的数据
        name1:'',
        // 准予变更登记通知书 传给后台数据
        book2:'',
        // 准予变更登记通知书 展示在页面的数据
        name2:'',
        name2Ip:'',
        // 控制显示隐藏
        apper:false,
        apper1:true,
        divshow:true,
        showTf:true,
        openIn:false,
        // 个人和企业id
        buss_id:'',
        isDisabled:false,
        // 审核不通过原因
        remark:''
      }
    },
    methods:{
      // 弹框
      tip(type,msg){
        return this.$message({
            type:type,
            message:msg,
            showClose:true,
            duration:1500
        })
      },
      // 代理机构解聘书：
      update(e) {
        let file = e.target.files[0]
        // console.log(file)
        let formData = new FormData();
        formData.append('url_img',file);
        // console.log(formData.get('url_img'))
        if(formData.get('url_img') !=  "undefined" ) {
          this.name1 = formData.get('url_img').name
          localStorage.setItem('name9',this.name1)
          let config = {
            headers:{'Content-Type':'multipart/form-data'}
          };
          this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/brandUploadFile',formData).then( res => {
            // console.log(res)
            if(res.data.code == '1') {
              this.book1 = res.data.filepath
            }
          })
        }
      },
      // 准予变更登记通知书：
      updateCAD(e) {
        let file = e.target.files[0]
        // console.log(file)
        let formData = new FormData();
        formData.append('url_img',file);
        // console.log(formData.get('url_img'))
        if(formData.get('url_img') !=  "undefined" ) {
          this.name2 = formData.get('url_img').name
          localStorage.setItem('name10',this.name2)
          let config = {
            headers:{'Content-Type':'multipart/form-data'}
          };
          this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/brandUploadFile',formData).then( res => {
            // console.log(res)
            if(res.data.code == '1') {
              this.book2 = res.data.filepath
            }
          })
        }
      },
      // 添加申请企业
      toconfire1() {
        let routeData = this.$router.resolve({ path: '/personal/companyForm'});
        window.open(routeData.href, '_blank');
      },
      // 添加申请人
      toconfire3(){
        let routeData = this.$router.resolve({ path: '/personal/personalForm'});
        window.open(routeData.href, '_blank');
      },
      // 获取认证信息
      getData1(){
        this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/applyList',{
          user_id:this.$cookie.getCookie('u_id')
        }).then(res=>{
            // console.log(res)
            if(res.data.code == "1"){
              this.arr1 = res.data.Authentication;
              this.arr2 = res.data.business;
              this.type = res.data.one_cate;
            }
          })
      },
      // 获取 个人和企业id
      getValue1() {
        if (this.find == '1') {
          this.buss_id = this.chose;
          // console.log(this.buss_id)
          // this.getData1()
        }
      },
      getValue2() {
        if (this.find == '2') {
          this.buss_id = this.chose1;
          // console.log(this.buss_id)
          this.getData1()
        }
      },
      // 提交
      addinvoice(){
        this.isDisabled = true
        setTimeout(() => {
          this.isDisabled = false
        },2000)
        if(this.find == '1') {
          if(this.chose == '0') {
            this.choseName = '请选择申请人'
          }else if(this.chineseName == '') {
            this.chineseNameTip = '请输入专利申请号'
          }else if(this.identity == '') {
            this.identityId = '请输入专利名称'
          }else if (this.name2 == '') {
              this.name2Ip = '请上传准予变更登记通知书'
          }else {
            this.$http.post(this.GLOBAL.base_url+'/api/patent/changeTransfer',{
              user_id:this.$cookie.getCookie('u_id'),
              id:this.$route.query.id,
              type:this.find,
              buss_id:this.buss_id,
              apply_no:this.chineseName,
              name:this.identity,
              book1:this.book1,
              book2:this.book2,
              agent:this.jsmobile
            }).then( res => {
              if(res.data.code == "1"){
                  this.tip('success','提交成功')
                  setTimeout(()=>{
                     this.$router.push('/personal/orderPatent?status=all')
                  },500)
              }else{
                 this.tip('error',res.data.msg)
              }
            })
          }
        }
        if(this.find == '2') {
          if(this.chose1 == '0') {
            this.choseName = '请选择申请人'
          }else if(this.chineseName == '') {
            this.chineseNameTip = '请输入专利申请号'
          }else if(this.identity == '') {
            this.identityId = '请输入专利名称'
          }else if (this.name2 == '') {
              this.name2Ip = '请上传准予变更登记通知书'
          }else {
            this.$http.post(this.GLOBAL.base_url+'/api/patent/changeTransfer',{
              user_id:this.$cookie.getCookie('u_id'),
              id:this.$route.query.id,
              type:this.find,
              buss_id:this.buss_id,
              apply_no:this.chineseName,
              name:this.identity,
              book1:this.book1,
              book2:this.book2,
              agent:this.jsmobile
            }).then( res => {
              if(res.data.code == "1"){
                  this.tip('success','提交成功')
                  setTimeout(()=>{
                     this.$router.push('/personal/orderPatent?status=all')
                  },500)
              }else{
                 this.tip('error',res.data.msg)
              }
            })
          }
        }
      },
      // 修改资料
      getData2(){
        this.$http.post(this.GLOBAL.base_url+'/api/patent/changeTransferShow',{
          user_id:this.$cookie.getCookie('u_id'),
          id:this.$route.query.id,
          type:this.$route.query.click_type
        }).then( res => {
          // console.log(res)
          if( res.data.code == '1') {
            this.remark = res.data.data.remark
            if(res.data.data.type == '1') {
              this.find = res.data.data.type
              this.chose = res.data.data.buss_id
              this.buss_id = res.data.data.buss_id
              this.chineseName = res.data.data.apply_no
              this.identity = res.data.data.name
              this.jsmobile = res.data.data.agent
              this.book1 = res.data.data.book1
              this.book2 = res.data.data.book2
              // this.name1 = res.data.data.book1
              // this.name2 = res.data.data.book2
            }
            if( res.data.data.type == '2') {
              this.find = res.data.data.type
              this.chose1 = res.data.data.buss_id
              this.buss_id = res.data.data.buss_id
              this.chineseName = res.data.data.apply_no
              this.identity = res.data.data.name
              this.jsmobile = res.data.data.agent
              this.book1 = res.data.data.book1
              this.book2 = res.data.data.book2
              // this.name1 = res.data.data.book1
              // this.name2 = res.data.data.book2
            }

          }
        })
      },
      // 取消
      back(){
        this.$router.back()
      },
      //
      openIn1(){
        this.openIn = true
      },
      down(){
        this.openIn = false
      }
    },
    created(){
      this.getData1()
      if(this.$route.query.edit == "2") {
        this.getData2()
        this.name1 = localStorage.getItem('name9')
        this.name2 = localStorage.getItem('name10')
      }
    },
    watch:{
      // 申请企业
      'chose'(newValue) {
        if(newValue == '0') {
          return this.choseName = '请选择申请人'
        }
        this.choseName = ''
      },
      // 申请人
      'chose1'(newValue) {
        if(newValue == '0') {
          return this.choseName = '请选择申请人'
        }
        this.choseName = ''
      },
       // 专利申请号
      'chineseName'(newValue){
        if(newValue == ""){
          return this.chineseNameTip='请输入专利申请号';
        }
        this.chineseNameTip= ""
      },
       // 专利名称
      'identity'(newValue) {
        if (newValue == '') {
          return this.identityId = '请输入专利名称'
        }
        return this.identityId = ''
      },
      //代理机构
      'jsmobile'(newValue){
        if(newValue == ""){
          return this.jsmobileId='请输入代理机构';
        }
        this.jsmobileId= ""
      },
      // 控制个人的显示隐藏
      'find'(newValue){
        if(newValue == "1"){
                this.apper = false
                this.apper1 = true
                this.divshow = true
        }
        if(newValue == "2"){
            this.apper = true
            this.apper1 = false
            this.divshow = false
        }
      },
      // 准予变更登记通知书
      'name2'(newValue) {
        if(newValue == '') {
          return this.name2Ip = '请上传准予变更登记通知书';
        }
        this.name2Ip = ''
      },
    }
}
</script>

<style scoped>
/* 公共样式 */
 input {
    width: 744px;
    height: 40px;
    line-height: 40px;
    padding-left: 8px;
    box-sizing: border-box;
    border: solid 1px #d6d6d6;
    font-family: "PingFangSC";
    font-size: 16px;
    color: #999999;
    border-radius: 4px;
  }

  .patentAlteration-box {
    width: 980px;
    margin: 0 auto;
    padding-top: 48px;
    box-sizing: border-box;
  }
  /* 头部 */
  .patentAlteration-box-top {
    width: 980px;
    height: 60px;
    line-height: 60px;
    font-family: "PingFangSC";
    font-size: 20px;
    color: #cdcdcd;
    border-bottom: 1px solid #d8d8d8;
    margin-bottom: 26px;
  }
  /* 类型&&申请专利费用减缓 */
  .patentAlteration-box-type {
    margin-bottom:26px;
  }
  .patentAlteration-box-type > span:nth-child(1) {
    display: block;
    margin-bottom: 17px;
    font-family: "PingFangSC";
    font-size: 18px;
    color: #333;
  }
  .patentAlteration-box-type > input {
    width: 16px;
    height: 16px;
    cursor: pointer;
    vertical-align: middle;
    margin-right: 10px;
  }
  .patentAlteration-box-type > span:nth-child(3) {
    font-family: "PingFangSC";
    font-size: 14px;
    color: #333;
    margin-right: 66px;
    font-weight: 300;
  }
   .patentAlteration-box-type > span:nth-child(5) {
    font-family: "PingFangSC";
    font-size: 14px;
    color: #333;
    font-weight: 300;
  }
  .patentAlteration-box-type > div {
    font-family: "PingFangSC";
    font-size: 14px;
    color: #f96006;
    font-weight: 300;
    float: right;
  }
  .patentAlteration-box-type > div > img {
    vertical-align: middle;
  }
  .patentAlteration-box-type > div > span {
    vertical-align: middle;
    border-bottom: 1px solid #f96006;
  }
  /* 专利申请人 */
  .patentAlteration-box-applicant>span:nth-child(1) {
    font-family: "PingFangSC";
    font-size: 18px;
    color: #333;
    display: block;
    margin-bottom: 16px;
  }
  .patentAlteration-box-applicant > select {
    width: 744px;
    height: 40px;
    line-height: 40px;
    padding-left: 8px;
    box-sizing: border-box;
    border: solid 1px #d6d6d6;
    font-family: "PingFangSC";
    font-size: 16px;
    color: #999999;
  }
  .patentAlteration-box-applicant>span:nth-child(3) {
    font-family: "PingFangSC";
    font-size: 16px;
    color: #f96006;
    margin: 0px 24px 0 10px;
    cursor: pointer;
  }
  .patentAlteration-box-applicant>span:nth-child(4) {
    font-family: "PingFangSC";
    font-size: 16px;
    color: #4a90e2;
    cursor: pointer;
  }
  /* 第一发明人姓名&&第一发明人身份证号&&联系电话&&电子邮箱&&其他发明人*/
  .patentAlteration-box-one>span:nth-child(1) {
    font-family: "PingFangSC";
    font-size: 18px;
    color: #333;
    display: block;
    margin-bottom: 16px;
  }
  .patentAlteration-box-one>span:nth-child(3) {
    font-family:" PingFangSC";
    font-size: 16px;
    font-weight: 300;
    color: #f96006;
  }
  /* 技术交底书&&CAD图纸 */
  .patentAlteration-box-two {
    position: relative;
    width: 744px;
  }
  .patentAlteration-box-two >span:nth-child(1) {
    font-family: "PingFangSC";
    font-size: 18px;
    color: #333;
    display: block;
    margin-bottom: 16px;
  }
  .patentAlteration-box-two > div:nth-child(2) {
    width: 744px;
    height: 40px;
    border: 1px solid #d8d8d8;
    border-radius: 4px;
    border-right: none;
    line-height: 40px;
    padding-left: 8px;
    box-sizing: border-box;
  }
  .patentAlteration-box-two > label {
    width: 88px;
    height: 40px;
    display: block;
    background: url(/static/images/202228.png);
    position: absolute;
    top: 40px;
    right: 0px;
  }
  .patentAlteration-box-two >span:nth-child(5) {
    position: absolute;
    top: 50px;
    right: -330px;
    font-family: "PingFangSC";
    font-size: 16px;
    font-weight: 300;
     color:#f96006;
  }
  /* 申报表A类&&申报表A类封面 */
  .patentAlteration-box-declareA > span:nth-child(1) {
    display: block;
    font-family: "PingFangSC";
    font-size: 18px;
    color: #333;
    margin-bottom: 16px;
  }
  .patentAlteration-box-declareA > div:nth-child(2) {
    display: inline-block;
  }
  .dataimg{
     width: 132px;
     height: 120px;
 }
  .patentAlteration-box-declareA > span:nth-child(3) {
    font-family: "PingFangSC";
    font-size: 16px;
    font-weight: 300;
    color: #f96006;
  }
  /* 取消保存 */
  .patentAlteration-box-delSub {
    text-align: center;
    margin-top: 68px;
    margin-bottom: 80px;
  }
  .patentAlteration-box-delSub > button {
    width: 80px;
    height: 36px;
    line-height: 36px;
    display: inline-block;
    text-align: center;
    font-family: "PingFangSC";
    font-size: 14px;
    cursor: pointer;
    margin: 0;
    padding: 0;
    border: 1px solid transparent;
    outline: none;
  }
  .patentAlteration-box-delSub > button:nth-child(1) {
    background-color: #efefef;
    border-radius: 4px;
    color: #f87e03;
    margin-right: 16px;
  }
  .patentAlteration-box-delSub > button:nth-child(2) {
    background-color: #f96006;
    border-radius: 4px;
    color: #fff;
  }
  /* 备注 */
  .remarks {
    font-family: "PingFangSC";
    font-size: 14px;
    color: #f96006;
    font-weight: 300;
    margin-bottom: 20px;
  }
  .remarks > img {
    vertical-align: middle;
  }
  .remarks > span {
    vertical-align: middle;
  }
  .remarks1 {
    font-family: "PingFangSC";
    font-size: 14px;
    color: #4a90e2;
    font-weight: 300;
    margin-bottom: 20px;
  }
  .remarks1 > img {
    vertical-align: middle;
    margin-right: 0px;
  }
  .remarks1 > span {
    vertical-align: middle;
    border-bottom: 1px solid #4a90e2;
    cursor: pointer;
  }
  .change {
    width: 980px;
    height: 1000px;
    position: absolute;
    top: 163px;
    left: 213px;
    z-index: 999;
    opacity: 0.9;
    text-align: center;
  }
  .change > .change-del {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0px;
    right: 145px;
  }
  .change > .change-del > img{
    width: 50px;
    height: 50px;
  }
  .change > img {
    width: 800px;
    height: 900px;
  }
  .mt26 {
    margin-top: 26px;
  }

  /* 提示 */
  .form-msg {
    height: 26px;
    line-height: 26px;
    font-size: 14px;
    color: red;
  }
  input[disabled] {
    background-color: #fff;
  }
  .fail{
     margin-top: 20px;
     font-size: 20px;
     color: red;
    margin-bottom: 26px;
  }
</style>
