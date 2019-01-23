import md5 from 'js-md5'
export default function signCkeck(obj){
    // 自定义参数
    obj.app_key='9C4CDC1C-C7E6-4D74-98EB-38B7CA1B0FE6';
    var arr = [];
    var params = '';
    for (var item in obj) {
        // 将所有非空参数(不为null,不为"",不为"   " 假如参数为0 请以字符串方式传递)
        if (typeof obj[item] !== 'object') {
            if (obj[item] !== null && !/^\s*$/.test(obj[item]) && obj[item] != '') {
                if (typeof obj[item] == 'boolean' && obj[item] != 0) {
                    params = item.toLowerCase() + '=' + (obj[item] ? 'true' : 'false');
                } else {
                    params = item.toLowerCase() + '=' + obj[item];
                }
            arr.push(params);
            }
        }
    }
    arr.sort();
    // 进行md5加密并且转换成大写
    var str = md5(arr.join('TAOSHOP')).toUpperCase();
    return str;
}
