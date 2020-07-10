<template>
  <div class="patentDetail-container">
    <div class="patentDetail-box">
      <div class="patentDetail-box-orderInfo">订单信息</div>
      <!-- 详细信息 -->
      <div class="patentDetail-box-infor">
        <div>
          <div>
            <span>订单号:</span>
            <span>{{patent_id}}</span>
          </div>
          <div>
            <span>订单状态:</span>
            <span>{{patent_status}}</span>
          </div>
          <div>
            <span>支付方式:</span>
            <span>{{pay_typeName}}</span>
          </div>
          <div>
            <span>收件人:</span>
            <span>{{consignee}}</span>
          </div>
        </div>
        <div>
          <div>
             <span>业务名称:</span>
             <span>{{good_name}}</span>
          </div>
          <div>
             <span>下单时间:</span>
             <span>{{created_at}}</span>
          </div>
          <div>
             <span>优惠券金额:</span>
             <span>{{coupon}}</span>
          </div>
          <div>
             <span>联系电话:</span>
             <span>{{patent_mobile}}</span>
          </div>
        </div>
        <div>
          <div>
            <span>服务类型:</span>
            <span>{{click_type}}</span>
          </div>
          <div>
            <span>订单金额:</span>
            <span>RMB,{{total_price}}</span>
          </div>
          <div>
            <span>实付金额:</span>
            <span>RMB,{{real_total}}</span>
          </div>
          <div>
            <span>收货地址:</span>
            <span>{{place}}</span>
          </div>
        </div>
      </div>
      <div style="clear: both;"></div>
      <!-- 专利信息头部 -->
      <div class="patentDetail-box-changeTitle">
        <div :class="change">
          <div class="div1" @click="tab('infor')">专利信息</div>
          <div class="div2" @click="tab('about')">关联业务</div>
        </div>
      </div>
      <!-- 专利详细信息 -->
      <div class="patentDetail-box-tradeMark" v-show="show1">
        <div class="patentDetail-box-image">
          <div>
            <span>专利名称:</span>
            <span>{{patent_name}}</span>
          </div>
          <div>
            <span>当前专利状态:</span>
            <span>{{status}}</span>
          </div>
        </div>
        <div style="clear:both;"></div>
        <div class="patentDetail-box-information">
          <span class="span1">申请号:</span>
          <span class="span2">{{regist_num}}</span>
          <span>申请人名称:</span>
          <span class="span3">{{apply_name}}</span>
          <span>申请人地址:</span>
          <span>{{apply_address}}</span>
        </div>
        <div class="patentDetail-box-information">
          <span class="ml40">申请日期:</span>
          <span class="span2">{{create_time}}</span>
          <span class="ml25">发明人:</span>
          <span class="span3">{{invent_name}}</span>
          <span>申请公布号:</span>
          <span>{{apply_no}}</span>
        </div>
         <div class="patentDetail-box-information">
          <span class="ml28">申请公布日:</span>
          <span class="span2">{{apply_time}}</span>
          <span class="ml25">分类号:</span>
          <span class="span3">{{classify_num}}</span>
          <span class="ml21">授权日期:</span>
          <span>{{auth_time}}</span>
        </div>
      </div>
      <!-- 关联业务 -->
      <div class="patentDetail-box-risk" v-show="show2">
        <div class="patentDetail-box-risk-title">
            <span>业务名称</span>
            <span>办理时间</span>
            <span>订单编号</span>
        </div>
        <div class="patentDetail-box-planDetail">
          <el-timeline>
              <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.date">
              {{activity.click_type}}
              <span>{{activity.order_id}}</span>
              </el-timeline-item>
          </el-timeline>
        </div>
      </div>
      <!-- 订单进度 -->
      <!-- <div class="patentDetail-box-rate">订单进度</div> -->
      <!-- 进度条 -->
      <!-- <div class="patentDetail-box-pragrom">
        <div class="patentDetail-box-pragrom-div1">
          <div class="patentDetail-box-pragrom-div2" :style="{width:progress+'%'}"></div>
        </div>
        <div class="patentDetail-box-pragrom-div3">
          <div class="patentDetail-box-pragrom-div3-title">
                      <span v-for="(v,k) in title" @mouseenter="enter(k)" @mouseleave="leave()" :key="k">{{v.item}}</span>
          </div>
          <div class="patentDetail-box-pragrom-div3-list">
            <div  v-for="(item,index) in 4" v-show="seen&&index==current" :key="index">
               <p  class='p1' v-for="(m,n) in patentDetailp" v-if='order_schedule >= Number(current)+1' :key="n">{{m}}</p>
               <p class='p2'  v-for="(m,n) in patentDetailp" v-if='order_schedule < Number(current)+1' :key="n">{{m}}</p>
            </div>
          </div>
        </div>
      </div> -->
      <!-- 相关文件信息 -->
      <!-- <div class="patentDetail-box-file"  >
        <div class="patentDetail-box-file-infor">相关文件信息</div>
        <div class="patentDetail-box-file-wrap" >
          <div class="patentDetail-box-file-top" v-for="(item,k) in files" :key="k">
            <div class="patentDetail-box-file-top-img"></div>
            <div class="patentDetail-box-file-top-div" >
              <div>{{item.name}}</div>
              <div>
                <a :href="GLOBAL.base_url + item.path " target="_blank" >预览</a>
                <a :href="GLOBAL.base_url+'/api/patent/downloadFile'+item.path">下载</a>
              </div>
            </div>
          </div>
        </div>
        <div style="clear:both;"></div>
      </div> -->
      <!-- 相关业务推荐 -->
      <div class="patentDetail-box-suggest">
              <div class="patentDetail-box-suggest-top">关联业务推荐</div>
              <div class="patentDetail-box-suggest-detail">
                  <div v-for="(v,k) in recommend" @click="totrade(v.pid,v.id,v.cate_id)" :key="k">
                      <img :src="GLOBAL.base_url+v.icon" alt="">
                      <p>{{v.title}}</p>
                      <p>{{Number(v.price)+Number(v.service_price)}}</p>
                  </div>
              </div>
      </div>
      <div style="clear:both;"></div>
      <!--申请退款 -->
      <div class="patentDetail-box-refund" v-show="refundshow">
              <div>退款信息</div>
              <div @click="backdraw">申请退款 ></div>
      </div>
      <div class="drawback" v-show="backshow">
              <div class="drawback-div">
                  <img src="/static/images/patentDetailcha.png" alt="" @click="ordercha">
                  <div>
                    <div class="back-div1">申请退款</div>
                    <div class="back-div2">
                        <span>退款方式</span>
                        <span>{{pay_typeName}}</span>
                    </div>
                    <div class="back-div3">
                        <span>退款账号</span>
                        <input type="text" v-model="refundcount">
                    </div>
                    <div class="back-div4">
                        <div>退款原因</div>
                        <div>
                            <textarea name="" id="" class="write" v-model="refundreason"></textarea>
                        </div>
                    </div>
                    <div class="back-div5" @click="refundsubmit">提交</div>
                  </div>
              </div>
      </div>
      <div class="order-refund-status" v-show="refundstatus">
             <div>退款信息</div>
             <div>
                 <div>
                     <span>申请退款金额:</span>
                     <span>￥{{real_total}}</span>
                 </div>
                 <div>
                     <span>实际退款金额:</span>
                     <span>￥{{total_price}}</span>
                 </div>
                 <div>
                     <span>退款方式:</span>
                     <span>{{pay_typeName}}</span>
                 </div>
                 <div>
                     <span>退款状态:</span>
                     <span>{{patent_status}}</span>
                 </div>
             </div>
      </div>
    </div>
    <div style="clear:both;"></div>
  </div>

