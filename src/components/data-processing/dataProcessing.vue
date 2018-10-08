  <template>
  <el-container>
    <Left :dataSetList="dataSetList" v-on:showDataSet="showDataSet">
    </Left>
    <el-container>
      <el-main>
        <el-tabs v-model="activeName" style="padding:0 50px">
          <el-tab-pane label="数据预览" name="first">
            <div>
              <el-row :gutter="20" style="text-align:left;padding-left:20px;margin-bottom: 0px;">

                <el-button type="text" @click="showFiltrate">
                  数据筛选
                  <i class="el-icon-arrow-down"></i>
                </el-button>
                <el-button type="text" @click="addNewField">
                  新增字段
                </el-button>
                <el-button type="primary" style="float:right;margin-right:20px" @click="saveAndGoDataAnalysis">下一步</el-button>
              </el-row>
              <el-row style="text-align:left;padding-left:10px">
                <div v-if="filtrateVisable">
                  <span style="font-size:14px">筛选方式：</span>
                  <el-radio v-model="filtrateType" label="1">条件筛选</el-radio>
                  <el-radio v-model="filtrateType" label="2">语句筛选</el-radio>
                </div>
                <el-row>
                  <div v-if="filtrateType=='1'&&filtrateVisable">
                    <ConditionFilter :keys="tableKeys" :keyTypes="tableKeysType"></ConditionFilter>
                  </div>
                  <div v-if="filtrateType=='2'&&filtrateVisable">
                    语句筛选内容
                  </div>
                </el-row>
                <div style="padding-top:30px;width:100%;margin:0 auto">
                  <div v-if="IsEmptyDataSet">
                    <EmptyTask>
                      <template slot="404Message">
                        <p>数据集列表空空如也！</p>
                        <p>请重新新建任务，再进行数据处理！</p>
                      </template>
                    </EmptyTask>
                  </div>
                  <wTable v-show="!IsEmptyDataSet"  :loading="tableLoading" :data="tableData" :header="tableKeys" :option="tableOption" :keyVisibilitys="keyVisibilitys" :types="tableKeysType" @changeHeaderName="changeHeaderName" @updateTableKeys="updateTableKeys" @updateTableTypes="updateTableTypes">
                    <el-table-column slot="fixed" fixed type="index" width="50">
                    </el-table-column>
                  </wTable>
                </div>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="字段设置" name="second">
            <div>
              <el-row :gutter="20" style="text-align:left;padding-left:20px;    margin-bottom: 0px;">
                <el-button type="text">
                  批量修改
                  <!-- <i class="el-icon-arrow-down"></i> -->
                </el-button>
                <el-button type="text" @click="dealwithNull">
                  空值处理
                </el-button>
              </el-row>
              <el-row>
                <BatchOperation :tableKeys="tableKeys" :tableKeysTypes="tableKeysType" :keyVisibilitys="keyVisibilitys" v-on:updateTableProperty="updateTableProperty"></BatchOperation>
              </el-row>
            </div>
          </el-tab-pane>
        </el-tabs>

      </el-main>
    </el-container>

    <el-dialog title="修改" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" label-width="80px">
        <el-form-item label="字段类型">
          <typeSelect v-model="newColumnType" :placeholder="`请选择`"></typeSelect>
        </el-form-item>
        <el-form-item label="字段名称">
          <el-input v-model="newColumnName" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="renewColumnName(e)">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="增加新字段" :visible.sync="addFieldDialogVisible" width="30%">
      <newFieldForm :fields="tableKeys" :types="tableKeysType"></newFieldForm>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addField">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>
  <script>
// 列拖拽尚未完成
// 样式需优化
// 改列名需要时间加载,有bug
// 拉取数据需判断有没有类型,否则自行判断
// 改列名,条件筛选中已选择的未自动改正

