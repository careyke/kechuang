
/**
 * 1.NaN去重
 * 2.+0，-0 去重
 * 3.对象去重
 * @param {*} arr 
 */
function myRemoveDup(arr = []) {
  const cache = new Map();
  return arr.filter((v) => {
    const key = `${typeof v}_${JSON.stringify(v)}`;
    if (cache.has(key)) {
      return false;
    } else {
      cache.set(key, v);
      return true;
    }
  })
}


const arr = [1, '1', NaN, NaN, +0, -0, { a: 23 }, { a: 23 }, true, false, undefined, null];

console.log(myRemoveDup(arr));

/**
 * 直接使用Set数据结构
 * 1.NaN 和 +0，-0 可以去重
 * 2.对象 无法去重
 * @param {*} arr 
 */
function myRemoveDupBySet(arr) {
  return Array.from(new Set(arr));
}

console.log(myRemoveDupBySet(arr));


