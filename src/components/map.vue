<template>
    <div class="com-container" @dblclick="revertMap">
        <div class="com-chart" ref="map_ref"></div>
    </div>
</template>
<script>
import axios from 'axios'
import { mapState } from "vuex"
import { getProvinceMapInfo } from '@/utils/map_utils'
const BASEURL = require('../../config/config.json').BASEURL;
export default {
    data() {
        return {
            chartInstance: null,
            allData: null,
            mapData: {},//缓存省份地图数据
            arrYear: []//------存入年份
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
        async initChart() {
            this.chartInstance = this.$echarts.init(this.$refs.map_ref, this.theme)
            //获取中国地图的矢量数据
            const ret = await axios.get(BASEURL+'/static/map/china.json')
            this.$echarts.registerMap('china', ret.data)
            //初始化地图
            const initOption = {
                backgroundColor: 'rgba(41,52,65,1)',
                title: {
                    text: "『1998年各省现代化指数热力图』",
                    top: '8%',
                    left: '3%',
                    color: 'white'
                },
                geo: {
                    type: 'map',
                    map: 'china',
                    top: '20%',
                    bottom: '3%',
                    itemStyle: {
                        areaColor: "#7FFFAA",
                        borderColor: "#333"
                    }
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
                    const ret = await axios.get(BASEURL + provinceInfo.path)
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
            this.allData = ret[2].chartData;
            //-----------------
            this.arrYear = ret.map((year, index) => {
                return ret[index].year
            })
            console.log(this.arrYear);
            //-------------
            this.updateChart()
        },
        updateChart() {
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
                series: [
                    {
                        data: this.allData,
                        geoIndex: 0,
                        type: "map"
                    }
                ],
                visualMap: {
                    min: 0,
                    max: 0.020,
                    inRange: {
                        color: ['white', '#7FFFAA']
                    },
                    calculable: true,
                    precision: 5
                }
            }
            this.chartInstance.setOption(dataOption)
        },
        screenAdapter() {
            const titleFontsize = document.querySelector('.com-chart').offsetWidth
            const adapterOption = {
                title: {
                    textStyle: {
                        fontSize: titleFontsize * 0.05,
                        color: "white"
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
        }
    }
}
</script>
<style lang="less"></style>