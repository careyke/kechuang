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
        this.value = null;
        this.fulfillCallback = [];
        this.rejectCallback = [];
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
    this.state = isResolved ? FULFILLED : REJECTED;
    this.value = value;
    if (isResolved) {
        this.fulfillCallback.forEach((cb) => cb(value))
    } else {
        this.rejectCallback.forEach((cb) => cb(value))
    }
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
 * 所以需要构造有个闭包将thenPromise holder住
 * @param {*} callback 
 * @param {*} thenPromise 
 */
function thenCallbackWrap(callback, thenPromise) {
    return function (value) {
        executeThenCallback(callback, value, thenPromise);
    }
}

