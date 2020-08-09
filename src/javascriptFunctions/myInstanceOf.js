// function fun(){}
// const m = new fun();
// console.log(m instanceof fun);


// const m1 = new fun();
// fun.prototype.constructor = {};
// console.log(m1 instanceof fun);




/**
 * left的原型链上某一个对象的Constructor是right 说明truthy
 * @param {*} left 
 * @param {*} right 
 */
function myInstanceof(left,right){
  //右边数据处理
  if(!(right && (typeof right === 'object' || typeof right === 'function'))){
    throw new TypeError('right is not an object');
  }
  //左边数据处理
  if(!(left && (typeof left === 'object' || typeof left === 'function'))) return false;
  
  let proto = Object.getPrototypeOf(left);
  const rightPrototype = right.prototype;
  while(proto){
    if(proto === rightPrototype){
      return true;
    }else{
      proto = Object.getPrototypeOf(proto);
    }
  }
  return false;
}


function fun(){}
const m = new fun();
console.log(myInstanceOf(m,fun));


const m1 = new fun();
fun.prototype.constructor = {};
console.log(myInstanceOf(m1,fun));
