<template>
  <div id="app">
    <keep-alive>
      <router-view :key="$route.fullPath"></router-view>
    </keep-alive>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {},
  created() {
    this.$store.dispatch("INIT_STATE");
  }
}
</script>

<style>
#app {  
  max-width: 1100px;
  min-height: 200px;
  margin: 0 auto;
  padding: 20px 40px 30px;
  box-sizing: border-box;  
  border-radius: 10px;
  background-color: #ffffff;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

@media (max-width: 599px) {
  #app {
    border-radius: 0;
    padding: 20px 20px 30px;
  }  
}
</style>
