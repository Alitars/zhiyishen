<template>
  <div class="twoAsk">
    <Top></Top>
    <div class="twoAsk-box">
      <div class="twoAsk-box-big">
        <div class="twoAsk-title">
          <img src="/static/images/xiaoguo.png" alt="">
          <span>您的产品或技术是属于什么领域的</span>
        </div>
        <div class="twoAsk-field"></div>
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
  import Top from '../ui/top.vue';
  import Foot from '../ui/foot.vue';
  export default {
    name:'twoAsk',
    components: {
      Top,
      Foot
    },
  }
</script>

<style scoped>
  .twoAsk-box {
    background-color:#fcfcfc;
  }
  .twoAsk-box-big {
    width: 1200px;
    margin: 0 auto;
    padding: 30px 0 80px 0;
    box-sizing: border-box;
  }
  .twoAsk-title {
    text-align: center;
    padding-top: 34px;
    box-sizing: border-box;
    margin-bottom: 48px;
  }
  .twoAsk-title >img {
    vertical-align: middle;
    margin-right: 80.5px;
  }
  .twoAsk-title >span {
    vertical-align: middle;
    font-family:" PingFangSC";
    font-size: 32px;
    color: #333;
  }
  .twoAsk-field {
    width: 947px;
    margin: 0 auto;
    background-color: #fff;
    box-shadow: 3px 5px 19px -1px hsla(0,0%,85%,.5);
    /* text-align: center; */
    box-sizing: border-box;
    height: 482px;
    padding-top: 48px;
    padding-left: 218px;
  }
</style>
