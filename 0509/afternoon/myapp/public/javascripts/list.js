const btn = document.querySelector('#list'); // 목록으로
const update = document.querySelector('#update'); // 목록으로
const del = document.querySelector('#delete'); // 목록으로

btn.addEventListener('click', () => {
    location.href='/blog';
});

del.addEventListener('click', () => {
    fetch(`http://localhost:3000/blog/delete/${del.dataset.doc}`, {
        method:'DELETE',
    })
    .then(res=>res.json())
    .then(data=>window.location.href=data.redirect) // routing에서 설정한 redirect:'/blog'
    .catch(err => console.log(err));
});

update.addEventListener('click', () => {
    location.href = `/blog/updateread/${update.dataset.doc}`;
})
// 글 no. 정보를 찾아야 될 것.
// 그 찾은 정보를 삭제할 것.
// 목록에서 다시 반영할 것

// 삭제가 완료되었다는 메세지 => 클라이언트에 전달
// 클라이언트가 특정 동작을 하도록 => 경로 이동을 하도록

// 글 수정을 위해
// 기존의 글 값 가져오기 // get
// post 전송 한 후에 수정하는 함수 코드 활용