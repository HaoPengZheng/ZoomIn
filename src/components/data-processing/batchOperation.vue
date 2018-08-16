<template>
  <div class="margin-10">
    <div class="margin-10 floatR">
      <el-button type="primary" size="mini" @click="edit">
        <i class="el-icon-edit" v-show="!showEdit"></i>
        <i v-show="showEdit" class="el-icon-document  "></i>{{showEdit?" 保存 ":" 编辑 "}}</el-button>
    </div>

    <el-table align="center" :data="tableProperty" border style="width: 100%">
      <el-table-column align="center" prop="keyVisibility" label="显示" width="180">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.keyVisibility" :disabled="!showEdit">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="originKey" label="源文件列名" width="180">
        <template slot-scope="scope">
          <span v-show="!showEdit">{{scope.row.originKey}}</span>
          <el-input v-model="scope.row.originKey" v-show="showEdit" size="small "></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="tableKey" label="列名">
        <template slot-scope="scope">
          <span v-show="!showEdit">{{scope.row.tableKey}}</span>
          <el-input v-model="scope.row.tableKey" v-show="showEdit" size="small "></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="keyType" label="类型">
        <template slot-scope="scope">
          <span v-show="!showEdit">{{convertTypeForText(scope.row.keyType)}}</span>
          <el-select v-model="scope.row.keyType" placeholder="请选择字段类型"  v-show="showEdit" size="mini">
            <el-option v-for="item in dataTypeOption" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="keyDesc" label="描述">
        <template slot-scope="scope">
          <span v-show="!showEdit">{{scope.row.keyDesc}}</span>
          <el-input v-model="scope.row.keyDesc" v-show="showEdit" size="small "></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
export default {
  data() {
    return {
      showEdit: false,
      dataTypeOption: [
        { value: "#", label: "#数值类型" },
        { value: "T", label: "T文本类型" },
        { value: "d", label: "d时间类型" }
      ]
    };
  },
  props: {
    tableKeys: Array,
    tableKeysTypes: Array,
    keyVisibilitys: Array
  },
  computed: {
    tableProperty: function() {
      var tablePropertys = [];
      for (var i = 0; i < this.tableKeys.length; i++) {
        var tableProperty = {
          keyVisibility: this.keyVisibilitys[i],
          originKey: this.tableKeys[i],
          tableKey: this.tableKeys[i],
          keyType: this.tableKeysTypes[i],
          keyDesc: "属性描述"
        };
        tablePropertys.push(tableProperty);
      }
      console.log(tablePropertys);
      return tablePropertys;
    }
  },
  methods: {
    edit: function() {
      this.showEdit = !this.showEdit;
    },
    convertTypeForText: function(type) {
      const numberTypeText = "# 数值类型";
      const textTypeText = "T 字符类型";
      const dateTypeText = "d 时间类型";
      if (type == "#") {
        return numberTypeText;
      } else if (type == "T") {
        return textTypeText;
      } else {
        return dateTypeText;
      }
    }
  }
};
</script>
<style scoped>
.margin-20 {
  margin: 20px;
}
.margin-10 {
  margin: 10px;
}
.floatR{
  float: right ;
}
</style>
