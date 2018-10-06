<template>
  <el-select v-model="type" @input="$emit('input',type)" :placeholder="placeholder" :size="size">
    <el-option v-for="item in dataTypeOption" :key="item.value" :label="item.label" :value="item.value">
      <svg class="icon" aria-hidden="true" style="margin-right:20px">
        <use :xlink:href="$utils.showTypesUi(item.value)"></use>
      </svg>
      {{item.label}}
    </el-option>
  </el-select>
</template>

<script>
export default {
  // 自定义组件的 v-model
  data() {
    return {
      dataTypeOption: [
        { value: "#", label: "数值类型" },
        { value: "T", label: "文本类型" },
        { value: "d", label: "时间类型" }
      ],
      type:"",
    };
  },
  props: {
    value: "",
    size: "",
    placeholder: ""
  },
  created: function() {
    this.type = this.value;
  },

};
</script>
<style>
</style>
