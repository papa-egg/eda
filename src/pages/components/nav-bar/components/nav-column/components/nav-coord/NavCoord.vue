<template>
  <div class="nav-coord">
    <div class="epc-search-bar">
      <i class="iconfont icon-sousuo"></i>
      <el-input type="text" v-model="searchName" placeholder="元件检索"></el-input>
    </div>

    <el-scrollbar style="height: calc(100vh - 50px)">
      <div class="epc-tree">
        <el-tree :data="cellTree" :props="defaultProps" @node-click="treeNodeClick" :default-expand-all="true">
            <span class="tree-node" slot-scope="{ node }">
              <span>{{ node.label }}</span>
            </span>
        </el-tree>

        <el-tree :data="netTree" :props="defaultProps" @node-click="treeNodeClick" :default-expand-all="true">
            <span class="tree-node" slot-scope="{ node }">
              <span>{{ node.label }}</span>
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
        label: 'label',
        id: 'id',
      },
      cellTree: [
        {
          label: '元件',
          type: '1',
          children: [
            {
              label: 'U1',
              type: '2',
              id: '1',
            },
            {
              label: 'U2',
              type: '2',
              id: '2',
            },
            {
              label: 'D1',
              type: '2',
              id: '3',
            },
            {
              label: 'D2',
              type: '2',
              id: '4',
            },
          ],
        },
      ],
      netTree: [
        {
          label: '网络',
          type: '1',
          children: [
            {
              label: 'U1',
              type: '2',
              id: '1',
            },
            {
              label: 'U2',
              type: '2',
              id: '2',
            },
            {
              label: 'D1',
              type: '2',
              id: '3',
            },
            {
              label: 'D2',
              type: '2',
              id: '4',
            },
          ],
        },
      ],
    }
  },

  methods: {
    treeNodeClick (node) {
      if (node.id) {
        // this.curTreeId = node.id;
      }
    },
  }
}
</script>

<style scoped>
  .nav-coord{
    margin-top: 10px;
  }
</style>
