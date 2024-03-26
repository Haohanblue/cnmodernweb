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
export function getOriginalData(province, year,columns) {
    // 创建一个 URLSearchParams 对象
    let params = new URLSearchParams();
    // 添加参数
    if (year) params.append('year', year.join(','));
    if (province) params.append('province', province.join(','));
    if (columns) params.append('columns', columns);
    // 创建 URL
    const url = `${AXIOSURL}/sql/data/source?${params.toString()}`;
    return axios.get(url)
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            throw error;
        });
}

// 查询填充后的数据的接口
export function getFilledData(province, year, columns) {
    // 创建一个 URLSearchParams 对象
    let params = new URLSearchParams();
    // 添加参数
    if (year) params.append('year', year.join(','));
    if (province) params.append('province', province.join(','));
    if (columns) params.append('columns', columns);
    // 创建 URL
    const url = `${AXIOSURL}/sql/data/filled?${params.toString()}`;
    return axios.get(url)
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            throw error;
        });
}
export function downloadOriginalData(province, year, columns) {
    // 创建一个 URLSearchParams 对象
    let params = new URLSearchParams();
    // 添加参数
    if (year) params.append('year', year.join(','));
    if (province) params.append('province', province.join(','));
    if (columns) params.append('columns', columns);
    // 创建 URL
    const url = `${AXIOSURL}/sql/download/source?${params.toString()}`;
    return axios.get(url, { responseType: 'blob' })
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            throw error;
        });
}
export function downloadFilledData(province, year, columns) {
    // 创建一个 URLSearchParams 对象
    let params = new URLSearchParams();
    // 添加参数
    if (year) params.append('year', year.join(','));
    if (province) params.append('province', province.join(','));
    if (columns) params.append('columns', columns);
    // 创建 URL
    const url = `${AXIOSURL}/sql/download/filled?${params.toString()}`;
    return axios.get(url, { responseType: 'blob' })
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            throw error;
        });
}
