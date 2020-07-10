<template>
  <div class="pickname">
    <Top></Top>
     <div class="name-box">
         <span v-show="false" ref="span1">请输入您要申请的商标名称</span>
         <div class="name-box-top">
            <img src="/static/images/xiaoguo.png" alt="">
            <span ref="span2"></span>
        </div>
        <div class="name-box-wrap">
             <div v-show="boxshow">
                <div class="name-box-radio">
                        <input class="radio1" value="1" v-model="picked" name="type" type="radio"><span>文字商标</span>
                        <input class="radio2" value="2" v-model="picked" name="type" type="radio"><span>图形商标</span>
                </div>
                <div class="name-type-div" v-show="typeshow">
                    <input type="text" placeholder="例如：华为，光明，海尔，LV" v-model.trim="printkey" @blur="motecreat">
                    <div>
                        <div class="name-box-wrap-div">
                            <div class="name-box-wrap-div-img">
                                <img :src="GLOBAL.base_url+this.pic" alt="">
                            </div>
                            <div class="name-box-wrap-div-upload">
                                <div>
                                    <div>上传图片</div>
                                    <input type="file" accept="image/*" @change="uplaod($event)">
                                </div>
                                <div>
                                    <img src="/static/images/plaint.png" alt=""><span>文字图片请直接上传</span>
                                </div>
                                <div :class="change">
                                    <div class="div1" @click="changeColor('yuan')">原图</div>
                                    <div class="div2" @click="changeColor('hei')">黑白</div>
                                </div>
                            </div>
                        </div>
                        <div class="name-box-select">
                            <el-select v-model="value" @change="getimg">
                                <!-- <el-option  value="选择字体"></el-option> -->
                                <el-option
                                v-for="item in options"
                                :key="item.id"
                                :label="item.font_name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="name-img-div" v-show="!typeshow">
                    <div>
                        <img :src="this.GLOBAL.base_url+this.pic2" alt="">
                    </div>
                    <div>
                        <div>上传图片</div>
                        <input type="file" accept="image/*" @change="uplaod2($event)">
                    </div>
                    <div :class="change2">
                        <div class="div3" @click="changeColor2('yuan')">原图</div>
                        <div class="div4" @click="changeColor2('hei')">黑白</div>
                    </div>
                </div>
                <div class="name-box-wrap-do">
                    <div @click="anthor">历史类别</div>
                    <div @click="next">下一步</div>
                </div>
            </div>
        </div>
     </div>
     <Foot></Foot>
     <div class="table" v-show="loadshow">
        <el-table
         v-loading="loading" class="table">
         </el-table>
     </div>
  </div>
</template>

