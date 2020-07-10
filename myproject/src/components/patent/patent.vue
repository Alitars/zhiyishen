<template>
  <div class="patent-container">
    <Top></Top>
    <Fix></Fix>
    <div class="patent">
      <div class="patent-box">
        <!-- banner -->
        <div class="patent-banner">
          <div class="patent-pic">
            <p>AI专利申请</p>
            <div class="patent-bd">
              <p>人工智能为你保驾护航</p>
              <p>先检测后申请，分析专利技术</p>
              <p>提供分析报告</p>
              <p>提前了解专利申请成功率，少花冤枉钱</p>
            </div>
            <div @click="tobuy" :to="{path:'/patent',query: {id: 49}}">立即办理</div>
          </div>
        </div>
        <!-- 专利申请 -->
        <div class="patent-apply">
          <!-- 上 -->
          <div class="apply-top">
            <div>
              <img src="/static/images/invalid1x.png" alt />
              <span>专利申请</span>
            </div>
            <p>人工智能为您保驾护航，先检测后注册，为您推荐最合适的注册类别，确保注册成功率</p>
          </div>
            <!-- 改版代码 -->
            <div v-for="(v,k) in good" :key="k" v-show="k == 0" class="apply-bottom" >
              <div class="codeRevised" v-for="(item,index) in v.other" :key="index" @click="color_show(item.id)" :class="{borderBule:item.id == buleId}">
                <div class="codeRevised-top">
                  <img src="/static/images/zl5.png" v-if="index == 0" alt="">
                  <img src="/static/images/zl4.png" v-if="index == 1" alt="">
                  <img src="/static/images/zl3.png" v-if="index == 2" alt="">
                  <img src="/static/images/zl2.png" v-if="index == 3" alt="">
                  <img src="/static/images/zl2.png" v-if="index == 4" alt="">
                  <p class="p1">{{item.title}}</p>
                  <p class="p2">{{item.desc}}</p>
                </div>
                <div class="codeRevised-bottom">
                  <p>
                    <span>¥</span>
                    <span>{{Number(Number(item.price) + Number(item.service_price))}}</span>
                  </p>
                  <p @click="patentDetail(v.id,item.id)">立即办理</p>
                </div>
              </div>
            </div>
          <!-- </div> -->
        </div>
        <!-- 著录项目变更&专利证书副本 -->
        <div class="patent-assign">
          <div class="assign-left">
            <div v-for="(v,k) in good" v-show="k == 1" :key="k">
              <div class="patent-top-title">
                <img src="/static/images/invalid1a.png" alt />
                <span>著录项目变更</span>
              </div>
              <div class="codeRevised ml10" v-for="(item,index) in v.other" :key="index" @click="color_show(item.id)" :class="{borderBule:item.id == buleId}">
                <div class="codeRevised-top">
                  <img src="/static/images/zl6.png" v-if="index == 0" alt="">
                  <img src="/static/images/zl8.png" v-if="index == 1" alt="">
                  <p class="p1">{{item.title}}</p>
                  <p class="p2">{{item.desc}}</p>
                </div>
                <div class="codeRevised-bottom">
                  <p>
                    <span>¥</span>
                    <span>{{Number(item.price) + Number(item.service_price)}}</span>
                  </p>
                  <p @click="patentDetail(v.id,item.id)">立即办理</p>
                </div>
              </div>
            </div>
          </div>
          <div class="assign-right">
            <div v-for="(v,k) in good" v-show="k == 6" :key="k">
              <div class="patent-top-title">
                <img src="/static/images/invalid1b.png" alt />
                <span>专利证书副本</span>
              </div>
              <div class="codeRevised ml162" v-for="(item,index) in v.other" :key="index" @click="color_show(item.id)" :class="{borderBule:item.id == buleId}">
                <div class="codeRevised-top">
                  <img src="/static/images/zl7.png" alt="">
                  <p class="p1">{{item.title}}</p>
                  <p class="p2">{{item.desc}}</p>
                </div>
                <div class="codeRevised-bottom">
                  <p>
                    <span>¥</span>
                    <span>{{Number(item.price) + Number(item.service_price)}}</span>
                  </p>
                  <p @click="patentDetail(v.id,item.id)">立即办理</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 专利无效宣告&专利许可备案 -->
        <div class="patent-report">
          <div class="report-left fr" v-for="(v,k) in good" v-show="k == 5" :key="k">
              <div class="patent-top-title">
                <img src="/static/images/invalid1d.png" alt />
                <span>{{v.title}}</span>
              </div>
              <div class="codeRevised ml10" v-for="(item,index) in v.other" :key="index" @click="color_show(item.id)" :class="{borderBule:item.id == buleId}">
                <div class="codeRevised-top">
                  <img src="/static/images/zl12.png" alt="">
                  <p class="p1">{{item.title}}</p>
                  <p class="p2">{{item.desc}}</p>
                </div>
                <div class="codeRevised-bottom">
                  <p>
                    <span>¥</span>
                    <span>{{Number(item.price) + Number(item.service_price)}}</span>
                  </p>
                  <p @click="patentDetail(v.id,item.id)">立即办理</p>
                </div>
              </div>
          </div>
          <div class="report-right fl"  v-for="(v,k) in good" v-show="k == 7" :key="k">
              <div class="patent-top-title">
                <img src="/static/images/zl18.png" alt />
                <span>{{v.title}}</span>
              </div>
              <div class="codeRevised ml10" v-for="(item,index) in v.other" :key="index" @click="color_show(item.id)" :class="{borderBule:item.id == buleId}">
                <div class="codeRevised-top">
                  <img src="/static/images/zl9.png" v-if="index == 0" alt="">
                  <img src="/static/images/zl10.png" v-if="index == 1" alt="">
                  <img src="/static/images/zl11.png" v-if="index == 2" alt="">
                  <p class="p1">{{item.title}}</p>
                  <p class="p2">{{item.desc}}</p>
                </div>
                <div class="codeRevised-bottom">
                  <p>
                    <span>¥</span>
                    <span>{{Number(item.price) + Number(item.service_price)}}</span>
                  </p>
                  <p @click="patentDetail(v.id,item.id)">立即办理</p>
                </div>
              </div>
          </div>
        </div>
        <!-- 专利无效答辩&报告-->
        <div class="patent-report">
          <div class="report-left" v-for="(v,k) in good" v-show="k == 4" :key="k">
            <!--  -->
            <div class="patent-top-title">
                <img src="/static/images/invalid1d.png" alt />
                <span>{{v.title}}</span>
              </div>
              <div class="codeRevised ml10" v-for="(item,index) in v.other" :key="index" @click="color_show(item.id)" :class="{borderBule:item.id == buleId}">
                <div class="codeRevised-top">
                  <img src="/static/images/zl13.png" alt="">
                  <p class="p1">{{item.title}}</p>
                  <p class="p2">{{item.desc}}</p>
                </div>
                <div class="codeRevised-bottom">
                  <p>
                    <span>¥</span>
                    <span>{{Number(item.price) + Number(item.service_price)}}</span>
                  </p>
                  <p @click="patentDetail(v.id,item.id)">立即办理</p>
                </div>
              </div>
          </div>
          <div class="report-right"  v-for="(v,k) in good" v-show="k == 3" :key="k">
              <div class="patent-top-title">
                <img src="/static/images/zl17.png" alt />
                <span>{{v.title}}</span>
              </div>
              <div class="codeRevised ml10" v-for="(item,index) in v.other" :key="index" @click="color_show(item.id)" :class="{borderBule:item.id == buleId}">
                <div class="codeRevised-top">
                  <img src="/static/images/zl9.png" v-if="index == 0" alt="">
                  <img src="/static/images/zl10.png" v-if="index == 1" alt="">
                  <img src="/static/images/zl11.png" v-if="index == 2" alt="">
                  <p class="p1">{{item.title}}</p>
                  <p class="p2">{{item.desc}}</p>
                </div>
                <div class="codeRevised-bottom">
                  <p>
                    <span>¥</span>
                    <span>{{Number(item.price) + Number(item.service_price)}}</span>
                  </p>
                  <p @click="patentDetail(v.id,item.id)">立即办理</p>
                </div>
              </div>
          </div>
        </div>
        <!-- 专利驳回复审-->
        <div class="patent-report">
          <!-- <div class="report-left fr" v-for="(v,k) in good" v-show="k == 2" :key="k">
            <div class="report-left-top">
              <img src="/static/images/invalid1d.png" alt />
              <span>{{v.title}}</span>
            </div>
            <div class="report-left-bottom bgcc" v-for="(item,index) in v.other" @click="patentDetail(v.id,item.id)" :key="index">
              <p>{{item.title}}</p>
              <p>¥{{Number(item.price) + Number(item.service_price)}}</p>
            </div>
          </div> -->
          <div class="report-right fl"  v-for="(v,k) in good" v-show="k == 2" :key="k">
              <div class="patent-top-title">
                <img src="/static/images/invalid1e.png" alt />
                <span>{{v.title}}</span>
              </div>
              <div class="codeRevised ml10" v-for="(item,index) in v.other" :key="index" @click="color_show(item.id)" :class="{borderBule:item.id == buleId}">
                <div class="codeRevised-top">
                  <img src="/static/images/zl16.png" v-if="index == 0" alt="">
                  <img src="/static/images/zl15.png" v-if="index == 1" alt="">
                  <img src="/static/images/zl14.png" v-if="index == 2" alt="">
                  <p class="p1">{{item.title}}</p>
                  <p class="p2">{{item.desc}}</p>
                </div>
                <div class="codeRevised-bottom">
                  <p>
                    <span>¥</span>
                    <span>{{Number(item.price) + Number(item.service_price)}}</span>
                  </p>
                  <p @click="patentDetail(v.id,item.id)">立即办理</p>
                </div>
              </div>
          </div>
        </div>
        <!--  -->
      </div>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Top from "../ui/top.vue";
