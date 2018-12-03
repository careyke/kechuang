/**
 * 输入一个链表，按链表值从尾到头的顺序返回一个ArrayList。
 * function ListNode(x){
    this.val = x;
    this.next = null;
}
 */

function printListFromTailToHead(head) {
    let arr = [];
    let node = head;
    while (node) {
        let { val, next } = node;
        arr.push(val);
        node = next;
    }
    return arr.reverse();
}

const level3 = {
    val: 3,
    next: null
}

const level2 = {
    val: 2,
    next: level3
}

const head = {
    val: 1,
    next: level2
}

export const result03 = (function test(head) {
    let r = printListFromTailToHead(head);
    console.log('the result of question01 is:', r);
})(head);