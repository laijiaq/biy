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
    const user = localStorage.getItem('user');
    console.log(user);
    if (!user) {
      this.$router.push('/login');
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/index.scss";
</style>
