<template>
    <div class="com-container">
        <div class="title" :style="titleStyle">
            <span :style="comStyle">{{ currentZhibiao }}</span>
            <!-- comStyle是随着主题变化改变字体颜色 -->
            <span class="iconfont title-icon" @click="showChoice = !showChoice" :style="comStyle">&#xe6eb;</span>
            <div class="select-con" v-show="showChoice" :style="dropdownStyle">
                <div class="select-item" 
                    :style="comStyle"
                    @click="handleSelect(item)" v-for="item in selectfilter">{{ item }}
                </div>
            </div>
        </div>
        <div class="com-chart" ref="seller_ref"></div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import { getThemeValue } from "@/utils/theme.utils";
export default {

    data() {
        return {
            chartInstance: null,
            allData: null,
            timeId: null,
            showChoice: false,//下拉列表是否出现
            rets: null,//所有数据
            currentZhibiao:'物质文明和精神文明相协调',
            zhibiao:['物质文明和精神文明相协调','人口规模巨大','人与自然和谐共生','共同富裕','走和平发展道路'],
            currentYear: '2000',//当前年份
            titleFontsize:0,//给标题设置大小
        }
    },
    computed: {
        selectfilter() {//过滤已选的，不出现在下拉列表中
            if (!this.zhibiao) {
                return []
            } else {
                return this.zhibiao.filter(item=>{
                    return item!==this.currentZhibiao
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
                color:getThemeValue(this.theme).titleColor,
                
            }
        },
        dropdownStyle() {
        // 使用 getThemeValue 函数根据当前主题获取背景颜色
            const themeValue = getThemeValue(this.theme);
            return {
                backgroundColor: themeValue ? themeValue.borderColor : 'defaultBackgroundColor', // 如果没有找到主题，则使用默认背景颜色
            };
        },
        ...mapState(['theme']),
    },
    watch:{
        theme(){
            this.chartInstance.dispose()
            this.initChart()
            this.screenAdapter()
            this.updateChart()
            console.log('***********');
            this.getData()
            console.log('888888888');
        }
    },

    mounted() {
        this.$bus.$on('year-changed',(newYear)=>{
            this.currentYear=newYear;
            // console.log(newYear);
            // console.log(this.currentYear);
            this.getData()
        })
        this.initChart()
        this.getData()
        window.addEventListener('resize', this.screenAdapter),
            //刚开始就进行屏幕的适配
            this.screenAdapter()
    },
    destroyed() {
        clearInterval(this.timeId),//取消计时
            //组件销毁，取消监听器
            window.removeEventListener('resize', this.screenAdapter)
            this.$bus.$off('year-changed');
    },
    methods: {
        initChart() {
            this.chartInstance = this.$echarts.init(this.$refs.seller_ref,this.theme)
            const initOption = {
                grid: {//对坐标轴进行配置
                    top: '20%',
                    left: '2%',
                    // right:'6%',
                    bottom: '3%',
                    containLabel: true//距离包含坐标轴文字
                },
                xAxis: {
                    type: 'value'
                },
                yAxis: {
                    type: 'category',
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
                                }else if(this.currentYear=='1997'){
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
            //对图表对象进行鼠标事件的监听
            this.chartInstance.on('mouseover', () => {
                clearInterval(this.timeId)
            })
            this.chartInstance.on('mouseout', () => {
                this.startInterval()
            })
        },
        async getData() {
            const { data: ret } = await this.$http.get('sql/data')//跨域到8888端口获取数据
            this.rets = ret
            // console.log(this.currentYear);
            let year=parseInt(this.currentYear)
            year=year-2000
            // console.log(year);
            this.allData = ret[year].chartData;//已取到数据

            this.updateChart()//更新图表
            this.startInterval()//启动定时器
        },
        updateChart() {
            this.allData.sort((a, b) => {
                return  b.score-a.score;
            })
            // 逆序排序+倒转
            const showData = this.allData.slice(0, 7)
            const sellNames = showData.map((item) => {//x轴数据
                return item.province
            }).reverse()
            const sellerValue = showData.map((item) => {//y轴数据
                return item.score
            }).reverse()

            const dataOption = {
                yAxis: {
                    data: sellNames
                },
                series: [
                    {
                        data: sellerValue,
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
                // this.currentPage++
                // if (this.currentPage > this.totalPage) {
                //     this.currentPage = 1
                // }
                this.updateChart()
            }, 2500)
        },
        screenAdapter() {
            this.titleFontsize = this.$refs.seller_ref.offsetWidth / 100 * 5.0
            //和分辨率有关的配置项
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
        handleSelect(currentInfo) {//currentinfo表示当前点击的条目
            // this.allData = currentInfo.chartData
            // this.currentYear = currentInfo.year
            this.currentZhibiao=currentInfo
            this.updateChart()
            this.showChoice = false
        },
        
    }
}
</script>
<style lang="less" scoped>
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
    .select-item{
        cursor: pointer;
    }
}
</style>
