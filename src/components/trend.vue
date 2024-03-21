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
            startValue:0,
            endValue:8,
            timeId:null
        }
    },
    mounted() {
        this.initChart()
        this.getData()
        window.addEventListener('resize', this.screenAdapter)
        this.screenAdapter()

    },
    computed:{
        ...mapState(['theme']),
    },
    watch:{
        theme(){
            this.chartInstance.dispose()
            this.initChart()
            this.screenAdapter()
            this.updateChart()
        }
    },
    destroyed() {
        window.removeEventListener('reisze', this.screenAdapter)
        clearInterval(this.timeId)
        this.$bus.$off('dataReceived')
    },
    methods: {
        initChart() {
            this.chartInstance = this.$echarts.init(this.$refs.trend_ref, this.theme)
            const initOption = {
                title: {
                    text: '1997年各省现代化指数',
                    left: 30,
                    top: 10
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    left: '3%',
                    top: '10%',
                    right: '3%',
                    bottom: '10%',
                    containLabel: true
                },

                xAxis: {

                    type: 'category',
                    axisLabel: {
                        //坐标轴刻度标签的显示间隔，在类目轴中有效。默认会采用标签不重叠的策略间隔显示标签。可以设置成 0 强制显示所有标签。
                        interval: 0,
                        textStyle: {
                            color: "#556677",
                        },
                        fontSize: 12,
                        formatter: function (value, index) {
                            if (index >= 12) {
                                return ''; // 超过12条数据的标签不显示
                            } else {
                                return value;
                            }
                        }
                    },

                },
                yAxis: {
                    type: 'value'
                },
            }
            this.chartInstance.setOption(initOption)

        },
        getData() {
            this.$bus.$on('dataReceived', (data) => {
                this.allData = data.rets[5].chartData
                this.updateChart()
                this.startInterval()
            })
        },
        updateChart() {
            //x轴，y轴数据
            // const value = this.allData.value
            // const name = this.allData.name
            const xData = this.allData.map(item => {
                return item.province
            })
            const yData = this.allData.map(item => {
                return item.score
            })
            const dataOption = {
                dataZoom: {
                    show:false,
                    startValue:this.startValue,
                    endValue:this.endValue
                },
                xAxis: {
                    data: xData
                },
                series: [
                    {
                        data: yData,
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

            // console.log(document.querySelector('.com-chart').offsetWidth)
            const titleFontsize=document.querySelector('.com-chart').offsetWidth
            // const titleFontsize=this.$refs.trend_ref.offsetWidth /100 *3.6
            const adapterOption = {
                title:{//标题内容、大小、位置
                    textStyle:{
                        fontSize:titleFontsize*0.04
                    },
                },
            }
            this.chartInstance.setOption(adapterOption)
            this.chartInstance.resize()
        },
        startInterval(){
            if(this.timeId){
                clearInterval(this.timeId)
            }
            this.timeId=setInterval(()=>{
                    this.startValue++
                    this.endValue++
                    if(this.endValue>this.allData.length-1){
                        this.startValue=0
                        this.endValue=8
                    }
                    this.updateChart()
                },2000)
        }
    },

}
</script>
<style lang="less" scoped>
// .title{
//     top:20px;
//     z-index: 10;
//     position: absolute;
//     left:10px,

// }
</style>
