/**
type(origin):类型返回
depthClone(origin):深度克隆对象
depthClone2(obj):深度克隆对象
array.unique():数组去重(原型链方法)
*/





/**
 * type(arg):判断一个表达式的类型
 * @param {arg} origin 未知类型表达式
 * @returns {string} 表达式的类型
 */
function type(origin){
    var ret = typeof(origin);
    var template = {
        '[object Array]' : 'array',
        '[object Object]' : 'object',
        '[object Number]' : 'number object',
        '[object Boolean]' : 'boolean object',
        '[object String]' : 'string object'
    }
    if(origin === null){
        return 'null';
    }else if(ret == 'object'){
        var toStr = Object.prototype.toString.call(origin);
        return template[toStr];
    }else{
        return ret;
    }
}

/**
 * depthClone(origin):深度克隆对象
 * @param {arg} origin 未知类型的对象或基础值
 * @returns {obj} 新对象或基础值
 */
function depthClone(origin) {
    var o;
    if (typeof origin == 'object') {
        if (origin === null) {
            o = null;
        } else if (Object.prototype.toString.call(origin) === '[object Array]') {
            o = [];
            for (var i = 0, len = origin.length; i < len; i++) {
                o.push(depthClone(origin[i]));
            }
        } else {
            o = {};
            for (var prop in origin) {
                if (origin.hasOwnProperty(prop)) {
                    o[prop] = depthClone(origin[prop]);
                }
            }
        }
    } else {
        o = origin;
    }
    return o;
}


/** 
 * depthClone2(obj)深度克隆对象-更简洁的写法
 * @param {arg} origin 未知类型表达式
 * @returns {object} 克隆对象
 * 
    1、toString判断数据是不是数组，依次声明 o的类型。
    2、枚举对象，判断属性是否属于自身，过滤原型链属性
    3、赋值，如果是对象就递归循环，如果是基础值，则直接赋值。
*/
function depthClone2(origin) {
    var o = Object.prototype.toString.call(origin) === '[object Array]' ? [] : {};
    for (var p in origin) {
        if (origin.hasOwnProperty(p)) {
            o[p] = typeof origin[p] === "object" ? depthClone2(origin[p]) : origin[p];
        }
    }
    return o;
}



/**
 * unique():给数组去重
 * @param {} 无参数
 * @returns {array} 数组
 */
// 对象的属性的名称（键）是唯一的,依次可以给数组去重。
Array.prototype.unique = function(){
    var arr = [], 
        temp = {};
    for (var i = 0, len = this.length; i < len; i++) {
        // 只要this[i]属性没有值(未被赋值),就赋值，同时将改值push进数组
        if(! temp[this[i]]){ 
            temp[this[i]] = 'any';
            arr.push(this[i]);
        }
    }
    return arr;
}