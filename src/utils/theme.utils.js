const theme={
    chalk:{
        backgroundColor:'#161522',
        titleColor:"#ffffff",
        iconfont:true
    },
    vintage:{
        backgroundColor:'#eeeeee',
        titleColor:"#000000",
        iconfont:false
    }
}
export function getThemeValue(themeName){
    return theme[themeName]
}