/**
 * 对象迭代器
 */
Object.prototype[Symbol.iterator] = function* objectIterator(){
  for(let key in this){
    if(obj.hasOwnProperty(key)){
      yield [key,this[key]];
    }
  }
}
var obj = {
  a:1,
  b:2,
  c:3
}
for(let v of obj){
  console.log(v);
}