// const o={
//   a:3
// }

// function fun(b){
//   console.log(this.a+b);
// }

// fun(4);

// fun.call(o,7);

/**
 * 1.修改this并执行函数
 * 2.以展开方式传入参数
 */
Function.prototype.myCall=function(context){
  if(typeof this !== 'function'){
    throw new Error('only function has call');
  }

  const args = Array.prototype.slice.call(arguments,1);

  const symbolFn = Symbol();
  context[symbolFn] = this;

  const result = context[symbolFn](...args);
  delete context[symbolFn];
  
  return result;
}


const o={
  a:3
}

function fun(b){
  console.log(this.a+b);
}

fun(4);

fun.myCall(o,7);