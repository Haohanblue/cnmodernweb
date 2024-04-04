<template>
    <div style="width: 100%">
        <el-row>
            <el-col :span="10" :offset="14">
                <el-tabs class="demo-tabs" @tab-click="handleTabClick" stretch>
                    <el-tab-pane label="首页" name="screen" ></el-tab-pane>
                    <el-tab-pane label="排行" name="billboard"></el-tab-pane>
                    <el-tab-pane label="成就" name="achievement" ></el-tab-pane>
                    <el-tab-pane label="时间轴" name="timeline" ></el-tab-pane>
                    <el-tab-pane label="数据" name="data" ></el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>

    </div>

</template>

<script>
export default {
    name: "tabBar",
    methods: {
        handleTabClick(tab) {
            this.goTo(tab.name);
        },
        goTo(routeName) {
            if (this.$route.path !== '/' + routeName) {
                this.$router.push({ path: '/' + routeName });
            }
        }
    }
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
