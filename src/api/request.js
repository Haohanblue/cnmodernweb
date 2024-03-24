import axios from 'axios';
const AXIOSURL = require('../../config/config.json').AXIOSURL;
export function getRankingsByYear(year) {
    const url = `${AXIOSURL}/sql/data/main/${year}`;
    return axios.get(url)
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            throw error;
        });
}
export function getOriginalData(province, year) {
    const url = `${AXIOSURL}/sql/data/source/${year}/${province}`;
    return axios.get(url)
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            throw error;
        });
}

// 查询填充后的数据的接口
export function getFilledData(province, year) {
    const url = `${AXIOSURL}/sql/data/filled/${year}/${province}`;
    return axios.get(url)
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            throw error;
        });
}