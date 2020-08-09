const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const newArr = arr.filter((i) => i % 2 === 0);

console.log(newArr);


/**
 * context 是fn执行的this
 */
Array.prototype.myFilter = function (fn, context) {
  if (typeof fn !== 'function') {
    throw new TypeError('fn must be function');
  }
  const res = [];
  for (let i = 0; i < this.length; i++) {
    const flag = fn.call(context, this[i], i, this);
    if(flag){
      res.push(this[i]);
    }
  }
  return res;
}

const newArr1 = arr.myFilter((i) => i % 2 === 0);

console.log(newArr1);