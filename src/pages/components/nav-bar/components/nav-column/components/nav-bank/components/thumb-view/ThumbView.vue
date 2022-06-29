<template>
  <div class="epc-preview">
    <el-collapse v-model="modelName">
      <el-collapse-item title="模型" name="1">
        <ul class="epc-preview-list">
          <li>
            <svg class="unSelected" xmlns="http://www.w3.org/2000/svg" width="85" height="85">
              <g>
                <render-svg v-for="elem in elems" :elem="elem" :key="elem.id"></render-svg>
              </g>
            </svg>
          </li>
          <li></li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import librarys from '@/engine/library/library';
import RenderSvg from '@/engine/render/render-svg';

export default {
  data () {
    return {
      modelName: ['1'],
      elems: [],
    }
  },

  props: {
    epcId: {
      default: '',
    },
  },

  components: {
    RenderSvg,
  },

  watch: {
    epcId (epcId) {
      this.modelName = ['1'];
      this.renderView(epcId);
    }
  },

  methods: {
    renderView (epcId) {
      const curElem = this.getEpcElem(epcId);

      this.elems.pop();
      this.elems.push(curElem);
    },
    getEpcElem (epcId) {
      for (let elem of librarys) {
        if (elem.id === epcId) {
          return elem;
        }
      }

      return {};
    }
  }
}
</script>

<style scoped>
  .epc-preview{
    padding: 10px;
    margin-top: 10px;
  }
  .epc-preview-list{
    display: flex;
    justify-content: space-between;
  }
  .epc-preview-list > li{
    width: 85px;
    height: 85px;
    border: 1px solid #ECECEC;
  }
  .epc-preview-list > li svg{
    width: 100%;
    height: 100%;
    background: rgb(255, 252, 248);
  }
</style>
