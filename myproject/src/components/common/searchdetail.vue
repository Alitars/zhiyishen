<template>
  <div class="searchdetail">
    <Top></Top>
    <Fix></Fix>
    <div class="searchdetail-box">
        <div class="searchdetail-box-top">
            <div>
                <div class="searchdetail-box-top-div1">
                    <img :src="pic" alt="">
                </div>
                <!-- <div class="searchdetail-box-top-div2">
                    <div>
                        <img src="/static/images/searchheart.png" alt=""><span>关注</span>
                    </div>
                    <div>
                        <img src="/static/images/searchbuy.png" alt=""><span>购买</span>
                    </div>
                </div> -->
            </div>
        </div>
        <div class="searchdetail-box-middle">
            <div class="searchdetail-box-middle-status">商标流程</div>
            <div class="searchdetail-box-middle-step">
                <div class="searchdetail-box-middle-step-div1">
                    <div class="yuan1" @click="mius"></div>
                    <div class="searchdetail-box-program1">
                        <div :style="{width:width}" class="searchdetail-box-program2"></div>
                    </div>
                    <div class="yuan2" @click="add"></div>
                </div>
                <div class="searchdetail-box-middle-step-div2">
                    <div  v-for=" item in [...arr].splice(a,b)">
                        <span>{{item.FlowDate}}</span>
                        <div>{{item.FlowName}}</div>
                    </div>
                </div>
            </div>
            <div class="searchdetail-box-middle-status">商标信息</div>
            <div class="searchdetail-box-middle-name">
                <div>
                    <span class="name-span1">商标名称：</span>
                    <span class="name-span3">{{brandname}}</span>
                </div>
                <div>
                    <span class="name-span2">申请/注册号：</span>
                    <span class="name-span3">{{this.$route.query.RegId}}</span>
                </div>
                <div>
                    <span class="name-span1">商标状态：</span>
                    <span class="name-span4">{{brandstatus}}</span>
                </div>
            </div>
            <div class="searchdetail-box-middle-good">
                <i class="el-icon-caret-bottom"></i>
                <span>商品分类</span>
            </div>
            <div class="searchdetail-box-middle-inter">
                <span>国际分类：</span>
                <span>{{intcls}}类</span>
            </div>
            <div class="searchdetail-box-middle-ser">
                <div class="ser">商品/服务：</div>
                <div>
                    <p v-for="(v,k) in type">{{v.DetailType}} {{v.DetailName}}</p>
                </div>
            </div>
            <div style="clear:both"></div>
            <div class="searchdetail-box-middle-like">
                <span>类似群：</span>
                <span></span>
            </div>
            <div class="searchdetail-box-middle-good">
                <i class="el-icon-caret-bottom"></i>
                <span>申请详情</span>
            </div>
            <div class="searchdetail-box-middle-infor">
                <div>
                    <span class="infor-span1">申请人名称：</span>
                    <span>{{AppNewName}}</span>
                </div>
                <div>
                    <span class="infor-span1">申请人地址：</span>
                    <span>{{AppAddress}}</span>
                </div>
                <div>
                    <span class="infor-span2">申请日期：</span>
                    <span>{{AppDate}}</span>
                </div>
            </div>
            <div class="searchdetail-box-middle-good">
                <i class="el-icon-caret-bottom"></i>
                <span>初审与注册</span>
            </div>
            <div class="searchdetail-box-middle-reg">
                <div>
                    <span class="reg-span1">初审公告日期：</span>
                    <span>{{PreAnnouncementDate}}</span>
                </div>
                <div>
                    <span class="reg-span2">初审公告号：</span>
                    <span id="reg-span3">{{PreAnnouncementPeriod}}</span>
                </div>
                <div>
                    <span class="reg-span1">注册公告日期：</span>
                    <span>{{Ggdate}}</span>
                </div>
                <div>
                    <span class="reg-span2">注册公告号：</span>
                    <span id="reg-span3">{{AnnouncementPeriod}}</span>
                </div>
            </div>
            <div class="searchdetail-box-middle-time">
                <div>
                    <span>专用权期限</span>
                    <span>是否共有商标</span>
                </div>
                <div>
                    <div>
                        <span>{{time1}}</span>
                        <span>/</span>
                        <span>{{time2}}</span>
                    </div>
                    <div>否</div>
                </div>
            </div>
            <div class="searchdetail-box-middle-good">
                <i class="el-icon-caret-bottom"></i>
                <span>其余日期与代办机构</span>
            </div>
            <div class="searchdetail-box-middle-last">
                <div>
                    <span class="last-span1">国际注册日期：</span>
                    <span></span>
                </div>
                <div>
                    <span class="last-span1">后期指定日期：</span>
                    <span></span>
                </div>
                <div>
                    <span class="last-span2">优先权日期：</span>
                    <span></span>
                </div>
                <div>
                    <span class="last-span3">代理/办理机构：</span>
                    <span>{{AgentName}}</span>
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
  name: 'searchdetail',
  components: {
      Top,
      Foot,
      Fix
  },
  data(){
      return{
        //   类别
          intcls:'',
        //   截取数据
          a:0,
          b:5,
          //  当前页
          currentpage:1,
        //   总页数
          total:Number,
        //  余数
        mianer:Number,
        arr:[],
        // 红色进度条的颜色
        width:'',
        pic:'',
        brandname:'',
        brandstatus:'',
        type:[],
        PreAnnouncementDate:'',
        Ggdate:'',
        AppDate:'',
        AnnouncementPeriod:'',
        PreAnnouncementPeriod:'',
        time1:'',
        time2:'',
        AppNewName:'',
        AppAddress:'',
        AgentName:'',

        //查图片
        pageNum1:'',
        pageNum2:'',
        TrialNum1:'',
        TrialNum2:''
      }
  },
  methods:{
    getdata1(){
        this.$http.get(this.GLOBAL.base_url+'/app/getdata',{params:{
                        channelroad:1,
                        user_id:this.$cookie.getCookie('u_id'),
                        type:4,
                        keywords:this.$route.query.RegId,
                        cate_id:this.$route.query.IntCls.substr(0,2),
                        size:10,
                        index:1
                    }}).then(res=>{
                        // console.log(res)
                        this.intcls = res.data.data[0].IntCls;
                        this.pic = 'data:image/png;base64,'+res.data.data[0].BrandImg;
                        this.brandname = res.data.data[0].Sbmc;
                        this.brandstatus = res.data.data[0].BrandStatus;
                        this.PreAnnouncementDate = res.data.data[0].PreAnnouncementDate;
                        this.Ggdate = res.data.data[0].Ggdate;
                         if(this.Ggdate == null){
                            this.time1 = '';
                            this.time2 = '';
                        }else{
                            this.time1 = this.Ggdate;
                            var d=new Date(this.time1); 
                            if((d.getMonth() + 1) <10){
                                var m1;
                                m1 = '0'+ (d.getMonth()+1); 
                            }else{
                                m1 = d.getMonth()+1;
                            }
                            if((d.getDate() - 1) <10){
                                var m2;
                                m2 = '0'+ (d.getDate()-1); 
                            }else{
                                m2 = d.getDate()-1;
                            }
                            this.time2 = (d.getFullYear()+10) + '-' + m1 + '-' + m2;
                        }
                        this.AppDate = res.data.data[0].AppDate;
                        this.AnnouncementPeriod = res.data.data[0].AnnouncementPeriod;
                        this.PreAnnouncementPeriod = res.data.data[0].PreAnnouncementPeriod;
                        this.AppNewName = res.data.data[0].AppNewName;
                        this.AppAddress = res.data.data[0].AppAddress;
                        this.AgentName = res.data.data[0].AgentName;
                    })
                },
    getdata2(){
        this.$http.get(this.GLOBAL.base_url+'/app/getdatadetail',{params:{
                       channelroad:1,
                    user_id:this.$cookie.getCookie('u_id'),
                       regid:this.$route.query.RegId,
                       intcls:this.intcls 
                    }}).then(res=>{
                        // console.log(res)
                            this.arr =  res.data.data;
                            this.mianer = this.arr.length%5;
                            this.total= parseInt(this.arr.length/5);
                            if(this.mianer>0){
                                this.total+=1;
                            }
                            if(this.currentpage == this.total){
                                if(this.mianer>0){
                                    this.width = this.mianer*220+'px';
                                }else{
                                        this.width = 1100+'px';
                                }
                            }else{
                                this.width = 1100+'px';
                            } 
                    })
             },
             getdata3(){
                this.$http.get(this.GLOBAL.base_url+'/app/getdataone',{params:{
                         channelroad:1,
                    user_id:this.$cookie.getCookie('u_id'),
                       regid:this.$route.query.RegId,
                       intcls:this.intcls 
                    }}).then(res=>{
                        // console.log(res)
                            this.type = res.data.data;
                    })
             },
             getdata4(){
                 this.$http.get(this.GLOBAL.base_url+'/app/getbyregid',{params:{
                         channelroad:1,
                    user_id:this.$cookie.getCookie('u_id'),
                       regid:this.$route.query.RegId
                    }}).then(res=>{
                        // console.log(res)
                        if(res.data.code == "1"){
                            // this.pageNum1 = res.data.data[0].PageNum;
                            // this.TrialNum1 = res.data.data[0].TrialNum;
                            // this.pageNum2 = res.data.data[1].PageNum;
                            // this.TrialNum2 = res.data.data[1].TrialNum;
                        }
                    })
             },
            //  toimg1(){
            //      if(this.pageNum1 == '' ||this.TrialNum1 == ''){
            //          return false
            //      }else{
            //          let routeData = this.$router.resolve({ path: '/searchimg', query: { trialnum:this.TrialNum1,pagenum:this.pageNum1}});
            //          window.open(routeData.href, '_blank');
            //      }
            //  },
             add(){
                 if(this.arr.length == 0){
                    return false;
                }
                if(this.currentpage < this.total){
                  this.currentpage+=1;
                  this.a = (this.currentpage-1)*5;
                }
                 if(this.currentpage == this.total){
                     if(this.mianer>0){
                            this.width = this.mianer*220+'px';
                        }else{
                            this.width = 1100+'px';
                        }
                }else{
                    if(this.currentpage > this.total){
                        return false
                    }
                }
             },
             mius(){
                 if(this.arr.length == 0){
                    return false;
                }
                 if(this.currentpage > 1){
                     this.currentpage-=1;
                    this.a = (this.currentpage-1)*5
                    this.width = 1100+'px';
                 }
                 if(this.currentpage == 1){
                     if(this.arr.length<5){
                            this.width = this.mianer*220+'px';
                        }else{
                            this.width = 1100+'px';
                        }
                }else{
                    if(this.currentpage < 1){
                        return false
                    }
                }
             }
  },
  mounted(){
      this.getdata1();
      this.intcls = this.$route.query.IntCls.substr(0,2);
      this.getdata2();
      this.getdata3();
    //   this.getdata4();
  }
}

