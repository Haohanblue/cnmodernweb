<template>
    <div class="com-container" @dblclick="revertMap">
        <div class="com-chart" ref="map_ref"></div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from "vuex"
import { getProvinceMapInfo } from '@/utils/map_utils'
export default {
    data() {
        return {
            chartInstance: null,
            allData: null,
            mapData: {},//缓存省份地图数据
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
            const ret = await axios.get('http://localhost:8080/static/map/china.json')
            this.$echarts.registerMap('china', ret.data)
            //初始化地图
            const initOption = {
                geo: {
                    type: 'map',
                    map: 'china',
                    top: '20%',
                    bottom: '3%',
                    itemStyle: {
                        // areaColor: "#7FFFAA",
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
            this.chartInstance.on('dblclick', async (arg) => {
                //arg.name得到点击的省份名称，是中文
                // console.log(arg.name);
                const provinceInfo = getProvinceMapInfo(arg.name)
                // console.log(provinceInfo);
                //判断当前点击的省份的地图矢量数据是否存在
                if (!this.mapData[provinceInfo.key]) {
                    const ret = await axios.get('http://localhost:8080' + provinceInfo.path)
                    this.mapData[provinceInfo.key] = ret.data
                    // console.log(ret);
                    this.$echarts.registerMap(provinceInfo.key, ret.data)
                }
                //重置地图到省份图
                const changeOption = {
                    geo: {
                        map: provinceInfo.key
                    }
                }
                this.chartInstance.setOption(changeOption)
            })
        },
        async getData() {
            const { data: ret } = await this.$http.get('sql/data')
            // console.log(ret);
            this.rets = ret
            console.log(this.rets);
            // this.allData = ret[2].chartData;
            //-----------------
            this.arrYear = ret.map((year, index) => {
                return ret[index].year
            })

            this.updateChart()
        },
        updateChart() {
            const colorarr = [
                'red', 'green', 'yellow', 'pink'
            ]
            // console.log('123456');
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
            // console.log('1234567');
            if (!this.rets) return
            this.rets.forEach((item, index) => {
                // console.log(item.chartData);
                // item.chartData.forEach((item2,index2)=>{
                //     console.log(item2);
                // })
                console.log(item.chartData);
                // console.log(item.chartData.value);
                // console.log(chartData+'data');
                // console.log(index);
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
                        min: 0,
                        max: 0.020,
                        inRange: {
                            color: ['white', colorarr[index]]
                        },
                        calculable: true,
                        precision: 5
                    }
                })
            });
            // console.log('12345678');
            console.log(this.chartInstance);
            console.log(dataOption);
            this.chartInstance.setOption(dataOption)
            // console.log('123456789');
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
        revertMap() {
            //重置地图
            const revertOption = {
                geo: {
                    map: 'china'
                }
            }
            this.chartInstance.setOption(revertOption)
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
