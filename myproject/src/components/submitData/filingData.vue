<template>
  <div id="filingData">
    <Top></Top>
    <Fix></Fix>
    <div class="filingData-box">
      <img src="/static/images/personal-img.png" alt="">
      <div class="filingData-box-wrap">
          <div class="filingData-box-wrap-top"> 商标许可备案</div>
          <div class="fail" v-if="status == '资料审核不通过'">审核不通过原因：{{remark}}</div>
          <div class="filingData-box-wrap-middle">
            <div class="filingData-box-wrap-middle-type">许可人类型：</div>
            <div class="filingData-box-middle-radio">
                <input class="radio1" value="1" v-model="picked1" name="type1" type="radio"><span>企业</span>
                <input class="radio2" value="2" v-model="picked1" name="type1" type="radio"><span>个人</span>
            </div>
            <div class="filingData-box-middle-box-company" v-show="divshow1">
              <p>许可人企业名称：</p>
              <select class="form_select" v-model="select1" @change='getValue1'>
                    <option value="0">请选择</option>
                    <option v-for="(v,k) in arr2" v-bind:value="v.id">{{v.company_name}}</option>
                </select>
              <span @click="toconfire1()">添加申请人</span>
            </div>
            <div class="filingData-box-middle-box-company" v-show="!divshow1">
              <p>许可人姓名：</p>
              <select class="form_select" v-model="select2" @change='getValue2'>
                    <option value="0">请选择</option>
                    <option v-for="(v,k) in arr1" v-bind:value="v.id">{{v.chinese_name}}</option>
                </select>
              <span @click="toconfire2()">添加申请人</span>
            </div>
            <div class="filingData-box-wrap-middle-type">被许可人类型：</div>
            <div class="filingData-box-middle-radio">
                <input class="radio1" value="1" v-model="picked2" name="type2" type="radio"><span>企业</span>
                <input class="radio2" value="2" v-model="picked2" name="type2" type="radio"><span>个人</span>
            </div>
            <div class="filingData-box-middle-box-company" v-show="divshow2">
              <p>被许可人企业名称：</p>
              <select class="form_select" v-model="select3" @change='getValue3'>
                    <option value="0">请选择</option>
                    <option v-for="(v,k) in arr2" v-bind:value="v.id">{{v.company_name}}</option>
                </select>
              <span @click="toconfire1()">添加申请人</span>
            </div>
            <div class="filingData-box-middle-box-company" v-show="!divshow2">
              <p>被许可人姓名：</p>
              <select class="form_select" v-model="select4" @change='getValue4'>
                    <option value="0">请选择</option>
                    <option v-for="(v,k) in arr1" v-bind:value="v.id">{{v.chinese_name}}</option>
                </select>
              <span @click="toconfire2()">添加申请人</span>
            </div>
            <div class="filingData-box-middle-registerNum">
              <p>商标注册号：</p>
              <input type="text" v-model="num" maxlength="10">
            </div>
            <!-- <div class="filingData-box-middle-select">
                  <div>商标类别：</div>
                  <select class="form_select" v-model="select5" @change='getValue5'>
                    <option value="0">请选择</option>
                    <option v-for="(v,k) in type" v-bind:value="v.id">第{{v.id}}类  {{v.name}}</option>
                  </select>
              </div> -->
              <div class="filingData-box-middle-pact">
                  <div>商标许可合同/协议：</div>
                  <div class="filingData-box-middle-pact-upload">
                      <div>
                        <el-upload
                            accept="image/*"
                            :http-request="uploadpic"
                            :show-file-list="false"
                            action="">
                            <img class="uploadicon" :src="icon?icon:'/static/images/icon.png'" alt="">
                        </el-upload>
                      </div>
                      <div>（盖公章后拍照上传）</div>
                  </div>
                  <div class="model">
                    <a :href="GLOBAL.base_url+'/public/materials/licenserecord/商标许可备案合同模板.docx'">合同模板下载</a>
                  </div>
              </div>
            <div class="filingData-box-middle-two">
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
  name: 'filingData',
  data(){
    return{
      picked1:'1',
      divshow1:true,
      divshow2:true,
      picked2:'1',
      type:[],
      // 个人认证
      arr1:[],
      // 企业认证
      arr2:[],
      select1:"0",
      select2:"0",
      select3:"0",
      select4:"0",
      select5:"0",
      apply_id:'',
      apply_id1:'',
      apply_id2:'',
      byapply_id:'',
      byapply_id1:'',
      byapply_id2:'',
      num:'',
      id:'',
      icon:'',
      ser_icon:'',
      // 资料提交失败的原因
      status:'',
      remark:''
    }
  },
  components: {
    Top,
    Foot,
    Fix
  },
  watch:{
      "picked1"(newValue){
          if(newValue =='1'){
              this.divshow1=true;
          }else if(newValue=='2'){
            this.divshow1=false;
          }
      },
      "picked2"(newValue){
          if(newValue =='1'){
              this.divshow2=true;
          }else if(newValue=='2'){
            this.divshow2=false;
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
     uploadpic(img){
       let formData=new FormData();
            formData.append('url_img',img.file);
            this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/brandUploadFile',formData).then(res=>{
              if(res.data.code == "1"){
                this.ser_icon = res.data.filepath;
                this.icon = this.GLOBAL.base_url+ res.data.filepath;
              }
            });
        },
        getData1(){
          this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/applyList',{
                    user_id:this.$cookie.getCookie('u_id')
                }).then(res=>{
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
                  this.picked1 = res.data.brand_update.auth_type;
                  this.select1 = res.data.brand_update.apply_id;
                  this.apply_id1 = res.data.brand_update.apply_id;
                }
                if(res.data.brand_update.auth_type == "2"){
                  this.picked1 = res.data.brand_update.auth_type;
                  this.select2 = res.data.brand_update.apply_id;
                  this.apply_id2 = res.data.brand_update.apply_id;
                }
                if(res.data.brand_update.assignee_type == "1"){
                  this.picked2 = res.data.brand_update.assignee_type;
                  this.select3 = res.data.brand_update.assignee_id;
                  this.byapply_id1 = res.data.brand_update.assignee_id;
                }
                if(res.data.brand_update.assignee_type == "2"){
                  this.picked2 = res.data.brand_update.assignee_type;
                  this.select4 = res.data.brand_update.assignee_id;
                  this.byapply_id2 = res.data.brand_update.assignee_id;
                }
                this.num =  res.data.brand_update.brand_num;
                this.select5 = res.data.brand_update.one_cate;
                this.id = res.data.brand_update.id;
                this.icon = this.GLOBAL.base_url+res.data.brand_update.upload_file;
                this.ser_icon = res.data.brand_update.upload_file;
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
        this.byapply_id1 = this.select3;
      },
      getValue4(){
        this.byapply_id2 = this.select4;
      },
      getValue5(){},
      send(){
      if(this.picked1 == "1"){
         if(this.apply_id1=="0"||this.apply_id1 == ""){
          this.tip("error","请选择许可人申请企业");
          return false;
        }
        this.apply_id = this.apply_id1;
       }else if(this.picked1 == "2"){
         if(this.apply_id2=="0"||this.apply_id2 == ""){
          this.tip("error","请选择许可申请人");
          return false;
        }
        this.apply_id = this.apply_id2;
       }
       if(this.picked2 == "1"){
         if(this.byapply_id1=="0"||this.byapply_id1 == ""){
          this.tip("error","请选择被许可人申请企业");
          return false;
        }
        this.byapply_id = this.byapply_id1;
       }else if(this.picked2 == "2"){
         if(this.byapply_id2=="0"||this.byapply_id2 == ""){
          this.tip("error","请选择被许可申请人");
          return false;
        }
        this.byapply_id = this.byapply_id2;
       }
       if(this.num == ''){
        this.tip("error","请填写商标注册号");
        return false;
      }
      // if(this.select5 == '0'){
      //   this.tip("error","请选择类别");
      //   return false;
      // }
      if(this.ser_icon == ''){
        this.tip("error","请上传商标许可合同或协议");
        return false;
      }
        this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/submitData',{
                click_type:this.$route.query.click_type,
                order_id:this.$route.query.order_id,
                auth_type:this.picked1,
                apply_id:this.apply_id,
                id:this.id,
                type:this.$route.query.edit,
                brand_num:this.num,
                one_cate:this.select5,
                upload_file:this.ser_icon,
                assignee_type:this.picked2,
                assignee_id:this.byapply_id
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
  .filingData-box>img{
    width: 100%;
    height: 188px;
  }
  .filingData-box-wrap{
    width: 980px;
    margin: 0 auto 148px;
  }
  .filingData-box-wrap-top{
    border-bottom: 1px solid #d8d8d8;
    padding: 28px 0 10px;
    font-family: "PingFangSC-Regular";
    font-size: 24px;
    color: #adadad;
  }
  .filingData-box-wrap-middle-type{
    margin: 28px 0 17px;
    font-family: "PingFangSC-Regular";
    font-size: 24px;
    color: #333333;
  }
  .filingData-box-middle-radio>input{
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-right: 12px;
  }
  .filingData-box-middle-radio>span{
    font-family: "PingFangSC-Regular";
    font-size: 20px;
    vertical-align: middle;
    font-weight: 300;
    color: #333333;
  }
  .filingData-box-middle-radio>span:nth-of-type(1){
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
.filingData-box-middle-box-company{
  margin: 28px 0;
}
.filingData-box-middle-box-company>p,.filingData-box-middle-box-ming>p,
.filingData-box-middle-registerNum>p,.filingData-box-middle-select>div,
.filingData-box-middle-pact>div:nth-of-type(1){
  font-family: "PingFangSC-Regular";
  font-size: 24px;
  color: #333333;
}
.filingData-box-middle-box-company>span{
  font-family: "PingFangSC-Regular";
  font-size: 24px;
  color: #f96006;
  cursor: pointer;
}
.filingData-box-middle-registerNum{
  margin-bottom: 28px;
}
.filingData-box-middle-registerNum>input{
  width: 776px;
  height: 40px;
  border-radius: 4px;
  border: solid 1px #d6d6d6;
  padding-left: 15px;
  outline: none;
  margin-top: 15px;
}
.uploadicon{
  width: 132px;
  height: 120px;
}
.filingData-box-middle-select{
  margin-bottom: 28px;
}
.filingData-box-middle-pact{
    margin-bottom: 150px;
}
.filingData-box-middle-pact-upload{
    margin-top: 15px;
    height: 120px;
}
.filingData-box-middle-pact-upload>div{
    float: left;
}
.filingData-box-middle-pact-upload>div:nth-of-type(2){
    margin: 92px 0 0 12px;
    font-family: "PingFangSC-Light";
    font-size: 20px;
    font-weight: 300;
    color: #a6a6a6;
}
.filingData-box-middle-two{
  height: 53px;
  margin-left: 540px;
}
.filingData-box-middle-two>div{
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
.filingData-box-middle-two>div:nth-of-type(1){
  border-image-source: linear-gradient(to top, #d6d6d6, #d6d6d6);
  border-image-slice: 1;
  background-image: linear-gradient(to bottom, #ffffff, #e3e3e3), linear-gradient(to top, #d6d6d6, #d6d6d6);
  background-origin: border-box;
  background-clip: content-box, border-box;
  color: #f87e03;
  margin-right: 60px;
}
.filingData-box-middle-two>div:nth-of-type(2){
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
.model{
  margin-top: 30px;
}
.model>a{
  text-decoration: none;
  color: blue;
}
</style>
