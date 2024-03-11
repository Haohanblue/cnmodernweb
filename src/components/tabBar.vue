<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">首页</el-menu-item>
            <el-submenu index="2">
                <template slot="title">排行</template>
                <el-menu-item index="2-1">人口规模巨大的现代化</el-menu-item>
                <el-menu-item index="2-2">共同富裕的现代化</el-menu-item>
                <el-menu-item index="2-3">物质文明与精神文明相协调的现代化</el-menu-item>
                <el-menu-item index="2-4">人与自然和谐共生的现代化</el-menu-item>
                <el-menu-item index="2-5">走和平发展道路的现代化</el-menu-item>
            </el-submenu>
            <el-menu-item index="3" >成果展示</el-menu-item>
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