<script>
import Top from '../ui/top.vue';
import Foot from '../ui/foot.vue';
export default {
  name: 'pickname',
  data(){
    return{
        timer:null,
        value:1,
        k:0,
        boxshow:false,
        options: [],
        printkey:'',
        pic:'',
        pic2:'',
        file:'',
        file2:'',
        picked:'1',
        typeshow:true,
        check:false,
        loading: true,
        loadshow:false,
        // moreshow:Boolean,
        change:'yuan',
        type1:'',
        type2:'',
        change2:'yuan',
        type3:'',
        type4:'',
    }
  },
  components: {
      Top,
      Foot
  },
  watch:{
      "picked"(newValue){
          if(newValue =='1'){
              this.typeshow=true;
          }else if(newValue=='2'){
            this.typeshow=false;
          }
      }
  },
  methods:{
      tip(type,msg){
          return this.$message({
              type:type,
              message:msg,
              showClose:true,
              duration:3000
          })
      },
      setTimer(){
            if(this.timer == null) {
                this.timer = setInterval( () => {
                    this.$refs.span2.innerText = this.$refs.span1.innerText.substring(0,this.k++);
                    if(this.$refs.span2.innerText == this.$refs.span1.innerText){
                      this.boxshow = true;
                      clearInterval(this.timer)
                    }
                }, 50)
            }
        },
        anthor(){
          if(this.picked != "2"){
                let reg=/^[0-9]*$/;
                if(this.printkey == ''||this.pic ==''){
                    this.tip('error',"请输入商标&品牌名称或商标图片")
                    return false
                }else if(reg.test(this.printkey)){
                     this.tip('error',"请输入汉字或字母")
                    return false
                }else{
                    this.loadshow = true;
                    this.$http.get(this.GLOBAL.base_url+'/app/lawselect',{params:{
                         channelroad:1,
                        user_id:this.$cookie.getCookie('u_id'),
                        keywords:this.printkey
                    }}).then(res=>{
                        if(res.data.data == 1){
                            this.loadshow = false;
                            this.$router.push({
                                path:'/pickmore',
                                query:{
                                    type:this.printkey,
                                    pic_url:this.pic
                                }
                            })
                        }else{
                            this.tip('error',res.data.msg);
                            this.loadshow = false;
                        }
                    })
                }
            }else{
                if(this.pic2 == ''){
                     this.tip('error',"请上传商标图样")
                    return false
                }else{
                    this.$router.push({
                            path:'/pickmore',
                            query:{
                                type:'',
                                pic_url:this.pic2
                            }
                        })
                }
            }
        },
        // gethistory(){
        //    this.$http.post(this.GLOBAL.base_url+'/api/shopCar/historyOrder',{
        //         user_id:this.$cookie.getCookie('u_id')
        //     }).then(res=>{
        //             // console.log(res)
        //             if(res.data.code == "1"){
        //                 if(res.data.data.length == 0){
        //                   this.moreshow = false
        //                 }else{
        //                   this.moreshow = true
        //                 }
        //         }
        //     })
        // },
        uplaod(e){
            // this.value = '选择字体'
            this.file = e.target.files[0];
            let formData = new FormData();
            formData.append('url_img',this.file);
            this.$http.post(this.GLOBAL.base_url+"/api/BrandUpload/colorImage",formData).then(res => {
                // console.log(res)
                if(res.data.code == "1"){
                    this.type1 = res.data.filepath.yuantu;
                    this.type2 = res.data.filepath.heibai;
                    if(this.change == 'hei'){
                        this.pic = res.data.filepath.heibai;
                    }else{
                        this.pic = res.data.filepath.yuantu;
                    }
                    
                }
            })
        },
        uplaod2(e){
            this.file = e.target.files[0];
            let formData = new FormData();
            formData.append('url_img',this.file);
            this.$http.post(this.GLOBAL.base_url+"/api/BrandUpload/colorImage",formData).then(res => {
                // console.log(res)
                if(res.data.code == "1"){
                    this.type3 = res.data.filepath.yuantu;
                    this.type4 = res.data.filepath.heibai;
                    if(this.change2 == 'hei'){
                        this.pic2 = res.data.filepath.heibai;
                    }else{
                        this.pic2 = res.data.filepath.yuantu;
                    }
                    
                }
            })
        },
        changeColor(val){
            if(this.pic != ''&&this.type2!=''){
                this.change = val
                if(this.change =="yuan"){
                    this.pic = this.type1
                }else{
                     this.pic = this.type2
                }
            }else{
                this.tip('error','请先上传图片')
            }
        },
        changeColor2(val){
           if(this.pic2 != ''){
                this.change2 = val
                if(this.change2 =="yuan"){
                    this.pic2 = this.type3
                }else{
                     this.pic2 = this.type4
                }
            }else{
                this.tip('error','请上传图片')
            }
        },
        next(){
            if(this.picked != "2"){
                let reg=/^[0-9]*$/;
                if(this.printkey == ''||this.pic ==''){
                    this.tip('error',"请输入您的商标名称或商标图片")
                    return false
                }else if(reg.test(this.printkey)){
                     this.tip('error',"请输入汉字或字母")
                    return false
                }else{
                    this.loadshow = true;
                    this.$http.get(this.GLOBAL.base_url+'/app/lawselect',{params:{
                        channelroad:1,
                        user_id:this.$cookie.getCookie('u_id'),
                        keywords:this.printkey
                    }}).then(res=>{
                        if(res.data.data == 1){
                            this.loadshow = false;
                            this.$router.push({
                                path:'/pickguild',
                                query:{
                                    type:this.printkey,
                                    pic_url:this.pic
                                }
                            })
                        }else{
                            this.tip('error',res.data.msg);
                            this.loadshow = false;
                        }
                    })
                }
            }else{
                if(this.pic2 == ''){
                     this.tip('error',"请上传您的图形商标")
                    return false
                }else{
                    this.$router.push({
                            path:'/pickguild',
                            query:{
                                type:'',
                                pic_url:this.pic2
                            }
                        })
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
        getimg(){
            this.motecreat();
        },
        motecreat(){
            if(this.printkey == ''){
                return false
            }else{
                this.$http.post(this.GLOBAL.base_url+'/api/BrandUpload/operationFile',{
                    brand_name:this.printkey,
                    type:this.value
                }).then(res=>{
                    if(res.data.code == "1"){
                        this.pic = res.data.img;
                    }
                })
            }
        }
  },
  mounted(){
      this.getfont();
    //   this.gethistory();
  },
  created(){
        clearInterval(this.timer)
        this.timer = null
        this.setTimer()
    },
    destroyed(){
        clearInterval(this.timer)
        this.timer = null
    }
}

</script>

<style scoped>
  .name-box{
      background-color: #fcfcfc;
      padding-top: 157px;
  }
  .name-box-top{
      width: 720px;
      height: 194px;
      margin: 0 auto 94px;
  }
  .name-box-top>img{
      vertical-align: middle;
      margin-right: 80px;
  }
  .name-box-top>span{
      vertical-align: middle;
      font-size: 32px;
      color: #333333;
  }
  .name-box-wrap{
      width: 947px;
      height: 1000px;
      margin:0 auto;
  }
  .name-box-radio{
      margin-bottom: 35px;
      margin-left: 100px;
      height: 31px;
  }
  .name-box-radio>span{
      margin-left: 20px;
      font-size: 24px;
      color: #333333;
      vertical-align: middle;
  }
  .name-box-radio>span:nth-of-type(1){
      margin-right: 360px;
  }
  .name-box-radio>input{
      width: 31px;
      height: 31px;
      vertical-align: middle;
      cursor: pointer;
  }
  .name-type-div>input{
      border: none;
      width: 891px;
      height: 32px;
      box-shadow: 0 0 30px -1px rgba(217, 217, 217, 0.5);
      outline: none;
      padding: 44px 0 44px 56px;
      font-size: 24px;
      color: #666666;
      margin-bottom: 40px;
  }
  .name-type-div>div{
      width: 947px;
      height: 385px;
      background-color:#ffffff;
      box-shadow: 0 0 30px -1px rgba(217, 217, 217, 0.5);
     -webkit-box-shadow: 0 0 30px -1px rgba(217, 217, 217, 0.5);
     padding-top: 42px;
  }
  .name-box-wrap-div{
      width: 638px;
      height: 205px;
      margin-left:168px;
  }
  .name-box-wrap-div>div{
      float: left;
  }
  .name-box-wrap-div-img{
      width: 204px;
      height: 204px;
      border: solid 1px #d4d4d4;
      margin-right: 220px;
  }
  .name-box-wrap-div-img>img{
      width: 202px;
      height: 202px;
  }
  .name-box-wrap-div-upload{
      width: 210px;
  }
  .name-box-wrap-div-upload>div:nth-of-type(1){
      position: relative;
  }
  .name-box-wrap-div-upload>div:nth-of-type(1)>input{
      top:0;
      left: 0;
      width: 210px;
      height: 68px;
      border-radius: 4px;
      position: absolute;
      opacity: 0;
      cursor: pointer;
  }
  .name-box-wrap-div-upload>div:nth-of-type(1)>div{
      width: 210px;
      height: 68px;
      border-radius: 4px;
      border: solid 1px #d4d4d4;
      background-color: #fcfcfc;
      text-align: center;
      line-height: 68px;
      font-size: 24px;
      color: #666666;
      margin-bottom: 20px;
  }
  .name-box-wrap-div-upload>div:nth-of-type(2)>img{
      width: 23px;
      height: 23px;
      vertical-align: middle;
      margin-right: 7px;
  }
  .name-box-wrap-div-upload>div:nth-of-type(2)>span{
      font-size: 18px;
      vertical-align: middle;
      color: #b2b2b2;
  }
  .name-box-wrap-div-upload>div:nth-of-type(3){
      width: 210px;
      height: 35px;
      margin-top: 23px;
  }
  .name-box-wrap-div-upload>div:nth-of-type(3)>div{
      float: left;
      width: 90px;
      height: 35px;
      text-align: center;
      line-height: 35px;
      border: solid 1px #d4d4d4;
      cursor: pointer;
  }
  .div2{
      margin-left: 15px;
  }
  .yuan .div1,.hei .div2{
      background: #f96006;
      color: white;
  }
  .name-box-select{
      margin: 58px 0 0 168px;
  }
  .name-img-div{
       width: 313px;
        height: 398px;
        box-shadow: 3px 5px 19px -1px rgba(217, 217, 217, 0.5);
        background: #ffffff;
        margin-left: 285px;
        padding-top: 60px;
  }
  .name-img-div>div:nth-of-type(1){
      width: 205px;
      height: 205px;
      border: solid 1px #d4d4d4;
      background-color: #fcfcfc;
      margin:0 auto 30px;
  }
  .name-img-div>div:nth-of-type(1)>img{
      width: 205px;
      height: 205px;
  }
  .name-img-div>div:nth-of-type(2){
      width: 205px;
      height: 68px;
      border-radius: 4px;
      border: solid 1px #d4d4d4;
      background-color: #fcfcfc;
      margin:0 auto;
      position: relative;
  }
  .name-img-div>div:nth-of-type(2)>div{
      width: 205px;
      height: 68px;
      border-radius: 4px;
      text-align: center;
      line-height: 68px;
      font-size: 24px;
      color: #666666;
  }
  .name-img-div>div:nth-of-type(2)>input{
      top:0;
      left: 0;
      width: 205px;
      height: 68px;
      border-radius: 4px;
      position: absolute;
      opacity: 0;
      cursor: pointer;
  }
  .name-img-div>div:nth-of-type(3){
      width: 205px;
      margin: 23px auto 0;
  }
  .name-img-div>div:nth-of-type(3)>div{
      float: left;
      width: 90px;
      height: 35px;
      text-align: center;
      line-height: 35px;
      border: solid 1px #d4d4d4;
      cursor: pointer;
  }
  .yuan .div3,.hei .div4{
      background: #f96006;
      color: white;
  } 
  .div4{
      margin-left: 20px;
  }
  .name-box-wrap-do{
      margin: 150px auto 0;
      width: 480px;
      height: 54px;
      font-size: 18px;
  }
  .name-box-wrap-do>div{
      float: left;
      width: 214px;
      height: 54px;
      border-radius: 4px;
      background-color: #efefef;
      text-align: center;
      line-height: 54px;
      color: #f87e03;
      cursor: pointer;
  }
  .name-box-wrap-do>div:nth-of-type(2){
      background-color:#f96006;
      color: #ffffff;
      margin-left: 52px;
  }
  .table{
      width: 100%;
      height: 100%;
      position: fixed;
      top:0;
      left: 0;
      background: rgba(0,0,0,0.1);
  }
</style>
<style>
  .name-box-select>div>div>input{
      width: 648px;
      height: 72px!important;
      border: solid 1px #d4d4d4;
      font-size: 24px;
      color: #666666;
  }
  .name-box-select .el-select .el-input.is-focus .el-input__inner,.el-select .el-input__inner:focus{
      border-color: #C0C4CC;
  }
  .el-select-dropdown__item.selected{
       color: #f96006;
   }
</style>
