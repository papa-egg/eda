<template>
  <div class="canvas-bar">
    <div class="canvas-bar-wrap">
      <div class="canvas-tabs">
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="false">
          <el-tab-pane
              height="30px"
              v-for="(item) in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name">
            {{item.content}}
          </el-tab-pane>
        </el-tabs>
      </div>

      <div class="ruler-top">
        <canvas id="ruler-x" ></canvas>
        <div class="ruler-needle r-n-t" id="ruler-topNd"></div>
      </div>

      <div class="ruler-left">
        <canvas id="ruler-y"></canvas>
        <div class="ruler-needle r-n-l" id="ruler-leftNd"></div>
      </div>
      <div class="editor-view" id="editor">

        <!--绘图区域-->
        <svg class="svg-box unSelected" id="draw" xmlns="http://www.w3.org/2000/svg">

          <!--网格线标尺-->
          <g name="grid">
            <defs name="patterns" ref="patterns">
              <pattern name="gridSolidCellPattern" ref="gridSolidCellPattern" id="gridPattern"
                patternUnits="userSpaceOnUse" x="1" y="1" width="10" height="10">
                <path name="gridSolidCell" id="gridSolidCell" ref="gridSolidCell" fill="none" stroke="#CCCCCC" stroke-width="1.85186"
                  stroke-opacity="0.6" d="M10 0V10H-10"></path>
              </pattern>
            </defs>
            <rect id="grid" pointer-events="none" x="0" y="0" width="959.2592592592592" height="1511.111111111111" fill="url(#gridPattern)" fill-opacity="0.8" stroke="none" shape-rendering="crispEdges"></rect>
            <line name="gridAxisX" id="gridAxisX" ref="gridAxisX" pointer-events="none" stroke="#000000" stroke-width="1" stroke-opacity=".8"></line>
            <line name="gridAxisY" id="gridAxisY" ref="gridAxisY" pointer-events="none" stroke="#000000" stroke-width="1" stroke-opacity=".8"></line>
          </g>

          <!--永续区-->
          <g name="sustain">
            <render-svg v-for="elem in sElems" :elem="elem" :zoom="zoom" :key="elem.id"></render-svg>
          </g>

          <!--临时区-->
          <g name="temporary">
            <render-svg v-for="elem in tElems" :elem="elem" :zoom="zoom" :key="elem.id"></render-svg>
          </g>
        </svg>

        <!--辅助线-->
        <div class="editor-cross" id="cross-bar">
          <div class="editor-cross-x" id="cross-x"></div>
          <div class="editor-cross-y" id="cross-y"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { InitEditor } from '@/engine/init-editor';
import RenderSvg from '@/engine/render/render-svg';

export default {
  data () {
    return {
      tpElems: [],
      vx: 0,
      vy: 0,
      vw: 0,
      vh: 0,
      scale: 1,
      params: {
        vx: 0,
        vy: 0,
        vw: 0,
        vh: 0,
      },
      editableTabsValue: '2',
      editableTabs: [{
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content'
      }, {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content'
      }],
      tabIndex: 2,
    }
  },

  components: {
    RenderSvg,
  },

  computed: {
    sElems () {
      return this.$store.getters.getSElems;
    },
    tElems () {
      return this.$store.getters.getTElems;
    },
    zoom () {
      return this.$store.getters.getCMsg.zm;
    }
  },

  mounted () {
    const CH = new InitEditor();

    window.$vue.$store.dispatch('setCH', CH);

    CH.mouse.bindEvent();
    CH.mouse.setViewBox();
  },
}
</script>

<style scoped>
  .svg-box{
    padding: 0 !important;
    position: relative;
    overflow: hidden!important;
    line-height: 30px !important;
    text-align: center;
  }
  .ruler-top{
    position: absolute;
    left: 0;
    top: 30px;
    right: 0;
    width: 100%;
    height: 25px;
    background: #F0F0F0;
    padding-left: 25px;
    overflow: hidden;
  }
  .ruler-left{
    position: absolute;
    left: 0;
    top: 30px;
    bottom: 0;
    width: 25px;
    height: 100%;
    padding-top: 25px;
    background: #F0F0F0;
    overflow: hidden;
  }
  #ruler-top{
    width: 100%;
    height: 100%;
  }
  #ruler-left{
    width: 100%;
    height: 100%;
  }
  .editor-view{
    width: 100%;
    height: 100%;
    display: block;
    position: relative;
  }
  .editor-cross{
    display: none;
  }
  .editor-cross-x{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 1px;
    border-top: 1px dashed #f90;;
  }
  .editor-cross-y{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 1px;
    border-right: 1px dashed #f90;;
  }
  #draw{
    width: 100%;
    height: 100%;
    display: block;
    background: #FFFCF8;
  }
  .canvas-bar {
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .canvas-bar-wrap{
    padding: 55px 0 0 25px;
    overflow: hidden;
    height: 100%;
    display: block;
    position: relative;
  }
  .canvas-tabs{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 30px;
  }
  .ruler-needle{
    position: absolute;
  }
  .r-n-t{
    position: absolute;
    width: 1px;
    height: 18px;
    left: 25px;
    bottom: 0;
    background: #06c;
  }
  .r-n-l{
    position: absolute;
    width: 18px;
    height: 1px;
    background: #06c;
    right: 0;
    top: 25px;
  }
</style>
