<template>
  <div class="pickgood">
    <Top></Top>
     <div class="good-box">
        <span v-show="false" ref="span1">请输入您的产品或者服务名称：</span>
        <div class="good-box-top">
            <img src="/static/images/xiaoguo.png" alt="">
            <span ref="span2"></span>
        </div>
        <div class="good-box-wrap">
            <div v-show="boxshow">
                <input type="text" placeholder="例如：T恤，运动裤" v-model="key">
                <div>
                    <div @click="goback">上一步</div>
                    <div @click="next">下一步</div>
                </div>
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
  name: 'pickgood',
  data(){
    return{
        timer:null,
        k:0,
        boxshow:false,
        key:''
    }
  },
  components: {
      Top,
      Foot
  },
  methods:{
      setTimer(){
            if(this.timer == null) {
                this.timer = setInterval( () => {
                    this.$refs.span2.innerText = this.$refs.span1.innerText.substring(0,this.k++);
                    if(this.$refs.span2.innerText == this.$refs.span1.innerText){
                      this.boxshow = true;
                      clearInterval(this.timer)
                    }
                }, 50)
            }
        },
        goback(){
            this.$router.push('/pickguild')
        },
        next(){
            if(this.key == ''){
                return false
            }else{
                this.$router.push({
                    path:'/pickname',
                    query:{
                        good:this.key,
                        guild:this.$route.query.guild
                    }
                })
            }
            
        }
  },
  created(){
        clearInterval(this.timer)
        this.timer = null
        this.setTimer()
    },
    destroyed(){
        clearInterval(this.timer)
        this.timer = null
    }
}

</script>

<style scoped>
    .good-box{
      background-color: #fcfcfc;
      padding-top: 157px;
    }
  .good-box-top{
      width: 720px;
      height: 194px;
      margin: 0 auto 94px;
  }
  .good-box-top>img{
      vertical-align: middle;
      margin-right: 80px;
  }
  .good-box-top>span{
      vertical-align: middle;
      font-size: 32px;
      color: #333333;
  }
  .good-box-wrap{
      width: 947px;
      height: 630px;
      margin: 0 auto;
  }
  .good-box-wrap>div>input{
      border: none;
      width: 891px;
      height: 32px;
      box-shadow: 0 0 30px -1px rgba(217, 217, 217, 0.5);
      outline: none;
      padding: 44px 0 44px 56px;
      font-size: 24px;
      color: #666666;
      margin-bottom: 350px;
  }
  .good-box-wrap>div>div{
      width: 480px;
      height: 54px;
      font-size: 18px;
      margin: 0 auto;
  }
  .good-box-wrap>div>div>div{
      float: left;
      width: 214px;
      height: 54px;
      border-radius: 4px;
      background-color: #efefef;
      text-align: center;
      line-height: 54px;
      color: #f87e03;
      cursor: pointer;
  }
  .good-box-wrap>div>div>div:nth-of-type(2){
      background-color:#f96006;
      color: #ffffff;
      margin-left: 52px;
  }
</style>
