<template>
  <div class="canvas-bar">

    <div class="canvas-tabs">
      <el-tabs :value="curIdx" @tab-click="tabClick" type="card" closable @tab-remove="false">
        <el-tab-pane
            height="30px"
            v-for="(item) in tabList"
            :key="item.proId"
            :label="item.proName"
            :name="item.proId">
          {{item.content}}
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="canvas-bar-wrap" id="paint">

      <!--开始页-->
      <div class="greet-wrap" v-if="curIdx === 'index'">
        <div class="greet">
          <div class="greet-content">
            <h3>欢迎使用捷配EDA</h3>
            <p>方便、快捷、协同</p>
          </div>
        </div>
      </div>

      <div class="painting" v-if="curIdx !== 'index'">

        <!--上刻度尺-->
        <div class="ruler-top">
          <canvas id="ruler-x" ></canvas>
          <div class="ruler-needle r-n-t" id="ruler-topNd"></div>
        </div>

        <!--左刻度尺-->
        <div class="ruler-left">
          <canvas id="ruler-y"></canvas>
          <div class="ruler-needle r-n-l" id="ruler-leftNd"></div>
        </div>

        <div class="editor-view" id="editor">

          <!--辅助线-->
          <div class="editor-cross" id="cross-bar">
            <div class="editor-cross-x" id="cross-x"></div>
            <div class="editor-cross-y" id="cross-y"></div>
          </div>

          <!--绘图区域-->
          <svg v-for="editor of editorList" :key="editor.proId" v-show="curIdx === editor.proId" :class="'svg-box unSelected ' + editor.type" :id="editor.proId" xmlns="http://www.w3.org/2000/svg" :style="'background:' + editor.msg.attrs['background-color']">

            <!--网格线标尺-->
            <g name="grid">
              <defs name="patterns" ref="patterns">
                <pattern :id="'gridPattern_tmp' + editor.idx" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
                  <rect :id="'gridPointCell' + editor.idx" x="0" y="0" width="1" height="1" :fill="editor.msg.attrs['grid-color']" stroke="none" fill-opacity="0.8"></rect>
                </pattern>

                <pattern name="gridSolidCellPattern" :id="'gridPattern' + editor.idx" patternUnits="userSpaceOnUse" x="0" y="0" width="10" height="10">
                  <path name="gridSolidCell" :id="'gridSolidCell' + editor.idx" ref="gridSolidCell" fill="none" :stroke="editor.msg.attrs['grid-color']" stroke-width="2" stroke-opacity="0.6" d="M10 0V10H-10"></path>
                </pattern>
              </defs>
              <rect :id="'grid' + editor.idx" v-show="editor.msg.attrs['show-grid'] == 1" pointer-events="none" x="0" y="0" width="959.2592592592592" height="1511.111111111111" :fill="editor.msg.attrs['grid-type'] == '1' ? 'url(#gridPattern'+ editor.idx +')' : 'url(#gridPattern_tmp'+ editor.idx +')'" fill-opacity="0.8" stroke="none" shape-rendering="crispEdges"></rect>
              <line name="gridAxisX" :id="'gridAxisX' + editor.idx" ref="gridAxisX" pointer-events="none" stroke="#000000" stroke-width="1" stroke-opacity=".8"></line>
              <line name="gridAxisY" :id="'gridAxisY' + editor.idx" ref="gridAxisY" pointer-events="none" stroke="#000000" stroke-width="1" stroke-opacity=".8"></line>
            </g>

            <!--永续区-->
            <g name="sustain">
              <render-svg v-for="elem in editor.sElems" :elem="elem" :zoom="zoom" :key="elem.id"></render-svg>
            </g>

            <!--临时区-->
            <g name="temporary">
              <render-svg v-for="elem in editor.tElems" :elem="elem" :zoom="zoom" :key="elem.id"></render-svg>
              <rect :id="'selectBox' + editor.idx" fill="none" :stroke="editor.type.indexOf('sch') > -1 ? '#0000FF' : '#ffffff'" stroke-width="1" vector-effect="non-scaling-stroke" shape-rendering="crispEdges" pointer-events="none" display="none"></rect>
            </g>

            <g id="jkk"></g>

          </svg>

        </div>

      </div>

      <section>

      </section>

    </div>
  </div>
