<template>
  <div class="copyright-container">
    <Top></Top>
    <Fix></Fix>
    <div class="copyright-box">
      <div class="service">
          <div class="copyright-pic">
              <p>软件著作权or作品著作权</p>
              <div>
                <p>法律保障&nbsp;&nbsp;防止剽窃</p>
                <p>保护原创作品的所有权、使用权和收益权,有效打击盗版和山寨产品。</p>
                <p>资质认证&nbsp;&nbsp;享有国家权威证书《著作权证书》.</p>
                <p>申报国家高新技术企业认证科技型中小企业的重要材料。提前了解专利申请成功率，少花冤枉钱</p>
                <p>无形资产 版权可作为无形资产进行交易、转让，可用于质押贷款，有助解决企业经济危机</p>
              </div>
              <!-- <div @click="to()">立即办理</div> -->
          </div>
      </div>
      <!-- 作品著作权 -->
      <div class="patent-apply">
        <!-- 上 -->
        <div class="apply-top">
          <div>
            <img src="/static/images/invalid1b.png" alt />
            <span>作品著作权</span>
          </div>
        </div>
          <!-- 改版代码 -->
          <div v-for="(v,k) in list" :key="k" v-show="k == 0" class="apply-bottom" >
            <div class="codeRevised" v-for="(item,index) in v.other" :key="index" @click="color_show(item.id)" :class="{borderBule:item.id == buleId}">
              <div class="codeRevised-top">
                <img src="/static/images/bq5.png" v-if="index == 0" alt="">
                <img src="/static/images/bq5.png" v-if="index == 1" alt="">
                <img src="/static/images/bq6.png" v-if="index == 2" alt="">
                <img src="/static/images/bq7.png" v-if="index == 3" alt="">
                <p class="p1">{{item.title}}</p>
                <p class="p2" :title="item.desc">{{item.desc}}</p>
              </div>
              <div class="codeRevised-bottom">
                <p>
                  <span>¥</span>
                  <span>{{Number(Number(item.price) + Number(item.service_price)) + Number(item.service_price)}}</span>
                </p>
                <p @click="copyrightDetail(v.id,item.id)">立即办理</p>
              </div>
            </div>
          </div>
        <!-- </div> -->
      </div>
      <!-- 软件著作权 -->
      <div class="patent-apply">
        <!-- 上 -->
        <div class="apply-top">
          <div>
            <img src="/static/images/invalid1a.png" alt />
            <span>软件著作权</span>
          </div>
        </div>
          <!-- 改版代码 -->
          <div v-for="(v,k) in list" :key="k" v-show="k == 1" class="apply-bottom" >
            <div class="codeRevised" v-for="(item,index) in v.other" :key="index" @click="color_show(item.id)" :class="{borderBule:item.id == buleId}">
              <div class="codeRevised-top">
                <img src="/static/images/bq2.png" v-if="index == 0" alt="">
                <img src="/static/images/bq3.png" v-if="index == 1" alt="">
                <img src="/static/images/bq4.png" v-if="index == 2" alt="">
                <p class="p1">{{item.title}}</p>
                <p class="p2" :title="item.desc">{{item.desc}}</p>
              </div>
              <div class="codeRevised-bottom">
                <p>
                  <span>¥</span>
                  <span>{{Number(Number(item.price) + Number(item.service_price)) + Number(item.service_price)}}</span>
                </p>
                <p @click="copyrightDetail(v.id,item.id)">立即办理</p>
              </div>
            </div>
          </div>
        <!-- </div> -->
      </div>
      <!-- 版权转让&版权变更 -->
      <div class="patent-assign">
          <div class="assign-left">
            <div v-for="(v,k) in list" v-show="k == 4" :key="k">
              <div class="patent-top-title">
                <img src="/static/images/999.png" alt />
                <span>{{v.title}}</span>
              </div>
              <div class="codeRevised ml10" v-for="(item,index) in v.other" :key="index" @click="color_show(item.id)" :class="{borderBule:item.id == buleId}">
                <div class="codeRevised-top">
                  <img src="/static/images/bq2.png" v-if="index == 0" alt="">
                  <img src="/static/images/bq5.png" v-if="index == 1" alt="">
                  <p class="p1">{{item.title}}</p>
                  <p class="p2" :title="item.desc">{{item.desc}}</p>
                </div>
                <div class="codeRevised-bottom">
                  <p>
                    <span>¥</span>
                    <span>{{Number(Number(item.price) + Number(item.service_price)) + Number(item.service_price)}}</span>
                  </p>
                  <p @click="copyrightDetail(v.id,item.id)">立即办理</p>
                </div>
              </div>
            </div>
          </div>
          <div class="assign-right">
            <div v-for="(v,k) in list" v-show="k == 3" :key="k">
              <div class="patent-top-title">
                <img src="/static/images/998.png" alt />
                <span>{{v.title}}</span>
              </div>
              <div class="codeRevised ml10" v-for="(item,index) in v.other" :key="index" @click="color_show(item.id)" :class="{borderBule:item.id == buleId}">
                <div class="codeRevised-top">
                  <img src="/static/images/bq2.png" v-if="index == 0" alt="">
                  <img src="/static/images/bq5.png" v-if="index == 1" alt="">
                  <p class="p1">{{item.title}}</p>
                  <p class="p2" :title="item.desc">{{item.desc}}</p>
                </div>
                <div class="codeRevised-bottom">
                  <p>
                    <span>¥</span>
                    <span>{{Number(Number(item.price) + Number(item.service_price)) + Number(item.service_price)}}</span>
                  </p>
                  <p @click="copyrightDetail(v.id,item.id)">立即办理</p>
                </div>
              </div>
            </div>
          </div>
      </div>
      <!-- 版权补证 -->
      <div class="patent-apply mb0">
        <!-- 上 -->
        <div class="apply-top">
          <div>
            <img src="/static/images/997.png" alt />
            <span>著作权补证书</span>
          </div>
        </div>
          <!-- 改版代码 -->
          <div v-for="(v,k) in list" :key="k" v-show="k == 2" class="apply-bottom" >
            <div class="codeRevised" v-for="(item,index) in v.other" :key="index" @click="color_show(item.id)" :class="{borderBule:item.id == buleId}">
              <div class="codeRevised-top">
                <img src="/static/images/bq8.png" alt="">
                <p class="p1">{{item.title}}</p>
                <p class="p2" :title="item.desc">{{item.desc}}</p>
              </div>
              <div class="codeRevised-bottom">
                <p>
                  <span>¥</span>
                  <span>{{Number(Number(item.price) + Number(item.service_price)) + Number(item.service_price)}}</span>
                </p>
                <p @click="copyrightDetail(v.id,item.id)">立即办理</p>
              </div>
            </div>
          </div>
        <!-- </div> -->
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
  name: 'copyright',
  components: {
    Top,
    Foot,
    Fix
  },
  data(){
    return{
      list:[],
      buleId:'',
    }
  },
  methods:{
    getGood() {
      if(this.$cookie.getCookie('u_id')){
        this.id = this.$cookie.getCookie('u_id')
      }else{
        this.id = 0
      }
      this.$http.get(this.GLOBAL.base_url + "/api/patent/getGoods/" + this.$route.query.id,
        {params:{user_id:this.$cookie.getCookie('u_id')
        }
        }).then(res => {
        console.log(res)
        if (res.data.code == "1") {
          this.list = res.data.data;
        }
      });
    },
    copyrightDetail(val1,val2) {
      this.$router.push({
        path:'copyrightDetail',
        query:{
         id:val1,
         secondid: val2,
         patentId:this.$route.query.id
        }
      })
    },
    to(){
      alert('此业务正在开发中，敬请期待')
    },
    color_show(val) {
      this.buleId = val
    }
  },
   mounted() {
    this.getGood();
  }
}

