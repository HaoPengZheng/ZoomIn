<template>
  <el-container>
    <Left>
    </Left>
    <el-container>
      <el-main style="margin-top:20px;padding:0 10%;">
        <div class="task-title">
          <div class="task-title-name">
            任务名
          </div>
          <div class="task-title-new">
            <el-button type="primary" icon="el-icon-picture" @click="newChartDialogVisible=true">新建图表</el-button>
          </div>
          <div style="clear:both"></div>
        </div>
        <el-row :gutter="20">
          <el-col :span="12">
            <MyChart :domId="'id1'" :option="option"></MyChart>
          </el-col>
          <el-col :span="12">
            <MyChart :domId="'id2'" :option="option2"></MyChart>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <MyChart :domId="'id3'" :option="option3"></MyChart>
          </el-col>
          <el-col :span="12">
            <MyChart :domId="'id4'" :option="option4"></MyChart>
          </el-col>
        </el-row>
      </el-main>
    </el-container>


    <el-dialog title="新建图表-选择数据源" :visible.sync="newChartDialogVisible" width="30%">
      <el-form :model="newChartModel" ref="newChartModel" :rules="chartModelRules" status-icon label-width="80px" class="demo-ruleForm" label-position="left" @keyup.native="submitTask($event)">
        <el-form-item label="数据集名" prop="dataSetTitle">
          <el-input type="text" v-model="newChartModel.dataSetTitle"></el-input>
        </el-form-item>
        <el-form-item label="数据源" prop="IsChooseHistory">
          <el-radio-group v-model="newChartModel.IsChooseHistory" @change="watchChoose">
            <el-radio :label="true">历史数据集</el-radio>
            <el-radio :label="false">新建数据集</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="newChartModel.IsChooseHistory" label="数据集" prop="historyDataSet">
          <el-input v-model="newChartModel.historyDataSet" v-show="false"></el-input>
          <el-select v-model="newChartModel.historyDataSet" placeholder="请选择数据集">
            <el-option :label="`ssssss`" :value="1">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="!newChartModel.IsChooseHistory" label="数据集">
          <input type="file" ref="obj" @change="importFile()" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newChartDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="nextStep()">下一步</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新建图表-任务设置" :visible.sync="newChartTaskDialogVisible" width="30%">
      <el-form :model="newTaskModel" status-icon :rules="rules2" label-width="80px" class="demo-ruleForm" label-position="left" @keyup.native="submitTask($event)">
        <el-form-item label="任务名" prop="taskName">
          <el-input type="text" v-model="newTaskModel.taskName"></el-input>
        </el-form-item>
        <el-form-item label="任务属性" prop="taskProperty">
          <el-input type="text" v-model="newTaskModel.taskProperty"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="creator">
          <el-input type="text" v-model="newTaskModel.creator"></el-input>
        </el-form-item>
        <el-form-item label="任务描述" prop="taskDesc">
          <el-input type="textarea" v-model="newTaskModel.taskDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newChartTaskDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="nextStep()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 数据预览模态框 -->
    <el-dialog :visible.sync="tablePreviewVisable" width="50%" title="数据预览" top="5vh">
      <preview-table :json="tablejsons" v-on:setTitleIndex="setTitleIndex"></preview-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="tablePreviewVisable = false">取 消</el-button>
        <el-button type="primary" @click="tablePreviewVisable=false;newChartTaskDialogVisible=true">下一步</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>
