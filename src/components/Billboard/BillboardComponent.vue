<template>
    <div class="billboard">
        <div class="header">
            <h2>{{selectedYear}}年排行榜</h2>
            <div>
                <label>选择年份：</label><el-select v-model="selectedYear" placeholder="请选择年份" size="mini">
                <el-option
                    v-for="year in years"
                    :key="year"
                    :label="year"
                    :value="year">
                </el-option>
            </el-select>
            </div>
        </div>
        <el-tabs type="border-card" class="tabs" stretch @tab-click="handleTabClick">
            <el-tab-pane v-for="(item, index) in billboardData" :key="index" :label="item.label" lazy >
                <el-table class="el-table"
                    :data="item.data"
                    stripe
                    style="width: 100%"
                          height="470"
                    fit :header-cell-style="{textAlign: 'center'}"
                          :cell-style="{ textAlign: 'center' }">
                    <el-table-column
                        prop="year"
                        label="年份"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="province"
                        label="省份"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="value"
                        label="分数"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="rank"
                        label="排名"
                    >
                    </el-table-column>
                </el-table>
            </el-tab-pane>

        </el-tabs>
    </div>
</template>

<script>
import { getRankingsByYear } from '../../api/request.js';
export default {
    name: "BillboardPage",
    data() {
        return {
            Current_list: [],
            Tlist: [],
            Alist: [],
            Blist: [],
            Clist: [],
            Dlist: [],
            Elist: [],
            years: Array.from({length: 24}, (_, i) => i + 2000), // 生成2000年到2023年的数组
            selectedYear: 2023, // 存储选中的年份
        }
    },
    computed: {
        billboardData() {
            return [
                {
                    label: '总得分',
                    data: this.Current_list
                },
                {
                    label: '人口规模巨大的现代化',
                    data: this.Current_list
                },
                {
                    label: '共同富裕的现代化',
                    data: this.Current_list
                },
                {
                    label: '物质文明与精神文明相协调的现代化',
                    data: this.Current_list
                },
                {
                    label: '人与自然和谐共生的现代化',
                    data: this.Current_list
                },
                {
                    label: '走和平发展道路的现代化',
                    data: this.Current_list
                },
                // 其他的排行榜数据
            ]
        }
    },
    watch: {
        selectedYear: {
            immediate: true,
            handler(newYear) {
                getRankingsByYear(newYear)
                    .then(data => {
                        const chartData = data[0].chartData;
                        this.Tlist = chartData.map(item => ({
                            province: item.province,
                            year: item.year,
                            value: item.score,
                            rank: item.total_rank
                        })).sort(this.compare);
                        this.Alist = chartData.map(item => ({
                            province: item.province,
                            year: item.year,
                            value: item.A,
                            rank: item.A_rank
                        })).sort(this.compare);
                        this.Blist = chartData.map(item => ({
                            province: item.province,
                            year: item.year,
                            value: item.B,
                            rank: item.B_rank
                        })).sort(this.compare);
                        this.Clist = chartData.map(item => ({
                            province: item.province,
                            year: item.year,
                            value: item.C,
                            rank: item.C_rank
                        })).sort(this.compare);
                        this.Dlist = chartData.map(item => ({
                            province: item.province,
                            year: item.year,
                            value: item.D,
                            rank: item.D_rank
                        })).sort(this.compare);
                        this.Elist = chartData.map(item => ({
                            province: item.province,
                            year: item.year,
                            value: item.E,
                            rank: item.E_rank
                        })).sort(this.compare);
                        this.Current_list = this.Tlist
                    })
                    .catch(error => {
                        console.error(error);
                    });
            },
        },
    },
    methods: {
        handleTabClick(tab) {
            let index = tab.paneName
            switch (index) {
                case '0':
                    this.Current_list = this.Tlist
                    break;
                case '1':
                    this.Current_list = this.Alist
                    break;
                case '2':
                    this.Current_list = this.Blist
                    break;
                case '3':
                    this.Current_list = this.Clist
                    break;
                case '4':
                    this.Current_list = this.Dlist
                    break;
                case '5':
                    this.Current_list = this.Elist
                    break;
            }
        },
        compare(a, b) {
            if (a.rank < b.rank) {
                return -1;
            }
            if (a.rank > b.rank) {
                return 1;
            }
            return 0;
        },
},
}
</script>
<style scoped>

.billboard {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    padding-left: 100px;
    padding-right: 100px;

}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 5px;

}

.header h2 {
    font-size: 24px;
    color: #333;
}

.tabs {
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-around; /* 添加这一行 */
}
.el-table,
.el-table-column {
    text-align: center;
}

</style>