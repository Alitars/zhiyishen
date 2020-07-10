<template>
  <div class="coupon-container">
      <div class="coupon-box">
          <!-- <div class="coupon-box-top">我的优惠券</div> -->
          <div class="coupon-box-top-detail">
              <div class="coupon-box-top-detail-wrap">
                <el-tabs v-model="use">
                    <el-tab-pane  label="未使用" name="first">
                        <div class="coupon-box-div">
                            <div class="cupon-box-juan" v-for="(v,k) in arr1">
                                <div class="cupon-box-juan-div1">
                                    <span>¥</span>{{v.user_total}}
                                </div>
                                <div class="cupon-box-juan-div2">
                                    <p>{{v.end}}到期</p>
                                    <p>满{{v.total}}使用</p>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>

                    <el-tab-pane label="已使用" name="second">
                        <div class="coupon-box-div">
                            <div class="cupon-box-juan" v-for="(v,k) in arr1">
                                <div class="cupon-box-juan-div1">
                                    <span>¥</span>{{v.user_total}}
                                </div>
                                <div class="cupon-box-juan-div2">
                                    <p>{{v.end}}到期</p>
                                    <p>满{{v.total}}使用</p>
                                </div>
                            </div>
                        </div>
                        </el-tab-pane>

                        <el-tab-pane label="已过期" name="third">
                        <div class="coupon-box-div">
                            <div class="cupon-box-juan" v-for="(v,k) in arr1">
                                <div class="cupon-box-juan-div1">
                                    <span>¥</span>{{v.user_total}}
                                </div>
                                <div class="cupon-box-juan-div2">
                                    <p>{{v.end}}到期</p>
                                    <p>满{{v.total}}使用</p>
                                </div>
                            </div>
                        </div>
                        </el-tab-pane>
                </el-tabs>
              </div>
          </div>
      </div>
    <div style="clear:both;"></div>
  </div>
</template>

<script>
export default {
  name: 'coupon',
  data(){
      return{
          use:"first",
          arr1:[],
          arr2:[],
          time:'',
          type:1
      }
  },
  components: {
  },
  watch:{
      'use'(newValue){
          if(newValue == "first"){
              this.getData();
          }
          if(newValue == "second"){
              this.getData();
          }
          if(newValue == "third"){
              this.getData();
          }
      },
  },
  methods:{
      getData(){
          if(this.use == "first"){
              this.type = 1;
          }
          if(this.use == "second"){
              this.type = 2;
          }
          if(this.use == "third"){
              this.type = 3;
          }
          this.$http.get(this.GLOBAL.base_url+'/api/usercenter/packet',{params:{
                user_id:this.$cookie.getCookie('u_id'),
                type:this.type
            }}).then(res=>{
                if(res.data.code == "1"){
                    this.arr1 = res.data.data;
                    for(var i = 0;i<this.arr1.length;i++){
                        this.time = this.arr1[i].end;
                        var timestamp = this.time;
                        var d = new Date(timestamp * 1000);
                        var date = (d.getFullYear()) + "-" +
                                (d.getMonth() + 1) + "-" +
                                (d.getDate()) + " ";
                        this.arr2.push(date);
                        this.arr1[i].end = this.arr2[i];
                    }
                }
            })
      }
  },
  mounted(){
      this.getData();
  }
}

</script>

<style scoped>
    .coupon-box{
        width:1015px;
        float: left;
        margin: 12px 0 0 16px;
        min-height: 950px;
        background-color: #fff;
        padding-top: 32px;
        box-sizing: border-box;
    }
    .coupon-box-top{
      font-family: "PingFangSC";
      font-size: 22px;
      font-weight: 100;
      color: #999999;
      margin: 0 0 14px 15px;
    }
    .coupon-box-top-detail{
      width: 800px;
      /* border-top:1px solid #d8d8d8; */
    }
    .coupon-box-top-detail-wrap{
        width: 724px;
        margin-left: 30px;
    }
    .cupon-box-juan{
        width: 350px;
        height: 120px;
        background: url("/static/images/packet.png") 100% no-repeat;
    }
    .cupon-box-juan>div{
        float: left;
    }
    .coupon-box-div>div{
        float: left;
        margin: 0 24px 24px 0;
    }
    .coupon-box-div>div:nth-child(even){
        margin-right: 0;
    }
    .cupon-box-juan-div1{
        width: 110px;
        margin: 21px 10px 21px 16px;
        color: #e33233;
        font-size: 56px;
        font-weight: 600;
        letter-spacing: -2px;
       font-family: "PingFangSC";
    }
    .cupon-box-juan-div1>span{
        font-size: 24px;
        font-weight: normal;
        margin-right: 2px;
    }
    .cupon-box-juan-div2{
        width: 95px;
        margin: 24px 0 30px 0;
    }
    .cupon-box-juan-div2>p:nth-of-type(1){
        font-size: 12px;
        color: #999999;
        font-family: "PingFangSC";
        margin-bottom: 21px;
    }
    .cupon-box-juan-div2>p:nth-of-type(2){
        color: #666666;
        font-size: 20px;
        letter-spacing: -1px;
        text-align: center;
        font-family: "PingFangSC";
    }
    #cupon-box-juan-block{
        margin-left: 235px;
    }
</style>
<style>
    .el-tabs__nav{
         padding-left: 9px;
    }
    .el-tabs__active-bar{
        margin-left: 9px;
        background-color: #333333;
    }
    .el-tabs__item.is-active {
        color: #353535;
    }
    .el-tabs__item{
        height: 39px;
        font-size: 14px;
        color: #666666;
        font-family: "PingFangSC-Regular";
    }
    .el-tabs__item:hover{
        color:#666666;
    }
</style>

