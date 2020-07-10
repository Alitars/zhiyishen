<template>
  <div class="worldBrand-container">
    <Top></Top>
    <div class="worldBrand-box">
      <!-- 头部 -->
      <div class="worldBrand-box-header">
        <span>服务类型:</span>
        <span>商标注册</span>
        <span>服务类型</span>
        <span class="span4_6" @click="reduce">-</span>
        <input type="text" v-model="num" disabled>
        <span class="span4_6" @click="add">+</span>
      </div>
      <!-- 主体 -->
      <div class="worldBrand-box-main">
        <!--搜索 -->
        <div class="worldBrand-box-main-search">
          <span>快速选择</span>
          <input type="text" v-model="country" placeholder="请输入国家/地区的名称（汉字/拼音/拼音首字母）">
        </div>
        <!-- 五大洲 -->
        <div class="worldBrand-fiveContinents">
          <span @click="changeColor('全部')" :class="{changeColor:color_show == '全部'}">全部</span>
          <span @click="changeColor('欧洲')" :class="{changeColor:color_show == '欧洲'}">欧洲</span>
          <span @click="changeColor('亚洲')" :class="{changeColor:color_show == '亚洲'}">亚洲</span>
          <span @click="changeColor('美洲')" :class="{changeColor:color_show == '美洲'}">美洲</span>
          <span @click="changeColor('非洲')" :class="{changeColor:color_show == '非洲'}">非洲</span>
          <span @click="changeColor('大洋洲')" :class="{changeColor:color_show == '大洋洲'}">大洋洲</span>
          <span>全选</span>
          <span>清除</span>
        </div>
        <!-- 国家 -->
        <div class="worldBrand-country">
          <!-- 分别 -->
          <div class="worldBrand-country-detail">
            <div class="worldBrand-country-class">A</div>
            <div class="worldBrand-country-add">
              <ul>
                <li>
                  <el-checkbox @change="select(1)">中国</el-checkbox>
                </li>
                <li>
                  <el-checkbox @change="select(2)">阿尔巴尼亚</el-checkbox>
                </li>
                <li>
                  <el-checkbox @change="select(2)">阿尔巴尼亚</el-checkbox>
                </li>
                <li>
                  <el-checkbox @change="select(2)">阿尔巴尼亚</el-checkbox>
                </li>
                <li>
                  <el-checkbox @change="select(2)">阿尔巴尼亚</el-checkbox>
                </li>
              </ul>
            </div>
            <div style="clear:both"></div>
          </div>
        </div>
        <!-- 右边报价 -->
        <div class="worldBrand-box-right">
          <div class="worldBrand-box-right-tc">
            <div class="worldBrand-box-right-top">
              <p>已选择<span>（0）</span></p>
              <p>清空</p>
            </div>
            <div class="worldBrand-box-right-center">
              <div class="worldBrand-box-right-center-detail">
                <span>阿尔巴尼亚</span>
                <span>×</span>
              </div>
            </div>
          </div>
          <div class="worldBrand-box-right-bottom" @click="Instructions(0)">立&nbsp;&nbsp;即&nbsp;&nbsp;报&nbsp;&nbsp;价</div>
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
    name:'worldBrand',
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
      select(val){
        console.log(val)
      },
      add(){
        this.num++
      },
      changeColor(val){
        this.color_show = val
      },
      reduce(){
        if(this.num == 1 ) {
          this.tip('error','最小为1')
          return false
        }else {
          this.num--
        }
      },
      // 跳转详情
      Instructions(val){
        this.$router.push({
              path:'/Instructions',
              query:{
              id:val
            }
          })
      }
    }
  }
</script>

