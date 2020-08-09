// function fun(){
//   this.a = 1;
//   this.b = 2;
//   console.log(this instanceof fun);
// }

// function fun1(){
//   this.a = 1;
//   this.b = 2;

//   return 11;
// }

// fun.prototype = {
//   c:5
// }

// fun1.prototype = fun.prototype;

// const n = new fun();
// console.log('n',n);
// console.log(n.c);

// const m = new fun1();
// console.log('m',m);
// console.log(m.c);


/**
 * 1.构造函数内部会创建一个this对象，当构造函数的返回值不是对象的时候，就返回这个this对象，如果是对象则返回该对象
 * 2.this对象可以访问构造函数prototype上的内容
 */
function myNew(constructor){
  const result={};
  const args = Array.prototype.slice.call(arguments,1);

  Object.setPrototypeOf(result,constructor.prototype);
  const res = constructor.apply(result,args);

  if(typeof res === 'object' || typeof res === 'function'){
    return res;
  }
  return result;
}



function fun(){
  this.a = 1;
  this.b = 2;
  console.log(this instanceof fun);
}

function fun1(){
  this.a = 1;
  this.b = 2;

  return {
    d:444
  }
}

fun.prototype = {
  c:5
}

fun1.prototype = fun.prototype;

const n = myNew(fun);
console.log('n',n);
console.log(n.c);

const m = myNew(fun1);
console.log('m',m);
console.log(m.c);


