<template>
  <div class="buyCart-container">
      <div class="buy-box">
        <!-- 头部 -->
          <div class="buy-box-top">
              <div class="buy-box-top-div1">商标图样</div>
              <div class="buy-box-top-div2">服务类型</div>
              <div class="buy-box-top-div3">类别</div>
              <div>价格</div>
          </div>
          <!-- 中间列表 -->
          <div class="buy-box-list">
              <div v-for="(item,index) in productList" :key="index">
                <el-checkbox class="flml" v-bind:checked="item.isSelect" v-model="item.isSelect"></el-checkbox>
                  <!-- <input type="checkbox" v-bind:checked="item.isSelect" @change="item.isSelect=!item.isSelect"> -->

                  <div class="buy-box-list-div1">
                      <img :src="item.good_img?GLOBAL.base_url+item.good_img:'/static/images/no.png'" alt="">
                  </div>
                  <div class="buy-box-list-div2">{{item.click_type}}</div>
                  <div class="buy-box-list-div3" v-if="item.one_cate" @click="goregister(item.id)">{{item.one_cate}}类</div>
                  <div class="buy-box-list-div3" v-else style="color:#333333!important;">无</div>
                  <div class="buy-box-list-div4">￥{{item.price}}</div>
              </div>
          </div>
          <!-- 全选删除 -->
          <div class="buy-box-bottom">
            <el-checkbox v-model="isSelectAll" v-bind:checked="isSelectAll" @change="selectProduct(isSelectAll)" >全选</el-checkbox>
              <!-- <input type="checkbox" @click="selectProduct(isSelectAll)" v-bind:checked="isSelectAll"> -->
              <!-- <span>全选</span> -->
              <span @click="deleteProduct(isSelectAll)">删除</span>
          </div>
          <!-- 已选商品 -->
          <div class="buy-box-choice">
             已选商品<span>({{getTotal.totalNum}})</span>件
          </div>
          <div style=" clear : both"></div>
          <!-- 合计价钱 -->
          <div class="buy-box-price">
              <span>合计</span>
              <span>RMB {{getTotal.totalPrice}}</span>
          </div>
          <div style=" clear : both"></div>
          <!-- 结算 -->
          <div @click="paymoney" class="buy-box-pay">结算</div>
      </div>
      <div style="clear:both;"></div>
      <!-- 弹框企业认证 -->
      <div class="buy-tan" v-show="buyshow">
       <div class="buy-tan-box">
         <img src="/static/images/cha.png" alt="" @click="buycha">
         <div class="buy-tan-box-div">
           <p>企业认证</p>
           <p>{{msg}}</p>
           <div>
            <div @click="notest">否</div>
            <div @click="agreetest">是</div>
           </div>
         </div>
       </div>
     </div>
  </div>

</template>

