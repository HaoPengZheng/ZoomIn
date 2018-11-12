<template>
  <el-aside :style="{width:width+'px'}" class="warp">
    <div class="openAndClose" @click="toggleShow">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-caidan"></use>
      </svg>
    </div>
    <div class="shadow-border" style="overflow:hidden;" v-show="isShow">
      <div class="aside-warp">
        <vue-scroll :ops="ops">
          <div style="width:100%;height:100%;">
            <div class="left-search">
              <el-select v-show="!isShrink" value-key="id" filterable reserve-keyword placeholder="搜索任务" style="padding:5px " v-model="taskQueryName" @change="change(taskQueryName)">
                <el-option v-for="item in allTaskInfo" :key="item.id" :label="item.task_name" :value="item">
                </el-option>
              </el-select>
            </div>
            <hr style="height:1px;border:none;border-top:1px solid #ccc">
            <div>
              <ul class="my-menu">
                <li  v-for="(task,index) in allTaskInfo" :key="index"  :class="activeNumber==task.id?'active':''">
                  <router-link  :to="`/home/task-detail/${task.id}`">{{task.task_name}}</router-link>
                  <el-dropdown style="position: absolute;right:20px;">
                    <span class="el-dropdown-link">
                      <i class="el-icon-more pointer"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" style="margin:-10px 0!important">
                      <el-dropdown-item @click.native="deleteTask(task.id)">删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </li>
              </ul>
            </div>
          </div>
        </vue-scroll>
      </div>
    </div>
  </el-aside>
</template>
<script>
import ops from "@/utils/scrollOption.js";
import Arrow from "../common/Arrow.vue";
export default {
  props: {
    task: "",
    active: "",
    taskInfo: ""
  },
  data() {
    return {
      isShrink: false,
      toggleTitle: "隐藏侧边栏",
      uploadDataSetDialogVisible: false,
      activeNumber: Number,
      allTaskInfo: this.taskInfo,
      taskQueryName: {
        id: "",
        task_name: ""
      },
      value: "",
      newTaskModel: {
        name: "",
        describe: "",
        file: ""
      },
      tablejsons: null,
      titleIndex: 1,
      taskid: 0,
      isShow: true,
      ops: ops
    };
  },
  created: function() {
    this.fetchTask();
  },
  computed: {
    width: function() {
      if (this.isShow) {
        return 275;
      } else {
        return 10;
      }
    }
  },
  methods: {
    change: function(task) {
      this.$router.push(`/home/task-detail/${task.id}`);
    },
    fetchTask: function() {
      let query = this.$get("/taskinfo");
      query.then(response => {
        this.allTaskInfo = response;
        this.activeNumber = this.$route.params.id;
        if (this.activeNumber == undefined) {
          this.activeNumber = this.allTaskInfo[0].id;
        }
      });
    },
    taskDetailInfo: function(id) {
      this.$router.push({ name: "task-detail", params: { taskId: id } });
    },
    setTitleIndex: function(index) {
      this.titleIndex = index;
    },
    deleteTask: function(id) {
      this.$toDelete("/taskinfo/" + id + "/").then(response => {
        if (this.activeNumber == id) {
          this.activeNumber = undefined;
        }
        this.fetchTask();
        console.log(response);
      });
    },
    toggleShow: function() {
      this.isShow = !this.isShow;
    }
  },
  watch: {
    active: {
      immediate: true,
      handler: function(val) {
        this.activeNumber = val;
      }
    },
    taskInfo: {
      immediate: true,
      deep: true,
      handler: function(val) {
        this.allTaskInfo = val;
      }
    },
    $route(to, from) {
      // 对路由变化作出响应...
      this.activeNumber = to.params.id;
    }
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
  color: #666;
}
.warp {
  overflow: hidden;
  position: relative;
  height: 100%;
  padding-right: 25px;
  box-sizing: border-box;
}
.shadow-border {
  height: 100%;
  border: 1px solid #ebeef5;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  margin-right: 5px;
}
.aside-warp {
  position: relative;
  height: 100%;
  background-color: #fff;
  padding: 0;
  overflow: unset;
}
.hide {
  display: none;
}
.no-btn {
  border: 0px;
  background: none;
}
.my-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}
.my-menu li {
  line-height: 30px;
  padding: 5px 50px;
  overflow: hidden;
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 275px;
}
.my-menu li:hover {
  cursor: pointer;
  color: var(--yt-primary-color);
  background-color: #ebebeb;
}
.my-menu li.active {
  background-color: #f5f7fa;
}
.my-menu li.active a {
  color: #409eff;
}
.left-search {
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-color {
  color: hsl(0, 5%, 45%);
}
.menu-title {
  padding: 0 30px;
  line-height: 40px;
  justify-content: space-between;
  display: flex;
}
.openAndClose {
  cursor: pointer;
  position: absolute;
  right: 0px;
  color: #777;
  z-index: 999;
}
.openAndClose:hover {
  color: #000;
}
</style>
