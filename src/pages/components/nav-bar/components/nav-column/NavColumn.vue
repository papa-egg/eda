<template>
  <div class="nav-column">
    <el-tabs v-model="curNavId">
      <el-tab-pane name="1">

        <!--工程索引-->
        <nav-epc></nav-epc>
      </el-tab-pane>
      <el-tab-pane name="2">

        <!--元件针脚导航标记-->
        <nav-coord></nav-coord>
      </el-tab-pane>
      <el-tab-pane name="3">

        <!--元件库-->
        <nav-bank></nav-bank>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import NavEpc from './components/nav-epc/NavEpc';
import NavCoord from './components/nav-coord/NavCoord';
import NavBank from './components/nav-bank/NavBank';

export default {
  data () {
    return {
      navList: ['1', '2', '3'],
      curNavId: '1',
    }
  },

  components: {
    NavEpc,
    NavCoord,
    NavBank,
  },

  computed: {
    navId () {
      return this.$store.getters.getNavId;
    }
  },

  watch: {
    navId (navId) {
      this.curNavId = navId;
    }
  },
}
</script>

<style scoped>
  .nav-column{
    width: 200px;
    height: 100%;
  }
</style>
