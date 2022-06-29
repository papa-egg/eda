<template>
  <div class="nature-bar" v-if="nList.length > 0">
    <div class="nature-bar-wrap">
      <el-scrollbar style="height: 100%">
        <section class="nature-bar-list">
          <el-collapse v-model="activeName">
            <el-collapse-item :title="nItem.title" name="1" v-for="(nItem, nIdx) in nList" :key="nIdx">
              <ul class="nature-list">

                <template v-for="(item, idx) in nItem.list" >
                  <li :name="item"  v-if="!item.vHide" :key="nIdx + '_' + idx">
                    <div class="n-l-left">{{ item.name }}</div>

                    <div class="n-l-right" v-if="item.type === 'color'">
                      <el-color-picker v-model="item.model" size="mini"></el-color-picker>
                      <span style="margin-left: 5px">{{ item.model }}</span>
                    </div>

                    <div class="n-l-right" v-if="item.type === 'select'">
                      <el-select v-model="item.model" placeholder="请选择" size="mini">
                        <el-option
                          v-for="opt in item.options"
                          :key="opt.value"
                          :label="opt.label"
                          :value="opt.value">
                        </el-option>
                      </el-select>
                    </div>

                    <div class="n-l-right" v-if="item.type === 'number'">
                      <el-input type="number" placeholder="请输入内容" size="mini" v-model="item.model"></el-input>
                    </div>

                    <div class="n-l-right" v-if="item.type === 'text'">
                      <el-input type="text" placeholder="请输入内容" size="mini" v-model="item.model"></el-input>
                    </div>
                  </li>

                </template>

              </ul>
            </el-collapse-item>
          </el-collapse>
        </section>

      </el-scrollbar>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: '1',
      nList: [],
    }
  },

  computed: {
    natureList () {
      return this.$store.getters.getNatureList || [];
    },
    natureStatus () {
      return this.$store.getters.getNatureStatus;
    }
  },

  watch: {
    natureList: {
      handler () {
        this.nList = this.natureList;
      }
    },
    natureStatus: {
      handler () {
        this.nList = [];
        this.nList = this.natureList;
      },
    },
  }
}
</script>

<style scoped>
  .nature-bar{
    float: right;
    width: 220px;
    height: 100%;
    background: #fff;
    position: relative;
  }
  .nature-bar-wrap{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .nature-list{
    padding: 0 10px;
  }
  .nature-list > li{
    display: flex;
    line-height: 40px;
    height: 40px;
  }
  .n-l-left{
    width: 42%;
    height: 100%;
    padding-right: 10px;
  }
  .n-l-right{
    width: 58%;
    display: flex;
    align-items: center;
  }
</style>
