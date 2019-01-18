<template>
  <div id="dragCon">
    <div class='people-content miningDropStyle'>
      <el-row>
        <el-col :span="15" style="margin-left:10px">
          <!-- 字段框 -->
          <div class="el-input el-input-group el-input-group--prepend">
            <div class="el-input-group__prepend">聚类字段</div>
            <div style="border-bottom: 1px solid #D0D0D0;height: 40px;text-align: left;margin-top:2px"
                 @drop='rowDrop($event)' @ondrop="removeDrop($event)" @dragover='allowDrop($event)'
                 @ondragstart="drag(event)">
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
        <el-col :span="3">
          <el-row>&nbsp;</el-row>
          <a style="color:#dcdfe6;margin-top:5px;font-size:15px">（可拖一至多个字段）</a>
        </el-col>

      </el-row>

      <el-row class="ClusterParmsStyle" style="margin-left:10px;margin-top:10px">

        <el-col :span="6" style="text-align:left">
          <div class="el-input el-input-group el-input-group--prepend">
            <div class="el-input-group__prepend">聚类数&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <el-input-number controls-position="right" v-model="num1" :step="1" size="small"
                             @change="clusterParmsChange" :min="0" :max="500" label="描述文字"></el-input-number>
          </div>
        </el-col>

        <el-col :span="6" style="text-align:left">
          <div class="el-input el-input-group el-input-group--prepend">
            <div class="el-input-group__prepend">迭代次数</div>
            <el-input-number controls-position="right" v-model="num2" :step="1" size="small"
                             @change="clusterParmsChange" :min="0" :max="500" label="描述文字"></el-input-number>
          </div>
        </el-col>

        <el-col :span="6" style="text-align:left">
          <div class="el-input el-input-group el-input-group--prepend">
            <div class="el-input-group__prepend">随机种子</div>
            <el-input-number controls-position="right" v-model="num3" :step="1" size="small"
                             @change="clusterParmsChange" :min="0" :max="500" label="描述文字"></el-input-number>
          </div>
        </el-col>

        <el-col :span="6" style="text-align:left">
          <div class="el-input el-input-group el-input-group--prepend">
            <div class="el-input-group__prepend">初始簇中心<br>迭代次数</div>
            <el-input-number controls-position="right" v-model="num4" :step="5" size="small"
                             @change="clusterParmsChange" :min="0" :max="500" label="描述文字"></el-input-number>
          </div>
        </el-col>

      </el-row>

      <el-row v-show="ClusterParmsFlag" class="ClusterParmsStyle" style="margin-left:10px;margin-top:10px">
        <el-col :span="6" style="text-align:left">
          <div class="el-input el-input-group el-input-group--prepend">
            <div class="el-input-group__prepend">采集样大小</div>
            <el-input-number controls-position="right" v-model="num5" :step="100" size="small"
                             @change="clusterParmsChange" :min="0" :max="500" label="描述文字"></el-input-number>
          </div>
        </el-col>
        <el-col :span="6" style="text-align:left">
          <div class="el-input el-input-group el-input-group--prepend">
            <div class="el-input-group__prepend">reassignment ration</div>
            <el-input-number controls-position="right" v-model="num6" :step="0.01" size="small"
                             @change="clusterParmsChange" :min="0" :max="500" label="描述文字"></el-input-number>
          </div>
        </el-col>
      </el-row>

      <!-- <el-row v-show="ClusterParmsFlag"  class="ClusterParmsStyle"  style="margin-left:10px;margin-top:10px">

          <el-col :span="4" style="text-align:left">
              <div class="el-input el-input-group el-input-group--prepend">
              <div class="el-input-group__prepend">聚类数</div>
              <el-input-number controls-position="right"  v-model="num1" :precision="2" :step="0.01" size="small" @change="testSizeChange(num1)" :min="0" :max="0.99" label="描述文字"></el-input-number>
              </div>
          </el-col>

          <el-col :span="4" style="text-align:left">
              <div class="el-input el-input-group el-input-group--prepend">
              <div class="el-input-group__prepend">采集样大小</div>
              <el-input-number controls-position="right"  v-model="num5" :precision="2" :step="0.01" size="small" @change="testSizeChange(num1)" :min="0" :max="0.99" label="描述文字"></el-input-number>
              </div>
          </el-col>

          <el-col :span="4" style="text-align:left">
              <div class="el-input el-input-group el-input-group--prepend">
              <div class="el-input-group__prepend">迭代次数</div>
              <el-input-number controls-position="right"  v-model="num2" :precision="2" :step="0.01" size="small" @change="testSizeChange(num1)" :min="0" :max="0.99" label="描述文字"></el-input-number>
              </div>
          </el-col>

          <el-col :span="4" style="text-align:left">
              <div class="el-input el-input-group el-input-group--prepend">
              <div class="el-input-group__prepend">随机种子</div>
              <el-input-number controls-position="right"  v-model="num3" :precision="2" :step="0.01" size="small" @change="testSizeChange(num1)" :min="0" :max="0.99" label="描述文字"></el-input-number>
              </div>
          </el-col>

          <el-col :span="4" style="text-align:left">
              <div class="el-input el-input-group el-input-group--prepend">
              <div class="el-input-group__prepend">初始簇中心<br>迭代次数</div>
              <el-input-number controls-position="right"  v-model="num4" :precision="2" :step="0.01" size="small" @change="testSizeChange(num1)" :min="0" :max="0.99" label="描述文字"></el-input-number>
              </div>
          </el-col>

          <el-col :span="4" style="text-align:left">
              <div class="el-input el-input-group el-input-group--prepend">
              <div class="el-input-group__prepend">reassignment<br>ration</div>
              <el-input-number controls-position="right"  v-model="num6" :precision="2" :step="0.01" size="small" @change="testSizeChange(num1)" :min="0" :max="0.99" label="描述文字"></el-input-number>
              </div>
          </el-col>

      </el-row> -->

    </div>


  </div>


