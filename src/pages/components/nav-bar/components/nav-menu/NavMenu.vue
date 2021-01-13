<template>
  <div class="nav-menu">
    <ul class="nav-menu-list">
      <li @click="swicthNav('1')" :class="curNav === '1' ? 'cur' : ''"><span><i class="iconfont icon-allicon-18"></i></span></li>
      <li @click="swicthNav('2')" :class="curNav === '2' ? 'cur' : ''"><span><i class="iconfont icon-pcbshejil"></i></span></li>
      <li @click="swicthNav('3')" :class="curNav === '3' ? 'cur' : ''"><span><i class="iconfont icon-chanpinku"></i></span></li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navList: ['1', '2', '3'],
      curNav: '1',
    }
  },

  methods: {
    swicthNav (type) {
      this.curNav = type;

      this.$store.dispatch('setNavId', type);
    }
  },
}
</script>

<style scoped>
  .nav-menu{
    width: 60px;
    height: 100%;
    background: #ECF0F5;
  }
  .nav-menu-list{
    margin-top: 20px;
  }
  .nav-menu-list > li{
    width: 60px;
    height: 60px;
    position: relative;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .nav-menu-list > li span{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: #fff;
    overflow: hidden;
  }
  .nav-menu-list > li span i{
    width: 100%;
    height: 100%;
    display: block;
    line-height: 40px;
    text-align: center;
    font-size: 18px;
  }
  .nav-menu-list > li.cur span{
    background: #FF9900;
  }
  .nav-menu-list > li.cur span i{
    color: #ffffff;
  }
</style>