</template>

<script>
export default {
  name: 'copyrightDetailed',
  data(){
      return{
        good:'',
        type:'',
        fileshow:Boolean,
        //  判断鼠标移入消失隐藏
        seen:false,
        current:0,
        activities: [],
        change:'infor',
        show1:true,
        show2:false,
        progress:Number,
        title:[{
            item:'付款阶段'
        },{
            item:'材料准备阶段'
        },{
            item:'官方审核阶段'
        },{
            item:'下发'
        }],
        // 订单信息字段
        patent_id:'',
        patent_status:'',
        pay_type:'',
        pay_typeName:'',
        consignee:'',
        good_name:'',
        created_at:'',
        coupon:'',
        patent_mobile:'',
        click_type:'',
        total_price:'',
        real_total:'',
        place:'',
        // 订单进度框里面的内容
        patentDetail:[],
        patentDetailp:[],
        // 专利信息里的字段
        patent_name:'',
        regist_num:'',
        apply_name:'',
        apply_address:'',
        invent_name:'',
        create_time:'',
        apply_no:'',
        apply_time:'',
        auth_time	:'',
        classify_num:'',
        status:'',
        brand_upload:{},
        three_cate:[],
        // 相关文件信息
        files:[],
        natice_acceptance:'',
        natice_acceptances:'',
        // 退款弹窗
        backshow:false,
        // 判断退款和退款状态显示隐藏
        refundshow:false,
        refundstatus:false,
        // 退款账号
        refundcount:'',
        // 退款原因
        refundreason:'',
        // 实际退款金额
        reality_amount:'',
        // 申请退款金额
        refund_amount:'',
        // 合同
        contract:'',
        // 推荐业务
        recommend:[]
      }
  },
  components: {
  },
  methods:{
    tip(type,msg){
          return this.$message({
              type:type,
              message:msg,
              showClose:true,
              duration:1500
          })
    },
    tab(item){
          this.change = item;
          if(this.change == "infor"){
              this.show1 = true;
              this.show2 = false;
          }else if(this.change == "about"){
              this.show1 = false;
              this.show2 = true;
          }
    },
    enter(index){
        this.seen = true;
        this.current = index;
        this.patentDetailp = this.patentDetail[index +1];
    },
    leave(){
      this.seen = false;
      this.current = null;
    },
    backdraw(){
        this.backshow = true;
    },
    ordercha(){
        this.backshow = false;
    },
    totrade(val1,val2,val3){
        this.$router.push({
            path:'/copyrightDetail',
            query:{
                id:val1,
                secondid:val2,
                patentId:val3
            }
        })
    },
    //   退款
    refundsubmit(){
        if(this.refundcount == ''){
          return false;
        }else if(this.refundreason == ''){
          return false;
        }else{
            this.$http.post(this.GLOBAL.base_url+'/api/copyRight/orderReturn',{
                 id:this.$route.query.id,
                 user_id:this.$cookie.getCookie('u_id'),
                 type:this.pay_type,
                 account:this.refundcount,
                 remark:this.refundreason
            }).then(res=>{
                // console.log(res)
                if(res.data.code == "1"){
                    this.backshow = false;
                    this.tip('success','您的退款已提交')
                    this.$router.go(0);
                }
            })
        }
    },
    // 获取数据
    getdata(){
          this.$http.post(this.GLOBAL.base_url+'/api/copyRight/orderDetail',{
                 id:this.$route.query.id,
                 user_id:this.$cookie.getCookie('u_id')
            }).then(res=>{
                console.log(res)
               if(res.data.code == "1"){
                this.brand_upload = res.data.brand_upload;
                  // 订单信息
                  this.patent_id=res.data.data.order.order_id;
                  this.patent_status=res.data.data.order.status;
                  this.pay_type=res.data.data.order.pay_type;
                  this.pay_typeName =res.data.data.order.pay_typeName
                  this.consignee=res.data.data.order.consignee;

                  this.good_name=res.data.data.order.good_name;
                  this.created_at=res.data.data.order.created_at;
                  this.coupon=res.data.data.order.coupon;
                  this.patent_mobile=res.data.data.order.mobile;

                  this.click_type=res.data.data.order.click_type;
                  this.total_price = res.data.data.order.total_price;
                  this.real_total=res.data.data.order.real_total;
                  this.place = res.data.data.order.place;
                  // 专利信息
                  this.patent_name = res.data.data.detail.patent_name
                  this.regist_num = res.data.data.detail.regist_num

                  this.apply_name = res.data.data.detail.apply_name
                  this.apply_address = res.data.data.detail.apply_address
                  this.invent_name = res.data.data.detail.invent_name

                  this.create_time = res.data.data.detail.create_time
                  this.apply_no = res.data.data.detail.apply_no
                  this.apply_time = res.data.data.detail.apply_time

                  this.auth_time	 = res.data.data.detail.auth_time
                  this.classify_num = res.data.data.detail.classify_num
                  this.status = res.data.data.detail.status
                  // 订单进度
                  // this.patentDetail = res.data.data.schedule.list
                  // this.order_schedule = res.data.data.schedule.id
                  if(this.order_schedule == 1){
                      this.progress = 25;
                  }
                  if(this.order_schedule == 2){
                      this.progress = 50;
                  }
                  if(this.order_schedule == 3){
                      this.progress = 75;
                  }
                  if(this.order_schedule == 4){
                      this.progress = 100;
                  }
                  // 相关业务推荐
                  this.recommend = res.data.data.buss
                  // console.log(this.recommend)
                  // 相关信息
                  this.files = res.data.data.files
                  if(res.data.data.order.status == '已支付' || res.data.data.order.status == '资料已提交' || res.data.data.order.status == '资料审核不通过'){
                    this.refundshow = true
                  }
                  if(res.data.data.order.status == '退款待审核' || res.data.data.order.status == '退款审核中' || res.data.data.order.status == '退款审核通过' || res.data.data.order.status == '退款审核不通过'){
                    this.refundstatus = true
                  }
                  // console.log(this.files)
                  // for( let i =0; i<this.files.length; i++) {
                  //   this.natice_acceptance = this.files[i].path
                  // }
                  // console.log(this.natice_acceptance)
                  // this.natice_acceptances = this.files.path
               }
            })
    },
    //  获取服务信息
    // getdatatype(){
    //       if(this.regid!=''&&this.intcls!=''&&this.good != "商标注册"){
    //               this.$http.get(this.GLOBAL.base_url+'/app/getdataone',{params:{
    //                    regid:this.regid,
    //                    intcls:this.intcls
    //                 }}).then(res=>{
    //                         if(res.data.code == "1"){
    //                             this.three_cate = res.data.data;
    //                         }
    //                 })
    //           }
    // }
  },
  created(){
      this.getdata();
  },
  mounted(){
      this.good = this.$route.query.good_name;
      this.type = this.$route.query.click_type;

  }
}

