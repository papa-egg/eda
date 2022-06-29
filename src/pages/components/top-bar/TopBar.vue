<template>
  <div class="top-bar">

    <!--默认-->
    <el-menu v-if="!type" :default-active="activeIndex" class="menu-tab" mode="horizontal" @select="handleSelect">
      <el-submenu index="1">
        <template slot="title">文件</template>
        <el-submenu index="1-1">
          <template slot="title">新建</template>
          <el-menu-item index="1-1-1" @click="createModules('project')">工程...</el-menu-item>
          <el-menu-item index="1-1-2" @click="createModules('sch')">原理图</el-menu-item>
          <el-menu-item index="1-1-3" @click="createModules('sch_element')">原理图模块</el-menu-item>
          <el-menu-item index="1-1-4" @click="createModules('pcb')">PCB</el-menu-item>
          <el-menu-item index="1-1-5" @click="createModules('pcb_element')">PCB模块</el-menu-item>
        </el-submenu>
        <el-submenu index="1-2">
          <template slot="title">打开</template>
          <el-menu-item index="1-2-1">EDA</el-menu-item>
          <el-menu-item index="1-2-2">Altium...</el-menu-item>
          <el-menu-item index="1-2-3">Eagle...</el-menu-item>
          <el-menu-item index="1-2-4">Kicad...</el-menu-item>
        </el-submenu>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">视图</template>
        <el-menu-item index="4-5">左侧栏</el-menu-item>
        <el-submenu index="4-6">
          <template slot="title">面板</template>
          <el-menu-item index="4-6-1">工程面板</el-menu-item>
          <el-menu-item index="4-6-2">设计面板</el-menu-item>
          <el-menu-item index="4-6-3">库面板</el-menu-item>
        </el-submenu>
      </el-submenu>

      <el-submenu index="7">
        <template slot="title">设置</template>
        <el-menu-item index="7-2">系统设置</el-menu-item>
        <el-submenu index="7-3">
          <template slot="title">语言设置</template>
          <el-menu-item index="7-3-1">简体中文</el-menu-item>
          <el-menu-item index="7-3-2">english</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>

    <!--原理图-->
    <el-menu v-if="type === 'sch'" :default-active="activeIndex" class="menu-tab" mode="horizontal" @select="handleSelect">
      <el-submenu index="1">
        <template slot="title">文件</template>
        <el-submenu index="1-1">
          <template slot="title">新建</template>
          <el-menu-item index="1-1-1" @click="createModules('project')">工程...</el-menu-item>
          <el-menu-item index="1-1-2" @click="createModules('sch')">原理图</el-menu-item>
          <el-menu-item index="1-1-3" @click="createModules('sch_element')">原理图模块</el-menu-item>
          <el-menu-item index="1-1-4" @click="createModules('pcb')">PCB</el-menu-item>
          <el-menu-item index="1-1-5" @click="createModules('pcb_element')">PCB模块</el-menu-item>
        </el-submenu>
        <el-submenu index="1-2">
          <template slot="title">打开</template>
          <el-menu-item index="1-2-1">EDA</el-menu-item>
          <el-menu-item index="1-2-2">Altium...</el-menu-item>
          <el-menu-item index="1-2-3">Eagle...</el-menu-item>
          <el-menu-item index="1-2-4">Kicad...</el-menu-item>
        </el-submenu>
        <el-menu-item index="1-3">保存</el-menu-item>
        <el-menu-item index="1-4">另存为</el-menu-item>
        <el-submenu index="1-5">
          <template slot="title">导入</template>
          <el-menu-item index="1-5-1">DXF...</el-menu-item>
          <el-menu-item index="1-5-2">图片</el-menu-item>
          <el-menu-item index="1-5-3">EDA文件</el-menu-item>
        </el-submenu>
        <el-submenu index="1-6">
          <template slot="title">导出</template>
          <el-menu-item index="1-6-1">PDF...</el-menu-item>
          <el-menu-item index="1-6-2">PNG...</el-menu-item>
          <el-menu-item index="1-6-3">SVG...</el-menu-item>
          <el-menu-item index="1-6-4">AD...</el-menu-item>
          <el-menu-item index="1-6-5">GEBer...</el-menu-item>
          <el-menu-item index="1-6-6">网表...</el-menu-item>
          <el-menu-item index="1-6-7">BOM...</el-menu-item>
        </el-submenu>
        <el-menu-item index="1-7">打印...</el-menu-item>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">编辑</template>
        <el-menu-item index="2-1">撤销</el-menu-item>
        <el-menu-item index="2-2">重做</el-menu-item>
        <el-menu-item index="2-3">复制</el-menu-item>
        <el-menu-item index="2-4">粘贴</el-menu-item>
        <el-menu-item index="2-5">剪切</el-menu-item>
        <el-menu-item index="2-6">删除</el-menu-item>
        <el-menu-item index="2-7">拖动</el-menu-item>
        <el-menu-item index="2-8">查看</el-menu-item>
        <el-menu-item index="2-9">查看相似对象</el-menu-item>
        <el-submenu index="2-10">
          <template slot="title">旋转</template>
          <el-menu-item index="2-10-1">顺时针旋转90度</el-menu-item>
          <el-menu-item index="2-10-2">逆时针旋转90度</el-menu-item>
          <el-menu-item index="2-10-3">水平翻转</el-menu-item>
          <el-menu-item index="2-10-4">垂直翻转</el-menu-item>
        </el-submenu>
        <el-submenu index="2-11">
          <template slot="title">对齐</template>
          <el-menu-item index="2-11-1">左对齐</el-menu-item>
          <el-menu-item index="2-11-2">右对齐</el-menu-item>
          <el-menu-item index="2-11-3">顶对齐</el-menu-item>
          <el-menu-item index="2-11-4">底对齐</el-menu-item>
        </el-submenu>
        <el-menu-item index="2-12">标注编号</el-menu-item>
        <el-menu-item index="2-13">清空画布</el-menu-item>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">放置</template>
        <el-menu-item index="3-1">元件</el-menu-item>
        <el-menu-item index="3-2" @click="setMotifChartlet('sch_wire')">导线</el-menu-item>
        <el-menu-item index="3-3" @click="setMotifChartlet('sch_net_vcc')">VCC电源端孔</el-menu-item>
        <el-menu-item index="3-3" @click="setMotifChartlet('sch_net_gnd')">GND电源端孔</el-menu-item>
        <el-menu-item index="3-4" @click="setMotifChartlet('sch_bus_line')">总线</el-menu-item>
        <el-menu-item index="3-5" @click="setMotifChartlet('sch_bus_entry')">总线入口</el-menu-item>
        <el-menu-item index="3-6" @click="setMotifChartlet('sch_net_label')">网络标签</el-menu-item>
        <el-menu-item index="3-7" @click="setMotifChartlet('sch_net_port')">网络端口</el-menu-item>
        <el-menu-item index="3-8" @click="setMotifChartlet('sch_no_connect')">非连接标志</el-menu-item>
        <el-menu-item index="3-9" @click="setMotifChartlet('sch_probe')">电压探针</el-menu-item>
        <el-menu-item index="3-10" @click="setMotifChartlet('sch_text')">文本</el-menu-item>
        <el-menu-item index="3-11" @click="setMotifChartlet('sch_pin')">管脚</el-menu-item>
        <el-submenu index="3-11">
          <template slot="title">更多</template>
          <el-menu-item index="3-11-1" @click="setMotifChartlet('sch_elliptic')">圆弧</el-menu-item>
          <el-menu-item index="3-11-2" @click="setMotifChartlet('sch_circle')">圆</el-menu-item>
          <!--<el-menu-item index="3-11-3">图片</el-menu-item>-->
          <el-menu-item index="3-11-4" @click="setMotifChartlet('sch_polyline')">线条</el-menu-item>
          <el-menu-item index="3-11-5" @click="setMotifChartlet('sch_bessel')">贝塞尔曲线</el-menu-item>
          <el-menu-item index="3-11-6" @click="setMotifChartlet('sch_rect')">矩形</el-menu-item>
          <el-menu-item index="3-11-7" @click="setMotifChartlet('sch_polygon')">多边形</el-menu-item>
          <el-menu-item index="3-11-8" @click="setMotifChartlet('sch_ellipse')">椭圆</el-menu-item>
        </el-submenu>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">视图</template>
        <el-submenu index="4-1">
          <template slot="title">缩放</template>
          <el-menu-item index="4-1-1">手动</el-menu-item>
          <el-menu-item index="4-1-2">适合窗口</el-menu-item>
          <el-menu-item index="4-1-3">50%</el-menu-item>
          <el-menu-item index="4-1-4">100%</el-menu-item>
          <el-menu-item index="4-1-5">200%</el-menu-item>
          <el-menu-item index="4-1-6">500%</el-menu-item>
        </el-submenu>
        <el-menu-item index="4-2">显示网格</el-menu-item>
        <el-menu-item index="4-3">十字光标</el-menu-item>
        <el-menu-item index="4-4">绘图工具</el-menu-item>
        <el-menu-item index="4-5">左侧栏</el-menu-item>
        <el-submenu index="4-6">
          <template slot="title">面板</template>
          <el-menu-item index="4-6-1">工程面板</el-menu-item>
          <el-menu-item index="4-6-2">设计面板</el-menu-item>
          <el-menu-item index="4-6-3">库面板</el-menu-item>
        </el-submenu>
      </el-submenu>

      <el-submenu index="5">
        <template slot="title">工具</template>
        <el-menu-item index="5-1">交叉选择</el-menu-item>
        <el-menu-item index="5-2">布局传递...</el-menu-item>
        <el-menu-item index="5-3">封装管理库...</el-menu-item>
      </el-submenu>

      <el-submenu index="6">
        <template slot="title">转换</template>
        <el-menu-item index="6-1">原理图转PCB</el-menu-item>
        <el-menu-item index="6-2">更新PCB</el-menu-item>
      </el-submenu>

      <el-submenu index="7">
        <template slot="title">设置</template>
        <el-menu-item index="7-1">快捷键设置</el-menu-item>
        <el-menu-item index="7-2">系统设置</el-menu-item>
        <el-submenu index="7-3">
          <template slot="title">语言设置</template>
          <el-menu-item index="7-3-1">简体中文</el-menu-item>
          <el-menu-item index="7-3-2">english</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>

    <!--原理图模块-->
    <el-menu v-if="type === 'sch_element'" :default-active="activeIndex" class="menu-tab" mode="horizontal" @select="handleSelect">
      <el-submenu index="1">
        <template slot="title">文件</template>
        <el-submenu index="1-1">
          <template slot="title">新建</template>
          <el-menu-item index="1-1-1" @click="createModules('project')">工程...</el-menu-item>
          <el-menu-item index="1-1-2" @click="createModules('sch')">原理图</el-menu-item>
          <el-menu-item index="1-1-3" @click="createModules('sch_element')">原理图模块</el-menu-item>
          <el-menu-item index="1-1-4" @click="createModules('pcb')">PCB</el-menu-item>
          <el-menu-item index="1-1-5" @click="createModules('pcb_element')">PCB模块</el-menu-item>
        </el-submenu>
        <el-submenu index="1-2">
          <template slot="title">打开</template>
          <el-menu-item index="1-2-1">EDA</el-menu-item>
          <el-menu-item index="1-2-2">Altium...</el-menu-item>
          <el-menu-item index="1-2-3">Eagle...</el-menu-item>
          <el-menu-item index="1-2-4">Kicad...</el-menu-item>
        </el-submenu>
        <el-menu-item index="1-3">保存</el-menu-item>
        <el-menu-item index="1-4">另存为</el-menu-item>
        <el-submenu index="1-5">
          <template slot="title">导入</template>
          <el-menu-item index="1-5-1">DXF...</el-menu-item>
          <el-menu-item index="1-5-2">图片</el-menu-item>
          <el-menu-item index="1-5-3">EDA文件</el-menu-item>
        </el-submenu>
        <el-submenu index="1-6">
          <template slot="title">导出</template>
          <el-menu-item index="1-6-1">PDF...</el-menu-item>
          <el-menu-item index="1-6-2">PNG...</el-menu-item>
          <el-menu-item index="1-6-3">SVG...</el-menu-item>
          <el-menu-item index="1-6-4">AD...</el-menu-item>
          <el-menu-item index="1-6-5">GEBer...</el-menu-item>
          <el-menu-item index="1-6-6">网表...</el-menu-item>
          <el-menu-item index="1-6-7">BOM...</el-menu-item>
        </el-submenu>
        <el-menu-item index="1-7">打印...</el-menu-item>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">编辑</template>
        <el-menu-item index="2-1">撤销</el-menu-item>
        <el-menu-item index="2-2">重做</el-menu-item>
        <el-menu-item index="2-3">复制</el-menu-item>
        <el-menu-item index="2-4">粘贴</el-menu-item>
        <el-menu-item index="2-5">剪切</el-menu-item>
        <el-menu-item index="2-6">删除</el-menu-item>
        <el-menu-item index="2-7">拖动</el-menu-item>
        <el-menu-item index="2-8">查看</el-menu-item>
        <el-menu-item index="2-9">查看相似对象</el-menu-item>
        <el-submenu index="2-10">
          <template slot="title">旋转</template>
          <el-menu-item index="2-10-1">顺时针旋转90度</el-menu-item>
          <el-menu-item index="2-10-2">逆时针旋转90度</el-menu-item>
          <el-menu-item index="2-10-3">水平翻转</el-menu-item>
          <el-menu-item index="2-10-4">垂直翻转</el-menu-item>
        </el-submenu>
        <el-submenu index="2-11">
          <template slot="title">对齐</template>
          <el-menu-item index="2-11-1">左对齐</el-menu-item>
          <el-menu-item index="2-11-2">右对齐</el-menu-item>
          <el-menu-item index="2-11-3">顶对齐</el-menu-item>
          <el-menu-item index="2-11-4">底对齐</el-menu-item>
        </el-submenu>
        <el-menu-item index="2-12">标注编号</el-menu-item>
        <el-menu-item index="2-13">清空画布</el-menu-item>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">放置</template>
        <el-menu-item index="3-1">元件...</el-menu-item>
        <el-menu-item index="3-2" @click="setMotifChartlet('sch_wire')">导线</el-menu-item>
        <el-menu-item index="3-3" @click="setMotifChartlet('sch_net_vcc')">VCC电源端孔</el-menu-item>
        <el-menu-item index="3-3" @click="setMotifChartlet('sch_net_gnd')">GND电源端孔</el-menu-item>
        <el-menu-item index="3-4" @click="setMotifChartlet('sch_bus_line')">总线</el-menu-item>
        <el-menu-item index="3-5" @click="setMotifChartlet('sch_bus_entry')">总线入口</el-menu-item>
        <el-menu-item index="3-6" @click="setMotifChartlet('sch_net_label')">网络标签</el-menu-item>
        <el-menu-item index="3-7" @click="setMotifChartlet('sch_net_port')">网络端口</el-menu-item>
        <el-menu-item index="3-8" @click="setMotifChartlet('sch_no_connect')">非连接标志</el-menu-item>
        <el-menu-item index="3-9" @click="setMotifChartlet('sch_probe')">电压探针</el-menu-item>
        <el-menu-item index="3-10" @click="setMotifChartlet('sch_text')">文本</el-menu-item>
        <el-menu-item index="3-11" @click="setMotifChartlet('sch_pin')">管脚</el-menu-item>
        <el-submenu index="3-11">
          <template slot="title">更多</template>
          <el-menu-item index="3-11-1" @click="setMotifChartlet('sch_elliptic')">圆弧</el-menu-item>
          <el-menu-item index="3-11-2" @click="setMotifChartlet('sch_circle')">圆</el-menu-item>
          <!--<el-menu-item index="3-11-3">图片</el-menu-item>-->
          <el-menu-item index="3-11-4" @click="setMotifChartlet('sch_polyline')">线条</el-menu-item>
          <el-menu-item index="3-11-5" @click="setMotifChartlet('sch_bessel')">贝塞尔曲线</el-menu-item>
          <el-menu-item index="3-11-6" @click="setMotifChartlet('sch_rect')">矩形</el-menu-item>
          <el-menu-item index="3-11-7" @click="setMotifChartlet('sch_polygon')">多边形</el-menu-item>
          <el-menu-item index="3-11-8" @click="setMotifChartlet('sch_ellipse')">椭圆</el-menu-item>
        </el-submenu>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">视图</template>
        <el-submenu index="4-1">
          <template slot="title">缩放</template>
          <el-menu-item index="4-1-1">手动</el-menu-item>
          <el-menu-item index="4-1-2">适合窗口</el-menu-item>
          <el-menu-item index="4-1-3">50%</el-menu-item>
          <el-menu-item index="4-1-4">100%</el-menu-item>
          <el-menu-item index="4-1-5">200%</el-menu-item>
          <el-menu-item index="4-1-6">500%</el-menu-item>
        </el-submenu>
        <el-menu-item index="4-2">显示网格</el-menu-item>
        <el-menu-item index="4-3">十字光标</el-menu-item>
        <el-menu-item index="4-4">绘图工具</el-menu-item>
        <el-menu-item index="4-5">左侧栏</el-menu-item>
        <el-submenu index="4-6">
          <template slot="title">面板</template>
          <el-menu-item index="4-6-1">工程面板</el-menu-item>
          <el-menu-item index="4-6-2">设计面板</el-menu-item>
          <el-menu-item index="4-6-3">库面板</el-menu-item>
        </el-submenu>
      </el-submenu>

      <el-submenu index="5">
        <template slot="title">工具</template>
        <el-menu-item index="5-1">交叉选择</el-menu-item>
        <el-menu-item index="5-2">布局传递...</el-menu-item>
        <el-menu-item index="5-3">封装管理库...</el-menu-item>
      </el-submenu>

      <el-submenu index="6">
        <template slot="title">转换</template>
        <el-menu-item index="6-1">原理图转PCB</el-menu-item>
        <el-menu-item index="6-2">更新PCB</el-menu-item>
      </el-submenu>

      <el-submenu index="7">
        <template slot="title">设置</template>
        <el-menu-item index="7-1">快捷键设置</el-menu-item>
        <el-menu-item index="7-2">系统设置</el-menu-item>
        <el-submenu index="7-3">
          <template slot="title">语言设置</template>
          <el-menu-item index="7-3-1">简体中文</el-menu-item>
          <el-menu-item index="7-3-2">english</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>

    <!--PCB模块-->
    <el-menu v-if="type === 'pcb_element'" :default-active="activeIndex" class="menu-tab" mode="horizontal" @select="handleSelect">
      <el-submenu index="1">
        <template slot="title">文件</template>
        <el-submenu index="1-1">
          <template slot="title">新建</template>
          <el-menu-item index="1-1-1" @click="createModules('project')">工程...</el-menu-item>
          <el-menu-item index="1-1-2" @click="createModules('sch')">原理图</el-menu-item>
          <el-menu-item index="1-1-3" @click="createModules('sch_element')">原理图模块</el-menu-item>
          <el-menu-item index="1-1-4" @click="createModules('pcb')">PCB</el-menu-item>
          <el-menu-item index="1-1-5" @click="createModules('pcb_element')">PCB模块</el-menu-item>
        </el-submenu>
        <el-submenu index="1-2">
          <template slot="title">打开</template>
          <el-menu-item index="1-2-1">EDA</el-menu-item>
          <el-menu-item index="1-2-2">Altium...</el-menu-item>
          <el-menu-item index="1-2-3">Eagle...</el-menu-item>
          <el-menu-item index="1-2-4">Kicad...</el-menu-item>
        </el-submenu>
        <el-menu-item index="1-3">保存</el-menu-item>
        <el-menu-item index="1-4">另存为</el-menu-item>
        <el-submenu index="1-5">
          <template slot="title">导入</template>
          <el-menu-item index="1-5-1">DXF...</el-menu-item>
          <el-menu-item index="1-5-2">图片</el-menu-item>
          <el-menu-item index="1-5-3">EDA文件</el-menu-item>
        </el-submenu>
        <el-submenu index="1-6">
          <template slot="title">导出</template>
          <el-menu-item index="1-6-1">PDF...</el-menu-item>
          <el-menu-item index="1-6-2">PNG...</el-menu-item>
          <el-menu-item index="1-6-3">SVG...</el-menu-item>
          <el-menu-item index="1-6-4">AD...</el-menu-item>
          <el-menu-item index="1-6-5">GEBer...</el-menu-item>
          <el-menu-item index="1-6-6">网表...</el-menu-item>
          <el-menu-item index="1-6-7">BOM...</el-menu-item>
        </el-submenu>
        <el-menu-item index="1-7">打印...</el-menu-item>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">编辑</template>
        <el-menu-item index="2-1">撤销</el-menu-item>
        <el-menu-item index="2-2">重做</el-menu-item>
        <el-menu-item index="2-3">复制</el-menu-item>
        <el-menu-item index="2-4">粘贴</el-menu-item>
        <el-menu-item index="2-5">剪切</el-menu-item>
        <el-menu-item index="2-6">删除</el-menu-item>
        <el-menu-item index="2-7">拖动</el-menu-item>
        <el-menu-item index="2-8">查看</el-menu-item>
        <el-menu-item index="2-9">查看相似对象</el-menu-item>
        <el-submenu index="2-10">
          <template slot="title">旋转</template>
          <el-menu-item index="2-10-1">顺时针旋转90度</el-menu-item>
          <el-menu-item index="2-10-2">逆时针旋转90度</el-menu-item>
          <el-menu-item index="2-10-3">水平翻转</el-menu-item>
          <el-menu-item index="2-10-4">垂直翻转</el-menu-item>
        </el-submenu>
        <el-submenu index="2-11">
          <template slot="title">对齐</template>
          <el-menu-item index="2-11-1">左对齐</el-menu-item>
          <el-menu-item index="2-11-2">右对齐</el-menu-item>
          <el-menu-item index="2-11-3">顶对齐</el-menu-item>
          <el-menu-item index="2-11-4">底对齐</el-menu-item>
        </el-submenu>
        <el-menu-item index="2-12">标注编号</el-menu-item>
        <el-menu-item index="2-13">清空画布</el-menu-item>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">放置</template>
        <el-menu-item index="3-2" @click="setMotifChartlet('pcb_wire')">导线</el-menu-item>
        <el-menu-item index="3-3" @click="setMotifChartlet('pcb_pad')">焊盘</el-menu-item>
        <el-menu-item index="3-4" @click="setMotifChartlet('pcb_via')">过孔</el-menu-item>
        <el-menu-item index="3-5" @click="setMotifChartlet('pcb_hole')">通孔</el-menu-item>
        <el-menu-item index="3-6" @click="setMotifChartlet('pcb_polygon')">多边形区域</el-menu-item>
        <el-menu-item index="3-7">尺寸</el-menu-item>
        <el-menu-item index="3-8" @click="setMotifChartlet('pcb_text')">文本</el-menu-item>
        <el-submenu index="3-11">
          <template slot="title">更多</template>
          <el-menu-item index="3-11-1">圆弧</el-menu-item>
          <el-menu-item index="3-11-2">中心圆弧</el-menu-item>
          <el-menu-item index="3-11-4">圆</el-menu-item>
          <el-menu-item index="3-11-5">量角器</el-menu-item>
          <el-menu-item index="3-11-6">矩形</el-menu-item>
          <el-menu-item index="3-11-7">椭圆</el-menu-item>
        </el-submenu>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">视图</template>
        <el-submenu index="4-1">
          <template slot="title">缩放</template>
          <el-menu-item index="4-1-1">手动</el-menu-item>
          <el-menu-item index="4-1-2">适合窗口</el-menu-item>
          <el-menu-item index="4-1-3">50%</el-menu-item>
          <el-menu-item index="4-1-4">100%</el-menu-item>
          <el-menu-item index="4-1-5">200%</el-menu-item>
          <el-menu-item index="4-1-6">500%</el-menu-item>
        </el-submenu>
        <el-menu-item index="4-2">显示网格</el-menu-item>
        <el-menu-item index="4-3">十字光标</el-menu-item>
        <el-menu-item index="4-4">绘图工具</el-menu-item>
        <el-menu-item index="4-5">左侧栏</el-menu-item>
        <el-submenu index="4-6">
          <template slot="title">面板</template>
          <el-menu-item index="4-6-1">工程面板</el-menu-item>
          <el-menu-item index="4-6-2">设计面板</el-menu-item>
          <el-menu-item index="4-6-3">库面板</el-menu-item>
        </el-submenu>
      </el-submenu>

      <el-submenu index="5">
        <template slot="title">工具</template>
        <el-menu-item index="5-1">交叉选择</el-menu-item>
        <el-menu-item index="5-2">布局传递...</el-menu-item>
        <el-menu-item index="5-3">封装管理库...</el-menu-item>
      </el-submenu>

      <el-submenu index="6">
        <template slot="title">转换</template>
        <el-menu-item index="6-1">原理图转PCB</el-menu-item>
        <el-menu-item index="6-2">更新PCB</el-menu-item>
      </el-submenu>

      <el-submenu index="7">
        <template slot="title">设置</template>
        <el-menu-item index="7-1">快捷键设置</el-menu-item>
        <el-menu-item index="7-2">系统设置</el-menu-item>
        <el-submenu index="7-3">
          <template slot="title">语言设置</template>
          <el-menu-item index="7-3-1">简体中文</el-menu-item>
          <el-menu-item index="7-3-2">english</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>

    <div class="logo" @click="foo"><img src="../../../assets/images/jiepei-logo.png" /></div>
    <div class="user-msg">
      <div class="user-image"><img src="../../../assets/images/user-image-demo.jpg" /></div>

      <el-popover
        placement="bottom"
        width="120"
        trigger="click">
        <ul class="user-ulist">
          <li>退出登录</li>
        </ul>
        <p class="user-name" slot="reference">{{ userMsg.userName }}<i class="iconfont el-icon-caret-bottom"></i></p>
      </el-popover>
    </div>
  </div>
