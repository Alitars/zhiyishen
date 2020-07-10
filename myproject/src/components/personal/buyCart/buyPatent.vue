<template>
  <div class="buyPatent-container">
    <div class="buy-box">
      <div class="buy-box-patent">
        <!-- 头部 -->
        <div class="patent-top">
          <ul>
            <li>
               <el-checkbox v-model="isSelectAll" v-bind:checked="isSelectAll" @change="selectProduct(isSelectAll)">全选</el-checkbox>
            </li>
            <li>专利图样</li>
            <li>服务类型</li>
            <li>价格</li>
          </ul>
        </div>
        <!-- 中间 -->
        <div class="patent-center">
            <div v-for="(item,index) in list" :key="index">
              <div class="center-one">
                <el-checkbox v-model="item.isSelect"></el-checkbox>
              </div>
              <div class="center-two">
                <img :src="item.icon?GLOBAL.base_url+item.icon:'/static/images/no.png'" alt="">
              </div>
              <div class="center-three">{{item.click_type}}</div>
              <div class="center-five">￥{{item.price}}</div>
              <div style=" clear : both;"></div>
            </div>
        </div>
         <!-- <div class="order-box-fen">
                <el-pagination
                    :current-page="page"
                    :page-size="pageSize"
                    layout="prev, pager, next"
                    :total="total">
                </el-pagination>
            </div> -->
        <!-- <div style=" clear : both;"></div> -->
        <!-- 全选删除 -->
        <div class="patent-allDel">
          <span><el-checkbox v-model="isSelectAll" v-bind:checked="isSelectAll" @change="selectProduct(isSelectAll)" >全选</el-checkbox></span>
          <span @click="deleteProduct(isSelectAll)">删除</span>
        </div>
        <!-- 选中 -->
        <div class="patent-choose">
          已选商品<span>({{getTotal.totalNum}})</span>件
        </div>
        <div style=" clear : both;"></div>
        <!-- 总价钱 -->
        <div class="patent-totalPrice">
          <span>合计</span>
          <span>RMB </span>
          <span>{{getTotal.totalPrice}}</span>
        </div>
        <div style=" clear : both;"></div>
        <!-- 结算 -->
        <div class="patent-account" @click="paymoney">
          结算
        </div>
      </div>
    </div>
     <div style="clear : both"></div>
  </div>
  <!-- <div style="clear : both"></div> -->
</template>

<script>
export default {
  name:'buyPatent',
  data () {
    return {
      list:[],
      order:''
    }
  },
  computed:{
    // 全选S
     isSelectAll:{
        get:function(){
            if(this.list !=0){
                return this.list.every(function (val) { return val.isSelect});
            }else{
                return false;
            }
          },
          set: function(){
             if(this.list !=0){
                return this.list.every(function (val) { return val.isSelect});
            }else{
                return false;
            }
          }
        },
    // 获取所有勾选的数量和价格
    getTotal:function(){
        var prolist = this.list.filter(function (val) { return val.isSelect}),
        totalPri = 0;
        for (var i = 0;i< prolist.length; i++) {
            totalPri+=Number(prolist[i].price);
        }
        return {totalNum:prolist.length,totalPrice:totalPri}
    }
  },
  methods:{
    // 弹框
    tip(type,msg){
          return this.$message({
              type:type,
              message:msg,
              showClose:true,
              duration:2500
          })
    },
    // 获取数据
    gitList(){
      this.$http.post(this.GLOBAL.base_url+'/api/patent/getCart',{
        user_id:this.$cookie.getCookie('u_id'),
        // page:this.page
      }).then(res => {
        console.log(res)
        if(res.data.code == '1') {
        this.list = res.data.data
        let _this = this;
        this.list.map(function (item) {
                              _this.$set(item, 'isSelect', false);
                          })
      }

      })
    },
    // 删除数据
    deleteProduct:function(){
      var prolist = this.list.filter(function (val) { return val.isSelect});
      var arr = "";

      for (var i = 0;i< prolist.length; i++) {
          arr+=prolist[i].id+',';
        }

      arr =  arr.substring(0,arr.length-1);
      this.$http.post(this.GLOBAL.base_url+'/api/patent/delCart',{
            user_id:this.$cookie.getCookie('u_id'),
            id:arr
      }).then(res=>{
        if(res.data.code == "1"){
          // console.log(res)
          this.list=this.list.filter(function (item) {return !item.isSelect});
          this.tip('success','删除成功');
        }
      })
    },
    // 改变单选状态
    selectProduct:function(_isSelect){
      for (var i = 0; i< this.list.length; i++) {
        this.list[i].isSelect = !_isSelect;
      }
    },
    // 结算
    paymoney(){
      var prolist = this.list.filter(function (val) { return val.isSelect})
      // 判断是否选中
      if(prolist.length == 0){
        this.$alert('请选择要购买的项','温馨提醒',{
            confirmButtonText: '确定'
        })
        return false
      }
      let arr2 = ''
      let arr3 = ''
      for ( let i = 0; i< prolist.length; i++) {
        arr2+=prolist[i].id+','
        arr3+=prolist[i].click_type +','
      }
      arr2 =  arr2.substring(0,arr2.length-1)
      arr3 =  arr3.substring(0,arr3.length-1)
      // console.log(arr2)
      this.$http.post(this.GLOBAL.base_url+'/api/patent/cTOrder',{
        id:arr2,
        user_id:this.$cookie.getCookie('u_id')
      }).then(res=>{
        // console.log(res)
        if (res.data.code == '1' ) {
          // console.log(res)
          this.order = res.data.data.id
                  this.$router.push({
                    path:'/checkPatent',
                    query:{
                      id:this.order,
                      click_type:arr3
          }
        })
        }else if (this.data.code == '0') {
          this.tip('erro',res.data.msg)
        }else{
          this.msg = res.data.msg
        }

      })
     }
  },
  mounted(){
   this.gitList()
  }
}
</script>

