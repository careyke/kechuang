
/**
 * random + sort
 * 不是很准确，因为排序的时候并不是两两都比较
 * @param {*} arr 
 */
function myDisorderBySort(arr) {
  return arr.sort(()=>{
    return Math.random() - 0.5
  });
}

/**
 * Fisher-Yates算法 
 * 具体原理确实不是很懂
 * @param {*} arr 
 */
function myDisorderByFisherTates(arr){
  let len = arr.length;
  while(len > 1){
    const index = Math.floor(Math.random()*len);
    [arr[len-1],arr[index]] = [arr[index],arr[len-1]];
    len--;
  }
  return arr;
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log(myDisorderBySort(arr));

console.log(myDisorderByFisherTates(arr));