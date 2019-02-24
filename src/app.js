import debounce from './javascriptFunctions/debounce';
import throttle from './javascriptFunctions/throttle';
// import styles from './app.less';
import * as result from './arithmetic';
import exeUnique from './javascriptFunctions/unique';
import checkType from './javascriptFunctions/checkType';
import reserveLinkArray from './javascriptFunctions/reserveLinkArray';
import {
    preorderTravelByRecursion, midorderTravelByRecursion, nextorderTravelByRecursion,
    preorderTravelByStack, midorderTravelByStack, nextorderTravelByStack,
    midorderPreNode, midorderNextNode, getTreeDepth
} from './javascriptFunctions/travelTreeNode';
import { shadowCopy, deepCopy, forceDeepCopy } from './javascriptFunctions/copy';
import { bubbleSort, insertSort, selectSort, quickSort } from './sort'
import textCO from './javascriptFunctions/autoExecGenerator';
import { testMicroQueue } from './test';
import initRRTodoList from './react-redux-todoLists/entry';
import initRMTodoList from './react-mobx-todolists/entry';
import exeReactHooksTodolist from './react-hooks-todolists/entry';

// const ele = document.querySelector('#app');
// ele.className = styles['app'];
// const handler = (e) => {
//     ele.innerHTML = parseInt(ele.innerHTML) + 1;
// }
// const debounceHandler = debounce(handler, 1000, true);
// const throttleHandler = throttle(handler, 1000, { leading: false, trailing: false });
// ele.onmousemove = throttleHandler;

// exeUnique(); //测试数组去重

// //测试类型检测
// (function () {
//     let arr = [1, '123', true, undefined, null, { a: 1 }, [1, 2], new Date(), new Error(), /a/g, function f() { }];
//     arr.forEach((item) => {
//         console.log('value:', item);
//         console.log('type:', checkType(item));
//     })
// })();

// //测试浅拷贝
// (function () {
//     let obj = {
//         a: {
//             c: 1,
//             d: 2
//         },
//         b: 3
//     }
//     let newObj = shadowCopy(obj);
//     obj.b = 4;
//     obj.a.c = 5;
//     console.log('shadow');
//     console.log('origin:', obj);
//     console.log('copied:', newObj);
// })();

// //测试深拷贝
// (function () {
//     let obj = {
//         a: {
//             c: 1,
//             d: 2
//         },
//         b: 3,
//         f:function fun1(){}
//     }
//     // let newObj = forceDeepCopy(obj);
//     let newObj = deepCopy(obj);
//     obj.b = 4;
//     obj.a.c = 5;
//     obj.f = function fun2(){};
//     console.log('deep');
//     console.log('origin:', obj);
//     console.log('copied:', newObj);
// })();

(function (arr) {
    console.log('origin array', arr.slice());
    // let array = bubbleSort(arr);
    // let array = insertSort(arr);
    // let array = selectSort(arr);
    let array = quickSort(arr);
    console.log('sorted array', array);
})([1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0])

function getLinkTest() {
    const fail = {
        next: null,
        value: 'fail'
    }
    const linkC = {
        next: fail,
        value: 'C'
    }
    const linkB = {
        next: linkC,
        value: 'B'
    }
    const linkA = {
        next: linkB,
        value: 'A'
    }
    const head = {
        prev: null,
        value: 'head',
        next: linkA
    }
    const prinkLinkArr = (head) => {
        const arr = [];
        while (head) {
            arr.push(head.value);
            head = head.next;
        }
        console.log(arr);
    }
    return {
        linkArray: head,
        print: prinkLinkArr
    }
}

(function () {
    let testObj = getLinkTest();
    let { print, linkArray } = testObj;
    print(linkArray);
    let reserveLink = reserveLinkArray(linkArray);
    print(reserveLink);
})()

function TreeNode(val) {
    this.val = val;
    this.left = this.right = this.parent = null;
}
function getTestTree() {
    const a = new TreeNode(1);
    const b = new TreeNode(2);
    const c = new TreeNode(3);
    const d = new TreeNode(4);
    const e = new TreeNode(5);
    a.left = b;
    b.parent = a;
    a.right = c;
    c.parent = a;
    b.left = d;
    d.parent = b;
    c.right = e;
    e.parent = c;
    return { root: a, nodes: [a, b, c, d, e] };
}
(function () {
    let { root, nodes } = getTestTree();
    console.log('preorderByRecursion:', preorderTravelByRecursion(root));
    console.log('minorderByRecursion:', midorderTravelByRecursion(root));
    console.log('nextorderByRecursion:', nextorderTravelByRecursion(root));
    console.log('preorderTravelByStack:', preorderTravelByStack(root));
    console.log('midorderTravelByStack:', midorderTravelByStack(root));
    console.log('nextorderTravelByStack:', nextorderTravelByStack(root));
    console.log('treeDepth:',getTreeDepth(root));
    nodes.forEach((n) => {
        let v = n.val;
        let preV = midorderPreNode(n);
        console.log(preV + '<=' + v);
    })
    console.log('__________');
    nodes.forEach((n) => {
        let v = n.val;
        let nextV = midorderNextNode(n);
        console.log(v + '=>' + nextV);
    })
})()

textCO(); //测试CO

testMicroQueue();

//初始化react-redux todolists
// initRRTodoList();
// initRMTodoList();
exeReactHooksTodolist();
