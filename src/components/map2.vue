<template>
    <div class="com-container" >
        <div class="com-chart" ref="map_ref"></div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from "vuex"
const BASEURL = require('../../config/config.json').BASEURL;
export default {
    data() {
        return {
            chartInstance: null,
            allData: null,
            arrYear: [],//------存入年份
            rets: null,
            jsonData:{}
        }
    },
    mounted() {
        this.initChart(),
        this.getData(),
        window.addEventListener('resize', this.screenAdapter)
        this.screenAdapter()
    },
    destroyed() {
        window.removeEventListener('reisze', this.screenAdapter)
    },
    methods: {
        async initChart() {
            this.chartInstance = this.$echarts.init(this.$refs.map_ref, this.theme)
            //获取中国地图的矢量数据
            const ret = await axios.get(BASEURL+'/static/map/china.json')
            this.$echarts.registerMap('china', ret.data)
            //初始化地图
            const initOption = {
                geo: {
                    type: 'map',
                    map: 'china',
                    top: '20%',
                    bottom: '3%',
                    itemStyle: {
                        borderColor: "#333"
                    }
                },
                tooltip: {
                    trigger: 'item',
                    show: true,
                    formatter: '{b}:{c}'
                }
            }
            this.chartInstance.setOption(initOption)
        },
        async getData() {
            const { data: ret } = await this.$http.get('sql/data')
            // console.log(ret);
            this.rets = ret
            // console.log(this.rets);
            // this.allData = ret[2].chartData;
            //-----------------
            this.arrYear = ret.map((year, index) => {
                return ret[index].year
            })

            this.updateChart()
        },
        updateChart() {
            const colorarr = [
                'red', 'green', 'yellow', 'pink','blue','orange','Aqua','GreenYellow','Salmon',
                'DeepPink','OrangeRed','LightSeaGreen','DeepSkyBlue'
            ]

            const dataOption = {
                timeline: {
                    data: this.arrYear,
                    axisType: 'category',
                    autoPlay: true,
                    playInterval: 2000,
                    left: '8%',
                    right: '2%',
                    width: '80%',
                    label: {
                        normal: {
                            textStyle: {
                                color: '#ddd'
                            }
                        },
                        emphasis: {
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    symbolSize: 10,
                    lineStyle: {
                        color: '#555'
                    },
                    checkpointStyle: {
                        borderColor: "#888",
                        boderWidth: 2
                    },
                    controlStyle: {
                        showNextBtn: true,
                        showPrevBtn: true,
                        normal: {
                            color: '#666',
                            borderColor: '#666'
                        },
                        emphasis: {
                            color: '#aaa',
                            borderColor: '#aaa'
                        }
                    }
                },

                options: []
            }

            if (!this.rets) return
            this.rets.forEach((item, index) => {
                // console.log(item.chartData);
                item.chartData.sort((a,b)=>{
                    return a.value-b.value
                })
                const minn=item.chartData[0]
                const maxx=item.chartData[item.chartData.length-1]
                console.log(minn);
                console.log(maxx);
                dataOption.options.push({
                    title: {
                        text: item.year + '年各省现代化程度',
                        left: "5%",
                        top: "5%"
                    },
                    series: [
                        {
                            data:item.chartData,
                            geoIndex: 0,
                            type: "map"
                        }
                    ],
                    visualMap: {
                        min: minn.value,
                        max: maxx.value-0.01,
                        inRange: {
                            color: ['white', colorarr[index]]
                        },
                        calculable: true,
                        precision: 5
                    }
                })
            });
            // console.log(this.chartInstance);
            // console.log(dataOption);
            this.chartInstance.setOption(dataOption)
        },
        screenAdapter() {
            const titleFontsize = document.querySelector('.com-chart').offsetWidth
            const adapterOption = {
                title: {
                    textStyle: {
                        fontSize: titleFontsize * 0.05,

                    }
                }
            }
            this.chartInstance.setOption(adapterOption)
            this.chartInstance.resize()
        },

    },
    computed: {
        ...mapState(['theme'])
    },
    watch: {
        theme() {
            this.chartInstance.dispose()//摧毁实例对象
            this.initChart()//初始化图表
            this.screenAdapter()//分辨率适配
            setTimeout(() => {
                this.updateChart()
            }, 500);
            // this.updateChart()//加载数据更新图表
        }
    },
}
</script>
<style lang="less"></style>