</template>

<script>
import RenderSvg from '@/engine/render/render-svg';
import Engine from '../../../engine/engine';

export default {
  data () {
    return {
      editorList: [],
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
        content: ''
      }, {
        title: 'Tab 2',
        name: '2',
        content: ''
      }],
      tabIndex: 2,
      timer: null,
    }
  },

  components: {
    RenderSvg,
  },

  methods: {
    tabClick (tab) {
      const engine = this.$store.getters.getEngine;

      engine.cutEditor(tab.name);
    },
    alterEmit () {
      clearTimeout(this.timer);

      this.timer = setTimeout(() => {
        const editor = this.$store.getters.getCH;
        editor.outline.drawElem();
      }, 10);
    },
  },

  computed: {
    sElems () {
      return this.$store.getters.getCH ? this.$store.getters.getCH.sElems : [];
    },
    tElems () {
      return this.$store.getters.getTElems;
    },
    zoom () {
      return this.$store.getters.getCMsg.zm;
    },
    curIdx () {
      const engine = this.$store.getters.getEngine;

      if (engine) {
        return engine.curIdx;
      } else {
        return 'index';
      }
    },
    tabList () {
      const engine = this.$store.getters.getEngine;
      const rel = [{ proName: '开始页', proId: 'index' }];

      if (engine) {
        rel.push(...engine.editorList);
      }

      return rel;
    },
  },

  watch: {
    sElems: {
      handler () {
        this.alterEmit();
      },
      deep: true,
    }
  },

  mounted () {
    const editors = new Engine();

    this.editorList = editors.editorList;
    this.$store.dispatch('setEngine', editors);
  },
}
</script>

<style scoped>
  .greet-content{
    margin-left: 15%;
    text-align: center;
    color: #333;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
  }
  .greet-content > h3{
    font-size: 30px;
  }
  .greet-content > p{
    font-size: 22px;
    margin-top: 20px;
  }
  .greet{
    width: 100%;
    height: 100%;
    background: url("../../../assets/images/jp-bg.png") no-repeat center center;
    background-color: #fff;
    background-size: cover;
    position: relative;
  }
  .greet-wrap{
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 25px;
    background: #F0F0F0;
  }
  .svg-box{
    padding: 0 !important;
    position: relative;
    overflow: hidden!important;
    line-height: 30px !important;
    text-align: center;
    width: 100%;
    height: 100%;
    display: block;
    background: #FFFCF8;
  }
  .ruler-top{
    position: absolute;
    left: 0;
    top: -25px;
    right: 0;
    width: 100%;
    height: 25px;
    background: #F0F0F0;
    /*padding-left: 25px;*/
    overflow: hidden;
  }
  .ruler-left{
    position: absolute;
    left: -25px;
    top: 0;
    bottom: 0;
    width: 25px;
    height: 100%;
    /*padding-top: 25px;*/
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
  .editor-view svg{
    z-index: 9;
  }
  .editor-cross{
    display: none;
    pointer-events: none;
    /*position: relative;*/

  }
  .editor-cross-x{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 1px;
    border-top: 1px dashed #f90;
    z-index: 10;
  }
  .editor-cross-y{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 1px;
    border-right: 1px dashed #f90;
    z-index: 10;
  }
  .canvas-bar {
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .canvas-bar-wrap{
    background: #f0f0f0;
    overflow: hidden;
    height: calc(100% - 30px);
    display: block;
    position: relative;
  }
  .painting{
    margin: 25px 0 0 25px;
    height: calc(100vh - 120px);
    display: block;
    position: relative;
  }
  .canvas-tabs{
    height: 30px;
    overflow: hidden;
  }
  .ruler-needle{
    position: absolute;
  }
  .r-n-t{
    position: absolute;
    width: 1px;
    height: 18px;
    left: 0;
    bottom: 0;
    background: #06c;
  }
  .r-n-l{
    position: absolute;
    width: 18px;
    height: 1px;
    background: #06c;
    right: 0;
    top: 0;
  }
</style>
