<template>
  <div id="like">
      <Top></Top>
      <Fix></Fix>
      <div class="like-box">
        <div class="like-box-middle">
            <div class="like-box-detail" v-show="datashow">
                <div class="like-box-detail-total">注册商标：<span>{{this.$route.query.type}}</span>，小果为您检索到<span>{{total}}</span>条相关商标</div>
                <div>
                    <div class="like-box-detail-box" v-for="(v,k) in list">
                        <div class="like-box-detail-box-img">
                            <img :src="v.BrandImg?v.BrandImg:'/static/images/no.png'" alt="">
                        </div>
                        <div class="like-box-detail-box-des">
                            <div class="like-box-detail-box-de-div1">
                                <div>{{v.Sbmc}}</div>
                                <div>
                                    <span class="span1">申请人:</span>
                                    <span class="like-box-detail-box-de-div1-span2">{{v.AppNewName}}</span>
                                </div>
                                <div>
                                    <span class="span1">申请日期:</span>
                                    <span class="like-box-detail-box-de-div1-span2">{{v.AppDate}}</span>
                                </div>
                            </div>
                            <div class="like-box-detail-box-de-div2">
                                <div>
                                    <span class="span1">当前状态:</span>
                                    <span class="span3">{{v.BrandStatus}}</span>
                                </div>
                                <div>
                                    <span class="span1">申请/注册号:</span>
                                    <span class="like-box-detail-box-de-div2-span2">{{v.RegId}}</span>
                                </div>
                                <div>
                                    <span class="span1">初审公告日期:</span>
                                    <span class="like-box-detail-box-de-div2-span2">{{v.PreAnnouncementDate}}</span>
                                </div>
                            </div>
                            <div class="like-box-detail-box-de-div3">
                                <div>
                                    <span class="span1">商品类别:</span>
                                    <span class="like-box-detail-box-de-div3-span2">{{v.IntCls}}</span>
                                </div>
                                <div>
                                    <span class="span1">注册公告日期:</span>
                                    <span class="like-box-detail-box-de-div3-span2">{{v.Ggdate}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="like-box-detail-box-do">
                            <p id="p1" @click="tolikedetail(v.RegId,v.IntCls)">查看详情</p>
                        </div>
                    </div>
                    <div class="like-page">
                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage1"
                                :page-size="pageSize"
                                layout="prev, pager, next"
                                :total="total">
                            </el-pagination>
                        </div>
                </div>
            </div>
            <div style="margin-top:200px;height:300px;text-align: center;font-size:18px;" v-show="!datashow">暂无数据</div>
        </div>
      </div>
      <Foot></Foot>
      <div class="wait-div" v-show="waitshow">
         <div>
             <img src="/static/images/loading小果.gif" alt="">
             <p>{{num}}%</p>
             <p>小果正在为您智能查询,请稍候……</p>
         </div>
    </div>
  </div>
</template>

<script>
import Top from '../ui/top.vue';
import Foot from '../ui/foot.vue';
import Fix from '../ui/fix.vue';
export default {
  name: 'like',
  data(){
      return{
         list:[],
          total:0,
          currentPage1: 1,
          pageSize: 10,
          num:0,
        waitshow:true,
        datashow:true,
      }
  },
  components: {
      Top,
      Foot,
      Fix
  },
  computed:{
      
  },
  methods:{
      getdata(){
          this.$http.post(this.GLOBAL.base_url+'/app/likeselect',{
                    channelroad:1,
                    user_id:this.$cookie.getCookie('u_id'),
                    text:this.$route.query.type,
                    group:this.$route.query.num,
                    type:4,
                    cate_id:this.$route.query.cate_id,
                    size:10,    
                    index:this.currentPage1
                }).then(res=>{
                    // console.log(res)
                    
                    if(res.data.code == "1"){
                        this.list = res.data.data;
                        this.total = res.data.others;
                        clearInterval(this.timer);
                        this.num = 100;
                        if(this.num == 100){
                            setTimeout(() => {
                                this.waitshow = false;
                            }, 10);
                        }
                        for(var i =0;i<this.list.length;i++){
                        this.list[i].BrandImg = 'data:image/png;base64,'+this.list[i].BrandImg
                        }
                    }else{
                        this.waitshow = false;
                        this.datashow = false;
                    }
                        
                    
                })
      },
      handleSizeChange(val) {
              this.pageSize = val;
              this.getdata();
            },
            
        handleCurrentChange(val) {
            this.currentPage1 = val;
            this.getdata();
        },
        tolikedetail(value1,value2){
            let routeData = this.$router.resolve({ path: '/searchdetail', query: { RegId:value1,
                    IntCls:value2 }});
              window.open(routeData.href, '_blank');
        },
        addnum(){
         this.timer = setInterval( () => {
            //  console.log(this.num)
                    this.num+=1
                    if(this.num == 95){
                        clearInterval(this.timer);
                    }
                }, 100)
      }
  },
  mounted(){
      this.getdata();
      this.addnum();
  }
}

</script>

<style scoped>
    .like-box{
        background-color: #fafafa;
        padding-top:30px;
    }
    .like-box-middle{
        width: 1200px;
        margin: 0 auto;
    }
    .like-box-title{
        height: 40px;
        border-bottom:2px solid #f96006;
    }
    .like-box-title>div{
        width: 1200px;
        margin: 0 auto;
        height: 40px;
    }
    .seActive{
        color: red!important;
    }
    .like-box-title>div>div{
        float: left;
        width: 120px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-family: "PingFangSC-Semibold";
        font-size: 20px;
        /* font-weight: 600; */
        color: #333333;
        cursor: pointer;
    }
    .like-box-title>div>div:nth-of-type(1){
        margin-left: 40px;
    }
    .excat .div1,.like .div2,.apply .div3,.num .div4{
       color: #ffffff;
       background: #f96006;
    }
    .like-box-middle-condition{
        background: #ffffff;
        padding-left: 48px;
        padding-bottom: 9px;
    }
    .like-box-middle-condition-div1,.like-box-middle-condition-div2,.like-box-middle-condition-div3{
        border-bottom: 1px dotted #dddddd;
    }
    .like-box-middle-condition-div1>div:nth-of-type(1){
        height: 56px;
        font-family: "PingFangSC-Thin";
        font-size: 14px;
        font-weight: 100;
        color: #666666;
        line-height: 56px;
        float: left;
        margin-right: 17px;
    }
    .like-box-middle-condition-div1>div:nth-of-type(2){
        width: 1075px;
        float: left;
        margin-top: 17px;
    }
    .like-box-middle-condition-div1>div:nth-of-type(2)>div{
        float: left;
        width: 122px;
        height: 24px;
        margin-right: 32px;
        background-color: #fed18e;
        margin-bottom: 5px;
        font-size: 12px;
        color: #ffffff;
        text-align: center;
        line-height: 24px;
        cursor: pointer;
    }
    .like-box-middle-condition-div1>div:nth-of-type(2)>div>a{
        text-decoration: none;
        margin-left: 6px;
        color: #ffffff;
    }
    .like-box-middle-condition-div1>div:nth-of-type(2)>div:nth-of-type(7n){
        margin-right: 0;
    }
    .like-box-middle-condition-div2>div:nth-of-type(1){
        height: 45px;
        line-height: 45px;
        font-family: "PingFangSC-Thin";
        font-size: 14px;
        font-weight: 100;
        color: #666666;
        float: left;
        margin-right: 48px;
    }
    .type1{
        width: 900px;
        float: left;
        height: 31px;
        margin-top: 12px;
        overflow: hidden;
    }
    .active1{
        height: 270px;
    }
    .type1>div{
        width: 91px;
        float: left;
        font-size: 14px;
        color: #333333;
        margin-right: 60px;
        margin-bottom: 15px;
        cursor: pointer;
    }
    .type1>div:nth-child(6n){
        margin-right: 0;
    }
    .like-box-middle-condition-div2>div:nth-of-type(3){
        float: left;
        height: 45px;
        line-height: 45px;
        margin-left: 65px;
        font-size: 14px;
        font-weight: 600;
        color: #333333;
        cursor: pointer;
    }
    .like-box-middle-condition-div3>div:nth-of-type(1){
        height: 45px;
        line-height: 45px;
        font-family: "PingFangSC-Thin";
        font-size: 14px;
        font-weight: 100;
        color: #666666;
        float: left;
        margin-right: 19px;
    }
    .type2{
        width: 900px;
        float: left;
        height: 26px;
        margin-top: 12px;
        overflow: hidden;
    }
    .active2{
        height: 58px;
    }
    .type2>div{
        float: left;
        font-size: 14px;
        color: #333333;
        margin-right: 55px;
        margin-bottom: 6px;
        cursor: pointer;
    }
    .type2>div:nth-child(7n){
        margin-right: 0;
    }
    .like-box-middle-condition-div3>div:nth-of-type(3){
        float: left;
        height: 45px;
        line-height: 45px;
        margin-left: 65px;
        font-size: 14px;
        font-weight: 600;
        color: #333333;
        cursor: pointer;
    }
    .like-box-middle-condition-div4{
        height: 42px;
        line-height: 42px;
    }
    .like-box-middle-condition-div4>div{
       float: left;
    }
    .nian{
        font-family: "PingFangSC-Thin";
        font-size: 14px;
        font-weight: 100;
        color: #666666;
        margin-right: 25px;
    }
    .input-box{
        margin-right: 5px;
    }
    input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{
        -webkit-appearance: none !important; 
       }
    input[type="number"]{
        -moz-appearance:textfield;
        outline: none;
        width: 77px;
        height: 28px;
        border-radius: 4px;
        border: solid 1px #d6d6d6;
       }
    .input-box>span{
        font-size: 14px;
        color: #333333;
    }
    .confire{
        width: 72px;
        height: 28px;
        border-radius: 4px;
        background-color:#f96006;
        font-size: 14px;
        line-height: 28px;
        text-align: center;
        color: #ffffff;
        margin-top: 7px;
        cursor: pointer;
    }
    .tip{
        color: red;
        font-size: 14px;
        height: 42px;
        line-height: 42px;
        margin-left: 10px;
    }
    .like-box-detail{
        margin-top: 20px;
        padding: 27px 48px 102px;
        background-color: #ffffff;
        /* margin-bottom: 102px; */
    }
    .like-box-detail-total{
        font-size: 24px;
        margin-bottom: 28px;
        color: #000000;
    }
    .like-box-detail-total>span{
        color: #f96006;
    }
    .like-box-detail-box{
        height: 150px;
        border: solid 1px #e6e6e6;
        margin-bottom: 16px;
    }
    .like-box-detail-box>div{
        float: left;
    }
    .like-box-detail-box-img{
        width: 118px;
        height: 118px;
        border: solid 1px #e6e6e6;
        margin: 16px 47px 16px 16px;
    }
    .like-box-detail-box-img>img{
        width: 118px;
        height: 118px;
    }
    .like-box-detail-box-des{
        height: 120px;
        margin-top: 21px;
    }
    .like-box-detail-box-des>div{
        float: left;
    }
    .like-box-detail-box-de-div1{
        width: 252px;
        font-size: 12px;
    }
    .like-box-detail-box-de-div1>div:nth-of-type(1){
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        height: 27px;
        font-family: "PingFangSC-Medium";
        font-size: 20px;
        font-weight: 500;
        margin:0 0 19px 30px;
        color: #333333;  
    }
    .like-box-detail-box-de-div1>div:nth-of-type(2){
        margin:0 0 24px 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .span1{
        color: #999999;
    }
    .like-box-detail-box-de-div1-span2,.like-box-detail-box-de-div2-span2,.like-box-detail-box-de-div3-span2{
        font-weight: 500;
        color: #333333;
    }
    .like-box-detail-box-de-div2{
        width: 276px;
        font-size: 12px;
    }
    .like-box-detail-box-de-div2>div:nth-of-type(1){
        margin: 6px 0 24px 21px;
    }
    .span3{
        font-weight: 500;
        color: #f96006;
    }
    .like-box-detail-box-de-div2>div:nth-of-type(2){
        margin: 0 0 24px 6px;
    }
    .like-box-detail-box-de-div3{
        margin-top: 48px;
        width: 262px;
        font-size: 12px;
    }
    .like-box-detail-box-de-div3>div:nth-of-type(1){
        margin: 0 0 23px 24px;
    }
    .like-box-detail-box-do{
        height: 120px;
        font-size: 12px;
        margin-top: 16px;
        padding-left: 25px;
        border-left: 1px dotted  #e6e6e6;
        line-height: 100px;
    }
    .like-box-detail-box-do>p{
        margin-bottom: 24px;
        color: #f96006;
        cursor: pointer;
    }
    #p1{
        margin-top: 11px;
        color: #4a90e2;
    }
    .like-page{
        text-align: center;
        margin-top:40px;
    }
    .like-box-nodata{
        text-align: center;
        margin-top: 60px;
    }
    .like-box-nodata>div:nth-of-type(1){
        margin: 36px 0 48px;
        font-size: 14px;
        color: #333333;
    }
    .like-box-nodata>div:nth-of-type(2){
        width: 144px;
        height: 38px;
        margin: 0 auto;
        border-radius: 4px;
        line-height: 38px;
        background-color:#f96006;
        font-size: 16px;
        cursor: pointer;
        text-align: center;
        color: #ffffff;
    }
    .wait-div{
        background-color: #fbefe9;
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 20;
        top: 0;
        left: 0;
    }
    .wait-div>div{
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        text-align: center;
    }
    .wait-div>div>img{
        margin-bottom: 35px;
    }
    .wait-div>div>p:nth-of-type(1){
        font-size: 48px;
        font-weight: 500;
        color:#f96006;
        margin-bottom: 60px;
    }
    .wait-div>div>p:nth-of-type(2){
        font-size: 32px;
        font-weight: 500;
        color: #333333;
    }
</style>
