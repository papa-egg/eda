<template>
  <div class="eda">

    <!--顶部栏-->
    <top-bar></top-bar>

    <div class="bottom-bar">

      <!--左侧导航栏（含侧栏）-->
      <nav-bar></nav-bar>

      <!--右侧属性信息栏-->
      <nature-bar></nature-bar>

      <!--canvas中心绘制区-->
      <canvas-bar></canvas-bar>
    </div>

    <!--底部坐标栏-->
    <location-bar></location-bar>

    <input type="file" id="imageUpload" style="display:none">
    <svg style="position:absolute; display: none; visibility:hidden;"><path id="pathForArea" d=""></path></svg>
  </div>
</template>

<script>
import TopBar from '../components/top-bar/TopBar';
import NavBar from '../components/nav-bar/NavBar';
import NatureBar from '../components/nature-bar/NatureBar';
import CanvasBar from '../components/canvas-bar/CanvasBar';
import LocationBar from '../components/location-bar/LocationBar';

import userImg from '@/assets/images/sunshine-user.jpg';

export default {
  data () {
    return {}
  },

  components: {
    TopBar,
    NavBar,
    NatureBar,
    CanvasBar,
    LocationBar,
  },

  created () {
    this.getUserMsg();
  },

  methods: {
    async getUserMsg () {
      // const userMsg = await this.$ajax('/get-user-msg');

      const userMsg = {
        userName: 'SunShine',
        avatar: userImg,
        userId: '11817547185481',
        fileList: [
          {
            label: '导线避让',
            id: '999',
            type: '1',
            children: [
              {
                type: '4',
                id: '999-1',
                label: '导线避让',
              },
            ]
          },
          {
            label: 'BASIC',
            id: '111',
            type: '2',
            children: [
              {
                type: '3',
                id: '111-1',
                label: '圆弧',
              },
              {
                type: '3',
                id: '111-2',
                label: '圆',
              },
              {
                type: '3',
                id: '111-3',
                label: '线条',
              },
              {
                type: '3',
                id: '111-4',
                label: '贝塞尔曲线',
              },
              {
                type: '3',
                id: '111-5',
                label: '矩形',
              },
              {
                type: '3',
                id: '111-6',
                label: '多边形',
              },
              {
                type: '3',
                id: '111-7',
                label: '椭圆',
              },
            ],
          },
          {
            label: 'SCH',
            id: '222',
            type: '2',
            children: [
              {
                type: '3',
                id: '222-1',
                label: '导线',
              },
              {
                type: '3',
                id: '222-2',
                label: 'VCC电源端孔',
              },
              {
                type: '3',
                id: '222-3',
                label: 'GND电源端孔',
              },
              {
                type: '3',
                id: '222-4',
                label: '总线',
              },
              {
                type: '3',
                id: '222-5',
                label: '总线入口',
              },
              {
                type: '3',
                id: '222-6',
                label: '网络标签',
              },
              {
                type: '3',
                id: '222-7',
                label: '网络端口',
              },
              {
                type: '3',
                id: '222-8',
                label: '非连接标志',
              },
              {
                type: '3',
                id: '222-9',
                label: '电压探针',
              },
              {
                type: '3',
                id: '222-10',
                label: '文本',
              },
              {
                type: '3',
                id: '222-11',
                label: '管脚',
              },
            ],
          },
          {
            label: 'PCB',
            id: '333',
            type: '2',
            children: [
              {
                type: '4',
                id: '333-1',
                label: '导线',
              },
              {
                type: '4',
                id: '333-2',
                label: '焊盘',
              },
              {
                type: '4',
                id: '333-3',
                label: '过孔',
              },
              {
                type: '4',
                id: '333-4',
                label: '通孔',
              },
              {
                type: '4',
                id: '333-5',
                label: '多边形区域',
              },
              {
                type: '4',
                id: '333-6',
                label: '文本',
              },
            ],
          },
          {
            label: '飞线',
            id: '444',
            type: '2',
            children: [
              {
                type: '4',
                id: '444-1',
                label: '飞线',
              },
            ]
          },
          {
            label: '铺铜',
            id: '555',
            type: '2',
            children: [
              {
                type: '4',
                id: '555-1',
                label: '铺铜',
              },
            ]
          },
          {
            label: '2D',
            id: '888',
            type: '2',
            children: [
              {
                type: '4',
                id: '888-1',
                label: '2D预览',
              },
            ]
          },
          {
            label: '3D',
            id: '999',
            type: '2',
            children: [
              {
                type: '4',
                id: '999-1',
                label: '3D预览',
              },
            ]
          },
          {
            label: '泪滴',
            id: '666',
            type: '2',
            children: [
              {
                type: '4',
                id: '666-1',
                label: '泪滴',
              },
            ]
          },
          {
            label: '图片',
            id: '777',
            type: '2',
            children: [
              {
                type: '4',
                id: '777-1',
                label: '图片',
              },
            ]
          },
        ]
      };

      this.$store.dispatch('setUserMsg', { userName: userMsg.userName, avatar: userMsg.avatar, userId: userMsg.userId });
      this.$store.dispatch('setUserList', userMsg.fileList);
    }
  }
}
</script>

<style scoped>
  .eda{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .bottom-bar{
    width: 100%;
    height: calc(100vh - 65px);
    position: relative;
    overflow: hidden;
  }
</style>
