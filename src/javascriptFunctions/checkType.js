/**
 * 检验类型
 */

const classType = [
    'Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Object', 'Error', 'Null', 'Undefined'
];

const class2Type = (function () {
    let classObj = {}
    classType.forEach((item) => {
        classObj['[object ' + item + ']'] = item.toLowerCase(); //和typeof的返回值保持一致，都用小写
    })
    return classObj;
})()

export default function checkType(variable) {
    if (variable == null) { //兼容IE6，null 和 undefined 会被 Object.prototype.toString 识别成 [object Object]！
        return variable + '';
    }
    return typeof variable === 'object' ? class2Type[Object.prototype.toString.call(variable)] : typeof variable;
}
