<template>
    <div class="pageall">
        <h1><AchienementComponents></AchienementComponents></h1>
    </div>
</template>
<script>
import AchienementComponents from "@/components/achievement/AchienementComponents.vue";

export default {
    components: {AchienementComponents},
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
<style lang="css" scoped>
.pageall{
    height: 100vh;
    background-size: cover; /* 或者使用其他值来适配你的设计需求 */
    background-position: center center;
    background-repeat: no-repeat;
    background-image: url('~@/assets/beijin.png');
}
</style>
