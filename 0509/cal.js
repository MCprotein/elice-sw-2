// 덧셈, 뺄셈, 곱셈

// 덧셈

function add(a,b) {
    return a + b;
}

const sub = (a, b) => {
    return a - b;
}

const mul = (a, b) => {
    return a * b;
}

const num = 123;
const doc = "Hello";

// module.exports.add1 = add; // add를 빼서 add1라고 하겠다.
// module.exports.sub = sub;
// module.exports.mul = mul;

module.exports = {
    add: add,
    sub: sub,
    mul: mul,
    
} // database 입력