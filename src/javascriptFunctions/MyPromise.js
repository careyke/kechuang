/**
 * 手动实现一个Promise
 * 依赖Promise/A+ 规范
 */
const PENDING = 'Pending';
const FULFILLED = 'Fulfilled';
const REJECTED = 'Rejected';

export default class MyPromise {
    constructor(stateManager) {
        this.state = PENDING;
        this.value = null; //异步调用then的时候需要取出当前的值，所以要先保存住
        this.fulfillCallback = [];  //注册现有的Fulfill方法
        this.rejectCallback = [];   //注册现有的Reject方法
        if (stateManager) {
            executeStateManager.call(this, stateManager);
        }
    }

    then(onFulfill, onReject) {
        onFulfill = typeof onFulfill === 'function' ? onFulfill : value => value
        onReject = typeof onReject === 'function' ? onReject : error => {
            throw error  //一定要catch()才能捕获这个错，不然会一直抛出来
        }
        let thenPromise = new MyPromise();
        if (this.state !== PENDING) {
            let callback = this.state === FULFILLED ? onFulfill : onReject;
            executeThenCallback(callback, this.value, thenPromise);
        } else {
            this.fulfillCallback.push(thenCallbackWrap(onFulfill, thenPromise));
            this.rejectCallback.push(thenCallbackWrap(onReject, thenPromise));
        }
        return thenPromise;
    }

    static resolve(value) {
        if (value instanceof this) return value;
        return modifyState.call(new this(), 'resolve', value);
    }

    static reject(value) {
        if (value instanceof this) return value;
        return modifyState.call(new this(), 'reject', value);
    }

    static deferred() {
        var dfd = {}
        dfd.promise = new MyPromise(function (resolve, reject) {
            dfd.resolve = resolve;
            dfd.reject = reject;
        })
        return dfd
    }
}

/**
 * 立即执行状态机管理函数，修改Promise的状态
 * @param {*} stateManager 
 */
function executeStateManager(stateManager) {
    let called = false;  //1.1 Promise只允许调用resolve和reject其中的一个方法，而且只能调用一次
    const onResolve = (value) => {
        if (called) return;
        called = true;
        modifyState.call(this, 'resolve', value);
    }

    const onReject = (value) => {
        if (called) return;
        called = true;
        modifyState.call(this, 'reject', value);
    }
    try {
        stateManager(onResolve, onReject);
    } catch (error) {
        onReject(error);
    }
}

/**
 * 修改Promise状态机的状态，不可逆的过程
 * @param {*} type 
 * @param {*} value 
 */
function modifyState(type, value) {
    let isResolved = type === 'resolve';
    let thenWrap = null;
    //注入一个value是thenable的处理逻辑
    if (typeof value === 'object' || typeof value === 'function') {
        try {
            thenWrap = getThen(value);
        } catch (error) {
            //在取then的过程中报错，需要拒绝此次Promise
            modifyState.call(this, 'reject', error);
        }
    }
    if (thenWrap) {
        executeStateManager.call(this, thenWrap);
    } else {
        this.state = isResolved ? FULFILLED : REJECTED;
        this.value = value;
        if (isResolved) {
            this.fulfillCallback.forEach((cb) => cb(value))
        } else {
            this.rejectCallback.forEach((cb) => cb(value))
        }
    }
    return this;
}

/**
 * 异步执行then中注册的回调函数
 * 在其中会修改then中返回的Promise的状态
 * @param {*} callbcak 
 * @param {*} value 
 * @param {*} thenPromise 
 */
function executeThenCallback(callbcak, value, thenPromise) {
    //这里做一个异步处理
    setTimeout(() => {
        let res;
        try {
            //这个地方使用try-catch，所以在promise中只能使用catch()的形式捕获错误，无法在Promise外面捕获错误
            //错误一旦catch住，就不会往后继续抛出了
            res = callbcak(value);
        } catch (error) {
            return modifyState.call(thenPromise, 'reject', error);
        }
        if (res === thenPromise) {
            return modifyState.call(thenPromise, 'reject', new TypeError('connot resolve promise with itselt!'));
        } else {
            return modifyState.call(thenPromise, 'resolve', res);
        }
    }, 0)
}

/**
 * 由于then的回调函数里面需要修改当前then返回的Promise的状态
 * 所以需要构造一个闭包将thenPromise holder住
 * 在then的回调方法里面修改promise的状态
 * @param {*} callback 
 * @param {*} thenPromise 
 */
function thenCallbackWrap(callback, thenPromise) {
    return function (value) {
        executeThenCallback(callback, value, thenPromise);
    }
}


function getThen(likePromise) {
    let then = likePromise && likePromise.then;
    if (then && typeof then === 'function') {
        return function () {
            //这里调用promise2的then方法，注入两个修改Primose1状态的方法（闭包），
            //然后就可以根据promise2的状态去调用相应的方法去修改promise1的状态
            then.call(likePromise, ...arguments);
        }
    }
}
