<template>
  <div class="designcreat">
    <Top></Top>
    <Fix></Fix>
     <div class="designcreat-box">
            <div v-for="(v,k) in design" class="bigbox">
                <div class="box-zheng" :class="{ turn2:isTags(k)}">
                    <div class="div1" >
                        <img :src="GLOBAL.base_url+v.pic" alt="">
                    </div>
                    <div class="div2">
                        <div><span>推荐类别:</span><span>{{v.fir[0].name}}</span></div>
                        <div><span>推荐组别:</span><span :title="v.fir[0].sec[0].name">{{v.fir[0].sec[0].num}} {{v.fir[0].sec[0].name}}</span></div>
                        <!-- <div>
                            <div>成功指数:</div>
                            <div class="starbox">
                                <el-rate
                                    v-model="score"
                                    disabled
                                    score-template="{value}">
                                </el-rate>
                            </div>
                        </div> -->
                    </div>
                    <div class="div3">
                        <div @click="toregister(v.yuan,v.fir)">注册</div>
                        <div @click="watch1(k)">查看类别</div>
                    </div>
                </div>
                <div class="box-fan" :class="{ turn1:isTags(k)}">
                    <div>
                         <div class="fan-div1">推荐注册类别</div>
                        <div class="fan-div2">
                            <div v-for="(item,index) in v.fir">
                                <div>第{{item.name}}</div>
                                <div v-for="(m,n) in item.sec" class="second-design">
                                    <div>{{m.num}} {{m.name}}</div>
                                </div>
                                <!-- <div>
                                    <div>成功指数:</div>
                                    <div class="starbox">
                                        <el-rate
                                            v-model="score"
                                            disabled
                                            score-template="{value}">
                                        </el-rate>
                                    </div> 
                                </div> -->
                            </div>
                            
                        </div>
                        <div class="fan-div3" @click="watch2(k)">返回</div>
                    </div>
                </div>
            </div>
            <div style="width:1200px;height:54px;">
                <div id="watchmore" @click="more">查看更多</div>
            </div>
             
        </div>
        <div style="clear:both"></div>
     <Foot></Foot>
     <div class="wait-div" v-show="waitshow">
         <div>
             <img src="/static/images/loading小果.gif" alt="">
             <p>{{num}}%</p>
             <p>小果正在为您智能检测,请稍候……</p>
         </div>
    </div>
  </div>
</template>

