<template>
  <div class="eda">

    <!--顶部栏-->
    <top-bar></top-bar>
    <div class="bottom-bar">

      <!--左侧导航栏（含侧栏）-->
      <nav-bar></nav-bar>

      <!--右侧属性信息栏-->
      <nature-bar></nature-bar>

      <!--canvas中心绘制区-->
      <canvas-bar></canvas-bar>
    </div>

    <!--底部坐标栏-->
    <location-bar></location-bar>

    <input type="file" id="imageUpload" style="display:none">
  </div>
</template>

<script>
import TopBar from '../components/top-bar/TopBar';
import NavBar from '../components/nav-bar/NavBar';
import NatureBar from '../components/nature-bar/NatureBar';
import CanvasBar from '../components/canvas-bar/CanvasBar';
import LocationBar from '../components/location-bar/LocationBar';

export default {
  data () {
    return {}
  },

  components: {
    TopBar,
    NavBar,
    NatureBar,
    CanvasBar,
    LocationBar,
  },
}
</script>

<style scoped>
  .eda{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .bottom-bar{
    width: 100%;
    height: calc(100vh - 65px);
    position: relative;
    overflow: hidden;
  }
</style>
