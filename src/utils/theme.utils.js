const theme={
    chalk:{
        borderColor:'rgba(41,52,65,1)',
        backgroundColor:'#161522',
        titleColor:"#ffffff",
        iconfont:true
    },
    vintage:{
        borderColor:'rgb(254,248,239)',
        backgroundColor:'#eeeeee',
        titleColor:"#000000",
        iconfont:false
    }
}
export function getThemeValue(themeName){
    return theme[themeName]
}