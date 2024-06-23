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
    console.log( this.$store.state.loginSdate);
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/index.scss";
</style>
