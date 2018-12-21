/**
 * 遍历二叉树
 */

export function preorderTravelByRecursion(root, array = []) {
    if (root) {
        array.push(root.val);
        array = preorderTravelByRecursion(root.left, array);
        array = preorderTravelByRecursion(root.right, array);
    }
    return array;
}

export function midorderTravelByRecursion(root, array = []) {
    if (root) {
        array = midorderTravelByRecursion(root.left, array);
        array.push(root.val);
        array = midorderTravelByRecursion(root.right, array);
    }
    return array;
}

export function nextorderTravelByRecursion(root, array = []) {
    if (root) {
        array = nextorderTravelByRecursion(root.left, array);
        array = nextorderTravelByRecursion(root.right, array);
        array.push(root.val);
    }
    return array;
}