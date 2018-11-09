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
              <el-select v-model="dataSetName" filterable reserve-keyword placeholder="搜索数据集" style="padding:5px" @change="jumpDataSet">
                <el-option v-for="item in dataSetList" :key="item.id" :label="item.title" :value="item.id">
                </el-option>
              </el-select>
            </div>
            <hr style="height:1px;border:none;border-top:1px solid #ccc">
            <div>
              <ul class="my-menu">
                <li v-for="(dataSet) in dataSetList" :key="dataSet.id" :class="dataSet.id==dataSetId?'active':''">
                  <router-link :to="`/home/data-processing/${dataSet.id}`">{{dataSet.title}}</router-link>
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
    dataSetList: Array,
    dataSetId: ""
  },
  data() {
    return {
      dataSetName: "",
      target: "",
      newTitle: "",
      isShow: true,
      dataSetName: "",
      target: "",
      newTitle: "",
      ops: ops,
      report: {
        baseInfo: {}
      }
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
    },
    width: function() {
      if (this.isShow) {
        return 275;
      } else {
        return 10;
      }
    }
  },
  methods: {
    initShowEdit: function() {
      console.log(this.dataSetList);
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
      if (this.newTitle == "") {
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
    stop: function(e) {
      e.stopPropagation();
    },
    jumpDataSet: function(id) {
      this.dataSetName = id;
      this.dataSetId = id;
      this.$router.push(`/home/data-processing/${id}`);
    },
    showMyTask: function() {
      this.isShowMyTask = !this.isShowMyTask;
    },
    showShareTask: function() {
      this.isShowShareTask = !this.isShowShareTask;
    },
    toggleShow: function() {
      this.isShow = !this.isShow;
    }
  }
};
</script>
<style scoped>
a{
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
  text-overflow:ellipsis;
  white-space:nowrap;
  max-width: 150px;
}
.my-menu li:hover {
  cursor: pointer;
  color: var(--yt-primary-color);
  background-color: #ebebeb;
}
.my-menu li.active {
  background-color: #dcdcdc;
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
