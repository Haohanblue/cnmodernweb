export let indicators= {
    "A1": { name: "常住人口出生率", unit: "%" },
    "A2": { name: "常住人口死亡率", unit: "%" },
    "A3": { name: "常住人口自然增长率", unit: "%" },
    "A4": { name: "平均预期寿命", unit: "岁" },
    "A5": { name: "常住人口抚养比", unit: "%" },
    "A6": { name: "每十万人口高等学校平均在校生数", unit: "人" },
    "B1": { name: "人均GDP基尼系数", unit: "无" },
    "B2": { name: "城镇化率", unit: "%" },
    "B3": { name: "城镇登记失业率", unit: "%" },
    "B4": { name: "粗离婚率", unit: "%" },
    "B5": { name: "城市居民最低生活保障人数", unit: "人" },
    "B6": { name: "农村居民最低生活保障人数", unit: "人" },
    "B7": { name: "孤儿数", unit: "人" },
    "C1": { name: "人均农村居民消费支出", unit: "元" },
    "C2": { name: "人均城镇居民消费支出", unit: "元" },
    "C3": { name: "人均城市道路面积", unit: "平方米" },
    "C4": { name: "城市每万人拥有公共交通车辆", unit: "标台" },
    "C5": { name: "城市道路照明灯", unit: "千盏" },
    "C6": { name: "互联网普及率", unit: "%" },
    "C7": { name: "城镇居民每百户家用电脑拥有量", unit: "台" },
    "C8": { name: "居民平均每百户年末移动电话拥有量", unit: "台" },
    "C9": { name: "单位人口拥有公共图书馆藏量", unit: "册" },
    "C10": { name: "艺术表演场馆演出场次", unit: "万场次" },
    "C11": { name: "每万人博物馆文物藏品", unit: "件" },
    "C12": { name: "博物馆从业人员", unit: "人" },
    "C13": { name: "规模以上工业企业R&D经费/GDP", unit: "%" },
    "C14": { name: "地方财政教育支出/GDP", unit: "%" },
    "D1": { name: "城市绿地面积", unit: "公顷" },
    "D2": { name: "人均公园绿地面积", unit: "平方米" },
    "D3": { name: "自然保护区占辖区面积比重", unit: "%" },
    "D4": { name: "环境保护支出", unit: "亿元" },
    "D5": { name: "万元GDP能源消费量", unit: "吨标准煤/万元" },
    "D6": { name: "生活垃圾清运量", unit: "万吨" },
    "D7": { name: "每万人拥有公共厕所", unit: "座/万人" },
    "D8": { name: "城市污水日处理能力", unit: "万立方米" },
    "E1": { name: "第一产业增加值占比", unit: "%" },
    "E2": { name: "第二产业增加值占比", unit: "%" },
    "E3": { name: "第三产业增加值占比", unit: "%" },
    "E4": { name: "人均GDP", unit: "元/人" },
    "E5": { name: "人均一般公共预算收入", unit: "元/人" },
    "E6": { name: "人均实际利用外资", unit: "美元/人" },
    "E7": { name: "人均对外直接投资净额", unit: "美元/人" },
    "E8": { name: "人均境内货源地出口总额", unit: "美元/人" },
    "E9": { name: "人均境内目的地进口总额", unit: "美元/人" }
};
export let options = [
    {
        "value": "A",
        "label": "人口规模巨大的现代化",
        "children": [
            {
                "value": "A1",
                "label": "常住人口出生率"
            },
            {
                "value": "A2",
                "label": "常住人口死亡率"
            },
            {
                "value": "A3",
                "label": "常住人口自然增长率"
            },
            {
                "value": "A4",
                "label": "平均预期寿命"
            },
            {
                "value": "A5",
                "label": "常住人口抚养比"
            },
            {
                "value": "A6",
                "label": "每十万人口高等学校平均在校生数"
            }
        ]
    },
    {
        "value": "B",
        "label": "共同富裕的现代化",
        "children": [
            {
                "value": "B1",
                "label": "人均GDP基尼系数"
            },
            {
                "value": "B2",
                "label": "城镇化率"
            },
            {
                "value": "B3",
                "label": "城镇登记失业率"
            },
            {
                "value": "B4",
                "label": "粗离婚率"
            },
            {
                "value": "B5",
                "label": "城市居民最低生活保障人数"
            },
            {
                "value": "B6",
                "label": "农村居民最低生活保障人数"
            },
            {
                "value": "B7",
                "label": "孤儿数"
            }
        ]
    },
    {
        "value": "C",
        "label": "物质文明与精神文明相协调的现代化",
        "children": [
            {
                "value": "C1",
                "label": "人均农村居民消费支出"
            },
            {
                "value": "C2",
                "label": "人均城镇居民消费支出"
            },
            {
                "value": "C3",
                "label": "人均城市道路面积"
            },
            {
                "value": "C4",
                "label": "城市每万人拥有公共交通车辆"
            },
            {
                "value": "C5",
                "label": "城市道路照明灯"
            },
            {
                "value": "C6",
                "label": "互联网普及率"
            },
            {
                "value": "C7",
                "label": "城镇居民每百户家用电脑拥有量"
            },
            {
                "value": "C8",
                "label": "居民平均每百户年末移动电话拥有量"
            },
            {
                "value": "C9",
                "label": "单位人口拥有公共图书馆藏量"
            },
            {
                "value": "C10",
                "label": "艺术表演场馆演出场次"
            },
            {
                "value": "C11",
                "label": "每万人博物馆文物藏品"
            },
            {
                "value": "C12",
                "label": "博物馆从业人员"
            },
            {
                "value": "C13",
                "label": "规模以上工业企业R&D经费/GDP"
            },
            {
                "value": "C14",
                "label": "地方财政教育支出/GDP"
            }
        ]
    },
    {
        "value": "D",
        "label": "人与自然和谐共生的现代化",
        "children": [
            {
                "value": "D1",
                "label": "城市绿地面积"
            },
            {
                "value": "D2",
                "label": "人均公园绿地面积"
            },
            {
                "value": "D3",
                "label": "自然保护区占辖区面积比重"
            },
            {
                "value": "D4",
                "label": "环境保护支出"
            },
            {
                "value": "D5",
                "label": "万元GDP能源消费量"
            },
            {
                "value": "D6",
                "label": "生活垃圾清运量"
            },
            {
                "value": "D7",
                "label": "每万人拥有公共厕所"
            },
            {
                "value": "D8",
                "label": "城市污水日处理能力"
            }
        ]
    },
    {
        "value": "E",
        "label": "走和平发展道路的现代化",
        "children": [
            {
                "value": "E1",
                "label": "第一产业增加值占比"
            },
            {
                "value": "E2",
                "label": "第二产业增加值占比"
            },
            {
                "value": "E3",
                "label": "第三产业增加值占比"
            },
            {
                "value": "E4",
                "label": "人均GDP"
            },
            {
                "value": "E5",
                "label": "人均一般公共预算收入"
            },
            {
                "value": "E6",
                "label": "人均实际利用外资"
            },
            {
                "value": "E7",
                "label": "人均对外直接投资净额"
            },
            {
                "value": "E8",
                "label": "人均境内货源地出口总额"
            },
            {
                "value": "E9",
                "label": "人均境内目的地进口总额"
            }
        ]
    }
]

