<template>
  <div id="registerData">
    <Top></Top>
    <Fix></Fix>
    <div class="data-box">
      <div class="data-box-wrap">
          <div class="data-box-wrap-top">商标注册</div>
          <div class="fail" v-if="status == '资料审核不通过'">审核不通过原因：{{remark}}</div>
          <div class="data-box-wrap-middle">
            <div class="data-box-wrap-middle-title">商标信息</div>
            <div class="data-box-wrap-middle-img">
                <div>商标图样</div>
                <div>
                  <img :src="GLOBAL.base_url+this.img" alt="">
                </div>
                <div class="data-box-edit">
                  <div class="data-box-size" v-show="nameshow">
                      <select  v-model="value" @change="getsize" class="changsize">
                          <option value="0">选择字体</option>
                          <option v-for="(v,k) in options" :value="v.id">{{v.font_name}}</option>
                      </select>
                  </div>
                  <div class="data-box-upload">
                      <div>上传图片</div>
                      <input type="file" accept="image/*" @change="uplaodimg($event)">
                  </div>
                </div>
            </div>
            <div class="data-color">
              <div class="data-color-title">商标颜色</div>
              <div class="data-color-radio">
                <input class="radio1" value="1" v-model="color" name="type" type="radio"><span>黑白注册</span>
                <input class="radio2" value="2" v-model="color" name="type" type="radio"><span>指定颜色注册</span>
              </div>
            </div>
            <div class="data-remaind">注：黑白注册，注册后可以更换商标颜色使用，上传的图样必须是黑白颜色；指定颜色注册，注册后只能按照上传图样的颜色使用</div>
            <div class="data-color">
              <div class="data-color-title">商标共有</div>
              <div class="data-color-radio">
                <input class="radio1" value="1" v-model="agree" name="type2" type="radio"><span>是</span>
                <input class="radio2" value="2" v-model="agree" name="type2" type="radio"><span>否</span>
              </div>
            </div>
            <div class="data-box-middle-box-same" v-show="sameshow">
                <span>共有企业</span>
                <select class="form_select2" v-model="same" @change='getValue'>
                    <option value="0">请选择</option>
                    <option v-for="(v,k) in arr2" v-bind:value="v.id">{{v.company_name}}</option>
                </select>
                <span @click="toconfire1()">添加共有企业</span>
              </div>
              <div class="data-remaind">注：多家公司共同拥有此商标的使用权</div>
            <div class="data-box-wrap-middle-little">
              <div class="little-title">商标类别</div>
              <div class="little-detail">
                <div class="detail-div1">{{one_cate}} {{first_cate}}</div>
                <div class="detail-div2" v-show="!editshow">
                    <div v-for="(v,k) in three_brand">{{v.num}} {{v.name}}；</div>
                    <div @click="edit">修改小商品</div>
                </div>
                <div class="detail-div3" v-show="editshow">
                    <div class="detail-div3-littlediv">
                      <div v-for="(v,k) in three_brand">
                        <div>{{v.num}} {{v.name}}</div>
                        <div @click="del(k,v.id)">X</div>
                      </div>
                      <div @click="count">保存小商品</div>
                    </div>
                    <div class="detail-div3-count">
                      <img src="/static/images/alert.png" alt="">
                      <span v-if="length>=10">商品总数{{length}}个，当前可选择{{length - three_brand.length}}个</span>
                      <span v-else>商品总数{{length}}个，当前可选择{{10 - three_brand.length}}个</span>
                    </div>
                    <div class="detail-div3-chose">
                        <div class="chose1">
                            <div v-for="(v,k) in twocate" :class="{colorChange:v.num==dynamic}" @click="chosetwo(v.num)">{{v.num}}{{v.name}}</div>
                        </div>
                        <div class="chose2">
                            <div v-for="(v,k) in threecate" :class="{setActive: isexit(v.id)}" @click="addcate(v.id,v.num,v.name)">{{v.num}}{{v.name}}</div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
            <div class="data-box-wrap-middle-type">申请人</div>
              <div class="data-box-middle-box-company">
                <select class="form_select" v-model="select1" @change='getValue1'>
                    <option value="0">请选择</option>
                    <option v-for="(v,k) in arr2" v-bind:value="v.id">{{v.company_name}}</option>
                </select>
                <span @click="toconfire1()">添加申请人</span>
              </div>
              <div class="data-box-middle-infor">
                <div>
                  <span>法人</span>
                  <span>{{referee}}</span>
                </div>
                <div>
                  <span>社会统一信用码</span>
                  <span>{{license_num}}</span>
                </div>
                <div>
                  <span>注册地址</span>
                  <span>{{card_address}}</span>
                </div>
              </div>
              <div class="data-color-radio" v-show="typeshow">
                <input class="radio2" value="2" v-model="nametype" name="type3" type="radio"><span>法人申请</span>
                <input class="radio1" value="1" v-model="nametype" name="type3" type="radio"><span>企业名称申请</span>
              </div>
              <div class="data-remaind2" v-show="typeshow">《个体工商户营业执照》登记的字号作为申请人名义提出商标注册申请，也可以以执照上登记的负责人名义提出商标注册申请。根据个人喜好两者并无差别。</div>
              <div class="data-upload" v-show="uploadshow">
                <!-- <div>
                  <div>
                      <el-upload
                        accept="image/*"
                        :http-request="uploadident"
                        :show-file-list="false"
                        action="">
                        <img class="idimg" :src="identimg_url?identimg_url:'/static/images/please.png'" alt="">
                      </el-upload>
                      <div class="data-increased">身份证复印件<span>（签字后拍照上传）</span></div>
                  </div>
                  <div>
                    <el-image 
                      style="width: 120px; height: 140px"
                      :src="url" 
                      :preview-src-list="srcList">
                    </el-image>
                    <div style="color:red;margin-left:40px;">示例</div>
                  </div>
                </div> -->
                <div>
                  <div>
                      <el-upload
                        accept="image/*"
                        :http-request="uploadcard"
                        :show-file-list="false"
                        action="">
                        <img class="idimg" :src="cardimg_url?cardimg_url:'/static/images/please.png'" alt="">
                      </el-upload>
                      <div class="data-increased">营业执照复印件<span>（盖章后拍照上传）</span></div>
                  </div>
                  <div>
                    <el-image 
                      style="width: 130px; height: 150px"
                      :src="url2" 
                      :preview-src-list="srcList2">
                    </el-image>
                    <div style="color:red;margin-left:50px;">示例</div>
                  </div>
                </div>
              </div>
              <div class="data-box-middle-shu">商标代理委托书：</div>
              <div class="data-box-middle-shu-upload">
                <div class="imgdata">
                    <el-upload
                    accept="image/*"
                    :http-request="upload"
                    :show-file-list="false"
                    action="">
                    <img class="dataimg" :src="dataimg?dataimg:'/static/images/uploadData.png'" alt="">
                    </el-upload>
                </div>
                <div class="load">
                    <p>*选择申请人并盖公章拍照上传，委托书是png、jpg格式且大小不小于300kb,修改时点击图片重新上传</p>
                    <div v-show="loadshow" class="load-div1">
                      <a :href="GLOBAL.win_url+'/api/order/mergerSubmit?order_id='+this.order_id+'&apply_id='+this.apply_id1+'&brand_img='+this.img+'&brand_type='+this.nametype">下载委托书</a>
                    </div>
                    <div v-show="!loadshow" class="load-div2">
                      <a href="javascript:void(0)">下载委托书</a>
                    </div>
                    <a href="http://admin.iguolao.com/public/searching/20191224102153126.jpg" target="_blank" style="color:red;">委托书样例</a>
                </div>
              </div>
              <div class="data-box-all">选择需要同步提交资料的订单:</div>
              <div class="data-box-order">
                  <div class="data-box-order-title">
                    <input type="checkbox" class="order-input" @click="selectProduct(isSelectAll)" v-bind:checked="isSelectAll">
                    <div>订单编号</div>
                    <div>类别</div>
                    <div>小商品</div>
                  </div>
                  <div class="data-box-order-detail">
                    <div class="detaili-list" v-for="(v,k) in brand_file">
                      <input type="checkbox" class="order-input" :checked="v.isSelect" @change="v.isSelect=!v.isSelect">
                      <div>{{v.order_id}}</div>
                      <div>{{v.one_cate}}类</div>
                      <div>
                        <div v-for="(item,index) in v.three_brand">{{item.num}} {{item.name}}</div>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="data-box-middle-two">
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
  name: 'registerData',
  data(){
    return{
      // picked:'1',
      // divshow:true,
      // 个人认证
      // arr1:[],
      // 企业认证
      arr2:[],
      select1:"0",
      select2:"0",
      apply_id:'',
      apply_id1:'',
      apply_id2:'',
      id:'',
      // 资料提交失败的原因
      status:'',
      remark:'',
      dataimg:'',
      img:'',
      one_cate:'',
      first_cate:'',
      three_brand:[],
      referee:'',
      license_num:'',
      card_address:'',
      ser_img:'',
      dataimg:'',
      order_id:this.$route.query.order_id,
      loadshow:false,
      brand_file:'',
      
      nameshow:true,
      brand_name:'',
      editshow:false,
      length:'',
      value:0,
      options:[], 
      twocate:[],
      dynamic:'',
      threecate:[],
      array:[],
      // 商标颜色
      color:"1",
      agree:"2",
      // 判断共有商标选择企业显示隐藏
      sameshow:false,
      link:'',
      same:'0',

      nametype:"2",
      typeshow:false,
      url: 'https://admin.iguolao.com/public/uploads/20200426143633426.png',
        srcList: [
          'https://admin.iguolao.com/public/uploads/20200426143633426.png'
        ],
        url2: 'https://admin.iguolao.com/public/uploads/20200414173234584.jpg',
        srcList2: [
          'https://admin.iguolao.com/public/uploads/20200414173234584.jpg'
        ],
      uploadshow:false,
      identimg:'',
      identimg_url:'',
      cardimg:'',
      cardimg_url:'',

      type1:'',
      type2:''
    }
  },
  components: {
    Top,
    Foot,
    Fix
  },
  watch:{
    'color'(newvalue){
      if (newvalue == "1"&&this.type2 != '') {
        this.img = this.type2;
      }
      if(newvalue == "2"&&this.type1 != ''){
        this.img = this.type1;
      }
    },
    'agree'(newvalue){
      if (newvalue == "1") {
        this.same = this.link;
        this.sameshow = true
      }else{
        this.same = 0
        this.sameshow = false
      }
    },
    'nametype'(newvalue){
      if (newvalue == "2") {
        this.cardimg = '';
        this.cardimg_url = '';
        this.identimg = '';
        this.identimg_url = '';
        this.uploadshow = false
      }else{
        this.uploadshow = true
      }
    },
  },
  computed:{
      //    全选
      isSelectAll:function(){
            if(this.brand_file.length != 0){
                return this.brand_file.every(function (val) { return val.isSelect}); 
            }else{
                return false;
            }
        },
  },
  methods:{
     tip(type,msg){
        return this.$message({
            type:type,
            message:msg,
            showClose:true,
            duration:2000
        })
    },
    getsize(){
      if(this.value != 0){
        this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/operationFile',{
                    brand_name:this.brand_name,
                    type:this.value
                }).then(res=>{
                    if(res.data.code == "1"){
                        this.img = res.data.img;
                    }
                })
      }
    },
    uplaodimg(e){
      this.file = e.target.files[0];
      let formData = new FormData();
      formData.append('url_img',this.file);
      this.$http.post(this.GLOBAL.base_url+"/api/BrandUpload/colorImage",formData).then(res => {
          if(res.data.code == "1"){
            this.type1 = res.data.filepath.yuantu;
            this.type2 = res.data.filepath.heibai;
            if(this.color == "1"){
              this.img = this.type2;
            }else{
              this.img = this.type1;
            }
          }
      })
    },
    upload(img){
      let formData=new FormData();
            formData.append('url_img',img.file);
            this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/brandUploadFiless',formData).then(res=>{
              if(res.data.code == "1"){
                this.ser_img = res.data.filepath;
                this.dataimg = this.GLOBAL.base_url+ res.data.filepath;
              }else{
                this.tip('error',res.data.msg)
              }
            });
    },
    // beforeAvatarUpload(file) {
    //   console.log(file.size)
    //     const isLt2M = file.size  / 1024  > 300;
    //     if (!isLt2M) {
    //       this.$message.error('上传图片大小不能小于 300kb!');
    //     }
    //     return  isLt2M;
    //   },
      uploadident(img){
        let formData=new FormData();
        formData.append('pic',img.file);
        this.$http.post(this.GLOBAL.base_url+'/api/authentication/upload_card',formData).then(res=>{
          if(res.data.code == "1"){
            this.identimg = res.data.data;
            this.identimg_url = this.GLOBAL.base_url+ res.data.data;
          }
        });
      },
      uploadcard(img){
        let formData=new FormData();
        formData.append('pic',img.file);
        this.$http.post(this.GLOBAL.base_url+'/app/checklicense',formData).then(res=>{
          // console.log(res)
          if(res.data.others == "1"){
            this.cardimg = res.data.data.business_license;
            this.cardimg_url = this.GLOBAL.base_url+ res.data.data.business_license;
          }else{
            this.tip('error',res.data.msg)
          }
        });
      },
     getData2(){
      this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/uploadDetail',{
                order_id:this.$route.query.order_id,
                good_name:'商标注册'
            }).then(res=>{
              // console.log(res)
              if(res.data.code == "1"){
                this.img = res.data.brand_update.brand_img;
                this.brand_name = res.data.brand_update.brand_name
                if(this.brand_name == ''||this.brand_name==null||res.data.order.is_design==1){
                  this.nameshow = false;
                }
                this.one_cate = res.data.brand_update.one_cate;
                this.first_cate = res.data.brand_update.first_cate;
                this.three_brand = res.data.brand_update.three_brand;
                this.length = this.three_brand.length;
                this.identimg = res.data.brand_update.identity_img;
                this.identimg_url = this.GLOBAL.base_url+res.data.brand_update.identity_img;
                this.cardimg = res.data.brand_update.business_img;
                this.cardimg_url = this.GLOBAL.base_url+res.data.brand_update.business_img;
                for(var i = 0;i<this.three_brand.length;i++){
                  this.array.push(this.three_brand[i].id)
                }
                this.arr2 = res.data.business;
                this.brand_file = res.data.brand_file;
                this.twocate = res.data.twocate_all;
                this.dynamic = res.data.twocate_all[0].num;
                this.threecate = res.data.twocate_all[0].third;
                this.color = res.data.brand_update.brand_color;
                this.agree = res.data.brand_update.is_public;
                this.link= res.data.brand_update.public_business;
                this.same = this.link;
                this.nametype = res.data.brand_update.brand_type;
                var _this=this;
                this.brand_file.map(function (item) {
                            _this.$set(item, 'isSelect', true);
                        })
                if(res.data.brand_update.auth_type == "1"){
                  // this.picked = res.data.brand_update.auth_type;
                  this.select1 = res.data.brand_update.apply_id;
                  this.apply_id1 = res.data.brand_update.apply_id;
                  this.ser_img = res.data.brand_update.brand_bailment_img;
                  this.dataimg = this.GLOBAL.base_url+ res.data.brand_update.brand_bailment_img;
                  this.getValue1();
                }
                this.id = res.data.brand_update.id;
                this.remark = res.data.order.remark;
              }
            });
    },
    //   根据推荐所有的id的数组判断左边的三级是否变红
      isexit(val) {
            if (this.array.includes(val)) {
                return true;
            } else {
                return false;
            }
      },
    chosetwo(val){
      this.dynamic = val;
      // console.log(this.dynamic)
      for(var i =0;i<this.twocate.length;i++){
        if(this.dynamic == this.twocate[i].num){
          this.threecate = this.twocate[i].third;
        }
      }
    },
    edit(){
      this.editshow = true;
    },
    del(val,val2){
      this.$delete(this.three_brand,val);
      for(var i =0;i<this.array.length;i++){
                if( val2== this.array[i]){
                    this.$delete(this.array,i);
                }
            }
    },
    addcate(val1,val2,val3){
       for(var i =0;i<this.array.length;i++){
                if(val1 == this.array[i]){
                    return false
                }
            }
    if(this.length>10){
      if(this.length == this.three_brand.length){
        return false
      }else{
          let obj = {id:val1,num:val2,name:val3};
          this.three_brand.push(obj)
          this.array.push(val1)
          this.isexit(val1)
        }
    }else{
      if(this.three_brand.length== 10){
        return false
      }else{
          let obj = {id:val1,num:val2,name:val3};
          this.three_brand.push(obj)
          this.array.push(val1)
          this.isexit(val1)
        }
    }
    },
    count(){
      if(this.three_brand.length == 0){
        this.tip('error','请选择小商品');
        return false;
      }else{
        if(this.length>10&&this.length!= this.three_brand.length){
        this.tip('error','请补足小商品数量');
        return false;
      }else{
        var twocate = [];
        var threecate = [];
        for(var i =0;i<this.twocate.length;i++){
          for(var j =0;j<this.twocate[i].third.length;j++){
            for(var k=0;k<this.three_brand.length;k++){
              if(this.three_brand[k].id == this.twocate[i].third[j].id){
                 twocate.push(this.twocate[i].num)
              }
            }
          }
        }
        for(var i =0;i<this.three_brand.length;i++){
          threecate.push(this.three_brand[i].id)
        }
         var array = [];
          for (var i = 0; i < twocate.length; i++) {
              if (array.indexOf(twocate[i]) === -1) {
                  array.push(twocate[i])
              }
          }
          this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/editCategory',{
                order_id:this.$route.query.order_id,
                two_cate:array.join(','),
                three_cate:threecate.join(',')
            }).then(res=>{
              // console.log(res)
                if(res.data.code == "1"){
                  this.editshow = false;
                  this.length = this.three_brand.length;
                  this.tip('success',res.data.msg);
                }else{
                  this.editshow = false;
                  this.tip('error',res.data.msg)
                }
            })
        // console.log(array.join(','))
        // console.log(threecate.join(','))
      }
      }
      
    },
     getfont(){
            this.$http.post(this.GLOBAL.base_url+'/app/shopCar/fonts').then(res=>{
                // console.log(res)
                if(res.data.code == "1"){
                    this.options = res.data.data;
                }
            })
        },
        getValue(){
          
        },
    getValue1(){
        this.apply_id1 = this.select1;
        // console.log(this.apply_id1)
        for(var i =0;i<this.arr2.length;i++){
          if(this.apply_id1 == this.arr2[i].id){
            this.referee = this.arr2[i].referee;
            this.license_num = this.arr2[i].license_num;
            this.card_address = this.arr2[i].card_address;
            if(this.arr2[i].type == 1){
              this.typeshow = true
            }else{
              this.typeshow = false
            }
          }
        }
        if(this.apply_id1=="0"||this.apply_id1 == ""){
          this.referee = '';
          this.license_num = '';
          this.card_address = '';
          this.loadshow = false;
          this.typeshow = false
        }else{
          this.loadshow = true;
        }
    },
    selectProduct:function(_isSelect){
                for (var i = 0; i< this.brand_file.length; i++) {
                    this.brand_file[i].isSelect = !_isSelect;
                }
            },
     back(){
        this.$router.push('/personal/order?status=all')
      },
      send(){
        // if(this.color == 0){
        //   this.tip("error","请选择商标注册的颜色");
        //   return false;
        // }
        if(this.agree == "1"){
          if(this.same == "0"||this.same == ''){
            this.tip("error","请选择共有商标企业");
            return false;
          }
        }
        if(this.editshow == true){
            this.tip("error","请保存小商品");
            return false;
          }
        if(this.apply_id1=="0"||this.apply_id1 == ""){
            this.tip("error","请选择申请人");
            return false;
          }else if(this.nametype == 1){
            // if(this.identimg == ''){
            //   this.tip("error","请上传法人身份证复印件签字照片");
            //   return false;
            // }else 
            if(this.cardimg == ''){
              this.tip("error","请上传营业执照复印件签字照片");
              return false;
            }
          }else if(this.ser_img == ''){
            this.tip("error","请上传商标代理委托书");
            return false;
          }
        this.apply_id = this.apply_id1;
        var a = '';
        for(var i =0;i<this.brand_file.length;i++){
            if(this.brand_file[i].isSelect == true){
                a+=this.brand_file[i].order_id+','
            }
        }
        a =  a.substring(0,a.length-1);
        this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/submitData',{
                click_type:'商标注册',
                order_id:this.$route.query.order_id,
                auth_type:1,
                apply_id:this.apply_id,
                id:this.id,
                type:2,
                brand_num:'',
                seal_file:this.ser_img,
                brand_img:this.img,
                and_order:a,
                brand_color:this.color,
                is_public:this.agree,
                public_business:this.same,
                brand_type:this.nametype,
                business_img:this.cardimg,
                 identity_img:this.identimg
            }).then(res=>{
              // console.log(res)
              if(res.data.code == 1){
                this.tip('success','提交成功')
                setTimeout(()=>{
                     this.$router.push('/personal/order?status=all')
                 },500)
              }else{
                this.tip('error',res.data.msg)
              }
            });
      },
      toconfire1(){
        this.$router.push({
          path:'/personal/companyForm',
          query:{
            submitData:0
          }
        })
      },
  },
  mounted(){
    this.status = this.$route.query.status;
    this.getfont()
    this.getData2();
  }
}

