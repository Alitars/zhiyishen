<template>
  <div id="tradeproperty">
      <div class="tradeproperty-box">
          <div class="tradeproperty-box-company">
              <div class="tradeproperty-box-company-div1">当前公司名称：</div>
              <div class="tradeproperty-box-company-div2">
                <select v-model="name" @change="pickname">
                  <option value="">选择公司</option>
                  <option :value="v" v-for="(v,k) in companylist">{{v}}</option>
                </select>
              </div>
              <div class="tradeproperty-box-company-div3" @click="totest">添加企业认证</div>
          </div>
          <div style="clear: both;"></div>
          <div class="tradeproperty-box-status">
              <div :class="status">
                  <div class="div1" @click="chang('all')">
                    全部商标<span>({{num1}})</span>
                  </div>
                  <div class="div2" @click="chang('xu')">
                      续展提醒<span>({{num2}})</span>
                  </div>
                  <div class="div3" @click="chang('change')">状态变更提醒</div>
              </div>
          </div>
          <div class="tradeproperty-box-detail">
              <div class="tradeproperty-box-detail-title">
                  <div class="title-div1">商标图样</div>
                  <div class="title-div2">类别</div>
                  <div class="title-div3">注册号</div>
                  <div class="title-div4">专用权期限</div>
                  <div class="title-div5">当前状态</div>
                  <div class="title-div6">交易价格</div>
                  <div class="title-div7">操作</div>
              </div>
              <div class="tradeproperty-box-detail-middle">
                  <div class="tradeproperty-box-detail-list" v-for="(v,k) in list">
                      <div class="list-div1">
                          <img :src="v.BrandImg" alt="">
                      </div>
                      <div class="list-div2">{{v.IntCls}}类</div>
                      <div class="list-div3">{{v.RegId}}</div>
                      <div class="list-div4">{{v.Ggdate}}/{{v.EffectiveEndDate}}</div>
                      <div class="list-div5">{{v.BrandStatus}}</div>
                      <div class="list-div6">--</div>
                      <div id="list-div7">
                          <p @click="todetail(v.RegId,v.IntCls)">查看详情</p>
                          <p v-if="v.BrandStatus == '商标已注册'" @click="set">设置价格</p>
                          <p v-if="status == 'xu'" @click="setxu">办理续展</p>
                      </div>
                  </div>
              </div>
          </div>
          <div class="tradeproperty-box-page" v-show="pageshow">
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
      <div style="clear:both;"></div>
  </div>
</template>

<script>
export default {
  name: 'tradeproperty',
  data(){
      return{
          companylist:[],
          name:'',
          // 分页
          total:0,
          currentPage1: 1,
          pageSize: 5,
          list:[],
          pageshow:false,
          status:'all',
          num1:0,
          num2:0
      }
  },
  components: {
  },
  methods:{
      getcompany(){
          this.$http.get(this.GLOBAL.base_url+'/app/getcompany',{params:{
              user_id:this.$cookie.getCookie('u_id')
          }}).then(res=>{
            //   console.log(res)
              if(res.data.code == "1"){
                  this.companylist = res.data.data;
              }else{
                  this.companylist = [];
              }
          })
      },
      chang(val){
          this.status = val;
          this.pickname();
      },
      set(){
          alert('此业务正在开通中')
      },
      setxu(){
          this.$router.push({
          path:'/tradeDetail',
          query:{
            id:2,
            secondid:27,
            tradeid:51
            }
          });
      },
      totest(){
          this.$router.push({
                    path:'/personal/companyForm',
                    query:{
                        checkorder:0
                    }
                 })
      },
      pickname(){
           this.$http.get(this.GLOBAL.base_url+'/app/gettag',{params:{
                        company:this.name
                    }}).then(res=>{
                        // console.log(res)
                        if(res.data.data != null){
                            this.num1 = res.data.data.first.alltotal;
                            this.num2 = res.data.data.first.warntotal;
                        }else{
                            this.num1= 0;
                            this.num2=0;
                        }
                    })
          if(this.status == 'all'){
              this.currentPage1 = 1
              this.$http.get(this.GLOBAL.base_url+'/app/getdata',{params:{
                        type:3,
                        cate_id:this.cate_id,
                        keywords:this.name,
                        size:5,
                        index:this.currentPage1
                    }}).then(res=>{
                        // console.log(res)
                        if(res.data.others != 0){
                            this.list = res.data.data;
                            this.total = res.data.others;
                            this.pageshow=true;
                            for(var i =0;i<this.list.length;i++){
                                this.list[i].BrandImg = 'data:image/png;base64,'+this.list[i].BrandImg;
                            }

                        }else{
                            this.list = [];
                            this.pageshow=false;
                        }
                    })
          }else if(this.status == 'xu'){
              this.pageshow = false;
              this.$http.get(this.GLOBAL.base_url+'/app/gettag',{params:{
                        company:this.name
                    }}).then(res=>{
                        // console.log(res)
                        if(res.data.data != null){
                            this.list = res.data.data.first.warnlist;
                            if(this.list.length != 0){
                                for(var i =0;i<this.list.length;i++){
                                this.list[i].BrandImg = 'data:image/png;base64,'+this.list[i].BrandImg;
                            }
                            }
                        }else{
                            this.list = [];
                        }
                    })
          }else{
              this.pageshow = false;
              this.list = [];
          }
      },
       handleSizeChange(val) {
              this.pageSize = val;
              this.pickname();
            },

        handleCurrentChange(val) {
            this.currentPage1 = val;
            this.$http.get(this.GLOBAL.base_url+'/app/getdata',{params:{
                        type:3,
                        cate_id:this.cate_id,
                        keywords:this.name,
                        size:5,
                        index:this.currentPage1
                    }}).then(res=>{
                        // console.log(res)
                        if(res.data.others != 0){
                            this.list = res.data.data;
                            this.total = res.data.others;
                            this.pageshow=true;
                            for(var i =0;i<this.list.length;i++){
                                this.list[i].BrandImg = 'data:image/png;base64,'+this.list[i].BrandImg;
                            }

                        }else{
                            this.list = [];
                            this.pageshow=false;
                        }
                    })
        },
        todetail(value1,value2){
            let routeData = this.$router.resolve({ path: '/searchdetail', query: { RegId:value1,
                    IntCls:value2 }});
              window.open(routeData.href, '_blank');
        }
  },
  mounted(){
      this.getcompany();
  }
}

