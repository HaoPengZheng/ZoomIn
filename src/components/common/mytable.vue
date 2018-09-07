<template>
  <div class="w-table" :class="{'w-table_moving': dragState.dragging}">
    <!--  cell-mouse-enter 和 mouseleave.native 控制鼠标离开时重置拖拽状态-->
    <el-table :data="data" :border="option.border" :height="option.height" v-loading="loading" :style="{ width: parseInt(option.width)+'px' }" :cell-class-name="cellClassName" :header-cell-class-name="headerCellClassName" @cell-mouse-enter="handleMouseLeave" @mouseleave.native="handleMouseLeave">
      <slot name="fixed"></slot>
      <el-table-column  sortable v-for="(col, index) in tableHeader" v-if="keyVisibilitys[index]" :key="index" :prop="col" :label="col" :column-key="index.toString()" :render-header="renderHeader">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      default: function() {
        return [];
      },
      type: Array
    },
    header: {
      default: function() {
        return [];
      },
      type: Array
    },
    option: {
      default: function() {
        return {};
      },
      type: Object
    },
    types: {
      type: Array
    },
    keyVisibilitys: Array
  },
  data() {
    return {
      loading: false,
      tableHeader: this.header,
      dragState: {
        start: -2, // 起始元素的 index
        end: -1, // 移动鼠标时所覆盖的元素 index
        move: 1,
        dragging: false, // 是否正在拖动
        direction: undefined // 拖动方向
      }
    };
  },
  watch: {
    header: {
      handler(val, oldVal) {
        this.tableHeader = val;
        this.$emit("updateTableKeys", this.tableHeader);
      }
    },
    tableHeader: {
      handler(val, oldVal) {
        this.$emit("updateTableKeys", this.tableHeader);
        this.$emit("updateTableTypes", this.types);
      }
    }
  },
  methods: {
    renderHeader: function(createElement, { column, $index }) {
      var typeUIicon = this.$utils.showTypesUi(this.types[$index - 1]);
      return createElement(
        "div",
        {
          class: ["thead-cell"],
          on: {
            mousedown: $event => {
              this.handleMouseDown($event, column);
            },
            mouseup: $event => {
              this.handleMouseUp($event, column);
            },
            mousemove: $event => {
              this.handleMouseMove($event, column);
            }
          }
        },
        [
          createElement(
            "svg",
            {
              "aria-hidden": "true",
              class: "icon",
              style: "margin-right:5px"
            },
            [
              createElement("use", {
                attrs: {
                  "xlink:href": typeUIicon
                }
              })
            ]
          ),
          // 添加 <a> 用于显示表头 label  
          createElement("a", column.label),
          // 添加一个修改标题的按钮
          createElement(
            "a",
            {
              style: "color:red;float:right; ",
              on: {
                click: this.changeHeaderName
              }
            },
            [
              createElement("i", {
                attrs: {
                  id: $index - 1
                },
                class: "el-icon-edit"
              })
            ]
          )
        ]
      );
    },
    //  按下鼠标开始拖动
    handleMouseDown(e, column) {
      try {
        this.dragState.dragging = true;

        this.dragState.start = parseInt(column.columnKey);
        // 给拖动时的虚拟容器添加宽高
        let table = document.getElementsByClassName("w-table")[0];
        let virtual = document.getElementsByClassName("virtual");
        for (let item of virtual) {
          item.style.height = table.clientHeight - 1 + "px";
          item.style.width =
            item.parentElement.parentElement.clientWidth + "px";
        }
      } catch (e) {
        console.log("handleMouseDown");
      }
    },
    initDragState: function() {
      this.dragState = {
        start: -2,
        end: -1,
        move: -1,
        dragging: false,
        direction: undefined
      };
    },
    // 鼠标放开结束拖动
    handleMouseUp(e, column) {
      try {
        this.dragState.end = parseInt(column.columnKey); // 记录起始列
        this.dragColumn(this.dragState);
        // 初始化拖动状态
        this.initDragState();
      } catch (e) {
        console.log("handleMouseUp");
      }
    },

    // 拖动中
    handleMouseMove(e, column) {
      try {
        if (this.dragState.dragging) {
          let index = parseInt(column.columnKey); // 记录起始列
          if (index - this.dragState.start !== 0) {
            this.dragState.direction =
              index - this.dragState.start < 0 ? "left" : "right"; // 判断拖动方向
            this.dragState.move = parseInt(column.columnKey);
          } else {
            this.dragState.direction = undefined;
          }
        } else {
          return false;
        }
      } catch (e) {
        console.log("handleMouseMove");
      }
    },

    // 拖动易位
    dragColumn({ start, end, direction }) {
      let tempData = [];
      let left = direction === "left";
      let min = left ? end : start - 1;
      let max = left ? start + 1 : end;
      for (let i = 0; i < this.tableHeader.length; i++) {
        if (i === end) {
          tempData.push(this.tableHeader[start]);
        } else if (i > min && i < max) {
          tempData.push(this.tableHeader[left ? i - 1 : i + 1]);
        } else {
          tempData.push(this.tableHeader[i]);
        }
      }
      this.tableHeader = tempData;
    },
    // 鼠标移出时，初始化
    handleMouseLeave() {
      this.initDragState();
    },

    cellClassName({ column, columnIndex }) {
      var x =
        columnIndex - 1 === this.dragState.move
          ? `darg_active_${this.dragState.direction}`
          : "";

      return columnIndex - 1 === this.dragState.start ? "darg_active_start" : x;
    },
    headerCellClassName({ column, columnIndex }) {
      var x =
        columnIndex - 1 === this.dragState.move
          ? `darg_active_${this.dragState.direction}`
          : "";
      return columnIndex - 1 === this.dragState.start ? "darg_active_start" : x;
    },
    cellMouseLeave: function(row, column, cell, event) {
      alert(row);
    },
    changeHeaderName: function(e) {
      this.$emit("changeHeaderName", e);
    }
  }
};
</script>
<style>
th {
  padding: 0px !important;
}
th .cell {
  padding: 0px !important;
}

.darg_start {
  background-color: #eee !important;
  cursor: move;
}
.darg_active_left {
  border-left: 2px solid #add3e9 !important;
  z-index: 99;
  cursor: move;
}
.darg_active_right {
  border-right: 2px solid #add3e9 !important;
  z-index: 99;
  cursor: move;
}
.darg_active_start {
  background-color: #eee !important;
  cursor: move;
  padding: 0 !important;
}
.thead-cell {
  width: 80%;
  height:50px;
  margin-right:10px;
}
.thead-cell a{
  line-height: 56px;
}
.caret-wrapper{
  float: right;
  margin-top: 11px;
  margin-right: 5px;
}
</style>

<style lang="scss">
.w-table {
  .el-table .darg_start {
    background-color: #f3f3f3;
  }
  .el-table th {
    padding: 0;
    .virtual {
      position: fixed;
      display: block;
      width: 0;
      height: 0;
      margin-left: -10px;
      background: none;
      border: none;
    }
    &.darg_active_left {
      .virtual {
        border-left: 2px dotted #666;
        z-index: 99;
      }
    }
    &.darg_active_right {
      .virtual {
        border-left: 2px dotted #666;
        z-index: 99;
      }
    }
  }
  .thead-cell {
    padding: 0;
    display: inline-flex;
    flex-direction: column;
    align-items: left;
    cursor: pointer;
    overflow: initial;
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }
  &.w-table_moving {
    .el-table th .thead-cell {
      cursor: move !important;
    }
    .el-table__fixed {
      cursor: not-allowed;
    }
  }
}
