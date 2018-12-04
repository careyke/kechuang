/**
 * 用两个栈来实现一个队列，完成队列的Push和Pop操作。 队列中的元素为int类型
 */

const stack1 = [], stack2 = [];

function push(node) {
    stack1.push(node);
}

function pop() {
    let len2 = stack2.length;
    if (len2 > 0) {
        return stack2.pop();
    } else {
        let len1 = stack1.length;
        if (len1 > 0) {
            for (let i = 0; i < len1; i++) {
                stack2.push(stack1.pop());
            }
            return stack2.pop();
        } else {
            return null
        }
    }
}