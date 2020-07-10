<template>
  <div id="objectData">
    <Top></Top>
    <Fix></Fix>
    <div class="object-box">
      <img src="/static/images/personal-img.png" alt="">
      <div class="object-box-wrap">
          <div class="object-box-wrap-top">商标异议申请</div>
          <div class="fail" v-if="status == '资料审核不通过'">审核不通过原因：{{remark}}</div>
          <div class="object-box-wrap-middle">
            <div class="object-box-wrap-middle-type">申请人类型：</div>
            <div class="object-box-middle-radio">
                <input class="radio1" value="1" v-model="picked" name="type" type="radio"><span>企业</span>
                <input class="radio2" value="2" v-model="picked" name="type" type="radio"><span>个人</span>
              </div>
              <div class="object-box-middle-box-company" v-show="divshow">
                <p>企业全称：</p>
                <select class="form_select" v-model="select1" @change='getValue1'>
                    <option value="0">请选择</option>
                    <option v-for="(v,k) in arr2" v-bind:value="v.id">{{v.company_name}}</option>
                </select>
                <span @click="toconfire1()">添加申请人</span>
              </div>
              <div class="object-box-middle-box-company" v-show="!divshow">
                <p>申请人姓名：</p>
                <select class="form_select" v-model="select2" @change='getValue2'>
                    <option value="0">请选择</option>
                    <option v-for="(v,k) in arr1" v-bind:value="v.id">{{v.chinese_name}}</option>
                </select>
                <span @click="toconfire2()">添加申请人</span>
              </div>
              <div class="object-box-middle-box-registerNum">
                  <div>商标注册号：</div>
                  <input type="text" v-model="num" maxlength="10">
              </div>
              <!-- <div class="object-box-middle-box-registerNum">
                  <div>商标类别：</div>
                  <select class="form_select" v-model="select3" @change='getValue3'>
                    <option value="0">请选择</option>
                    <option v-for="(v,k) in type" v-bind:value="v.id">第{{v.id}}类  {{v.name}}</option>
                  </select>
              </div> -->
              <div class="object-box-middle-box-evance">
                  <div>异议证据材料：</div>
                  <div>
                      <div> 
                        <input type="file" @change="getFile($event)">
                    </div>
                    <div class="object-box-middle-box-evance-des">
                        <p>资料包含(商品企业简介、企业发展历程、销售或使用等证明材料)</p>
                        <p>RAR或ZIP格式，压缩包200M以内，太大联系客服</p>
                    </div>
                  </div>
              </div>
              <div class="object-box-middle-two">
                <div @click="back">取消</div>
                <div @click="send">提交</div>
              </div>
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
  name: 'objectData',
  data(){
    return{
      picked:'1',
      divshow:true,
      type:[],
      file:'',
      filepath:'',
      // 个人认证
      arr1:[],
      // 企业认证
      arr2:[],
      select1:"0",
      select2:"0",
      select3:"0",
      apply_id:'',
      apply_id1:'',
      apply_id2:'',
      num:'',
      id:'',
      // 资料提交失败的原因
      status:'',
      remark:''
    }
  },
  watch:{
      "picked"(newValue){
          if(newValue =='1'){
              this.divshow=true;
          }else if(newValue=='2'){
            this.divshow=false;
          }
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
    getFile(event) {
        this.file = event.target.files[0];
         let formData = new FormData();
         formData.append('url_img',this.file);
         let size = this.file.size/(1024*1024);
         if(size>200){
             alert("文件超过200M")
         }else{
             this.$http.post(this.GLOBAL.base_url+"/api/BrandUpload/brandUploadFile",formData).then(res => {
                    if(res.data.code == "1"){
                      this.filepath = res.data.filepath;
                    }
                })
         }
    },
    getData1(){
      this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/applyList',{
                user_id:this.$cookie.getCookie('u_id')
            }).then(res=>{
              // console.log(res)
              if(res.data.code == "1"){
                this.arr1 = res.data.Authentication;
                this.arr2 = res.data.business;
                this.type = res.data.one_cate;
              }
            });
    },
    getData2(){
      this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/uploadDetail',{
                order_id:this.$route.query.order_id,
                good_name:this.$route.query.good_name
            }).then(res=>{
              if(res.data.code == "1"){
                if(res.data.brand_update.auth_type == "1"){
                  this.picked = res.data.brand_update.auth_type;
                  this.select1 = res.data.brand_update.apply_id;
                  this.apply_id1 = res.data.brand_update.apply_id;
                }
                if(res.data.brand_update.auth_type == "2"){
                  this.picked = res.data.brand_update.auth_type;
                  this.select2 = res.data.brand_update.apply_id;
                  this.apply_id2 = res.data.brand_update.apply_id;
                }
                this.num =  res.data.brand_update.brand_num;
                this.filepath = res.data.brand_update.upload_file;
                this.select3 = res.data.brand_update.one_cate;
                this.id = res.data.brand_update.id;
                this.remark = res.data.order.remark;
              }
            });
    },
    getValue1(){
        this.apply_id1 = this.select1;
    },
    getValue2(){
      this.apply_id2 = this.select2;
    },
    getValue3(){
    },
    send(){
      if(this.picked == "1"){
         if(this.apply_id1=="0"||this.apply_id1 == ""){
          this.tip("error","请添加申请企业");
          return false;
        }
        this.apply_id = this.apply_id1;
       }else if(this.picked == "2"){
         if(this.apply_id2=="0"||this.apply_id2 == ""){
          this.tip("error","请添加申请人");
          return false;
        }
        this.apply_id = this.apply_id2;
       }
       if(this.num == ''){
        this.tip("error","请填写商标注册号");
        return false;
      }
      // if(this.select3 == '0'){
      //   this.tip("error","请选择类别");
      //   return false;
      // }
      // if(this.filepath == ''){
      //   this.tip("error","请上传文件");
      //   return false;
      // }
      // console.log(this.filepath )
        this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/submitData',{
                click_type:this.$route.query.click_type,
                order_id:this.$route.query.order_id,
                auth_type:this.picked,
                apply_id:this.apply_id,
                id:this.id,
                type:this.$route.query.edit,
                brand_num:this.num,
                upload_file:this.filepath,
                one_cate:this.select3
            }).then(res=>{
              // console.log(res)
              if(res.data.code == "1"){
                this.tip('success','提交成功')
                setTimeout(()=>{
                     this.$router.push('/personal/order?status=all')
                 },500)
              }else{
                this.tip('error',res.data.msg)
              }
            });
    },
    back(){
        this.$router.push('/personal/order?status=all')
      },
      toconfire1(){
        this.$router.push({
          path:'/personal/companyForm',
          query:{
            submitData:0
          }
        })
      },
      toconfire2(){
        this.$router.push({
          path:'/personal/personalForm',
          query:{
            submitData:0
          }
        })
      },
  },
  components: {
    Top,
    Foot,
    Fix
  },
  mounted(){
    this.status = this.$route.query.status;
    this.getData1();
    if(this.$route.query.edit == "2"){
      this.getData2();
    }
  }
}

