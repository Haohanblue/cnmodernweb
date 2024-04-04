const configJson = require('./config.json');

let config;
//本地开发
if (configJson.ISLOCAL==0) {
    config = {
        PORT: 23333,
        AXIOSURL: "http://localhost:23334"
    };
} else if (configJson.ISLOCAL==1) {
    config = {
        PORT: 443,
        AXIOSURL: "https://cnmodern.site"
    };
}else{
    config = {
        PORT: 23333,
        AXIOSURL: "http://cnmodern.site"
    };}

module.exports = config;
