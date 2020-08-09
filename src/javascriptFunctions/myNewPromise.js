const promise = new Promise((resolve, reject) => {
  console.log(this instanceof Promise);
  resolve(3);
})
const pp = promise.then((res) => {
  console.log(res);
  return;
}).catch((err) => {
  console.log(err);
}).finally((value) => {
  console.log('finally', value)
})
console.log('fff', pp instanceof Promise);


/**
 * 1.resolve当传入Promise时，内部Promise的状态决定外面Promise的状态；reject不管参数是什么，直接将状态变成rejected
 * 2.setTimeout模拟微任务
 * 3.立即执行函数中的this不是promise实例
 * @param {*} initPromise 
 */
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function resolvePromise(value, resolve, reject) {
  if (value instanceof MyPromise) {
    if (value.state === PENDING) {
      // 递归找到value不是promise对象为止
      value.then(v => {
        resolvePromise(v, resolve, reject);
      }, error => {
        reject(error);
      })
    } else {
      value.then(resolve, reject);
    }
  } else {
    resolve(value);
  }
}

function MyPromise(stateManager) {
  const context = this;
  context.state = PENDING;
  context.value = null;
  context.error = null;
  context.fulfilledCallback = [];
  context.rejectedCallback = [];

  function resolve(value) {
    if (context.state !== PENDING) return; //状态修改是不可逆的
    if (value instanceof MyPromise) {
      value.then(resolve, reject); // resolve传入promise需要特殊处理一下
    } else {
      context.value = value;
      context.state = FULFILLED;
      context.fulfilledCallback.forEach((callback) => {
        callback(value);
      })
    }
  }

  function reject(error) {
    if (context.state !== PENDING) return; //状态修改是不可逆的
    context.error = error;
    context.state = REJECTED;
    context.rejectedCallback.forEach((onReject) => {
      onReject(error);
    })
  }

  stateManager(resolve, reject);
}

MyPromise.prototype.then = function (onFulfill, onReject) {
  onFulfill = typeof onFulfill === 'function' ? onFulfill : value => value;
  onReject = typeof onReject === 'function' ? onReject : error => { throw error }

  const context = this;
  if (context.state === PENDING) {
    return new MyPromise((resolve, reject) => {
      context.fulfilledCallback.push(() => {
        setTimeout(() => {
          try {
            const v = onFulfill(context.value);
            resolvePromise(v, resolve, reject);
          } catch (error) {
            reject(error);
          }
        })
      });
      context.rejectedCallback.push(() => {
        setTimeout(() => {
          try {
            const e = onReject(context.error);
            resolvePromise(e, resolve, reject);
          } catch (error) {
            reject(error);
          }
        })
      });
    })
  } else if (context.state === FULFILLED) {
    return new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          const v = onFulfill(context.value);
          resolvePromise(v, resolve, reject);
        } catch (error) {
          reject(error);
        }
      })
    })
  } else {
    return new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          const e = onReject(context.error);
          resolvePromise(e, resolve, reject);
        } catch (error) {
          reject(error);
        }
      })
    })
  }
}

MyPromise.prototype.catch = function (onReject) {
  return this.then(undefined, onReject);
}

/**
 * 1.参数是promise 直接返回这个promise
 * 2.参数是thenable 执行thenable，内部决定状态
 * 3.其他的情况直接返回fulfilled的promise
 */
MyPromise.resolve = function (value) {
  if (value instanceof MyPromise) return value;
  return new MyPromise((resolve, reject) => {
    if (value && value.then && typeof value.then === 'function') {
      value.then(resolve, reject);
    } else {
      resolve(value);
    }
  })
}

MyPromise.reject = function (error) {
  return new Promise((resolve, reject) => {
    reject(error);
  })
}

/**
 * 1.fulfilled 和 rejected状态都执行
 * 2.不改变之前的promise的状态，即输出的promise状态和输入的是一样的
 */
MyPromise.prototype.finally = function (callback) {
  return this.then(value => {
    MyPromise.resolve(callback).then(() => value)
  }, error => {
    MyPromise.resolve(callback).then(() => { throw error })
  })
}

MyPromise.all = function (promises) {
  const result=[];
  const len = promises.length;
  return new MyPromise((resolve, reject) => {
    promises.forEach((promise)=>{
      // 这里需要使用resolve方法  因为这里的promise可能不是promise对象
      MyPromise.resolve(promise).then((value)=>{
        result.push(value);
        if(result.length === len){
          resolve(result);
        }
      },error=>{
        reject(error);
      })
    })
  })
}

MyPromise.race=function(promises){
  return new MyPromise((resolve,reject)=>{
    for(let p of promises){
      MyPromise.resolve(p).then((value)=>{
        resolve(value);
        return;
      },(error)=>{
        reject(error);
        return;
      })
    }
  })
}


// const promise = new MyPromise((resolve, reject) => {
//   console.log(this instanceof MyPromise);
//   reject(3);
// })
// promise.then((res) => {
//   console.log('success', res);
//   return;
// }).catch(err => {
//   console.log(err);
// })

// MyPromise.reject(3).then(() => { console.log('resolve') }, () => { console.log('reject') })