<template>
    <div>
        <el-carousel :interval="4000" type="card" height="300px" style="margin-top: 30px">
            <el-carousel-item v-for="(item, index) in images" :key="item">
                <h3 class="medium"> <img :src="images[index]" alt="Image" width="100%" height="300px"></h3>
            </el-carousel-item>
        </el-carousel>
        <!-- <el-button @click="getData">点我获取数据</el-button> -->
        <div class='com-container'>
            <div class='com-chart' ref='achievement_ref'></div>
        </div>

    </div>
</template>
<script>
import { getHdiData } from '../../api/request.js';
export default {
    name: "AchienementComponents",
    data() {
        return {
            chartInstance: null,
            allData: null,
            images: [
                require('@/assets/images/achievement/A.png'),
                require('@/assets/images/achievement/B.png'),
                require('@/assets/images/achievement/C.png'),
                require('@/assets/images/achievement/D.png'),
                require('@/assets/images/achievement/E.png')
            ],
            hdiData: null,
            seletedYears: [],
            seletedArea: ["中国", "美国", "世界", "欧洲及中亚地区", '印度', '日本'],
        }
    },
    methods: {
        //echarts的方法
        initChart() {
            this.chartInstance = this.$echarts.init(this.$refs.achievement_ref)
            const initOption = {
                title: {
                    text: '世界人类发展指数(HDI)',
                    left: '15%'
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false
                },
                yAxis: {
                    type: 'value',
                    scale: true,
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    top: '10%',
                    left: '10%',
                    right: '10%',
                    bottom: '5%',
                    containLabel: true
                },
            }
this.chartInstance.setOption(initOption)
        },
        async getData() {
            let year = this.seletedYears
            let columns = this.seletedArea
            getHdiData(year, columns).then(data => {
                this.hdiData = data
                console.log(this.hdiData)
                this.updateChart()
            })


        },
        updateChart() {
            // 处理图表需要的数据
            const years = this.hdiData.map(item => item.year)
            console.log(years);
            const chinaData = this.hdiData.map(item => item['中国']);
            const usaData = this.hdiData.map(item => item['美国']);
            const worldData = this.hdiData.map(item => item['世界']);
            const eData = this.hdiData.map(item => item["欧洲及中亚地区"]);
            const indiaData = this.hdiData.map(item => item["印度"]);
            const dataOption = {
                xAxis: {
                    data: years,
},
                series: [
                    {
                        name: '中国',
                        type: 'line',
                        data: chinaData,
                        smooth: true,
                        // showSymbol: false,

                          symbol: 'circle',   //将小圆点改成实心 不写symbol默认空心
                        symbolSize: 7,    //小圆点的大小
                        lineStyle: {//线的颜色
                            normal: {
                                color: 'red',
                                // smooth:true,
                                width: 6
                            }
                        },
                        itemStyle: {
                            color: 'yellow',
                            borderColor: "red", //  拐点边框颜色
                            borderWidth: 1, //  拐点边框宽度
                        }
                    },
                    {
                        name: '美国',
                        type: 'line',
                        data: usaData,
                        smooth: true,
                        // showSymbol: false,
                        // symbol: 'circle',   //将小圆点改成实心 不写symbol默认空心
                        symbolSize: 5,    //小圆点的大小
                        lineStyle: {//线的颜色
                            normal: {
                                color: 'blue',
                                // smooth:true,
                                // width:5
                            }
                        },
                        itemStyle: {
                            color: 'blue'
                        }
                    },
{
                        name: '世界',
                        type: 'line',
                        data: worldData,
                        smooth: true,
                        // showSymbol: false,
                        // symbol: 'circle',   //将小圆点改成实心 不写symbol默认空心
                        symbolSize: 5,    //小圆点的大小
                        lineStyle: {//线的颜色
                            normal: {
                                color: 'purple',
                                // smooth:true,
                                // width:5
                            }
                        },
                        itemStyle: {
                            color: 'purple'
                        }
                    },
                    {
                        name: "欧洲及中亚地区",
                        type: 'line',
                        data: eData,
                        smooth: true,
                        // showSymbol: false,
                        // symbol: 'circle',   //将小圆点改成实心 不写symbol默认空心
                        symbolSize: 5,    //小圆点的大小
                        lineStyle: {//线的颜色
                            normal: {
                                color: 'green',
                                // smooth:true,
                                // width:5
                            }
                        },
                        itemStyle: {
                            color: 'green'
                        }
                    },
{
                        name: "印度",
                        type: 'line',
                        data: indiaData,
                        smooth: true,
                        // showSymbol: false,
                        // symbol: 'circle',   //将小圆点改成实心 不写symbol默认空心
                        symbolSize: 5,    //小圆点的大小
                        lineStyle: {//线的颜色
                            normal: {
                                color: 'black',
                                // smooth:true,
                                // width:5
                            }
                        },
                        itemStyle: {
                            color: 'black'
                        }
                    },
                ],
                legend: {
                    data: ['中国', '美国', '世界', "欧洲及中亚地区", '印度']
                }
            }

            this.chartInstance.setOption(dataOption)
        },
        screenAdapter() {
            const adapterOption = {}
            this.chartInstance.setOption(adapterOption)
            this.chartInstance.resize()
        }

    },
    mounted() {
        this.initChart()
        this.getData()
        window.addEventListener('resize', this.screenAdapter)
        this.screenAdapter()
    },
    destroyed() {
        window.removeEventListener('resize', this.screenAdapter)

    }
}
</script>

<style lang="less" scoped>
.el-carouselitem h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
}

.el-carouselitem:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}

.com-container {
    height: 360px;
}
</style>