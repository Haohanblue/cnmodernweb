<template>
    <div class="container">
            <el-row >
                <el-col :span="20" offset="2">
            <div class="main">
                <header class="header">
                <h2>数据查询</h2>
                    <div class="right">
                        <el-button type="primary" icon="el-icon-search" size="mini">查询</el-button>
                        <el-button type="primary" size="mini" style="margin-right: 10px">下载<i class="el-icon-download el-icon--right"></i></el-button>
                        <el-switch
                            style="display: block"
                            v-model="value2"
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

                                    <el-cascader
                                        style="width: 100%"
                                        :options="options"
                                        :props="props"
                                        collapse-tags
                                        placeholder="请选择指标"

                                        clearable></el-cascader>
                                </div>
                                </el-collapse-item>
                            </el-col>
                            <el-col :span="8">
                                <el-collapse-item title="选择时间" name="3">
                                    <div class="block">
                                        <el-slider
                                            v-model="selectedYears"
                                            range
                                            show-stops
                                            :min="2000"
                                            :max="2023"
                                            show-input>
                                        </el-slider>
                                    </div>
                                </el-collapse-item>
                            </el-col>
                        </el-collapse>
                </el-row>
            </div>
                </el-col>
            </el-row>
    </div>
</template>

<script>
import { getOriginalData, getFilledData } from '../../api/request.js';
import { saveAs } from 'file-saver';
import { utils, write } from 'xlsx';
import { options } from '../dict/dict.js';
export default {
    name: "DataComponents",
    data() {
        return {
            provinces: ['北京', '天津', '上海', '重庆', '河北', '山西', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '海南', '四川', '贵州', '云南', '陕西', '甘肃', '青海', '台湾', '内蒙古', '广西', '西藏', '宁夏', '新疆'],
            selectedProvinces: [],
            isIndeterminate: false,
            activeName: '1',
            originalData: null,
            filledData: null,
            selectedYears: [2023,2023],
            selectedDataType: 'original',
            value2: true,
            props: { multiple: true },
            options:options
        }
    },
    methods: {
        handleCheckAllChange(val) {
            this.selectedProvinces = val ? this.provinces : [];
            this.isIndeterminate = false;
        },
        handleCheckedProvincesChange(value) {
            let checkedCount = value.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.provinces.length;
            console.log(this.selectedProvinces);
        },
        fetchData() {
            const province = this.selectedProvince || '北京'; // 替换为实际的省份
            const year = this.selectedYear || 2023; // 替换为实际的年份
            const dataType = this.selectedDataType;
            const fetchDataFunc = dataType === 'original' ? getOriginalData : getFilledData;
            fetchDataFunc(province, year)
                .then(data => {
                    this[dataType + 'Data'] = data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        downloadData() {
            const dataType = this.selectedDataType;
            const data = this[dataType + 'Data'];
            if (!data) {
                console.error('数据还没有准备好');
                return;
            }
            const ws = utils.json_to_sheet(data);
            const wb = utils.book_new();
            utils.book_append_sheet(wb, ws, dataType);
            const wbout = write(wb, {bookType:'xlsx', type:'array'});
            saveAs(new Blob([wbout],{type:"application/octet-stream"}), dataType + '.xlsx');
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
</style>