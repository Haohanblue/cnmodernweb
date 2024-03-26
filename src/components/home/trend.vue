<template>
    <div class="com-container">
        <div class="com-chart" ref="trend_ref"></div>
    </div>
</template>
<script>
import { mapState } from "vuex"
export default {
    data() {
        return {
            chartInstance: null,
            allData: null,
            rets: null,
            currentYear: '2000',
            currentPro: '北京',  //当前显示的省份
            titleFontsize: 0
        }
    },
    mounted() {
        this.$bus.$on('year-changed', (newYear) => {
            this.currentYear = newYear;
            // console.log(this.currentYear);
            this.getData()
        })
        this.$bus.$on('dataReceived', (data) => {
            this.rets = data.rets;
            this.allData = this.rets.find(item => item.year === this.currentYear).chartData;
            this.updateChart(); // 使用新数据更新图表
        });
        this.$bus.$on('province-change', (name) => {
            // console.log(name);
            this.currentPro = name
            // console.log("传过来的省份名称是"+name);
            // this.getData()
            this.updateChart()
        })
        this.initChart()
        this.getData()
        window.addEventListener('resize', this.screenAdapter)
        this.screenAdapter()
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
    },
    methods: {
        initChart() {
            this.chartInstance = this.$echarts.init(this.$refs.trend_ref, this.theme)
            const initOption = {
                backgroundColor:'rgba(41,52,65,0.2)',
                title: {
                    text: '北京五指标',
                    left: 30,
                    top: 10,
                    color:'#00000'
                },
                radar: [
                    {                       // 雷达图坐标系组件，只适用于雷达图。
                        center: ['50%', '55%'],             // 圆中心坐标，数组的第一项是横坐标，第二项是纵坐标。[ default: ['50%', '50%'] ]
                        radius: 100,                        // 圆的半径，数组的第一项是内半径，第二项是外半径。
                        name: {                             // (圆外的标签)雷达图每个指示器名称的配置项。
                            // formatter: '{value}',
                            textStyle: {
                                fontSize: 14,
                                color: '#CCC'
                            }
                        },
                        nameGap: 5,                        // 指示器名称和指示器轴的距离。[ default: 15 ]
                        splitNumber: 4,                     // (这里是圆的环数)指示器轴的分割段数。[ default: 5 ]
                        shape: 'polygon',                    // 雷达图绘制类型，支持 'polygon'(多边形) 和 'circle'(圆)。[ default: 'polygon' ]
                        axisLine: {                         // (圆内的几条直线)坐标轴轴线相关设置
                            lineStyle: {
                                color: '#fff',                   // 坐标轴线线的颜色。
                                width: 1,                      	 // 坐标轴线线宽。
                                type: 'solid',                   // 坐标轴线线的类型。
                            }
                        },
                        splitLine: {                        // (这里是指所有圆环)坐标轴在 grid 区域中的分隔线。
                            lineStyle: {
                                color: '#fff',                       // 分隔线颜色
                                width: 2, 							 // 分隔线线宽
                            }
                        },
                        splitArea: {                        // 坐标轴在 grid 区域中的分隔区域，默认不显示。
                            show: true,
                        },
                        indicator: [{               // 雷达图的指示器，用来指定雷达图中的多个变量（维度）,跟data中 value 对应
                            name: '物质文明与精神文明相协调',                           // 指示器名称   
                            max: 100,                               // 指示器的最大值，可选，建议设置 
                            //color: '#fff'                           // 标签特定的颜色。
                        }, {
                            name: '人口规模巨大',
                            max: 100
                        }, {
                            name: '走和平发展道路',
                            max: 100
                        }, {
                            name: '人与自然和谐共生',
                            max: 100
                        }, {
                            name: '共同富裕',
                            max: 100
                        }]
                    }],
                series: [{
                    type: 'radar',              // 系列类型: 雷达图
                    itemStyle: {             // 折线拐点标志的样式。
                        color: '#5840D4',
                        borderColor: '#5840D4',
                        normal: {                   // 普通状态时的样式
                            lineStyle: {
                                width: 1
                            },
                            opacity: 0.2
                        },
                        emphasis: {                 // 高亮时的样式
                            lineStyle: {
                                width: 5
                            },
                            opacity: 1
                        }
                    },
                    areaStyle: {
                        color: '#5840D4'
                    }
                }]
            }
            this.chartInstance.setOption(initOption)

        },
        async getData() {
            // console.log(this.currentYear);
            var yearIndex = this.currentYear - 2000;
            if (yearIndex !== -1) {
                if (this.rets == null) {
                    console.log("没获取到数据，请稍后");
                } else {
                    // console.log(yearIndex);
                    this.allData = this.rets[yearIndex].chartData;
                    // console.log(this.allData);
                    this.updateChart(); // 用新数据更新图表
                }

            }
        },
        updateChart() {
            // console.log(this.allData);
            // console.log(this.currentPro);
            const targetData = this.allData.find(item => item.province === this.currentPro)
            if (targetData == null) {
                // console.log(this.allData);
                console.log("正在加载数据");

            } else {
                // console.log(targetData);
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
                    }]
                }
                this.chartInstance.setOption(dataOption)
            }

        },
        screenAdapter() {
            // console.log(document.querySelector('.com-chart').offsetWidth)
            const titleFontsize = document.querySelector('.com-chart').offsetWidth
            // const titleFontsize=this.$refs.trend_ref.offsetWidth /100 *3.6
            const adapterOption = {
                title: {//标题内容、大小、位置
                    textStyle: {
                        fontSize: titleFontsize * 0.05
                    },
                },
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
