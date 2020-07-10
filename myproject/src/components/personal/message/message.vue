<template>
  <div class="message-container">
    <div class="message-box">
        <!-- <div class="message-box-top">我的消息</div> -->
        <div class="message-box-top-detail">
          <div class="message-box-top-detail-wrap">
              <el-tabs v-model="activeName">
                <el-tab-pane label="全部" name="first">
                  <div class="message-box-div" v-for="(v,k) in message" :key="k">
                    <span @click="orderchange(v.id,k)">{{v.title}}</span><span>{{read[v.is_read]}}</span>
                    <p>{{v.content}}</p>
                    <p>{{v.create_time}}</p>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="已读" name="second">
                  <div class="message-box-div" v-for="(v,k) in message" :key="k">
                    <span @click="orderchange(v.id)">{{v.title}}</span><span>{{read[v.is_read]}}</span>
                    <p>{{v.content}}</p>
                    <p>{{v.create_time}}</p>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="未读" name="third">
                  <div class="message-box-div" v-for="(v,k) in message" :key="k">
                    <span @click="orderchange(v.id)">{{v.title}}</span><span>{{read[v.is_read]}}</span>
                    <p>{{v.content}}</p>
                    <p>{{v.create_time}}</p>
                  </div>
                </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <div class="message-box-fen">
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
  name: 'message',
  data(){
    return{
      activeName:"first",
      type:'',
      message:[],
      read:{
        '1': '未读',
        '2': '已读'
      },
      total:0,
      currentPage1: 1,
      pageSize: 5
      }
  },
  components: {
  },
  watch:{
      'activeName'(newValue){
          if(newValue == "first"){
            this.currentPage1 = 1;
              this.getdata();
          }
          if(newValue == "second"){
            this.currentPage1=1;
              this.getdata();
          }
          if(newValue == "third"){
            this.currentPage1=1;
              this.getdata();
          }
      },
  },
  methods:{
    orderchange(value){
      this.$router.push({
          name: 'messageDetail',
          params:{
            type:this.activeName,
            id:value
          }
        })
    },
    getdata(){
          if(this.activeName == "first"){
              this.type = '';
          }
          if(this.activeName == "second"){
            this.type = 2;
          }
          if(this.activeName == "third"){
            this.type = 1;
          }
      this.$http.get(this.GLOBAL.base_url+'/api/message/getMessageList',{params:{
                user_id:this.$cookie.getCookie('u_id'),
                type:this.type,
                page:this.currentPage1
            }}).then(res=>{
                if(res.data.code == "1"){
                  this.message = res.data.data;
                  this.total = res.data.count;
                }else{
                  this.message = [];
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
  },
  mounted(){
    // this.activeName = "first";
      if(this.$route.params.type){
        this.activeName = this.$route.params.type;
      }
      this.getdata()
    }
}

</script>

<style scoped>
  .message-box{
        width: 1015px;
        float: left;
        margin: 12px 0 0 16px;
        min-height: 950px;
        background-color: #fff;
        box-sizing: border-box;
        padding-top:30px;
    }
    .message-box-top{
      width: 800px;
      font-family: "PingFangSC-Thin";
      font-size: 22px;
      font-weight: 100;
      color: #999999;
      margin: 0 auto;
      /* margin: 0 0 14px 43px; */
      margin-bottom: 14px;
      margin-top: 43px;
    }
    .message-box-top-detail{
      width: 800px;
      height: 600px;
      margin: 0 auto;
      box-sizing: border-box;
    }
    .message-box-top-detail-wrap{
      width: 724px;
      margin-left: 30px;
  }
  .message-box-div{
    margin: 0 0 35px 9px;
  }
  .message-box-div>span:nth-of-type(1){
    font-family: "PingFangSC";
    font-size: 16px;
    font-weight: 600;
    color: #333333;
    cursor: pointer;
  }
  .message-box-div>span:nth-of-type(2){
    font-family: "PingFangSC";
    font-weight: 600;
    font-size: 16px;
    color: #f96006;
    margin-left: 10px;
  }
  .message-box-div>p:nth-of-type(1){
    font-family: "PingFangSC";
    font-size: 14px;
    color: #333333;
    margin: 10px 0;
  }
  .message-box-div>p:nth-of-type(2){
    font-family: "PingFangSC-Thin";
    font-size: 12px;
    font-weight: 100;
    color: #999999;
  }
  .message-box-fen{
    width: 600px;
    text-align: center;
    margin: 0 auto ;
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