<script>
import Left from "../common/task_left.vue";
import MyChart from "./mychart.vue";
import PreviewTable from "../data-import/PrviewTable";
import Papa from "papaparse";
import {
  converterTwoDimArrayToObjectArray,
  converterFileToJson,
  importf
} from "@/utils/fileToJson.js";
import validateObj from "@/utils/validate.js";
export default {
  components: {
    Left,
    MyChart,
    PreviewTable
  },
  created: function() {
    this.$store.commit("changeIndex", { index: "taskRelease" });
  },
  data() {
    return {
      taskId: "",
      newChartDialogVisible: false,
      newChartTaskDialogVisible: false,
      tablePreviewVisable: false,
      newChartModel: {
        dataSetTitle: "",
        IsChooseHistory: true,
        historyDataSet: ""
      },
      newTaskModel: {
        taskName: "",
        taskProperty: "",
        creator: "",
        taskDesc: ""
      },
      tablejsons: "",
      titleIndex: 0,
      chartModelRules: {
        dataSetTitle: [
          { validator: validateObj.validateTitle, trigger: "change" }
        ],
        historyDataSet: [
          {
            validator: validateObj.validateNoNullOrUndefined,
            trigger: "change"
          }
        ]
      },
      // 图表option，暂时无用
      option: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line"
          }
        ]
      },
      option2: {
        title: {
          text: "某地区蒸发量和降水量",
          subtext: "纯属虚构"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["蒸发量", "降水量"]
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "0月",
              "12月"
            ]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "蒸发量",
            type: "bar",
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              6.4,
              3.3
            ],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          },
          {
            name: "降水量",
            type: "bar",
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0,
              2.3
            ],
            markPoint: {
              data: [
                { name: "年最高", value: 182.2, xAxis: 7, yAxis: 183 },
                { name: "年最低", value: 2.3, xAxis: 11, yAxis: 3 }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      },
      option3: {
        title: {
          text: "某站点用户访问来源",
          subtext: "纯属虚构",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      option4: {
        backgroundColor: "#2c343c",

        title: {
          text: "Customized Pie",
          left: "center",
          top: 20,
          textStyle: {
            color: "#ccc"
          }
        },

        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 274, name: "联盟广告" },
              { value: 235, name: "视频广告" },
              { value: 400, name: "搜索引擎" }
            ].sort(function(a, b) {
              return a.value - b.value;
            }),
            roseType: "radius",
            label: {
              normal: {
                textStyle: {
                  color: "rgba(255, 255, 255, 0.3)"
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: "rgba(255, 255, 255, 0.3)"
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            itemStyle: {
              normal: {
                color: "#c23531",
                shadowBlur: 200,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },

            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function(idx) {
              return Math.random() * 200;
            }
          }
        ]
      }
    };
  },
  methods: {
    fetchTaskById: function() {
      this.$axios.post("");
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    nextStep: function() {
      this.$refs.newChartModel.validate(vaild => {
        if (vaild) {
          if (
            !this.newChartModel.IsChooseHistory &&
            this.$refs.obj.value == ""
          ) {
            this.$message({
              message: "请选择数据源！",
              type: "warning",
              duration: 1500
            });
          } else {
            this.newChartDialogVisible = false;
            if (this.newChartModel.IsChooseHistory) {
              this.newChartTaskDialogVisible = true;
            } else {
              this.tablePreviewVisable = true;
            }
          }
        }
      });
    },
    importFile: function() {
      let obj = this.$refs.obj;
      let filetype = obj.value.substring(
        obj.value.lastIndexOf("."),
        obj.value.length
      );
      let _this = this;
      if (filetype == ".csv") {
        var file = obj.files[0];
        Papa.parse(file, {
          complete: function(results) {
            _this.tablejsons = converterTwoDimArrayToObjectArray(results.data);
            console.log(_this.tablejsons);
          }
        });
      } else {
        let jsonPromise = converterFileToJson(obj);
        jsonPromise.then(data => {
          this.tablejsons = data;
        });
      }
    },
    //设置表头
    setTitleIndex: function(index) {
      this.titleIndex = index;
    },
    createDataSet: function() {},
    watchChoose:function(){
      if(!this.newChartModel.IsChooseHistory){
        this.$refs.newChartModel.clearValidate();
      }
    }
  },
};
</script>

<style>
.task-title {
  border-bottom: 2px solid #ccc;
  padding-bottom: 5px;
  margin-bottom: 20px;
}
.task-title-new {
  float: right;
}
.task-title-name {
  float: left;
  line-height: 42px;
  font-size: 20px;
  font-weight: 550;
  color: #1f2f3d;
  font-family: "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
</style>

