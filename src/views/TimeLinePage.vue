<template>
<div class="pageall">
    <TimelineComponent></TimelineComponent>
</div>
</template>

<script>
import TimelineComponent from "@/components/TimeLine/TimelineComponent.vue";

export default {
    name: "TimeLinePage",
    components: {TimelineComponent}
}
</script>

<style scoped>
.pageall{
    height: 93%;
    background-size: cover; /* 或者使用其他值来适配你的设计需求 */
    background-position: center center;
    background-repeat: no-repeat;
    background-image: url('~@/assets/beijin.png');
}
</style>
