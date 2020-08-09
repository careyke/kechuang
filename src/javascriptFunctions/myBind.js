// const o = {
//   a:10
// }

// const oo = {
//   a:20
// }

// function fp(){}
// fp.bb = 33;

// function fun(){
//   console.log(this.a);
// }

// Object.setPrototypeOf(fun,fp);
// console.log('bb',fun.bb);

// fun.prototype.cc = 55;

// const fun1 = fun.bind(o);
// console.log('fun1bb',fun1.bb);

// const fun2 = fun.bind(o).bind(oo);

// fun2();

// const obj = {
//   a:3,
//   fun:fun1
// }

// obj.fun()

// const m = new fun1();

// console.log('cc',m.cc);

/**
 * 1.修改函数执行上下文中的this指向
 * 2.多次bind仅第一次生效
 * 3.bind方法可以为生成的函数注入参数
 * 4.bind操作遇到new操作符时是无效的,new 运算符修改this的优先级最高
 * 5.bind生成的方法原型链和原始函数是一样的,包括__proto__和prototype
 */
Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new Error('only function has bind');
  }
  const fn = this;
  const args = Array.prototype.slice.call(arguments, 1);

  const result = function () {
    // new 运算符中的this
    return fn.apply(this instanceof result ? this : context, args.concat([...arguments]));
  }
  result.prototype = Object.create(this.prototype);
  const proto = Object.getPrototypeOf(this);
  Object.setPrototypeOf(result, proto);

  return result;
}


const o = {
  a: 10
}

const oo = {
  a: 20
}

function fp() { }
fp.bb = 33;

function fun() {
  console.log(this.a);
}

Object.setPrototypeOf(fun, fp);
console.log('bb', fun.bb);

fun.prototype.cc = 55;

const fun1 = fun.myBind(o);
console.log('fun1bb', fun1.bb);

const fun2 = fun.myBind(o).myBind(oo);

fun2();

const obj = {
  a: 3,
  fun: fun1
}

obj.fun()

const m = new fun1();

console.log('cc', m.cc);


