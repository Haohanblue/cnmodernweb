<template>
    <div class="screen-container background-container" :style="containerStyle">
        <header class="screen-header">
            <span class="title"  style="font-size: 30; font-weight: bold;">中国现代化大屏展示</span>
            <div class="title-right">
                <span :class="['iconfont', icon.color ? 'icon-taiyang' : 'icon-yueliang']" @click="changeTheme"
                    style="margin-top: 50px;"></span>
            </div>
        </header>
        <div class="screen-body">
            <section class="screen-left">

                <div id="left-top" :class="[fullScreenStatus.trend ? 'fullscreen' : '']">
                    <trend ref="trend"></trend>
                    <div class="resize">
                        <span :class="['iconfont', fullScreenStatus.trend ? 'icon-compress-alt' : 'icon-expand-alt']"
                            @click="changeSize('trend')"></span>
                    </div>
                </div>


                <div id="left-bottom" :class="[fullScreenStatus.zujian4 ? 'fullscreen' : '']">
                    <zujian4 ref="zujian4"></zujian4>
                    <div class="resize">
                        <span :class="['iconfont', fullScreenStatus.zujian4 ? 'icon-compress-alt' : 'icon-expand-alt']"
                            @click="changeSize('zujian4')"></span>
                    </div>
                </div>


            </section>
            <section class="screen-middle">
                <div id="middle-top" :class="[fullScreenStatus.map ? 'fullscreen' : '']">
                    <map2 ref="map"></map2>
                    <div class="resize">
                        <span :class="['iconfont', fullScreenStatus.map ? 'icon-compress-alt' : 'icon-expand-alt']"
                            @click="changeSize('map')"></span>
                    </div>
                </div>



                <div id="middle-bottom" :class="[fullScreenStatus.rank ? 'fullscreen' : '']">

                </div>
            </section>
            <section class="screen-right">
                <div id="right-top" :class="[fullScreenStatus.seller ? 'fullscreen' : '']">
                    <seller2 ref="seller"></seller2>
                    <div class="resize">
                        <span :class="['iconfont', fullScreenStatus.seller ? 'icon-compress-alt' : 'icon-expand-alt']"
                            @click="changeSize('seller')"></span>
                    </div>
                </div>




                <div id="right-bottom" :class="[fullScreenStatus.rank ? 'fullscreen' : '']">
                    <rank ref="rank"></rank>
                    <div class="resize">
                        <span :class="['iconfont', fullScreenStatus.rank ? 'icon-compress-alt' : 'icon-expand-alt']"
                            @click="changeSize('rank')"></span>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
import map2 from '@/components/home/map2.vue';
import trend from '@/components/home/trend.vue';
import seller2 from '@/components/home/seller2.vue';
import rank from '@/components/home/rank.vue';
import tabBar from "@/components/tabBar.vue";
import zujian4 from '@/components/home/zujian4.vue';

import { mapState } from 'vuex';
import { getThemeValue } from '@/utils/theme.utils';
import '@/assets/css2/iconfont.css'
export default {
    async created() {
        const { data: ret } = await this.$http.get('sql/data/main');
        this.rets = ret;
        this.arrYear = ret.map((year, index) => {
            return ret[index].year;
        });
        const{data:ret2}=await this.$http.get('sql/data/area');
        this.retArea=ret2
        // 发送事件和数据
        this.$bus.$emit('dataArea',this.retArea);
        this.$bus.$emit('dataReceived', { rets: this.rets, arrYear: this.arrYear });
    },
    data() {
        return {
            fullScreenStatus: {
                trend: false,
                seller: false,
                map: false,
                rank: false,
                hot: false,
                stock: false,
                zujian4: false,
                rets: null,
                retArea:null,
                arrYear: [],
            },
            backgroundImageUrl: '@/assets/black1.jpg'
        }
    },
    components: {
        trend,
        seller2,
        rank,
        map2,
        tabBar,
        zujian4,
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
            this.$bus.$emit('changebackGround',{name:chartName,sta:targetValue});//传送过去的status值是true
        },
        changeTheme() {
            this.$store.commit('changeTheme')

        }
    },
    computed: {
        icon() {   //切换icon图标
            return {
                color: getThemeValue(this.theme).iconfont
            }
        },
        containerStyle() {
            return {
                // backgroundColor: getThemeValue(this.theme).backgroundColor,
                // backgroundImage:getThemeValue(this.theme).backgroundImage,
                color: getThemeValue(this.theme).titleColor,
                // backgroundImage: 'url(' + require('@/assets/black1.jpg') + ')',
                backgroundImage:getThemeValue(this.theme).backgroundImage
            }
        },
        ...mapState(['theme']),
    }
}
</script>
<style lang="less" scoped>
/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
@font-face {
    font-family: 'iconfont';
    /* Project id 4436678 */
    src: url('//at.alicdn.com/t/c/font_4436678_9k41j5qrgrm.woff2?t=1708314494825') format('woff2'),
        url('//at.alicdn.com/t/c/font_4436678_9k41j5qrgrm.woff?t=1708314494825') format('woff'),
        url('//at.alicdn.com/t/c/font_4436678_9k41j5qrgrm.ttf?t=1708314494825') format('truetype');
}

.iconfont {
    // font-size: 10px;
    // margin-top: 5px;
    font-family: "iconfont" !important;
    font-size: 25px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}

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
    height: 93%;
    padding: 0 20px;
    // background-color: #161522;
    color: #fff;
    box-sizing: border-box;
}

.screen-header {
    width: 100%;
    height: 45px;
    font-size: 20px;
    position: relative;


    .title {
        position: absolute;
        left: 50%;
        top:50%;
        bottom: 20%;
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
            height: 45%;
            position: relative;
        }

        #left-bottom {
            height: 45%;
            margin-top: 15px;
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
            height: 92%;
            position: relative;
        }
    }
    .screen-right {
        height: 100%;
        width: 27.6%;

        #right-top {
            height: 45%;
            position: relative;
        }

        #right-bottom {
            height: 45%;
            margin-top: 15px;
            position: relative;
        }
    }
}
.resize {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
}
//背景图片
.background-container {
//   background-image: url('~@/assets/black1.jpg'); /* 这里的路径根据你的项目结构和图片位置来定 */
  background-size: cover; /* 或者使用其他值来适配你的设计需求 */
  background-position: center center;
  background-repeat: no-repeat;
}
</style>
