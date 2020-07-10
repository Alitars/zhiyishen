<template>
  <div class="logoEdit">
    <Top></Top>
    <div class="logo-box">
        <div class="log-top">
            <div class="top1"></div>
            <div class="top2">
                <div :class="active">
                    <div class="top-div1" @click="changelogo('tu')">图标</div>
                    <div class="top-div2" @click="changelogo('name')">名称</div>
                    <div class="top-div3" @click="changelogo('se')">颜色</div>
                </div>
            </div>
        </div>
        <div class="log-tu" v-if="active == 'tu'">
            <div class="tu-div1 m1"></div>
            <div class="tu-div2">
                <span class="el-icon-warning-outline"></span>通过滑动条调整图标的大小 通过点击上下中左右按钮调整图标的位置
            </div>
            <div class="tu-div3">
                <div>
                    大小：{{value1}}
                </div>
                <div>
                    <el-slider v-model="value1" :show-tooltip="false" @change="get"></el-slider>
                </div>
                <div>位置：</div>
                <div>
                    <div :class="active2">
                        <img class="img1" src="/static/images/direct1.png" @click="chageDir('up')" alt="" v-show="imgshow1">
                        <img class="img2" src="/static/images/direct2.png" @click="chageDir('left')" alt="" v-show="imgshow2">
                        <img class="img3" src="/static/images/direct3.png" @click="chageDir('middle')" alt="" v-show="imgshow3">
                        <img class="img4" src="/static/images/direct4.png" @click="chageDir('bottom')" alt="" v-show="imgshow4">
                        <img class="img5" src="/static/images/direct5.png" @click="chageDir('right')" alt="" v-show="imgshow5">
                        <img class="img1" src="/static/images/direct6.png"  alt="" v-show="!imgshow1">
                        <img class="img2" src="/static/images/direct7.png" alt="" v-show="!imgshow2">
                        <img class="img3" src="/static/images/direct8.png" alt="" v-show="!imgshow3">
                        <img class="img4" src="/static/images/direct9.png" alt="" v-show="!imgshow4">
                        <img class="img5" src="/static/images/direct10.png" alt="" v-show="!imgshow5">
                    </div>
                </div>
            </div>
        </div>
        <div class="log-tu" v-if="active == 'name'">
            <div class="tu-div1 m2"></div>
            <div class="tu-div2">
                <span class="el-icon-warning-outline"></span>单击商标名称输入框输入商标名称，点击字体选择框选择字体，通过滑动条调整文字大小
            </div>
            <div class="name-div3">
                <div>
                    <span>商标名称</span><input type="text">
                </div>
                <div>
                    <span>字体</span>
                    <select class="picksize">
                          <option value="0">选择字体</option>
                    </select>
                </div>
                <div>
                    字体大小：{{value1}}
                </div>
                <div>
                    <el-slider v-model="value1" :show-tooltip="false" @change="get"></el-slider>
                </div>
            </div>
        </div>
        <div class="log-tu" v-if="active == 'se'">
            <div class="tu-div1 m3"></div>
            <div class="tu-div2">
                <span class="el-icon-warning-outline"></span>点击圆形色块可以修改对应的logo颜色
            </div>
            <div class="se-div3">
                <div>
                    <span>滤镜颜色：</span>
                    <colorPicker v-model="color" @change="handleChangeColor"></colorPicker>
                </div>
                <div>
                    颜色明暗：{{value1}}
                </div>
                <div>
                    <el-slider v-model="value1" :show-tooltip="false" @change="get"></el-slider>
                </div>
            </div>
        </div>
        <div class="log-bottom">
            <div>
                <img src="" alt="">
            </div>
            <div>立即注册</div>
        </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Top from '../ui/top.vue';
import Foot from '../ui/foot.vue';
export default {
  name: 'logoEdit',
  components: {
    Top,
    Foot
  },
  data(){
    return{
      active:'tu',
      value1:0,
      imgshow1:false,
      imgshow2:true,
      imgshow3:true,
      imgshow4:true,
      imgshow5:true,
      active2:'up',
      color:'red'
    }
  },
  methods:{
    changelogo(val){
        this.active = val
    },
    chageDir(val){
        this.active2 = val;
        if(val == 'up'){
            this.imgshow1 = false;
            this.imgshow2 = true;
            this.imgshow3 = true;
            this.imgshow4 = true;
            this.imgshow5 = true;
        }else if(val == 'left'){
            this.imgshow1 = true;
            this.imgshow2 = false;
            this.imgshow3 = true;
            this.imgshow4 = true;
            this.imgshow5 = true;
        }else if(val == 'middle'){
            this.imgshow1 = true;
            this.imgshow2 = true;
            this.imgshow3 = false;
            this.imgshow4 = true;
            this.imgshow5 = true;
        }else if(val == 'bottom'){
            this.imgshow1 = true;
            this.imgshow2 = true;
            this.imgshow3 = true;
            this.imgshow4 = false;
            this.imgshow5 = true;
        }else if(val == 'right'){
            this.imgshow1 = true;
            this.imgshow2 = true;
            this.imgshow3 = true;
            this.imgshow4 = true;
            this.imgshow5 = false;
        }
    },
    get(){
        // console.log(this.value1)
    },
    handleChangeColor(){

    }
  },
   mounted() {
    
  }
}

