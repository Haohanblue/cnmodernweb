// vue.config.js
const { defineConfig } = require('@vue/cli-service')
const PORT = require('./config/config').PORT;

module.exports = defineConfig({
  publicPath:'./',
  assetsDir:'static',
  devServer:{
    port:PORT,
  }
})