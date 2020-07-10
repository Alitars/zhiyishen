<template>
  <div class="publish-container">
    <Top></Top>
    <Fix></Fix>
    <div class="publish-box">
      <!-- 发布商标 -->
      <div class="publish-box-main" v-if="publish_show">
        <!-- 标题 -->
        <div class="publish-title">发布商标
          <span>批量发布
            <input type="file" @change="uplaod2($event)" class="file-input">
          </span>
          <span>
            <a href="/static/images/商标交易模板.xls" target="_blank">发布模版下载</a>
          </span>
        </div>
        <!-- 线 -->
        <div class="publish-line"></div>
        <!-- 内容 -->
        <div class="publish-content">
          <div>
            <span>商标图案:</span>
            <div>
              <img :src="'data:image/png;base64,'+ brandImg" alt="">
            </div>
            <span @click="alternative">选择商标</span>
          </div>
          <div class="div5">
            <span>商标名称:</span>
            <span>{{brandNmae}}</span>
          </div>
          <div class="div5">
            <span>商标类别:</span>
            <span>{{brandClass}}</span>
          </div>
          <div class="div5">
            <span>注&nbsp;册&nbsp;&nbsp;号:</span>
            <span>{{brandNumber}}</span>
          </div>
          <div class="div5">
            <span>法律状态:</span>
            <span>{{brandState}}</span>
          </div>
          <div class="div5">
            <span class="ml-22">专用权期限:</span>
            <span>{{brandTime}}</span>
          </div>
        </div>
        <!-- 线 -->
        <div class="publish-line"></div>
        <!-- 设置商标价格 -->
        <div class="publish-installPrice">
          <div>
            <span>设置商标价格:</span>
            <input type="text" placeholder="如10000.00元或不输为待议价" v-model="price" onkeyup="value=value.replace(/[^\d\.]/g,'')">
          </div><div>
            <span class="ml44">您的姓名:</span>
            <input type="text" placeholder="输入您的真实姓名" v-model="contact_name">
          </div><div>
            <span class="ml44">联系方式:</span>
            <input type="text" placeholder="输入手机号" v-model="contact_way" maxlength="14" onkeyup="value=value.replace(/[^\d\-\d]/g,'')">
          </div>
        </div>
        <div style="clear:both"></div>
        <!-- 提交 -->
        <div class="submit" @click="publish">发布</div>
      </div>
      <!-- 恭喜发布商标成功！ -->
      <div class="publish-box-main" v-if="!publish_show">
        <!-- 标题 -->
        <div class="publish-title">发布商标</div>
        <!-- 线 -->
        <div class="publish-line"></div>
        <div class="publish-success">恭喜发布商标成功！</div>
        <div class="mt32 publish-success">如果有客户想购买您的商标，我们会尽快跟您联系</div>
        <div class="mt10 publish-success">请等待消息吧</div>
        <div class="publish-success-img">
          <img src="/static/images/xiaoguo2.png" alt="">
        </div>
        <div class="publish-success-jump">
          <span @click="back()">返回商标市场</span>
          <span @click="brandDetail">查看商标详情</span>
        </div>
      </div>
    </div>
    <!-- 发布商标弹框 -->
    <div class="publish-inquiry" v-show="inquiry_show">
      <div class="publish-inquiry-box">
        <div @click="cha">
          <img src="/static/images/cha2.png" alt="">
        </div>
        <div>请选择您要发布的商标</div>
        <div>
          <select name="" id="" v-model="chose" @change='getValue'>
            <option value="0">请选择您要发布的商标的企业</option>
            <option v-for="(v,k) in companyData"  :value="v.company_name" :key="k">{{v.company_name}}</option>
          </select>
        </div>
        <div>
          <ul v-if="post_show">
            <li v-for="(item,index) in listData" :key="index" @click="switch1(index,item.BrandImg,item.BrandName,item.IntCls,item.RegId,item.BrandStatus,item.Ggdate,item.EffectiveEndDate)" >
              <img :src="'data:image/png;base64,'+item.BrandImg?'data:image/png;base64,'+item.BrandImg:'/static/images/no.png'" alt="" :class="{borer_color:boc == index}">
              <p>{{item.IntCls}}</p>
            </li>
          </ul>
          <p v-if="!post_show" class="post">暂无已注册商标</p>
        </div>
        <p @click="submit">提交</p>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
  import Top from '../ui/top.vue';
  import Foot from '../ui/foot.vue';
  import Fix from '../ui/fix.vue';
  export default {
    name:'publish',
    components: {
      Top,
      Foot,
      Fix
    },
    data(){
      return {
        publish_show: true,
        inquiry_show:false,
        companyData:[],
        chose:'0',
        listData:[],
        boc:-1,
        brandImg:'',
        brandNmae:'',
        brandClass:'',
        brandNumber:'',
        brandState:'',
        brandTime:'',
        price:'',
        contact_name:'',
        contact_way:'',
        // 提价之后改变
        brandImg1:'',
        brandNmae1:'',
        brandClass1:'',
        brandNumber1:'',
        brandState1:'',
        brandTime1:'',
        post_show:false,
        // 控制上传相同图片不响应
        clearShow:true,
      }
    },
    methods:{
      // 弹框
      tip(type,msg){
        return this.$message({
            type:type,
            message:msg,
            showClose:true,
            duration:2000
        })
      },
      // 企业认证导入
      uplaod2(e){
        this.file = e.target.files[0];
        let formData = new FormData();
        formData.append('url_xls',this.file);
        formData.append('user_id',this.$cookie.getCookie('u_id'));
        const loading = this.$loading({
          lock: true,
          text: '导入中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.3)',
        });
        this.$http.post(this.GLOBAL.base_url+"/api/brandLead",formData).then(res => {
            if(res.data.code == "1"){
              loading.close();
              // console.log(res)
              this.tip('success',res.data.msg);
              this.publish_show = false
              e.target.value = ''
            }else{
              loading.close();
              this.tip('error',res.data.msg)
              e.target.value = ''
            }
        })
      },
      back(){
        this.$router.push('/brandBuy')
      },
      brandDetail() {
        this.$router.push('/brandDetail')
      },
      cha(){
        this.inquiry_show = false
      },
      alternative() {
        this.inquiry_show = true
      },
      getData() {
        this.$http.post(this.GLOBAL.base_url+'/api/businessPass',{
          user_id:this.$cookie.getCookie('u_id'),
        }).then( res => {
          this.companyData = res.data.data
        })
      },
      getValue() {
        this.listData = []
        const loading = this.$loading({
          lock: true,
          text: '获取中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.3)',
          target: '.publish-inquiry-box'
        });
        this.$http.post(this.GLOBAL.base_url+'/api/companybrand',{
          company:this.chose
        }).then(res => {
          // console.log(res)
          loading.close();
          if(res.data.data.length == 0) {
            this.listData = []
            this.post_show = false
          }else {
            this.listData = res.data.data
            this.post_show = true
          }
        })
      },
      switch1(val,val1,val2,val3,val4,val5,val6,val7){
        this.boc = val
        this.brandImg1 = val1
        this.brandNmae1 = val2
        this.brandClass1 = val3
        this.brandNumber1 = val4
        this.brandState1 = val5
        if(val6 == null && val7 == '') {
          this.brandTime1 = '无'
        }else {
          this.brandTime1 = val6 + '-' + val7
        }
      },
      submit() {
        this.brandImg = this.brandImg1
        this.brandNmae = this.brandNmae1
        this.brandClass = this.brandClass1
        this.brandNumber = this.brandNumber1
        this.brandState = this.brandState1
        this.brandTime = this.brandTime1
        this.inquiry_show = false
      },
      // 发布
      publish() {
        if(this.brandImg == '') {
          this.tip('error','请选择您要出售的商标')
        }else if(this.price == '') {
          this.tip('error','请输出你的报价')
        }else if(this.contact_name == '') {
          this.tip('error','请填写你的名字')
        }else if(this.contact_way == '') {
          this.tip('error','请填写你的联系电话')
        }else {
          this.$http.post(this.GLOBAL.base_url+'/api/issueBrand',{
            user_id:this.$cookie.getCookie('u_id'),
            brand_name:this.brandNmae,
            one_cate:this.brandClass,
            price:this.price,
            brand_img:this.brandImg,
            reg_num:this.brandNumber,
            contact_name:this.contact_name,
            contact_way:this.contact_way,
          }).then(res => {
            // console.log(res)
            if(res.data.code == 1) {
              this.publish_show = false
            }else {
              this.tip('error',res.msg)
            }
          })
        }
      }
    },
    mounted(){
      this.getData()
    }
  }
