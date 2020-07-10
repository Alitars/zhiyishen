<template>
  <div class="govermentDetail">
    <Top></Top>
    <Fix></Fix>
    <div class="govermentDetail-box">
        <div class="govement-middle">
            <div class="middle-title">{{title}}</div>
            <img src="/static/images/govermentDetail.png" alt="">
            <div class="middle-detail">
                    <div class="govermentDetail-part">
                        <img src="/static/images/goverment1.png" alt="">
                        <span>主管单位:</span>
                        <span>{{unit}}</span>
                    </div>
                    <div class="govermentDetail-part">
                        <img src="/static/images/goverment2.png" alt="">
                        <span>扶持政策:</span>
                        <span>{{policy}}</span>
                    </div>
                    <div class="govermentDetail-cond">
                        <div>
                            <img src="/static/images/goverment3.png" alt="">
                            <span>主要条件:</span>
                        </div>
                        <div>
                            <div v-html="condition"></div>
                        </div>
                    </div>
                    <div class="govermentDetail-part2">
                        <img src="/static/images/goverment4.png" alt="">
                        <p>申报日期:</p>
                        <p v-html="cut_time"></p>
                    </div>
                    <div class="ask" @click="open">咨询</div>
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
  name: 'govermentDetail',
  data(){
    return{
     title:'',
     unit:'',
     policy:'',
     condition:'',
     cut_time:''
    }
  },
  components: {
    Top,
    Foot,
    Fix
  },
  methods:{
    getdata(){
      this.$http.post(this.GLOBAL.base_url+'/api/new/projectDetail',{
          p_id:this.$route.query.id
      }).then(res=>{
        // console.log(res)
        if(res.data.code == "1"){
            this.title = res.data.data.title;
            this.unit = res.data.data.unit;
            this.policy = res.data.data.policy;
            this.condition = res.data.data.condition;
            this.cut_time = res.data.data.cut_time;
        }
      })
    },
    open() {
        this.$alert('服务热线：400-630-2718', '提醒', {
          confirmButtonText: '确定'
        });
      }
  },
  mounted(){
    this.getdata()
  }
}

</script>

<style scoped>
    .govermentDetail-box{
        width: 100%;
        height: 100%;
        padding: 20px 0 80px;
         background-color: #fafafa;
    }
    .govement-middle{
        width: 1200px;
        text-align: center;
        padding: 36px 0 64px;
        background: white;
        margin: 0 auto;
    }
    .middle-title{
        width: 1000px;
        text-align: center;
        font-size: 30px;
        margin: 0 auto 58px;
    }
    .govement-middle>img{
        width: 1000px;
        height: 600px;
        margin-bottom: 32px;
    }
    .middle-detail{
        width: 1000px;
        text-align: start;
        margin: 0 auto;
    }
    .govermentDetail-part{
        width: 600px;
        height: 25px;
        /* border:1px solid red; */
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        margin-bottom: 24px;
  }
  .govermentDetail-part>img,.govermentDetail-cond>div:nth-of-type(1)>img{
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
  .govermentDetail-part>span{
    vertical-align: middle;
    font-size: 18px;
    color: #333333;
  }
  .govermentDetail-part>span:nth-of-type(1){
    margin: 0 16px 0 8px;
  }
  .govermentDetail-part>span:nth-of-type(2){
    font-weight: 300;
  }
  .govermentDetail-cond{
    width: 600px;
    height: 250px;
    margin-bottom: 24px;
  }
  .govermentDetail-cond>div{
    float: left;
  }
  .govermentDetail-cond>div:nth-of-type(1){
    height: 25px;
    margin-right: 18px;
  }
  .govermentDetail-cond>div:nth-of-type(2){
    height: 250px;
    overflow: auto;
  }
  .govermentDetail-cond>div:nth-of-type(2)::-webkit-scrollbar {
            width: 8px;     
            height: 8px;
    }
    .govermentDetail-cond>div:nth-of-type(2)::-webkit-scrollbar-thumb {
        border-radius: 5px;
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    }
    .govermentDetail-cond>div:nth-of-type(2)::-webkit-scrollbar-track {
            opacity: 0;
    }
  .govermentDetail-cond>div:nth-of-type(1)>span{
    vertical-align: middle;
    font-size: 18px;
    color: #333333;
    margin-left: 8px;
  }
  .govermentDetail-cond>div:nth-of-type(2)>div{
    width: 400px;
    /* height: 25px; */
    margin-top: 3px;
    font-size: 18px;
    margin-bottom: 32px;
    font-weight: 300;
    color: #333333;
  }
  .govermentDetail-part2{
    width: 600px;
    height: 25px;
    line-height: 25px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .govermentDetail-part2>img{
    float: left;
    width: 20px;
    height: 20px;
    margin-top: 3px;
  }
  .govermentDetail-part2>p{
    float: left;
    font-size: 18px;
    color: #333333;
  }
  .govermentDetail-part2>p:nth-of-type(1){
    width: 77px;
    margin: 0 16px 0 8px;
  }
  .govermentDetail-part2>p:nth-of-type(2){
    font-weight: 300;
  }
  .ask{
      width: 144px;
      height: 38px;
      border-radius: 4px;
      background-color: #f96006;
      line-height: 38px;
      color: white;
      font-size: 16px;
      text-align: center;
      margin: 32px auto 0;
      cursor: pointer;
  }
</style>
