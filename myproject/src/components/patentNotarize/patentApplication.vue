<template>
  <div class="patentApplication">
    <Top></Top>
    <Fix></Fix>
    <div class="patentApplication-box">
      <!-- top -->
      <div class="patentApplication-box-top" v-if="status == '第一次审查意见陈述已撰写'&&this.$route.query.click_type == '发明专利申请'">
        发明专利申请--第一次审查意见陈述
      </div>
      <div class="patentApplication-box-top" v-if="status == '第二次审查意见陈述已撰写'&&this.$route.query.click_type == '发明专利申请'">
        发明专利申请--第二次审查意见陈述
      </div>
      <div class="patentApplication-box-top" v-if="status == '第三次审查意见陈述已撰写'&&this.$route.query.click_type == '发明专利申请'">
        发明专利申请--{{name}}审查意见陈述
      </div>
      <div class="patentApplication-box-top" v-if="status == '第一次审查意见陈述已撰写'&&this.$route.query.click_type == '发明专利加速申请'">
        发明专利加速申请--第一次审查意见陈述
      </div>
      <div class="patentApplication-box-top" v-if="status == '第二次审查意见陈述已撰写'&&this.$route.query.click_type == '发明专利加速申请'">
        发明专利加速申请--第二次审查意见陈述
      </div>
      <div class="patentApplication-box-top" v-if="status == '第三次审查意见陈述已撰写'&&this.$route.query.click_type == '发明专利加速申请'">
        发明专利加速申请--{{name}}审查意见陈述
      </div>
      <!-- 通知书 -->
      <!-- 第一次 -->
      <div class="patentApplication-box-one" v-if="status == '第一次审查意见陈述已撰写'">
        <div class="one-left">
          <img src="/static/images/datawrite.png" alt="">
        </div>
        <div class="one-right">
          <p>第一次审查意见通知书</p>
          <span><a :href="GLOBAL.base_url+this.see1" target="_blank" >预览</a></span>
          <span><a :href="GLOBAL.base_url+'/api/patent/downloadFile' + this.see1">下载</a></span>
        </div>
      </div>
      <!-- 第二次 -->
      <div class="patentApplication-box-one" v-if="status == '第二次审查意见陈述已撰写'">
        <div class="one-left">
          <img src="/static/images/datawrite.png" alt="">
        </div>
        <div class="one-right">
          <p>第二次审查意见通知书</p>
          <span><a :href="GLOBAL.base_url+this.see3" target="_blank" >预览</a></span>
          <span><a :href="GLOBAL.base_url+'/api/patent/downloadFile' + this.see3">下载</a></span>
        </div>
      </div>
      <!-- 第三次 -->
      <div class="patentApplication-box-one" v-if="status == '第三次审查意见陈述已撰写'">
        <div class="one-left">
          <img src="/static/images/datawrite.png" alt="">
        </div>
        <div class="one-right">
          <p>第三次审查意见通知书</p>
          <span><a :href="GLOBAL.base_url+this.see5" target="_blank" >预览</a></span>
          <span><a :href="GLOBAL.base_url+'/api/patent/downloadFile' + this.see5">下载</a></span>
        </div>
      </div>
      <!-- 陈述 -->
      <div class="patentApplication-box-one">
        <div class="one-left">
          <img src="/static/images/datawrite.png" alt="">
        </div>
        <div class="one-right" v-if="status == '第一次审查意见陈述已撰写'">
          <p>{{name}}审查意见陈述</p>
          <span><a :href="GLOBAL.base_url+this.load1" target="_blank" rel="noopener noreferrer">预览</a></span>
          <span><a :href="GLOBAL.base_url+'/api/patent/downloadFile' + this.load1">下载</a></span>
        </div>
        <div class="one-right" v-if="status == '第二次审查意见陈述已撰写'">
          <p>{{name}}审查意见陈述</p>
          <span><a :href="GLOBAL.base_url+this.load3" target="_blank" rel="noopener noreferrer">预览</a></span>
          <span><a :href="GLOBAL.base_url+'/api/patent/downloadFile' + this.load3">下载</a></span>
        </div>
        <div class="one-right" v-if="status == '第三次审查意见陈述已撰写'">
          <p>{{this.name}}审查意见陈述</p>
          <span><a :href="GLOBAL.base_url+this.load5" target="_blank" rel="noopener noreferrer">预览</a></span>
          <span><a :href="GLOBAL.base_url+'/api/patent/downloadFile' + this.load5">下载</a></span>
        </div>
      </div>
      <!--  选择  -->
      <div class="patentApplication-box-select">
        <p>是否同意</p>
        <input type="radio" value="1" v-model="find" name="invoice">
        <span v-bind:class="{ bgcol : switch2 }" >是</span>
        <input type="radio" value="2" v-model="find" name="invoice">
        <span v-bind:class="{ bgcol : switch1 }" >否</span>
      </div>
      <!-- 意见 -->
      <div class="patentApplication-box-idea" v-show="switch2">
        <p>修改意见：</p>
        <textarea name="" id=""  v-model="text" placeholder="非必填"></textarea>
        <p>* 修改意见可以直接联系平台让工程师修改</p>
      </div>
      <!-- 提交&&取消 -->
      <div class="patentApplication-box-submit">
        <span @click="submit">提交</span>
        <span @click="back()">取消</span>
      </div>
      <div style="clear :both;"></div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
  import Top from '../ui/top.vue';
  import Foot from '../ui/foot.vue';
  import Fix from '../ui/fix.vue';
  export default {
    name:'patentApplication',
    components:{
      Top,
      Foot,
      Fix
    },
    data() {
      return {
        // 判断是第几次
        status:'',
        // 是否
        find:'1',
        switch1:true,
        switch2:false,
        text:'',
        // 预览&&下载
        see1:'',
        load1:'',
        see3:'',
        see5:'',
        load3:'',
        load5:'',
        // 名字
        name:''
      }
    },
    watch: {
      'find'(newValue) {
        if (newValue == '1') {
          this.switch2 = false
          this.switch1 = true
        }
        if (newValue == '2') {
          this.switch1 = false
          this.switch2 = true
        }
      }
    },
    methods:{
      // 获取数据
      getData() {
        this.$http.post(this.GLOBAL.base_url+'/api/patent/getOpinion',{
          user_id:this.$cookie.getCookie('u_id'),
          id:this.$route.query.id
        }).then( res => {
          // console.log(res)
          this.see1 = res.data.data.first_notice
          this.see3 = res.data.data.second_notice
          this.see5 = res.data.data.third_notice
          this.load1 = res.data.data.first_write
          this.load3 = res.data.data.second_write
          this.load5 = res.data.data.third_write
          this.name = res.data.data.name
        })
      },
      // 提交
      submit() {
        if(this.find == '1') {
          this.$http.post(this.GLOBAL.base_url+'/api/patent/setOpinion',{
            user_id:this.$cookie.getCookie('u_id'),
            id:this.$route.query.id,
            is_agree:1
          }).then( res => {
            this.$router.push('/personal/orderPatent?status=all')
          })
        }
        if(this.find == '2') {
          this.$http.post(this.GLOBAL.base_url+'/api/patent/setOpinion',{
            user_id:this.$cookie.getCookie('u_id'),
            id:this.$route.query.id,
            is_agree:2,
            remark:this.text
          }).then(res => {
           this.$router.push('/personal/orderPatent?status=all')
          })
        }
      },
      // 取消
      back(){
        this.$router.back()
      },
    },
    mounted(){
      this.getData()
      this.status = this.$route.query.status;
    }
  }