</script>

<style scoped>
  .publish-container {
    position: relative;
  }
  .publish-box {
    background-color: #fafafa;
    padding-top: 24px;
  }
  .publish-box-main {
    width: 1200px;
    height: 1119px;
    background-color: #fff;
    margin: 0 auto;
    padding-top: 67px;
    box-sizing: border-box;
    font-family: 'PingFangSC';
  }
  /* 标题 */
  .publish-title {
    width: 887px;
    margin: 0 auto;
    font-size: 36px;
    font-weight: 500;
    color: #333;
  }
  /* 线 */
  .publish-line {
    width: 887px;
    height: 1px;
    background: #d8d8d8;
    margin: 32px auto;
    margin-bottom: 1px;
  }
  /* 内容 */
  .publish-content {
    padding-top: 31px;
    margin: 0 auto;
    width: 887px;
    box-sizing: border-box;
  }
  .publish-content > div {
    margin-left: 30px;
  }
  .publish-content > div:nth-child(1) {
    margin-left: 30px;
    height: 182px;
    margin-bottom: 37px;
  }
  .publish-content > div:nth-child(1) > span:nth-child(1){
    font-size: 22px;
    font-weight: 500;
    color: #333;
    float: left;
  }
  .publish-content > div:nth-child(1) > div{
    width: 180px;
    height: 180px;
    border: 1px dashed #d8d8d8;
    float: left;
    margin-left: 32px;
    cursor: pointer;
  }
  .publish-content > div:nth-child(1) > div > img {
    width: 180px;
    height: 180px;
  }
  .publish-content > div:nth-child(1) > span:nth-child(3){
    width: 108px;
    height: 36px;
    border-radius: 4px;
    background-color: #f96009;
    line-height: 36px;
    text-align: center;
    color: #fff;
    float: left;
    margin: 146px 0 0px 50px;
    cursor: pointer;
  }
  .publish-content > .div5 {
    margin-bottom: 42px;
  }
  .publish-content > .div5 > span:nth-child(1){
    font-size: 22px;
    font-weight: 500;
    color: #333;
  }
  .publish-content > .div5 > span:nth-child(2){
    font-size: 22px;
    font-weight: 500;
    color: #333;
    margin-left: 26px;
  }
  .ml-22 {
    margin-left: -22px !important;
  }
  /* 设置商标价格 */
  .publish-installPrice {
    padding-top: 31px;
    margin: 0 auto;
    width: 887px;
    box-sizing: border-box;
  }
  .publish-installPrice > div {
    margin-bottom: 32px;
  }
  .publish-installPrice > div > span {
    font-size: 22px;
    font-weight: 500;
    color: #333;
    margin-right: 32px;
  }.publish-installPrice > div > input {
    width: 711px;
    height: 40px;
    border-radius: 4px;
    border: solid 1px #d6d6d6;
    padding: 9px 12px;
    box-sizing: border-box;
  }
  .ml44 {
    margin-left: 44px;
  }
  /* 提交 */
  .submit {
    width: 108px;
    height: 36px;
    border-radius: 4px;
    background-color: #f96009;
    color: #fff;
    line-height: 36px;
    margin: 0 auto;
    text-align: center;
    margin-top: 16px;
    cursor: pointer;
  }
  /* 恭喜发布商标成功！ */
  .publish-success {
    width: 887px;
    margin: 0 auto;
    text-align: center;
    font-size: 22px;
    font-weight: 600;
    color: #000;
    margin-top: 63px;

  }
  .mt32 {
    margin-top: 32px;
    font-size: 16px;
    color: #999 !important;
    font-weight: 100;
  }
  .mt10 {
    margin-top: 10px;
    font-size: 16px;
    color: #999 !important;
    font-weight: 100;
  }
  .publish-success-img {
    width: 887px;
    margin: 0 auto;
    text-align: center;
    margin-top: 64px;
  }
  .publish-success-jump {
    width: 887px;
    margin: 0 auto;
    text-align: center;
    margin-top: 72px;
  }
  .publish-success-jump > span {
    float: left;
    cursor: pointer;
  }
  .publish-success-jump > span:nth-child(1) {
    width: 120px;
    height: 36px;
    border-radius: 4px;
    background-color: #f96006;
    color: #fff;
    line-height: 36px;
    text-align: center;
    margin-left: 308px;
  }
  .publish-success-jump > span:nth-child(2) {
    width: 120px;
    height: 36px;
    border-radius: 4px;
    background-color: #fbefe9;
    border: solid 1px #f96006;
    color: #f96006;
    line-height: 36px;
    text-align: center;
    margin-left: 24px;
  }
  /* 发布商标弹框 */
  .publish-inquiry {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 0;
  }
  .publish-inquiry-box {
    width: 638px;
    height: 576px;
    background-color: #fff;
    transform: translate(-50%,-50%);
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 9999;
    padding: 17px 16px 0 0;
  }
  .publish-inquiry-box > div:nth-child(1) {
    float: right;
    cursor: pointer;
    height: 14px;
  }
  .publish-inquiry-box > div:nth-child(2) {
    text-align: center;
    margin-top: 14px;
    margin-bottom: 22px;
  }
  .publish-inquiry-box > div:nth-child(3) {
    text-align: center;
    margin-top: 14px;
    margin-bottom: 22px;
  }
  .publish-inquiry-box > div:nth-child(3) > select {
    width: 360px;
    height: 32px;
    border-radius: 4px;
    border: solid 1px #d6d6d6;
    background-color: #fff;
    padding: 6px 12px;
    box-sizing: border-box;
  }
  .publish-inquiry-box > div:nth-child(4) {
    margin-top: 14px;
    margin-bottom: 22px;
    width: 559px;
    height: 348px;
    background-color: #fafafa;
    margin: 0 auto;
    padding: 16px 16px 0px 6px;
    box-sizing: border-box;
    overflow: auto;
    margin-bottom: 34px;
  }
  .publish-inquiry-box > div:nth-child(4) > ul > li {
    float: left;
    margin-left: 10px;
    width: 120px;
    height: 148px;
    margin-bottom: 16px;
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
  }
  .publish-inquiry-box > div:nth-child(4) > ul > li > img {
    width: 120px;
    height: 120px;
    border: 1px solid #d8d8d8;
    box-sizing: border-box;
  }
  .publish-inquiry-box > div:nth-child(4) > ul > li > p {
    font-size: 14px;
    color: #333;
    margin-top: 8px;
  }
  .publish-inquiry-box > p {
    width: 108px;
    height: 36px;
    border-radius: 4px;
    background-color: #f96006;
    margin: 0 auto;
    line-height: 36px;
    text-align: center;
    color: #fff;
    cursor: pointer;
  }
  .borer_color {
    border: 1px solid #f96006 !important;
  }
  .post {
    text-align: center;
    height: 330px;
    line-height: 330px;
    color: #f96006;
    font-size: 24px;
  }
  .publish-title >span:nth-child(1) {
    margin-right: 30px;
    color: #4a90e2;
    cursor: pointer;
    position: relative;
    font-size: 16px;
    float: right;
    margin-top: 52px;
  }
  .publish-title >span:nth-child(1)>.file-input{
    top:-14px;
    left: 0;
    width: 100px;
    height: 30px;
    border-radius: 4px;
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }
  .publish-title >span:nth-child(2) {
    color: #4a90e2;
    cursor: pointer;
    font-size: 16px;
    float: right;
    margin-top: 52px;
    margin-right: 20px;
  }
  a{
    color: #6d97ff;
    text-decoration: none;
  }
</style>