<script>
import Top from '../ui/top.vue';
import Foot from '../ui/foot.vue';
import Fix from '../ui/fix.vue';
export default {
  name: 'designcreat',
  data(){
    return{
         list1:[{id:"1",name:"01类 化学原料"},{id:"2",name:"02类 颜料油漆"},{id:"3",name:"03类 日化用品"},{id:"4",name:"04类 燃料油脂"},{id:"5",name:"05类 医药"},
          {id:"6",name:"06类 金属材料"},{id:"7",name:"07类 机械设备"},{id:"8",name:"08类 手工器械"},{id:"9",name:"09类 科学仪器"},{id:"10",name:"10类 医疗器械"},
          {id:"11",name:"11类 灯具空调"},{id:"12",name:"12类 运输工具"},{id:"13",name:"13类 军火烟火"},{id:"14",name:"14类 珠宝钟表"},{id:"15",name:"15类 乐器"},
          {id:"16",name:"16类 办公用品"},{id:"17",name:"17类 橡胶制品"},{id:"18",name:"18类 皮革皮具"},{id:"19",name:"19类 建筑材料"},{id:"20",name:"20类 家具"},
          {id:"21",name:"21类 厨房洁具"},{id:"22",name:"22类 绳网袋蓬"},{id:"23",name:"23类 纱线丝"},{id:"24",name:"24类 布料床单"},{id:"25",name:"25类 服装鞋帽"},
          {id:"26",name:"26类 钮扣拉链"},{id:"27",name:"27类 地毯席垫"},{id:"28",name:"28类 健身器材"},{id:"29",name:"29类 食品"},{id:"30",name:"30类 方便食品"},
          {id:"31",name:"31类 农林生鲜"},{id:"32",name:"32类 啤酒饮料"},{id:"33",name:"33类 酒"},{id:"34",name:"34类 烟草烟具"},{id:"35",name:"35类 广告销售"},
          {id:"36",name:"36类 金融物管"},{id:"37",name:"37类 建筑修理"},{id:"38",name:"38类 通讯服务"},{id:"39",name:"39类 运输贮藏"},{id:"40",name:"40类 材料加工"},
          {id:"41",name:"41类 教育娱乐"},{id:"42",name:"42类 科技服务"},{id:"43",name:"43类 餐饮住宿"},{id:"44",name:"44类 医疗园艺"},{id:"45",name:"45类 社会服务"}],
        score:4,
        index:[],
        design:[],
        num:0,
        waitshow:true,
        list:[],
        design2:[]
    }
  },
  components: {
      Top,
      Foot,
      Fix
  },
  methods:{
      watch1(val){
          this.index.push(val);
      },
      watch2(val){
         for(var i =0;i<this.index.length;i++){
             if(val == this.index[i]){
                 this.$delete(this.index,i);
             }
         }
      },
      isTags(tagId) {
        if (this.index.includes(tagId)) {
            return true;
        } else {
            return false;
        }
      },
      toregister(val,val2){
          this.$router.push({
                    path:'/picktype',
                    query:{
                        // type:this.$route.query.type,
                        good:this.$route.query.good,
                        pic_url:val,
                        data:val2,
                        is_design:1,
                        guild:this.$route.query.guild
                    }
                })
      },
      more(){
          if(this.$route.query.id){
              this.$http.post(this.GLOBAL.base_url+'/api/shopCar/anotherList',{
                keywords:this.$route.query.type,
                id:this.$route.query.id
            }).then(res=>{
                if(res.data.code == 1){
                    this.list = res.data.data;
                    this.$http.get(this.GLOBAL.base_url+'/app/getpicall',{params:{
                         channelroad:1,
                        user_id:this.$cookie.getCookie('u_id'),
                        name:this.$route.query.type,
                        servername:'酒店',
                    }}).then(res=>{
                    if(res.data.code== "1"){
                        this.design2 = res.data.data;
                        for(var i =0;i<this.design2.length;i++){
                            this.design2[i].fir = this.list
                        }
                        this.design = this.design.concat(this.design2);
                        for(var i =0;i<this.design.length;i++){
                            for(var m=0;m<this.design[i].fir.length;m++){
                                for(var j =0;j<this.list1.length;j++){
                                    if(this.design[i].fir[m].num == this.list1[j].id){
                                        this.design[i].fir[m].name = this.list1[j].name;
                                    }
                                }
                            } 
                        }
                        for(var i =0;i<this.design.length;i++){
                            for(var j =0;j<this.design[i].fir.length;j++){
                                for(var m =0;m<this.design[i].fir[j].sec.length;m++){
                                    this.design[i].fir[j].sec[m].sscore = 0;
                                    if(this.design[i].fir[j].sec[m].num<1000){
                                        this.design[i].fir[j].sec[m].num = '0'+this.design[i].fir[j].sec[m].num;
                                    }
                                }
                            }
                        }
                        
                    }
                })
                }
            })
          }else{
               this.$http.get(this.GLOBAL.base_url+'/app/getpicall',{params:{
                     channelroad:1,
                    user_id:this.$cookie.getCookie('u_id'),
                    name:this.$route.query.type,
                    servername:this.$route.query.good
                }}).then(res=>{
                    if(res.data.code== "1"){
                        this.design = this.design.concat(res.data.data);
                        for(var i =0;i<this.design.length;i++){
                            for(var m=0;m<this.design[i].fir.length;m++){
                                for(var j =0;j<this.list1.length;j++){
                                    if(this.design[i].fir[m].num == this.list1[j].id){
                                        this.design[i].fir[m].name = this.list1[j].name;
                                    }
                                }
                            } 
                        }
                        for(var i =0;i<this.design.length;i++){
                            for(var j =0;j<this.design[i].fir.length;j++){
                                for(var m =0;m<this.design[i].fir[j].sec.length;m++){
                                    this.design[i].fir[j].sec[m].sscore = 0;
                                    if(this.design[i].fir[j].sec[m].num<1000){
                                        this.design[i].fir[j].sec[m].num = '0'+this.design[i].fir[j].sec[m].num;
                                    }
                                }
                            }
                        }
                    }
                })
          }
      },
      getdata(){
          if(this.$route.query.id){
           this.$http.post(this.GLOBAL.base_url+'/api/shopCar/anotherList',{
                keywords:this.$route.query.type,
                id:this.$route.query.id,
                type:this.$route.query.from
            }).then(res=>{
                if(res.data.code == 1){
                    this.list = res.data.data;
                    this.$http.get(this.GLOBAL.base_url+'/app/getpicall',{params:{
                        channelroad:1,
                    user_id:this.$cookie.getCookie('u_id'),
                        name:this.$route.query.type,
                        servername:'酒店',
                        groups:'3110,3009,3008,3007,3006,3004,3005,2901,2902,2903,2904,2905,2907,2910,2911,2912,2913,2914,502,3003,3012,3014,3015,3016,3018,3019,3017,2908,3301,3201,3202,3203,3001,3002,3101,3102,3103,3104,3105,3106,3107,3109,2906',
                    }}).then(res=>{
                    clearInterval(this.timer);
                    this.num = 100;
                        if(this.num == 100){
                            setTimeout(() => {
                                 this.waitshow = false;
                            }, 10);
                        }
                    if(res.data.code== "1"){
                        this.design = res.data.data;
                        for(var i =0;i<this.design.length;i++){
                            this.design[i].fir = this.list
                        }
                        for(var i =0;i<this.design.length;i++){
                            for(var m=0;m<this.design[i].fir.length;m++){
                                for(var j =0;j<this.list1.length;j++){
                                    if(this.design[i].fir[m].num == this.list1[j].id){
                                        this.design[i].fir[m].name = this.list1[j].name;
                                    }
                                }
                            } 
                        }
                        for(var i =0;i<this.design.length;i++){
                            for(var j =0;j<this.design[i].fir.length;j++){
                                for(var m =0;m<this.design[i].fir[j].sec.length;m++){
                                    this.design[i].fir[j].sec[m].sscore = 0;
                                    if(Number(this.design[i].fir[j].sec[m].num<1000)){
                                        this.design[i].fir[j].sec[m].num = '0'+Number(this.design[i].fir[j].sec[m].num);
                                    }
                                }
                            }
                        }
                        
                    }
                })
                }
            })
          }else{
              this.$http.get(this.GLOBAL.base_url+'/app/getpicall',{params:{
                   channelroad:1,
                    user_id:this.$cookie.getCookie('u_id'),
                    name:this.$route.query.type,
                    servername:this.$route.query.good,
                    groups:this.$route.query.guild,
                }}).then(res=>{
                    // console.log(res)
                    clearInterval(this.timer);
                    this.num = 100;
                        if(this.num == 100){
                            setTimeout(() => {
                                this.waitshow = false;
                            }, 10);
                        }
                    if(res.data.code== "1"){
                        this.design = res.data.data;
                        for(var i =0;i<this.design.length;i++){
                            for(var m=0;m<this.design[i].fir.length;m++){
                                for(var j =0;j<this.list1.length;j++){
                                    if(this.design[i].fir[m].num == this.list1[j].id){
                                        this.design[i].fir[m].name = this.list1[j].name;
                                    }
                                }
                            } 
                        }
                        for(var i =0;i<this.design.length;i++){
                            for(var j =0;j<this.design[i].fir.length;j++){
                                for(var m =0;m<this.design[i].fir[j].sec.length;m++){
                                    this.design[i].fir[j].sec[m].sscore = 0;
                                    if(this.design[i].fir[j].sec[m].num<1000){
                                        this.design[i].fir[j].sec[m].num = '0'+this.design[i].fir[j].sec[m].num;
                                    }
                                }
                            }
                        }
                    }
                })
          }
           
      },
      addnum(){
         this.timer = setInterval( () => {
            //  console.log(this.num)
                    this.num+=1
                    if(this.num == 95){
                        clearInterval(this.timer);
                    }
                }, 100)
      },
      
  },
  mounted(){
      this.getdata();
  },
  created(){
        clearInterval(this.timer)
        this.timer = null
       this.addnum();
    },
    destroyed(){
        clearInterval(this.timer)
        this.timer = null
    }

}

