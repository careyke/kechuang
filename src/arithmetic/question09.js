/**
 * 一只青蛙一次可以跳上1级台阶，也可以跳上2级……它也可以跳上n级。求该青蛙跳上一个n级的台阶总共有多少种跳法
 * 先要总结规律 慎用递归
 */

function jumpFloorII(number){
    return 1 << (number-1)
}

export const result09 = (function test(n) {
    let r = jumpFloorII(n);
    console.log('the result of question09 is:', r);
})(19);

