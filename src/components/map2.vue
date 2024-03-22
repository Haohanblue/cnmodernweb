<template>
    <div class="com-container" >
        <div class="com-chart" ref="map_ref">
        </div>
    </div>
</template>
<script>
import { getProvinceMapInfo } from '@/utils/map_utils';
import axios from 'axios'
import { mapState } from "vuex"
const BASEURL = require('../../config/config.json').BASEURL;
export default {
    beforeDestroy() {
        this.$bus.$off('dataReceived')
    },
    data() {
        return {
            chartInstance: null,
            allData: null,
            mapData:[],//缓存省份地图数据
            arrYear: [],//------存入年份
            rets: null,
            jsonData:{},
            currentYear:'2000'
        }
    },
    mounted() {
        this.initChart(),
        this.getData(),
        window.addEventListener('resize', this.screenAdapter)
        this.screenAdapter()
        this.$refs['map_ref'].addEventListener('wheel', this.handleMapZoom, { passive: false })// 修改这行，绑定到地图容器
        this.chartInstance.on('timelinechanged', (params) => {
            const newYear = this.arrYear[params.currentIndex];
            this.currentYear = newYear; // 更新组件内部状态
            this.$bus.$emit('year-changed', newYear); // 使用事件总线通知其他组件年份变化
        });
        
    },
    destroyed() {
        window.removeEventListener('reisze', this.screenAdapter)
        this.$refs['map_ref'].removeEventListener('wheel', this.handleMapZoom) // 修改这行，移除绑定的监听器
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
            this.chartInstance.on('dblclick',async(arg)=>{
                console.log(arg.name);
                // const provinceInfo=getProvinceMapInfo(arg.name)
                // console.log(provinceInfo);
                //判断当前点击的省份的地图矢量数据是否存在
                // if(!this.mapData[provinceInfo.key]){
                //     const ret=await axios.get(BASEURL + provinceInfo.path)
                //     this.mapData[provinceInfo.key] = ret.data
                //     // console.log(ret);
                //     this.$echarts.registerMap(provinceInfo.key, ret.data)
                // }
                this.$bus.$emit('province-change',arg.name);
            })
        },
        getData() {
            this.$bus.$on('dataReceived', (data) => {
                this.rets = data.rets
                this.arrYear = data.arrYear
                this.updateChart()
            })
        },
        updateChart() {
            const colorarr = [
                'red', 'green', 'yellow', 'pink','blue','orange','Aqua','GreenYellow','Salmon',
                'DeepPink','OrangeRed','LightSeaGreen','DeepSkyBlue','red', 'green', 'yellow', 
                'pink','blue','orange','Aqua','GreenYellow','Salmon','DeepPink','OrangeRed'
                
            ]

            const dataOption = {
                timeline: {
                    data: this.arrYear,
                    axisType: 'category',
                    autoPlay: true,
                    playInterval: 2500,
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
                    },
                    onchanged: (timelineIndex) => {
        const selectedYear = this.arrYear[timelineIndex];
        this.updateYear(selectedYear);
    }
                },

                options: []
            }

            if (!this.rets) return
            this.rets.forEach((item, index) => {
                // console.log(item.chartData);
                item.chartData.sort((a,b)=>{
                    return a.score-b.score
                })
                const minn=item.chartData[0]
                const maxx=item.chartData[item.chartData.length-1]
                const seriesData = item.chartData.map(data => ({
                    name: data.province,
                    value: data.score
                }));
                // this.currentYear=item.year
                // console.log(this.currentYear);
                dataOption.options.push({
                    title: {
                        text: item.year + '年各省现代化程度',
                        left: "5%",
                        top: "5%"
                    },
                    series: [
                        {
                            data:seriesData,
                            geoIndex: 0,
                            type: "map"
                        }
                    ],
                    visualMap: {
                        min: minn.score,
                        max: maxx.score-0.01,
                        inRange: {
                            color: ['white', colorarr[index]]
                        },
                        calculable: true,
                        precision: 5
                    }
                })
            });
            this.chartInstance.setOption(dataOption)
        },
        screenAdapter() {
            const titleFontsize = document.querySelector('.com-chart').offsetWidth
            const adapterOption = {
                title: {
                    textStyle: {
                        fontSize: titleFontsize * 0.08

                    }
                }
            }
            this.chartInstance.setOption(adapterOption)
            this.chartInstance.resize()
        },
        handleMapZoom(event) {
        // 阻止默认的滚动事件
        event.preventDefault();
        // 获取当前地图的缩放级别
        let scale = this.chartInstance.getOption().geo[0].zoom || 1;
        // 根据滚动的方向调整缩放级别，这里将缩放因子调整为1.2和0.8，以增加灵敏度
        scale *= (event.deltaY > 0) ? 0.8 : 1.2;
        // 限制缩放级别，避免过度放大或缩小
        scale = Math.min(Math.max(scale, 0.5), 5);
        // 应用新的缩放级别
        this.chartInstance.setOption({
            geo: {
                zoom: scale
            }
        });
    },
    updateYear(year) {
        console.log(year);
        this.currentYear = year;
        // console.log(currentYear);
        // 发送事件到全局事件总线
        this.$bus.$emit('year-changed', year);
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
            this.updateYear('2000')
            this.chartInstance.on('timelinechanged', (params) => {
            const newYear = this.arrYear[params.currentIndex];
            this.currentYear = newYear; // 更新组件内部状态
            this.$bus.$emit('year-changed', newYear); // 使用事件总线通知其他组件年份变化
        });
            // this.updateChart()//加载数据更新图表
        }
    },
}
</script>
<style lang="less"></style>
