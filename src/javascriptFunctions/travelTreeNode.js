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

export function preorderTravelByStack(root, array = []) {
    if (!root) return array;
    let stack = [];
    stack.push(root);
    while (stack.length > 0) {
        let node = stack.pop();
        array.push(node.val);
        //前序遍历是先左后右，需要先把右边节点压到栈里面
        if (node.right) {
            stack.push(node.right);
        }
        if (node.left) {
            stack.push(node.left);
        }
    }
    return array;
}

export function midorderTravelByStack(root, array = []) {
    if (!root) return array;
    let stack = [];
    while (stack.length > 0 || root) {
        if (root) {
            stack.push(root); //1.先把左边节点都压到栈里
            root = root.left;
        } else {
            root = stack.pop();
            array.push(root.val); //2.如果某个节点的左边节点是空的，就取这个节点的右节点，重复1，2操作
            root = root.right;
        }
    }
    return array;
}

export function nextorderTravelByStack(root, array = []) {
    if (!root) return array;
    let stack1 = [], stack2 = [];
    stack1.push(root);
    //后序遍历一个栈没办法实现，使用两个栈来配合实现
    while (stack1.length > 0) {
        let node = stack1.pop();
        stack2.push(node);
        if (node.left) {
            stack1.push(node.left);
        }
        if (node.right) {
            stack1.push(node.right);
        }
    }
    while (stack2.length > 0) {
        array.push(stack2.pop().val);
    }
    return array;
}

export function midorderPreNode(node) {
    if (!node) return null;
    const getDeepRightNode = (node) => {
        let rightNode = null;
        while (node) {
            rightNode = node;
            node = node.right;
        }
        return rightNode;
    }
    //第一种节点
    if (node.left) {
        return getDeepRightNode(node.left).val;
    } else {
        // 第二、三种节点
        let parent = node.parent;
        while (parent) {
            if (parent.right === node) {
                return parent.val;
            }
            node = parent;
            parent = node.parent;
        }
        return null;
    }
}

export function midorderNextNode(node) {
    if (!node) return null;
    const getDeepLeftNode = (node) => {
        let leftNode = null;
        while (node) {
            leftNode = node;
            node = node.left;
        }
        return leftNode;
    }
    //第一种节点
    if (node.right) {
        return getDeepLeftNode(node.right).val;
    } else {
        let parent = node.parent;
        while (parent) {
            if (parent.left === node) {
                return parent.val;
            }
            node = parent;
            parent = node.parent;
        }
        return null;
    }
}

export function getTreeDepth(root) {
    if (!root) return 0;
    return Math.max(getTreeDepth(root.left), getTreeDepth(root.left)) + 1;
}