<template>
  <div class="brandDetail-container">
   <Top></Top>
   <Fix></Fix>
   <div class="brandDetail-box">
     <!-- 详情 -->
     <div class="brandDetail-box-details">
       <div class="brandDetail-box-details-main">
         <div class="brandDetail-box-details-main-left">
           <div>
             <img :src="GLOBAL.base_url + brand_img" alt="">
           </div>
           <div>
             <img v-if="collect_show" src="/static/images/wjx2.png" alt="">
             <span v-if="collect_show" @click="collect1">收藏</span>
             <img v-if="!collect_show" src="/static/images/wjx1.png" alt="">
             <span v-if="!collect_show" @click="collect2">已收藏</span>
             <img src="/static/images/jk1.png" alt="">
             <span>监控</span>
           </div>
         </div>
         <div class="brandDetail-box-details-main-rigth">
            <div>{{brand_name}}</div>
            <div class="divSpan">
              <span class="mr72">类别：</span>
              <span class="w270">{{brandClass?brandClass:'无'}}</span>
              <span class="mr54">注册号：</span>
              <span class="w336">{{reg_num?reg_num:'无'}}</span>
            </div>
            <div class="divSpan">
              <span>初审公告期号：</span>
              <span class="w270">{{PreAnnouncementPeriod?PreAnnouncementPeriod:'无'}}</span>
              <span>初审公告日期：</span>
              <span class="w336">{{PreAnnouncementDate?PreAnnouncementDate:'无'}}</span>
            </div>
            <div class="divSpan">
              <span>注册公告期号：</span>
              <span class="w270">{{AnnouncementPeriod?AnnouncementPeriod:'无'}}</span>
              <span>注册公告日期：</span>
              <span class="w336"> {{Ggdate?Ggdate:'无'}}</span>
             </div>
            <div class="divSpan">
              <span class="mr36">法律状态：</span>
              <span class="w270">{{brandStatus?brandStatus:'无'}}</span>
              <span class="mr18">专用权期限：</span>
              <span class="w336">{{brandTime}}</span>
            </div>
            <div class="divSpan">
              <span class="mr36">当前群组：</span>
              <span class="w604 cc" :title="detail_type">{{detail_type}}</span>
            </div>
            <div class="h0 divSpan">
              <span class="mr9">商品/服务项：</span>
              <span class="w604 c1" :title="detail_name">{{detail_name}}</span>
            </div>
         </div>
       </div>
       <!-- 价格 -->
       <div class="brandDetail-box-details-price">
         <span>出售价格：</span>
         <span>¥{{price}}</span>
         <span @click="inquiry">求购咨询</span>
       </div>
     </div>
     <!-- 交易流程 -->
     <div class="brandDetail-box-title">交易流程</div>
     <div class="brandDetail-box-img1">
       <img src="/static/images/jylc.png" alt="">
     </div>
     <!-- 所需材料 -->
     <div class="brandDetail-box-cl">
        <div class="brandDetail-box-title">所需材料</div>
        <div class="brandDetail-box-img1 p0">
          <img src="/static/images/jycl.png" alt="">
        </div>
     </div>
     <!-- 服务保障 -->
     <div class="brandDetail-box-title">服务保障</div>
     <div class="brandDetail-box-img2">
       <ul>
         <li>
           <img src="/static/images/fw1.png" alt="">
           <p>买家卖家·精准匹配</p>
           <p>通过大数据精准分析</p>
           <p>为每个商标找到精准买家</p>
         </li>
         <li>
           <img src="/static/images/fw2.png" alt="">
           <p>价格透明·拒绝加价</p>
           <p>由卖方持有人直接报价</p>
           <p>拒绝中间商赚高额差价</p>
         </li>
         <li>
           <img src="/static/images/fw3.png" alt="">
           <p>海量标源，发布需求</p>
           <p>拥有百万出售标源</p>
           <p>还可以根据需要主动发布求购需求</p>
         </li>
         <li>
           <img src="/static/images/fw4.png" alt="">
           <p>交易保障，买卖无忧</p>
           <p>完善的交易保障体系</p>
           <p>让买卖双方可以放心交易</p>
         </li>
       </ul>
     </div>
   </div>
    <!-- 求购咨询弹框 -->
    <div class="brandBuy-inquiry" v-if="inquiry_show">
      <div class="brandBuy-inquiry-box">
        <div @click="cha">
          <img src="/static/images/cha2.png" alt="">
        </div>
        <div>求购咨询</div>
        <div class="divSpan1">
          <span>商标名称</span>
          <span>{{brand_name}}</span>
        </div>
        <div class="divSpan1">
          <span>商标类别</span>
          <span>{{brandClass}}</span>
        </div>
        <div class="divSpan1">
          <span>商标报价</span>
          <span>{{price}}</span>
        </div>
        <div class="divInput1">
          <span>您的姓名</span>
          <input type="text" v-model="name">
        </div>
        <div class="divInput1">
          <span>联系方式</span>
          <input type="text" v-model="telephone" maxlength="14" onkeyup="value=value.replace(/[^\d\-\d]/g,'')">
        </div>
        <div class="divInput1">
          <span>您的报价</span>
          <input type="text" v-model="prices" onkeyup="value=value.replace(/[^\d\.]/g,'')">
        </div>
        <p class="brandBuy-p">注：提交后，将有我们专业人员联系您</p>
        <P class="brandBuy-p1" @click="submit">提交</P>
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
    name:'brandDetail',
    components: {
      Top,
      Foot,
      Fix
    },
    data(){
      return{
        inquiry_show:false,
        brandClass:'',
        reg_num:'',
        PreAnnouncementPeriod:'',
        AnnouncementPeriod:'',
        price:'',
        brandStatus:'',
        detail_name:'',
        Ggdate:'',
        PreAnnouncementDate:'',
        collect_show:true,
        bc_id:'',
        brandTime:'',
        detail_type:'',
        brand_name:'',
        name:'',
        telephone:'',
        prices:'',
        c_id:'',
        brand_img:''
      }
    },
    methods:{
    //弹框
      tip(type,msg){
        return this.$message({
            type:type,
            message:msg,
            showClose:true,
            duration:3000
        })
      },
      // 求购质询弹框
      inquiry(){
        this.inquiry_show = true
      },
      cha(){
        this.inquiry_show = false
      },
      getData(){
        this.$http.post(this.GLOBAL.base_url+'/api/deatDetail',{
          user_id:this.$cookie.getCookie('u_id'),
          brand_id:this.$route.query.id
        }).then( res => {
          // console.log(res)
          this.brand_img = res.data[0].data.brand_img
          if(res.data[0].data.one_cate >= 10) {
            this.brandClass = res.data[0].data.one_cate + '类 ' + res.data[0].data.cate_name
          }
          if(res.data[0].data.one_cate < 10) {
            this.brandClass ='0' + res.data[0].data.one_cate + '类 ' + res.data[0].data.cate_name
          }
          this.reg_num = res.data[0].data.reg_num
          this.PreAnnouncementPeriod = res.data[0].data.PreAnnouncementPeriod
          this.AnnouncementPeriod = res.data[0].data.AnnouncementPeriod
          this.price = res.data[0].data.price
          this.brandStatus = res.data[0].data.BrandStatus
          this.detail_name = res.data[0].data.detail_name
          this.Ggdate = res.data[0].data.Ggdate
          this.PreAnnouncementDate = res.data[0].data.PreAnnouncementDate
          if(res.data[0].data.Ggdate == null && res.data[0].data.EffectiveEndDate == '') {
            this.brandTime = '无'
          }else {
            this.brandTime = res.data[0].data.Ggdate + '-' + res.data[0].data.EffectiveEndDate
          }
          this.detail_type = res.data[0].data.detail_type
          if(res.data[0].data.brand_name == null || res.data[0].data.brand_name == '') {
            this.brand_name = '图形'
          }else {
            this.brand_name = res.data[0].data.brand_name
          }
          this.c_id = res.data[0].data.id
        })
      },
      // 判断是否收藏
      collect() {
        this.$http.post(this.GLOBAL.base_url+'/api/isCollect',{
          user_id:this.$cookie.getCookie('u_id'),
          brand_id:this.$route.query.id
        }).then(res => {
          // console.log(res)
          if(res.data.is_collect == '0') {
            this.collect_show = true
          }
          if(res.data.is_collect == '1') {
            this.collect_show = false
          }
          this.bc_id = res.data.bc_id
        })
      },
      collect1() {
        this.$http.post(this.GLOBAL.base_url+'/api/delBrandCollect',{
          user_id:this.$cookie.getCookie('u_id'),
          type:1,
          brand_id:this.$route.query.id,
          n_id:this.bc_id
        }).then(res => {
          // console.log(res)
          if(res.data.code == '1') {
            this.tip('success','收藏成功')
            this.collect()
          }else {
            this.tip('error','收藏失败')
          }
        })
      },
      collect2() {
        this.$http.post(this.GLOBAL.base_url+'/api/delBrandCollect',{
          user_id:this.$cookie.getCookie('u_id'),
          type:2,
          brand_id:this.$route.query.id,
          n_id:this.bc_id
        }).then(res => {
          // console.log(res)
          if(res.data.code == '1') {
            this.tip('success','取消收藏成功')
            this.collect()
          }
          if(res.data.code == '0'){
            this.tip('error','取消收藏失败')
          }
        })
      },
      // 提交
      submit() {
        if(this.name == '') {
          this.tip('error','请填写您的名字')
        }else if(this.telephone == '') {
          this.tip('error','请填写您的联系方式')
        }else if(this.prices == '') {
          this.tip('error','请填写您的报价')
        }else {
          this.$http.post(this.GLOBAL.base_url+'/api/addConsult',{
            user_id:this.$cookie.getCookie('u_id'),
            b_id:this.c_id,
            name:this.name,
            contact_way:this.telephone,
            price:this.prices
          }).then(res => {
            // console.log(res)
            if(res.data.code == 1) {
              this.tip('success','您已提交成功！')
              this.inquiry_show = false
              this.name = ''
              this.telephone = ''
              this.prices = ''
            }
            if(res.data.code == 0) {
              this.tip('error',res.data.msg)
              this.inquiry_show = false
              this.name = ''
              this.telephone = ''
              this.prices = ''
            }
          })
        }
      }
    },
    mounted(){
      this.getData()
      this.collect()
    }
  }
