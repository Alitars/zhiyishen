<template>
  <div class="messageDetail-container">
    <div class="messageDetail-box">
      <div class="messageDetail-box-top">我的消息</div>
      <div class="messageDetail-box-top-detail">
        <div class="messageDetail-box-top-detail-div">
          <p class="messageDetail-box-top-detail-div-p1">{{title}}</p>
          <p class="messageDetail-box-top-detail-div-p2">{{content}}</p>
          <img src="/static/images/detailimg.png" alt="">
          <p class="messageDetail-box-top-detail-div-p3">{{content}}</p>
          <p class="messageDetail-box-top-detail-div-p4">{{time}}</p>
          <p @click="backup" class="messageDetail-box-top-detail-div-p5">返回上一页</p>
        </div>
      </div>
    </div>
    <div style="clear:both;"></div>
  </div>
</template>

<script>
export default {
  name: 'messageDetail',
  data(){
    return{
      type:this.$route.params.type,
      title:'',
      content:'',
      time:''
    }
  },
  components: {

  },
  methods:{
    getdata(){
      this.$http.get(this.GLOBAL.base_url+'/api/message/messageDetail',{params:{
                id:this.$route.params.id
            }}).then(res=>{
                if(res.data.code == "1"){
                  this.title = res.data.data.title;
                  this.content = res.data.data.content;
                  this.time = res.data.data.create_time;
                }
            })
    },
    backup(){
      this.$router.push({
          name: 'message',
          params:{
            type:this.type
          }
        });
    }
  },
  mounted(){
    this.getdata()
  }
}

</script>

<style scoped>
  .messageDetail-box{
        width: 1015px;
        float: left;
        margin: 12px 0 0 16px;
        min-height: 950px;
        background: #fff;
    }
    .messageDetail-box-top{
      font-family: "PingFangSC-Thin";
      font-size: 22px;
      font-weight: 100;
      color: #999999;
      margin: 12px 0 14px 105px;
    }
    .messageDetail-box-top-detail{
      width: 740px;
      margin: 0 auto;
      padding:13px 30px 0 35px;
      border-top:1px solid #d8d8d8;
    }
    .messageDetail-box-top-detail-div-p1{
      font-family: "PingFangSC-Semibold";
      font-size: 20px;
      font-weight: 600;
      color: #333333;
      margin-bottom: 10px;
    }
    .messageDetail-box-top-detail-div-p2{
      font-family: "PingFangSC-Regular";
      font-size: 16px;
      color: #333333;
      margin-bottom: 12px;
    }
    .messageDetail-box-top-detail-div-p3{
      font-family: "PingFangSC-Regular";
      font-size: 12px;
      color: #666666;
      margin: 62px 0 10px;
    }
    .messageDetail-box-top-detail-div-p4{
      font-family: "PingFangSC-Thin";
      font-size: 12px;
      font-weight: 100;
      color: #999999;
      margin-bottom: 24px;
    }
    .messageDetail-box-top-detail-div-p5{
      font-family: "PingFangSC-Regular";
      font-size: 12px;
      color: #f96006;
      margin-bottom: 62px;
      cursor: pointer;
    }
</style>
