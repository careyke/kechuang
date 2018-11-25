/**
 * 拷贝
 * 浅拷贝和深拷贝
 */
import checkType from './checkType';

export function shadowCopy(obj) {
    let type = checkType(obj);
    if (type !== 'object') return;
    let newObj = type === 'array' ? [] : {};
    for (let k in obj) {
        if (obj.hasOwnProperty(k)) {
            newObj[k] = obj[k];
        }
    }
    return newObj;
}

export function deepCopy(obj) {
    let type = checkType(obj);
    if (type !== 'object') return;
    let newObj = type === 'array' ? [] : {};
    for (let k in obj) {
        if (obj.hasOwnProperty(k)){
            newObj[k] = typeof obj[k] === 'object' ? deepCopy(obj[k]) : obj[k];
        }
    }
    return newObj;
}

export function forceDeepCopy(obj){
    return JSON.parse(JSON.stringify(obj));
}