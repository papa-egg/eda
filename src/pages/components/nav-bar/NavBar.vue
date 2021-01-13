<template>
  <div class="nav-bar">

    <!--左侧导航条-->
    <nav-menu></nav-menu>

    <!--导航侧栏-->
    <nav-column></nav-column>
  </div>
</template>

<script>
import NavMenu from './components/nav-menu/NavMenu';
import NavColumn from './components/nav-column/NavColumn';

export default {
  data () {
    return {}
  },

  components: {
    NavMenu,
    NavColumn,
  }
}
</script>

<style scoped>
  .nav-bar{
    float: left;
    height: 100%;
    overflow: hidden;
    display: flex;
  }
</style>
