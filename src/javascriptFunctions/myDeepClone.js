/**
 * 1.引用关系不能破坏
 * 2.循环引用不出错
 * 3.不爆栈（栈代替递归）
 */

function myDeepClone(object) {
  const isObject = (o) => {
    return o !== null && (typeof o === 'object' || typeof o === 'function');
  }
  if (!isObject(object)) {
    throw new Error('must be object');
  }
  const cache = new Map();

  const clone = (object, result) => {
    for (let k in object) {
      if (object.hasOwnProperty(k)) {
        const value = object[k];
        if (isObject(value)) {
          if (cache.has(value)) {
            result[k] = cache.get(value);
          } else {
            const copyObj = Array.isArray(value) ? [] : {};
            result[k] = copyObj;
            cache.set(value,copyObj);
            clone(value,copyObj);
          }
        } else {
          result[k] = value;
        }
      }
    }
  }

  const result = Array.isArray(object) ? [] : {};
  clone(object,result);
  return result;
}

const o1 = {
  a:1,
  b:{
    c:2,
    d:[3,4]
  }
}
console.log(myDeepClone(o1));



const o2 = {a:23};
const o3={
  b:o2,
  c:o2,
  d:2222,
  e:{
    f:o2
  }
}

const co = myDeepClone(o3);
console.log(co);
console.log(co.b === co.c);
console.log(co.b === co.e.f);

const o4 = {a:45,b:5};
const o5 = {c:89,d:32};
o4.tt = o5;
o5.yy = o4;

console.log(myDeepClone(o4))