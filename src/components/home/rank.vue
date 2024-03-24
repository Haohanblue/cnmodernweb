<template>
    <div class='com-container'>
        <div class='com-chart' ref='rank_ref'></div>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
    beforeDestroy() {
        this.$bus.$off('year-changed')
        this.$bus.$off('dataArea')
    },
    data() {
        return {
            chartInstance: null,
            rets: null,
            allData: null,
            currentYear: '2000',
        }
    },
    mounted() {
        this.$bus.$on('year-changed', (newYear) => {
            this.currentYear = newYear;
            this.getData()
        })
        this.$bus.$on('dataArea', (data) => {
            this.rets = data
            // console.log(this.rets);
            this.getData()
            this.updateChart()
        })

        this.initChart()
        // this.getData()
        window.addEventListener('resize', this.screenAdapter)
        this.screenAdapter()
    },
    destroyed() {
        window.removeEventListener('resize', this.screenAdapter)
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
                title: {
                    text: '区域现代化指数',
                    left: 20,
                    top: 10
                },
                tooltip: {
                    trigger: 'item'
                },
                color: ['#FF69B4', '#A020F0', '#54FF9F', 'yellow', '#00FFFF', '#FF6A6A', '#00BFFF'],
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
                                formatter: '{b}:{c}' + '\n\r' + '({d}%)',
                                show: true,
                                position: 'left'
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
            const chartData = this.allData.chartData.map(item => ({
                name: item.region.replace("地区", ''), // 名称
                value: item.score, // 值
            }));
            // 处理图表需要的数据
            const dataOption = {
                series: [{
                    data: chartData
                }]
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
