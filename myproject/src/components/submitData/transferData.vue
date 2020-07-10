<template>
  <div id="transferData">
    <Top></Top>
    <Fix></Fix>
    <div class="transferData-box">
      <img src="/static/images/personal-img.png" alt="">
      <div class="transferData-box-wrap">
          <div class="transferData-box-wrap-top">商标转让</div>
          <div class="fail" v-if="status == '资料审核不通过'">审核不通过原因：{{remark}}</div>
          <div class="transferData-box-wrap-middle">
            <div class="transferData-box-wrap-middle-type">转让人类型：</div>
            <div class="transferData-box-middle-radio">
                <input class="radio1" value="1" v-model="picked1" name="type1" type="radio"><span>企业</span>
                <input class="radio2" value="2" v-model="picked1" name="type1" type="radio"><span>个人</span>
            </div>
            <div class="transferData-box-middle-box-company" v-show="divshow1">
              <p>转让人企业名称：</p>
               <select class="form_select" v-model="select1" @change='getValue1'>
                    <option value="0">请选择</option>
                    <option v-for="(v,k) in arr2" v-bind:value="v.id">{{v.company_name}}</option>
                </select>
              <span @click="toconfire1">添加申请人</span>
            </div>
            <div class="transferData-box-middle-box-company" v-show="!divshow1">
              <p>转让人姓名：</p>
              <select class="form_select" v-model="select2" @change='getValue2'>
                    <option value="0">请选择</option>
                    <option v-for="(v,k) in arr1" v-bind:value="v.id">{{v.chinese_name}}</option>
                </select>
              <span @click="toconfire2">添加申请人</span>
            </div>
            <div class="transferData-box-wrap-middle-type">受让人类型：</div>
            <div class="transferData-box-middle-radio">
                <input class="radio1" value="1" v-model="picked2" name="type2" type="radio"><span>企业</span>
                <input class="radio2" value="2" v-model="picked2" name="type2" type="radio"><span>个人</span>
            </div>
            <div class="transferData-box-middle-box-company" v-show="divshow2">
              <p>受让人企业名称：</p>
              <select class="form_select" v-model="select3" @change='getValue3'>
                    <option value="0">请选择</option>
                    <option v-for="(v,k) in arr2" v-bind:value="v.id">{{v.company_name}}</option>
                </select>
              <span @click="toconfire1">添加申请人</span>
            </div>
            <div class="transferData-box-middle-box-company" v-show="!divshow2">
              <p>受让人姓名：</p>
              <select class="form_select" v-model="select4" @change='getValue4'>
                    <option value="0">请选择</option>
                    <option v-for="(v,k) in arr1" v-bind:value="v.id">{{v.chinese_name}}</option>
                </select>
              <span @click="toconfire2">添加申请人</span>
            </div>
            <div class="transferData-box-middle-registerNum">
              <p>商标申请号/注册号：</p>
              <input type="text" v-model="num" maxlength="10">
            </div>
            <!-- <div class="transferData-box-middle-select">
                  <div>商标类别：</div>
                  <select class="form_select" v-model="select5" @change='getValue5'>
                    <option value="0">请选择</option>
                    <option v-for="(v,k) in type" v-bind:value="v.id">第{{v.id}}类  {{v.name}}</option>
                  </select>
              </div> -->
            <div class="transferData-box-middle-two">
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
  name: 'transferData',
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
          this.tip("error","请添加转让人企业");
          return false;
        }
        this.apply_id = this.apply_id1;
       }else if(this.picked1 == "2"){
         if(this.apply_id2=="0"||this.apply_id2 == ""){
          this.tip("error","请添加转让人名称");
          return false;
        }
        this.apply_id = this.apply_id2;
       }
       if(this.picked2 == "1"){
         if(this.byapply_id1=="0"||this.byapply_id1 == ""){
          this.tip("error","请添加受让人企业");
          return false;
        }
        this.byapply_id = this.byapply_id1;
       }else if(this.picked2 == "2"){
         if(this.byapply_id2=="0"||this.byapply_id2 == ""){
          this.tip("error","请添加受让人名称");
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
        this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/submitData',{
                click_type:this.$route.query.click_type,
                order_id:this.$route.query.order_id,
                auth_type:this.picked1,
                apply_id:this.apply_id,
                id:this.id,
                type:this.$route.query.edit,
                brand_num:this.num,
                one_cate:this.select5,
                assignee_type:this.picked2,
                assignee_id:this.byapply_id
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
  .transferData-box>img{
    width: 100%;
    height: 188px;
  }
  .transferData-box-wrap{
    width: 980px;
    margin: 0 auto 148px;
  }
  .transferData-box-wrap-top{
    border-bottom: 1px solid #d8d8d8;
    padding: 28px 0 10px;
    font-family: "PingFangSC-Regular";
    font-size: 24px;
    color: #adadad;
  }
  .transferData-box-wrap-middle-type{
    margin: 28px 0 17px;
    font-family: "PingFangSC-Regular";
    font-size: 24px;
    color: #333333;
  }
  .transferData-box-middle-radio>input{
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-right: 12px;
  }
  .transferData-box-middle-radio>span{
    font-family: "PingFangSC-Regular";
    font-size: 20px;
    vertical-align: middle;
    font-weight: 300;
    color: #333333;
  }
  .transferData-box-middle-radio>span:nth-of-type(1){
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
.transferData-box-middle-box-company{
  margin: 28px 0;
}
.transferData-box-middle-box-company>p,.transferData-box-middle-box-ming>p,
.transferData-box-middle-registerNum>p,.transferData-box-middle-select>div{
  font-family: "PingFangSC-Regular";
  font-size: 24px;
  color: #333333;
}
.transferData-box-middle-box-company>span{
  font-family: "PingFangSC-Regular";
  font-size: 24px;
  color: #f96006;
  cursor: pointer;
}
.transferData-box-middle-registerNum{
  margin-bottom: 28px;
}
.transferData-box-middle-registerNum>input{
  width: 776px;
  height: 40px;
  border-radius: 4px;
  border: solid 1px #d6d6d6;
  padding-left: 15px;
  outline: none;
  margin-top: 15px;
}
.transferData-box-middle-select{
  margin-bottom: 155px;
}
.transferData-box-middle-two{
  height: 53px;
  margin-left: 540px;
}
.transferData-box-middle-two>div{
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
.transferData-box-middle-two>div:nth-of-type(1){
  border-image-source: linear-gradient(to top, #d6d6d6, #d6d6d6);
  border-image-slice: 1;
  background-image: linear-gradient(to bottom, #ffffff, #e3e3e3), linear-gradient(to top, #d6d6d6, #d6d6d6);
  background-origin: border-box;
  background-clip: content-box, border-box;
  color: #f87e03;
  margin-right: 60px;
}
.transferData-box-middle-two>div:nth-of-type(2){
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
