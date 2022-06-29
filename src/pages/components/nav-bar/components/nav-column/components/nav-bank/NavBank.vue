<template>
  <div class="nav-back">
    <div class="epc-search-bar">
      <i class="iconfont icon-sousuo"></i>
      <el-input type="text" v-model="searchName" placeholder="库搜索"></el-input>
    </div>

    <div class="epc-list">
      <div class="epc-list-wrap">
        <ul class="epc-list-head">
          <li>元件名</li>
          <li>封装</li>
        </ul>
        <el-scrollbar style="height: 100%; overflow-x: hidden">

          <div class="epc-table unSelected">
            <el-table
              :data="epcList"
              style="width: 100%"
              @cell-click="switchEpc">
              <el-table-column
                label="元件名">
                <template slot-scope="scope">
                  <span>{{ scope.row.name | filterUnknowName }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="des"
                label="封装">
              </el-table-column>
            </el-table>
          </div>

          <div class="epc-load-more">
            <button><span>加载更多</span></button>
          </div>

        </el-scrollbar>
      </div>
    </div>

    <!--缩略图预览-->
    <thumb-view :epcId="epcId"></thumb-view>
  </div>
</template>

<script>
import librarys from '@/engine/library/library';
import ThumbView from './components/thumb-view/ThumbView';

export default {
  data () {
    return {
      searchName: '',
      epcList: [],
      epcId: '',
      jyy: 111,
      self: this,
    }
  },

  components: {
    ThumbView
  },

  mounted () {
    this.epcList = librarys;
  },

  methods: {
    switchEpc (elem) {
      this.epcId = elem.id;

      const CH = window.$vue.$store.getters.getCH;
      CH.bank.checklibrarys(elem.id, elem.name);
      CH.painter.setChartlet('sch_Bank');
    }
  },

  filters: {
    filterUnknowName (name) {
      if (!name) {
        return '未知元素';
      } else {
        return name;
      }
    }
  }
}
</script>

<style scoped>
  .nav-back{
    margin-top: 10px;
    display: flex;
    flex-direction:column;
    position: relative;
    height: calc(100vh - 50px);
  }
  .epc-list{
    flex: 1;
    position: relative;
    margin: 15px 10px 20px;
    font-size: 13px;
  }
  .epc-list-wrap{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
  }
  .epc-table{
    width: 100%;
    overflow-x: hidden;
    scroll: auto;
    margin-bottom: 5px;
    position: relative;
  }
  .epc-list-head{
    display: flex;
    background: #E9E9F0;
  }
  .epc-list-head > li{
    width: 50%;
    padding: 10px 10px;
    font-size: 13px;
  }
  .epc-load-more{
    text-align: center;
    font-size: 12px;
    margin: 10px 0;
  }
  .epc-load-more button{
    font-size: 12px;
    color: #ff9900;
    border-color: #ff9900;
    padding: 5px 12px;
    background: #fff;
    border-radius: 5px;
    cursor: pointer;
  }
  .epc-load-more button:hover {
    background: #FFF7EC;
  }
</style>
