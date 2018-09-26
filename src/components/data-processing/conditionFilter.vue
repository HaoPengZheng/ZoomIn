<template>
  <div class="condition-warp">
    <el-row>
      <span class="condition-text">满足下列:</span>
      <el-select v-model="conditionType" placeholder="请选择" size="mini">
        <el-option v-for="item in conditionTypeOption" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-row>
    <el-row :gutter="10" style="    margin-bottom: -10px;">
      <ConditionItem :ref="'item'+index" :keys="keys" v-for="(value,index) in itemCount" :key="value.index" :keyTypes="keyTypes" :end="index+1==itemCount.length" :count="itemCount.length" :item="value" v-on:addItem="addItem" v-on:removeItem="removeItem" v-on:updateItemData="updateItemData" v-on:filterData="sendfilterData"></ConditionItem>
    </el-row>

  </div>
</template>

<script>
import ConditionItem from "./ConditionItem.vue";

export default {
  components: {
    ConditionItem
  },
  props: {
    keys: Array,
    keyTypes: Array
  },
  data() {
    return {
      conditionType: "",
      conditionTypeOption: [
        {
          value: "&",
          label: "全部条件"
        },
        {
          value: "|",
          label: "任意条件"
        }
      ],
      itemCount: [
        {
          value: "",
          index: 1
        }
      ],
      filterData: [],
      filterItem: {
        key: "",
        operator: "",
        val: ""
      },
      filterPost: Object
    };
  },
  methods: {
    addItem: function() {
      this.itemCount.push({
        value: "",
        index: this.itemCount.length + 1
      });
    },
    removeItem: function(item) {
      if (this.itemCount.length > 1) {
        this.itemCount.splice(this.itemCount.indexOf(item), 1);
      } else {
        this.$message({
          message: "再删就没了！",
          type: "warning"
        });
      }
    },
    //更新数据
    updateItemData: function(field_type, index, key, operator, val) {
      let filterItem = new Object();
      filterItem.field_type = parseInt(field_type);
      if (!isNaN(key)) {
        key = key.toString();
      }
      filterItem.field_name = key;
      filterItem.filter_method = operator;
      filterItem.filter_obj = val;
      if (this.filterData.length < index) {
        this.filterData.push(filterItem);
      } else {
        this.filterData[index - 1] = filterItem;
      }
      console.log(this.filterData);
      this.filterPost.data_set_id = "24";
      this.filterPost.logical_type = this.conditionType;
      this.filterPost.filter = this.filterData;
    },
    //确定过滤数据
    sendfilterData: function() {
      alert("发送过滤请求");
      this.$axios
        .post(
          "http://120.79.146.91:8000/task/dataProcessing/filters",
          {
            data_set_id: "26",
            logical_type: this.conditionType,
            filter: this.filterData
          },
          {
            headers: {
              Authorization: "JWT " + localStorage.getItem("token")
            }
          }
        )
        .then(response => {
          console.log(response);
        })
        .catch(response => {
          alert("error");
        });
    }
  }
};
</script>

<style>
.condition-warp {
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #f3f3f3;
  width: 100%;
  min-height: 100px;
}
.condition-text {
  padding: 0 8px 0 0;
  font-size: 14px;
  color: #777;
}
.icon-btn {
  color: #777;
  font-size: 16px;
  line-height: 26px;
  padding: 0 !important;
}
.icon-btn:hover {
  color: red;
}
</style>