</script>

<style scoped>
   .designcreat-box{
       width: 1210px;
       margin: 100px auto 80px;
       /* height: 960px;
       overflow: hidden; */
   }
   .designcreat-box>div{
       float: left;
       margin:0 60px 60px 0;
        width: 360px;
        height: 443px;
   }
   .designcreat-box>div:nth-child(3n){
       margin-right: 0;
   }
   .bigbox{
       perspective: 2100px;
       -webkit-perspective: 2100px;
       -moz-perspective: 2100px;
       -ms-perspective: 2100px;
       -o-perspective: 2100px;
   }
   .bigbox>div{
       position: absolute;
        width: 360px;
        height: 443px;
        margin-top: 5px;
        margin-left: 5px;
       -webkit-transform-style: preserve-3d;
       -moz-transform-style: preserve-3d; 
       -ms-transform-style: preserve-3d;
       -o-transform-style: preserve-3d;
       transform-style: preserve-3d;
       backface-visibility:hidden;
       transition:all 1s;
       box-shadow: 0 0 30px -2px rgba(218, 218, 218, 0.5);
   }
   .box-zheng{
       transform: rotateY(0deg); 
       -webkit-transform: rotateY(0deg);
       -moz-transform: rotateY(0deg);
       -ms-transform: rotateY(0deg);
       -o-transform: rotateY(0deg); 
   }
   .div1{
       width: 240px;
       height: 240px;
       background-color:  #e8f7e7;
       margin: 32px auto 28px;
   }
   .div1>img{
       width: 240px;
       height: 240px;
   }
   .div2{
       margin: 0 0 25px 70px;
   }
   .div2>div:nth-of-type(1){
       margin-bottom: 12px;
   }
   .div2>div:nth-of-type(1)>span:nth-of-type(1){
       font-size: 16px;
       color: #999999;
       margin-right: 12px;
   }
   .div2>div:nth-of-type(1)>span:nth-of-type(2){
       font-size: 16px;
       color: #333333;
   }
   .div2>div:nth-of-type(2){
       width: 220px;
       overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
   }
   .div2>div:nth-of-type(2)>span:nth-of-type(1){
       font-size: 16px;
       color: #999999;
       margin-right: 12px;
   }
   .div2>div:nth-of-type(2)>span:nth-of-type(2){
       font-size: 16px;
       color: #333333;
   }
   /* .div2>div:nth-of-type(2){
       height: 22px;
       font-size: 16px;
       color: #999999;
   }
   .div2>div:nth-of-type(2)>div{
       float: left;
   }
   .div2>div:nth-of-type(2)>div:nth-of-type(2){
       margin-left: 20px;
   } */
   .div3{
       height: 32px;
       margin-left: 70px;
   }
   .div3>div{
       float: left;
       width: 80px;
       height: 32px;
       border:1px solid #f96006;
       text-align: center;
       line-height: 32px;
       font-size: 14px;
       color: #333333;
       cursor: pointer;
   }
   .div3>div:nth-of-type(2){
       margin-left: 48px;
   }
   .box-fan{
       transform: rotateY(-180deg);
       -webkit-transform: rotateY(-180deg);
       -moz-transform: rotateY(-180deg);
       -ms-transform: rotateY(-180deg);
       -o-transform: rotateY(-180deg);
   }
   .box-fan>div{
       margin: 32px 0 0 80px;
   }
   .fan-div1{
       font-size: 18px;
       color: #333333;
       margin-bottom: 12px;
   }
   .fan-div2{
       height: 290px;
       overflow-y: auto;
   }
    .fan-div2::-webkit-scrollbar {
        width: 8px;     
        height: 8px;
    }
    .fan-div2::-webkit-scrollbar-thumb {
        border-radius: 5px;
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    }
    .fan-div2::-webkit-scrollbar-track {
        opacity: 0;
    }
    .fan-div2>div{
        margin-bottom: 8px;
    }
    .fan-div2>div>div:nth-of-type(1){
        font-size: 14px;
        color: #333333;
        margin-bottom: 4px;
    }
    .fan-div2>div>div:nth-of-type(2){
        margin-bottom: 8px;
    }
     .second-design{
         font-size: 14px;
        color: #999999;
        margin-bottom: 4px;
     }
    /* .fan-div2>div>div:nth-of-type(2){
        height: 20px;
    }
    .fan-div2>div>div:nth-of-type(2)>div{
        float: left;
    }
    .fan-div2>div>div:nth-of-type(2)>div:nth-of-type(1){
         font-size: 14px;
         color: #999999;
         margin-right: 8px;
    } */
    .fan-div3{
        width: 80px;
        height: 32px;
        border:1px solid #f96006;
        text-align: center;
        line-height: 32px;
        color: #333333;
        font-size: 14px;
        margin: 22px 0 0 172px;
        cursor: pointer;
    }
    .turn1{
        transform:rotateY(0deg);
    }
    .turn2{
        transform:rotateY(180deg);
    }
    #watchmore{
        width: 214px;
        height: 54px;
        border-radius: 4px;
        background-color: #f96006;
        margin: 0 auto 80px;
        text-align: center;
        line-height: 54px;
        font-size: 18px;
        color: #ffffff;
        cursor: pointer;
    }
    .wait-div{
        background-color: #fbefe9;
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 20;
        top: 0;
        left: 0;
    }
    .wait-div>div{
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        text-align: center;
    }
    .wait-div>div>img{
        margin-bottom: 35px;
    }
    .wait-div>div>p:nth-of-type(1){
        font-size: 48px;
        font-weight: 500;
        color:#f96006;
        margin-bottom: 60px;
    }
    .wait-div>div>p:nth-of-type(2){
        font-size: 32px;
        font-weight: 500;
        color: #333333;
    }
</style>
<style>
   .starbox .el-rate__icon{
        font-size: 16px!important;
        margin-top: 3px;
    }
    
</style>

