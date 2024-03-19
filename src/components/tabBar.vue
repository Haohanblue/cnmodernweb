<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="首页" name="first"></el-tab-pane>
    <el-tab-pane label="排行" name="second"></el-tab-pane>
    <el-tab-pane label="成就" name="third"></el-tab-pane>
    <el-tab-pane label="数据" name="fourth"></el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
    name: "tabBar"
}
</script>

<style  scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

</style>
