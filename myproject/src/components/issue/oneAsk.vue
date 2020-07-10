<template>
  <div class="oneAsk">
     <Top></Top>
     <div class="oneAsk-box">
       <div class="oneAsk-box-big">
          <div class="oneAsk-title">
            <img src="/static/images/xiaoguo.png" alt="">
            <span>请输入发明创造的名称</span>
          </div>
          <div class="oneAsk-patentName">
            <p>名称：</p>
            <input type="text" v-model="patentName">
            <p @click="nextStep">下一步</p>
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
    naem:'oneAsk',
    components: {
      Top,
      Foot
    },
    data() {
      return {
        patentName:''
      }
    },
    methods:{
      tip(type,msg) {
        return this.$message({
          type:type,
          message:msg,
          showClose:true,
          duration:2000
        })
      },
      nextStep() {
        if(this.patentName == '') {
          this.tip('error','请输入名称')
        }else{
          localStorage.setItem('patentName',this.patentName)
          this.$router.push('twoAsk')
        }
      }
    }
  }
</script>
<style scoped>
  .oneAsk-box {
    background-color:#fcfcfc;
  }
  .oneAsk-box-big {
    width: 1200px;
    margin: 0 auto;
    padding: 30px 0 80px 0;
    box-sizing: border-box;
  }
  .oneAsk-title {
    text-align: center;
    padding-top: 34px;
    box-sizing: border-box;
    margin-bottom: 48px;
  }
  .oneAsk-title >img {
    vertical-align: middle;
    margin-right: 80.5px;
  }
  .oneAsk-title >span {
    vertical-align: middle;
    font-family:" PingFangSC";
    font-size: 32px;
  }
  .oneAsk-patentName {
    width: 947px;
    margin: 0 auto;
    background-color: #fff;
    box-shadow: 3px 5px 19px -1px hsla(0,0%,85%,.5);
    /* text-align: center; */
    box-sizing: border-box;
    height: 373px;
    padding-top: 48px;
    padding-left: 218px;
  }
  .oneAsk-patentName > p {
    font-family: "PingFangSC";
    font-size: 18px;
    font-weight: normal;
    margin-bottom: 16px;
    color: #333;
  }
  .oneAsk-patentName > input {
    width: 512px;
    height: 40px;
    border-radius: 4px;
    outline: none;
    border: none;
    border: 1px solid #d6d6d6;
    padding: 24px 0 24px 36px;
    box-sizing: border-box;
    font-family: PingFangSC;
    font-size: 24px;
    font-weight: 400;
    color: #333;
  }
  .oneAsk-patentName > p:last-child {
    margin:64px 0 0 160px;
    width: 214px;
    height: 54px;
    line-height: 54px;
    text-align: center;
    border-radius: 4px;
    background-color: #f96006;
    color: #fff;
    cursor: pointer;
  }
</style>
