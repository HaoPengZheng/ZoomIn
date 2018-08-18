<template>
  <el-form ref="addFieldForm">
    <el-form-item>
      <el-input v-model="newFieldName" placeholder="字段名称"></el-input>
    </el-form-item>
    <el-form-item>
      <el-select v-model="newFieldType" placeholder="字段类型" style="width:100%;">
        <el-option v-for="item in dataTypeOption" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-input type="textarea" :rows="2" placeholder="SUM[A]+SUM[B]" v-model="textarea" resize="none">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-row class="tac" > 
        <el-col :span="12">
          <h5 style="text-align:center">函数</h5>
          <el-menu default-active="1" style="max-height:200px;" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">substr</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">add</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <span slot="title">pow</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">log</span>
            </el-menu-item>
             <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">log</span>
            </el-menu-item>
             <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">log</span>
            </el-menu-item>
             <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">log</span>
            </el-menu-item>
             <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">log</span>
            </el-menu-item>
             <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">log</span>
            </el-menu-item>
            
          </el-menu>
        </el-col>
        <el-col :span="12">
          <h5 style="text-align:center">字段</h5>
          <el-menu default-active="1" style="text-align:center;border:0px">
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title">导航一</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
</template>
<script>
export default {};
</script>

<style <style lang="scss" scoped>

</style>
>
</style>