<style scoped>
  .worldBrand-box {
    background-color: #f8f8f8;
    padding-top: 20px;
    font-family: 'PingFangSC';
  }
  /* 头部 */
  .worldBrand-box-header {
    width: 1200px;
    height: 64px;
    margin: 0 auto;
    background-color: #fff;
    line-height: 64px;
    padding-left: 64px;
    box-sizing: border-box;
  }
  .worldBrand-box-header > span {
    float: left;
    font-size: 14px;
    font-weight: normal;
    color: #333;
  }
  .worldBrand-box-header > input {
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
  .worldBrand-box-header > span:nth-child(1) {
    margin-right: 20px;
  }
  .worldBrand-box-header > span:nth-child(2) {
    margin-right: 116px;
    color: #f96006;
  }
  .worldBrand-box-header > span:nth-child(3) {
    margin-right: 20px;
  }
  .worldBrand-box-header > .span4_6 {
    width: 26px;
    height: 26px;
    border-radius: 2px;
    background-color: #f1f1f1;
    margin-top: 20px;
    text-align: center;
    line-height: 26px;
    font-size: 16px;
    cursor: pointer;
  }
  .worldBrand-box-main {
    width: 1200px;
    margin: 0 auto;
    min-height: 588px;
    background-color: #fff;
    margin-top: 20px;
    box-sizing: border-box;
    position: relative;
  }
  /* 左边 */
  .worldBrand-box-main-search {
    position: absolute;
    top: 32px;
    left: 63px;
  }
  .worldBrand-box-main-search > span {
    float: left;
    width: 84px;
    height: 32px;
    border-radius: 4px;
    background-color: #e0dad6;
    color: #fff;
    line-height: 32px;
    text-align: center;
    margin-right: 8px;
  }
  .worldBrand-box-main-search > input {
    float: left;
    width: 705px;
    height: 32px;
    border-radius: 4px;
    border: solid 1px #d6d6d6;
    background-color: #fff;
    padding: 6px 12px;
    box-sizing: border-box;
  }
  input::-moz-placeholder {
    font-size: 14px;
    color: #999;
    font-weight: normal;
  }
  input[disabled] {
    background-color: #fff;
  }
  /* 五大洲 */
  .worldBrand-fiveContinents {
    position: absolute;
    top: 86px;
    left: 63px;
    width: 796px;
    height: 28px;
    line-height: 28px;
    border-bottom: 1px solid #d8d8d8;
    box-sizing: border-box;
  }
  .worldBrand-fiveContinents > span {
    float: left;
    font-size: 14px;
    font-weight: 500;
    color: #333;
    width: 80px;
    text-align: center;
    cursor: pointer;
    margin-right: 20px;
  }
  .worldBrand-fiveContinents > span:nth-child(7) {
     width: 64px;
    height: 24px;
    border-radius: 4px;
    text-align: center;
    background-color: #f96006;
    line-height: 24px;
    color: #fff;
    margin-left: 48px;
  }
  .worldBrand-fiveContinents > span:nth-child(8) {
    width: 64px;
    height: 24px;
    border-radius: 4px;
    text-align: center;
    background-color: #fbefe9;
    border: solid 1px #f96006;
    line-height: 24px;
    color: #f96006;
    box-sizing: border-box;
    margin-right: 0px;
  }
  /* 国家 */
  .worldBrand-country {
    position: absolute;
    top: 115px;
    left: 63px;
    width: 796px;
    height: 415px;
    overflow: auto;
  }
  .worldBrand-country-detail {
    width: 796px;
    border-bottom: 1px dashed #d8d8d8;
    box-sizing: border-box;
  }
  .worldBrand-country-class {
    width: 32px;
    height: 32px;
    border-radius: 1px;
    background-color: #e0dad6;
    color: #fff;
    line-height: 32px;
    text-align: center;
    margin-top: 32px;
    float: left;
  }
  .worldBrand-country-add {
    float: left;
    width: 732px;
    padding-bottom: 32px;
    box-sizing: border-box;
    margin-left: 32px;
  }
  .worldBrand-country-add > ul> li {
    float: left;
    margin: 32px 0px 0px 0;
    width: 168px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .worldBrand-country-add > ul> li > span {
    font-size: 14px;
    margin-left: 16px;
  }
  /* 右边 */
  .worldBrand-box-right {
    height: 532px;
    width: 300px;
    position: absolute;
    top: 32px;
    right: 20px;
    z-index: 10;
  }
  .worldBrand-box-right-tc {
    border: 1px solid #d8d8d8;
    margin-bottom: 10px;
    width: 302px;
    box-sizing: border-box;
  }
  .worldBrand-box-right-top {
    width: 300px;
    height: 48px;
    background-color: #fdefe8;
    line-height: 48px;
    padding: 0 24px;
    box-sizing: border-box;
  }
  .worldBrand-box-right-top > p:nth-child(1){
    float: left;
    font-size: 14px;
  }
  .worldBrand-box-right-top > p:nth-child(2){
    float: right;
    font-size: 14px;
    font-weight: 500;
    color: #4a90e2;
    cursor: pointer;
  }
  .worldBrand-box-right-center {
    width: 300px;
    height: 427px;
    background-color: #fff;
    overflow: auto;
    box-sizing: border-box;
  }
  .worldBrand-box-right-center-detail {
    width: 300px;
    height: 40px;
    line-height: 40px;
    background-color: #fafafa;
    margin-top: 8px;
    box-sizing: border-box;
  }
  .worldBrand-box-right-center-detail > span:nth-child(1) {
    margin-left: 24px;
    width: 236px;
    float: left;
    font-size: 14px;
    font-weight: 550;
    color: #333;
  }
  .worldBrand-box-right-center-detail > span:nth-child(2) {
    cursor: pointer;
    font-size: 30px;
  }
  .worldBrand-box-right-bottom {
    width: 302px;
    height: 48px;
    background-color: #f96006;
    color: #fff;
    line-height: 48px;
    text-align: center;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    font-size: 20px;
    font-weight: 550;
    cursor: pointer;
  }
  .changeColor {
    color: #f96006;
    border-bottom: 1px solid #f96006;
    box-sizing: border-box;
  }
  .gray {
    background-color: #fafafa;
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
