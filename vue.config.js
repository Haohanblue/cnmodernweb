// vue.config.js
const { defineConfig } = require('@vue/cli-service')
const PORT = require('./config/config').PORT;

module.exports = defineConfig({
  devServer:{
    port:PORT
  }
})