/**
 * 
 */
const Pending = 'pending';
const Fulfilled = 'fulfilled';
const Rejected = 'rejected';

function MyPromise(stateManager) {
  const context = this;
  context.state = Pending;
  context.value = undefined;
  context.reason = undefined;
  context.fulfillCallback = [];
  context.rejectCallback = [];

  function reject(reason) {
    if (context.state !== Pending) return;
    context.state = Rejected;
    context.reason = reason;
    context.rejectCallback.forEach((callback) => {
      callback(reason); // callback内部包裹了异步代码
    });
  }

  function resolve(value) {
    if (context.state !== Pending) return;
    if (value instanceof MyPromise) {
      value.then(resolve, reject); // 内部Promise通过调用外部promsie的修改方法来决定外部Promsie的状态
    } else {
      context.state = Fulfilled;
      context.value = value;
      context.fulfillCallback.forEach((callback) => {
        callback(value);
      })
    }
  }

  try {
    stateManager(resolve, reject);
  } catch (err) {
    reject(err);
  }

}

MyPromise.prototype.then = function (onResolve, onReject) {
  if (typeof onResolve !== 'function') {
    onResolve = value => value;
  }
  if (typeof onReject !== 'function') {
    onReject = reason => { throw reason } //上一步的异常冒泡到下一个阶段
  }

  const context = this;

  const resolvePromise = (returnValue, resolve, reject) => {
    if (returnValue instanceof MyPromise) {
      returnValue.then(resolve, reject);
    } else {
      resolve(returnValue);
    }
  }

  return new MyPromise(function (resolve, reject) {
    if (context.state === Pending) {
      // 暂存回调函数
      context.fulfillCallback.push((value) => {
        setTimeout(() => {
          try {
            const returnValue = onResolve(value);
            resolvePromise(returnValue, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0)
      });
      context.rejectCallback.push((reason) => {
        setTimeout(() => {
          try {
            const returnValue = onReject(reason);
            resolvePromise(returnValue, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0)
      })
    } else if (context.state === Fulfilled) {
      // 直接塞进任务队列
      setTimeout(() => {
        try {
          const returnValue = onResolve(context.value);
          resolvePromise(returnValue, resolve, reject);
        } catch (error) {
          reject(error);
        }
      }, 0)
    } else {
      setTimeout(() => {
        try {
          const returnValue = onReject(context.reason);
          resolvePromise(returnValue, resolve, reject);
        } catch (error) {
          reject(error);
        }
      }, 0)
    }
  });
}

MyPromise.prototype.catch = function(onReject){
  return this.then(undefined,onReject);
}

MyPromise.prototype.finally = function(cb){
  return this.then((value)=>{
    cb();
    return value;
  },(reason)=>{
    cb();
    throw reason;
  })
}

MyPromise.resolve = function(value){
  if(value instanceof MyPromise){
    return value;
  }
  return new MyPromise((resolve, reject)=>{
    if(value && value.then && typeof value.then === 'function'){
      value.then(resolve,reject); //then方法内部调用resolve和reject来决定Promise的状态
    }else{
      resolve(value);
    }
  })
}

MyPromise.reject = function(reason){
  return new MyPromise((resolve,reject)=>{
    reject(reason);
  })
}

MyPromise.all = function(promiseArr){
  // 简单处理，就当数组处理
  return new MyPromise(function(resolve,reject){
    const value = [];
    const len = promiseArr.length;
    for(let p of promiseArr){
      MyPromise.resolve(p).then((v)=>{
        value.push(v);
        if(value.length === len){
          resolve(value);
        }
      },(reason)=>{
        reject(reason);
      })
    }
  });
}

MyPromise.race = function(promiseArr){
  return new MyPromise(function(resolve, reject){
    for(let p of promiseArr){
      MyPromise.resolve(p).then((value)=>{
        resolve(value);
      },(reason)=>{
        reject(reason);
      })
    }
  })
}

MyPromise.allSettled = function(promiseArr){
  return new MyPromise(function(resolve, reject){
    const result = [];
    const len = promiseArr.length;
    for(let p of promiseArr){
      MyPromise.resolve(p).then((value)=>{
        result.push({status:Fulfilled, value: value});
        if(result.length === len){
          resolve(result);
        }
      },(reason)=>{
        result.push({status:Fulfilled, reason: reason});
        if(result.length === len){
          resolve(result);
        }
      })
    }
  });
}

MyPromise.any = function(promiseArr){
  return new MyPromise(function(resolve, reject){
    const result = [];
    const len = promiseArr.length;
    for(let p of promiseArr){
      MyPromise.resolve(p).then((value)=>{
        resolve(value);
      },(reason)=>{
        result.push(reason);
        if(len === result.length){
          reject(result);
        }
      })
    }
  })
}