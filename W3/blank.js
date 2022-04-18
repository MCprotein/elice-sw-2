// const array = [4, 3, 2, 4, 5, 35, 35]

// // for loop: tranditional
// for (let i = 0; i < array.length; i++) {
//     console.log(array[i])
// }

// //foreach
// const forEachArray = array.forEach((item) => item*2)
// console.log(forEachArray)
// array.forEach((item) => {console.log(item)})

// // map
// const testArray = array.map((item) => item ** 2)
// console.log(testArray)

// // reducer
// const reduceArray = array.reduce((prev, curr) =>  {
// console.log(prev, curr)
//     return prev + curr
// }, 1)

// function fac(n) {
//     let array = [];
//     for (let i = 0; i < n; i++) {
//         array.push(i+1);
//     }

//     const reduced = array.reduce((prev, curr) => prev * curr, 1);
//     console.log(reduced);
//     return reduced;
// }

// 배열.reduce((누적값, 현잿값, 인덱스, 요소) => { return 결과 }, 초기값);
const GIVEN_ARRAY = [[4, 2, 3], [4, [3, 4, [5, 3]], 5], [4, 3, 5]]
const RESULT_ARRAY = [4, 2, 3, 4, 3, 4, 5, 3, 5, 4, 3, 5]


const GIVEN_ARRAY2 = [[5, [3, [5, [6, [5, 4]]]], 3, [6, 246]]]
const RESULT_ARRAY2 = [5, 3, 5, 6, 5, 4, 3, 6, 246]

function flatten(givenArray) {

    console.log(typeof givenArray);
    if(typeof givenArray !== 'object') {
        return givenArray;
    }
    const resultArray = givenArray.reduce((prev, curr) => {
        console.log(prev, curr);
        return prev.concat(flatten(curr));
        
    }, []);
    console.log(resultArray);
}

flatten(GIVEN_ARRAY2)