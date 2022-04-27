fetch('http://localhost:3000/topics')
    .then(function(response){
        return response.json();
    })
    .then(function(topics){
        console.log(topics[0]);
        let firstId = topics[0].id;
        console.log(firstId); 
    });

response = await fetch('http://localhost:3000/topics%27);
topics = await response.json();
console.log(topics);

// 1. promise 는 미래 결과값에 대한 약속임
// 2. await를 통해 promise의 결과값인 response를 기다림
// 3. await가 없으면 promise(약속)만 저장
// 4. await가 있으면 response(약속의 결과)가 저장

response = await fetch('http://localhost:3000/topics');
topics = await response.json();
newRes = await fetch(`http://localhost:3000/topics/` + topics[0].id);
newTopics = await newRes.json();