</script>

<style scoped>
  .data-box>img{
    width: 100%;
    height: 188px;
  }
  .data-box-wrap{
    width: 1200px;
    margin: 0 auto 148px;
  }
  .data-box-wrap-middle{
    margin: 28px 0 17px 64px;
  }
  .data-box-wrap-middle-title{
    font-size: 18px;
    color: #333333;
    margin-bottom: 16px;
  }
  .data-box-wrap-middle-img{
    height: 120px;
    margin-bottom: 16px;
  }
  .data-box-wrap-middle-img>div>img{
    width: 119px;
    height: 119px;
  }
  .data-box-wrap-middle-little{
    margin-bottom: 32px;
    overflow: hidden;
  }
  .data-box-wrap-middle-little>div{
    float: left;
  }
  .little-title{
    font-size: 14px;
    color: #333333;
    margin-right: 32px;
  }
  .detail-div1{
    font-size: 14px;
    color: #f96006;
    margin-bottom: 20px;
  }
  .detail-div2{
    width: 695px;
    overflow: hidden;
  }
  .detail-div2>div{
    float: left;
    font-size: 14px;
    font-weight: 100;
    color: #333333;
    margin-bottom:15px;
  }
  .detail-div2>div:last-child{
    width: 98px;
    height: 32px;
    border-radius: 4px;
    background-color: #f96006;
    margin-top: -7px;
    text-align: center;
    line-height: 32px;
    font-size: 14px;
    color: #ffffff;
    cursor: pointer;
  }
  .detail-div3{
    width: 800px;
  }
  .detail-div3-littlediv{
    overflow: hidden;
  }
  .detail-div3-littlediv>div{
    line-height: 32px;
    height: 32px;
    border: solid 1px #d6d6d6;
    float: left;
    margin:0 16px 6px 0;
  }
  .detail-div3-littlediv>div>div{
    float: left;
    font-size: 14px;
    font-weight: 100;
    color: #333333;
  }
  .detail-div3-littlediv>div>div:nth-of-type(1){
    padding: 0 8px;
  }
  .detail-div3-littlediv>div>div:nth-of-type(2){
     width: 32px;
     height: 32px;
     font-size: 16px;
     text-align: center;
     line-height: 32px;
     border-left: solid 1px #d6d6d6;
     cursor: pointer;
  }
  .detail-div3-littlediv>div:last-child{
    width: 98px;
    height: 32px;
    border-radius: 4px;
    background-color: #f96006;
    text-align: center;
    line-height: 32px;
    font-size: 14px;
    color: #ffffff;
    cursor: pointer;
  }
  .detail-div3-count{
    height: 20px;
    margin-top: 12px;
  }
  .detail-div3-count>img{
    vertical-align: middle;
    width: 16px;
    margin-right: 12px;
    height: 16px;
  }
  .detail-div3-count>span{
    vertical-align: middle;
    font-size: 14px;
    font-weight: 100;
    color: #f96006;
  }
  .detail-div3-chose{
    width: 992px;
    height: 248px;
    background-color: #fdfdfd;
    /* border:1px solid red; */
    padding: 22px 0;
  }
  .chose1{
    float: left;
    margin-right: 25px;
    width: 200px;
    height: 248px;
    border-right:2px solid #ebebeb;
    overflow-y: auto;
  }
  .chose1>div{
    width: 170px;
    height: 20px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    margin-bottom: 12px;
    color: #969494;
    font-size: 14px;
    cursor: pointer;
  }
  .colorChange{
    color: red!important;
  }
  .setActive{
    color: red!important;
  }
  .chose2{
    width: 734px;
    height: 248px;
    float: left;
    overflow-y: auto;
  }
  .chose2>div{
    float: left;
    font-size: 14px;
    font-weight: 100;
    margin: 0 16px 12px 0;
    cursor: pointer;
  }
  .chose1::-webkit-scrollbar {
            width: 8px;     
            height: 8px;
    }
    .chose1::-webkit-scrollbar-thumb {
        border-radius: 5px;
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    }
    .chose1::-webkit-scrollbar-track {
            opacity: 0;
    }
    .chose2::-webkit-scrollbar {
            width: 8px;     
            height: 8px;
    }
    .chose2::-webkit-scrollbar-thumb {
        border-radius: 5px;
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    }
    .chose2::-webkit-scrollbar-track {
            opacity: 0;
    }
  .data-box-wrap-middle-img>div{
    float: left;
    font-size: 14px;
    color: #333333;
  }
  .data-box-wrap-middle-img>div:nth-of-type(2){
    margin-left: 32px;
    border: solid 1px #dbdbdb;
    width: 119px;
    height: 119px;
  }
  .data-box-wrap-top{
    border-bottom: 1px solid #d8d8d8;
    padding: 64px 0 30px;
    font-size: 36px;
  }
  .data-box-wrap-middle-type{
    font-family: "PingFangSC-Regular";
    font-size: 18px;
    color: #333333;
    margin-bottom: 16px;
  }
  .data-box-middle-radio>input{
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-right: 12px;
    cursor: pointer;
  }
  .data-box-middle-radio>span{
    font-family: "PingFangSC-Regular";
    font-size: 20px;
    vertical-align: middle;
    font-weight: 300;
    color: #333333;
  }
  .data-box-middle-radio>span:nth-of-type(1){
    margin-right: 45px;
  }
  .dataimg{
    width: 198px;
    height: 199px;
  }
  .form_select {
    margin-right: 22px;
    width: 790px;
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
.data-box-middle-box-company{
  margin: 16px 0;
}
.data-box-middle-box-company>span{
  font-family: "PingFangSC-Regular";
  font-size: 20px;
  color: #f96006;
  cursor: pointer;
}
.data-box-middle-two{
  height: 53px;
  margin-left: 540px;
  margin-top: 100px;
}
.data-box-middle-two>div{
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
.data-box-middle-two>div:nth-of-type(1){
  border-image-source: linear-gradient(to top, #d6d6d6, #d6d6d6);
  border-image-slice: 1;
  background-image: linear-gradient(to bottom, #ffffff, #e3e3e3), linear-gradient(to top, #d6d6d6, #d6d6d6);
  background-origin: border-box;
  background-clip: content-box, border-box;
  color: #f87e03;
  margin-right: 60px;
}
.data-box-middle-two>div:nth-of-type(2){
  border-image-source: linear-gradient(to top, #ba6100, #dc773b);
  border-image-slice: 1;
  background-image: linear-gradient(to bottom, #f79000, #f96006), linear-gradient(to top, #ba6100, #dc773b);
  background-origin: border-box;
  background-clip: content-box, border-box;
  color: #ffffff;
}
.fail{
  margin-top: 20px;
  margin-left: 64px;
  font-size: 20px;
  color: red;
}
.data-box-middle-infor>div{
  margin-bottom: 16px;
}
.data-box-middle-infor>div>span{
  font-size: 14px;
  color:#333333;
}
.data-box-middle-infor>div>span:nth-of-type(1){
  display: inline-block;
  width: 98px;
  margin-right: 30px;
}
.data-box-middle-infor>div>span:nth-of-type(2){
  font-weight: 100;
}
.data-box-middle-shu{
  font-size: 18px;
  color: #333333;
  margin-bottom: 16px;
  margin-top: 26px;
}
.data-box-middle-shu-upload{
  margin-bottom: 26px;
  height: 199px;
}
.data-box-middle-shu-upload>div{
  float: left;
}
.imgdata{
  margin-right: 24px;
}
.load>p{
  font-size: 14px;
  color: #f96006;
  margin-bottom: 145px;
}
.load>div{
  width: 131px;
  height: 33px;
  border-radius: 4px;
  text-align: center;
  line-height: 33px;
}
.load-div1{
  float: left;
  background-color: #f96006;
}
.load-div2{
  float: left;
  background-color: gray;
}
.load>div>a{
  text-decoration: none;
  font-size: 16px;
  color: #ffffff;
}
.load>a{
  text-decoration: none;
  font-size: 16px;
  color: #333333;
 line-height: 33px;
  margin-left:20px;
}
.data-box-all{
  font-size: 18px;
  color: #333333;
  margin-bottom: 16px;
}
.data-box-order{
  width: 1070px;
  margin-bottom: 36px;
   border: solid 1px #eeeeee;
   border-bottom: none;
}
.data-box-order-title{
  height: 36px;
  background-color: #fafafa;
  border-bottom: solid 1px #eeeeee;
  line-height: 36px;
}
.order-input{
  width: 16px;
  height: 16px;
  float: left;
  margin: 10px 12px 0 20px;
  cursor: pointer;
}
.data-box-order-title>div{
  float: left;
  font-size: 14px;
  font-weight: 500;
  color: #333333;
  text-align: center;
}
.data-box-order-title>div:nth-of-type(1){
  width: 160px;
  margin-right: 40px;
}
.data-box-order-title>div:nth-of-type(2){
  width: 42px;
  margin-right: 56px;
}
.data-box-order-title>div:nth-of-type(3){
  width: 722px;
}
.detaili-list{
  height: 36px;
  border-bottom: solid 1px #eeeeee;
  line-height: 36px;
}
.data-box-order-detail>div>div{
  float: left;
  font-size: 14px;
  font-weight: 100;
  color: #333333;
}
.data-box-order-detail>div>div:nth-of-type(1){
  width: 160px;
  margin-right: 40px;
  text-align: center;
}
.data-box-order-detail>div>div:nth-of-type(2){
  width: 42px;
  margin-right: 56px;
  text-align: center;
}
.data-box-order-detail>div>div:nth-of-type(3){
   width: 722px;
   height: 36px;
   line-height: normal;
   overflow-y: auto;
}
.data-box-order-detail>div>div:nth-of-type(3)>div{
  float: left;
  margin-right: 10px;
}
.data-box-edit{
  margin-left: 12px;
}
.changsize{
  width: 120px;
  height: 32px;
  border-radius: 4px;
  border: solid 1px #d4d4d4;
  outline: none;
  text-align: center;
  cursor: pointer;
}
.data-box-size{
  margin-bottom: 55px;
}
.data-box-upload{
  position: relative;
}
.data-box-upload>div{
   width: 118px;
   height: 30px;
   border-radius: 4px;
   border: solid 1px #d4d4d4;
   background-color: #fcfcfc;
   text-align: center;
   line-height: 30px;
}
.data-box-upload>input{
      top:0;
      left: 0;
      width: 118px;
      height: 30px;
      border-radius: 4px;
      position: absolute;
      opacity: 0;
      cursor: pointer;
}
.data-color{
  height: 20px;
  margin-bottom: 16px;
}
.data-remaind{
  margin-bottom: 16px;
  color: red;
}
.data-remaind2{
  margin-top: 16px;
  color: red;
}
.data-upload{
  height: 185px;
  margin-top: 20px;
}
.idimg{
  width: 160px;
  height: 160px;
}
.data-upload>div{
  float: left;
  height: 185px;
  margin-right: 100px;
}
.data-upload>div>div{
  float: left;
}
.data-increased{
  font-size: 16px;
  margin-top: 8px;
}
.data-increased>span{
  color: red;
}
.data-color>div{
  float: left;
}
.data-color-title,.data-box-middle-box-same>span:nth-of-type(1){
  font-size: 14px;
  margin-right: 32px;
  color: #323232;
}
.data-color-radio>span{
  font-size: 14px;
  font-weight: 300;
  color: #333333;
  vertical-align: middle;
}
.data-color-radio>span:nth-of-type(1){
  display: inline-block;
  /* width: 56px; */
  margin-right: 38px;
}
.data-color-radio>input{
  width: 16px;
  height: 16px;
  vertical-align: middle;
  margin-right: 10px;
  cursor: pointer;
}
.data-box-middle-box-same{
  margin-bottom: 16px;
}
.form_select2{
    margin-right: 22px;
    width: 700px;
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
.data-box-middle-box-same>span:nth-of-type(2){
    font-size: 20px;
    color: #f96006;
    cursor: pointer;
}
</style>
