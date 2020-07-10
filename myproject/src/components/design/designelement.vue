<template>
  <div class="designelement">
    <Top></Top>
     <div class="design-box">
        <span v-show="false" ref="span1">您想要商标中含有哪些元素呢？</span>
        <div class="design-box-top">
            <img src="/static/images/xiaoguo.png" alt="">
            <span ref="span2"></span>
        </div>
        <div class="design-box-wrap">
            <div v-show="boxshow">
                <div class="design-bigbox">
                    <div class="square-box">
                        <img src="/static/images/square.png" alt="">
                        <div>
                            <div class="nochose" v-show="show1" @click="chose1"></div>
                            <div class="chose" v-show="!show1" @click="chose2">
                                <div></div>
                            </div>
                            <div>方形</div>
                        </div>
                    </div>
                    <div class="square-box">
                        <img src="/static/images/round.png" alt="">
                        <div>
                            <div class="nochose" v-show="show2" @click="chose3"></div>
                            <div class="chose" v-show="!show2" @click="chose4">
                                <div></div>
                            </div>
                            <div>圆形</div>
                        </div>
                    </div>
                    <div class="square-box">
                        <img src="/static/images/triangle.png" alt="">
                        <div>
                            <div class="nochose" v-show="show3" @click="chose5"></div>
                            <div class="chose" v-show="!show3" @click="chose6">
                                <div></div>
                            </div>
                            <div>三角形</div>
                        </div>
                    </div>
                </div>
                <span class="design-box-no">(非必填)</span>
                <div class="design-box-do">
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
  name: 'designelement',
  data(){
    return{
        timer:null,
        k:0,
        boxshow:false,
        show1:true,
        show2:true,
        show3:true,
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
            this.$router.push('/designbrand')
        },
        next(){
            this.$router.push('/designguild')
        },
        chose1(){
            this.show1 = !this.show1;
        },
        chose2(){
            this.show1 = !this.show1;
        },
        chose3(){
            this.show2 = !this.show2;
        },
        chose4(){
            this.show2 = !this.show2;
        },
        chose5(){
            this.show3 = !this.show3;
        },
        chose6(){
            this.show3 = !this.show3;
        },

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
    .design-box{
      background-color: #fcfcfc;
      padding-top: 157px;
    }
  .design-box-top{
      width: 720px;
      height: 194px;
      margin: 0 auto 94px;
  }
  .design-box-top>img{
      vertical-align: middle;
      margin-right: 80px;
  }
  .design-box-top>span{
      vertical-align: middle;
      font-size: 32px;
      color: #333333;
  }
  .design-box-wrap{
      height: 643px;
  }
  .design-box-wrap>div{
      width: 840px;
      height: 555px;
      margin: 0 auto;
      text-align: center;
  }
  .design-bigbox{
      margin-bottom: 65px;
      height: 290px;
  }
  .design-bigbox>div{
      float: left;
      margin-right: 120px;
  }
  .design-bigbox>div:nth-of-type(3){
      margin-right: 0;
  }
  .square-box>img{
      width: 200px;
      height: 200px;
      margin-bottom: 64px;
  }
  .square-box>div{
      height: 18px;
      line-height: 18px;
  }
  .square-box>div>div{
      float: left;
  }
  .nochose{
      width: 18px;
      height: 18px;
      border-radius: 2px;
      border: solid 1px #c4c4c4;
      margin:0 12px 0 70px;
      cursor: pointer;
  }
  .chose{
      width: 12px;
      height: 12px;
      border-radius: 2px;
      padding: 3px;
      border: solid 1px #f96006;
      margin:0 12px 0 70px;
      cursor: pointer;
  }
  .chose>div{
       width: 12px;
       height: 12px;
       background-color: #f96006;
  }
  .square-box>div>div:last-child{
      font-size: 14px;
      color: #333333;
  }
  .design-box-no{
      font-size: 18px;
      color: #f96006;
  }
  .design-box-do{
      width: 480px;
      margin-top: 122px;
      margin-left: 180px;
      height: 54px;
  }
  .design-box-do>div{
      float: left;
      width: 214px;
      height: 54px;
      border-radius: 4px;
      text-align: center;
      line-height: 54px;
      font-size: 18px;
      cursor: pointer;
  }
  .design-box-do>div:nth-of-type(1){
      background: #efefef;
      color: #f87e03;
      margin-right: 52px;
  }
  .design-box-do>div:nth-of-type(2){
      background: #f96006;
      color: #ffffff;
  }
</style>
