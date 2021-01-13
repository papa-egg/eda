<template>
  <div class="nature-bar">
    <div class="nature-bar-wrap">
      <el-scrollbar style="height: 100%">
        <section class="nature-bar-list">
          <el-collapse v-model="activeName">
            <el-collapse-item title="画布" name="1">
              <ul class="nature-list">
                <li>
                  <div class="n-l-left">背景色</div>
                  <div class="n-l-right">
                    <el-color-picker v-model="color" size="mini"></el-color-picker>
                    <span style="margin-left: 5px">#409EFF</span>
                  </div>
                </li>
                <li>
                  <div class="n-l-left">网络可见</div>
                  <div class="n-l-right">
                    <el-select v-model="value" placeholder="请选择" size="mini">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </li>
                <li>
                  <div class="n-l-left">网络大小</div>
                  <div class="n-l-right">
                    <el-input placeholder="请输入内容" size="mini"></el-input>
                  </div>
                </li>
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
      color: '#409EFF',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
    }
  },
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
