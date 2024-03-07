<template>
    <div class="screen-container" :style="containerStyle">
        <header class="screen-header">
            <span class="title">中国现代化大屏展示</span>
            <div class="title-right">
                <span :class="['iconfont',icon.color ?'icon-taiyang':'icon-yueliang']" @click="changeTheme"></span>
            </div>
        </header>
        <div class="screen-body">
            <section class="screen-left">
                <div id="left-top" :class="[fullScreenStatus.trend ? 'fullscreen' : '']">
                    <!-- 销量趋势图表 -->
                    <trend ref="trend"></trend>
                    <div class="resize">
                        <span :class="['iconfont', fullScreenStatus.trend ? 'icon-compress-alt' : 'icon-expand-alt']"
                        @click="changeSize('trend')"></span>
                    </div>
                </div>
                <div id="left-bottom">
                    <!-- 商家销售金额图表 -->
                </div>
            </section>
            <section class="screen-middle">
                <div id="middle-top" :class="[fullScreenStatus.map ? 'fullscreen' : '']">
                    <!-- 商家分布图表 -->
                    <map2 ref="map"></map2>
                    <div class="resize">
                        <span :class="['iconfont', fullScreenStatus.map ? 'icon-compress-alt' : 'icon-expand-alt']"
                            @click="changeSize('map')"></span>
                    </div>
                </div>
                <div id="middle-bottom" :class="[fullScreenStatus.rank ? 'fullscreen' : '']">
                    <!-- 地区销量排行图表 -->
                    <rank ref="rank"></rank>
                    <div class="resize">
                        <span :class="['iconfont', fullScreenStatus.rank ? 'icon-compress-alt' : 'icon-expand-alt']"
                            @click="changeSize('rank')"></span>
                    </div>
                </div>
            </section>
            <section class="screen-right">
                <div id="right-top" :class="[fullScreenStatus.seller ? 'fullscreen' : '']">
                    <seller2 ref="seller"></seller2>
                    <div class="resize">
                        <span :class="['iconfont', fullScreenStatus.seller ? 'icon-compress-alt' : 'icon-expand-alt']"
                            @click="changeSize('seller')"></span>
                    </div>
                    <!-- 热销商品占比图表 -->
                </div>
                <div id="right-bottom">
                    <!-- 库存销量分析图表 -->
                </div>
            </section>
        </div>
    </div>
</template>
<script>
import singlemap from '@/components/map.vue';
import map2 from '@/components/map2.vue';
import trend from '@/components/trend.vue';
import seller from '@/components/seller.vue';
import seller2 from '@/components/seller2.vue';
import rank from '@/components/rank.vue';
import { mapState } from 'vuex';
import { getThemeValue } from '@/utils/theme.utils';
import '@/assets/css2/iconfont.css'
export default {
    data() {
        return {
            fullScreenStatus: {
                trend: false,
                seller: false,
                map: false,
                rank: false,
                hot: false,
                stock: false
            }
        }
    },
    components: {
        singlemap,
        trend,
        seller2,
        rank,
        map2
    },
    methods: {
        changeSize(chartName) {
            // 先得到目标状态
            const targetValue = !this.fullScreenStatus[chartName]
            // 将所有的图表设置为非全屏
            Object.keys(this.fullScreenStatus).forEach(item => {
                this.fullScreenStatus[item] = false
            })
            // 将目标图表设置为目标状态
            this.fullScreenStatus[chartName] = targetValue
            this.$nextTick(() => {
                this.$refs[chartName].screenAdapter()
            })
        },
        changeTheme(){
            this.$store.commit('changeTheme')
        }
    },
    computed:{
        icon(){   //切换icon图标
            return{
                color:getThemeValue(this.theme).iconfont
            }
        },
        containerStyle(){
            return{
                backgroundColor:getThemeValue(this.theme).backgroundColor,
                color:getThemeValue(this.theme).titleColor
            }
        },
        ...mapState(['theme']),
    }
}
</script>
<style lang="less" scoped>
/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
@font-face {
  font-family: 'iconfont';  /* Project id 4436678 */
  src: url('//at.alicdn.com/t/c/font_4436678_9k41j5qrgrm.woff2?t=1708314494825') format('woff2'),
       url('//at.alicdn.com/t/c/font_4436678_9k41j5qrgrm.woff?t=1708314494825') format('woff'),
       url('//at.alicdn.com/t/c/font_4436678_9k41j5qrgrm.ttf?t=1708314494825') format('truetype');
}
.iconfont{
    // font-size: 10px;
    font-family:"iconfont" !important;
    font-size:25px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
.fullscreen {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    margin: 0 !important;
    z-index: 100;
}

.screen-container {
    width: 100%;
    height: 100%;
    padding: 0 20px;
    background-color: #161522;
    color: #fff;
    box-sizing: border-box;
}

.screen-header {
    width: 100%;
    height: 64px;
    font-size: 20px;
    position: relative;


    .title {
        position: absolute;
        left: 50%;
        top: 50%;
        font-size: 20px;
        transform: translate(-50%, -50%);
    }

    .title-right {
        display: flex;
        align-items: center;
        position: absolute;
        right: 0px;
        top: 50%;
        transform: translateY(-80%);
    }

    .qiehuan {
        width: 28px;
        height: 21px;
        cursor: pointer;
    }

    .datetime {
        font-size: 15px;
        margin-left: 10px;
    }

    .logo {
        position: absolute;
        left: 0px;
        top: 50%;
        transform: translateY(-80%);
    }
}

.screen-body {
    width: 100%;
    height: 100%;
    display: flex;
    margin-top: 10px;

    .screen-left {
        height: 100%;
        width: 27.6%;

        #left-top {
            height: 53%;
            position: relative;
        }

        #left-bottom {
            margin-top: 25px;
            position: relative;
        }
    }

    .screen-middle {
        height: 100%;
        width: 41.5%;
        margin-left: 1.6%;
        margin-right: 1.6%;

        #middle-top {
            width: 100%;
            height: 56%;
            position: relative;
        }

        #middle-bottom {
            margin-top: 25px;
            width: 100%;
            height: 28%;
            position: relative;
        }
    }

    .screen-right {
        height: 100%;
        width: 27.6%;

        #right-top {
            height: 46%;
            position: relative;
        }

        #right-bottom {
            height: 38%;
            margin-top: 25px;
            position: relative;
        }
    }
}

.resize {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
}</style>
