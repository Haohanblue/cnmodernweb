<template>
    <div class='com-container'>
        <div class="title" :style="titleStyle">
            <el-cascader :options="options" :show-all-levels="false" @change="handleCascaderChange"
                v-model="selectedValue"></el-cascader>
        </div>
        <div class='com-chart' ref='zujian4_ref'></div>


    </div>
</template>
<script>
import { mapState } from 'vuex'
import { getThemeValue } from '@/utils/theme.utils'
import { indicators } from '@/components/dict/dict'
import { options } from '@/components/dict/dict'
import { getFilledData } from '@/api/request'
import { all } from 'axios'

export default {
    data() {
        return {
            chartInstance: null,
            allData: null,
            rets: null,//所有数据
            titleFontsize: 0,//给标题设置大小
            currentPro: ['北京'],
            currentzhiBiao: 'A1',
            options: options,
            year: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009',
                '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
            value: [],
            selectedValue: ['A', 'A1'], // 这里是“常住人口比例”对应的value路径,默认显示的
            currentUnit: "%"
        }
    },
    computed: {
        titleStyle() {
            return {
                fontSize: this.titleFontsize + 'px'
            }
        },
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
    mounted() {
        //获取地图点击
        this.$bus.$on('province-change', (name) => {
            this.currentPro = name
            this.currentPro = [this.currentPro]
            this.getData()
            // this.updateChart()
        })
        this.initChart()
        this.getData()
        window.addEventListener('resize', this.screenAdapter)
        this.screenAdapter()
    },
    destroyed() {
        window.removeEventListener('resize', this.screenAdapter)
        this.$bus.$off('dataReceived')
    },
    methods: {
        initChart() {
            this.chartInstance = this.$echarts.init(this.$refs.zujian4_ref, this.theme)
            const initOption = {
                title: {
                    text: this.currentPro,
                    left: 60,
                    top: 15
                },

                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    left: '3%',
                    top: '12%',
                    right: '3%',
                    bottom: '10%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    axisLabel: {
                        //坐标轴刻度标签的显示间隔，在类目轴中有效。默认会采用标签不重叠的策略间隔显示标签。可以设置成 0 强制显示所有标签。
                        interval: 4,
                        textStyle: {
                            color: "#556677",
                        },
                        fontSize: 12,
                        formatter: function (value, index) {
                                return value;
                        }
                    },
                },
                yAxis: {
                    type: 'value',
                    scale: true
                },
            }
            this.chartInstance.setOption(initOption)
        },
        getData() {
            this.currentUnit=indicators[this.currentzhiBiao].unit
            getFilledData(this.currentPro, this.year, this.currentzhiBiao)
                .then(data => {
                    this.value = data.map(item => item[this.currentzhiBiao]);
                    this.updateChart()
                })
                .catch(error => {
                    console.log(error);
                })

        },

        updateChart() {
            const dataOption = {
                graphic: {
                    elements: [{
                        type: 'text',
                        style: {
                            text: '单位：' + this.currentUnit,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize:16,
                            fill:'white',
                            textVerticalAlign: 'bottom',
                        },
                        left: 'center',  // 水平居中
                        bottom: 5  // 距离容器底部的距离
                    }]
                },
                title: {
                    text: this.currentPro,
                },
                xAxis: {
                    data: this.year,
                },
                series: [
                    {
                        data: this.value,
                        type: 'line',
                        areaStyle: {
                            color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                {
                                    offset: 0,
                                    color: 'rgba(252,151,175,0.5)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(252,151,175,1)'
                                }
                            ])
                        },
                    }
                ]
            }
            this.chartInstance.setOption(dataOption)
        },
        screenAdapter() {
            this.titleFontsize = this.$refs.zujian4_ref.offsetWidth / 100 * 5.0
            const adapterOption = {
                title: {
                    textStyle: {
                        fontSize: this.titleFontsize
                    }
                },

            }
            this.chartInstance.setOption(adapterOption)
            this.chartInstance.resize()
        },
        handleCascaderChange(value) {
            // 用户选择的最后一个值将会是数组的最后一个元素
            this.currentzhiBiao = value[value.length - 1];
            // 您可以在这里处理lastValue，例如更新数据或调用其他方法
            // console.log('用户选择的最后一级值:', this.currentzhiBiao);
            this.getData()
        },
    }
}
</script>
<style lang='less' scoped>
.title {
    position: absolute;
    width: 180px;
    z-index: 10;
    left: 130px;
    top: 10px;
    color: white;
}
</style>
<style lang="less">
.el-input__inner {
    height: 30px !important;
    line-height: 30px !important
}
</style>