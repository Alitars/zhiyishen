<template>
  <div class="bottom-container">
      <div class="bottom-container-box">
          <div class="bottom-container-box-litter">
              <div class="middle-box">
                <div class="introduct">
                    <p id="p1">关于我们</p>
                    <router-link tag="p" to="/about">公司介绍</router-link>
                    <router-link tag="p" to="/link">联系我们</router-link>
                </div>
                <div class="help">
                    <p id="p2">帮助中心</p>
                    <!-- <p>新手帮助</p>
                    <p>交易流程</p> -->
                    <p @click="tosafe">安全保障</p>
                    <p @click="toprotocol">注册协议</p>
                    <p @click="sercet">隐私条款</p>
                </div>
                <div class="partner">
                    <p id="p3">合作伙伴</p>
                    <p>
                        <a href="https://www.tianyancha.com/" target="blank">天眼查</a>
                    </p>
                    <p>
                        <a href="https://www.xfyun.cn/" target="blank">科大讯飞</a>
                    </p>
                </div>
                <div class="int-img"></div>
                <div class="code">
                    <img class="code-img" src="/static/images/code.png" alt="">
                    <div class="code-p">
                        <p id="p4">扫描二维码</p>
                        <p>关注知依昇微信</p>
                        <p>创业一手掌握</p>
                    </div>
                    <div style="clear:both;"></div>   
                </div>
                <div style="clear:both;"></div>
            </div>
            <!-- <div class="complaint">
                <span class="time">投诉QQ (9:00-18:00)</span>
                <span>Emali: xxxxx@xx.com</span>
            </div> -->
            <div>
                <div class="cult">
                    <span>友情链接:<a href="http://www1.soopat.com/Home/IIndex" target="blank">专利搜索</a></span>
                    <span class="distance1">|</span>
                    <span> <a href="http://sbj.cnipa.gov.cn/" target="blank">国家知识产权局</a></span>
                    <span class="distance2">|</span>
                    <span><a href="http://epub.sipo.gov.cn/" target="blank">中国专利公告</a></span>
                    <span class="distance2">|</span>
                    <span><a href="http://www.ncac.gov.cn/" target="blank">国家版权局</a></span>
                </div>
                <div class="corp">
                    <span>copyright©Zhisheng Shanghai Artificial Intelligence Technology Co., Ltd.　<a href="http://www.beian.miit.gov.cn" target="_blank">沪ICP备19029150号-1</a></span>
                    <span class="distance3">知昇（上海）人工智能科技有限公司 版权所有</span>
                </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'foot',
  components: {
      
  },
  methods:{
      toprotocol(){
          let routeData = this.$router.resolve({ path: '/protocol'});
              window.open(routeData.href, '_blank');
      },
      tosafe(){
          let routeData = this.$router.resolve({ path: '/keepsafe'});
              window.open(routeData.href, '_blank');
      },
      sercet(){
          let routeData = this.$router.resolve({ path: '/policy'});
              window.open(routeData.href, '_blank');
      }
  }
}

</script>

<style scoped>
  .bottom-container-box{
      height: 314px;
      background-color:#f8f8f8;
      padding-top: 22px;
  }
  .bottom-container-box-litter{
      margin: 22px auto 0;
      width: 980px;
      height: 272px;
      border-top:1px solid #d8d8d8;
      padding-top: 18px;
  }
  .middle-box{
      width: 980px;
      height: 178px;
      border-bottom: 1px solid #d8d8d8;
  }
  .middle-box>div{
      float: left;
  }
  .introduct>p{
      font-family: "PingFangSC-Medium";
      font-size: 12px;
      color: #555555;
      margin-top:10px;
      cursor: pointer;
  }
  #p1,#p2,#p3{
      font-weight: 600;
      color: #333333;
      margin-top:0;
  }
  .help{
      margin:0 148px;
  }
  .help>p{
      font-family: "PingFangSC-Regular";
      font-size: 12px;
      color: #555555;
      margin-top:10px;
      cursor: pointer;
  }
  .partner>p{
      font-family: "PingFangSC-Regular";
      font-size: 12px;
      margin-top:10px;
  }
  .partner>p>a{
      color: #555555;
      text-decoration: none;
      cursor: pointer;
  }
  .int-img{
      width: 86px;
      height: 80px;
      float: left;
      margin:0 107px 0 139px;
      background: url('/static/images/net.png') 100% no-repeat; 
  }
  .code-img,.code-p{
      float: left;
  }
  .code-p{
      margin-left: 8px;
  }
  .code-p>p{
      font-family: "PingFangSC-Regular";
      font-size: 12px;
      margin-top: 8px;
      color: #999999;
  }
  .p4{
      margin-top: 0;
  }
  .complaint{
      width: 980px;
      height: 34px;
      line-height: 34px;
      border-bottom:1px solid #d8d8d8;
  }
  .complaint>span{
      font-family: "PingFangSC-Regular";
      font-size: 12px;
      color: #8c8c8c;
  }
  .time{
      margin-right: 32px;
  }
  .cult{
      margin-top: 2px;
  }
  .cult>span{
      font-family: "PingFangSC-Regular";
        font-size: 12px;
        color: #555555;
  }
  .cult>span>a{
      text-decoration: none;
      font-family: "PingFangSC-Regular";
        font-size: 12px;
        color: #555555;
  }
  .corp>span{
    font-family: "PingFangSC-Regular";
        font-size: 12px;
        color: #555555;  
  }
  .corp>span>a{
      text-decoration: none;
      color: #555555; 
  }
  .distance1{
      margin: 0 8px 0 54px;
  }
  .distance2{
      margin: 0 8px 0 45px;
  }
  .distance3{
      margin-left: 32px;
  }
</style>