<style scoped>
/* 公共样式 */
ul,li {
  list-style: none;
}
.buy-box {
    width: 1015px;
    min-height: 1108px;
    background-color: #fff;
    float: left;
    margin: 12px 0 0 16px;
    padding-top: 28px;
    box-sizing: border-box;
  }
.buy-box-patent {
    width: 848px;
    margin: 0 auto;
    border-top: 1px solid #eeeeee;
  }
.patent-top {
    height: 36px;
    background-color: #fafafa;
    line-height: 36px;
    border-left: 1px solid #eeeeee;
    border-right: 1px solid #eeeeee;
    box-sizing: border-box;
    border-bottom: 1px solid #eeeeee;
  }
.patent-top > ul > li {
    float: left;
    font-family: "PingFangSC";
    font-size: 14px;
    color: #333;
  }
.patent-top > ul > li:nth-child(1){
    margin-left: 24px;
  }
.patent-top > ul > li:nth-child(2){
    margin-left: 86px;
    font-weight: 600;
  }
.patent-top > ul > li:nth-child(3){
    margin-left: 214px;
    font-weight: 600;
  }
.patent-top > ul > li:nth-child(4){
    margin-left: 228px;
    font-weight: 600;
  }
  /* 中间 */
  .order-box-fen {
    margin-left: 350px;
    margin-top: 20px;
  }
  .patent-center > div {
    height: 144px;
    box-sizing: border-box;
    line-height: 144px;
    border: 1px solid #eee;
    border-top:none;
  }
  .patent-center > div > div {
    float: left;
  }
   .center-one {
    margin-left: 25px;
  }
    .center-two {
    margin-left: 90px;
    width: 120px;
    height: 120px;
    /* border: 1px solid red; */
    margin-top: 12px;
    box-sizing: border-box;
  }
  .center-two > img {
    width: 120px;
    height: 120px;
  }
  .center-three {
    margin-left: 169px;
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 100;
    color: #333;
  }
   .center-five {
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 100;
    color: #333;
    float: right !important;
    margin-right: 100px;
  }
  .patent-allDel {
    padding-left: 24px;
    padding-top: 24px;
    box-sizing: border-box;
  }
  .patent-allDel > span:nth-child(2) {
    float: right;
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 100;
    color: #f96006;
    cursor: pointer;
  }
  /* 选中 */
  .patent-choose {
    float: right;
    padding-top: 36px;
    box-sizing: border-box;
    font-family: "PingFangSC";
    font-size: 15px;
    color: #333;
  }
  .patent-choose > span {
    color: #f96006;
  }
  /* 总价钱 */
  .patent-totalPrice {
    float: right;
    margin-top: 32px;
    font-family: "PingFangSC";
    font-size: 16px;
    font-weight: 500;
  }
  .patent-totalPrice >span:nth-child(1) {
    margin-right: 24px;
    color: #f96006;
  }
  .patent-totalPrice >span:nth-child(3) {
    font-size: 26px;
    color: #333;
  }
  /* 结算 */
  .patent-account {
    width: 363px;
    height: 54px;
    border-radius: 4px;
    float: right;
    text-align: center;
    line-height: 54px;
    font-size: 14px;
    font-family: "PingFangSC";
    color: #fff;
    margin-top: 36px;
    border-image: linear-gradient(to top, #ba6100 97%, #dc773b 2%);
    background-image: linear-gradient(to bottom, #f79000, orange), linear-gradient(to top, #ba6100 97%, #dc773b 2%);
    margin-bottom: 88px;
    cursor: pointer;
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
