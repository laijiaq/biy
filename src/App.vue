<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>

export default {
  data() {
    return {

    }
  },
  created() {
    if(this.$store.state.loginSdate){
      this.$router.push({
        path: '/home'
      })
    }else{
      this.$router.push({
        path: '/login'
      })
    }
      
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/index.scss";
</style>
