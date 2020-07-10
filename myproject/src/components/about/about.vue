<template>
  <div class="about">
    <Top></Top>
    <Fix></Fix>
    <div class="about-box">
      <img src="/static/images/abouttop.png" alt="">
      <p>公司介绍</p>
      <div class="about-div">
          <div class="about-div1">知昇（上海）人工智能科技有限公司</div>
          <div class="about-div2">公司核心由超10年从业经验的行内顶尖知识产权专家及专业服务团队组成。致力为国内外各类企业提供全方位的知识产权服务。
      <br>秉持着“专业、省心、保障”的原则，让客户的知识产权真正获得价值。2019年，精心打造全球首款知识产权人工智能服务平台 ——“知依昇”。
      <br>告别传统知识产权业务模式，不断取得突破，引领知识产权时代新方向。</div>
      <div class="about-div3"></div>
      </div>
      <div class="about-thing">
        <div class="thing1">知昇大事记</div>
        <div class="thing2">
          <p class="thing2-p1">
            <span>-</span><span>2016年</span>
          </p>
          <p class="thing2-p2">成立智能硬件知识产权研究院</p>
          <p class="thing2-p1">
            <span>-</span><span>2017年</span>
          </p>
          <p class="thing2-p2">代表受邀参加长三角知识产权峰会</p>
          <p class="thing2-p1">
            <span>-</span><span>2018年5月</span>
          </p>
          <p class="thing2-p2">与多家知名企业成为长期合作伙伴。</p>
          <p class="thing2-p1">
            <span>-</span><span>2018年10月</span>
          </p>
          <p class="thing2-p2">服务对象公司超过5000家。</p>
          <p class="thing2-p1">
            <span>-</span><span>2019年5月</span>
          </p>
          <p class="thing2-p2">打造全球首款知识产权AI服务平台“知依昇”。</p>
          <p class="thing2-p1">
            <span>-</span><span>2019年9月</span>
          </p>
          <p class="thing2-p2">“知依昇”在各大平台成功上线，广受好评。</p>
        </div>
      </div>
      <div class="about-company">
        <p>企业大事记</p>
        <div></div>
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
  name: 'about',
  components: {
    Top,
    Foot,
    Fix
  },
  methods:{
  }
}

</script>

<style scoped>
.about-box{
  background-color: #fafafa;
  text-align: center;
}
  .about-box>img{
    width: 100%;
    height:100%;
  }
  .about-box>p{
   margin: 96px 0 48px;
   font-size: 48px;
   font-weight: 500;
   color: #111111;
  }
   .about-div{
     width: 1200px;
     height: 1255px;
     background-color: #ffffff;
     margin: 0 auto 48px;
    padding-top: 45px;
   }
   .about-div1{
     width: 512px;
     height: 56px;
     font-size: 32px;
     line-height: 1.75;
     margin: 0 auto 24px;
     color: #111111;
   }
  .about-div2{
    width: 1024px;
    height: 221px;
    margin: 0 auto 36px;
    font-size: 24px;
    font-weight: 100;
    line-height: 2;
    text-align: center;
    color: #111111;
  }
  .about-div3{
    width: 1024px;
    height: 854px;
    background: url('/static/images/aboutcomputer.png') no-repeat;
    background-size: cover;
    margin: 0 auto;
  }
  .about-thing{
    width: 1200px;
    height: 750px;
    background-color: white;
    padding-top: 48px;
    margin: 0 auto 48px;
  }
  .thing1{
    width: 160px;
    height: 56px;
    font-size: 32px;
    font-weight: 600;
    line-height: 1.75;
    text-align: center;
    color: #f96006;
    margin: 0 auto 32px;
  }
  .thing2-p1{
    margin-bottom: 12px;
    font-size: 24px;
    font-weight: 600;
  }
  .thing2-p1>span:nth-of-type(1){
    color: #999999;
  }
  .thing2-p1>span:nth-of-type(2){
    color: black;
  }
  .thing2-p2{
    margin-bottom: 32px;
    font-size: 20px;
    font-weight: 100;
    text-align: center;
    color: black;
  }
  .about-company{
    width: 1200px;
    height: 1010px;
    padding-top: 45px;
    background-color:white;
    margin: 0 auto;
  }
  .about-company>p{
    font-size: 32px;
    line-height: 1.75;
    color: #111111;
    margin-bottom: 36px;
  }
  .about-company>div{
    width: 1024px;
    height: 854px;
    margin: 0 auto;
    background: url('/static/images/aboutcomputer2.png') no-repeat;
    background-size: cover;
  }
</style>
