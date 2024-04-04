<template>
<div class="beian">
    <a class="highlightlink" href="https://beian.miit.gov.cn/" target="_blank">
        <span>豫ICP备2023036721号-5</span>
    </a>
    <a style="margin-left: 5px" href="https://beian.mps.gov.cn/#/query/webSearch?code=41140002000753"  target="_blank">
        <img  src="../assets/police.png" style="width: 16px;height: 16px;vertical-align: -4px;" />
    </a>
    <a class="highlightlink" href="https://beian.mps.gov.cn/#/query/webSearch?code=41140002000753"  target="_blank">
        <span>豫公网安备41140002000753号</span>
    </a>
    <a class="highlightlink"  href="https://lbs.amap.com/api/webservice/guide/api/district?spm=a2crr.b71357980.area-selector.1.24ba26c0qv2jzf" target="_blank"><img  src="../assets/gaode.png" style="width: 50px;height: 16px;vertical-align: -4px;" /> <span>© 2022 高德软件 GS京(2022)1061号</span></a>

</div>
</template>

<script>
export default {
    name: "Myfooter"
}
</script>

<style scoped>
.beian{
    background-image: url('~@/assets/beijin.png');
    text-align: center;
    font-size: 12px;
    color: #666;
    height: 100%;
}
a.highlightlink {
    position: relative;
    color: #006400; /* 假设你想要的颜色是蓝色 */
}
a.highlightlink:after {
    content: "";
    position: absolute;
    width: 97%;
    height: 3px;
    background: rgba(100, 201, 155, .5);
    bottom: 2px;
    left: 0;
    transition: all .2s ease;
}

a.highlightlink:hover:after {
    height: 4px;
    transition: all .2s ease;
    background: rgba(100, 201, 155, .7);
}

a.highlightlink:hover {
    color: green; /* 当鼠标悬停时的颜色，假设是绿色 */
}
</style>
