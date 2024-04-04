<template>
    <div id="app">
        <div class="header">
            <tabBar></tabBar>
        </div>
        <router-view class="main"></router-view>
        <div>
            <Footer></Footer>
        </div>
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
.footer{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
}
</style>

<script setup>
import TabBar from "@/components/tabBar.vue";
import Footer from "@/components/footer.vue";
</script>
