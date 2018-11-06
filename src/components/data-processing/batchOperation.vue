<template>
  <div class="margin-10">
    <div class="margin-10 floatR">
      <el-button type="primary" size="mini" @click="editOrSave">
        <i class="el-icon-edit" v-show="!showEdit"></i>
        <i v-show="showEdit" class="el-icon-document "></i>{{showEdit?" 保存 ":" 编辑 "}}</el-button>
    </div>

    <el-table align="center" :data="tablePropertysForTable" border style="width: 100%">
      <el-table-column align="center" prop="keyVisibility" label="显示" width="180">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.keyVisibility" :disabled="!showEdit">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="originKey" label="源文件列名" width="180">
        <template slot-scope="scope">
          <span v-show="!showEdit">{{scope.row.originKey}}</span>
          <el-input v-model="scope.row.originKey" v-show="showEdit" size="small " disabled></el-input>
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
          <span v-show="!showEdit">
            <svg class="icon" aria-hidden="true" style="margin-right:20px">
              <use :xlink:href="$utils.showTypesUi(scope.row.keyType)"></use>
            </svg>
            {{TYPECONVERTER.convertTypeForText(scope.row.keyType)}}
          </span>
          <typeSelect v-model="scope.row.keyType" :placeholder="scope.row.keyType" v-show="showEdit" :size="`mini`" ></typeSelect>
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
import typeSelect from "../common/typeSelect.vue";
import {TYPECONVERTER} from "@/utils/common.js";
export default {
  components:{
    typeSelect
  },
  data() {
    return {
      showEdit: false,
      TYPECONVERTER:TYPECONVERTER
    };
  },
  props: {
    tablePropertys:Object,
  },
  computed: {
    tablePropertysForTable: function() {
      var tablePropertys = [];
      for (let key in this.tablePropertys) {
        var tableProperty = this.tablePropertys[key];
        tablePropertys.push(tableProperty);
      };
      return tablePropertys;
    }
  },
  methods: {
    editOrSave: function() {
      if (this.showEdit) {
        this.updateTableProperty();
      }
      this.showEdit = !this.showEdit;
    },
    updateTableProperty: function() {
      this.$emit(
        "updateTableProperty",
        this.tablePropertys,
        this.tablePropertysForTable
      );
    }
  }
};
</script>
<style scoped>
.cell{
  line-height: 40px!important;
}
.margin-20 {
  margin: 20px;
}
.margin-10 {
  margin: 10px;
}
.floatR {
  float: right;
}
</style>
