const arr = [1, 2, [3, 4, [5, 6, [7]]]];
console.log(arr.flat());


/**
 * 1.level表示打平的层级,默认是打平一层
 */
Array.prototype.myFlat = function (level = 1) {
  if (!Array.isArray(this)) {
    throw new Error('only Array has flatten');
  }

  // const flatten = (arr,level) => {
  //   let res = [];
  //   for (let v of arr) {
  //     if (Array.isArray(v) && level > 0) {
  //       level--;
  //       res = res.concat(flatten(v,level));
  //     } else {
  //       res.push(v);
  //     }
  //   }
  //   return res;
  // }

  const flatten = (arr, level) => {
    return arr.reduce((prev, v) => {
      if(Array.isArray(v) && level > 0){
        return prev.concat(flatten(v,--level));
      }
      prev.push(v);
      return prev.concat([]);
    }, [])
  }

  return flatten(this, level);
}

console.log(arr.myFlat(1));

console.log(arr.myFlat(2));

console.log(arr.myFlat(3));

console.log(arr.myFlat());

console.log(arr.myFlat(10));
