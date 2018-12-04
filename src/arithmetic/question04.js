/**
 * 输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。
 * 假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
 * 例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。
 * function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
    }
    递归来做
 */

function reConstructBinaryTree(pre, vin) {
    let preLen = pre.length;
    let vinLen = pre.length;
    if (preLen === 0 || vinLen === 0 || preLen !== vinLen) return null;
    let result = null;
    if (preLen > 1) {
        let rootValue = pre[0];
        let vinRootIndex = vin.indexOf(rootValue);
        let leftPre = pre.slice(1, vinRootIndex + 1);
        let rightPre = pre.slice(vinRootIndex + 1);
        let leftVin = vin.slice(0, vinRootIndex);
        let rightVin = vin.slice(vinRootIndex + 1);
        result = {
            val: rootValue,
            left: reConstructBinaryTree(leftPre, leftVin),
            right: reConstructBinaryTree(rightPre, rightVin)
        }
    } else if (preLen === 1) {
        result = {
            val: pre[0],
            left: null,
            right: null
        }
    }
    return result;
}

const pre = [1, 2, 4, 7, 3, 5, 6, 8];
const vin = [4, 7, 2, 1, 5, 3, 8, 6];

export const result04 = (function test(pre, vin) {
    let r = reConstructBinaryTree(pre, vin);
    console.log('the result of question04 is:', r);
})(pre, vin);