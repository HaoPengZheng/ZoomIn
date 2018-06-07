<template>
  <div id="home">
    <el-container style="height:100%">
      <el-header>
        <div class="warp">
            <div class="left">Zoomin</div>
             <div class="nav center" >
              <el-menu
                  class="el-menu-demo" 
                  mode="horizontal"           
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#ffd04b"
                  v-bind:router="true"
                  >
                  <el-menu-item index="/data-import">
                    数据导入
                  </el-menu-item>
                  <el-menu-item index="/login">
                    数据处理
                  </el-menu-item>
                  <el-menu-item index="/login">
                    数据分析
                  </el-menu-item>
                  <el-menu-item index="/login">
                    数据挖掘
                  </el-menu-item>
                  <el-menu-item index="/login">
                    任务发布
                  </el-menu-item>
              </el-menu>
              </div>
              <div class="right">
                  <el-button type="info">登录</el-button>
             </div>
        </div>
      </el-header>
      <router-view></router-view>
    </el-container>
  </div>
</template>
<script>

export default {
  components:{
 
  }
}

</script>
<style>
  .warp{
    width:100%;
    margin:0 auto;
    display: flex;
    background-color: #545c64;
  }
  .left{
    flex: 0 1 300px;
  }
  .right{
     flex: 0 1 300px;
    display: flex;
    justify-content: flex-end;
  }
  .center{
    flex-grow: 1;
    justify-content: center;
    display: flex;

  }
  *{
    padding: 0;
    margin: 0;
  }
  html,body,#home{
    height: 100%;
  }
  .el-header{
    padding: 0px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-main {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
</style>