import Left from "../common/data_set_list.vue";
import ConditionFilter from "./ConditionFilter.vue";
import wTable from "../common/mytable.vue";
import BatchOperation from "./BatchOperation.vue";
import NewFieldForm from "./NewFieldForm.vue";
import typeSelect from "../common/typeSelect.vue";
import EmptyTask from "../common/EmptyTask"
export default {
  components: {
    Left,
    ConditionFilter,
    wTable,
    BatchOperation,
    NewFieldForm,
    typeSelect,
    EmptyTask
  },
  data() {
    return {
      taskId: 1,
      dataSetId: Number,
      dataSetList: [],
      tableData: [],
      tableKeys: [],
      show: true,
      filtrateType: "1",
      filtrateVisable: false,
      activeName: "first",
      dialogVisible: false,
      changeColumnIndex: 0,
      tableKeysType: ["#", "T", "d", "#", "T", "d", "#", "#"],
      keyVisibilitys: [true, true, true, true, true, true, true, true],
      newColumnName: "",
      newColumnType: "",
      tableOption: {
        border: true,
        maxHeight: 500
      },
      addFieldDialogVisible: false,
      tableLoading: true,
      IsEmptyDataSet: false
    };
  },

  created: function() {
    //保存当前页面menu的状态
    this.$store.commit("changeIndex", { index: "dataProcessing" });
    //this.$route.params.id接受参数
    this.dataSetId = this.$route.params.dataSetId;
    let query = this.fetchAllDataSet();
    query.then(response => {
      this.dataSetList = response;
      this.fetch();
    });
  },
  methods: {
    // 初始化数据，拉取表格数据，
    // 参数，data_set_id
    // 返回json
    fetch: function() {
      if (typeof this.dataSetId == "undefined") {
        if (
          this.dataSetList.length == 0 ||
          this.dataSetList[0].id == "undefined"
        ) {
          this.IsEmptyDataSet = true;
          return;
        }
        this.dataSetId = this.dataSetList[0].id;
      }
      if(this.IsEmptyDataSet){
        return;
      }
      this.$post("/task/dataProcessing/showDataSet1", {
        data_set_id: this.dataSetId
      })
        .then(response => {
          this.tableData = response.data.slice(0, 100);
          console.log(this.tableData);
          this.tableKeys = Object.keys(this.tableData[0]);
          console.log(this.tableKeys);
          if (this.tableKeys.length > 0) {
            this.$post("/task/dataProcessing/showDtypes", {
              data_set_id: this.dataSetId
            }).then(response => {
              // 用来存储字段类型
              var tableKeysTypes = [];
              // 将后端传回的字符串转换为Object
              var types = this.converterStringToType(response.data);
              // 匹配正确的key-value
              this.tableKeys.forEach(tablekey => {
                tablekey = tablekey.trim();
                console.log(types[tablekey]);
                tableKeysTypes.push(types[tablekey]);
              });
              this.tableKeysType = tableKeysTypes;
              console.log("now table keys type is ");
              console.log(this.tableKeysType);
              this.tableLoading = false;
            });
          }
        })
        .catch(response => {
          alert("获取数据失败");
        });
    },
    //条件筛选显示
    showFiltrate: function() {
      if (this.filtrateVisable === false) {
        this.filtrateVisable = true;
      } else {
        this.filtrateVisable = false;
      }
    },
    changeHeaderName: function(e) {
      this.changeColumnIndex = e.target.id;
      this.newColumnName = this.tableKeys[this.changeColumnIndex];
      this.newColumnType = this.tableKeysType[this.changeColumnIndex];
      this.dialogVisible = true;
    },
    //更新列名的方法
    renewColumnName: function() {
      if (
        this.tableKeysType[this.changeColumnIndex] == this.newColumnType &&
        this.tableKeys[this.changeColumnIndex] == this.newColumnName
      ) {
        alert("什么都没有改");
        return;
      }
      if (
        this.tableKeys.indexOf(this.newColumnName) >= 0 &&
        this.tableKeysType[this.changeColumnIndex] == this.newColumnType
      ) {
        alert("已存在名为:" + this.newColumnName + "的列名");
        return;
      }
      let oldKey = this.tableKeys[this.changeColumnIndex]; //旧的键值
      this.$set(this.tableKeys, this.changeColumnIndex, this.newColumnName);
      //set方法。数组更新，但是试图不更新的问题，遇到类似的可以使用vue.set为解决方案
      this.$set(this.tableKeysType, this.changeColumnIndex, this.newColumnType);

      // 为data重新赋值
      let newData = [];
      for (var i = 0; i < this.tableData.length; i++) {
        let objs = this.tableData[i];
        var o = new Object();
        for (var obj in objs) {
          if (obj == oldKey) {
            o[this.newColumnName] = objs[obj];
          } else {
            o[obj] = objs[obj];
          }
        }
        console.log(o);
        newData.push(o);
      }
      this.tableData = newData;
      this.tableKeys = Object.keys(this.tableData[0]);
      this.newColumnName = "";
      this.dialogVisible = false;
    },
    updateTableKeys: function(newKeys) {
      this.tableKeys = newKeys;
    },
    updateTableTypes: function(newTypes) {
      this.tableKeysType = newTypes;
    },
    fetchAllDataSet: function() {
      return this.$get("/dataSet/");
    },
    showDataSet: function(dataSetId) {
      // TODO 是否保存？
      this.dataSetId = dataSetId;
      this.tableLoading = true;
      this.fetch();
    },
    dealwithNull: function() {
      var c = confirm("是否删除所有空值的行？");
      if (c) {
        alert("删除成功");
      } else {
        alert("取消失败");
      }
    },
    updateTableProperty: function(
      oldTableKeys,
      oldTableKeysTypes,
      oldKeyVisibilitys,
      tableKeys,
      tableKeysTypes,
      keyVisibilitys
    ) {
      this.batchTableKey(oldTableKeys, tableKeys);
      this.tableKeys = [];
      this.tableKeys = tableKeys;
      this.tableKeysType = [];
      this.tableKeysType = tableKeysTypes;
      this.keyVisibilitys = keyVisibilitys;
    },

    batchTableKey: function(oldTableKeys, newTableKeys) {
      let newData = [];
      this.tableData.forEach(data => {
        var obj = new Object();
        for (var i = 0; i < oldTableKeys.length; i++) {
          obj[newTableKeys[i]] = data[oldTableKeys[i]];
        }
        newData.push(obj);
      });
      console.log(newData);
      this.tableData = newData;
    },

    // 增加新字段部分
    addNewField: function() {
      this.addFieldDialogVisible = true;
    },
    //新增字段如何在表格中正确的标识呢
    addField: function(fieldName, fieldType, expression) {
      let tableData = this.tableData;
      fieldName = "新增字段";
      fieldType = "#";
      tableData.forEach(data => {
        var xxcj;
        var zcj;
        var value;
        console.log(data);
        for (var key in data) {
          if (key == "笔试成绩") {
            xxcj = data[key];
          }
          if (key == "总成绩") {
            zcj = data[key];
          }
          value = xxcj + zcj;
        }

        data[fieldName] = value;
      });
      this.tableData = [];
      this.tableData = tableData;
      this.tableKeys.push(fieldName);
      this.tableKeysType.push(fieldType);
      this.keyVisibilitys.push(true);
      console.log(this.tableData);
      this.addFieldDialogVisible = false;
    },
    //数据处理后进入下一步、
    //todo:若不保存处理，应该删除处理的结果。。也就是用处理前的dataset
    saveAndGoDataAnalysis: function() {
      var c = confirm("是否保存处理结果？");
      if (c) {
        this.$router.push({
          name: "data-analysis",
          params: { dataSetId: this.dataSetId }
        });
      }
    },
    //用来处理数据类型返回值的一个方法
    converterStringToType: function(str) {
      if (str.startsWith("{")) {
        str = str.substring(1, str.length - 1);
      }
      var typeArr = str.split(",");
      var types = {};
      typeArr.forEach((typeString, index) => {
        var key = typeString.split(":")[0].trim();
        if (key.startsWith("'")) {
          key = key.substring(1, key.length - 1);
        }
        var value = typeString.split(":")[1].trim();
        if (value == "'object'") {
          value = "T";
        } else if (value == "datetime64[ns]") {
          value = "d";
        } else {
          value = "#";
        }
        types[key] = value;
      });
      return types;
    }
  }
};
</script>
  <style >
thead {
  line-height: 40px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
</style>
