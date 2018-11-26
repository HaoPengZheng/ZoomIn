<template>
  <div>

    <el-card :body-style="{ padding: '0px',height:'200px' }">
      <img src="../../assets/data-import/task.jpg" width="40" height="40" class="image pointer" @click="taskDetail" title="点击查看任务详情">
      <div style="padding: 14px;">
        <div>{{taskName}}</div>
        <div class="bottom clearfix">
          <div>{{createTime}}</div>
          <div style="float:right;padding-bottom:10px">
            <el-dropdown>
              <span class="el-dropdown-link">
                <i class="el-icon-setting" style="font-size:20px"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="$emit('editTask',taskid)">编辑</el-dropdown-item>
                <el-dropdown-item @click.native="deleteTask(taskid)">复制</el-dropdown-item>
                <el-dropdown-item @click.native="deleteTask(taskid)">删除</el-dropdown-item>
                <el-dropdown-item @click.native="$emit('editTask')">分享</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
      <!-- 任务的操作 -->
    </el-card>
  </div>
</template>
<script>
export default {
  props: {
    taskid: Number,
    taskName: String,
    createTime: String
  },
  data() {
    return {

    };
  },
  methods: {
    editTask: function(taskid) {
      //编辑任务名
    },
    deleteTask: function(taskid) {
      let cf = confirm("删除任务后无法恢复，是否删除？");
      if (cf) {
        this.$emit("deleteTask", taskid);
        // 删除该任务
      }
    },
    taskDetail: function() {
      this.$router.push(`/home/task-detail/${this.taskid}`);
    }
  }
};
</script>
<style>
.time {
  font-size: 13px;
  color: #999;
}
.pointer {
  cursor: pointer;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 80%;
  height: 200px;
  display: block;
  padding: 0 10%;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.el-main {
  line-height: 18px;
}
</style>