</script>

<style scoped>
  .patentApplication-box {
    width: 1302px;

    background-color: #fff;
    margin: 0 auto;
    /* border: 1px solid red; */
    padding-top:34px;
    box-sizing: border-box;
    padding-bottom: 80px;
    box-sizing: border-box;
  }
  /* top */
  .patentApplication-box-top {
    height: 110px;
    line-height: 110px;
    font-family: "PingFangSC";
    font-size: 36px;
    font-weight: 600;
    /* border-bottom: 1px solid #d8d8d8; */
  }
  /* 通知书 */
  .patentApplication-box-one {
    height: 230px;
    border-top: 1px solid #d8d8d8;
    /* line-height: 230px; */
  }
  .one-left {
    float: left;
    width: 85px;
    height: 94px;
    /* border: 1px solid #d8d8d8; */
    margin: 58px 26px 0 17px;
  }
  .one-left > img {
    width: 85px;
    height: 94px;
    cursor: pointer;
  }
  .one-right {
    float: left;
    font-family: "PingFangSC";
    margin-top: 64px;
  }
  .one-right > p {
    font-size: 32px;
    color: #333333;
    margin-bottom: 16px;
  }
  .one-right >span > a  {
    font-size: 24px;
    color: #f96006;
    margin-right: 119px;
    cursor: pointer;
    text-decoration: none;
  }
  /* 选择 */
  .patentApplication-box-select {
    margin: 0px 0 0px 17px;
  }
  .patentApplication-box-select > p {
    font-family: "PingFangSC";
    font-size: 20px;
    margin-bottom: 16px;
    color: #333333;
  }
  .patentApplication-box-select > input {
    width: 18px;
    height: 18px;
    vertical-align: middle;
    margin-right: 12px;
    cursor: pointer;
  }
  .patentApplication-box-select > span {
    font-family: "PingFangSC";
    font-size: 20px;
    vertical-align: middle;
    margin-right: 65px;

  }
  /* 意见 */
  .patentApplication-box-idea {
    border-top: 1px solid #d8d8d8;
    margin-top: 72px;
    padding-top: 36px;

  }
  .patentApplication-box-idea > p {
    box-sizing: border-box;
    font-family: "PingFangSC";
    font-size: 18px;
    color: #333333;
    margin-bottom: 16px;
  }
  .patentApplication-box-idea > textarea {
    width: 1128px;
    height: 128px;
    margin-left: 36px;
    padding: 4px 0 0 10px;
    box-sizing: border-box;
    font-family: "PingFangSC";
    font-size: 16px;
    /* color: #ccc; */
  }
  .patentApplication-box-idea > p:nth-child(3) {
    margin: 23px 0 0 36px;
    color: #f96006;

  }
  /* 提交&&取消 */
  .patentApplication-box-submit {
    float: right;
    margin:240px 104px 0 0 ;
  }
  .patentApplication-box-submit > span {
    width: 214px;
    height: 40px;
    display: inline-block;
    line-height: 40px;
    text-align: center;
    font-family: "PingFangSC";
    font-size: 18px;
    cursor: pointer;
  }
  .patentApplication-box-submit > span:nth-child(1) {
    border-image-source: linear-gradient(0deg,#ba6100,#dc773b);
    border-image-slice: 1;
    background-image: linear-gradient(180deg,#f79000,#f96006),linear-gradient(0deg,#ba6100,#dc773b);
    background-origin: border-box;
    background-clip: content-box,border-box;
    border-radius: 4px;
    color: #fff;
    margin-right: 87px;
  }
  .patentApplication-box-submit > span:nth-child(2) {
    border-image-source: linear-gradient(to top, #d6d6d6 94%, #d6d6d6 7%);
    border-image-slice: 1;
    background-image: linear-gradient(to bottom,white, #e3e3e3 98%), linear-gradient(to top, #d6d6d6 94%, #d6d6d6 7%);
    background-origin: border-box;
    border-radius: 4px;
    color: #f87604;
  }
  .bgcol{
    color: #a6a6a6;
  }
</style>
