<template>
  <div>
    <p style="margin:10px 0">
      当前选中的表头为第
      <span class="titleIndexStyle">
        {{titleIndex+2}}
      </span>
      行,表头前的数据，将不会保留
    </p>
    <div class="preview-table-warp " ref="preDiv" @scroll="scrollDiv">
      <table class="preview-table">
        <tbody>
          <tr @click="changeTitleIndex(-1)" :class="{'setTitle':titleIndex==-1,'disabled':titleIndex>-1,'hov':hoverIndex==-1}">
            {{setTitle}}
            <td>{{0}}
              <span class='set-thread'>表头
                <span class='triangle_right'></span>
              </span>
            </td>
            <td v-for="(key,index) in tableTitle" :key="index">
              {{key}}
            </td>
          </tr>
          <tr v-for="(tr,index) in tempJson" :key="index" @mouseenter="enter(index)" @click="changeTitleIndex(index)" :class="{'setTitle':titleIndex==index,'disabled':titleIndex>index}">
            <td>{{index+1}}
              <span class='set-thread'>表头
                <span class='triangle_right'></span>
              </span>
            </td>
            <td v-for="(value,index) in tr" :key="index">
              {{value}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>
<script>
export default {
  props: {
    json: Array
  },
  data() {
    return {
      tableTitle: "",
      titleIndex: -1,
      hoverIndex: 3,
      tempJson: Array,
      showIndex: 0,
      scroll: 0
    };
  },
  created: function() {
    this.addMore();
  },
  mounted: function() {
    this.scroll = this.$refs.preDiv.scrollTop;
  },
  methods: {
    changeTitleIndex: function(index) {
      this.titleIndex = index;
      this.$emit("setTitleIndex", this.titleIndex + 2);
    },
    enter: function(index) {
      this.hoverIndex = index;
    },
    addMore: function() {
      this.showIndex += 100;
      let length = this.json.length;
      this.showIndex = length > this.showIndex ? this.showIndex : length;
      this.tempJson = this.json.slice(0, this.showIndex);
    },
    scrollDiv: function() {
      this.scroll = this.$refs.preDiv.scrollTop;
      if (this.scroll > this.$refs.preDiv.scrollHeight - 800) {
        this.addMore();
      }
    }
  },
  computed: {
    setTitle: function() {
      let title = Object.keys(this.json[0]);
      this.tableTitle = title;
    }
  }
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
p {
  text-align: left;
}
.titleIndexStyle {
  font-weight: 600;
  color: rgb(71, 197, 163);
  font-size: 16px;
}
.preview-table-warp {
  overflow: scroll;
  width: 100%;
  height: 600px;
  font-size: 12px;
  border: solid 1px #dadddf;
}
.preview-table {
  color: rgba(10, 18, 32, 0.87);
  font-family: "PingFang SC", "Helvetica Neue", Helvetica, STHeitiSC-Light,
    WOL_SB, "Segoe UI Semibold", "Segoe UI", Tahoma, Helvetica, sans-serif;
  font-size: 12px;
  font-weight: 400;
  min-width: 100%;
}

.preview-table tbody {
  display: table-row-group;
  vertical-align: middle;
  border-color: inherit;
}

.preview-table tbody tr {
  white-space: nowrap; /* 不换行 */
  overflow: hidden;
  cursor: pointer;
}

.preview-table tbody tr td:first-child {
  position: relative;
}

.preview-table tr:nth-child(odd) {
  background-color: #fff;
}

tr:hover {
  background-color: rgba(0, 0, 0, 0.1) !important;
}

tr:nth-child(even) {
  background-color: #f7f8f9;
}

td {
  line-height: 16px;
  height: 32px;
  min-width: 100px;
}

tr + tr {
  border-top: solid 1px #dfe4e7;
}

td + td {
  border-left: solid 1px #dfe4e7;
}

.preview-table tbody tr.setTitle .set-thread {
  display: block;
}

.preview-table tbody tr.setTitle {
  background-color: #c7fff0;
}

.preview-table tbody tr.hov .set-thread {
  display: block;
  background-color: #fff;
}

.preview-table tbody tr.disabled {
  opacity: 0.3;
}

.set-thread {
  display: none;
  padding: 4px 8px;
  width: 55px;
  position: absolute;
  text-align: center;
  background-color: rgba(81, 228, 175);
  left: 11px;
  top: 4px;
}

.preview-table tbody tr.hov .triangle_right {
  border-left: 9px solid #fff;
}
.triangle_right {
  height: 0px;
  width: 0px;
  border-left: 9px solid rgb(81, 228, 175);
  border-top: 12px solid transparent;
  border-bottom: 13px solid transparent;
  /* float: left; */
  position: absolute;
  top: 0px;
  /* left: 40px; */
  right: -9px;
}
</style>
