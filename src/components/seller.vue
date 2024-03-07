<template>
    <div class="com-container">
        <div class="title">
            <span>我是标题</span>
            <span class="iconfont title-icon" >&#xe6eb;</span>
            <div class="select-con">
                <div class="select-item">我是标题一</div>
                <div class="select-item">我是标题二</div>
                <div class="select-item">我是标题三</div>
            </div>
        </div>
        <div class="com-chart" ref="seller_ref"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            chartInstance: null,
            allData: null,
            currentPage: 1,
            totalPage: 0,
            timeId: null,
            remainPage:0
        }
    },

    mounted() {
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
    },
    methods: {
        initChart() {
            this.chartInstance = this.$echarts.init(this.$refs.seller_ref, 'chalk')
            const initOption = {
                // title: {//标题内容、大小、位置
                //     text: '『1996年各省现代化指数』',
                //     left: 20,
                //     top: 20
                // },
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
                            color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                {
                                    offset: 0,
                                    color: '#5052EE'
                                },
                                {
                                    offset: 1,
                                    color: "#AB6EE5"
                                }
                            ])
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
            // console.log(ret[0].chartData);
            this.allData = ret[0].chartData;//已取到数据
            //可对数据进行处理
            this.totalPage = parseInt(this.allData.length / 5) //设置总共的页数
            // console.log(this.allData.length);
            console.log(this.totalPage);
            this.remainPage=this.allData.length - (5 * this.totalPage)//除不尽的余数
            console.log(this.remainPage);
            //***************存在的问题：最后一列只有一个省**************
            this.updateChart()//更新图表
            this.startInterval()//启动定时器
        },
        updateChart() {
            const start = (this.currentPage - 1) * 5
            let end=0
            if(this.currentPage==this.totalPage){
                end = this.currentPage * 5+this.remainPage
            }else{
                end = this.currentPage * 5
            }
            
            const showData = this.allData.slice(start, end)
            const sellNames = showData.map((item) => {//x轴数据
                return item.name
            })
            const sellerValue = showData.map((item) => {//y轴数据
                return item.value
            })
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
                this.currentPage++
                if (this.currentPage > this.totalPage) {
                    this.currentPage = 1
                }
                this.updateChart()
            }, 3000)
        },
        screenAdapter() {
            // console.log(this.$refs.seller_ref.offsetWidth)
            const titleFontsize = this.$refs.seller_ref.offsetWidth / 100 * 5.0
            //和分辨率有关的配置项
            const adapterOption = {
                title: {//标题内容、大小、位置
                    textStyle: {
                        fontSize: titleFontsize
                    },

                },
                tooltip: {//背景，提示框
                    axisPointer: {
                        lineStyle: {
                            width: titleFontsize,
                        }
                    }
                },
                series: [
                    {
                        barWidth: titleFontsize,//柱宽
                        itemStyle: {
                            barBorderRadius: [0, titleFontsize / 2, titleFontsize / 2, 0],//圆角
                        }
                    }
                ]
            }
            this.chartInstance.setOption(adapterOption)
            this.chartInstance.resize()
        }
    }
}
</script>
<style lang="less" scoped>
.title{
    position: absolute;
    z-index: 10;
    left: 10px;
    top: 20px;
    color: white;
    .title-icon{
        margin-left: 10px;
        cursor: pointer;
    }
}
</style>