</template>

<script>
  import Bus from './Bus.js';
  import _ from 'lodash';

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
        ClusterParmsFlag: false,
        category: 13,
        num1: 3,
        num2: 300,
        num3: 80,
        num4: 10,
        num5: 100,
        num6: 0.01
      }
    },
    mounted() {
      Bus.$on('yAixsFail', (e) => {
        this.dropCol.pop()
      }),
        Bus.$on('modelParmsFlag', (type) => {
          switch (type) {
            case 'K-Means聚类':
              // this.mth_power = 0
              this.category = 13
              this.ClusterParmsFlag = false
              this.clusterParmsChange()
              break;
            case 'Mini Batch K-Means聚类':
              // if(this.mth_power==0)this.mth_power = 2
              this.category = 14
              this.ClusterParmsFlag = true
              this.clusterParmsChange()
              break;
            default:
              break;
          }


          this.tableVisible = false
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
        // if(this.dropRow.length > 1){
        //     this.$message({
        //         message: '只允许有一个维度',
        //         showClose: true,
        //         type: 'warning',
        //         duration:1000
        //     });
        //     this.dropRow.pop()
        //     return;
        // }
        // var element = document.createElement("div");
        // element.setAttribute("id", "row-" + data);
        // element.setAttribute("class","drop-tag");
        // element.setAttribute("draggable", true);
        // //element.setAttribute("ondragstart", "drag(event)");
        // //element.setAttribute("onclick","liClick")
        // var text = document.createTextNode(data);
        // // alert(data);
        // element.appendChild(text);
        // ev.target.appendChild(element);
        //给echarts组件发名字
        // Bus.$emit('rowdata', data)
        // if(this.dropRow &&this.dropCol)Bus.$emit('featureConfigurationFlag',true)
        this.clusterParmsChange()

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
        //Bus.$emit('rowdataRemove', tag);
        this.dropRow.splice(this.dropRow.indexOf(tag), 1);
      },
      colRemove(tag) {
        Bus.$emit('coldataRemove', tag)
        this.dropCol.splice(this.dropCol.indexOf(tag), 1);
      },
      summationType() {//没用等删
        Bus.$emit('summation', 'summationType')
      },
      addRowClick() {
        this.axisFlag = true;
        this.addIconFlag = false
      },
      removeRowClick() {
        this.axisFlag = false;
        this.addIconFlag = true;
        // if(yAxisIndex)
      },
      // clusterParmsChange() {
      //   let clusterParms = {
      //     "category": this.category,
      //     "Datacsv_list": this.dropRow,    //聚类轴的值
      //     "k_clustering": this.num1,       //聚类数
      //     "max_iter": this.num2,           //迭代次数
      //     "random_state": this.num3,       //随机种子
      //     "n_init": this.num4,             //初始簇中心迭代次数
      //     "batch_size": this.num5,         //采集样大小
      //     'reassignment_ratio': this.num6  //reassignment ration
      //   };
      //   Bus.$emit('getClusterParms', clusterParms)
      // }
      clusterParmsChange: _.debounce(function () {
        let clusterParms = {
          "category": this.category,
          "Datacsv_list": this.dropRow,    //聚类轴的值
          "k_clustering": this.num1,       //聚类数
          "max_iter": this.num2,           //迭代次数
          "random_state": this.num3,       //随机种子
          "n_init": this.num4,             //初始簇中心迭代次数
          "batch_size": this.num5,         //采集样大小
          'reassignment_ratio': this.num6  //reassignment ration
        };
        Bus.$emit('getClusterParms', clusterParms)
      },500)
    }
  }
</script>

<style>
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
    color: #409eff;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid rgba(64, 158, 255, .2);
    white-space: nowrap;
  }

  .el-tag {
    font-size: 13px
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

  .miningDropStyle .el-input-group__prepend {
    background-color: #fff;
    border: 0px solid;
    /* border-bottom: 1px solid #dcdfe6;  */

  }

  [v-cloak] {
    display: none;
  }

  .ClusterParmsStyle .el-input-group__prepend {
    background-color: #ffffff;
    border: 0px solid;
    margin: 5px
    /* border-bottom: 1px solid #dcdfe6;  */
  }
</style>
