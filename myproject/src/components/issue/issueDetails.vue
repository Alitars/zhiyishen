<template>
  <div class="issueDetails-container">
    <div class="issueDetails-box">
      <div class="issueDetails-title">
        <div class="issueDetails-box-orderInfo">订单信息</div>
        <div class="issueDetails-box-infor">
          <div>
            <span>订单号:</span>
            <span>{{order_id}}</span>
          </div>
          <div>
            <span>技术名称:</span>
            <span>{{name}}</span>
          </div>
          <div>
            <span>订单状态:</span>
            <span>{{status_name}}</span>
          </div>
          <div>
            <span>下单时间:</span>
            <span>{{created_at}}</span>
          </div>
          <div>
            <span>订单金额:</span>
            <span>{{price}}</span>
          </div>
          <div>
            <span>支付方式:</span>
            <span>{{pay_name}}</span>
          </div>
          <div>
            <span>支付金额:</span>
            <span>{{price}}</span>
          </div>
        </div>
      </div>
      <div class="issueDetails-box-file" v-show="status_name == '修改中' || status_name == '撰写中'">
        <div class="issueDetails-box-file-infor">文件信息</div>
        <div class="issueDetails-box-file-top" v-show="this.images == this.images">
            <div class="issueDetails-box-file-top-img"></div>
            <div class="issueDetails-box-file-top-div" >
              <div>技术交底书</div>
              <div>
                <a :href="GLOBAL.base_url + this.images " target="_blank" >预览</a>
                <a :href="GLOBAL.base_url+'/api/patent/downloadFile'+this.images">下载</a>
              </div>
            </div>
          </div>
          <div style="clear:both"></div>
          <div class="issueDetails-box-file-modify"><span @click="open">修改技术交底书</span></div>
          <textarea class="issueDetails-box-file-textarea" v-model="content" v-if="textareaShow"></textarea>
          <div style="clear:both"></div>
          <div class="issueDetails-box-file-but" v-if="textareaShow">
            <span @click="remove">取消</span>
            <span @click="submit">提交</span>
          </div>
      </div>
    </div>
    <div style="clear:both;"></div>
  </div>
</template>

<script>
  export default {
    name:'issueDetails',
    data(){
      return {
        order_id:'',
        name:'',
        status_name:'',
        created_at:'',
        price:'',
        pay_name:'',
        images:'',
        textareaShow:false,
        content:''
      }
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
      getList(){
        this.$http.post(this.GLOBAL.base_url+'/api/patent/ansDetail',{
          user_id:this.$cookie.getCookie('u_id'),
          id:this.$route.query.Bid
        }).then(res => {
          console.log(res)
          if(res.data.code == '1') {
            this.order_id = res.data.data.order_id
            this.name = res.data.data.name
            this.status_name = res.data.data.status_name
            this.created_at = res.data.data.created_at
            this.price = res.data.data.price
            this.pay_name = res.data.data.pay_name
            this.images = res.data.data.images
          }
        })
      },
      open() {
        this.textareaShow = true
      },
      remove() {
        this.textareaShow = false
      },
      submit() {
        if(this.content == '') {
          this.tip('error','请输入修改意见')
        }else {
          this.$http.post(this.GLOBAL.base_url+'/api/patent/ansOpinion',{
            user_id:this.$cookie.getCookie('u_id'),
            id:this.$route.query.Bid,
            content:this.content
          }).then(res => {
            console.log(res)
            this.tip('success','修改完成')
            this.textareaShow = false
            this.content = ''
          })
        }
      }
    },
    mounted(){
      this.getList()
    }
  }
</script>

<style scoped>
  .issueDetails-box{
    width: 1015px;
    margin: 12px 0px 0px 16px;
    float: left;
    background-color: #fff;
    padding-top: 44px;
    box-sizing: border-box;
    min-height:876px ;
  }
  .issueDetails-box-orderInfo{
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
  .issueDetails-box-infor{
    width: 734px;
    margin-bottom: 54px;
    margin-left: 64px;
    padding-bottom: 50px;
    border-bottom: 1px solid #d8d8d8;
  }
  .issueDetails-box-infor > div {
    font-family: "PingFangSC";
    margin-top: 16px;
    font-size: 16px;;
    font-weight: 500;
    color: #333333;
  }
  .issueDetails-box-infor > div:nth-child(1) {
    margin-top: 16px;
    margin-left: 16px;
  }
  .issueDetails-box-infor > div > span:nth-child(2) {
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 500;
    color: #333333;
  }
  .issueDetails-box-infor > div > span:nth-child(1) {
    margin-right: 32px;
  }

  .issueDetails-box-file-infor,.issueDetails-box-suggest-top{
    width: 734px;
    height: 28px;
    line-height: 28px;
    font-family: "PingFangSC";
    font-size: 14px;
    font-weight: 500;
    color: #000000;
    border-bottom: 1px solid #d8d8d8;
    margin-left: 64px;
  }
  .issueDetails-box-file-wrap{
    width: 780px;
  }
  .issueDetails-box-file-top{
    float: left;
    width: 230px;
    height: 64px;
    margin: 32px 40px 0 0;
    margin-left: 64px;
  }
  .issueDetails-box-file-top:nth-of-type(3n){
    margin-right: 0;
  }
  .issueDetails-box-file-top>div{
    float: left;
  }
  .issueDetails-box-file-top-div>div:nth-of-type(1){
    font-family: "PingFangSC";
    font-size: 14px;
    color: #333333;
    margin: 4px 0 12px;
  }
  .issueDetails-box-file-top-div>div:nth-of-type(2)>a{
    text-decoration: none;
    font-family: "PingFangSC";
    font-size: 14px;
    color: #f96006;
    cursor: pointer;
  }
  .issueDetails-box-file-top-div>div:nth-of-type(2)>a:nth-of-type(1){
    margin-right: 30px;
  }
  .issueDetails-box-file-top-img{
    width: 64px;
    height: 64px;
    background: url("/static/images/datawrite.png") no-repeat;
    background-size: cover;
    margin-right: 10px;
  }
  .issueDetails-box-file-modify {
    margin:32px 0 0 64px;
    font-family: "PingFangSC";
    color: #333333
  }
  .issueDetails-box-file-modify >span {
    cursor: pointer;
    color: #333;
    font-family: "PingFangSC";
    /* font-size: 14px; */
    width: 144px;
    height: 38px;
    border-radius: 4px;
    background-color: #f96006;
    /* margin: 0 auto; */
    line-height: 38px;
    font-size: 16px;
    color: #fff;
    display: inline-block;
    text-align: center;
  }
  .issueDetails-box-file-textarea {
    width: 734px;
    height: 90px;
    margin: 32px 0 0 64px;
    padding: 12px 0 0 14px;
    font-size: 16px;
    resize:none;
  }
  .issueDetails-box-file-but {
    float: right;
    margin: 24px 197px 64px 0;
  }
  .issueDetails-box-file-but >span:first-child{
    background: url(/static/images/invalid-name1h.png);
    color: #f96006;
    margin-right: 32px;
    display: inline-block;
    width: 80px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    margin-bottom: 64px;
    cursor: pointer;
  }
  .issueDetails-box-file-but >span:last-child{
    background: url(/static/images/invalid-name1f.png);
    color: #fff;
    display: inline-block;
    width: 80px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    margin-bottom: 64px;
    cursor: pointer;
  }
</style>
