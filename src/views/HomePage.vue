<template>
    <div class = "body">
        <div class="header">
        <tabBar/>
        </div>

        <div class="screen">
        <ScreenPage/>
        </div>
    </div>

</template>

<script>

import ScreenPage from "@/views/ScreenPage.vue";
import tabBar from "@/components/tabBar.vue";

export default {
    name: "HomePage",
    components: {
        ScreenPage,
        tabBar
    },
}
</script>

<style scoped>
.header{
    height: 8%;
}
.screen{
    height: 92%;
}
.body{
    height: 100%;
}
</style>
