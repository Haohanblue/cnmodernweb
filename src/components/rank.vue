<template>
    <div class='com-container'>
        <div class='com-chart' ref='rank_ref'></div>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
            chartInstance: null,
            allData: null,
            startValue: 0,
            endValue: 5,
            timeId: null
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
        clearInterval(this.timeId)
    },
    computed:{
        ...mapState(['theme'])
    },
    watch:{
        theme(){
            this.chartInstance.dispose()
            this.initChart()
            this.screenAdapter()
            this.updateChart()
        }
    },
    methods: {
        initChart() {
            this.chartInstance = this.$echarts.init(this.$refs.rank_ref,this.theme)
            const initOption = {
                title: {
                    text: '2000年各省现代化排名',
                    left: 20,
                    top: 10
                },
                grid: {
                    top: "20%",
                    bottom: "5%",
                    left: "5%",
                    righr: "5%",
                    containLabel: true
                },
                tooltip: {
                    show: true
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        type: 'bar',
                        itemStyle: {
                            barBorderRadius: [33, 33, 0, 0],
                        }
                    }
                ]
            }
            this.chartInstance.setOption(initOption)
            this.chartInstance.on('mouseover',()=>{
                clearInterval(this.timeId)
            })
            this.chartInstance.on('mouseout',()=>{
                this.startInterval()
            })
        },
        async getData() {
            // 获取服务器的数据, 对this.allData进行赋值之后, 调用updateChart方法更新图表
            const { data: ret } = await this.$http.get('sql/data/main')
            // console.log(ret);
            // console.log(ret[3].chartData);
            this.allData = ret[4].chartData;
            // console.log(ret[4]);
            this.updateChart()
            this.startInterval()
        },
        updateChart() {
            const namearr = this.allData.map((item) => {
                // return item.province
                return item.province
            })
            const valuearr = this.allData.map(item => {
                // return item.value
                return item.score
            })
            // 处理图表需要的数据
            const dataOption = {
                xAxis: {
                    data: namearr
                },
                dataZoom: {
                    show: false,
                    startValue: this.startValue,
                    endValue: this.endValue
                },
                series: [
                    {
                        data: valuearr,
                        itemStyle: {
                            color: (arg) => {//不同数值呈现不同颜色
                                if (arg.value > 0.01) {
                                    return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {
                                            offset: 0,
                                            color: "#2E72BF"
                                        },
                                        {
                                            offset: 1,
                                            color: '#23E5E5'
                                        }
                                    ])
                                } else if (arg.value > 0.005) {
                                    return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {
                                            offset: 0,
                                            color: "#5052EE"
                                        },
                                        {
                                            offset: 1,
                                            color: '#AB6EE5'
                                        }
                                    ])
                                } else {
                                    return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {
                                            offset: 0,
                                            color: "#0BA82C"
                                        },
                                        {
                                            offset: 1,
                                            color: '#4FF778'
                                        }
                                    ])
                                }
                            }
                        }
                    }
                ]
            }
            this.chartInstance.setOption(dataOption)
        },
        screenAdapter() {

            const titleFontsize=this.$refs.rank_ref.offsetWidth/100*7.0
            const adapterOption = {
                title:{
                    textStyle:{
                        fontSize:titleFontsize*0.6
                    }
                },
                series:[
                    {
                        barWidth:titleFontsize,
                        itemStyle:{
                            barBorderRadius:[titleFontsize/2,titleFontsize/2,0,0]
                        }
                    }
                ]
            }
            this.chartInstance.setOption(adapterOption)
            this.chartInstance.resize()

        },
        startInterval() {
            if(this.timeId){
                clearInterval(this.timeId)
            }
            this.timeId=setInterval(() => {
                this.startValue++
                this.endValue++
                if (this.endValue > this.allData.length - 1) {
                    this.startValue = 0
                    this.endValue = 9
                }
                this.updateChart()
            }, 2000);
        }
    }
}
</script>
<style lang='less' scoped></style>
