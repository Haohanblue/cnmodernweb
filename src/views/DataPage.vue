<template>
    <div>
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
/* Your component styles here */
</style>