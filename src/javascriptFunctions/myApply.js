// const o={
//   a:3
// }

// function fun(b,c){
//   console.log(this.a + b + c);
// }

// fun(4,5);


// fun.apply(o,[7,3]);

/**
 * 1.修改函数的this并执行函数
 * 2.以数组形式接受函数的参数
 */
Function.prototype.myApply = function (context) {
  if (typeof this !== 'function') {
    throw new Error('only function has apply');
  }

  let args = Array.from(arguments)[1];
  if (!Array.isArray(args)) {
    throw new Error('the arguments of apply is array');
  }

  const symbolFn = Symbol();
  context[symbolFn] = this;

  const result = context[symbolFn](...args);
  delete context[symbolFn];

  return result;
}


const o = {
  a: 3
}

function fun(b, c) {
  console.log(this.a + b + c);
}

fun(4, 5);


fun.myApply(o, [7, 3]);

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }