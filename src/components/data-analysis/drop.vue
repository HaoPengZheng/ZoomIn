<template>
  <div id="dragCon">
    <div class='people-content analysisDropStyle'>
      <el-row>

        <el-col :span="12">
          <!-- 字段框 -->
          <div class=" analysisDropStyle el-input el-input-group el-input-group--prepend">
            <div class="el-input-group__prepend">维度
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-wenzi"></use>
              </svg>
            </div>
            <div style="border-bottom: 1px solid #D0D0D0;height: 40px;text-align: left" @drop='rowDrop($event)'
                 @ondrop="removeDrop($event)" @dragover='allowDrop($event)' @ondragstart="drag(event)">
              <el-tag v-for="(item,index) in dropRow" :key="index"
                      closable
                      :disable-transitions="false"
                      @close="rowRemove(index)"
                      style="margin:3px">{{item}}
              </el-tag>
              <div>
                <div class="insert-tag">&nbsp;</div>
              </div>
            </div>
          </div>

        </el-col>

        <el-col :span="12">

          <!-- 数值框 -->
          <div class="el-input el-input-group el-input-group--prepend">
            <div class="el-input-group__prepend" style="border-left: 0px solid #dcdfe6">数值
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-wellnum"></use>
              </svg>
            </div>
            <div style="border-bottom: 1px solid #D0D0D0;height: 40px;text-align: left;margin-top:0px"
                 @drop='colDrop($event)' @ondrop="removeDrop($event)" @dragover='allowDrop($event)'
                 @ondragstart="drag(event)">

              <el-tag v-for="(item,index) in dropCol" :key="index"
                      closable
                      :disable-transitions="false"
                      @close="colRemove(index)"
                      @click.native="showMenu"
                      style="margin:3px">{{item}}({{radioLabel[index]}})
              </el-tag>

              <!-- 添加的按钮 -->
              <svg class="icon" aria-hidden="true" style="float:right;margin:10px" @click="addRowClick"
                   v-show="addIconFlag">
                <use xlink:href="#icon-iconjia"></use>
              </svg>
            </div>
          </div>


        </el-col>
      </el-row>


      <el-row>
        <div class="el-input el-input-group el-input-group--prepend" v-show="axisFlag">
          <div class="el-input-group__prepend" style="border-left: 0px solid #dcdfe6">次轴
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-wellnum"></use>
            </svg>
          </div>
          <div style="border-bottom: 1px solid #D0D0D0;height: 40px;text-align: left;margin-top:0px"
               @drop='colAxisDrop($event)' @ondrop="removeDrop($event)" @dragover='allowDrop($event)'
               @ondragstart="drag(event)">

            <el-tag v-for="(item,index) in dropAxisCol" :key="index"
                    closable
                    :disable-transitions="false"
                    @close="colSecondRemove(index)"
                    style="margin:3px">{{item}}(求和)
            </el-tag>

            <!--减的按钮 -->
            <svg class="icon" aria-hidden="true" style="float:right;margin:10px" @click="removeRowClick">
              <use xlink:href="#icon-jianhao"></use>
            </svg>
          </div>
        </div>
      </el-row>
    </div>


    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">

      <el-radio v-model="radio" label="求和">求和</el-radio>
      <el-radio v-model="radio" label="平均">平均</el-radio>
      <el-radio v-model="radio" label="计数">计数</el-radio>


    </el-dialog>

    <el-dialog :visible.sync="dialogVisible" width="50%">

      <el-tabs v-model="DialogRadio">
        <el-tab-pane label="计算方法" name="label1">
          <!-- 计算方法 -->
          <div style="margin:100px">
            <el-radio v-model="radio" label="求和">求和</el-radio>
            <el-radio v-model="radio" label="平均">平均</el-radio>
            <el-radio v-model="radio" label="计数">计数</el-radio>
          </div>
        </el-tab-pane>

        <el-tab-pane label="排序方法" name="label2">
          <!-- 排序方法 -->
          <div style="margin:100px">
            <el-radio v-model="SortRadio" label="原序">原序</el-radio>
            <el-radio v-model="SortRadio" label="升序">升序</el-radio>
            <el-radio v-model="SortRadio" label="降序">降序</el-radio>
          </div>
        </el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="chartMethodChange">确 定</el-button>
        </span>
    </el-dialog>


  </div>


</template>