</template>

<script>
import librarys from '@/engine/library/library';
import { Device } from '@/engine/device/device';

export default {
  data () {
    return {
      activeIndex: '1',
    }
  },

  computed: {
    userMsg () {
      return this.$store.getters.getUserMsg;
    },
    type () {
      const CH = this.$store.getters.getCH;

      return CH ? CH.type : '';
    },
  },

  methods: {
    foo () {
      const engine = this.$store.getters.getEngine;

      engine.toSaveMsg();
      /*const CH = window.$vue.$store.getters.getCH;
      const sElems = CH.sElems;

      console.log('000000000000000000000000000000')
      console.log(CH);
      console.log(sElems);*/


      /*const rel = [];
      const CH = window.$vue.$store.getters.getCH;
      const sElems = CH.sElems;

      for (let elem of librarys) {
        const fs = Device.createElem(elem);

        if (fs) {
          rel.push(fs);
        }
        // sElems.push(Device.createElem(elem));
      }

      sElems.push(...rel);

      console.log(sElems);*/
    },
    createModules (type) {
      const engine = this.$store.getters.getEngine;

      switch (type) {

      case 'project': {
        break;
      }

      case 'sch': {
        engine.createProject({
          type: 'sch',
          proName: 'Sheet',
        })

        break;
      }

      case 'sch_element': {
        engine.createProject({
          type: 'sch_element',
          proName: 'ComponentLib',
        })

        break;
      }

      case 'pcb': {
        break;
      }

      case 'pcb_element': {
        engine.createProject({
          type: 'pcb_element',
          proName: 'FootprintLib',
        })

        break;
      }

      }
    },
    handleSelect () {

    },
    setMotifChartlet (type) {
      const CH = this.$store.getters.getCH;
      CH.painter.initChartlet(type);
    },
    async uploadImage () {
      document.getElementById('uploadImage').click();
    },
  }
}
</script>

