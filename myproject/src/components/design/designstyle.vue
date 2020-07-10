<template>
  <div class="designstyle">
    <Top></Top>
     <div class="style-box">
         <div v-show="false" ref="div1">HI! 我是小果，为了帮您设计出满意的商标图案
下面请先回答我几个问题吧
请选择3个你喜欢的风格图案</div>
      <div class="style-box-top">
         <img src="/static/images/xiaoguo.png" alt="">
         <div ref="div2"></div>
       </div>
       <div class="style-box-middle">
           <div v-show="boxshow">
             <div>
                <div class="style-box-listbox" v-for="(v,k) in style" @click="chose(k)">
                  <img :src="v.url" alt="">
                  <div class="style-chose" v-show="test(k)">
                    <div></div>
                  </div>
                </div>
             </div>
             <div id="style-box-next" @click="next">下一步</div>
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
  name: 'designstyle',
  data(){
    return{
      timer:null,
      index:0,
      boxshow:false,
      arr:[],
      style:[{
        id:1,
        url:'/static/images/style.png'
      },{
        id:2,
        url:'/static/images/style2.png'
      },{
        id:3,
        url:'/static/images/style3.png'
      },{
        id:4,
        url:'/static/images/style4.png'
      },{
        id:5,
        url:'/static/images/style5.png'
      },{
        id:6,
        url:'/static/images/style6.png'
      },{
        id:7,
        url:'/static/images/style7.png'
      },{
        id:8,
        url:'/static/images/style8.png'
      }]
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
                    this.$refs.div2.innerText = this.$refs.div1.innerText.substring(0,this.index++);
                    if(this.$refs.div2.innerText == this.$refs.div1.innerText){
                      this.boxshow = true;
                      clearInterval(this.timer)
                    }
                }, 50)
            }
        },
        chose(k){
            if (this.arr.includes(k)) {
              for(var i =0; i<this.arr.length;i++){
                if(k == this.arr[i]){
                   this.$delete(this.arr,i);
                }
              }
            }else{
              this.arr.push(k);
            }
        },
        test(k){
          if (this.arr.includes(k)) {
            return true;
          } else {
              return false;
          }
        },
        next(){
          if(this.arr.length == 0){
            return false
          }else{
            this.$router.push('/designbrand')
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
  .style-box{
    background-color: #fcfcfc;
    padding-top: 157px;
    padding-bottom: 130px;
  }
  .style-box-top{
    width: 910px;
    height: 194px;
    margin: 0 auto 120px;
  }
  .style-box-top>img{
    float: left;
    width: 160px;
    height: 195px;
  }
  .style-box-top>div{
    float: left;
    width: 670px;
    height: 180px;
    margin:15px 0 0 80px;
    font-size: 32px;
    color: #333333;
    /* text-align: center; */
  }
  .style-box-middle{
    width: 1200px;
    height: 814px;
    margin: 0 auto;
  }
  .style-box-middle>div>div{
    height: 760px;
  }
  .style-box-middle>div>div>div{
    float: left;
    margin:0 40px 80px 0;
    cursor: pointer;
  }
  .style-box-middle>div>div>div:nth-child(4n){
    margin-right: 0;
  }
  .style-box-listbox{
    width: 270px;
    height: 270px;
  }
  .style-box-listbox:nth-of-type(1){
    background-color: #f7ede8;
  }
  .style-box-listbox:nth-of-type(2){
    background-color: #e8f7e7;
  }
  .style-box-listbox:nth-of-type(3){
    background-color: #ebf4ff;
  }
  .style-box-listbox:nth-of-type(4){
    background-color: #fcf2ff;
  }
   .style-box-listbox:nth-of-type(5){
    background-color: #eeeeee;
  }
   .style-box-listbox:nth-of-type(6){
    background-color: #e8f7e7;
  }
   .style-box-listbox:nth-of-type(7){
    background-color: #fcf2ff;
  }
   .style-box-listbox:nth-of-type(8){
    background-color: #ebf4ff;
  }
  .style-box-listbox>img{
    width: 210px;
    height: 210px;
    margin: 30px 30px 0;
  }
  .style-chose{
    width: 16px;
    height: 16px;
    border:1px solid #f96006;
    padding: 4px;
    margin:-6px 6px 0px 240px;
    border-radius: 2px;
  }
  .style-chose>div{
    width: 16px;
    height: 16px;
    background-color: #f96006;
    border-radius: 2px;
  }
  #style-box-next{
    width: 214px;
    height: 54px;
    border-radius: 4px;
    background-color: #f96006;
    text-align: center;
    line-height: 54px;
    margin: 0 auto;
    color: #ffffff;
    font-size: 18px;
    cursor: pointer;
  }
</style>

