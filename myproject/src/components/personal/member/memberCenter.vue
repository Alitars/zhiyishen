<template>
  <div class="memberCenter">
    <Top></Top>
     <div class="center">
         <img class="center-img" src="/static/images/member-top.png" alt="">
         <div class="center-div" v-for="(v,k) in arr">
             <img :src="GLOBAL.base_url+v.img_url" alt="">
             <div>
                 <span>180</span><span>/年</span>
             </div>
             <p class="p1">开通之后，<span>壹年</span>有效</p>
             <p class="p2">商标注册享受<span>5</span>单优惠，每单可节省<span>¥{{v.coupon_price}}</span></p>
             <div class="rightnow" @click="topay(v.id)">立即开通</div>
         </div>
     </div>
     <Foot></Foot>
  </div>
</template>

<script>
import Top from '../../ui/top.vue';
import Foot from '../../ui/foot.vue';
export default {
  name: 'memberCenter',
  data(){
    return{
        arr:[]
    }
  },
  components: {
      Top,
      Foot
  },
  methods:{
      getdata(){
          this.$http.get(this.GLOBAL.base_url+'/api/usercenter/userLevel').then(res=>{
            // console.log(res)
            if(res.data.code == "1"){
                this.arr = res.data.data;
            }
            })
      },
      topay(id){
          let routeData = this.$router.resolve({ path: '/memberPay',query:{id:id}});
         window.open(routeData.href, 'blank');
      }
  },
  mounted(){
      this.getdata()
  }
}

</script>

<style scoped>
    .center{
        width: 100%;
        height: 720px;
        background: url('/static/images/memberCenter.png') no-repeat;
        background-size:cover;
    }
    .center-img{
        width: 178px;
        height: 34px;
        margin: 23px 0 0 380px;
    }
    .center-div{
        width: 480px;
        margin: 118px auto 0;
        text-align: center;
    }
    .center-div>p{
        color: white;
    }
    .center-div>p>span{
        color: #fdd468;
    }
    .center-div>img{
        width: 409px;
        height: 53px;
        margin-bottom: 16px;
    }
    .center-div{
        margin-bottom: 4px;
    }
    .center-div>div>span:nth-of-type(1){
        font-size: 36px;
        font-weight: 600;
        color: #f96006;
    }
    .center-div>div>span:nth-of-type(2){
        font-size: 24px;
        color: white;
    }
    .p1{
        font-size: 16px;
        margin-bottom:16px ;
        font-weight: 200;
    }
    .p2{
        font-size: 24px;
        margin-bottom:12px ;
        font-weight: 300;
    }
    .rightnow{
        width: 480px;
        height: 72px;
        border-radius: 36px;
        background-color: #fdd468;
        font-size: 32px;
        font-weight: 500;
        color: #0a414e;
        text-align: center;
        line-height: 72px;
        cursor: pointer;
    }
</style>
