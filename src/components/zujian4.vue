<template>
    <div class='com-container'>
        <div class="title" :style="titleStyle">
            <span :style="comStyle">{{ currentYear }}年现代化指标</span>
            <span class="iconfont title-icon" @click="showChoice=!showChoice" :style="comStyle">&#xe6eb;</span>
            <div class="select-con" v-show="showChoice">
                <div class="select-item" @click="handleSelect(item)" v-for="item in selectfilter">{{ item.year }}年现代化指数</div>
            </div>
        </div>
        <div class='com-chart' ref='zujian4_ref'></div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { getThemeValue } from '@/utils/theme.utils'
    export default{
        data(){
            return{
                chartInstance: null,
            allData: null,
            currentPage: 1,
            totalPage: 0,
            timeId: null,
            showChoice: false,//下拉列表是否出现
            rets: null,//所有数据
            currentYear: '2000',//当前年份
            titleFontsize:0,//给标题设置大小
            remainPage:0//页面展示除不尽的余数
            }
        },
        computed: {
        selectfilter() {//过滤已选的，不出现在下拉列表中
            if (!this.rets) {
                return []
            } else {
                return this.rets.filter(item=>{
                    return item.year!==this.currentYear
                })
            }
        },
        titleStyle(){
            return{
                fontSize:this.titleFontsize+'px'
            }
        },
        comStyle(){   //切换主题
            return{
                color:getThemeValue(this.theme).titleColor
            }
        },
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
        mounted(){
            this.initChart()
            this.getData()
            window.addEventListener('resize',this.screenAdapter)
            this.screenAdapter()
        },
        destroyed(){
            clearInterval(this.timeId)
            window.removeEventListener('resize',this.screenAdapter)
        },
        methods:{
            initChart(){
                this.chartInstance=this.$echarts.init(this.$refs.zujian4_ref,this.theme)

                const initOption={
                    grid:{
                        top:'20%',
                        left:'2%',
                        bottom:'3%',
                        containLabel:true
                    },
                    xAxis:{
                        type:'value'
                    },
                    yAxis:{
                        type:'category'
                    },
                    tooltip: {//背景，提示框
                        trigger: 'axis',
                        axisPointer: {
                            type: 'line',
                            z: 0,
                            lineStyle: {
                                type: 'solid',//实线
                                color: '#2D3443'
                            }
                        }
                    },
                    series: [
                    {
                        type: 'bar',
                        label: {//标签
                            show: true,
                            position: 'right',
                            textStyle: {
                                color: 'white'
                            }
                        },
                        itemStyle: {
                            barBorderRadius: [0, 33, 33, 0],//圆角
                            //指明颜色渐变的方向，不同百分比下的值
                            color: ()=>{
                                if(this.currentYear=='1996'){
                                    return new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                        {
                                            offset: 0,
                                            color: "#2E72BF"
                                        },
                                        {
                                            offset: 1,
                                            color: '#23E5E5'
                                        }
                                    ])
                                }
                                else if(this.currentYear=='1997'){
                                    return new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                        {
                                            offset: 0,
                                            color: "#5052EE"
                                        },
                                        {
                                            offset: 1,
                                            color: '#AB6EE5'
                                        }
                                    ])
                                }else if(this.currentYear=='1998'){
                                    return new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                        {
                                            offset: 0,
                                            color: "#0BA82C"
                                        },
                                        {
                                            offset: 1,
                                            color: '#4FF778'
                                        }
                                    ])
                                }else{
                                    return new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                        {
                                            offset: 0,
                                            color: "#ff4700"
                                        },
                                        {
                                            offset: 1,
                                            color: '#ADFF2F'
                                        }
                                    ])
                                }
                            }
                        }
                    }
                ]
                }
                this.chartInstance.setOption(initOption)
                this.chartInstance.on('mouseover', () => {
                clearInterval(this.timeId)
            })
            this.chartInstance.on('mouseout', () => {
                this.startInterval()
            })
            },
            async getData(){
                const { data: ret } = await this.$http.get('sql/data')
                this.rets = ret

                this.allData = ret[6].chartData;//已取到数据
            //可对数据进行处理

                this.totalPage = parseInt(this.allData.length / 5) //总共设置的页数
                this.remainPage=this.allData.length - (5 * this.totalPage)//除不尽的余数
                this.updateChart()//更新图表
                this.startInterval()//启动定时器
            },
            updateChart(){
                const start = (this.currentPage - 1) * 5
                let end=0
            if(this.currentPage==this.totalPage){
                end = this.currentPage * 5+this.remainPage
            }else{
                end = this.currentPage * 5
            }
            const showData = this.allData.slice(start, end)
            const sellNames = showData.map((item) => {//x轴数据
                return item.province
            })
            const sellerValue = showData.map((item) => {//y轴数据
                return item.score
            })
                const dataOption={
                    yAxis:{
                        data:sellNames
                    },
                    series:[
                        {
                            data:sellerValue
                        }
                    ]
                }
                this.chartInstance.setOption(dataOption)
            },
            startInterval() {
            if (this.timeId) {
                clearInterval(this.timeId)
            }
            this.timeId = setInterval(() => {
                this.currentPage++
                if (this.currentPage > this.totalPage) {
                    this.currentPage = 1
                }
                this.updateChart()
            }, 3000)
        },
            screenAdapter(){
                // const titleFontsize=document.querySelector('.com-chart').offsetWidth
                this.titleFontsize = this.$refs.zujian4_ref.offsetWidth / 100 * 5.0
                const adapterOption = {
                tooltip: {//背景，提示框
                    axisPointer: {
                        lineStyle: {
                            width: this.titleFontsize,
                        }
                    }
                },
                series: [
                    {
                        barWidth: this.titleFontsize,//柱宽
                        itemStyle: {
                            barBorderRadius: [0, this.titleFontsize / 2, this.titleFontsize / 2, 0],//圆角
                        }
                    }
                ]
            }
                this.chartInstance.setOption(adapterOption)
                this.chartInstance.resize()
            },
            handleSelect(currentInfo) {
            this.allData = currentInfo.chartData
            this.currentYear = currentInfo.year
            this.updateChart()
            this.showChoice = false
        }
        }
    }
</script>
<style lang='less' scoped>
.title {
    position: absolute;
    z-index: 10;
    left: 20px;
    top: 20px;
    color: white;

    .title-icon {
        margin-left: 10px;
        cursor: pointer;

    }
    .select-con{
        background-color: #303444;
    }
}
</style>