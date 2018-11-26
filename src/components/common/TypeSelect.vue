<template>
  <el-select v-model="value" @input="$emit('input',value)" :placeholder="placeholder" :size="size">
    <el-option v-for="item in dataTypeOption" :key="item.value" :label="item.label" :value="item.value">
      <svg class="icon" aria-hidden="true" style="margin-right:20px">
        <use :xlink:href="$utils.showTypesUi(item.value)"></use>
      </svg>
      {{item.label}}
    </el-option>
  </el-select>
</template>

<script>
import { TYPECONVERTER } from "@/utils/common.js";
export default {
  data() {
    return {
      dataTypeOption: [
        { value: "float64", label: "数值类型" },
        { value: "object", label: "文本类型" },
        { value: "datetime64[ns]", label: "时间类型" }
      ]
    };
  },
  props: {
    value: "",
    size: "",
    placeholder: ""
  }
};
</script>
<style>
</style>
