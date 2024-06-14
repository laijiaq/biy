<template>
  <div id="app">
    <Header></Header>
    <Layout>
      <router-view/>
    </Layout>

  </div>
</template>
<script>
import Layout from "./components/layout";
import Header from "./components/header"
export default {
  data(){
     return {

     }
  },
  components: {
    Layout,
    Header
  }
}
</script>

<style lang="scss">
    @import "@/assets/scss/index.scss";


</style>
