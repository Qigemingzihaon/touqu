const baseURL = 'https://www.jollykeys.cn/newspring_user/';
// const baseURL = 'https://www.7hmall.com/newspring_staff/';
const share_Arr = [
    {
        title : '泸州老窖年货节',
        desc : '开启一年好运到',
        imgUrl : 'https://gatewayfile.oss-cn-shenzhen.aliyuncs.com/newspring/6n11.png',
        link:baseURL
    }, {
        title : '泸州老窖年货节',
        desc : '开启一年好运到',
        imgUrl : 'https://gatewayfile.oss-cn-shenzhen.aliyuncs.com/newspring/6n11.png',
        link:baseURL
    }, {
        title : '泸州老窖年货节',
        desc : '开启一年好运到',
        imgUrl : 'https://gatewayfile.oss-cn-shenzhen.aliyuncs.com/newspring/6n11.png',
        link:baseURL
    }
];
function share_m(){
    let num =parseInt(Math.random() * share_Arr.length);
    // console.log(num)
    return share_Arr[num]
}
module.exports = {
    share_Arr,
    share_m,
    baseURL
}
