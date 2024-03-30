<template>
    <div class="pageall">
        <data-components/><!-- Your code here -->
    </div>
</template>

<script>
import DataComponents from "@/components/data/DataComponents.vue";

export default {
    name: 'DataPage',
    components: {DataComponents},
    data() {
        return {
            // Your data properties here
        };
    },
    methods: {
        // Your methods here
    },
    mounted() {
        // Your mounted hook code here
    },
};
</script>

<style scoped>
.pageall{
    height: 100vh;
    background-size: cover; /* 或者使用其他值来适配你的设计需求 */
    background-position: center center;
    background-repeat: no-repeat;
    background-image: url('~@/assets/beijin.png');
}
</style>