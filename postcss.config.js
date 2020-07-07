const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");
module.exports = ({ file }) => {
    let remUnit
    if (file && file.dirname && file.dirname.indexOf("vant") > -1) {
        remUnit = 37.5
    } else {
        remUnit = 75
    }
    return {
        plugins: [
            autoprefixer(),
            pxtorem({
                rootValue: remUnit,
                propList: ["*"],
                //过滤掉.van - circle__layer - 开头的class，不进行rem转换
                selectorBlackList: ["van-circle__layer","van-cell","van-picker"]
            }
            )]
    }
}