</script>

<style scoped>
  .logo-box{
      width: 100%;
      height: 100%;
      padding-bottom: 90px;
      background-color: #f8f8f8;
  }
  .log-top{
      width: 1200px;
      height: 96px;
      background-color: white;
      margin: 0 auto;
  }
  .log-top>div{
      float: left;
  }
  .top1{
      width: 210px;
      height: 64px;
      background: url('/static/images/logoedit.png') no-repeat;
      margin: 16px 112px 0 64px;
  }
  .top2>div{
      margin-top: 30px;
      height: 36px;
  }
  .top2>div>div{
      width: 100px;
      float: left;
      height: 36px;
      line-height: 36px;
      border-radius: 4px;
      background-color: #f5f5f5;
      margin-right: 64px;
      cursor: pointer;
      font-size: 14px;
      text-align: center;
      color: #666666;
  }
  .tu .top-div1,.name .top-div2,.se .top-div3{
      color: white;
      background: #f96006;
  }
  .log-tu{
      width: 1200px;
      margin: 0 auto 64px;
      height: 120px;
      position: relative;
  }
  .tu-div1{
      position: absolute;
      width: 0;
      height: 0;
      top: -5px;
      
      border-style: solid;
      border-width: 5px;
      border-color: transparent transparent #f96006 #f96006;
      transform: rotate(135deg);
      z-index: 15;
  }
  .m1{
      left: 428px;
  }
  .m2{
      left: 592px;
  }
  .m3{
      left: 755px;
  }
  .tu-div2{
      background: #f96006;
      height: 36px;
      line-height: 36px;
      color: white;
      font-size: 12px;
      font-weight: 300;
      margin-bottom: 12px;
      text-align: center;
  }
  .tu-div2>span{
      margin-right: 15px;
  }
  .tu-div3,.name-div3,.se-div3{
      height: 72px;
      background-color: white;
  }
  .tu-div3>div{
      float: left;
      margin-top: 24px;
      font-size: 14px;
  }
  .tu-div3>div:nth-of-type(1){
      width: 70px;
      margin: 24px 24px 0 300px;
  }
  .tu-div3>div:nth-of-type(3){
      margin-right: 24px;
  }
  .tu-div3>div:nth-of-type(4)>div{
      position: relative;
  }
  .tu-div3>div:nth-of-type(4)>div>img{
      position: absolute;
      cursor: pointer;
  }
  .img1{
      left:0;
  }
  .img2{
      left:32px;
  }
  .img3{
      left:64px;
  }
  .img4{
      left:96px;
  }
  .img5{
      left:128px;
  }
  .name-div3>div{
      float: left;
      height: 24px;
      margin-top: 24px;
      font-size: 14px;
  }
  .name-div3>div:nth-of-type(1){
      margin: 24px 73px 0 240px;
  }
  .name-div3>div:nth-of-type(1)>input,.picksize{
      width: 90px;
      height: 22px;
      border-radius: 4px;
      outline: none;
      margin-left: 24px;
      border: solid 1px #d6d6d6;
  }
  .name-div3>div:nth-of-type(3){
      width: 95px;
      margin: 24px 24px 0 74px;
  }
  .se-div3>div{
      float: left;
      margin-top: 24px;
      height: 24px;
      font-size: 14px;
  }
  
  .se-div3>div:nth-of-type(1){
      margin: 24px 200px 0 365px;
      vertical-align: middle;
  }
  .se-div3>div:nth-of-type(1)>span{
      margin-right: 24px;
      vertical-align: top;
  }
  .se-div3>div:nth-of-type(2){
      width: 95px;
      margin-right: 24px;
  }
  .log-bottom{
      width: 272px;
      margin: 0 auto;
  }
  .log-bottom>div:nth-of-type(1){
      width: 270px;
      height: 270px;
      border: solid 1px #e6e6e6;
      background-color: white;
      margin-bottom: 24px;
  }
  .log-bottom>div:nth-of-type(1)>img{
      width: 270px;
      height: 270px;
  }
  .log-bottom>div:nth-of-type(2){
      width: 270px;
      height: 48px;
      background-color: #f96006;
      text-align: center;
      line-height: 48px;
      font-size: 20px;
      letter-spacing: 8.89px;
      color: white;
      cursor: pointer;
  }
</style>
<style>
    .el-slider__runway{
        width: 120px;
        margin: 6px 115px 0 6px;
    }
    .el-slider__bar{
        background-color: #f96006!important;
    }
    .el-slider__button{
        width: 8px;
        height: 8px;
        background-color: #f96006;
        border: none;
    }
    .m-colorPicker .colorBtn{
      width: 24px!important;
      height: 24px!important;
      border-radius: 12px;
      cursor: pointer;
  }
</style>
