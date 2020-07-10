<template>
  <div class="agencyactive">
    <Top></Top>
    <Fix></Fix>
    <div class="agencyactive-box">
      <div>{{price}}</div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Top from '../ui/top.vue';
import Foot from '../ui/foot.vue';
import Fix from '../ui/fix.vue';
export default {
  name: 'agencyactive',
  data(){
    return{
      price:''
    }
  },
  components: {
    Top,
    Foot,
    Fix
  },
  methods:{
    getprice(){
      this.$http.post(this.GLOBAL.base_url+'/api/remainPrice').then(res=>{
        // console.log(res)
              if(res.data.code == "1"){
                this.price = res.data.total_price;
              }
            })
    }
  },
  mounted(){
    this.getprice()
  }
}

</script>

<style scoped>
.agencyactive-box{
  width: 1200px;
  height: 1085px;
  padding-top: 255px;
  background: url('/static/images/agencyactive.png') no-repeat;
  background-size: cover;
  margin: 0 auto 80px;
}
.agencyactive-box>div{
  width: 148px;
  height: 47px;
  line-height: 47px;
  margin-left: 447px;
  color: #f96006;
  font-size: 36px;
}
</style>
