// 기본 실행.

const cal = require("./cal");
const func = require("./func");
// require 한번 호출하고 사라짐
// 한번 호출 -> 보관 -> 바로 삭제
console.log(cal.add(5, 3));
console.log(cal.sub(5, 3));
console.log(cal.mul(5, 3));

console.log("시작", func());

for (let i = 0; i < 10; i++) {
    console.log(func());
    // 10번 호출
}
console.log("끝", func());