</script>

<style scoped>
  .object-box>img{
    width: 100%;
    height: 188px;
  }
  .object-box-wrap{
    width: 980px;
    margin: 0 auto 148px;
  }
  .object-box-wrap-top{
    border-bottom: 1px solid #d8d8d8;
    padding: 28px 0 10px;
    font-family: "PingFangSC-Regular";
    font-size: 24px;
    color: #adadad;
  }
  .object-box-wrap-middle-type{
    margin: 28px 0 17px;
    font-family: "PingFangSC-Regular";
    font-size: 24px;
    color: #333333;
  }
  .object-box-middle-radio>input{
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-right: 12px;
  }
  .object-box-middle-radio>span{
    font-family: "PingFangSC-Regular";
    font-size: 20px;
    vertical-align: middle;
    font-weight: 300;
    color: #333333;
  }
  .object-box-middle-radio>span:nth-of-type(1){
    margin-right: 45px;
  }
  .form_select {
    margin: 15px 40px 0 0;
    width: 793px;
    height: 40px;
    border-radius: 4px;
    border: solid 1px #d6d6d6;
    outline: none;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    font-size: 16px;
    padding-left: 16px;
}
.object-box-middle-box-company{
  margin: 28px 0;
}
.object-box-middle-box-company>p,.object-box-middle-box-ming>p{
  font-family: "PingFangSC-Regular";
  font-size: 24px;
  color: #333333;
}
.object-box-middle-box-company>span{
  font-family: "PingFangSC-Regular";
  font-size: 24px;
  color: #f96006;
  cursor: pointer;
}
.object-box-middle-box-registerNum{
    margin-bottom: 28px;
}
.object-box-middle-box-registerNum>div{
    margin-bottom: 15px;
    font-family: "PingFangSC-Regular";
    font-size: 24px;
    color: #333333;
}
.object-box-middle-box-registerNum>input{
     width: 776px;
     height: 40px;
     border-radius: 4px;
     border: solid 1px #d6d6d6;
     outline: none;
     padding-left: 15px;
}
.object-box-middle-box-evance{
    margin-bottom: 200px;
}
.object-box-middle-box-evance>div:nth-of-type(1){
     margin-bottom: 20px;
     font-family: "PingFangSC-Regular";
    font-size: 24px;
    color: #333333;
}
.object-box-middle-box-evance>div:nth-of-type(2)>div{
    float: left;
}
.object-box-middle-box-evance-des>p{
    font-family: "PingFangSC-Light";
    font-size: 16px;
    font-weight: 300;
    color: #a6a6a6;
}
.object-box-middle-box-evance-des>p:nth-of-type(1){
    color: #f96006;
    margin-bottom: 8px;
}
.object-box-middle-two{
      height: 53px;
      margin-left: 540px;
    }
    .object-box-middle-two>div{
      float: left;
      width: 182px;
      height: 53px;
      border-radius: 8px;
      border-style: solid;
      border-width: 2px;
      font-family: "PingFangSC-Regular";
      font-size: 24px;
      line-height: 53px;
      text-align: center;
      cursor: pointer;
    }
    .object-box-middle-two>div:nth-of-type(1){
      border-image-source: linear-gradient(to top, #d6d6d6, #d6d6d6);
      border-image-slice: 1;
      background-image: linear-gradient(to bottom, #ffffff, #e3e3e3), linear-gradient(to top, #d6d6d6, #d6d6d6);
      background-origin: border-box;
      background-clip: content-box, border-box;
      color: #f87e03;
      margin-right: 60px;
    }
    .object-box-middle-two>div:nth-of-type(2){
      border-image-source: linear-gradient(to top, #ba6100, #dc773b);
      border-image-slice: 1;
      background-image: linear-gradient(to bottom, #f79000, #f96006), linear-gradient(to top, #ba6100, #dc773b);
      background-origin: border-box;
      background-clip: content-box, border-box;
      color: #ffffff;
    }
  .fail{
    margin-top: 20px;
    font-size: 20px;
    color: red;
  }
</style>
