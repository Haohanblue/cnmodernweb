<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">首页</el-menu-item>
            <el-submenu index="2">
                <template slot="title">排行</template>
            </el-submenu>
            <el-menu-item index="3" >成就</el-menu-item>
            <el-menu-item index="4" >数据</el-menu-item>

        </el-menu>

    </div>
</template>

<script>
export default {
    name: "tabBar"
}
</script>

<style scoped>

</style>
