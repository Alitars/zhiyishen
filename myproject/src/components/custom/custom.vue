<template>
  <div class="container">
    <Top></Top>
    <Foot></Foot>
  </div>
</template>

<script>
import Top from '../ui/top.vue';
import Foot from '../ui/foot.vue';
export default {
  name: 'custom',
  components: {
    Top,
    Foot
  }
}

</script>

<style>

</style>
