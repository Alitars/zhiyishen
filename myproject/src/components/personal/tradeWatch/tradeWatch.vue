<template>
  <div class="tradeWatch">
      <div class="tradeWatch-box">
        <div class="tradeWatch-box-mddle">
          <div class="tradeWatch-top">
            <div :class="changeClass">
              <div class="tradecontol" @click="changetype('trade')">商标监控</div>
              <div class="companycontol" @click="changetype('company')">企业监控</div>
            </div>
          </div>
          <!-- 商标监控 -->
          <div class="tradecontrol" v-if="changeClass == 'trade'">
            <div class="tradecontrol-do">
              <input type="text" placeholder="请输入商标名称">
              <div>搜索</div>
              <div>取消监控</div>
              <div @click="addtradecontrol">添加监控商标</div>
            </div>
            <div class="tradecontrol-box">
              <div class="tradecontrol-box-title">
                <div>
                  <el-checkbox></el-checkbox>
                </div>
                <div>商标</div>
                <div>类别</div>
                <div>注册号</div>
                <div>商标动态和风险预警</div>
                <div>添加时间</div>
                <div>操作</div>
              </div>
              <div class="tradecontrol-box-list">
                  <div v-for="(v,k) in 10">
                      <div>
                        <el-checkbox></el-checkbox>
                      </div>
                      <div>
                          <img src="/static/images/4.png" alt="">
                      </div>
                      <div>35</div>
                      <div>123456789</div>
                      <div @click="change(k)">
                        <span>99+</span><span>动态预警</span><span :class="num == k && activeClass? 'el-icon-arrow-down':'el-icon-arrow-right'"></span>
                      </div>
                      <div>2029.05.23</div>
                      <div @click="totradecontrol">查看详情</div>
                      <div v-show="num == k && activeClass">
                        <div class="trigonometry"></div>
                        <div class="list-move">
                          <div class="move1">
                            <span>共 1 个动态，其中未读 1 个</span>
                            <span>全部标记为已读</span>
                          </div>
                          <div class="move2">
                            <div></div>
                            <div>2020-05-25  12:00:00</div>
                            <div>全部近似商标更新<span>2</span>条信息</div>
                            <div>查看详情</div>
                          </div>
                        </div>
                      </div>
                  </div>
              </div>
              <div class="tradecontrol-bottom">
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
          <!-- 企业监控 -->
          <div v-if="changeClass == 'company'">
              <div class="tradecontrol-do">
                <input type="text" placeholder="请输入企业名称">
                <div>搜索</div>
                <div>取消监控</div>
                <div @click="addcompanycontrol">添加监控商标</div>
            </div>
            <div>
              <div class="company-box-title">
                <div>
                  <el-checkbox></el-checkbox>
                </div>
                <div>企业名称</div>
                <div>商标动态和风险预警</div>
                <div>检测商标数量</div>
                <div>添加时间</div>
                <div>操作</div>
              </div>
              <div class="company-box-list">
                  <div v-for="(v,k) in 10">
                      <div>
                        <el-checkbox></el-checkbox>
                      </div>
                      <div>知昇(上海)人工智能科技有限公司</div>
                      <div @click="change2(k)">
                        <span>99+</span><span>动态预警</span><span :class="num2 == k && activeClass2? 'el-icon-arrow-down':'el-icon-arrow-right'"></span>
                      </div>
                      <div>222</div>
                      <div>2029.05.23</div>
                      <div @click="tocompanycontrol">查看详情</div>
                      <div v-show="num2 == k && activeClass2">
                        <div class="trigonometry"></div>
                        <div class="list-move">
                          <div class="move1">
                            <span>共 1 个动态，其中未读 1 个</span>
                            <span>全部标记为已读</span>
                          </div>
                          <div class="move2">
                            <div></div>
                            <div>2020-05-25  12:00:00</div>
                            <div>全部近似商标更新<span>2</span>条信息</div>
                            <div>查看详情</div>
                          </div>
                        </div>
                      </div>
                  </div>
              </div>
              <div class="tradecontrol-bottom">
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
      <div style="clear:both;"></div>
      <!-- 商标添加监控 -->
      <div class="tradecontrol-add" v-show="tradeaddshow">
        <div class="tradecontrol-add-middle">
          <img src="/static/images/cha.png" alt="" @click="quit">
          <div class="tradecontrol-add-div">
             <div class="tradecontrol-add-div-title">添加商标监控</div>
             <div class="tradecontrol-add-search">
               <input type="text" placeholder="请输入商标名称">
               <div>搜索</div>
             </div>
             <div class="tradecontrol-add-detail">
               <div class="tradecontrol-add-detail-div" v-for="(v,k) in 10">
                 <div class="tradecontrol-add-detail-littlediv">
                    <div>
                       <el-checkbox></el-checkbox>
                    </div>
                    <div>
                        <img src="/static/images/4.png" alt="">
                    </div>
                    <div>
                       <div>
                         <span>类别：01类</span>
                         <span>注册号：236542156</span>
                       </div>
                       <div>申请人：哈哈哈网络科技有限公司</div>
                    </div>
                 </div>
               </div>
             </div>
             <div class="tradecontrol-add-choseall">
               <el-checkbox>全选</el-checkbox>
             </div>
             <div class="tradecontrol-add-start">开始监控</div>
          </div>
        </div>
      </div>
      <!-- 添加企业监控 -->
      <div class="tradecontrol-add" v-show="companyaddshow">
        <div class="tradecontrol-add-middle">
          <img src="/static/images/cha.png" alt="" @click="quit2">
          <div class="tradecontrol-add-div">
             <div class="tradecontrol-add-div-title">添加企业监控</div>
          </div>
          <div class="companycontrol-tip">
            <img src="/static/images/alert.png" alt="">
            <span>温馨提示：单次可以添加5个申请人</span>
          </div>
          <div class="companycontrol-name">
            <div>企业名称</div>
            <div v-for="(v,k) in name" :key="k">
              <input type="text" placeholder="请输入企业名称" v-model="name[k]"><span @click="del(k)">删除</span>
            </div>
            <div class="companymore" @click="addcompanyinput">+添加更多</div>
          </div>
          <div class="tradecontrol-add-start" @click="start">开始监控</div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'tradeWatch',
  data(){
    return{
      changeClass:'trade',
      num:-1,
      activeClass:false,
      num2:-1,
      activeClass2:false,
      // 商标监控分页
        total1:100,
        currentPage1: 1,
        pageSize1: 10,
        tradeaddshow:false,
        name:[''],
        companyaddshow:false
    }
  },
  components: {

  },
  methods:{
    changetype(val){
      this.changeClass = val;
    },
    change(val){
          if(this.num == -1){
              this.num = val;
              this.activeClass = true;
          }else if(this.num == val){
              this.num = -1;
              this.activeClass = false;
          }else if(this.num != val){
              this.num = val;
              this.activeClass = true;
          }
      },
      change2(val){
          if(this.num2 == -1){
              this.num2 = val;
              this.activeClass2 = true;
          }else if(this.num2 == val){
              this.num2 = -1;
              this.activeClass2 = false;
          }else if(this.num2 != val){
              this.num2 = val;
              this.activeClass2 = true;
          }
      },
      handleSizeChange1(){

      },
      handleCurrentChange1(){

      },
      addtradecontrol(){
        this.tradeaddshow = true;
      },
      addcompanycontrol(){
        this.companyaddshow = true;
      },
      quit(){
        this.tradeaddshow = false;
      },
      quit2(){
        this.companyaddshow = false;
      },
      totradecontrol(){
        this.$router.push('/tradecontrolDetail')
      },
      tocompanycontrol(){
        this.$router.push('/companycontrolDetail')
      },
      addcompanyinput(){
        if(this.name.length != 5){
          this.name.push('');
        }
      },
      del(val){
        this.name.splice(val,1)
      },
      start(){
        console.log(this.name)
      }
  }
}

