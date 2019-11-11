/**
 * 测试react event源码
 */
import React from 'react';

export function EventTest() {
  const handleClick = (e) => {
    console.log('son click')
  }
  const handleParentClick = () => {
    console.log('parent click')
  }
  return (
    <div id='parent' onClick={handleParentClick}>
      <div id='son' onClickCapture={handleClick}>Click</div>
    </div>

  )
}

// import React, { useRef, useEffect } from "react";

// export function TestNativeEvent() {
//   const ref = useRef(null);
//   const handleBtnClick = e => {
//     // e.stopPropagation(); //测试冒泡
//     console.log("React event:", e);
//     console.log("btn click!");
//   };
//   const handleBClick = e => {
//     console.log("native event:", e);
//     console.log("div B click");
//     //e.stopPropagation(); //测试原生的阻止冒泡
//   };
//   const handleAClick = e => {
//     // e.stopPropagation(); //捕获期阻止冒泡
//     console.log("div A click!");
//   };
//   useEffect(() => {
//     ref.current && ref.current.addEventListener("click", handleBClick, false);
//     return () => {
//       ref.current &&
//         ref.current.removeEventListener("click", handleBClick, false);
//     };
//   });
//   return (
//     <div id="A" onClickCapture={handleAClick}>
//       <div id="B" ref={ref}>
//         <button onClick={handleBtnClick}>click</button>
//       </div>
//     </div>
//   );
// }