</script>

<style scoped>
  .copyright-box {
    background-color: #fafafa;
  }
  .service{
    width: 100%;
    margin-bottom: 20px;
  }
  .copyright-pic{
    margin: 0 auto;
    width: 1200px;
    height: 412px;
    background: url("/static/images/copyright.png") 100% no-repeat;
    text-align: center;
    padding-top: 100px;
  }
  .copyright-pic>p{
    margin-bottom:32px;
    font-size: 48px;
    font-weight: 600;
    color: #333333;
    font-family: "PingFangSC";
    padding-bottom: 1px;
  }
  .copyright-pic>div:nth-of-type(1){
    width: 756px;
    margin: 0 auto 28px;
    font-size: 18px;
    color: #666666;
    font-weight: 500;
  }
  .copyright-pic>div:nth-of-type(1)>p{
    margin-bottom: 20px;
  }
  .copyright-pic>div:nth-of-type(1)>p:nth-of-type(2){
    margin-bottom: 20px;
  }
  .copyright-zero{
   font-size: 40px;
    color: #ff8800;
    margin: 0 10px;
    font-weight: 800;
  }
  .copyright-pic>div:nth-of-type(2){
    width: 144px;
    height: 38px;
    border-radius: 4px;
    background-color: #f96006;
    margin: 0 auto;
    line-height: 38px;
     font-size: 16px;
     color: #ffffff;
     cursor: pointer;
     margin-bottom: 87px;
  }

