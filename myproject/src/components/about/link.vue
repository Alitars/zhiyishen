<template>
  <div class="link">
    <Top></Top>
    <Fix></Fix>
    <div class="link-box">
      <img src="/static/images/abouttop.png" alt="">
      <div>
          <p>联系我们</p>
          <div>
            <p>上海市松江区文诚路358弄6号嘉和商务中心507室</p>
            <p>400-630-2718（ 周一至周日 9:30 - 19:00 ）</p>
            <p>客服邮箱：ayiusper@zhishengai.com</p>
            <p>商务合作：business@zhishengai.com</p>
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
  name: 'about',
  components: {
    Top,
    Foot,
    Fix
  }
}

</script>

<style scoped>
    .link-box>img{
        width: 100%;
        height: 100%;
    }
    .link-box>div{
        padding-top: 96px;
        width: 100%;
        height: 403px;
        background-color: #fafafa;
        text-align: center;
    }
    .link-box>div>p{
        font-size: 48px;
        font-weight: 500;
        color: #111111;
        margin-bottom: 48px;
    }
    .link-box>div>div{
        width: 1200px;
        height: 176px;
        margin: 0 auto;
        padding-top: 48px;
        background-color: #ffffff;
    }
    .link-box>div>div>p{
        font-size: 14px;
        color: #111111;
        margin-bottom: 16px;
    }
</style>
