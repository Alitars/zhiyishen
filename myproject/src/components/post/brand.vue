<template>
  <div id="brand">
    <Top></Top>
    <Fix></Fix>
    <div class="brand-box">
        <img src="/static/images/personal-img.png" alt="">
        <div class="brand-box-wrap">
            <div class="brand-box-wrap-title">{{click_type}}</div>
            <div class="brand-box-wrap-continer">
                <div class="brand-box-wrap-continer-img"></div>
                <div class="brand-box-wrap-continer-do">
                    <div>{{click_type}}正文</div>
                    <div>
                        <a :href="GLOBAL.base_url+this.brand_see" target="_blank" rel="noopener noreferrer">预览</a>
                        <a :href="GLOBAL.base_url+'/api/order/fileDownload?name='+this.brand_load+'&type=1'">下载</a>
                    </div>
                </div>
            </div>
            <div class="brand-box-wrap-continer-agree">
                <div>是否同意</div>
                <div>
                    <input type="radio" value="1" v-model="get" name="agree" ><span>是</span>
                    <input type="radio" value="2" v-model="get" name="agree" ><span>否</span>
                </div>
                <div v-show="suggest">
                    <div>修改意见</div>
                    <div>
                        <textarea v-model="notedata" name=""  cols="50" rows="18"></textarea>
                    </div>
                </div>
            </div>
            <div class="brand-box-handle">
                <div @click="give">提交</div>
                <div @click="back">取消</div>
            </div>
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
  name: 'brand',
  data(){
    return{
       get:'1',
       brand_see:'',
       brand_load:'',
       suggest:false,
       click_type:'',
       notedata:''
    }
  },
  components: {
    Top,
    Foot,
    Fix
  },
  watch:{
      "get"(newValue){
          if(newValue =='1'){
              this.suggest = false
          }else if(newValue=='2'){
            this.suggest=true;
          }
      },
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
        getData(){
            this.$http.post(this.GLOBAL.base_url+'/api/order/applyUploadFile',{
                order_id:this.$route.query.order_id
            }).then(res=>{
              if(res.data.code == "1"){
                this.brand_see = res.data.data.brand_certificate;
                this.brand_load = res.data.data.brand_certificates;
                // console.log(res)
              }
            });
        },
        give(){
            if(this.get == "2"&&this.notedata==""){
                this.tip('error',"请填写不同意的理由");
            }else{
                this.$http.post(this.GLOBAL.base_url+'/api/order/composeNote',{
                    order_id:this.$route.query.order_id,
                    click_type:this.$route.query.click_type,
                    is_agree:this.get,
                    edit_opinion:this.notedata
            }).then(res=>{
                if(res.data.code == "1"){
                  this.tip('success',res.data.msg);
                  setTimeout(()=>{
                     this.$router.push('/personal/order?status=all')
                 },500)
              }
            })
            }
        },
        back(){
            this.$router.push('/personal/order?status=all')
        }
  },
  mounted(){
      this.click_type=this.$route.query.click_type;
      this.getData();
  }
}

</script>

<style scoped>
 .brand-box{
    margin-bottom: 200px;  
 }
 .brand-box>img{
     width: 100%;
    height: 188px;
 }
  .brand-box-wrap{
      width: 1100px;
      margin: 0 auto;
  }
  .brand-box-wrap-title{
      height: 78px;
     font-family: "PingFangSC-Semibold";
     font-size: 36px;
     font-weight: 600;
     color: #333333;
     padding-top: 52px;
     border-bottom: 1px solid #d8d8d8;
     margin-bottom: 50px;
  }
  .brand-box-wrap-continer-img{
      width: 117px;
      height: 117px;
      background: url("/static/images/datawrite.png") no-repeat;
      background-size: cover;
      margin-right: 12px;
  }
  .brand-box-wrap-continer{
      height: 117px;
      margin-bottom: 50px;
  }
  .brand-box-wrap-continer>div{
      float: left;
  }
  .brand-box-wrap-continer-do>div:nth-of-type(1){
    font-family: "PingFangSC-Regular";
    font-size: 32px;
    color: #333333;
    margin:14px 0 16px;
  }
  .brand-box-wrap-continer-do>div:nth-of-type(2)>a{
      text-decoration: none;
      font-family: "PingFangSC-Regular";
      font-size: 24px;
      color: #f96006;
      cursor: pointer;
  }
  .brand-box-wrap-continer-do>div:nth-of-type(2)>a:nth-of-type(1){
      margin-right: 120px;
  }
  .brand-box-wrap-continer-agree{
      height: 450px;
      margin-left: 16px;
  }
  .brand-box-wrap-continer-agree>div:nth-of-type(1){
     font-family: "PingFangSC-Regular";
     font-size: 20px;
     color: #333333;
     margin-bottom: 14px;
  }
  .brand-box-wrap-continer-agree>div:nth-of-type(2){
      margin-bottom: 30px;
  }
  .brand-box-wrap-continer-agree>div:nth-of-type(2)>input{
      width: 24px;
      height: 24px;
      vertical-align: middle;
      margin-right: 12px;
  }
  .brand-box-wrap-continer-agree>div:nth-of-type(2)>span{
      font-family: "PingFangSC-Light";
      font-size: 20px;
      font-weight: 300;
      color: #333333;
      vertical-align: middle;
  }
  .brand-box-wrap-continer-agree>div:nth-of-type(2)>span:nth-of-type(1){
      margin-right: 65px;
  }
  .brand-box-wrap-continer-agree>div:nth-of-type(3){
      height: 350px;
  }
  .brand-box-wrap-continer-agree>div:nth-of-type(3)>div{
      float: left;
  }
  .brand-box-wrap-continer-agree>div:nth-of-type(3)>div:nth-of-type(1){
      font-family: "PingFangSC-Regular";
     font-size: 20px;
     color: #333333;
     margin-right: 30px;
  }
  .brand-box-wrap-continer-agree>div:nth-of-type(3)>div:nth-of-type(2){
      margin-top: 5px;
  }
  .brand-box-wrap-continer-agree>div:nth-of-type(3)>div:nth-of-type(2)>textarea{
      outline: none;
      font-size: 16px;
      padding: 10px;
  }
  .brand-box-handle{
     margin-top: 50px;
     margin-left: 580px;
     height: 41px;
 }
 .brand-box-handle>div{
     float: left;
     cursor: pointer;
     width: 214px;
     height: 41px;
     border-radius: 4px;
     border-style: solid;
     border-width: 1px;
     text-align: center;
     line-height: 41px;
     font-family: "PingFangSC-Regular";
     font-size: 18px;
 }
 .brand-box-handle>div:nth-of-type(1){
     border-image-source: linear-gradient(to top, #ba6100, #dc773b);
     border-image-slice: 1;
     background-image: linear-gradient(to bottom, #f79000, #f96006), linear-gradient(to top, #ba6100, #dc773b);
     background-origin: border-box;
     background-clip: content-box, border-box;
     color: #ffffff;
 }
 .brand-box-handle>div:nth-of-type(2){
      border-image-source: linear-gradient(to top, #d6d6d6, #d6d6d6);
      border-image-slice: 1;
      background-image: linear-gradient(to bottom, #ffffff, #e3e3e3), linear-gradient(to top, #d6d6d6, #d6d6d6);
      background-origin: border-box;
      background-clip: content-box, border-box;
      color: #f87604;
      margin-left: 87px;
 }
</style>
