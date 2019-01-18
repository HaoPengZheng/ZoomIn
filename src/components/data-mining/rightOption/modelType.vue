<template>
  <div>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo modelTypeStyle"
      @open="handleOpen"
      @close="handleClose"
      style="text-align: left;"
    >
      <el-submenu index="1">

        <template slot="title">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-27huiguiquxiantu"></use>
          </svg>
          <span>回归分析</span>
        </template>

        <el-menu-item-group>
          <el-menu-item index="1">
            <div>
              <el-radio v-model="radio" label="线性回归">线性回归</el-radio>
            </div>
          </el-menu-item>
        </el-menu-item-group>

        <el-menu-item-group>
          <el-menu-item index="2">
            <div>
              <el-radio v-model="radio" label="非线性回归">非线性回归</el-radio>
            </div>
          </el-menu-item>
        </el-menu-item-group>

      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-27huiguiquxiantu"></use>
          </svg>
          <span>聚类分析</span>
        </template>

        <el-menu-item-group>
          <el-menu-item index="1">
            <div>
              <el-radio v-model="radio" label="K-Means聚类">K-Means聚类</el-radio>
            </div>
          </el-menu-item>
        </el-menu-item-group>

        <el-menu-item-group>
          <el-menu-item index="2">
            <div>
              <el-radio v-model="radio" label="Mini Batch K-Means聚类">Mini Batch K-Means聚类</el-radio>
            </div>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shujuxiangguanxingfenxi1"></use>
          </svg>
          <span slot="title">相关性分析</span>
        </template>
      </el-submenu>

    </el-menu>
  </div>
</template>


<script>
  import Bus from '../Bus.js'

  export default {
    data() {
      return {
        radio: '线性回归'
      }
    },
    methods: {
      handleOpen(key, keyPath) {

      },
      handleClose(key, keyPath) {

      }
    },
    watch: {
      radio(val) {
        switch (val) {
          case '线性回归':
            Bus.$emit('modelParmsFlag', '线性回归')
            break;
          case '非线性回归':
            Bus.$emit('modelParmsFlag', '非线性回归')
            break;
          case 'K-Means聚类':
            Bus.$emit('modelParmsFlag', 'K-Means聚类')
            break;
          case 'Mini Batch K-Means聚类':
            Bus.$emit('modelParmsFlag', 'Mini Batch K-Means聚类')
            break;
          default:
            break;
        }

      }
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .modelTypeStyle {
    padding-left: 40px
  }

  .modelTypeStyle .el-submenu .el-menu-item {
    height: 35px;
    line-height: 35px;

  }

  .modelTypeStyle .el-submenu__icon-arrow {
    right: 280px;
    /* left: 0px; */
  }


</style>
