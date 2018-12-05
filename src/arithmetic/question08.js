/**
 * 一只青蛙一次可以跳上1级台阶，也可以跳上2级。求该青蛙跳上一个n级的台阶总共有多少种跳法（先后次序不同算不同的结果）。
 * 递归  类似于数学上的数学归纳法
 * 这个题和上一个一样，用递归虽然代码简单，但是中间数值没有缓存，会造成堆栈溢出
 */

function jumpFloor(number) {
    if (number <= 2) return number;
    let s1 = 1, s2 = 2, s;
    for (let i = 3; i <= number; i++) {
        s = s1 + s2;
        s1 = s2;
        s2 = s;
    }
    return s;
}

export const result08 = (function test(n) {
    let r = jumpFloor(n);
    console.log('the result of question08 is:', r);
})(19);