<template>
    <div class="container">
            <el-row ><el-col :span="20" :offset="2">
            <div class="main">
                <header class="header">
                <h2>数据查询</h2>
                    <div class="right">
                        <el-button type="primary" icon="el-icon-search" size="mini" @click="queryData">查询</el-button>
                        <el-button type="primary" size="mini" style="margin-right: 10px">下载<i class="el-icon-download el-icon--right"></i></el-button>
                        <el-switch
                            style="display: block"
                            v-model="isQueryFilled"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-text="填充数据"
                            inactive-text="原始数据">
                        </el-switch>
                    </div>
                </header>
                <el-row class="aligned-row">
                        <el-collapse v-model="activeName" accordion>
                            <el-col :span="8">
                                <el-collapse-item title="选择地区" name="1">
                                    <el-checkbox-group v-model="selectedProvinces">
                                        <el-checkbox label="全选" :indeterminate="isIndeterminate" @change="handleCheckAllChange"></el-checkbox>
                                        <div class="line"></div>
                                        <el-checkbox class="province-checkbox" v-for="province in provinces" :key="province" :label="province" @change="handleCheckedProvincesChange"></el-checkbox>
                                    </el-checkbox-group>
                                </el-collapse-item>
                            </el-col>
                            <el-col :span="8">
                                <el-collapse-item title="选择指标" name="2">
                                    <div class="block" style="display: flex;justify-content: space-around;align-items: baseline">
                                        <span>指标：</span>
                                        <el-cascader
                                            style="width: 80%"
                                            :options="options"
                                            :props="props"
                                            collapse-tags
                                            placeholder="请选择指标"
                                            clearable
                                            v-model="selectedIndicators"
                                        >
                                        </el-cascader>
                                    </div>
                                </el-collapse-item>
                            </el-col>
                            <el-col :span="8">
                                <el-collapse-item title="选择时间" name="3">
                                    <div class="block" style="display: flex;justify-content: center;flex-direction: column;align-items: center">
                                        <div style="display: flex;justify-content: space-between;width: 100%">
                                            <span style="font-size: 12px"><el-input class="el-input" style="width: 75px" size="mini"  v-model="startYear" type="number" :min="2000" :max="2023"></el-input> 开始年份</span>
                                            <span style="font-size: 12px">结束年份 <el-input class="el-input" style="width: 75px" size="mini" v-model="endYear" type="number" :min="2000" :max="2023"></el-input></span>
                                        </div>

                                        <el-slider style="width: 80%" v-model="selectedYears" range show-input-controls show-stops :min="2000" :max="2023"></el-slider>

                                    </div>
                                </el-collapse-item>
                            </el-col>
                        </el-collapse>
                </el-row>
                <div class="table" style="height: 300px; overflow: auto;">
                    <el-table :data="viewData" style="width: 100%" :span-method="headerSpanMethod" height="500">
                        <el-table-column v-if="isQueryed"
                                         prop="province"
                                         label="省份"
                                         width="60">
                        </el-table-column>
                        <el-table-column v-if="isQueryed"
                                         prop="year"
                                         label="年份"
                                         width="60">
                        </el-table-column>
                        <el-table-column
                            v-for="(header, index) in filteredHeaders"
                            :key="index"
                            :label="`${header.fatherLabel}`">
                            <el-table-column
                                :prop="viewData"
                                :label="`${header.label} (${header.unit})`"
                                width="200">
                                <template slot-scope="scope">
                                    {{ scope.row[header.value] }}
                                </template>
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
                </el-col>
            </el-row>
    </div>
</template>

<script>
import { getOriginalData, getFilledData } from '../../api/request.js';
import { options,indicators,indicatorWithUnit } from '../dict/dict.js';

export default {
    name: "DataComponents",

    data() {
        return {
            //滑块，用于选择查询的表格
            isQueryFilled: true,
            //手风琴的数据
            activeName: '',
            // 选中的省份，是第一个手风琴的数据
            provinces: ['北京', '天津', '上海', '重庆', '河北', '山西', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '海南', '四川', '贵州', '云南', '陕西', '甘肃', '青海', '内蒙古', '广西', '西藏', '宁夏', '新疆'],
            selectedProvinces: [],
            isIndeterminate: false,
            //选中的指标，是第二个手风琴的数据
            props: { multiple: true },
            options,
            selectedIndicators: [],
            //选中的年份，是第三个手风琴的数据
            startYear: 2000,
            endYear: 2023,
            filteredHeaders: [],
            //查询的数据
            viewData:[],
            headers: indicatorWithUnit,
            indexDict: indicators,
            isQueryed: false,
        }
    },
    computed: {
        selectedYears:{
            get(){
                return [this.startYear, this.endYear];
            },
            set(value){
                this.startYear = value[0];
                this.endYear = value[1];
            }
        }
    },
    methods: {
        headerSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0 || columnIndex === 1) {
                return [1, 1];
            }
            let sameFatherLabelCount = this.filteredHeaders.filter(header => header.fatherLabel === column.label).length;
            if (columnIndex % sameFatherLabelCount === 0) {
                return [1, sameFatherLabelCount];
            } else {
                return [0, 0];
            }
        },
        filtHead() {
            this.filteredHeaders = this.headers.filter(header => this.viewData.some(row => row[header.value] !== undefined));
        },


        queryData() {
            let columns = this.selectedIndicators.map(indicator => indicator[1])
            let province = this.selectedProvinces
            let year = Array.from({length: this.endYear - this.startYear + 1}, (_, i) => this.startYear + i);
            let dataType = this.isQueryFilled ? 'filled' : 'original';
            if (columns.length === 0) {
                this.$message({
                    type: 'warning',
                    message: '请至少选中一个指标'
                });
                return;
            }if (province.length === 0) {
                this.$message({
                    type: 'warning',
                    message: '请至少选中一个省份'
                });
                return;
            }
            this.fetchData(province,year,columns,dataType)
        },

        //处理第一个手风琴的全选
        handleCheckAllChange(val) {
            this.selectedProvinces = val ? this.provinces : [];
            this.isIndeterminate = false;
        },
        handleCheckedProvincesChange() {
            let checkedCount = this.selectedProvinces.length
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.provinces.length;
        },
        //处理查询数据
        fetchData(province,year,columns,dataType) {
            console.log("开始查了")
            const fetchDataFunc = dataType === 'original' ? getOriginalData : getFilledData;
            fetchDataFunc(province, year,columns)
                .then(data => {
                    this.viewData = data;
                    this.filtHead();
                    this.isQueryed = true;
                    console.log(this.viewData)
                    console.log(this.headers)
                })
                .catch(error => {
                    console.error(error);
                });
        },
        //处理下载数据
        downloadData() {
        },
    },
}
</script>

<style scoped>
.container{
    background-color: #f5f5f5;
}
.header{
    display: flex;
    justify-content: space-between;

}
.right{
    display: flex;
    justify-content: space-around;
    align-items: stretch;
}
.aligned-row {
    width: 100%;
}
.province-checkbox {
    display: inline-block;
    width: 50px;
}
el-input{
    margin: 5px;
}
</style>