<script>
export default {
  name: 'buyCart',
  data(){
      return{
          productList:[],
          type:1,
          choseId:1,
          order:'',
          buyshow:false,
          msg:'',
          radio: '1'
      }
  },
  components: {
  },
  computed:{
    //    全选
      isSelectAll:{
        get:function(){
            if(this.productList !=0){
                return this.productList.every(function (val) { return val.isSelect});
            }else{
                return false;
            }
          },
          set: function(){
             if(this.productList !=0){
                return this.productList.every(function (val) { return val.isSelect});
            }else{
                return false;
            }
          }
        },
        // 获取所有勾选的数量和价格
        getTotal:function(){
            var prolist = this.productList.filter(function (val) { return val.isSelect}),
            totalPri = 0;
            for (var i = 0;i< prolist.length; i++) {
                totalPri+=Number(prolist[i].price);
            }
            return {totalNum:prolist.length,totalPrice:totalPri}
        }
  },
  methods:{
      tip(type,msg){
          return this.$message({
              type:type,
              message:msg,
              showClose:true,
              duration:2500
          })
      },
    //   改变勾选的状态
      selectProduct:function(_isSelect){
        for (var i = 0; i< this.productList.length; i++) {
            this.productList[i].isSelect = !_isSelect;
        }
      },
      // 删除数据
      deleteProduct:function(){
                var prolist = this.productList.filter(function (val) { return val.isSelect});
                var arr = "";

                for (var i = 0;i< prolist.length; i++) {
                    arr+=prolist[i].id+',';
                }

                arr =  arr.substring(0,arr.length-1);
                this.$http.post(this.GLOBAL.base_url+'/api/shopcar/ShoppingcarDel',{
                    shop_id:arr
                }).then(res=>{
                    if(res.data.code == "1"){
                        this.productList=this.productList.filter(function (item) {return !item.isSelect});
                        this.tip('success',res.data.msg);
                    }
                })
      },
            goregister(val){
                this.$router.push({
                    path:'/recome',
                    query:{
                        type:this.$route.query.type,
                        shop_id:val
                    }
                })
            },
            buycha(){
                this.buyshow = false;
            },
            notest(){
                this.buyshow = false;
            },
            agreetest(){
                this.$router.push({
                    path:'/personal/companyForm',
                    query:{
                        checkorder:0
                    }
                 })
            },
            paymoney(){
                var prolist = this.productList.filter(function (val) { return val.isSelect});
                if(prolist.length == 0){
                    this.$alert('请选择要购买的项','温馨提醒',{
                        confirmButtonText: '确定'
                    })
                    return false
                }
                var arr2 = "";
                for (var i = 0;i< prolist.length; i++) {
                    arr2+=prolist[i].id+',';
                }
                   arr2 =  arr2.substring(0,arr2.length-1);
                   this.$http.post(this.GLOBAL.base_url+'/api/shopcar/buildOrder',{
                        shop_id:arr2,
                        user_id:this.$cookie.getCookie('u_id')
                    }).then(res=>{
                        // console.log(res)
                    if(res.data.code == "1"){
                            this.order = res.data.order;
                            this.$router.push({
                               path:'/checkOrder',
                               query:{
                                   order:this.order
                               }
                            })
                        }else if(res.data.code == "0"){
                            this.tip('error',res.data.msg)
                        }else{
                            this.buyshow = true;
                            this.msg = res.data.msg;
                        }
                    })
            }
  },
  mounted(){
    //   获取数据
        this.$http.post(this.GLOBAL.base_url+'/api/shopcar/getShopCarList',{
          user_id:this.$cookie.getCookie('u_id')
        }).then(res=>{
            // console.log(res)
            if(res.data.code == "1"){
                this.productList = res.data.data;
                for(var i = 0;i<this.productList.length;i++){
                    if(this.productList[i].id == this.$route.query.id){
                        this.productList[i].isSelect = !this.productList[i].isSelect;
                    }
                }
            }
            if(res.data.code == "0"){
                var kong =[];
                this.productList = kong;
            }
        })
  }
}

</script>

