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
              <el-select v-model="dataSetName" v-show="!isShrink" filterable reserve-keyword placeholder="搜索任务" style="padding:5px">
                <el-option v-for="item in dataSetList" :key="item.id" :label="item.title" :value="item.id">
                </el-option>
              </el-select>
            </div>
            <hr style="height:1px;border:none;border-top:1px solid #ccc">
            <div>
              <div class="menu-title" @click="showMyTask">
                <a>
                  <span class="icon-color">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-wenjianjia"></use>
                    </svg>
                  </span>
                  <span>我的任务</span>
                </a>
                <Arrow :isUp="isShowMyTask"></Arrow>
              </div>
              <ul class="my-menu" v-show="isShowMyTask">
                <li class="active">
                  我的任务1
                </li>
                <li>
                  我的任务2
                </li>
                <li>
                  我的任务3
                </li>
              </ul>
            </div>
            <div>
              <div class="menu-title" @click="showShareTask">
                <a>
                  <span class="icon-color">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-fenxiang"></use>
                    </svg>
                  </span>
                  分享的任务
                </a>
                <Arrow :isUp="isShowShareTask"></Arrow>
              </div>
              <ul class="my-menu" v-show="isShowShareTask">
                <li>
                  我的任务1
                </li>
                <li>
                  我的任务2
                </li>
                <li>
                  我的任务3
                </li>
                <li>
                  我的任务1
                </li>
                <li>
                  我的任务2
                </li>
                <li>
                  我的任务3
                </li>
                <li>
                  我的任务1
                </li>
                <li>
                  我的任务2
                </li>
                <li>
                  我的任务3
                </li>
                <li>
                  我的任务1
                </li>
                <li>
                  我的任务2
                </li>
                <li>
                  我的任务3
                </li>
                <li>
                  我的任务1
                </li>
                <li>
                  我的任务2
                </li>
                <li>
                  我的任务3
                </li>
                <li>
                  我的任务1
                </li>
                <li>
                  我的任务2
                </li>
                <li>
                  我的任务3
                </li>
                <li>
                  我的任务1
                </li>
                <li>
                  我的任务2
                </li>
                <li>
                  我的任务3
                </li>
                <li>
                  我的任务1
                </li>
                <li>
                  我的任务2
                </li>
                <li>
                  我的任务3
                </li>
                <li>
                  我的任务1
                </li>
                <li>
                  我的任务2
                </li>
                <li>
                  我的任务3
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
  components: {
    Arrow
  },
  props: {
    dataSetList: Array,
    dataSetId: ""
  },
  data() {
    return {
      isShow: true,
      toggleTitle: "隐藏侧边栏",
      dataSetName: "",
      target: "",
      newTitle: "",
      isShowMyTask: true,
      isShowShareTask: true,
      ops: ops,
      report: {
        baseInfo: {}
      }
    };
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
.openAndClose{
  cursor: pointer;
  position: absolute;
  right: 0px;
  color: #777;
  z-index: 999;
}
.openAndClose:hover{
  color:#000;
}
</style>
