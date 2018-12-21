/**
 * 反转单项列表
 */

export default function reserveLinkArray(head) {
    if (!head || !head.next) return head;
    let prev = head.prev, next, current = head;
    while (current) {
        next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    return prev;
}