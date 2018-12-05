/**
 * 我们可以用2*1的小矩形横着或者竖着去覆盖更大的矩形。请问用n个2*1的小矩形无重叠地覆盖一个2*n的大矩形，总共有多少种方法？
 * 先要总结规律  先考虑递归，想清楚思路之后看看是否可以用循环来操作
 * 思考步骤
 * 1. 第一次摆放一块 2*1 的小矩阵，则摆放方法总共为f(number - 1)
 * 2.第一次摆放一块1*2的小矩阵，则摆放方法总共为f(target-2)
 * 因为，摆放了一块1*2的小矩阵（用√√表示），对应下方的1*2（用××表示）摆放方法就确定了，所以为f(targte-2)
 * 
 * 推荐使用尾递归和循环的形式
 * ES6对尾递归做了优化，会释放上一次的上下文环境，不会造成堆栈溢出
 */

function rectCover(number) {
    // if (number <= 2) return number;
    // // return rectCover(number - 1) + rectCover(number - 2);
    // let s1 = 1, s2 = 2, s;
    // for (let i = 3; i <= number; i++) {
    //     s = s1 + s2;
    //     s1 = s2;
    //     s2 = s;
    // }
    // return s;
    if (number <= 2) return number;
    const fibonacci = function (number, n1, n2) {
        if (number <= 2) return n2;
        return fibonacci(number - 1, n2, n1 + n2);
    }
    return fibonacci(number, 1, 2);
}

export const result10 = (function test(arr) {
    let r = arr.map((i) => {
        return rectCover(i, 1, 2);
    })
    console.log('the result of question10 is:', r);
})([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);