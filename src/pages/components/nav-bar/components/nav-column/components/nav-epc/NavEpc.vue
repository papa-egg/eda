<template>
  <div class="nav-epc">
    <div class="epc-search-bar">
      <i class="iconfont icon-sousuo"></i>
      <el-input type="text" v-model="searchName" placeholder="工程搜索"></el-input>
    </div>

    <el-scrollbar style="height: calc(100vh - 50px)">
      <div class="epc-tree">
          <el-tree :data="userList" :props="defaultProps" @node-click="treeNodeClick" :default-expand-all="true">
            <span :class="data.id === curTreeId ? 'tree-node cur' : 'tree-node'" slot-scope="{ node, data }">
              <i v-if="data.type==='2'" class="iconfont icon-wenjianjia epi-1 epi"></i>
              <i v-if="data.type==='3'" class="iconfont icon-wendang epi-2 epi"></i>
              <i v-if="data.type==='4'" class="iconfont icon-yuanqijian1 epi-3 epi"></i>
              <span @click="openProject(node.data.id)">{{ node.label }}</span>
            </span>
          </el-tree>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchName: '',
      defaultProps: {
        children: 'children',
        label: 'label',
        id: 'id',
      },
      curTreeId: '',
    }
  },

  computed: {
    userList () {
      return this.$store.getters.getUserList;
    }
  },

  methods: {
    openProject (id) {
      const engine = this.$store.getters.getEngine;

      console.log(id);

      engine.openDoc(id);
    },
    treeNodeClick (node) {
      if (node.id) {
        this.curTreeId = node.id;
      }
    },
  }
}
</script>

<style scoped>
  .nav-epc{
    margin-top: 10px;
  }
  .epi{
    margin-right: 2px;
    width: 16px;
    text-align: center;
    display: inline-block;
  }
  .epi-3{
    font-size: 12px;
    position: relative;
  }
</style>
