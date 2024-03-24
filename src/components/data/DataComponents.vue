<template>
    <div class="main">
    <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="选择地区" name="1">
            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
        </el-collapse-item>
        <el-collapse-item title="选择指标" name="2">
            <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
        </el-collapse-item>
        <el-collapse-item title="选择时间" name="3">
            <div>简化流程：设计简洁直观的操作流程；</div>
            <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
            <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
        </el-collapse-item>
    </el-collapse>
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