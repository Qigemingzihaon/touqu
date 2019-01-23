 //获取get参数
 export function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    console.log(r)
    if (r != null)return unescape(r[2]);
    console.log(name)
    return null;
}