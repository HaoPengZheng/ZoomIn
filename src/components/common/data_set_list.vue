<template>
  <el-aside :style="{width:width+'px'}">
    <div class="aside-warp">
      <div style="overflow:scroll;width:100%;height:100%;overflow-x: hidden">
        <el-select v-model="dataSetName" v-show="!isShrink" filterable reserve-keyword placeholder="搜索数据集" style="padding:5px" @change="jumpDataSet">
          <el-option v-for="item in dataSetList" :key="item.id" :label="item.title" :value="item.id">
          </el-option>
        </el-select>
        <hr style="height:1px;border:none;border-top:1px solid #ccc">
        <el-menu :default-active="`/home/data-processing/${dataSetId}`" :collapse="isShrink" v-bind:router="true">
          <el-menu-item :index="`/home/data-processing/${dataSet.id}`" v-for="(dataSet) in dataSetList" :key="dataSet.id">
            <template v-if="target==dataSet.id">
              <i class="el-icon-document" style=""></i>
              <el-input v-model="newTitle" size="mini" style="width:120px" @blur="saveChangeTitle" @keyup.native="keySaveChange($event)" @click.native="stop($event)"></el-input>
            </template>
            <a v-else >
              <i class="el-icon-document" style=""></i>
              <span slot="title" style="padding-right:80px">{{dataSet.title}}</span>
            </a>

            <el-dropdown style="position: absolute;right:20px;">
              <span class="el-dropdown-link">
                <i class="el-icon-more pointer" @click="stop($event)"></i>
              </span>
              <el-dropdown-menu slot="dropdown" style="margin:-10px 0!important">
                <el-dropdown-item @click.native="changeTitle(dataSet)">编辑</el-dropdown-item>
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
  </el-aside>
</template>
<script>
export default {
  props: {
    dataSetList: Array,
    dataSetId: ""
  },
  data() {
    return {
      width: 275,
      isShrink: false,
      toggleTitle: "隐藏侧边栏",
      dataSetName: "",
      target: "",
      newTitle: ""
    };
  },
  computed: {
    showEdit: {
      get: function() {
        let showEdit = {};
        this.dataSetList.forEach(element => {
          showEdit[element.id] = false;
        });
        return showEdit;
      },
      set: function(val) {}
    }
  },
  methods: {
    initShowEdit: function() {
      console.log(this.dataSetList);
    },
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
    showDataSet: function(dataSetId) {
      this.$emit("showDataSet", dataSetId);
    },
    changeTitle: function(dataSet) {
      this.target = dataSet.id;
      this.newTitle = dataSet.title;
    },
    saveChangeTitle: function() {
      if (this.target == "") {
        return;
      }
      if(this.newTitle==""){
        this.target = "";
        return;
      }
      this.$post("/task/dataProcessing/changeTitle", {
        data_set_id: this.target,
        new_title: this.newTitle
      })
        .then(() => {
          for (let i = 0; i < this.dataSetList.length; i++) {
            if (this.dataSetList[i].id == this.target) {
              this.$set(this.dataSetList[i], "title", this.newTitle);
              this.target = "";
              return;
            }
          }
        })
        .catch(() => {
          this.target = "";
        });
    },
    keySaveChange: function(e) {
      if (e.keyCode == 13) {
        this.saveChangeTitle();
      }
    },
    stop:function(e) {
      e.stopPropagation();
    },
    jumpDataSet:function(id){
      this.dataSetName = id;
      this.dataSetId = id;
      this.$router.push(`/home/data-processing/${id}`)
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
