<template>
  <div class="Instructions-container">
    <Top></Top>
    <div class="Instructions-box">
      <!-- 头部 -->
      <div class="Instructions-box-header">
        <span @click="back">返回上一步:</span>
        <span class="el-icon-arrow-left">  </span>
        <span>智能国际注册，更具大量申请数据及专业分析智能提供最优方案</span>
      </div>
      <!-- 主体 -->
      <div class="Instructions-box-main">
        <div class="Instructions-box-main-left">
          <div class="avenue-left">
            <div class="avenue-left-one">逐一途径服务</div>
            <div class="avenue-left-two">
              <div class="avenue-left-two-detail">
                <el-checkbox >中国</el-checkbox>
              </div>
              <div class="avenue-left-two-detail">
                <el-checkbox disabled>中国</el-checkbox>
              </div>
            </div>
            <div class="avenue-left-three">
              <el-checkbox >共<span>几</span>项</el-checkbox>
            </div>
          </div>
          <div class="el-icon-back left_arrow"></div>
          <div class="el-icon-right right_arrow"></div>
          <div class="avenue-right">
            <div class="avenue-left-one">马德里服务</div>
            <div class="avenue-left-two">
              <div class="avenue-left-two-detail">
                <el-checkbox >中国</el-checkbox>
              </div>
              <div class="avenue-left-two-detail">
                <el-checkbox disabled>中国</el-checkbox>
              </div>
            </div>
            <div class="avenue-left-three">
              <el-checkbox >共<span>几</span>项</el-checkbox>
            </div>
          </div>
          <div style="clear:both"></div>
          <div class="avenue-bottom">
            <p>i</p>
            可点击的为马德里成员国，可相互改变服务途径，无法点击的是非马德里成员国。</div>
        </div>
        <div class="Instructions-box-main-right">
          <div class="Instructions-div1">当前配置</div>
          <div class="Instructions-div2"></div>
          <div class="Instructions-div3">
            <span>国家数量:</span>
            <span>5</span>
          </div>
          <div class="Instructions-div4">
            <span>逐一途径:</span>
            <span title="非洲地区工业产权组织">非洲地区工业产权组织</span>
          </div>
          <div class="Instructions-div5">
            <span>马德里途径:</span>
            <span title="古巴 格鲁吉亚" class="ml-13">古巴 格鲁吉亚</span>
          </div>
          <div class="Instructions-div6">
            <span>马德里商标颜色:</span>
            <select class="ml-40">
              <option value="0">黑白</option>
            </select>
          </div>
          <div class="Instructions-div7">
            <span>马德里定价日期:</span>
            <span title="2020.04.30" class="ml-40">2020.04.30</span>
          </div>
          <div class="Instructions-div8">费用总计:</div>
          <div class="Instructions-div9">¥45,678</div>
          <div class="Instructions-div10">
            <span>全部逐一方案费用:</span>
            <span title="¥1,234" class="ml-40">¥1,234</span>
          </div>
          <div class="Instructions-div11">
            <span>逐一+全部马德里方案方案费用:</span>
            <span title="¥1,234" class="ml-40">¥1,234</span>
          </div>
          <div class="Instructions-div12">下&nbsp;一&nbsp;步</div>
        </div>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
  import Top from '../ui/top.vue';
  import Foot from '../ui/foot.vue';
  export default {
    name:'Instructions',
    components: {
      Top,
      Foot
    },
    data(){
      return {
        num:1,
        country:'',
        color_show:'全部'
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
      back(){
        this.$router.push('/worldBrand')
      }
    }
  }
</script>

<style scoped>
  .Instructions-box {
    background-color: #f8f8f8;
    padding-top: 20px;
    font-family: 'PingFangSC';
  }
  /* 头部 */
  .Instructions-box-header {
    width: 1200px;
    height: 64px;
    margin: 0 auto;
    background-color: #fff;
    line-height: 64px;
    padding-left: 64px;
    box-sizing: border-box;
  }
  .Instructions-box-header > span {
    float: left;
    font-size: 14px;
    font-weight: normal;
    color: #333;
  }
  .Instructions-box-header > input {
    float: left;
    width: 34px;
    height: 22px;
    outline: none;
    border: none;
    text-align: center;
    padding: 0 2px;
    vertical-align: middle;
    margin-top: 21px;
  }
  .Instructions-box-header > span:nth-child(1) {
    margin-right: 12px;
    width: 100px;
    height: 24px;
    border-radius: 4px;
    background-color: #f96006;
    line-height: 24px;
    text-align: center;
    color: #fff;
    margin-top: 18px;
    cursor: pointer;
  }
  .Instructions-box-header > span:nth-child(2) {
    color: #f96006;
    font-size: 16px;
    margin-top: 24px;
  }
  .Instructions-box-header > span:nth-child(3) {
    margin-left: 12px;
  }
  .Instructions-box-main {
    width: 1200px;
    margin: 0 auto;
    min-height: 588px;
    margin-top: 20px;
    box-sizing: border-box;
    position: relative;
  }
  .Instructions-box-main-left {
    width: 836px;
    height: 588px;
    float: left;
    background-color: #fff;
    padding: 32px 64px;
    box-sizing: border-box;
  }
  .avenue-left {
    float: left;
    width: 300px;
    height: 476px;
    border: solid 1px #d6d6d6;
    box-sizing: border-box;
  }
  .avenue-left-one {
    height: 48px;
    background-color: #fdefe8;
    text-align: center;
    line-height: 48px;
    font-size: 14px;
    font-weight: normal;
  }
  .avenue-left-two {
    height: 379px;
    overflow: auto;
  }
  .avenue-left-two-detail {
    width: 298px;
    height: 40px;
    line-height: 40px;
    /* background-color: #fafafa; */
    margin-top: 8px;
    padding-left: 20px;
    box-sizing: border-box;
  }
  .avenue-left-three {
    height: 48px;
    border-top: solid 1px #d6d6d6;
    line-height: 48px;
    padding-left: 20px;
    box-sizing: border-box;
  }
  .avenue-right {
    float: right;
    width: 300px;
    height: 476px;
    border: solid 1px #d6d6d6;
    box-sizing: border-box;
  }
  .avenue-bottom {
    margin-top: 16px;
  }
  .avenue-bottom > p {
    float: left;
    font-family: 'PingFangSC';
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: #f96006;
    text-align: center;
    line-height: 14px;
    color: #fff;
    margin-top: 4px;
    font-size: 12px;
    margin-right: 6px;
  }
  .left_arrow {
     width: 32px;
    height: 32px;
    line-height: 32px;
    border-radius: 50%;
    background-color: #f96006;
    color: #fff;
    font-size: 18px;
    text-align: center;
    margin-left: 12px;
    cursor: pointer;
    margin-top: 224px;
  }
  .right_arrow {
     width: 32px;
    height: 32px;
    line-height: 32px;
    border-radius: 50%;
    background-color: #f96006;
    color: #fff;
    font-size: 18px;
    text-align: center;
    margin-left: 16px;
    cursor: pointer;
  }
  .Instructions-box-main-right {
    width: 348px;
    height: 588px;
    float: right;
    background-color: #fff;
    padding: 10px 20px;
    box-sizing: border-box;
  }
  .Instructions-box-main-right > div {
    margin-top: 20px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .Instructions-box-main-right > div > span:nth-child(1){
    font-size: 14px;
    font-weight: 300;
    color: #333;
    margin-right: 50px;
  }
  .Instructions-box-main-right > div > span:nth-child(2){
    font-size: 14px;
    font-weight: normal;
    color: #333;
  }
  .Instructions-div1 {
    margin-bottom: 6px;
    color: #333;
    font-weight: 550;
  }
  .Instructions-div2 {
    border-bottom: 1px solid #d8d8d8;
  }
  .Instructions-div6 > select {
    width: 92px;
    height: 24px;
    line-height: 24px;
    border-radius: 4px;
    border: solid 1px #d6d6d6;
    background-color: #fff;
    padding: 0px 10px;
    box-sizing: border-box;
    color: #999999;
    font-size: 14px;
    font-weight: normal;
  }
  .Instructions-div8 {
    font-size: 14px;
    font-weight: 300;
    color: #333;
  }
  .Instructions-div9 {
    font-size: 24px;
    font-weight: normal;
    color: #f96006;
  }
  .Instructions-div10 > span {
    font-size: 12px !important;
    font-weight: 300 !important;
    color: #999999 !important;
  }
  .Instructions-div10 > span:nth-child(2) {
    font-size: 12px !important;
    font-weight: 300 !important;
    color: #f96006 !important;
  }
  .Instructions-div11 > span {
    font-size: 12px !important;
    font-weight: 300 !important;
    color: #999999 !important;
  }
  .Instructions-div11 > span:nth-child(2) {
    font-size: 12px !important;
    font-weight: 300 !important;
    color: #f96006 !important;
  }
  .Instructions-div12 {
    width: 300px;
    height: 48px;
    background-color: #f96006;
    line-height: 48px;
    text-align: center;
    color: #fff;
    margin-top: 36px !important;
    cursor: pointer;
    font-size: 20px;
    font-weight: 500;
  }
  .ml-13 {
    margin-left: -13px;
  }
  .ml-40 {
    margin-left: -40px;
  }
  .el-checkbox {
    color: #333;
    font-weight: 600;
  }
</style>
<style >
  .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #f96006;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #f96006;
    border-color: #f96006;
  }
</style>
