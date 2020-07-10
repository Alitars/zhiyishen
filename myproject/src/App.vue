<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  mounted () {
    const script = document.createElement('script')
    script.src = 'https://v1.cnzz.com/z_stat.php?id=1278183105&web_id=1278183105'
    script.language = 'JavaScript'
    document.body.appendChild(script)
  },
  watch: {
    '$route' () {
      if (window._czc) {
        let location = window.location
        let contentUrl = location.pathname + location.hash
        let refererUrl = '/'
        window._czc.push(['_trackPageview', contentUrl, refererUrl])
      }
    }
  }
}

</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  img{
    border:none;
  }
  ul {
    padding: 0;
    list-style: none;
  }
</style>
