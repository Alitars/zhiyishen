<template>
  <div class="agencyimg">
    <Top></Top>
    <Fix></Fix>
    <div class="agencyimg-box">
      <img src="/static/images/agencyimg.png" alt="">
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Top from '../ui/top.vue';
import Foot from '../ui/foot.vue';
import Fix from '../ui/fix.vue';
export default {
  name: 'agencyimg',
  components: {
    Top,
    Foot,
    Fix
  }
}

</script>

<style scoped>
     .agencyimg-box{
    	 display: flex;
     	 justify-content: center;
       align-items: center;
       width: 100%;
       height: 100%;
       margin-bottom: 80px;
      }
   .agencyimg-box>img {
    	width:auto;
        height:auto;
        max-width:100%;
        max-height:100%;
		}
</style>
