<template>
  <div class="top-bar">
    <ul class="ulist">
      <li @click="setMotifChartlet('sch_Line')">线</li>
      <li @click="setMotifChartlet('sch_Rect')">矩形</li>
      <li @click="setMotifChartlet('sch_Ellipse')">椭圆</li>
      <li @click="setMotifChartlet('sch_Elliptic')">椭圆弧</li>
      <li @click="setMotifChartlet('sch_Polygon')">多边形</li>
      <li @click="setMotifChartlet('sch_Bessel')">贝塞尔曲线</li>
      <li @click="setMotifChartlet('sch_Text')">文字</li>
      <li @click="setMotifChartlet('sch_Pin')">管脚</li>
      <!--<li @click="uploadImage()">图片</li>-->
      <!--<li @click="setMotifChartlet('sch_Image')">图片</li>-->
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },

  methods: {
    setMotifChartlet (type) {
      const CH = this.$store.getters.getCH;
      CH.painter.setChartlet(type);
    },
    async uploadImage () {
      document.getElementById('uploadImage').click();
    },
  }
}
</script>

<style scoped>
  .top-bar{
    height: 40px;
    z-index: 99;
    background: #7B5822;
    padding: 0 20px;
  }
  .ulist{}
  .ulist > li{
    float: left;
    cursor: pointer;
    margin: 0 10px;
    line-height: 40px;
  }
</style>