<style scoped>
  .top-bar{
    height: 40px;
    z-index: 99;
    background: #7B5822;
    padding: 0 20px 0  150px;
    position: relative;
  }
  .ulist{}
  .ulist > li{
    float: left;
    cursor: pointer;
    margin: 0 10px;
    line-height: 40px;
  }
  .logo{
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translate(0, -50%);
  }
  .logo img{
    width: 44px;
    height: 25px;
  }
  .user-msg{
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translate(0, -50%);
    display: flex;
  }
  .user-image{
    width: 28px;
    height: 28px;
    overflow: hidden;
    border-radius: 50%;
  }
  .user-image image{
    display: block;
    width: 100%;
    height: 100%;
  }
  .user-name{
    color: #fff;
    line-height: 28px;
    padding: 0 10px;
    font-size: 14px;
    cursor: pointer;
  }
  .user-name > i{
    font-size: 12px;
    position: relative;
    padding-left: 5px;
    padding-right: 5px;
  }
  .user-ulist > li{
    cursor: pointer;
    font-size: 12px;
  }
</style>
<style>
  .menu-tab{
    background-color: transparent !important;
  }
  .menu-tab.el-menu > li{
    height: 40px !important;
    line-height: 40px !important;
    color: #fff !important;
  }
  .menu-tab .el-submenu .el-submenu__title{
    height: 40px !important;
    line-height: 40px !important;
    color: #fff !important;
  }
  .el-menu--horizontal>.el-menu-item.is-active{
    border-bottom: none !important;
    background-color: #7B5822 !important;
    color: #fff !important;
  }
  .menu-tab.el-menu--horizontal>.el-submenu.is-active .el-submenu__title{
    border-bottom: none;
    color: #fff !important;
  }
  .menu-tab .el-submenu__title i{
    color: #fff;
  }
  .menu-tab.el-menu > li:hover{
    background-color: #7B5822 !important;
    color: #ff9900 !important;
  }
  .menu-tab .el-submenu .el-submenu__title:hover{
    background-color: #7B5822 !important;
    color: #ff9900 !important;
  }
  .menu-tab .el-submenu .el-submenu__title:hover i{
    color: #ff9900 !important;
  }
</style>
