// const curryAdd = myCurry(add,1,2);
// curryAdd(3,4); // 10;
// curryAdd(3)(4) // 10;
// curryAdd()(3,4) // 10;


function myCurry(fn,initArgs=[]){
  fnArgsLength = fn.length;

  const result = function (){
    const newArgs = initArgs.concat(Array.from(arguments));
    if(newArgs.length < fnArgsLength){
      return myCurry.call(this,fn,newArgs);
    }else{
      return fn.apply(this,newArgs);
    }
  }
  return result;
}

function add(a,b,c,d){
  return a+b+c+d;
}

const curryAdd = myCurry(add,[1]);
console.log(curryAdd(2,3,4));
console.log(curryAdd(2)(3,4));
console.log(curryAdd(2,3)(4));
console.log(curryAdd(2)(3)(4));