function night() {
    document.querySelector('body').style.backgroundColor = 'black';
    // $('body').css('background-color', 'black').css('color', 'white');
    // $('body').css('background-color', 'black');
    document.querySelector('body').style.color = 'white';
    // $('body').css('color', 'white');
    // $('a').css('color', 'white').css('text-decoration', 'underline');
    let as = document.querySelectorAll('a');
    for(let i = 0; i<as.length; i++) {
        as[i].style.color = 'white';}
}
function day() {
    document.querySelector('body').style.backgroundColor = 'white';
    document.querySelector('body').style.color = 'black';
    let as = document.querySelectorAll('a');
    for(let i = 0; i<as.length; i++) {
        as[i].style.color = 'black';}
}
export function dayNight(mode) {
    if(mode === 'night') {
        night();
    } else {
        day();
    }
}