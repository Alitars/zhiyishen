<template>
  <div class="tradereport">
    <Top></Top>
    <Fix></Fix>
    <div class="tradereport-box">
        <div class="tradereport-middle">
            <div class="tradereport-middle-top">
                商标评估报告
            </div>
            <div class="tradereport-middle-detail">
                <div class="tradereport-middle-name">
                    <span>商标名称:</span><input type="text" placeholder="请输入商标名称，图像商标填图形">
                </div>
                <div class="tradereport-midddle-img">
                    <span>商标图案:</span>
                    <div>
                        <el-upload
                        accept="image/*"
                        :http-request="reportupload"
                        :show-file-list="false"
                        action="">
                        <img class="reportimg" :src="reportimg?reportimg:'/static/images/icon.png'" alt="">
                        </el-upload>
                    </div>
                </div>
                <div class="tradereport-middle-name">
                    <span>产品名称:</span><input type="text" placeholder="请输入产品名称">
                </div>
                <div class="tradereport-middle-guild">
                    <div class="tradereport-middle-name">
                        <span>所属行业:</span><input type="text" @click="lookguild" placeholder="请选择行业领域" onfocus="this.blur();" v-model="guildname">
                    </div>
                    <div class="tradereport-middle-guildshow" v-show="guildshow">
                        <div class="guildshow1">
                            <div v-for="(v,k) in bigarr" :class="{colorChange:v.title==dynamic}" @mouseenter="look(v.title)">
                                <span>{{v.title}}</span><i class="el-icon-arrow-right"></i>
                            </div>
                        </div>
                        <div class="guildshow2">
                            <div v-for="(v,k) in littlearr" :class="{colorChange2:v.title==dynamic2}" @mouseenter="looklittle(v.title)" @click="choseguild(v.title)">{{v.title}}</div>
                        </div>
                    </div>
                </div>
                <div class="tradereport-middle-type">
                    <div class="type1">注册类别:</div>
                    <div class="type2">
                        <div v-for="(v,k) in list" :class="{change: isTags(v.id)}" @click="gettype(v.id)">{{v.name}}</div>
                    </div>
                </div>
            </div>
            <div class="tradereport-chosetype">已选{{typearr.length}}个类别，评估报告费用总计:</div>
            <div class="tradereport-price">RMB <span>300</span></div>
            <div class="tradereport-buy">
                <div>立即购买</div>
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
  name: 'tradereport',
  data(){
      return{
          reportimg:'',
          bigarr:[],
          dynamic:'',
          littlearr:[],
          dynamic2:'',
          guildname:'',
          guildshow:false,
          list:[{id:"1",name:"化学原料"},{id:"2",name:"颜料油漆"},{id:"3",name:"日化用品"},{id:"4",name:"燃料油脂"},{id:"5",name:"医药"},
          {id:"6",name:"金属材料"},{id:"7",name:"机械设备"},{id:"8",name:"手工器械"},{id:"9",name:"科学仪器"},{id:"10",name:"医疗器械"},
          {id:"11",name:"灯具空调"},{id:"12",name:"运输工具"},{id:"13",name:"军火烟火"},{id:"14",name:"珠宝钟表"},{id:"15",name:"乐器"},
          {id:"16",name:"办公用品"},{id:"17",name:"橡胶制品"},{id:"18",name:"皮革皮具"},{id:"19",name:"建筑材料"},{id:"20",name:"家具"},
          {id:"21",name:"厨房洁具"},{id:"22",name:"绳网袋蓬"},{id:"23",name:"纱线丝"},{id:"24",name:"布料床单"},{id:"25",name:"服装鞋帽"},
          {id:"26",name:"钮扣拉链"},{id:"27",name:"地毯席垫"},{id:"28",name:"健身器材"},{id:"29",name:"食品"},{id:"30",name:"方便食品"},
          {id:"31",name:"农林生鲜"},{id:"32",name:"啤酒饮料"},{id:"33",name:"酒"},{id:"34",name:"烟草烟具"},{id:"35",name:"广告销售"},
          {id:"36",name:"金融物管"},{id:"37",name:"建筑修理"},{id:"38",name:"通讯服务"},{id:"39",name:"运输贮藏"},{id:"40",name:"材料加工"},
          {id:"41",name:"教育娱乐"},{id:"42",name:"科技服务"},{id:"43",name:"餐饮住宿"},{id:"44",name:"医疗园艺"},{id:"45",name:"社会服务"}],
          typearr:[]
      }
  },
  components: {
    Top,
    Foot,
    Fix
  },
  methods:{
      reportupload(img){
          let formData=new FormData();
            formData.append('pic',img.file);
            this.$http.post(this.GLOBAL.base_url+'/api/authentication/upload_card',formData).then(res=>{
              if(res.data.code == "1"){
                this.reportimg = this.GLOBAL.base_url+ res.data.data;
              }
            });
      },
      getguild(){
          this.$http.get(this.GLOBAL.base_url+'/app/registercateall',{params:{
              channelroad:1,
              user_id:this.$cookie.getCookie('u_id'),
              text:this.key
            }}).then(res=>{
            //   console.log(res)
              if(res.data.code == "1"){
                this.bigarr = res.data.data.data;
                this.dynamic = res.data.data.data[0].title;
                this.littlearr = res.data.data.data[0].sec;
              }
            })
      },
      lookguild(){
          this.guildshow = !this.guildshow;
      },
      look(val){
          this.dynamic = val;
          for(var i =0;i<this.bigarr.length;i++){
              if(val == this.bigarr[i].title){
                  this.littlearr = this.bigarr[i].sec;
              }
          }
      },
      looklittle(val){
           this.dynamic2 = val;
      },
      choseguild(val){
          this.guildname = val;
          this.guildshow = false;
      },
      gettype(val){
          if(this.typearr.length == 0){
            this.typearr.push(val)
          }else{
            if(this.typearr.includes(val)){
              for(var i = 0; i<this.typearr.length;i++){
                if(val == this.typearr[i]){
                  this.$delete(this.typearr,i);
                }
              }
            }else{
              this.typearr.push(val)
            }
          }
        },
      isTags(tagId) {
        if (this.typearr.includes(tagId)) {
            return true;
        } else {
            return false;
        }
      },
  },
  mounted(){
      this.getguild()
  }
}