.patent-assign {
  width: 1200px;
  height: 310px;
  margin: 0 auto;
  margin-top: 48px;
}
.patent-assign > .assign-left {
  width: 590px;
  height: 310px;
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
  width: 434px;
  height: 100px;
  margin-left: 100px;
  margin-top: 36px;
  cursor:pointer;
}
.assign-left-one > p:nth-child(2) {
  margin: 16px 0 0;
  font-weight: 600;
  color: #333;
  font-family: "PingFangSC";
}
.assign-left-one > p:nth-child(3) {
  font-weight: 600;
  color: #333;
  font-family: "PingFangSC";
}
.assign-left-one > p:nth-child(1) {
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
  height: 310px;
  background-color: #fff;
  float: right;
  text-align: center;
  padding-top: 70px;
  box-sizing: border-box;
  cursor: pointer;
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
.assign-right-one > p:nth-child(2) {
  margin: 24px 0 14px;
  font-weight: 500;
  color: #000;
  font-family: "PingFangSC";
}
.assign-right-one > p:nth-child(1) {
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
/*  */


.patent-assign1 {
  width: 1200px;
  height: 310px;
  margin: 0 auto;
  margin-top: 48px;
}
.patent-assign1 > .assign-left {
  width: 1200px;
  height: 310px;
  background-color: #fff;
  float: left;
  text-align: center;
  padding-top: 70px;
  box-sizing: border-box;
  cursor: pointer;
}
.patent-assign1 > .assign-left > div > img {
  width: 32px;
  height: 32px;
  vertical-align: middle;
  margin-right: 12px;
}
.patent-assign1 > .assign-left > div > span {
  font-size: 36px;
  vertical-align: middle;
  font-weight: 500;
}
.assign-left-one1 {
  float: left;
  width: 480px;
  height: 100px;
  margin-left: 378px;
  margin-top: 36px;
  cursor:pointer;
}
.assign-left-one1 > p:nth-child(2) {
  margin: 16px 0 0;
  font-weight: 600;
  color: #333;
  font-family: "PingFangSC";
}
.assign-left-one1 > p:nth-child(3) {
  font-weight: 600;
  color: #333;
  font-family: "PingFangSC";
}
.assign-left-one1 > p:nth-child(1) {
  color: #f96006;
  font-size: 14px;
  font-family: "PingFangSC";
}
.assign-left-two1 {
  float: left;
  width: 280px;
  height: 100px;
}
.assign-left-two1 > p:nth-child(1) {
  margin: 24px 0 14px;
  font-weight: 500;
  font-family: "PingFangSC";
}
.assign-left-two1 > p:nth-child(2) {
  color: #f96006;
  font-size: 14px;
  font-family: "PingFangSC";
}
/* 专利申请  */
.patent-apply {
  width: 1200px;
  height: 555px;
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
/* 改版后样式 */
.codeRevised {
  width: 280px;
  height: 297px;
  /* border: solid 1px #f0f0f0; */
  background-image: url(/static/images/bq1.png);
  box-sizing: border-box;
  float: left;
  margin-left: 20px;
  padding: 16px 32px 32px 32px;
  box-sizing: border-box;
  cursor: pointer;
}
.codeRevised-top {
  height: 175px;
  width: 216px;
  border-bottom: 1px solid #d9d9d9;
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
  height: 58px;
  color: #333333;
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
  background-color: #f96006;
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
  border: 2px solid #f96006 !important;
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
.patent-assign > .assign-right {
  width: 590px;
  height: 514px;
  background-color: #fff;
  float: right;
  text-align: center;
  padding-top: 70px;
  box-sizing: border-box;
}
.mb0 {
  margin-bottom: 0px !important;
}
</style>
