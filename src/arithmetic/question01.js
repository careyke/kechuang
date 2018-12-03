/**
 * 在一个二维数组中（每个一维数组的长度相同），每一行都按照从左到右递增的顺序排序，
 * 每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数
 */

function find(target, array) {
    let row = array.length;
    let col = array[0].length;
    for (let r = row - 1, c = 0; r >= 0 && c < col;) {
        let v = array[r][c];
        if (v === target) return true;
        if (v > target) {
            r--;
        }
        if (v < target) {
            c++;
        }
    }
    return false;
}

const arr = [
    [1, 3, 6],
    [8, 10, 15],
    [17, 20, 35]
]

export const result01 = (function testFind(target, array) {
    let r = find(target, array);
    console.log('the result of question01 is:', r);
})(10, arr);