</script>

<style scoped>
    .tradereport-box{
        background-color: #fafafa;
        padding:23px 0 80px;
    }
    .tradereport-middle{
        width: 1038px;
        margin: 0 auto;
        padding:67px 0 80px 162px;
        background: white;
    }
    .tradereport-middle-top{
        width: 878px;
        height: 80px;
        border-bottom:1px solid #d6d6d6;
        font-size: 36px;
        font-weight: 500;
        margin-bottom: 32px;
    }
    .tradereport-middle-detail{
        width: 838px;
        padding: 0 0 32px 40px;
        border-bottom:1px solid #d6d6d6;
        margin-bottom: 32px;
    }
    .tradereport-middle-name{
        margin-bottom: 32px;
    }
    .tradereport-middle-name>span{
        font-size: 22px;
        font-weight: 500;
        color: #000000;
        margin-right: 32px;
        vertical-align: middle;
    }
    .tradereport-middle-name>input{
        width: 697px;
        height: 38px;
        border-radius: 4px;
        border: solid 1px #d6d6d6;
        outline: none;
        font-size: 16px;
        padding-left: 12px;
        color: #999999; 
    }
    .tradereport-midddle-img{
        height: 124px;
        margin-bottom: 32px;
    }
    .tradereport-midddle-img>span{
        float: left;
        font-size: 22px;
        font-weight: 500;
        color: #000000;
        margin-right: 32px;
    }
    .reportimg{
       width: 132px;
       height: 120px;
    }
    .tradereport-middle-guild .tradereport-middle-name>input{
        cursor: pointer;
    }
    .tradereport-middle-guild{
        position: relative;
    }
    .tradereport-middle-guildshow{
        position: absolute;
        width: 600px;
        height: 300px;
        border:1px solid #d6d6d6;
        background: white;
        top:40px;
        left: 125px;
    }
    .tradereport-middle-guildshow>div{
        float: left;
        overflow-y: auto;
        height: 300px;
    }
    .guildshow1{
        width: 350px;
    }
    .el-icon-arrow-right{
        float: right;
        margin-right: 20px;
        vertical-align: middle;
        margin-top: 8px;
    }
    .guildshow1>div,.guildshow2>div{
        padding-left: 10px;
        margin: 10px 0 10px;
        height: 30px;
        line-height: 30px;
        cursor: pointer;
    }
    .colorChange,.colorChange2{
        background: #f96006;
        color: white;
    }
    .guildshow2>div{
        width: 235px;
    }
    .tradereport-middle-type{
        height: 656px;
    }
    .tradereport-middle-type>div{
        float: left;
    }
    .type1{
        font-size: 22px;
        font-weight: 500;
        margin: 5px 32px 0 0;
        color: #000000;
    }
    .type2{
        width: 711px;
        height: 656px;
    }
    .type2>div{
        float: left;
        width: 157px;
        height: 38px;
        font-size: 18px;
        border-radius: 4px;
        border: solid 1px orange;
        line-height: 38px;
        text-align: center;
        margin: 0 25px 16px 0;
        cursor: pointer;
    }
    .type2>div:nth-child(4n){
        margin-right: 0;
    }
    .change{
      background-color: #f96006!important;
      color: #ffffff!important;
  }
  .tradereport-chosetype{
      font-size: 22px;
      font-weight: 600;
      margin-bottom: 16px;
  }
  .tradereport-price{
      font-size: 26px;
      font-weight: 600;
      letter-spacing: -2px;
      margin-bottom: 32px;
  }
  .tradereport-price>span{
      color: #f96006;
  }
  .tradereport-buy{
      width: 878px;
      height: 41px;
  }
  .tradereport-buy>div{
      float: right;
      width: 214px;
      height: 41px;
      border-radius: 4px;
      border-style: solid;
      border-width: 1px;
      border-image-source: linear-gradient(to top, #ba6100 97%, #dc773b 2%);
      border-image-slice: 1;
      background-image: linear-gradient(to bottom, #f79000, orange), linear-gradient(to top, #ba6100 97%, #dc773b 2%);
      background-origin: border-box;
      background-clip: content-box, border-box;
      text-align: center;
      line-height: 41px;
      font-size: 18px;
      color: white;
      cursor: pointer;
  }
</style>
