<template>
    <div class="fix" v-show="fixshow">
        <div class="fix-div">
            <img class="fix-logo" src="/static/images/guolao.png" alt="" @click="fixback">
            <div class="fix-box">
                <div class="fix-trade">
                  <router-link  tag="div" :to="{path:'/trade',query: {id: this.id}}">商标服务</router-link>
                  <div class="fix-div1">
                      <div v-for="(v,k,index) in myarr" class="fix-div1-box" v-if="v.title != '商标取名'&&v.title != '商标设计'">
                          <p @click="moveto(v.id,v.title)" v-if="v.title != '商标无效宣告&答辩'"> {{v.title}}<span>|</span></p>
                      </div>
                  </div>
              </div>
              <div class="fix-patent">
                  <router-link tag="div" :to="{path:'/patent',query: {id: 49}}">专利服务</router-link>
                  <div class="fix-div4">
                      <div v-for="(v,k,index) in copyarr" :key="index" class="fix-div2-box">
                          <p @click="moveto1(v.id,v.title,v.pid)">{{v.title}}<span>|</span></p>
                      </div>
                  </div>
              </div>
              <div class="fix-copyright">
                  <router-link tag="div" :to="{path:'/copyright',query: {id: 50}}">版权服务</router-link>
                  <div class="fix-div3">
                      <div v-for="(v,k,index) in copyright" :key="index" class="fix-div3-box">
                          <p @click="moveto2(v.id,v.title,v.pid)">{{v.title}}<span>|</span></p>
                      </div>
                  </div>
              </div>
              <div class="fix-property">
                  <div @click="brandBuy">知产交易</div>
              </div>
              <div class="fix-tool">
                  <div>知产工具</div>
                  <div class="fix-div2">
                      <div @click="toregister">商标评估<span>|</span></div>
                      <div @click="creatname">商标取名<span>|</span></div>
                      <div @click="todesign">Logo设计<span>|</span></div>
                      <div @click="assets">知产管理<span>|</span></div>
                      <div @click="tolisttype">商标分类<span>|</span></div>
                      <div @click="topatentanalyse">专利申请评估</div>
                  </div>
              </div>
              <div class="fix-abouts">
                  <div>关于我们</div>
                  <div class="fix-div5">
                      <router-link tag="p" to="/about">公司介绍</router-link><span>|</span>
                      <router-link tag="p" to="/link">联系我们</router-link><span>|</span>
                      <router-link tag="p" to="/news">新闻中心</router-link>
                  </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "fix",
        components:{

        },
        data(){
          return {
              id:'',
            fixshow:false,
            myarr:[],
            copyarr:[],
            copyright:[],
          }

        },
        mounted(){
            this.getNav();
            this.getList1();
            this.getList2();
            window.addEventListener('scroll', this.windowScroll)
        },
        methods:{
            fixback(){
                 this.$router.push('/')
            },
            tolisttype(){
              this.$router.push('/listtype');
            },
            topatentanalyse(){
              if(this.$cookie.getCookie('u_id')){
                this.$router.push('/patentAnalyse');
              }else{
                this.$router.push({
                    path:'/login',
                    query:{
                    good:0
                    }
                })
                }
            },
            windowScroll() {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                if(scrollTop>100){
                    this.fixshow = true
                }else{
                    this.fixshow = false
                }
            },
          getNav(){
            this.$http.get(this.GLOBAL.base_url+'/api/index').then(res=>{
              if(res.data.code == "1"){
                this.myarr = res.data.data[0].good;
                this.id = res.data.data[0].id;
                this.imgArr = res.data.others;
              }
            })
        },
        getList1(){
          this.$http.post(this.GLOBAL.base_url+'/api/patent/goodType',{
            type:'专利服务',
            grade:2
          }).then( res => {
            // console.log(res)
            this.copyarr = res.data.data
          })
        },
      getList2(){
        this.$http.post(this.GLOBAL.base_url+'/api/patent/goodType',{
          type:'版权服务',
          grade:2
        }).then( res => {
          // console.log(res)
          this.copyright = res.data.data
        })
      },
      moveto(val,val2){
              if(val2 == '商标注册'){
                  if(this.$cookie.getCookie('u_id')){
                    this.$router.push('/recome')
                    }else{
                    this.$router.push({
                        path:'/login',
                        query:{
                        good:0
                        }
                    })
                    }
              }else{
                  this.$router.push({
                path:'/tradeDetail',
                    query:{
                        id:val,
                        tradeid:this.id,
                        secondid:0
                    }
                });
              }
          },
      moveto1(val,val2,pid){
          this.$router.push({
                path:'/patentDetail',
                query:{
                 id:val,
                 secondid:0,
                 patentId:49
                }
          })


      },
       //版权跳转
        moveto2(val,val2,pid){
            this.$router.push({
                      path:'/copyrightDetail',
                      query:{
                       id:val,
                       secondid:0,
                       patentId:50
                      }
            })

        },
          toregister(){
          if(this.$cookie.getCookie('u_id')){
            this.$router.push('/recome')
          }else{
            this.$router.push({
              path:'/login',
              query:{
                good:0
              }
            })
          }
        },
         creatname(){
              if(this.$cookie.getCookie('u_id')){
                this.$router.push('/picksize')
                }else{
                this.$router.push({
                    path:'/login',
                    query:{
                    good:0
                    }
                })
                }
          },
      todesign(){
        if(this.$cookie.getCookie('u_id')){
          this.$router.push('/designbrand')
        }else{
          this.$router.push({
            path:'/login',
            query:{
              good:0
            }
          })
        }
      },
      assets(){
        if(this.$cookie.getCookie('u_id')){
          this.$router.push('/personal/assetsManagement')
        }else {
          this.$router.push({
                path:'/login',
                query:{
                good:0
              }
          })
        }
      },
      brandBuy() {
        this.$router.push('/brandBuy')
      }
        }
    }
