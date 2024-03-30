<template>
    <div class="pageall">
    <billboard-components></billboard-components>
    </div>
</template>
<script>
import BillboardComponents from "@/components/Billboard/BillboardComponent.vue";

export default {
    components: {BillboardComponents},
   data() {
      return {
      }
   },
   created(){
   },
   computed:{
   },
   methods:{
   },
}
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
