<template>
    <div id="app">
        <div class="header">
            <tabBar></tabBar>
        </div>
        <router-view class="main"></router-view>
    </div>
</template>

<style>
.app{
    height: 100%;
}
.header{
    height: 5%;
    display: flex;
    justify-content: left;
    align-items: center;
}

</style>

<script setup>
import TabBar from "@/components/tabBar.vue";
</script>