<template>
  <el-row :gutter="10" class="margin-20">
    <el-col :span="3">
      <el-select v-model="conditionKey" @change="keychange" placeholder="请选择" size="mini">
        <el-option v-for="item in keys" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="2">
      <el-select v-model="operator" @change="updateItem" placeholder="运算符" size="mini">
        <el-option v-for="item in operatorOption" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="4">
      <el-input @change="updateItem" size="mini" placeholder="请输入内容" width="10px" v-model="val">
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-button type="text" class="icon-btn" @click="$emit('addItem')" v-if="end">
        <i class="el-icon-plus"></i>
      </el-button>
      <el-button type="text" class="icon-btn" @click="$emit('removeItem',item)" :class="{'noEndItem':!end}">
        <i class="el-icon-minus"></i>
      </el-button>
      <el-button size="mini" v-if="end" @click="$emit('filterData')">确定</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    keys: Array, //表头KEYS
    item: Object, //
    count: Number, //用故意判断是否是最后一个的
    end: Boolean,
    keyTypes: Array //字段类型
  },
  data() {
    return {
      oldKeys: [], //旧的键值，需要优化watch
      conditionKey: "",
      operator: "",
      numberOperatorOption: [
        {
          value: "==",
          label: "等于"
        },
        {
          value: ">",
          label: "大于"
        },
        {
          value: "<",
          label: "小于"
        },
        {
          value: ">=",
          label: "大于等于"
        },
        {
          value: "<=",
          label: "小于等于"
        }
      ],
      textOperatorOption: [
        {
          value: "contains",
          label: "包含"
        },
        {
          value: "notContains",
          label: "不包含"
        },
        {
          value: "notNull",
          label: "不为空"
        }
      ],
      operatorOption: "",
      val: ""
    };
  },
  methods: {
    //发送过滤请求后的初始化方法。
    init:function(){
      this.conditionKey = "";
      this.operator = "";
      this.val = "";
    },
    keychange: function() {
      this.updateItem();
      if (this.getKeyType() == "float64") {
        this.operatorOption = this.numberOperatorOption;
      } else {
        this.operatorOption = this.textOperatorOption;
      }
    },
    updateItem: function() {
      //更新条件过滤的选项
      let field_type = "1";
      if (this.getKeyType() == "float64") {
        field_type = "0";
      }
      this.$emit(
        "updateItemData",
        field_type,
        this.item.index,
        this.conditionKey,
        this.operator,
        this.val
      );
    },
    getKeyType: function() {
      let index = this.keys.indexOf(this.conditionKey);
      return this.keyTypes[index];
    }
  },
  watch: {
    // 更新表头时同时更新键值，有可优化的余地，涉及知识点，深度拷贝。
    keys: {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        if (this.oldKeys.length == 0) {
          this.oldKeys = newValue.slice(0);
          return;
        }
        if (this.oldKeys.indexOf(this.conditionKey) < 0) {
          return;
        } else {
          let index = this.oldKeys.indexOf(this.conditionKey);
          this.conditionKey = newValue[index];
          this.oldKeys = newValue.slice(0);
        }
      }
    },
    keyTypes: {
      immediate: true,
      handler(newValue) {
        this.keychange();
        this.operator = "";
      }
    }
  }
};
</script>

<style>
.noEndItem {
  margin-left: 33px !important;
}
.margin-20{
  margin: 20px;
}
</style>