</script>

<style scoped>
    .tradeWatch-box{
      width: 1015px;
      float: left;
      margin-left: 16px;
      min-height: 950px;
      background-color: #fff;
      margin-top: 12px;
      padding-top: 32px;
      box-sizing: border-box;
    }
    .tradeWatch-box-mddle{
      width: 953px;
      height: 900px;
      margin: 0 auto;
      /* border:1px solid red; */
    }
    .tradeWatch-top{
      height: 25px;
      margin-bottom: 16px;
      border-bottom:1px solid #d8d8d8;
    }
    .tradeWatch-top>div{
      height: 25px;
    }
    .tradeWatch-top>div>div{
      float: left;
      height: 25px;
      font-size: 14px;
      margin: 0 57px 0 36px;
      cursor: pointer;
    }
    .tradeWatch-top>div>div:nth-of-type(2){
      margin-left: 0;
    }
    .trade .tradecontol,.company .companycontol{
      border-bottom:1px solid #333333;
    }
    /* .tradecontrol{
       border:1px solid red;
    } */
    .tradecontrol-do{
      height: 32px;
      margin-bottom: 16px;
    }
    .tradecontrol-do>input{
      float: left;
      width: 216px;
      height: 30px;
      padding-left: 12px;
      border-radius: 4px;
      outline: none;
      border: solid 1px #d6d6d6;
      margin-right: 30px;
    }
    .tradecontrol-do>div{
      float: left;
      height: 32px;
      color: white;
      font-size: 14px;
      text-align: center;
      line-height: 32px;
      border-radius: 4px;
      background: #f96006;
      width: 108px;
      cursor: pointer;
    }
    .tradecontrol-do>div:nth-of-type(1){
      width: 80px;
      margin-right: 375px;
    }
    .tradecontrol-do>div:nth-of-type(2){
       margin-right: 20px;
    }
    .tradecontrol-box{

    }
    .tradecontrol-box-title{
      width: 951px;
      height: 36px;
      background-color: #fafafa;
      border:1px solid #d6d6d6;
    }
    .tradecontrol-box-title>div{
      float: left;
      width: 150px;
      text-align: center;
      line-height: 36px;
      font-size: 14px;
    }
    .tradecontrol-box-title>div:nth-of-type(1),.company-box-title>div:nth-of-type(1){
      width: 50px;
    }
    .tradecontrol-box-list,.company-box-list{
      margin-bottom: 33px;
    }
    .tradecontrol-box-list>div,.company-box-list>div{
      height: 67px;
      border:1px solid #d6d6d6;
      border-top:none;
      position: relative;
    }
    .tradecontrol-box-list>div>div{
      float: left;
      width: 150px;
      height: 67px;
      text-align: center;
      line-height: 67px;
      font-size: 14px;
      font-weight: 100;
    }
    .tradecontrol-box-list>div>div:nth-of-type(1),.company-box-list>div>div:nth-of-type(1){
      width: 50px;
    }
    .tradecontrol-box-list>div>div>img{
      width: 60px;
      height: 60px;
      margin-top: 5px;
    }
    .tradecontrol-box-list>div>div:nth-of-type(5),.company-box-list>div>div:nth-of-type(3){
      cursor: pointer;
      line-height: normal;
    }
    .tradecontrol-box-list>div>div:nth-of-type(5)>span,.company-box-list>div>div:nth-of-type(3)>span{
      vertical-align: middle;
      display: inline-block;
      margin-top: 24px;
    }
    .tradecontrol-box-list>div>div:nth-of-type(5)>span:nth-of-type(1),.company-box-list>div>div:nth-of-type(3)>span:nth-of-type(1){
      width: 35px;
      height: 20px;
      line-height: 23px;
      border-radius: 40px;
      color: white;
      background-color: #d0021b;
    }
     .tradecontrol-box-list>div>div:nth-of-type(5)>span:nth-of-type(2),.company-box-list>div>div:nth-of-type(3)>span:nth-of-type(2){
       margin-left: 8px;
       margin-right: 6px;
     }
    .tradecontrol-box-list>div>div:nth-of-type(7),.company-box-list>div>div:nth-of-type(6){
      color: #4a90e2;
      cursor: pointer;
    }
    .tradecontrol-box-list>div>div:nth-of-type(8){
      position: absolute;
      width: 660px;
      padding:20px 0 0 60px;
      text-align: left;
      line-height: normal;
      top:60px;
      left: 210px;
      height: 60px;
      box-shadow: 2px 2px 8px 0 rgba(51, 51, 51, 0.3);
      background: white;
      z-index: 15;
    }
    .company-box-list>div>div:nth-of-type(7){
      position: absolute;
      width: 660px;
      padding:20px 0 0 60px;
      text-align: left;
      line-height: normal;
      top:60px;
      left: 20px;
      height: 60px;
      box-shadow: 2px 2px 8px 0 rgba(51, 51, 51, 0.3);
      background: white;
      z-index: 15;
    }
    .trigonometry {
      position: absolute;
      width: 0;
      height: 0;
      top: -5px;
      right: 345px;
      border-style: solid;
      border-width: 5px;
      border-color: transparent transparent #fff #fff;
      transform: rotate(135deg);
      -webkit-box-shadow: -2px 2px 3px 0 rgba(0, 0, 0, 0.2);
      -moz-box-shadow: -2px 2px 3px 0 rgba(0, 0, 0, 0.2);
      box-shadow: -2px 2px 3px 0 rgba(0, 0, 0, 0.2);
      z-index: 15;
  }
  .move1>span:nth-of-type(2){
    font-size: 12px;
    color: #f96006;
    margin-left: 42px;
    text-decoration:underline;
    cursor: pointer;
  }
  .move2{
    margin-top: 10px;
    height: 20px;
    line-height: 20px;
  }
  .move2>div{
    float: left;
  }
  .move2>div:nth-of-type(1){
    width: 12px;
    height: 12px;
    border-radius: 40px;
    background-color: #d0021b;
    margin: 3px 7px 0 0;
  }
  .move2>div:nth-of-type(3){
    font-size: 12px;
    margin: 0 220px 0 65px;
  }
  .move2>div:nth-of-type(3)>span{
    color: #f96006;
  }
  .move2>div:nth-of-type(4){
    color: #4a90e2;
    cursor: pointer;
  }
  .tradecontrol-bottom{
    float: right;
  }
  .tradecontrol-add{
    background: rgba(0,0,0, 0.8);
    position: fixed;
    z-index: 20;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .tradecontrol-add-middle{
    width: 600px;
    height: 502px;
    background: #ffffff;
    position: absolute;
    top:50%;
    left: 50%;
    z-index: 30;
    transform: translate(-50%,-50%);
  }
   .tradecontrol-add-middle>img{
   width: 18px;
   height: 17px;
   position: absolute;
   right:16px;
   top:16px;
   cursor: pointer;
 }
 .tradecontrol-add-div{
   width: 504px;
   margin: 30px auto 0;
   /* height: 300px;
   border:1px solid red; */
 }
 .tradecontrol-add-div-title{
   font-size: 16px;
   text-align: center;
   margin-bottom: 20px;
 }
 .tradecontrol-add-search{
   height: 32px;
   margin-bottom: 11px;
 }
 .tradecontrol-add-search>input{
   width: 216x;
  height: 30px;
  padding-left: 12px;
  outline: none;
  border-radius: 4px;
  border: solid 1px #d6d6d6;
  float: left;
  margin: 0 30px 0 82px;
 }
 .tradecontrol-add-search>div{
   float: left;
   width: 80px;
  height: 32px;
  border-radius: 4px;
  font-size: 14px;
  background-color: #f96006;
  text-align: center;
  line-height: 32px;
  color: white;
  cursor: pointer;
 }
 .tradecontrol-add-detail{
   width: 456px;
   height: 267px;
   padding:0 24px;
   background-color: #fafafa;
   margin-bottom: 16px;
   overflow-y: auto;
 }
 .tradecontrol-add-detail::-webkit-scrollbar {
    width: 8px;     
    height: 8px;
  }
  .tradecontrol-add-detail::-webkit-scrollbar-thumb {
      border-radius: 5px;
      box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  }
  .tradecontrol-add-detail::-webkit-scrollbar-track {
      opacity: 0;
  }
 .tradecontrol-add-detail-div{
   height: 71px;
   padding-top: 16px;
   border-bottom: 1px dotted #d6d6d6;
 }
 .tradecontrol-add-detail-littlediv{
   height: 60px;
 }
 .tradecontrol-add-detail-littlediv>div{
   float: left;
   height: 60px;
   line-height: 60px;
 }
 .tradecontrol-add-detail-littlediv>div:nth-of-type(2){
   margin: 0 24px 0 20px;
 }
 .tradecontrol-add-detail-littlediv>div>img{
   width: 60px;
   height: 60px;
 }
 .tradecontrol-add-detail-littlediv>div:nth-of-type(3){
   line-height: normal;
 }
 .tradecontrol-add-detail-littlediv>div:nth-of-type(3)>div{
   font-size: 14px;
  font-weight: 100;
 }
 .tradecontrol-add-detail-littlediv>div:nth-of-type(3)>div:nth-of-type(1){
   margin-bottom: 20px;
 }
 .tradecontrol-add-detail-littlediv>div:nth-of-type(3)>div>span{
   margin-right: 16px;
 }
 .tradecontrol-add-choseall{
   margin: 0 0 18px 24px;
 }
 .tradecontrol-add-start{
   width: 108px;
   height: 36px;
   line-height: 36px;
   border-radius: 4px;
   background-color: #f96006;
   text-align: center;
   margin: 0 auto;
   color: white;
   font-size: 14px;
   cursor: pointer;
 }
 .company-box-title{
   width: 951px;
  height: 36px;
  background-color: #fafafa;
  border:1px solid #d6d6d6;
 }
 .company-box-title>div{
   float: left;
   width: 172px;
   text-align: center;
   line-height: 36px;
   font-size: 14px;
 }
  .company-box-title>div:nth-of-type(2),.company-box-list>div>div:nth-of-type(2){
    width: 210px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
 .company-box-list>div>div{
      float: left;
      width: 172px;
      height: 67px;
      text-align: center;
      line-height: 67px;
      font-size: 14px;
      font-weight: 100;
    }
    .companycontrol-tip{
      width: 536px;
      height: 36px;
      line-height: 36px;
      border: solid 1px #eeeeee;
      background-color: #fafafa;
      margin: 0 auto 22px;
    }
    .companycontrol-tip>img{
      width: 14px;
      height: 14px;
      vertical-align: middle;
      margin: 0 6px 0 16px;
    }
    .companycontrol-tip>span{
      vertical-align: middle;
      font-size: 14px;
      font-weight: 100;
      color: #f96006;
    }
    .companycontrol-name{
      width: 472px;
      height: 310px;
      margin: 0 auto;
    }
    .companycontrol-name>div{
      margin-bottom: 16px;
      font-size: 14px;
    }
    .companycontrol-name>div:nth-of-type(1){
      margin-bottom: 12px;
    }
    .companycontrol-name>div>input{
      width: 414px;
      height: 30px;
      padding-left: 12px;
      outline: none;
      margin-right: 16px;
      border-radius: 4px;
      border: solid 1px #d6d6d6;
    }
    .companycontrol-name>div>span{
      cursor: pointer;
      color: #f96006;
    }
    .companymore{
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
