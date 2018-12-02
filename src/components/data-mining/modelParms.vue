<template>
  <div>
    <el-row v-show="modelParmsFlag" class="modelParmsStyle">
      <el-col :span="12" style="text-align:left">
        <div class="el-input el-input-group el-input-group--prepend">
          <div class="el-input-group__prepend">数据划分比例</div>
          <el-input-number v-model="num1" :precision="2" :step="0.01" size="small" @change="testSizeChange"
                           :min="0" :max="0.99" label="描述文字"></el-input-number>
          <a style="color:#dcdfe6">（建议值：0.7~0.8）</a>
        </div>
      </el-col>

      <el-col :span="12" style="text-align:left">
        <div class="el-input el-input-group el-input-group--prepend">
          <div class="el-input-group__prepend">&nbsp;误差计算&nbsp;&nbsp;</div>
          <el-select v-model="value" placeholder="MSE(平均绝对误差)" size="small" @change="errorType">
            <el-option
              v-for="(item,index) in selValue"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>


    <!-- 非线性回归部分 -->
    <el-row v-show="!modelParmsFlag" class="modelParmsStyle">
      <el-col :span="10" style="text-align:left">
        <div class="el-input el-input-group el-input-group--prepend">
          <div class="el-input-group__prepend">数据划分比例</div>
          <el-input-number v-model="num1" :precision="2" :step="0.01" size="small" @change="testSizeChange"
                           :min="0" :max="0.99" label="描述文字"></el-input-number>
          <a style="color:#dcdfe6">（建议值：0.7~0.8）</a>
        </div>
      </el-col>

      <el-col :span="7" style="text-align:left">
        <div class="el-input el-input-group el-input-group--prepend">
          <div class="el-input-group__prepend">次数m</div>
          <el-input-number v-model="num2" size="small" @change="mthPowerChange" :min="2" :max="10"
                           label="描述文字"></el-input-number>
        </div>
      </el-col>

      <el-col :span="7" style="text-align:left">
        <div class="el-input el-input-group el-input-group--prepend">
          <div class="el-input-group__prepend">误差计算</div>
          <el-select v-model="value" placeholder="MSE(平均绝对误差)" size="small" @change="errorType">
            <el-option
              v-for="(item,index) in selValue"
              :key="index"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import Bus from './Bus.js'
  import _ from 'lodash';

  export default {
    data() {
      return {
        num1: 0.7,
        num2: 2,
        selValue: ['MSE(平均绝对误差)', 'MAE(均方误差)', 'RMSE(均方根误差)'],
        modelParmsFlag: true,
        value: ''
      };
    },
    methods: {
      testSizeChange: _.debounce(function () {
        Bus.$emit('test_size', this.num1)
      }, 500),
      // testSizeChange(value) {
      // _.debounce(function () {
      //   Bus.$emit('test_size', value)
      // },500);
      // },

      mthPowerChange: _.debounce(function () {
        Bus.$emit('mth_power', this.num2)
      }, 500),

      // mthPowerChange(value) {
      //   Bus.$emit('mth_power', value)
      // },

      errorType: _.debounce(function () {
        Bus.$emit('error_type', this.value)
      }, 500),

      // errorType(value) {
      //   Bus.$emit('error_type', value)
      // }
    },
    mounted() {
      Bus.$on('modelParmsFlag', (type) => {
        switch (type) {
          case '线性回归':
            this.modelParmsFlag = true
            break;
          case '非线性回归':
            this.modelParmsFlag = false
            break;
          default:
            break;
        }
      })
    }
  }
</script>

<style>
  .modelParmsStyle .el-input-group__prepend {
    background-color: #ffffff;
    border: 0px solid;
    /* border-bottom: 1px solid #dcdfe6;  */
  }
</style>
