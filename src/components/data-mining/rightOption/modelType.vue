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
                <svg class="icon" aria-hidden="true"><use xlink:href="#icon-27huiguiquxiantu"></use></svg>
                <span>回归分析</span>
                </template>

                <el-menu-item-group >
                <el-menu-item index="1">
                    <div><el-radio v-model="radio" label="1">线性回归</el-radio></div>
                </el-menu-item>
                </el-menu-item-group>
                
                <el-menu-item-group>
                <el-menu-item index="2">
                    <div><el-radio v-model="radio" label="2">非线性回归</el-radio></div>
                </el-menu-item>
                </el-menu-item-group>

            </el-submenu>


            <el-menu-item index="2">
                <svg class="icon" aria-hidden="true"><use xlink:href="#icon-shujuxiangguanxingfenxi1"></use></svg>
                <span slot="title">相关性分析</span>
            </el-menu-item>
            <el-menu-item index="3">
                <svg class="icon" aria-hidden="true"><use xlink:href="#icon-cluster-analysis"></use></svg>
                <span slot="title">聚类分析</span>
            </el-menu-item>
            </el-menu>
    </div>
</template>


<script>
import Bus from '../Bus.js'
  export default {
      data(){
          return{
              radio: '1'
          }
        },
        methods: {
        handleOpen(key, keyPath) {
           
        },
        handleClose(key, keyPath) {
            
            }
        },
        watch:{
            radio(val){
                if(val==1)Bus.$emit('modelParmsFlag',true)  
                if(val==2)Bus.$emit('modelParmsFlag',false)  
            }
        }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.modelTypeStyle{
padding-left:40px
}
.modelTypeStyle .el-submenu .el-menu-item{
    height: 35px;
    line-height: 35px;

}

.modelTypeStyle .el-submenu__icon-arrow{
    right: 280px;
    /* left: 0px; */
}


</style>