</script>

<style scoped>
   .fix{
       position: fixed;
       width: 100%;
       height: 75px;
       top:0;
       background-color: #292b39;
       z-index: 100;
   }
   .fix-div{
       width: 1200px;
       /* height: 75px; */
       line-height: 75px;
       margin: 0 auto;
   }
   .fix-logo{
       margin: 25px 54px 0 0;
       float: left;
   }
   .fix-box{
       float: left;
       width: 710px;
       height: 75px;
   }
   .fix-box>div{
       float: left;
       color: white;
       margin-right: 60px;
   }
   .fix-box>div:last-child{
       margin-right: 0;
   }
   .fix-trade,.fix-copyright,.fix-patent,.fix-property,.fix-abouts,.fix-tool{
        position: relative;
        cursor: pointer;
    }
    .fix-div1,.fix-div2,.fix-div3,.fix-div4{
        position:absolute;
        background-color: rgba(51, 51, 51, 0.8);
        height: 0;
        transition: all 1s ease;
        opacity: 0;
        z-index: 3;
        overflow: hidden;
        padding-left: 20px;
    }
    .fix-div5{
        width: 300px;
        position:absolute;
        background-color: rgba(51, 51, 51, 0.9);
        height: 0;
        transition: all 1s ease;
        opacity: 0;
        z-index: 3;
        overflow: hidden;
        padding-top:13px;
        left: -75px;
        margin-top: -15px;
        text-align: center;
    }
    .fix-abouts:hover .fix-div5{
        height: 30px;
        opacity: 1;
    }
    .fix-abouts:hover{
      color: #f96006;
    }
    .fix-div2{
        line-height: normal;
        width: 580px;
        margin-top: -15px;
        left: -200px;
    }
    .fix-div2>div{
        float: left;
        width: 95px;
        height: 20px;
         margin-top: 13px;
         color: white;
         text-align: center;
         font-size: 12px;
    }
    .fix-div2>div>span{
        float: right;
    }
    .fix-tool:hover .fix-div2{
        height: 40px;
        opacity: 1;
    }
    .fix-tool:hover{
      color: #f96006;
    }
    .fix-div5>p{
        float: left;
        font-size: 12px;
        line-height: normal;
        color: #ffffff;
        height: 30px;
        margin: 0 22px;
        vertical-align: middle;
    }
    .fix-div5>span{
      float: left;
      font-size: 14px;
      color: #ffffff;
      line-height: normal;
      vertical-align: middle;
    }
    .fix-div1,.fix-div4{
        width: 562px;
        margin-top: -15px;
        left: -60px;
    }
    .fix-div1>div,.fix-div4>div{
        width: 150px;
        float: left;
        height: 16px;
        font-size: 12px;
        color: #ffffff;
        line-height: normal;
        margin-right: 30px;
        margin-top: 15px;
        text-align: center;
        /* border:1px solid red; */
    }
    .fix-div1>div>span,.fix-div4>div>span{
      float: right;
    }
    .fix-div1>div>p>span,.fix-div4>div>p>span{
      float: right;
    }

    .fix-copyright:hover .fix-div3{
        height: 76px;
        opacity: 1;
    }
    .fix-copyright:hover{
      color: #f96006;
    }
    .fix-div3>div>p>span{
      float: right;
    }
    .fix-div3{
        margin-top: -15px;
        width:410px;
        left: -140px;
    }
    .fix-div3>div{
      width: 120px;
        float: left;
        height: 16px;
        font-size: 12px;
        color: #ffffff;
        line-height: normal;
        margin-top: 15px;
        text-align: center;
    }
    .fix-trade:hover{
      color: #f96006;
    }
    .fix-trade:hover .fix-div1{
        height: 76px;
        opacity: 1;
    }
    .fix-patent:hover{
      color: #f96006;
    }
    .fix-patent:hover .fix-div4{
        height:110px;
        opacity: 1;
    }
</style>
