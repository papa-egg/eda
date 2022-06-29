<template>
  <ul class="location-bar">
    <li>X:<span>{{ cMsg.cx }}</span>mil</li>
    <li>Y:<span>{{ cMsg.cy }}</span>mil</li>
    <li>Grid:<span>{{ cMsg.gd }}</span>mil</li>
    <li>Zoom:<span>{{ cMsg.zm | toPercent }}</span></li>
  </ul>
</template>

<script>
export default {
  data() {
    return {}
  },

  computed: {
    cMsg () {
      return this.$store.getters.getCMsg;
    },
  },

  filters: {
    toPercent(point) {
      if (Number(point) >= 1) return Number(point) * 100 + '%';

      let str = Number(point * 100).toFixed(0);
      str += "%";

      return str;
    }
  },
}
</script>

<style scoped>
  .location-bar{
    border-top: 1px solid #E8E8E8;
    padding: 0 10px;
    line-height: 24px;
    display: flex;
    align-items: center;
  }
  .location-bar > li{
    font-size: 12px;
    font-family: monospace;
    margin-right: 10px;
  }
  .location-bar > li:nth-child(2) {
    margin-right: 25px;
  }
  .location-bar > li:nth-child(3) {
    margin-right: 20px;
  }
</style>
