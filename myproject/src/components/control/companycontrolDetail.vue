<template>
  <div class="companycontrolDetail">
    <Top></Top>
    <div class="companycontrolDetail-box">
        <div class="box-middle">
            <div class="middle-top">
                <div class="middle-top-title">知昇(上海)人工智能科技有限公司</div>
                <div class="middle-top-detail">
                    <div class="detail1">
                        <img src="/static/images/companycontrol.png" alt="">
                        <div class="detail1-div1">
                            <div>商标申请数量</div>
                            <div>{{all}}</div>
                        </div>
                        <div class="detail1-div2">
                            <div>无效商标数量</div>
                            <div>{{wu}}</div>
                        </div>
                    </div>
                    <div class="detail2">主要申请类别:<span> {{cate}}</span></div>
                </div>
            </div>
            <div class="company-data">
                <div class="data-left">
                    <div :class="active">
                        <div>公司旗下商标</div>
                        <div class="companyall" @click="chosetype('all')"><span>全部商标</span></div>
                        <div class="companyport" @click="chosetype('port')"><span>公告期商标</span></div>
                        <div class="companyxu" @click="chosetype('xu')"><span>续展期商标</span></div>
                        <div class="companytent" @click="chosetype('tent')"><span>宽展期商标</span></div>
                        <div class="companyno" @click="chosetype('no')"><span>无效商标</span></div>
                        <div>近似商标</div>
                        <div class="companyalllike" @click="chosetype('alllike')"><span>全部近似风险</span></div>
                        <div class="companyfirst" @click="chosetype('first')"><span>初审近似风险</span></div>
                        <div class="companyapply" @click="chosetype('apply')"><span>申请被驳回风险</span></div>
                    </div>
                </div>
                <div class="data-right" v-show="active == 'all'||active == 'port'||active == 'xu'||active == 'tent'||active == 'no'">
                    <div class="data-right-box">
                        <div class="right-title" v-if="active == 'all'">全部商标（{{total1}}）</div>
                        <div class="right-title" v-if="active == 'port'">公告期商标（{{total1}}）</div>
                        <div class="right-title"  v-if="active == 'xu'">续展期商标（{{total1}}）</div>
                        <div class="right-title"  v-if="active == 'tent'">宽展期商标（{{total1}}）</div>
                        <div class="right-title"  v-if="active == 'no'">无效商标（{{total1}}）</div>
                        <div class="right-serch">
                            <div class="right-serch-ser">
                                <input type="text" placeholder="请输入商标名称" v-model="searchkey">
                                <div class="serch-ser1" @click="searchall">搜索</div>
                                <div class="serch-ser2">
                                    <span>综合排序</span>
                                    <span>申请时期
                                        <i class="regularTriangle" @click="data1"></i>
                                        <i class="downTriangle" @click="data2"></i>
                                    </span>
                                    <span>初审日期
                                        <i class="regularTriangle" @click="data3"></i>
                                        <i class="downTriangle" @click="data4"></i>
                                    </span>
                                    <span>注册日期
                                        <i class="regularTriangle" @click="data5"></i>
                                        <i class="downTriangle" @click="data6"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="data-box-list">
                            <div v-for="(v,k) in list">
                                <div class="list1">
                                    <img :src="v.BrandImg?v.BrandImg:'/static/images/no.png'" alt="">
                                </div>
                                <div class="list2">
                                    <div>
                                        <div class="list-div1">{{v.Sbmc}}</div>
                                        <div class="list-div2">
                                            <span>当前状态:</span>
                                            <span id="span1">{{v.BrandStatus}}</span>
                                        </div>
                                        <div>
                                            <span>申请/注册号:</span>
                                            <span>{{v.RegId}}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="list-div3">
                                            <span>商品类别:</span>
                                            <span>{{v.IntCls}}</span>
                                        </div>
                                        <div class="list-div3">
                                            <span>申请人:</span>
                                            <span id="span2">{{v.AppNewName}}</span>
                                        </div>
                                        <div>
                                            <span>申请日期:</span>
                                            <span>{{v.AppDate}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="list3">
                                    <p @click="tosearchdetail(v.RegId,v.IntCls)">查看详情</p>
                                    <p>监控商标</p>
                                    <p>购买商标</p>
                                </div>
                            </div>
                        </div>
                        <div class="data-box-page">
                            <el-pagination
                                @size-change="handleSizeChange1"
                                @current-change="handleCurrentChange1"
                                :current-page="currentPage1"
                                :page-size="pageSize1"
                                layout="total,prev, pager, next"
                                :total="total1">
                            </el-pagination>
                        </div>
                    </div>
                </div>
                <div class="data-right" v-show="active == 'alllike'||active == 'first'||active == 'apply'">
                    <div class="data-right-box">
                        <div class="right-title">全部商标</div>
                        <div class="right-serch">
                            <div class="right-serch-div1">针对近似商标的你可以采取一些措施对你的商标加以保护，你可以办理以下业务：商标异议，商标撤三申请，商标无效宣告等</div>
                            <div class="right-serch-ser">
                                <input type="text" placeholder="请输入商标名称">
                                <div class="serch-ser1">搜索</div>
                                <div class="serch-ser2">
                                    <span>综合排序</span>
                                    <span>申请时期
                                        <i class="regularTriangle"></i>
                                        <i class="downTriangle"></i>
                                    </span>
                                    <span>初审日期
                                        <i class="regularTriangle"></i>
                                        <i class="downTriangle"></i>
                                    </span>
                                    <span>注册日期
                                        <i class="regularTriangle"></i>
                                        <i class="downTriangle"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="data-right-num">
                            <div class="num-left">
                                <div class="num-left1">近似商标<span>12</span></div>
                                <div class="num-left2">
                                    <div class="left2-div1">
                                        <img src="/static/images/4.png" alt="">
                                    </div>
                                    <div class="left2-div2"></div>
                                    <div class="left2-div3">guolao</div>
                                    <div class="left2-div4">已注册</div>
                                    <div class="left2-div5">35类  广告销售</div>
                                    <div class="left2-div5">阿西吧科技有限公司</div>
                                    <div class="left2-div6"><span>申请/注册号:</span><span>456156245</span></div>
                                    <div class="left2-div6"><span>申请日期:</span> <span>2020.04.30</span></div>
                                    <div class="left2-div6"><span>初审公告日期:</span><span>2020.04.30</span></div>
                                    <div class="left2-div6"><span>注册公告日期:</span><span>2020.04.30</span></div>
                                </div>
                            </div>
                            <div class="num-right">
                                <div v-for="(v,k) in 4">
                                    <div class="num1">
                                        <img src="/static/images/4.png" alt="">
                                    </div>
                                    <div class="num2">
                                        <div>
                                            <div class="num2-div1">guolao</div>
                                            <div class="num2-div2">已注册</div>
                                            <div>35类  广告销售</div>
                                            <div>阿西吧科技有限公司阿西吧科技有限公司</div>
                                        </div>
                                        <div>
                                            <div><span>申请/注册号:</span>123652365</div>
                                            <div><span>申请日期:</span>2020.04.30</div>
                                            <div><span>初审公告日期:</span>2020.04.30</div>
                                            <div><span>注册公告日期:</span>2020.04.30</div>
                                        </div>
                                    </div>
                                    <div class="num3">
                                        <div>商标异议</div>
                                        <div>商标无效</div>
                                    </div>
                                </div>
                            </div>
                            <div class="data-box-page">
                            <el-pagination
                                @size-change="handleSizeChange1"
                                @current-change="handleCurrentChange1"
                                :current-page="currentPage1"
                                :page-size="pageSize1"
                                layout="total,prev, pager, next"
                                :total="total1">
                            </el-pagination>
                        </div>
                        </div>
                    </div>
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
  name: 'companycontrolDetail',
  data(){
      return{
          active:'all',
          total1:0,
          currentPage1: 1,
          pageSize1: 4,
          applyup:'',
          firstup:'',
          regup:'',
          searchkey:'',
          all:'',
          wu:'',
          cate:'',
          list:[]
      }
  },
  components: {
    Top,
    Foot
  },
  methods:{
      chosetype(val){
          this.active = val;
          this.currentPage1 = 1;
          this.getdata()
      },
      data1(){
          this.applyup = 1;
          this.getdata();
      },
      data2(){
          this.applyup = 0;
          this.getdata();
      },
      data3(){
          this.firstup = 1;
          this.getdata();
      },
      data4(){
          this.firstup = 0;
          this.getdata();
      },
      data5(){
          this.regup = 1;
          this.getdata();
      },
      data6(){
          this.regup = 0;
          this.getdata();
      },
      searchall(){
          this.currentPage1 = 1;
          this.getdata();
      },
      getdata(){
          var status;
          if(this.active == 'all'){
              status = 1
          }else if(this.active == 'port'){
              status = 2
          }else if(this.active == 'xu'){
              status = 3
          }else if(this.active == 'tent'){
              status = 4
          }else{
              status = 5
          }
          const loading = this.$loading({
              lock: true,
              text: '请求中',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.3)'
            });
          this.$http.post(this.GLOBAL.base_url+'/api/companyMon',{
            company:'轻客（上海）众创空间管理有限公司',
            status:status,
            key:this.searchkey,
            appdate:this.applyup,
            trialdate:this.firstup,
            regDate:this.regup,
            index:this.currentPage1,
            size:this.pageSize1
        }).then(res => {
        //   console.log(res)
          if(res.data.code == 1) {
              loading.close();
            this.all = res.data[0].tm_count;
            this.wu = res.data[0].wu_count;
            this.cate = res.data[0].intcl;
            this.total1 = res.data[0].count;
            this.list = res.data[0].list;
            for(var i =0;i<this.list.length;i++){
                this.list[i].BrandImg = 'data:image/png;base64,'+this.list[i].BrandImg
            }
          }else{
              loading.close();
          }
        })
      },
      handleSizeChange1(val){
          this.pageSize1 = val;
         this.getdata();
      },
      handleCurrentChange1(val){
          this.currentPage1 = val;
         this.getdata();
      },
      tosearchdetail(value1,value2){
            let routeData = this.$router.resolve({ path: '/searchdetail', query: { RegId:value1,
                    IntCls:value2 }});
              window.open(routeData.href, '_blank');
        }
  },
  mounted(){
      this.getdata()
  }
}

