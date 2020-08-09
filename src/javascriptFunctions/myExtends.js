class Parent {
  constructor(){
    this.a=12
  }
  say(){
    console.log('parent say');
  }
}

class Son extends Parent{
  constructor(){
    super();
    this.b = 23;
  }
  sayb(){
    console.log('son say');
  }
}

const sonInstance =  new Son();

console.log(sonInstance);
console.log(Object.getPrototypeOf(sonInstance));
sonInstance.say();

console.log(Son.prototype);
console.log(sonInstance instanceof Parent);

/**
 * 1.子类实例有中父类定义的实例属性
 * 2.子类原型中可以取到父类中定义的方法
 */

function ParentClass(){
  this.a=12;
}
ParentClass.prototype.say=function(){
  console.log('parent say');
}

function SonClass(){
  ParentClass.call(this);
  this.b = 23;
}

SonClass.prototype = Object.create(ParentClass.prototype);

SonClass.prototype.sayb=function(){
  console.log('son say');
}

SonClass.prototype.constructor = SonClass;



//test

const sonInstance1 =  new SonClass();

console.log(sonInstance1);
console.log(Object.getPrototypeOf(sonInstance1));
sonInstance1.say();

console.log(Son.prototype);
console.log(sonInstance1 instanceof Parent);