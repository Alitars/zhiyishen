<template>
  <div id="threeApply">
    <Top></Top>
    <Fix></Fix>
    <div class="threeApply-box">
      <img src="/static/images/personal-img.png" alt="">
      <div class="threeApply-box-wrap">
          <div class="threeApply-box-wrap-top"> 商标撤三申请</div>
          <div class="fail" v-if="status == '资料审核不通过'">审核不通过原因：{{remark}}</div>
          <div class="threeApply-box-wrap-middle">
            <div class="threeApply-box-wrap-middle-type">申请人类型：</div>
            <div class="threeApply-box-middle-radio">
                <input class="radio1" value="1" v-model="picked" name="type" type="radio"><span>企业</span>
                <input class="radio2" value="2" v-model="picked" name="type" type="radio"><span>个人</span>
              </div>
              <div class="threeApply-box-middle-box-company" v-show="divshow">
                <p>企业全称：</p>
                <select class="form_select" v-model="select1" @change='getValue1'>
                    <option value="0">请选择</option>
                    <option v-for="(v,k) in arr2" v-bind:value="v.id">{{v.company_name}}</option>
                </select>
                <span @click="toconfire1">添加申请人</span>
              </div>
              <div class="threeApply-box-middle-box-company" v-show="!divshow">
                <p>申请人姓名：</p>
                <select class="form_select" v-model="select2" @change='getValue2'>
                    <option value="0">请选择</option>
                    <option v-for="(v,k) in arr1" v-bind:value="v.id">{{v.chinese_name}}</option>
                </select>
                <span @click="toconfire2">添加申请人</span>
              </div>
              <div class="threeApply-box-middle-box-registerNum">
                  <div>商标注册号：</div>
                  <input type="text" v-model="num" maxlength="10">
              </div>
              <div class="threeApply-box-middle-box-reason">
                  <div>申请撤销理由：</div>
                    <div>
                        <textarea v-model="notedata" name=""  cols="50" rows="8"></textarea>
                    </div>
                    <div>示例：申请人未发现商标注册人在三年内使用过第xxxxxx号“xxx”  商标，特提出该撤销申请</div>
              </div>
              <!-- <div class="threeApply-box-middle-box-registerNum">
                  <div>商标类别：</div>
                  <select class="form_select" v-model="select3" @change='getValue3'>
                    <option value="0">请选择</option>
                    <option v-for="(v,k) in type" v-bind:value="v.id">第{{v.id}}类  {{v.name}}</option>
                  </select>
              </div> -->
              <div class="threeApply-box-middle-two">
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
  name: 'threeApply',
  data(){
    return{
      picked:'1',
      divshow:true,
      type:[],
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
      notedata:'',
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
              // console.log(res)
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
                this.select3 = res.data.brand_update.one_cate;
                this.id = res.data.brand_update.id;
                this.remark = res.data.order.remark;
                this.notedata = res.data.brand_update.revoking_reson;
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
      if(this.notedata == ''){
        this.tip("error","请填写撤销理由");
        return false;
      }
        this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/submitData',{
                click_type:this.$route.query.click_type,
                order_id:this.$route.query.order_id,
                auth_type:this.picked,
                apply_id:this.apply_id,
                id:this.id,
                type:this.$route.query.edit,
                brand_num:this.num,
                one_cate:this.select3,
                revoking_reson:this.notedata
            }).then(res=>{
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
  .threeApply-box>img{
    width: 100%;
    height: 188px;
  }
  .threeApply-box-wrap{
    width: 980px;
    margin: 0 auto 148px;
  }
  .threeApply-box-wrap-top{
    border-bottom: 1px solid #d8d8d8;
    padding: 28px 0 10px;
    font-family: "PingFangSC-Regular";
    font-size: 24px;
    color: #adadad;
  }
  .threeApply-box-wrap-middle-type{
    margin: 28px 0 17px;
    font-family: "PingFangSC-Regular";
    font-size: 24px;
    color: #333333;
  }
  .threeApply-box-middle-radio>input{
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-right: 12px;
  }
  .threeApply-box-middle-radio>span{
    font-family: "PingFangSC-Regular";
    font-size: 20px;
    vertical-align: middle;
    font-weight: 300;
    color: #333333;
  }
  .threeApply-box-middle-radio>span:nth-of-type(1){
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
.threeApply-box-middle-box-company{
  margin: 28px 0;
}
.threeApply-box-middle-box-company>p,.threeApply-box-middle-box-ming>p{
  font-family: "PingFangSC-Regular";
  font-size: 24px;
  color: #333333;
}
.threeApply-box-middle-box-company>span{
  font-family: "PingFangSC-Regular";
  font-size: 24px;
  color: #f96006;
  cursor: pointer;
}
.threeApply-box-middle-box-registerNum{
    margin-bottom: 28px;
}
.threeApply-box-middle-box-registerNum>div{
    margin-bottom: 15px;
    font-family: "PingFangSC-Regular";
    font-size: 24px;
    color: #333333;
}
.threeApply-box-middle-box-registerNum>input{
     width: 776px;
     height: 40px;
     border-radius: 4px;
     border: solid 1px #d6d6d6;
     outline: none;
     padding-left: 15px;
}
.threeApply-box-middle-two{
      height: 53px;
      margin-left: 540px;
      margin-top: 100px;
    }
.threeApply-box-middle-two>div{
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
.threeApply-box-middle-two>div:nth-of-type(1){
    border-image-source: linear-gradient(to top, #d6d6d6, #d6d6d6);
    border-image-slice: 1;
    background-image: linear-gradient(to bottom, #ffffff, #e3e3e3), linear-gradient(to top, #d6d6d6, #d6d6d6);
    background-origin: border-box;
    background-clip: content-box, border-box;
    color: #f87e03;
    margin-right: 60px;
}
.threeApply-box-middle-two>div:nth-of-type(2){
    border-image-source: linear-gradient(to top, #ba6100, #dc773b);
    border-image-slice: 1;
    background-image: linear-gradient(to bottom, #f79000, #f96006), linear-gradient(to top, #ba6100, #dc773b);
    background-origin: border-box;
    background-clip: content-box, border-box;
    color: #ffffff;
}
.threeApply-box-middle-box-reason{
  height: 300px;
}
.threeApply-box-middle-box-reason>div{
  float: left;
}
.threeApply-box-middle-box-reason>div:nth-of-type(1){
  font-size: 24px;
  color:#333333;
}
.threeApply-box-middle-box-reason>div:nth-of-type(2){
  margin-top: 8px;
}
.threeApply-box-middle-box-reason>div:nth-of-type(2)>textarea{
  outline: none;
  font-size: 16px;
  padding: 10px;
   border: solid 1px #d6d6d6;
} 
.threeApply-box-middle-box-reason>div:nth-of-type(3){
  width: 250px;
  color: red;
  margin-left: 20px;

}
.fail{
  margin-top: 20px;
  font-size: 20px;
  color: red;
}
</style>