</script>

<style scoped>
  .tradeproperty-box{
      float: left;
      width: 1015px;
      margin: 12px 0 0px 16px;
      background-color: #fff;
      padding-top: 46px;
      box-sizing: border-box;
      min-height: 950px;
  }
  .tradeproperty-box-company{
      height: 36px;
      width: 890px;
      line-height: 36px;
      margin: 0 auto;
      margin-bottom: 32px;
  }
  .tradeproperty-box-company>div{
      float: left;
  }
  .tradeproperty-box-company-div1{
      font-size: 14px;
      /* font-weight: 600; */
      color: #333333;
      margin-left: 21px;
  }
  .tradeproperty-box-company-div2{
      width: 360px;
      margin: 0 240px 0 16px;
  }
  .tradeproperty-box-company-div2>select{
      width: 360px;
      height: 36px;
      border-radius: 4px;
      border: solid 1px #d6d6d6;
      outline: none;
      cursor: pointer;
  }
  .tradeproperty-box-company-div3{
      width: 120px;
      height: 36px;
      border-radius: 4px;
      background-color:#f96006;
      text-align: center;
      color: #ffffff;
      cursor: pointer;
      font-size: 14px;
  }
  .tradeproperty-box-detail{
      width: 890px;
      border: solid 1px #eeeeee;
      margin: 0 auto;
  }
  .tradeproperty-box-detail-title{
     height: 36px;
     line-height: 36px;
     background-color: #fafafa;
     border-bottom: solid 1px #eeeeee;
  }
  .tradeproperty-box-detail-title>div{
      float: left;
      height: 36px;
      text-align: center;
  }
  .title-div1{
      width: 120px;
      margin: 0 47px 0 12px;
  }
  .title-div2{
      margin-right:32px;
  }
  .title-div3{
      width: 100px;
      margin-right:43px;
  }
  .title-div4{
      width: 165px;
      margin-right: 20px;
  }
  .title-div5{
      width: 90px;
      margin-right: 20px;
  }
  .title-div6{
      width: 100px;
  }
  .title-div7{
      width: 100px;
  }
  .tradeproperty-box-detail-list{
      height: 144px;
      border-bottom: solid 1px #eeeeee;
  }
  .tradeproperty-box-detail-list>div{
      float: left;
      height: 120px;
      font-size: 14px;
      margin-top: 12px;
      line-height: 120px;
  }
  .tradeproperty-box-detail-list:last-child{
      border-bottom: none;
  }
  .list-div1{
      margin: 0 47px 0 12px;
  }
  .list-div1>img{
      width: 118px;
      height: 118px;
      border: solid 1px #d8d8d8;
  }
  .list-div2{
      margin-right: 32px;
      color: #f96006;
  }
  .list-div3{
      width: 100px;
      margin-right:43px;
      text-align: center;
      color: #333333
  }
  .list-div4{
      width: 165px;
      margin-right: 20px;
      text-align: center;
      color: #333333
  }
  .list-div5{
      width: 100px;
      text-align: center;
       margin-right: 10px;
       color: #333333
  }
  .list-div6{
      width: 100px;
      text-align: center;
      cursor: pointer;
      color: #f96006;
  }
  #list-div7{
      margin-top:27px;
      text-align: center;
      width: 100px;
      line-height: normal;
  }
  #list-div7>p{
      color: #4a90e2;
      margin-bottom: 16px;
      cursor: pointer;
  }
  .tradeproperty-box-page{
      width: 890px;
      text-align: center;
      margin-top: 20px;
      /* margin: 0 auto; */
      margin-left: 70px;
  }
  .tradeproperty-box-status{
      width: 890px;
      height: 28px;
      border-bottom:1px solid #d8d8d8;
      margin-bottom: 16px;
      /* margin:0 auto; */
      margin-left: 64px;
  }
  .tradeproperty-box-status>div>div{
      float: left;
      color: #666666;
      margin-right: 32px;
      cursor: pointer;
      height: 28px;
      font-size: 14px;
      line-height: 28px
  }
  .tradeproperty-box-status>div>div>span{
      color: #f96006;
  }
  .all .div1,.xu .div2,.change .div3{
      border-bottom: 1px solid #333333;
  }
</style>
