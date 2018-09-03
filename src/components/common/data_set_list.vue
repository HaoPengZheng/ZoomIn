<template>
  <el-aside :style="{width:width+'px'}">
    <div class="aside-warp">
      <div style="overflow:scroll;width:100%;height:100%;">
        <el-select v-show="!isShrink" multiple filterable remote reserve-keyword placeholder="搜索数据集" style="padding:5px;">
          <el-option value="default">
          </el-option>
          <!-- :remote-method="remoteMethod" :loading="loading" -->
          <!-- <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
          </el-option> -->
        </el-select>
        <el-button v-show="!isShrink" @click="uploadDataSetDialogVisible = true" type="text" style="font-size:16px">
          <i class="el-icon-plus"></i>
        </el-button>
        <hr style="height:1px;border:none;border-top:1px solid #ccc">
        <el-menu default-active="1" :collapse="isShrink">
          <el-menu-item :index="index" v-for="(dataSet,index) in dataSetList" :key="index">
            <a @click="showDataSet(dataSet.id)">
              <i class="el-icon-document" style=""></i>
              <span slot="title" style="padding-right:80px">{{dataSet.title}}</span>
            </a>
            <el-dropdown style="position: absolute;right:20px;">
              <span class="el-dropdown-link">
                <i class="el-icon-more pointer"></i>
              </span>
              <el-dropdown-menu slot="dropdown" style="margin:-10px 0!important">
                <el-dropdown-item>编辑</el-dropdown-item>
                <el-dropdown-item @click.native="deleteTask(task.id)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-menu-item>
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
    <el-dialog title="上传数据集" :visible.sync="uploadDataSetDialogVisible" width="30%">
      <div style="margin:0 auto">
        <el-upload class="upload-demo" style="padding:0 10%" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传excel,csv文件 </div>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadDataSetDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadDataSet()">确 定</el-button>
      </span>
    </el-dialog>
  </el-aside>
</template>
<script>
export default {
  props: {
    dataSetList: Array
  },
  data() {
    return {
      width: 275,
      isShrink: false,
      toggleTitle: "隐藏侧边栏",
      uploadDataSetDialogVisible: false
    };
  },
  created: function() {
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
    },
    uploadDataSet: function() {
      this.uploadDataSetDialogVisible = false;
      // 上传的方法。
    },
    showDataSet:function(dataSetId){
      this.$emit('showDataSet',dataSetId)
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
