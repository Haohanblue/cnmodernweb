<template>
    <div class="com-container">
        <div class="com-chart" ref="trend_ref"></div>
    </div>
</template>
<script>
import { mapState } from "vuex"
import { getThemeValue } from "@/utils/theme.utils";
export default {
    data() {
        return {
            chartInstance: null,
            allData: null,
            rets: null,
            currentYear: '2000',
            currentPro: '北京',  //当前显示的省份
            titleFontsize: 0,
            sta: false
        }
    },
    mounted() {
        this.$bus.$on('year-changed', (newYear) => {
            this.currentYear = newYear;
            this.getData()
        })
        this.$bus.$on('dataReceived', (data) => {
            this.rets = data.rets;
            this.allData = this.rets.find(item => item.year === this.currentYear).chartData;
            this.updateChart(); // 使用新数据更新图表
        });
        this.$bus.$on('province-change', (name) => {
            this.currentPro = name
            // console.log("传过来的省份名称是"+name);
            this.updateChart()
        })
        this.initChart()
        this.getData()
        window.addEventListener('resize', this.screenAdapter)
        this.screenAdapter()
        this.$bus.$on('changebackGround', (info) => {
            if (info.name == 'trend') {
                this.sta = info.sta
                this.initChart()
            }
        })
    },
    computed: {
        ...mapState(['theme']),
    },
    watch: {
        theme() {
            this.chartInstance.dispose()
            this.initChart()
            this.screenAdapter()
            this.updateChart()
        }
    },
    destroyed() {
        window.removeEventListener('resize', this.screenAdapter)
        this.$bus.$off('dataReceived')
        this.$bus.$off('year-changed');
        this.$bus.$off('province-change');
        this.$bus.$off('changebackGround');
    },
    methods: {
        initChart() {
            const backgroundColor = this.sta ? 'rgba(198,226,255,1)' : 'rgba(41,52,65,0.2)';
            this.chartInstance = this.$echarts.init(this.$refs.trend_ref, this.theme)
            const initOption = {
                backgroundColor: backgroundColor,
                title: {
                    text: '北京五指标',
                    left: 30,
                    top: 10,
                    color: '#00000'
                },
                radar: [
                    {
                        center: ['50%', '55%'],             // 圆中心坐标
                        radius: 100,                        // 圆的半径
                        name: {
                            textStyle: {
                                fontSize: 14,
                                color: '#CCC'
                            }
                        },
                        nameGap: 5,                        // 指示器名称和指示器轴的距离
                        splitNumber: 4,                     // 这里是圆的环数
                        shape: 'polygon',
                        axisLine: {
                            lineStyle: {
                                color: '#fff',
                                width: 1,
                                type: 'solid',
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#fff',
                                width: 2,
                            }
                        },
                        splitArea: {
                            show: true,
                        },
                    }],
                series: [{
                    type: 'radar',
                    itemStyle: {
                        color: '#5840D4',
                        borderColor: '#5840D4',
                        normal: {
                            lineStyle: {
                                width: 1
                            },
                            opacity: 0.2
                        },
                        emphasis: {  // 高亮时的样式
                            lineStyle: {
                                width: 5
                            },
                            opacity: 1
                        }
                    },
                    areaStyle: {
                        color: '#5840D4'
                    }
                }],
            }
            this.chartInstance.setOption(initOption)

        },
        async getData() {
            var yearIndex = this.currentYear - 2000;
            if (yearIndex !== -1) {
                if (this.rets == null) {
                    console.log("没获取到数据，请稍后");
                } else {
                    this.allData = this.rets[yearIndex].chartData;
                    this.updateChart(); // 用新数据更新图表
                }

            }
        },
        updateChart() {
            const targetData = this.allData.find(item => item.province === this.currentPro)
            if (targetData == null) {
                console.log("正在加载数据");

            } else {
                const valueArr = [targetData.C, targetData.A, targetData.E, targetData.D, targetData.B]
                const dataOption = {
                    title: {
                        text: this.currentPro + '五指标',
                        left: 30,
                        top: 10
                    },
                    series: [{
                        data: [{
                            name: this.currentPro,
                            value: valueArr
                        }]
                    }],
                    radar: [
                        {
                            indicator: [
                                {
                                    name: '物质文明与精神文明相协调' + '\n' + targetData.C, max: 100,
                                    color: getThemeValue(this.theme).titleColor,
                                },
                                {
                                    name: '人口规模巨大' + '\n' + targetData.A, max: 100,
                                    color: getThemeValue(this.theme).titleColor,
                                },
                                {
                                    name: '走和平发展道路' + '\n' + targetData.E, max: 100,
                                    color: getThemeValue(this.theme).titleColor,
                                },
                                {
                                    name: '人与自然和谐共生' + '\n' + targetData.D, max: 100,
                                    color: getThemeValue(this.theme).titleColor,
                                },
                                {
                                    name: '共同富裕' + '\n' + targetData.B, max: 100,
                                    color: getThemeValue(this.theme).titleColor,
                                }
                            ]
                        }
                    ],
                }
                this.chartInstance.setOption(dataOption)
            }

        },
        screenAdapter() {
            const titleFontsize = document.querySelector('.com-chart').offsetWidth
            // const titleFontsize=this.$refs.trend_ref.offsetWidth /100 *3.6
            const adapterOption = {
                title: {//标题内容、大小、位置
                    textStyle: {
                        fontSize: titleFontsize * 0.05
                    },
                },
                radar: [
                    {
                        radius: titleFontsize * 0.2,
                        name: {
                            textStyle: {
                                fontSize: titleFontsize * 0.035,
                            }
                        }
                    }
                ],

            }
            this.chartInstance.setOption(adapterOption)
            this.chartInstance.resize()
        },
    },
}
</script>
<style lang="less" scoped>
.title {
    top: 20px;
    z-index: 10;
    position: absolute;
    left: 10px
}
</style>