</script>

<style scoped>
   .companycontrolDetail-box{
       width: 100%;
       height: 100%;
       background-color: #fafafa;
       padding:16px 0 80px;
   }
   .box-middle{
       width: 1200px;
       margin: 0 auto;
   }
   .middle-top{
       padding-top: 31px;
       height: 210px;
       background-image: linear-gradient(to bottom, #fdf9f7, #fdefe8);
       margin-bottom: 16px;
   }
   .middle-top-title{
       width: 500px;
       font-size: 18px;
       text-align: center;
       margin: 0 auto 32px;
   }
   .middle-top-detail{
       width: 894px;
       height: 120px;
       margin: 0 auto;
   }
   .detail1{
       float: left;
       width: 443px;
       height: 120px;
       border-right:1px dotted #e5d1c3;
   }
   .detail1>img{
       float: left;
   }
   .detail1-div1{
       width: 84px;
       margin-right: 87px;
       float: left;
   }
   .detail1-div1>div:nth-of-type(1),.detail1-div2>div:nth-of-type(1){
       font-size: 14px;
       margin: 32px 0 10px;
       color: #999999;
   }
   .detail1-div1>div:nth-of-type(2),.detail1-div2>div:nth-of-type(2){
       font-size: 20px;
   }
   .detail1-div2{
       float: left;
       width: 84px;
   }
   .detail2{
       width: 405px;
       height: 75px;
       float: left;
       padding:30px 0 0 45px;
       font-size: 14px;
   }
   .detail2>span{
       margin-left: 8px;
   }
   .company-data{
       min-height: 880px;
   }
   .data-left{
       float: left;
       width: 192px;
       height: 882px;
       background-color: white;
       margin-right: 16px;
       padding: 32px 0 0 32px;
   }
   .data-left>div>div{
       margin-bottom: 32px;
       font-size: 14px;
       cursor: pointer;
   }
   .data-left>div>div>span{
       display: inline-block;
       width: 115px;
   }
   .data-left>div>div:nth-of-type(1),.data-left>div>div:nth-of-type(7){
       margin-bottom: 27px;
       font-size: 18px;
   }
   .data-left>div>div:nth-of-type(6){
        margin-bottom: 48px;
   }
   .all .companyall,.port .companyport,.xu .companyxu,.tent .companytent,.no .companyno,.alllike .companyalllike,.first .companyfirst,.apply .companyapply{
       color: #f96006!important;
   }
   .data-right{
       float: left;
       width: 960px;
       padding-top: 30px;
       min-height: 850px;
       background: white;
   }
   .data-right-box{
       width: 900px;
       margin: 0 auto;
   }
   .right-title{
       font-size: 18px;
        margin: 0 0 4px 28px;
   }
   .right-serch{
       border-top:1px solid #d8d8d8;
   }
   .right-serch-ser{
       height: 48px;
        margin: 16px 0;
       border-bottom: 1px solid #d8d8d8;
   }
   .right-serch-ser>input{
       float: left;
        outline: none;
        width: 216px;
        height: 30px;
        padding-left: 12px;
        border-radius: 4px;
        border: solid 1px #d6d6d6;
        margin-right: 30px;
   }
   .serch-ser1{
        float: left;
        width: 80px;
        height: 32px;
        border-radius: 4px;
        background-color: #f96006;
        text-align: center;
        line-height: 32px;
        color: white;
        margin-right: 168px;
        cursor: pointer;
    }
    .serch-ser2{
        float: left;
        height: 20px;
        margin-top: 12px;
    }
    .serch-ser2>span{
        font-size: 16px;
        margin-right: 30px;
        position: relative;
    }
    .regularTriangle{
        position: absolute;
        width: 0;
        height: 0;
        top: 4px;
        right: -12px;
        border-style: solid;
        border-width: 4px;
        border-color: transparent transparent #000 #000;
        transform: rotate(135deg);
        cursor: pointer;
        z-index: 20;
    }
    .downTriangle{
        position: absolute;
        width: 0;
        height: 0;
        top:8px;
        right: -12px;
        border-style: solid;
        border-width: 4px;
        border-color: transparent transparent #000 #000;
        transform: rotate(-45deg);
        cursor: pointer;
        z-index: 20;
    }
    .data-box-list{
        height: 645px;
        margin-bottom: 32px;
    }
    .data-box-list>div{
        height: 160px;
        border:1px solid #d8d8d8;
        border-top:none;
    }
    .data-box-list>div:first-child{
        border-top:1px solid #d8d8d8;
    }
    .data-box-list>div>div{
        float: left;
        height: 120px;
        margin-top: 20px;
    }
    .list1{
        width: 118px;
        height: 118px;
        border: solid 1px #d8d8d8;
        margin: 0 24px 0 20px;
    }
    .list1>img{
        width: 118px;
        height: 118px;
    }
    .list2{
        width: 614px;
        height: 120px;
        font-size: 14px;
        border-right:1px dotted #d8d8d8;
    }
    .list2>div:nth-of-type(1){
        float: left;
        width: 265px;
    }
    .list2>div>div>span:nth-of-type(1){
        display: inline-block;
        width: 80px;
        text-align: right;
        vertical-align: middle;
    }
    .list2>div>div>span:nth-of-type(2){
        color: #999999;
        vertical-align: middle;
    }
    .list-div1{
        font-size: 18px;
        margin: 0 0 23px 20px;
    }
    #span1{
        color: #f96006;
    }
    #span2{
        width: 250px;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .list-div2{
        margin-bottom: 24px;
    }
    .list-div3{
        margin-bottom: 26px;
    }
    .list2>div:nth-of-type(2){
        float: left;
        width: 335px;
    }
    .list3{
        width: 118px;
        text-align: center;
    }
    .list3>p{
        font-size: 14px;
        margin-bottom: 24px;
        color: #4a90e2;
        cursor: pointer;
    }
    .data-box-page{
        float: right!important;
    }
    .right-serch-div1{
        font-size: 14px;
        font-weight: 100;
        margin-top: 16px;
    }
    .data-right-num{
        min-height: 740px;
    }
    .data-right-num>div{
        float: left;
    }
    .num-left{
        width: 234px;
        height: 646px;
        margin-right: 16px;
        background-image: linear-gradient(to bottom, #fdf9f7, #fdefe8);
    }
    .num-left1{
        width: 150px;
        height: 30px;
        border-radius: 40px;
        text-align: center;
        line-height: 30px;
        color: white;
        font-size: 16px;
        background-color: #d0021b;
        margin: 30px auto;
    }
    .num-left1>span{
        margin-left: 5px;
    }
    .num-left2{
        width: 202px;
        height: 505px;
        padding-top: 32px;
        background-color: white;
        margin: 0 auto;
    }
    .left2-div1{
         width: 118px;
        height: 118px;
        margin: 0 auto 15px;
        border: solid 1px #d8d8d8;
    }
    .left2-div1>img{
        width: 118px;
        height: 118px;
    }
    .left2-div2{
        width: 170px;
        border-top:1px dotted yellow;
        margin: 0 auto 15px;
    }
    .left2-div3{  
        height: 25px;
        text-align: center;
        font-size: 18px;
        margin-bottom: 12px;
    }
    .left2-div4{  
        height: 20px;
        text-align: center;
        font-size: 14px;
        color: #f96006;
        margin-bottom: 16px;
    }
    .left2-div5{  
        height: 20px;
        text-align: center;
        font-size: 14px;
        margin-bottom: 16px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .left2-div6{
        height: 20px;
        text-align: center;
        font-size: 14px;
        margin-bottom: 12px;
    }
    .left2-div6>span:nth-of-type(1){
        display: inline-block;
        width: 88px;
        text-align: right;
    }
    .num-right{
        margin-bottom: 32px;
    }
    .num-right>div{
        width: 648px;
        height: 160px;
        border:1px solid #d8d8d8;
        border-top:none;
    }
    .num-right>div:first-child{
        border-top:1px solid #d8d8d8;
    }
    .num-right>div>div{
        float: left;
        height: 120px;
        margin-top: 20px;
    }
    .num1{
        width: 118px;
        height: 118px;
        border: solid 1px #d8d8d8;
        margin: 0 16px;
    }
    .num1>img{
        width: 119px;
        height: 119px;
    }
    .num2{
        width: 359px;
        height: 120px;
        border-right:1px dotted #d8d8d8;
    }
    .num2>div:nth-of-type(1){
        float: left;
        width: 160px;
        margin-right: 14px;
    }
    .num2>div:nth-of-type(1)>div{
        margin-bottom: 12px;
        font-size: 14px;
         overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .num2-div1{
        font-size: 18px!important;
        margin-bottom: 7px!important;
    }
    .num2-div2{
        color: #f96006;
    }
    .num2>div:nth-of-type(2){
        float: left;
        font-size: 14px;
    }
    .num2>div:nth-of-type(2)>div{
        margin-bottom: 12px;
        color: #999990;
    }
    .num2>div:nth-of-type(2)>div>span{
        color: #333333;
        display: inline-block;
        width: 88px;
        text-align: right;
    }
    .num3{
        width: 135px;
    }
    .num3>div{
        width: 80px;
        height: 32px;
        border-radius: 4px;
        border: solid 1px #f96006;
        background-color: #fbefe9;
        margin: 0 auto;
        text-align: center;
        line-height: 32px;
        color: #f96006;
        cursor: pointer;
    }
    .num3>div:nth-of-type(1){
        margin-top: 15px;
        margin-bottom: 26px;
    }
</style>
