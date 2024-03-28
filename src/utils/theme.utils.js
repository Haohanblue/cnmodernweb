const theme={
    chalk:{
        backgroundImage:'url(' + require('@/assets/black1.jpg') + ')',
        titleColor:"#ffffff",
        iconfont:true
    },
    vintage:{
        backgroundImage:'url(' + require('@/assets/beijin.png') + ')',
        titleColor:"#000000",
        iconfont:false
    }
    
}
export function getThemeValue(themeName){
    return theme[themeName]
}