<style scoped>
    .buy-box{
        width: 1015px;
        float: left;
        /* border-top:1px solid #d8d8d8; */
        margin: 12px 0 0 16px;
        background-color: #fff;
        padding-top: 28px;
        box-sizing: border-box;
        min-height: 950px;
    }
    .buy-box-top{
        width: 870px;
        height: 36px;
        line-height: 36px;
        border:1px solid #eee;
        margin-left: 83px;
        background-color: #fafafa;
        box-sizing: border-box;
    }
    .buy-box-top>div{
        width: 200px;
        float: left;
        text-align: center;
        font-family: "PingFangSC";
        font-size: 14px;
        font-weight: 600;
        color: #333333;
        margin-left: 17px;
    }
    .buy-box-top>div:nth-of-type(1){
        margin-left: 23px;
    }
    .buy-box-top>div:nth-of-type(4){
        margin-left: 8px;
    }
    .buy-box-list {
      margin-left: 83px;
      width: 870px;
    }
    .buy-box-list>div{
        height: 144px;
        line-height: 144px;
        border: 1px solid #eee;
        border-top: none;
    }
    .buy-box-list>div>div{
        float: left;
        width: 210px;
        height: 120px;
        text-align: center;
        font-family: "PingFangSC";
        font-size: 14px;
        font-weight: 100;
        color: #333333;
    }
    .buy-box-list>div>input{
        width: 16px;
        height: 16px;
        margin-top: 64px;
        float: left;
        cursor: pointer;
        margin-left: 12px;
    }
    .buy-box-list-div1 {
      margin-top: 10px;
    }
    .buy-box-list-div1>img{
        width: 120px;
        height: 120px;
        border:1px solid #eeeeee;
    }
    .buy-box-bottom{
        width: 870px;
        margin-top: 20px;
        margin-left: 95px;
    }
    .buy-box-bottom>input{
        width: 16px;
        height: 16px;
        vertical-align: middle;
        margin-right: 10px;
        cursor: pointer;
    }
    .buy-box-bottom>span{
        font-family: "PingFangSC";
        font-size: 14px;
        font-weight: 100;
        color: #333333;
        float: right;
        margin-right: 12px;
    }
    .buy-box-bottom>span:nth-child(2) {
      color: #f96006;
      cursor: pointer;
    }
    .buy-box-choice {
      float: right;
      margin-right: 60px;
      margin-top: 36px;
      font-family: "PingFangSC";
      font-size: 15px;
      color: #333333;
    }
    .buy-box-choice > span {
      color: #f96006;
    }
    .buy-box-price{
        font-family: "PingFangSC";
        font-size: 14px;
        color: #333333;
        height: 33px;
        line-height: 33px;
        margin-top: 13px;
        float: right;
    }
    .buy-box-list-div3{
        width: 213px;
        color: #4a90e2!important;
        cursor: pointer;
    }
    .buy-box-price>span:nth-of-type(1){
        color: #f96006;
    }
    .buy-box-price>span:nth-of-type(2){
        margin:0 60px 0 30px;
        font-family: "PingFangSC";
        font-size: 20px;
        font-weight: 500;
        color: #333333;
    }
    .buy-box-price>span:nth-of-type(3){
        font-family: "PingFangSC";
        font-size: 24px;
        font-weight: 600;
        letter-spacing: -1.8px;
        color: #333333;
    }
    .buy-box-pay{
        width: 363px;
        height: 54px;
        border-radius: 4px;
        border-width: 1px;
        border-image: linear-gradient(to top, #ba6100 97%, #dc773b 2%);
        background-image: linear-gradient(to bottom, #f79000, orange), linear-gradient(to top, #ba6100 97%, #dc773b 2%);
        background-origin: border-box;
        background-clip: content-box, border-box;
        font-family: "PingFangSC";
        font-size: 14px;
        line-height: 54px;
        text-align: center;
        color: #ffffff;
        margin: 24px 0 114px 592px;
        cursor: pointer;
    }
    .buy-tan{
    background: rgba(0,0,0, 0.8);
    position: fixed;
    z-index: 20;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .buy-tan-box{
    width: 480px;
    height: 252px;
    background-color: #ffffff;
    position: absolute;
    top:50%;
    left: 50%;
    z-index: 30;
    transform: translate(-50%,-50%);
  }
  .buy-tan-box>img{
    width: 18px;
    height: 18px;
    position: absolute;
    top:16px;
    right: 16px;
    cursor: pointer;
  }
  .buy-tan-box-div{
    width: 296px;
    position: absolute;
    top:36px;
    left: 92px;
    text-align: center;
  }
  .buy-tan-box-div>p:nth-of-type(1){
    font-size: 16px;
    font-weight: 600;
    color: #333333;
    margin-bottom: 30px;
  }
  .buy-tan-box-div>p:nth-of-type(2){
    font-size: 14px;
    color: #333333;
    margin-bottom: 48px;
  }
  .buy-tan-box-div>div{
    height: 36px;
  }
  .buy-tan-box-div>div>div{
    float: left;
    width: 108px;
    height: 36px;
    text-align: center;
    line-height: 36px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 4px;
  }
  .buy-tan-box-div>div>div:nth-of-type(1){
    color: #f96006;
    border: solid 1px #f96006;
    background-color: #fbefe9;
    margin: 0 60px 0 10px;
  }
  .buy-tan-box-div>div>div:nth-of-type(2){
    background-color:#f96006;
    color: #ffffff;
  }
  .flml {
    margin-right: 0px !important;
    float: left !important;
    margin-left: 12px !important;
  }
</style>
<style >
   .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #f96006;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #f96006;
    border-color: #f96006;
  }
</style>
