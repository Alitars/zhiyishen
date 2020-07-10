<template>
  <div class="load">
    <Top></Top>
    <Fix></Fix>
     <div class="laod-box">
         <img src="/static/images/appload.png" alt="">
         <div class="load-des">
             <p>专业的知识产权服务平台</p>
             <div class="load-type">
                 <div>
                    <img src="/static/images/r.png" alt="">
                    <p>商标服务</p>
                </div>
                <div>
                    <img src="/static/images/c.png" alt="">
                    <p>版权服务</p>
                </div>
                <div>
                    <img src="/static/images/p.png" alt="">
                    <p>专利服务</p>
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
import Fix from '../ui/fix.vue';
export default {
  name: 'load',
  data(){
    return{
    }
  },
  components: {
      Top,
      Foot,
      Fix
  },
  methods:{
         

  },
  mounted(){
    
  }
}

</script>

<style scoped>
   .laod-box>img{
       width: 100%;
       height: 640px;
   }
   .load-des{
       height: 670px;
       width: 100%;
       background-color: #fafafa;
       text-align: center;
       padding-top:100px;
   }
   .load-des>p{
       font-size: 48px;
       font-weight: 500;
       color: #111111;
       margin-bottom: 48px;
   }
   .load-type{
       width: 1200px;
       height: 428px;
       background: #ffffff;
       margin: 0 auto;
   }
   .load-type>div{
       float: left;
       margin:78px 155px 0 0;
   }
   .load-type>div:nth-of-type(1){
       margin-left: 175px;
   }
   .load-type>div>p{
       font-size: 24px;
       color: #333333;
   }
</style>
