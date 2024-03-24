<template>
    <div>
        <h1>DataComponents</h1>
        <!-- 添加选择器和按钮 -->
        <select v-model="selectedProvince">
            <option value="">全选</option>
            <!-- 替换为实际的省份列表 -->
            <option value="北京">北京</option>
            <option value="上海">上海</option>
            <!-- 省略其他省份 -->
        </select>
        <select v-model="selectedYear">
            <option value="">全选</option>
            <!-- 替换为实际的年份列表 -->
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <!-- 省略其他年份 -->
        </select>
        <select v-model="selectedDataType">
            <option value="original">原始数据</option>
            <option value="filled">填充数据</option>
        </select>
        <button @click="fetchData">查询</button>
        <button @click="downloadData">下载</button>
        <!-- 省略其他代码 -->
    </div>
</template>

<script>
import { getOriginalData, getFilledData } from '../../api/request.js';
import { saveAs } from 'file-saver';
import { utils, write } from 'xlsx';

export default {
    name: "DataComponents",
    data() {
        return {
            originalData: null,
            filledData: null,
            selectedProvince: '',
            selectedYear: '',
            selectedDataType: 'original',
        }
    },
    methods: {
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

</style>