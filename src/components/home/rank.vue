<template>
    <div class='com-container'>
        <div class='com-chart' ref='rank_ref'></div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import { getThemeValue } from "@/utils/theme.utils";
export default {
    data() {
        return {
            chartInstance: null,
            rets: null,
            allData: null,
            currentYear: '2000',
            sta: false
        }
    },
    mounted() {
        this.$bus.$on('year-changed', (newYear) => {
            this.currentYear = newYear;
            this.getData()
        })
        this.$bus.$on('dataArea', (data) => {
            this.rets = data
            this.getData()
            this.updateChart()
        })

        this.initChart()
        // this.getData()
        window.addEventListener('resize', this.screenAdapter)
        this.screenAdapter()
        this.$bus.$on('changebackGround', (info) => {
            if (info.name == 'rank') {
                this.sta = info.sta
                // console.log(this.sta);
                this.updateChart()
            }
        })
    },
    destroyed() {
        window.removeEventListener('resize', this.screenAdapter)
        this.$bus.$off('changebackGround')
        this.$bus.$off('year-changed')
        this.$bus.$off('dataArea')
    },
    computed: {
        ...mapState(['theme'])
    },
    watch: {
        theme() {
            this.chartInstance.dispose()
            this.initChart()
            this.screenAdapter()
            this.updateChart()
        }
    },
    methods: {
        initChart() {
            this.chartInstance = this.$echarts.init(this.$refs.rank_ref, this.theme)
            const initOption = {
                backgroundColor:'rgba(41,52,65,0.2)',
                title: {
                    text: '区域现代化指数',
                    left: 20,
                    top: 10,
                    color: '#00000'
                },
                tooltip: {
                    trigger: 'item'
                },
                series: [
                    {
                        type: 'pie', // 设置图表类型为饼图
                        radius: '55%', // 饼图半径
                        data: [], // 数据暂时为空，后续在updateChart中设置
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        label: {
                            normal: {
                                formatter: function (data) { return data.name + "\n" + data.percent.toFixed(1) + "%"; },
                                show: true,
                                position: 'left',
                                color: getThemeValue(this.theme).titleColor,
                                // fontWeight:'bold',
                                fontSize: 15
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '20',
                                    fontWeight: 'bold'
                                }
                            },

                        },
                        labelLine: {
                            normal: {
                                show: true
                            }
                        },

                    }
                ]
            }
            this.chartInstance.setOption(initOption)
        },
        async getData() {
            let yearIndex = this.currentYear - 2000;
            if (this.rets == null) {
                console.log("还未获取到数据，请稍后");
            } else {
                if (yearIndex !== -1) {
                    this.allData = this.rets[yearIndex]
                    // console.log(this.allData);
                    this.updateChart();
                }
            }

        },
        updateChart() {
            const backgroundColor = this.sta ? 'rgba(41,52,65,1)' : 'rgba(41,52,65,0.2)';
            const gradientColorList = [
                [{ offset: 0, color: '#a1c4fd' }, { offset: 1, color: '#c2e9fb' }],//0
                [{ offset: 0, color: '#ee9ca7' }, { offset: 1, color: '#ffdde1' }],//1
                [{ offset: 0, color: '#b3ffab' }, { offset: 1, color: '#12fff7' }],//2
                [{ offset: 0, color: '#fddb92' }, { offset: 1, color: '#d1fdff' }],//3
                [{ offset: 0, color: '#f6d365' }, { offset: 1, color: '#fda085' }],//4
                [{ offset: 0, color: '#cd9cf2' }, { offset: 1, color: '#f6f3ff' }],//5
                [{ offset: 0, color: '#96fbc4' }, { offset: 1, color: '#f9f586' }],//6
            ];
            const gradientParams = [
                [{ x: 0.1, y: 0.8, r: 1.5 }],
                [{ x: 0.2, y: 0.5, r: 1 }],
                [{ x: 0.2, y: 0.2, r: 1 }],
                [{ x: 0.9, y: 0.1, r: 0.7 }],
                [{ x: 0.8, y: 0.8, r: 1 }],
                [{ x: 0.8, y: 0.9, r: 1 }],
                [{ x: 0.8, y: 0.8, r: 1.5 }],
            ]
            const chartData = this.allData.chartData.map((item, index) => {
                // 获取对应扇形的渐变参数
                const colorStops = gradientColorList[index % gradientColorList.length];
                const params = gradientParams[index % gradientParams.length][0]; // 访问每个小数组中的第一个对象
                return {
                    name: item.region.replace("地区", ''), // 名称
                    value: item.score, // 值
                    itemStyle: {
                        normal: {
                            // 使用对应的x，y，r设置径向渐变
                            color: new this.$echarts.graphic.RadialGradient(
                                params.x, // x坐标
                                params.y, // y坐标
                                params.r, // 渐变半径
                                colorStops,
                                false // 设置为false表示坐标是相对的
                            )
                        }
                    }
                };
            });

            // 处理图表需要的数据
            const dataOption = {
                series: [{
                    data: chartData
                }],
                backgroundColor: backgroundColor,
            }
            this.chartInstance.setOption(dataOption)
        },
        screenAdapter() {
            const titleFontsize = this.$refs.rank_ref.offsetWidth / 100 * 7.0
            const adapterOption = {
                title: {
                    textStyle: {
                        fontSize: titleFontsize * 0.6
                    }
                },

            }
            this.chartInstance.setOption(adapterOption)
            this.chartInstance.resize()

        },
    }
}
</script>
<style lang='less' scoped></style>
