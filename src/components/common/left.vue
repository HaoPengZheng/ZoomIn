<template>
  <el-aside :style="{width:width+'px'}">
    <div class="aside-warp">
      <div style="overflow:scroll;width:100%;height:100%;">
        <el-menu default-active="1" :collapse="isShrink">
          <el-submenu index="1">
            <template slot="title">
              <span slot="title">
                <button style="border:0px;background:none;" v-popover:popover>
                  <i class="el-icon-document"></i>任务一</button>
              </span>
            </template>
            <el-popover ref="popover" placement="right" title="任务状态" width="500" trigger="hover" :content=toggleTitle>
              <el-steps :space="200" :active="1" finish-status="success">
                <el-step title="已完成" description="数据导入"></el-step>
                <el-step title="进行中" description="数据处理"></el-step>
                <el-step title="步骤 3" description="数据分析"></el-step>
                <el-step title="步骤 4" description="数据挖掘"></el-step>
                <el-step title="步骤 5" description="任务发布"></el-step>
              </el-steps>

            </el-popover>

          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">任务二</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">任务二报表</el-menu-item>
              <el-menu-item index="2-2">
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">任务二</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">任务二报表</el-menu-item>
              <el-menu-item index="3-2">任务二分析</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">任务二</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1">任务二报表</el-menu-item>
              <el-menu-item index="4-2">任务二分析</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <template v-for="(item,index) in task">
            <el-submenu :index="index.toString() " :key="index">
              <template slot="title">
                <span slot="title">
                  <el-popover placement="right" title="标题" width="500" trigger="hover" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                    <el-steps :space="200" :active="1" finish-status="success">
                      <el-step title="已完成" description="数据导入"></el-step>
                      <el-step title="进行中" description="数据处理"></el-step>
                      <el-step title="步骤 3" description="数据分析"></el-step>
                      <el-step title="步骤 4" description="数据挖掘"></el-step>
                      <el-step title="步骤 5" description="任务发布"></el-step>
                    </el-steps>
                    <el-button @click="taskDetailInfo(item.id)" class="no-btn" slot="reference">
                      <i class="el-icon-document"></i>{{item.task_name}}</el-button>
                  </el-popover>
                </span>
              </template>
            </el-submenu>
          </template>
        </el-menu>
      </div>
      <a @click="shrink" :title="toggleTitle">
        <template v-if="isShrink === false">
          <icon name="angle-left" class="shrink"></icon>
        </template>
        <template v-else>
          <icon name="angle-right" class="shrink"></icon>
        </template>
      </a>
    </div>

  </el-aside>
</template>
<script>
export default {
  props: {
    task: Array
  },
  data() {
    return {
      width: 275,
      isShrink: false,
      toggleTitle: "隐藏侧边栏"
    };
  },
  methods: {
    shrink: function() {
      if (this.isShrink) {
        this.isShrink = false;
        this.width = 275;
        this.toggleTitle = "隐藏侧边栏";
      } else {
        this.isShrink = true;
        this.width = 81;
        this.toggleTitle = "显示侧边栏";
      }
    },
    taskDetailInfo: function(id) {
      this.$router.push({ name: "task-detail", params: { taskId: id } });
    }
  }
};
</script>
<style>
.aside-warp {
  position: relative;
  height: 100%;
  background-color: #fff;
  overflow: hidden;
}
.shrink {
  position: absolute;
  right: -17px;
  color: #777;
  top: 389px;
  width: 50px;
  height: 30px;
  cursor: pointer;
}
.hide {
  display: none;
}
.no-btn {
  border: 0px;
  background: none;
}
</style>