import Foot from "../ui/foot.vue";
import Fix from '../ui/fix.vue';
export default {
  name: "patent",
  data () {
    return {
      good: [],
      buleId:'',
    }
  },
  components: {
    Top,
    Foot,
    Fix
  },
   methods:{
    patentDetail(val1,val2) {
       this.$router.push({
         path:'patentDetail',
         query:{
          id:val1,
          secondid:val2,
          patentId:this.$route.query.id
         }
       })
    },
    tobuy() {
      this.$router.push({
         path:'patentDetail',
         query:{
          id:9,
          secondid: 12,
          patentId:this.$route.query.id
         }
       })
    },
    getGood() {
        if(this.$cookie.getCookie('u_id')){
          this.id = this.$cookie.getCookie('u_id')
        }else{
          this.id = 0
        }
        this.$http.get(this.GLOBAL.base_url + "/api/patent/getGoods/" + this.$route.query.id,
         {params:{
          user_id:this.$cookie.getCookie('u_id')
        }})
        .then(res => {
          // console.log(res)
          if (res.data.code == "1") {
            this.good = res.data.data;
          }
        });
    },
    color_show(val) {
      this.buleId = val
    }
   },
   mounted() {
    this.getGood();
  }
};
</script>

<style scoped>
/* 公共样式 */
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
}
.mt36 {
  margin-top: 36px;
}
/*  */
.patent-box {
  background-color: #fafafa;
  font-family: 'PingFangSC';
}
/* banner部分 */
.patent-banner {
  width: 1200px;
  height: 512px;
  margin: 0 auto;
  background: url(/static/images/3.png);
  margin-bottom: 20px;
}
.patent-pic {
  margin: 0 auto;
  width: 1200px;
  height: 412px;

  text-align: center;
  padding-top: 100px;
}
.patent-pic > p {
  margin-bottom: 32px;
  font-size: 48px;
  font-weight: 600;
  color: #ffffff;
  font-family: ""PingFangSC"-Semibold";
}
.patent-pic > div:nth-of-type(1) {
  width: 486px;
  margin: 0 auto 28px;
  font-size: 18px;
  color: #ffffff;
}
.patent-pic > div:nth-of-type(1) > p {
  margin-bottom: 16px;
}
.patent-pic > div:nth-of-type(1) > p:nth-of-type(2) {
  margin-bottom: 16px;
}
.patent-zero {
  font-size: 40px;
  color: #ff8800;
  margin: 0 10px;
  font-weight: 800;
}
.patent-pic > div:nth-of-type(2) {
  width: 144px;
  height: 38px;
  border-radius: 4px;
  background-color: #f96006;
  margin: 0 auto;
  line-height: 38px;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;
}
.patent-bd {
  margin-bottom: 53px !important;
}
/* 专利申请  */
.patent-apply {
  width: 1200px;
  height: 805px;
  background-color: #ffffff;
  margin: 0 auto;
  padding: 60px 10px;
  box-sizing: border-box;
  margin-bottom: 20px;
  cursor: pointer;
}
.apply-top {
  width: 608px;
  height: 96px;
  margin: 0 auto 36px;
  text-align: center;
}
.apply-top > div {
  height: 50px;
  margin-bottom: 24px;
}
.apply-top > div > img {
  width: 34px;
  height: 34px;
  vertical-align: middle;
  margin-right: 7px;
}
.apply-top > div > span {
  font-size: 36px;
  font-weight: 500;
  color: #333333;
  vertical-align: middle;
  font-family: "PingFangSC";
}
.apply-top > p {
  font-size: 16px;
  color: #666666;
  font-family: "PingFangSC";
}
.apply-bottom {
  margin-top: 36px;
}
.apply-bottom > div:nth-child(1){
  margin-left: 0px !important;
}
.apply-bottom > div:nth-child(5){
  margin-left: 0px !important;
}
/* 变更 */
.patent-assign {
  width: 1200px;
  height: 514px;
  margin: 0 auto;
}
.patent-assign > .assign-left {
  width: 590px;
  height: 514px;
  background-color: #fff;
  float: left;
  text-align: center;
  padding-top: 70px;
  box-sizing: border-box;
  cursor: pointer;
}
.patent-assign > .assign-left > div > img {
  width: 32px;
  height: 32px;
  vertical-align: middle;
  margin-right: 12px;
}
.patent-assign > .assign-left > div > span {
  font-size: 36px;
  vertical-align: middle;
  font-weight: 500;
}
.assign-left-one {
  float: left;
  width: 280px;
  height: 100px;
  margin-left: 11px;
}
.assign-left-one > p:nth-child(1) {
  margin: 24px 0 14px;
  font-weight: 500;
  color: #000;
  font-family: "PingFangSC";
}
.assign-left-one > p:nth-child(2) {
  color: #f96006;
  font-size: 14px;
  font-family: "PingFangSC";
}
.assign-left-two {
  float: left;
  width: 280px;
  height: 100px;
}
.assign-left-two > p:nth-child(1) {
  margin: 24px 0 14px;
  font-weight: 500;
  font-family: "PingFangSC";
}
.assign-left-two > p:nth-child(2) {
  color: #f96006;
  font-size: 14px;
  font-family: "PingFangSC";
}
.patent-assign > .assign-right {
  width: 590px;
  height: 514px;
  background-color: #fff;
  float: right;
  text-align: center;
  padding-top: 70px;
  box-sizing: border-box;
}
.patent-assign > .assign-right > div > img {
  width: 32px;
  height: 32px;
  vertical-align: middle;
  margin-right: 12px;
}
.patent-assign > .assign-right > div > span {
  font-size: 36px;
  vertical-align: middle;
  font-weight: 500;
}
.assign-right-one {
  float: left;
  width: 280px;
  height: 100px;
}
.assign-right-one > p:nth-child(1) {
  margin: 24px 0 14px;
  font-weight: 500;
  color: #000;
  font-family: "PingFangSC";
}
.assign-right-one > p:nth-child(2) {
  color: #f96006;
  font-size: 14px;
  font-family: "PingFangSC";
}
.assign-right-two {
  float: left;
  width: 280px;
  height: 100px;
}
.assign-right-two > p:nth-child(1) {
  margin: 24px 0 14px;
  font-weight: 500;
  font-family: "PingFangSC";
}
.assign-right-two > p:nth-child(2) {
  color: #f96006;
  font-size: 14px;
  font-family: "PingFangSC";
}
/* 宣告 */
.patent-proclaim {
  width: 1200px;
  height: 430px;
  background-color: #fff;
  margin: 0 auto;
  margin-top: 20px;
  padding-top: 60px;
  box-sizing: border-box;
}
.proclaim-top {
  width: 608px;

  margin: 0 auto 28px;
  text-align: center;
}
.proclaim-top > div {
  height: 50px;
  margin-bottom: 24px;
}
.proclaim-top > div > img {
  width: 34px;
  height: 34px;
  vertical-align: middle;
  margin-right: 7px;
}
.proclaim-top > div > span {
  font-size: 36px;
  font-weight: 500;
  color: #333333;
  vertical-align: middle;
  font-family: "PingFangSC";
}
.proclaim-bottom >ul >li {
  box-shadow:none;
  background-color: #fff;
}
/* 报告 */
.patent-report {
  width: 1200px;
  height: 514px;
  margin: 0 auto;
  margin-top: 20px;
}
.report-left {
  width: 300px;
  height: 514px;
  background-color: #fff;
  text-align: center;
  float: left;
  padding-top: 60px;
  box-sizing: border-box;
}
.report-left-top {
  margin-bottom: 50px;
}
.report-left-top > img {
  width: 32px;
  height: 32px;
  vertical-align: middle;
  margin-right: 8px;
}
.report-left-top > span {
  font-size: 36px;
  vertical-align: middle;
  font-family: "PingFangSC";
}
.report-left-bottom {
  width: 280px;
  height: 100px;
  margin-left: 10px;
  padding-top: 24px;
  box-sizing: border-box;
}
.report-left-bottom > p:nth-child(1) {
  font-family: "PingFangSC";
  font-size: 16px;
  font-weight: 500;
}
.report-left-bottom > p:nth-child(2) {
  font-family: "PingFangSC";
  font-size: 14px;
  color: #f96006;
  margin-top: 14px;
}
.report-right {
  width: 880px;
  height: 514px;
  background-color: #fff;
  float: right;
  text-align: center;
  padding-top: 60px;
  box-sizing: border-box;
}
.report-right-bottom>.report-left-one {
  float: left;
  margin-left: 10px;
  width: 280px;
  height: 100px;
  padding-top: 24px;
  box-sizing: border-box;
}
.report-right-bottom >.report-left-one> p:nth-child(1) {
  font-family: "PingFangSC";
  font-size: 16px;
  font-weight: 500;
}
.report-right-bottom >.report-left-one> p:nth-child(2) {
  font-family: "PingFangSC";
  font-size: 14px;
  color: #f96006;
  margin-top: 14px;
}
.bow {
  box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.1);
  background-color: #fdfbfa;
}
.bgcc{
  box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.1) !important;
  background-color: #fdfbfa !important;
  cursor: pointer;
}
.fl {
  float: left !important;
}
.fr {
  float: right !important;
}
.ml163 {
  margin-left: 163px !important;
}
/* 改版后样式 */
.codeRevised {
  width: 280px;
  height: 297px;
  /* border: solid 1px #f0f0f0; */
  background-image: url(/static/images/zl1.png);
  box-sizing: border-box;
  float: left;
  margin-left: 20px;
  margin-bottom: 10px;
  padding: 16px 32px 32px 32px;
  box-sizing: border-box;
  cursor: pointer;
}
.codeRevised-top {
  height: 175px;
  width: 216px;
  border-bottom: 1px solid #a6c9d9;
  box-sizing: border-box;
  text-align: center;
}
.codeRevised-top > img {
  margin-bottom: 10px;
}
.codeRevised-top > .p1 {
  font-weight: 550;
  color: #333333;
  margin-bottom: 10px;
}
.codeRevised-top > .p2 {
  font-weight: 100;
  color: #333333;
  height: 58px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.codeRevised-bottom {
  text-align: center;
  padding: 12px 0 0 0;
  box-sizing: border-box;
}
.codeRevised-bottom > p:nth-child(1) > span:nth-child(1) {
  font-size: 14px;
  color: #f96006;
  margin-right: -2px;
  font-family: 'PingFangSC';
}
.codeRevised-bottom > p:nth-child(1) > span:nth-child(2) {
  color: #f96006;
  font-size: 24px;
  font-family: 'PingFangSC';
}
.codeRevised-bottom > p:nth-child(2) {
  width: 96px;
  height: 32px;
  border-radius: 4px;
  background-color: #095e82;
  line-height: 32px;
  text-align: center;
  margin: 10px 0 0 60px;
  color: #fff;
  font-family: 'PingFangSC';
  font-size: 14px;
  font-weight: normal;
  cursor: pointer;
}
.borderBule {
  border: 2px solid #0b4983 !important;
}
.ml10 {
  margin-left: 10px !important;
}
.patent-top-title {
  margin-bottom: 36px;
}
.patent-top-title > img{
  vertical-align: middle;
}
.patent-top-title > span{
  vertical-align: middle;
  font-size: 36px;
  font-weight: 500;
  color: #333333;
}
.ml162 {
  margin-left: 162px !important;
}
</style>