</script>

<style scoped>
    .searchdetail-box-top{
        width: 100%;
        height: 160px;
        background: url('/static/images/searchtop.png') no-repeat;
        background-size: cover;
        padding-top:28px;
    }
    .searchdetail-box-top>div{
        width: 1200px;
        height: 130px;
        margin: 0 auto ;
    }
    .searchdetail-box-top-div1{
        width: 130px;
        height: 130px;
        border-radius: 4px;
        float: left;
        margin-left: 28px;
        background-color: #ffffff;
    }
    .searchdetail-box-top-div1>img{
        width: 130px;
        height: 130px;
        border-radius: 4px;
    }
    .searchdetail-box-top-div2{
        float: right;
        margin-right: 222px;
    }
    .searchdetail-box-top-div2>div:nth-of-type(1){
        width: 156px;
        height: 44px;
        line-height: 44px;
        border-radius: 4px;
        background-color: #ffffff;
        text-align: center;
        margin: 19px 0 11px;
        cursor: pointer;
    }
    .searchdetail-box-top-div2>div:nth-of-type(1)>span{
        font-size: 16px;
        color:#f96006;
        vertical-align: middle;
        margin-left: 4px;
    }
    .searchdetail-box-top-div2>div:nth-of-type(1)>img,.searchdetail-box-top-div2>div:nth-of-type(2)>img{
        vertical-align: middle;
    } 
    .searchdetail-box-top-div2>div:nth-of-type(2){
        width: 156px;
        height: 44px;
        line-height: 44px;
        border-radius: 4px;
        background-color: #f96006;
        text-align: center;
        cursor: pointer;
    }  
    .searchdetail-box-top-div2>div:nth-of-type(2)>span{
        font-size: 16px;
        color: #ffffff;
        vertical-align: middle;
        margin-left: 4px;
    }
    .searchdetail-box-middle{
        width: 1200px;
        margin: 0 auto;
    }
    .searchdetail-box-middle-status{
        font-family: "PingFangSC-Semibold";
        font-size: 18px;
        font-weight: 500;
        color: #1f1f1f;
        padding: 40px 0 20px 39px;
        border-bottom:1px solid #dddddd;
    }
    .searchdetail-box-middle-step{
        margin-top: 28px;
    }
    .searchdetail-box-middle-step-div1{
        height: 26px;
        line-height: 26px;
        margin-bottom: 19px;
    }
    .searchdetail-box-middle-step-div1>div{
        float: left;
    }
    .searchdetail-box-program1{
        width: 1100px;
        height: 6px;
        border-radius: 3px;
        background-color: #d8d8d8;
        margin: 12px 14px 0;
    }
    .searchdetail-box-program2{
        height: 6px;
        border-radius: 3px;
        background-color:#f96006;
    }
    .yuan1{
        margin-left: 10px;
        background: url('/static/images/left.png') no-repeat;
        background-size: cover;
    }
    .yuan2{
        background: url('/static/images/right.png') no-repeat;
        background-size: cover;
    }
    .yuan1,.yuan2{
        width: 25px;
        height: 25px;
        border-radius: 50%;
        cursor: pointer;
    }
    .searchdetail-box-middle-step-div2{
        height: 105px;
    }
    .searchdetail-box-middle-step-div2>div{
        float: left;
        margin-right: 120px;
        width: 96px;
        text-align: center;
    }
    .searchdetail-box-middle-step-div2>div:nth-of-type(1){
        margin-left: 75px;
    }
    .searchdetail-box-middle-step-div2>div>span{
        font-size: 14px;
        color: #111111;
    }
    .searchdetail-box-middle-step-div2>div>div{
        width: 96px;
        height: 65px;
        box-shadow: 2px 2px 8px 0 rgba(51, 51, 51, 0.3);
        background-color: #ffffff;
        font-family: "PingFangSC-Thin";
        font-size: 12px;
        font-weight: 100;
        color: orange;
    }
    .searchdetail-box-middle-name{
        margin:17px 0 0 30px;
    }
    .searchdetail-box-middle-name>div{
        margin-bottom: 18px;
    }
    .searchdetail-box-middle-name>div>span{
        font-size: 16px;
    }
    .name-span1{
        letter-spacing: 16px;
        color: #666666;
        margin-right: 105px;
    }
    .name-span2{
        letter-spacing: 6.7px;
        color: #666666;
        margin-right: 114px;
    }
    .name-span3{
        color:#333333;
    }
    .name-span4{
        color: #f96006;
    }
    .searchdetail-box-middle-good{
        height: 36px;
        line-height: 36px;
        background-color: #f8f8f8;
        padding-left: 31px;
        margin-bottom: 18px;
        
    }
    .searchdetail-box-middle-good>span{
        font-size: 16px;
        color:#333333;
        margin-left: 5px;
    }
    .searchdetail-box-middle-inter{
        margin:0 0 18px 30px;
        font-size: 16px;
    }
    .searchdetail-box-middle-inter>span:nth-of-type(1){
        letter-spacing: 16px;
        color: #666666;
        margin-right: 96px;
    }
    .ser{
        letter-spacing: 11.5px;
        color: #666666;
        margin-right: 98px;
    }
    .searchdetail-box-middle-inter>span:nth-of-type(2){
        color: #333333;
    }
    .searchdetail-box-middle-ser{
        margin:0 0 18px 30px;
    }
    .searchdetail-box-middle-ser>div{
        float: left;
    }
    .searchdetail-box-middle-ser>div:nth-of-type(2)>p{
        font-size: 16px;
        color: #333333;
        margin-bottom: 8px;
        margin-left: 5px;
    }
    .searchdetail-box-middle-like{
        margin:0 0 20px 30px;
        font-size: 16px;
    }
    .searchdetail-box-middle-like>span:nth-of-type(1){
        letter-spacing: 26.8px;
        color: #666666;
        margin-right: 84px;
    }
    .searchdetail-box-middle-like>span:nth-of-type(2){
        color: #333333;
    }
    .searchdetail-box-middle-infor,.searchdetail-box-middle-reg{
        margin:0 0 20px 30px;
        font-size: 16px;
        color: #666666;
    }
    .searchdetail-box-middle-infor>div,.searchdetail-box-middle-reg>div{
        margin-bottom: 18px;
    }
    .searchdetail-box-middle-infor>div>span:nth-of-type(2){
        color: #333333;
    }
    .infor-span1{
        margin-right: 160px;
    }
    .infor-span2{
        margin-right: 176px;
    }
    .reg-span1{
        letter-spacing: 5.4px;
        margin-right: 102px;
    }
    .reg-span2{
        letter-spacing: 9.6px;
        margin-right: 98px;
    }
    .searchdetail-box-middle-reg>div>span:nth-of-type(2){
        color: #333333;
    }
    #reg-span3{
        color:#f96006;
        text-decoration:underline;
        /* cursor: pointer; */
    }
    .searchdetail-box-middle-time{
        width: 1200px;
        height: 81px;
        border: solid 1px #888888;
        margin-bottom:20px;
    }
    .searchdetail-box-middle-time>div:nth-of-type(1){
        width: 1198px;
        height: 36px;
        line-height: 36px;
        font-size: 16px;
        color:#f96006;
        border-bottom:1px solid #888888;
        background-color: #f8f8f8;
    }
    .searchdetail-box-middle-time>div:nth-of-type(1)>span:nth-of-type(1){
        margin:0 512px 0 259px;
    }
    .searchdetail-box-middle-time>div:nth-of-type(2){
        height: 44px;
        line-height: 44px;
    }
    .searchdetail-box-middle-time>div:nth-of-type(2)>div{
        float: left;
        text-align: center;
        color: #333333;
    }
    .searchdetail-box-middle-time>div:nth-of-type(2)>div:nth-of-type(1){
        width: 599px;
        height: 44px;
        border-right: solid 2px #888888;
    }
    .searchdetail-box-middle-time>div:nth-of-type(2)>div:nth-of-type(2){
        text-align: center;
        width: 599px;
    }
    .searchdetail-box-middle-last{
        margin:0 0 200px 30px;
        font-size: 16px;
         color: #666666;
    }
    .searchdetail-box-middle-last>div{
        margin-bottom: 18px;
    }
    .last-span1{
        letter-spacing: 5.4px;
        margin-right: 108px;
    }
    .last-span2{
        letter-spacing: 9.6px;
        margin-right: 104px;
    }
    .last-span3{
        letter-spacing: 3.5px;
        margin-right: 108px;
    }
</style>