</script>

<style scoped>
  .brandDetail-container {
    position: relative;
  }
  .brandDetail-box {
    background-color: #fafafa;
    font-family: 'PingFangSC';
  }
  /* 详情 */
  .brandDetail-box-details {
    height: 466px;
    background-color: #fff;
    padding-top: 36px;
    box-sizing: border-box;
  }
  .brandDetail-box-details-main {
    width: 1200px;
    margin: 0 auto;
    height: 344px;
  }
  .brandDetail-box-details-main-left {
    float: left;
    height: 344px;
    width: 270px;
    border: 1px solid #e6e6e6;
    box-sizing: border-box;
  }
  .brandDetail-box-details-main-left > div:nth-child(1) {
    width: 270px;
    height: 270px;
    padding: 30px;
    box-sizing: border-box;
  }
  .brandDetail-box-details-main-left > div:nth-child(1) > img{
    width: 210px;
    height: 210px;
  }
  .brandDetail-box-details-main-left > div:nth-child(2) {
    width: 270px;
    height: 64px;
    border-top: 1px solid #e6e6e6;
    line-height: 64px;
    padding: 0 48px;
    box-sizing: border-box;
  }
  .brandDetail-box-details-main-left > div:nth-child(2) > span:nth-child(1) {
    font-size: 16px;
  }
  .brandDetail-box-details-main-left > div:nth-child(2) > img:nth-child(1){
    vertical-align: middle;
  }
  .brandDetail-box-details-main-left > div:nth-child(2) > span:nth-child(2) {
    font-size: 14px;
    margin-right: 49px;
    color: #555;
    vertical-align: middle;
    cursor: pointer;
  }
  .brandDetail-box-details-main-left > div:nth-child(2) > img {
    width: 16px;
    height: 16px;
    margin: 0px 4px 0 0;
    vertical-align: middle;
  }
  .brandDetail-box-details-main-left > div:nth-child(2) > span:nth-child(4) {
    vertical-align: middle;
    font-size: 14px;
    color: #555;
  }
  .brandDetail-box-details-main-rigth {
    float: left;
    width: 854px;
    height: 344px;
    border-bottom: 1px solid #f96006;
    box-sizing: border-box;
    margin-left: 36px;
  }
  .brandDetail-box-details-main-rigth > div {
    margin-bottom: 16px;
    width: 100% ;
  }
  .brandDetail-box-details-main-rigth > div > span {
    /* display: inline-block; */
    float: left;
  }
  .brandDetail-box-details-main-rigth > div:nth-child(1) {
    font-size: 32px;
    color: #333;
    font-weight: 500;
  }
  .divSpan {
    height: 24px;
  }
  .h0{
    height: 0px;
  }
  .divSpan > span:nth-child(odd){
    font-size: 18px;
    font-weight: normal;
    color: #434343;
  }
  .divSpan > span:nth-child(even){
    font-size: 18px;
    font-weight: 100;
    color: #333;
  }
  .w270 {
    width: 270px;
  }
  .mr72 {
    margin-right: 72px;
  }
  .mr36 {
    margin-right: 36px;
  }
  .w336 {
    width: 330px;
    margin-bottom: 16px;
  }
  .w604 {
    width: 604px;
    margin-bottom: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    line-clamp: 2 ;
    -webkit-box-orient: vertical;
  }
  .mr9 {
    margin-right: 9px;
  }
  .mr54 {
    margin-right: 54px;
  }
  .mr18 {
    margin-right: 18px;
  }
  /* 价格 */
  .brandDetail-box-details-price {
    width: 1200px;
    margin: 22px auto;
    height: 36px;
    line-height: 36px;
    padding-left: 302px;
    box-sizing: border-box;
  }
  .brandDetail-box-details-price > span {
    float: left;
  }
  .brandDetail-box-details-price > span:nth-child(1) {
    float: left;
    font-size: 18px;
    font-weight: normal;
    color: #434343;
  }
  .brandDetail-box-details-price > span:nth-child(2) {
    float: left;
    font-size: 24px;
    font-weight: 600;
    color: #f96006;
    margin-left: 41px;
  }
  .brandDetail-box-details-price > span:nth-child(3) {
    float: right;
    width: 120px;
    height: 36px;
    border-radius: 4px;
    background-color: #fbefe9;
    border: solid 1px #f96006;
    color: #f96006;
    line-height: 36px;
    text-align: center;
    margin-right: 37px;
    cursor: pointer;
  }
  /* 交易流程 */
  .brandDetail-box-title {
    width: 1200px;
    margin: 24px auto;
    font-size: 30px;
    font-weight: 600;
    color: #333;
    margin-bottom: 36px;
  }
  .brandDetail-box-img1 {
    width: 1200px;
    margin: 0 auto;
    height: 430px;
    padding: 36px 20px ;
    box-sizing: border-box;
    background-color: #fff;
  }
  /* 所需材料 */
  .brandDetail-box-cl {
    width: 100%;
    height: 502px;
    background-color: #fff;
    margin-top: 36px;
    padding-top: 1px;
    box-sizing: border-box;
  }
  .p0 {
    padding: 0 !important;
    height: 360px !important;
  }
  /* 服务保障 */
  .brandDetail-box-img2 {
    width: 1200px;
    margin: 0 auto;
    background-color: #fff;
    height: 322px;
    padding: 36px 29px 36px 25px;
    box-sizing: border-box;
  }
  .brandDetail-box-img2 > ul > li {
    float: left;
    text-align: center;
  }
  .brandDetail-box-img2 > ul > li > img {
    margin-bottom: 41px;
  }
  .brandDetail-box-img2 > ul > li > p:nth-child(2) {
    margin-bottom: 8px;
    font-weight: 600;
    font-size: 20px;
    color: #333;
  }
  .brandDetail-box-img2 > ul > li > p:nth-child(3) {
    font-size: 18px;
    font-weight: 100;
    color: #323232;
  }
  .brandDetail-box-img2 > ul > li > p:nth-child(4) {
    font-size: 18px;
    font-weight: 100;
    color: #323232;
  }
  .brandDetail-box-img2 > ul > li:nth-child(1) {
    width: 198px;
  }
  .brandDetail-box-img2 > ul > li:nth-child(2) {
    width: 180px;
    margin-left: 127px;
  }
  .brandDetail-box-img2 > ul > li:nth-child(3) {
    width: 270px;
    margin-left: 87px;
  }
  .brandDetail-box-img2 > ul > li:nth-child(4) {
    width: 198px;
    margin-left: 86px;
  }
  /* 求购咨询弹框 */
  .brandBuy-inquiry {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    position: absolute;
    top: 0;
  }
  .brandBuy-inquiry-box {
    width: 600px;
    height: 502px;
    background-color: #fff;
    margin: -190px 0 0 -300px ;
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 9999;
    padding: 17px 16px 0 0;
  }
  .brandBuy-inquiry-box > div:nth-child(1) {
    float: right;
    cursor: pointer;
    height: 14px;
  }
  .brandBuy-inquiry-box > div:nth-child(2) {
    text-align: center;
    margin-top: 14px;
    margin-bottom: 22px;
  }
  .divSpan1 {
    margin-left: 106px;
    margin-bottom: 36px;
  }
  .divSpan1 > span:nth-child(1) {
    margin-right: 16px;
    font-size: 14px;
    color: #333;
  }
  .divSpan1 > span:nth-child(2) {
    font-size: 14px;
    color: #333;
    font-weight: 300;
  }
  .divInput1 {
    margin-left: 106px;
    height: 24px;
    line-height: 24px;
    margin-bottom: 24px;
  }
  .divInput1 > span:nth-child(1) {
    margin-right: 16px;
    font-size: 14px;
    color: #333;
  }
  .divInput1 > input {
    width: 300px;
    height: 32px;
    border-radius: 4px;
    border: solid 1px #d6d6d6;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .brandBuy-p {
    font-size: 10px;
    text-align: center;
    color: #f96006;
    margin-bottom: 16px;
  }
  .brandBuy-p1 {
    font-size: 14px;
    text-align: center;
    width: 108px;
    height: 36px;
    line-height: 36px;
    border-radius: 4px;
    margin: 0 auto;
    background-color: #f96006;
    color: #fff;
    cursor: pointer;
  }
  .cr {
    color: red;
  }
  .cc {
    height: 24px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .c1 {

    display: -webkit-box;
  }
</style>
