<template>
  <div class="designgood">
    <Top></Top>
     <div class="designgood-box">
        <span v-show="false" ref="span1">请选择您的产品或者服务名称：</span>
        <div class="designgood-box-top">
            <img src="/static/images/xiaoguo.png" alt="">
            <span ref="span2"></span>
        </div>
        <div class="designgood-box-wrap">
            <div v-show="boxshow">
                <input type="text" placeholder="例如：T恤，运动裤" v-model="good">
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
  name: 'designgood',
  data(){
    return{
        timer:null,
        k:0,
        boxshow:false,
        good:''
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
                }, 100)
            }
        },
        goback(){
            this.$router.push({
                path:'/designguild',
                query:{
                    type:this.$route.query.type
                }
            })
        },
        next(){
            if(this.good == ''){
                return false
            }else{
                this.$router.push({
                    path:'/designcreat',
                    query:{
                        type:this.$route.query.type,
                        guild:this.$route.query.guild,
                        good:this.good
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
    .designgood-box{
      background-color: #fcfcfc;
      padding-top: 157px;
    }
  .designgood-box-top{
      width: 758px;
      height: 194px;
      margin: 0 auto 94px;
  }
  .designgood-box-top>img{
      vertical-align: middle;
      margin-right: 80px;
  }
  .designgood-box-top>span{
      vertical-align: middle;
      font-size: 32px;
      color: #333333;
  }
  .designgood-box-wrap{
      width: 947px;
      height: 630px;
      margin: 0 auto;
  }
  .designgood-box-wrap>div>input{
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
  .designgood-box-wrap>div>div{
      width: 480px;
      height: 54px;
      font-size: 18px;
      margin: 0 auto;
  }
  .designgood-box-wrap>div>div>div{
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
  .designgood-box-wrap>div>div>div:nth-of-type(2){
      background-color:#f96006;
      color: #ffffff;
      margin-left: 52px;
  }
</style>
