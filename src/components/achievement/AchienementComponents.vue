<template>
    <el-carousel :interval="4000" type="card" height="300px" style="margin-top: 30px">
        <el-carousel-item v-for="(item, index) in images" :key="item">
            <h3 class="medium"> <img :src="images[index]" alt="Image" width="100%" height="300px"></h3>
        </el-carousel-item>
    </el-carousel>
</template>

<script>
export default {
    name: "AchienementComponents",
    data(){
        return {
            images: [
                require('../../../public/static/achievement/A.png'),
                require('../../../public/static/achievement/B.png'),
                require('../../../public/static/achievement/C.png'),
                require('../../../public/static/achievement/D.png'),
                require('../../../public/static/achievement/E.png')
            ]
        }
    
    }
}
</script>

<style>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
</style>
