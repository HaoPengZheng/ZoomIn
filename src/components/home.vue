<template>
  <div id="home">
    <el-container style="height:100%">
      <el-header>
        <div class="warp">
            <div class="left">
              <span class="logo">
                Zoomin
              </span>    
            </div>
             <div class="nav center" >
              <el-menu
                  mode="horizontal"           
                  background-color="#00c587"
                  text-color="#fff"
                  active-text-color="#ffd04b"
                  v-bind:router="true"
                  >
                  <el-menu-item index="/data-import">
                    数据导入
                  </el-menu-item>
                  <el-menu-item index="/">
                    数据处理
                  </el-menu-item>
                  <el-menu-item index="/">
                    数据分析
                  </el-menu-item>
                  <el-menu-item index="/">
                    数据挖掘
                  </el-menu-item>
                  <el-menu-item index="/">
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
.nav{
  min-width: 600px;
}
  .warp{
    width:100%;
    margin:0 auto;
    display: flex;
    background-color: #00c587;
  }
  .left{
    flex: 0 1 200px;
  }
  .right{
     flex: 0 1 200px;
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
 
  .el-main {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 160px;
    min-width: 650px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  .logo{
    line-height: 60px;
    padding-left: 20px;
    font-weight: 500;
    color: #fff;
  }
  
</style>