</script>

<style scoped>
    .patentDetail-box{
        width: 1015px;
        margin: 12px 0px 0px 16px;
        float: left;
        background-color: #fff;
        padding-top: 44px;
        box-sizing: border-box;
        min-height: 1108px;
    }
    .patentDetail-box-orderInfo{
        width: 734px;
        height: 32px;
        line-height: 32px;
        font-family: "PingFangSC";
        font-size: 14px;
        font-weight: 500;
        color: #000000;
        border-bottom: 1px solid #d8d8d8;
        margin-left: 64px;
    }
    .patentDetail-box-infor{
        margin-bottom: 54px;
        margin-left: 64px;
    }
    .patentDetail-box-infor>div{
        float: left;
    }
    .patentDetail-box-infor>div:nth-of-type(1){
        margin: 16px 60px  0 36px;
    }
    .patentDetail-box-infor>div:nth-of-type(2){
        margin: 16px 60px  0 0;
    }
    .patentDetail-box-infor>div:nth-of-type(3){
        margin-top: 16px;
    }
    .patentDetail-box-infor>div>div{
        margin-bottom: 24px;
    }
    .patentDetail-box-infor>div>div>span:nth-of-type(1){
        font-family: "PingFangSC";
        font-size: 14px;
        font-weight: 500;
        color: #333333;
    }
    .patentDetail-box-infor>div>div>span:nth-of-type(2){
        font-family: "PingFangSC";
        font-size: 14px;
        color: #999999;
    }
    .patentDetail-box-changeTitle{
        width: 743px;
        height: 32px;
        margin-bottom: 24px;
        border-bottom:1px solid #d8d8d8;
        margin-top: 64px;
        margin-left: 66px;
    }
    .patentDetail-box-changeTitle>div>div{
        float: left;
        height: 32px;
        line-height: 32px;
        text-align: center;
        font-family: "PingFangSC";
        font-size: 14px;
        color: #999999;
        cursor: pointer;
    }
    .patentDetail-box-changeTitle>div>div:nth-of-type(1){
        margin: 0 30px 0 0px;
    }
    .infor .div1,.about .div2{
        border-bottom:1px solid #f96006;
        font-family: "PingFangSC";
        font-size: 14px;
        font-weight: 500;
        color: #000000;
    }
    .patentDetail-box-tradeMark{
        width: 780px;
        margin-bottom: 54px;
        margin-left: 66px;
    }
    .patentDetail-box-image>div{
        float: left;
    }
    .patentDetail-box-image>div:nth-of-type(1){
        font-family: "PingFangSC";
        font-size: 14px;
        font-weight: 500;
        margin-left: 35px;
        color: #333333;
    }
    .patentDetail-box-image>div:nth-of-type(1)>span:nth-child(1){
        font-family: "PingFangSC";
        font-size: 14px;
        font-weight: 500;
        margin-left: 6px;
        color: #333333;
    }
    .patentDetail-box-image>div:nth-of-type(1) > span:nth-child(2) {
      width: 200px;
      display: inline-block;
    }
    .patentDetail-box-image>div:nth-of-type(2){
        margin-left: 230px;
    }
    .patentDetail-box-image>div:nth-of-type(2)>span{
        font-family: "PingFangSC";
        font-size: 14px;
        font-weight: 500;
        color: #333333;
    }
    .patentDetail-box-image>div:nth-of-type(2)>span:nth-of-type(2){
        color: #f96006;
    }
    .patentDetail-box-image>div:nth-of-type(3)>span{
        font-family: "PingFangSC";
        font-size: 14px;
        font-weight: 500;
        color: #333333;
        margin-left: 7px;
    }
    .patentDetail-box-image>div:nth-of-type(3)>span:nth-of-type(2){
        color:#999990;
    }
    .patentDetail-box-information{
        margin-bottom: 24px;
        margin-top: 24px;
    }
    .patentDetail-box-information>span:nth-child(2n+1){
         font-family: "PingFangSC";
         font-size: 14px;
         font-weight: 500;
         color: #333333;
         vertical-align: middle;
    }
    .patentDetail-box-information>span:nth-child(2n){
         font-family: "PingFangSC";
         font-size: 14px;
         color: #999999;
         vertical-align: middle;
    }
    .patentDetail-box-information>span:nth-child(5){
        margin-left: 8px;
    }
    .span1{
        margin-left: 54px;
        margin-right: 6px;
    }
    .span2{
        display: inline-block;
        width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        vertical-align: middle;
    }
    .span3{
        display: inline-block;
        width: 142px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        vertical-align: middle;
    }
    .patentDetail-box-risk{
        width: 780px;
        margin-bottom: 54px;
    }
    .patentDetail-box-risk-title{
        margin-bottom: 24px;
        font-family: "PingFangSC";
        font-size: 14px;
        font-weight: 500;
        color: #333333;
    }
    .patentDetail-box-risk-title>span:nth-of-type(1){
        margin:0 204px 0 82px;
    }
    .patentDetail-box-risk-title>span:nth-of-type(2){
        margin-right:200px;
    }
   .patentDetail-box-planDetail{
       margin-left:29px;
   }
   .patentDetail-box-rate,.patentDetail-box-refund>div:nth-of-type(1){
        width: 743px;
        height: 28px;
        line-height: 28px;
        font-family: "PingFangSC";
        font-size: 14px;
        font-weight: 500;
        color: #000000;
        border-bottom: 1px solid #d8d8d8;
        margin-left: 66px;
   }
   .patentDetail-box-pragrom{
       height: 118px;
       margin-bottom: 16px;
       margin-left: 66px;
   }
   .patentDetail-box-pragrom-div1{
       margin: 36px 0 16px 22px;
       width: 720px;
       height: 6px;
       border-radius: 3px;
       background-color: #d8d8d8;
   }
   .patentDetail-box-pragrom-div2{
       height: 6px;
       border-radius: 3px;
       background-color: #f96006;
   }
   .patentDetail-box-pragrom-div3-title>span{
       font-family: "PingFangSC";
       font-size: 12px;
       color: #111111;
       cursor: pointer;
   }
   .patentDetail-box-pragrom-div3-title>span:nth-of-type(1){
       margin: 0 136px 0 78px;
   }
   .patentDetail-box-pragrom-div3-title>span:nth-of-type(3){
       margin: 0 136px;
   }
   .patentDetail-box-pragrom-div3-list{
       position: relative;
   }
   .patentDetail-box-pragrom-div3-list>div{
       position: absolute;
       width: 96px;
       text-align: center;
       background-color: #ffffff;
       box-shadow: 2px 2px 8px 0 rgba(51, 51, 51, 0.3);
   }
   .p1{
       font-family: "PingFangSC-Thin";
       font-size: 10px;
       font-weight: 100;
       color: #f96006;
       margin: 8px 0;
   }
   .p2{
       font-family: "PingFangSC-Thin";
       font-size: 10px;
       font-weight: 100;
       color: gray;
       margin: 8px 0;
   }
   .patentDetail-box-pragrom-div3-list>div:nth-of-type(1){
       left: 60px;
   }
   .patentDetail-box-pragrom-div3-list>div:nth-of-type(2){
       left: 250px;
   }
   .patentDetail-box-pragrom-div3-list>div:nth-of-type(3){
       left: 460px;
   }
   .patentDetail-box-pragrom-div3-list>div:nth-of-type(4){
       left: 650px;
   }
   .patentDetail-box-file{
       margin-bottom: 54px;
       margin-left: 66px;
   }
   .patentDetail-box-suggest-top {
     margin-left: 66px;
   }
   .patentDetail-box-file-infor,.patentDetail-box-suggest-top{
        width: 743px;
        height: 28px;
        line-height: 28px;
        font-family: "PingFangSC";
        font-size: 14px;
        font-weight: 500;
        color: #000000;
        border-bottom: 1px solid #d8d8d8;
   }
   .patentDetail-box-file-wrap{
       width: 780px;
   }
   .patentDetail-box-file-top{
       float: left;
       width: 230px;
       height: 64px;
       margin: 32px 40px 0 0;
   }
   .patentDetail-box-file-top:nth-of-type(3n){
       margin-right: 0;
   }
   .patentDetail-box-file-top>div{
       float: left;
   }
   .patentDetail-box-file-top-div>div:nth-of-type(1){
        font-family: "PingFangSC";
        font-size: 14px;
        color: #333333;
        margin: 4px 0 12px;
   }
   .patentDetail-box-file-top-div>div:nth-of-type(2)>a{
       text-decoration: none;
        font-family: "PingFangSC";
        font-size: 14px;
        color: #f96006;
        cursor: pointer;
   }
   .patentDetail-box-file-top-div>div:nth-of-type(2)>a:nth-of-type(1){
       margin-right: 30px;
   }
   .patentDetail-box-file-top-img{
        width: 64px;
        height: 64px;
        background: url("/static/images/datawrite.png") no-repeat;
        background-size: cover;
        margin-right: 10px;
   }
   .patentDetail-box-suggest{
       margin-bottom: 54px;
   }
   .patentDetail-box-suggest-detail{
       margin-top: 30px;
   }
   .patentDetail-box-suggest-detail>div{
       width: 260px;
       float: left;
       text-align: center;
       cursor: pointer;
       margin-bottom: 20px;
       margin-left: 10px;
   }
   .patentDetail-box-suggest-detail>div>img{
       width: 64px;
       height: 64px;
   }
   .patentDetail-box-suggest-detail>div>p{
        font-family: "PingFangSC";
        font-size: 16px;
        font-weight: 500;
        color: #333333;
   }
   .patentDetail-box-suggest-detail>div>p:nth-of-type(1){
       margin: 15px 0 8px;
   }
   .patentDetail-box-refund{
       margin-bottom: 160px;
       margin-top: 20px;
   }
   .patentDetail-box-refund>div:nth-of-type(2){
        font-family: "PingFangSC";
        font-size: 14px;
        color: #f96006;
        margin: 16px 0 0 66px;
        cursor: pointer;

    }
    .order-refund-status{
        margin-bottom: 160px;
        margin-top: 60px;
        margin-left: 66px;
    }
    .order-refund-status>div:nth-of-type(1){
        width: 743px;
        height: 28px;
        font-family: "PingFangSC";
        font-size: 14px;
        font-weight: 500;
        color: #000000;
        border-bottom: 1px solid #d8d8d8;
    }
    .order-refund-status>div:nth-of-type(2){
        height: 50px;
        line-height: 50px;
    }
    .order-refund-status>div:nth-of-type(2)>div{
        float: left;
        margin-right: 60px;
    }
    .order-refund-status>div:nth-of-type(2)>div>span:nth-of-type(1){
        font-size: 14px;
        font-weight: 500;
        color: #333333;
    }
    .order-refund-status>div:nth-of-type(2)>div>span:nth-of-type(2){
        font-size: 14px;
        color:#999990;
    }
    .drawback{
        background: rgba(0,0,0, 0.8);
        position: fixed;
        z-index: 20;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .drawback-div{
        width: 600px;
        height: 437px;
        background-color: #ffffff;
        position: absolute;
        top:50%;
        left: 50%;
        z-index: 30;
        transform: translate(-50%,-50%);
    }
    .drawback-div>img{
        position: absolute;
        right: 17px;
        top: 17px;
        cursor: pointer;
    }
    .drawback-div>div{
        position: absolute;
        top:30px;
        left: 112px;
        width: 390px;
    }
    .back-div1{
        font-size: 16px;
        color: #333333;
        width: 64px;
        margin: 0 auto 32px;
    }

    .back-div2{
        margin-bottom: 30px;
    }
    .back-div2>span,.back-div3>span{
        font-size: 14px;
        color: #333333;
        margin-right: 15px;
    }
    .back-div3{
        margin-bottom: 30px;
    }
    .back-div3>input{
        width: 290px;
        height: 32px;
        border-radius: 4px;
        border: solid 1px #d6d6d6;
        padding-left: 10px;
        outline: none;
    }
    .back-div4{
        height: 96px;
        margin-bottom: 33px;
    }
    .back-div4>div{
        float: left;
    }
    .back-div4>div:nth-of-type(1){
        font-size: 14px;
        color: #333333;
        margin-right: 18px;
    }
    .write{
        width: 300px;
        height: 96px;
        border-radius: 4px;
        border: solid 1px #d6d6d6;
        outline: none;
    }
    .back-div5{
        width: 108px;
        height: 36px;
        border-radius: 4px;
        background: #f96006;
        color: #ffffff;
        text-align: center;
        line-height: 36px;
        margin: 0 auto;
        font-size: 14px;
        cursor: pointer;
    }
    .ml25 {
      margin-left: 25px !important;
    }
    .ml21 {
      margin-left: 21px !important;
    }
    .ml40 {
      margin-left: 41px;
      margin-right: 6px;
    }
    .ml28{
      margin-left: 28px;
      margin-right: 6px;
    }
</style>
<style>
.el-timeline-item__node{
    background: #f97527;
}
.el-timeline-item__tail{
    border-left: 1px solid #f97527;
}
.el-timeline-item__content{
    width: 200px;
    font-family: "PingFangSC-Thin";
    font-size: 14px;
    font-weight: 100;
    color: #333333;
}
.el-timeline-item__timestamp{
    position: absolute;
    left: 280px;
    top:-8px;
}
.el-timeline-item__content>span{
    position: absolute;
    left: 540px;
    top:-5px;
    font-family: "PingFangSC";
    font-size: 14px;
    color: #999990;
}

</style>