<script>
  import Bus from './Bus.js'

  export default {
    name: 'drop',
    components: {},
    data() {
      return {
        dropRow: [],
        dropCol: [],
        dropAxisCol: [],
        axisFlag: false,
        addIconFlag: true,
        dialogVisible: false,
        radio: '求和',
        SortRadio: '原序',
        selectItem: '',
        radioLabel: [],
        DialogRadio: 'label1'
      }
    },
    mounted() {
      Bus.$on('yAixsFail', (e) => {
        this.dropCol.pop()
      })
    },
    methods: {
      drag: function (ev) {
        ev.dataTransfer.setData("ID", ev.target.innerText);//拖动元素的ID
        //dom = ev.target

      },
      rowDrop: function (ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("ID");//拖动的元素的ID
        this.dropRow.push(data)
        //console.log(this.dropRow.length)
        //判定是否超过要求的范围
        if (this.dropRow.length > 2) {
          this.$message({
            message: '只允许有两个维度',
            showClose: true,
            type: 'warning',
            duration: 1000
          });
          this.dropRow.pop()
          return;
        }
        //给echarts组件发名字
        Bus.$emit('rowdata', data)
        if (this.dropRow && this.dropCol) Bus.$emit('featureConfigurationFlag', true)


      },
      colDrop: function (ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("ID");//拖动的元素的ID
        this.dropCol.push(data)
        Bus.$emit('coldata', data)//给echarts组件发名字
        Bus.$emit('featureConfiguration', data)//给功能配置发送消息
        if (this.dropRow && this.dropCol) Bus.$emit('featureConfigurationFlag', true)
        this.radioLabel.push('求和')
        for (let i = 0; i < this.radioLabel.length; i++) {
          this.radioLabel[i] = '求和'         //因为拖动到y轴上时会使全部变成求和，所以这里把显示的字改求和
        }

      },
      colAxisDrop: function (ev) {
        ev.preventDefault();
        let data = ev.dataTransfer.getData("ID");//拖动的元素的ID
        this.dropAxisCol.push(data)
        Bus.$emit('dropAxisCol', data)//给echarts组件发名字

      },
      allowDrop: function (event) {
        event.preventDefault();//阻止默认事件
      },
      removeDrop: function (ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("ID");
        console.log(data);
        console.log(data.indexOf("col-"));

        var obj = document.getElementById(data);
        obj.remove();
      },
      rowRemove(tag) {
        Bus.$emit('rowdataRemove', tag);
        this.dropRow.splice(this.dropRow.indexOf(this.dropRow[tag]), 1);
      },
      colRemove(tag) {
        Bus.$emit('coldataRemove', tag)
        this.dropCol.splice(this.dropCol.indexOf(this.dropCol[tag]), 1);
        this.radioLabel.splice(this.dropCol.indexOf(this.dropCol[tag]), 1);
      },
      colSecondRemove(tag) {
        Bus.$emit('colSecondRemove', tag)
        this.dropAxisCol.splice(this.dropAxisCol.indexOf(this.dropAxisCol[tag]), 1);
        //this.radioLabel.splice(this.dropAxisCol.indexOf(this.dropAxisCol[tag]), 1);
      },
      summationType() {//没用等删
        Bus.$emit('summation', 'summationType')
      },
      addRowClick() {
        this.axisFlag = true;
        this.addIconFlag = false
      },
      removeRowClick() {
        Bus.$emit('secondRemove', 'secondRemove')
        this.dropAxisCol = []
        this.axisFlag = false;
        this.addIconFlag = true;
        // if(yAxisIndex)
      },

      showMenu: function (parameter) {
        parameter.preventDefault()
        this.dialogVisible = true
        this.selectItem = parameter.path[0].innerText
        //console.log(parameter)
      },
      chartMethodChange() {    //dialog确认时间，发送RANK和求和到echarts.vue
        this.selectItem = this.selectItem.substr(0, this.selectItem.length - 5)
        //this.radio        这是选中的求和平均计数
        //this.selectItem   这是被点击的item名字RANK
        this.radioLabel[this.dropCol.indexOf(this.selectItem)] = this.radio
        //alert(this.radioLabel)
        Bus.$emit('chartMethod', this.radio, this.selectItem)
        Bus.$emit('sortValue', this.SortRadio, this.selectItem)
        this.dialogVisible = false
        this.radio = '求和' //回到初值
        this.SortRadio = '原序'
        this.DialogRadio = 'label1'
      }

    }
  }
</script>

<style scoped>
  .select-item-drop {
    border: 1px solid #5bc0de;
    display: inline-block;
    text-align: center;
    border-radius: 3px;
    margin-right: 10px;
    cursor: pointer;
    padding: 6px 20px;
    color: #5bc0de;
    width: 75px;
  }

  .cursored {
    cursor: default;
  }

  .drag-div {
    border: 1px solid #5bc0de;
    padding: 10px;
    margin-bottom: 10px;
    width: 800px;
    cursor: pointer;
    text-align: left;

  }

  .select-project-item {
    display: inline-block;
    text-align: center;
    border-radius: 3px;
  }

  .drag-people-label {
    margin-bottom: 0;
    padding-right: 10px;
  }

  .drop-tag {
    background-color: rgba(64, 158, 255, .1);
    display: inline-block;
    padding: 0 10px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
    color: #fff;
    /* #409eff */
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid rgba(64, 158, 255, .2);
    white-space: nowrap;
  }

  .el-tag {
    color: #fff;
    border: 0px;
    font-size: 13px;
    background: #6495ed;
    background: linear-gradient(-135deg, transparent 8px, #6495ed 0) top right;
  }

  .box-style {
    background-color: #fff;
    color: #909399;
    height: 100%;
  }

  .insert-tag {
    padding: 0 10px;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: nowrap;
  }

  .analysisDropStyle .el-input-group__prepend {
    background-color: #ffffff;
    border: 0px solid;
    border-bottom: 0px solid #dcdfe6;
  }

  [v-cloak] {
    display: none;
  }
</style>
