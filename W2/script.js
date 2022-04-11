function hello() {
    console.log('hello');
}

hello();


console.log('hello world!');

for (let i = 0; i < 5; i++) {
    console.log(i);
} 
let i = 0;

console.log(i === 30)

if (i === 30) {
    console.log('true')
} else {
    console.log('false')
}

i === 30 ? console.log('true') : console.log('false')


while (i<5) {
    i++;
    console.log(i);
}

while (i<5) {
    console.log(i);
    i++;
}

console.log(null == undefined);
console.log(null === undefined);

function printMessage(message, times) {
    // consolee.log(message, times);
    for (let i = 0; i < times; i++) {
        console.log(message);
    }
    console.log(`Value of i is ${i}`);
}
printMessage('hello', 35)
// 함수의 변수 개수 다르게줘도 상관없음
// 자바스크립트의 목적: 약간 에러있어도 일단 실행 -> 명확하게 하기 위해 typescript 사용

// Array 순서가 있음
let a = ['a', 'b'];
console.log(a[0])

// for문으로 내용물 다 빼는것과 같다.
a.map(function (aa) {
    console.log(aa)
})

// object
let b = {'a': 1, 'b':2};
delete b.a

function onClick() {
    console.log('clicked');
}

const button = document.querySelector('button');
button.addEventListener('click', onClick())