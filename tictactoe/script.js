// 원본 https://codepen.io/bee-arcade/pen/RVaemx?editors=1010

const X_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/x.png';
const O_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/circle.png';

function assignSpace(space, owner) {
  const image = document.createElement('img');
  image.src = owner === 'x' ? X_IMAGE_URL : O_IMAGE_URL;
  space.appendChild(image);

  const index = parseInt(space.dataset.index);
  takenBoxes[index] = owner;
  const indexToRemove = freeBoxes.indexOf(space);
  freeBoxes.splice(indexToRemove, 1);
  space.removeEventListener('click', changeToX);
}

function changeToX(event) {
  assignSpace(event.currentTarget, 'x');

  if (isGameOver()) {
    displayWinner();
  } else {
    computerChooseO();
  }
}

function computerChooseO() {
  const allBoxes  = document.querySelectorAll('#grid div');
  const index = Math.floor(Math.random() * freeBoxes.length);
  const freeSpace = freeBoxes[index];

  assignSpace(freeSpace, 'o');

  if (isGameOver()) {
    displayWinner();
  }
}

function isGameOver() {
  return freeBoxes.length === 0 || getWinner() !== null;
}

function displayWinner() {
  const winner = getWinner();

  const resultContainer = document.querySelector('#results');
  const header = document.createElement('h1');
  if (winner === 'x') {
    header.textContent = 'You win!';
  } else if (winner === 'o') {
    header.textContent = 'Computer wins';
  } else {
    header.textContent = 'Tie';
  }
  resultContainer.appendChild(header);

  // Remove remaining event listeners
  for (const box of freeBoxes) {
    box.removeEventListener('click', changeToX);
  }
}

function checkBoxes(Arr) {
    console.log(Arr);
    if (takenBoxes[Arr[0]] != undefined) {
        for (let i = 0; i<Arr.length-1; i++) {
            if (takenBoxes[Arr[i]] !== takenBoxes[Arr[i+1]]) {
                return null;
            }
        }
        return takenBoxes[Arr[0]];
    }
    return null;
    

//   if (takenBoxes[one] !== undefined &&
//       takenBoxes[one] === takenBoxes[two] &&
//       takenBoxes[two] === takenBoxes[three]) {
//     return takenBoxes[one];
//   }
//   return null;
}

// Returns 'x', 'o', or null for no winner yet.
function getWinner() {
//   for (let col = 0; col < 3; col++) {
//     const offset = col * 3;
    // Check rows and columns.
    const nxnvalue = Math.sqrt(document.querySelectorAll('#grid div').length);
    for (let col = 0; col < nxnvalue; col++) {
        const offset = col * nxnvalue;
        const newArrRow = [];
        const newArrCol = [];
        for (let i = 0; i<nxnvalue; i++) {
            newArrRow.push(offset+i);
        }
        for (let i = 0; i<nxnvalue**2; i += nxnvalue) {
            newArrCol.push(offset+i);
        }
    let result = checkBoxes(newArrRow) ||
        checkBoxes(newArrCol);
    // let result = checkBoxes(offset, 1 + offset, 2 + offset) ||
    //     checkBoxes(col, 3 + col, 6 + col);

    if (result) {
      return result;
    }
  }
  const newDiagLeft = [];
  const newDiagRight = [];
  for(let i = 0; i<nxnvalue; i++) {
      newDiagLeft.push((nxnvalue+1)*i);
      newDiagRight.push((nxnvalue-1)*i);

  }
  console.log(newDiagLeft);
  console.log(newDiagRight);
  // Check diagonals
//   return checkBoxes(0, 4, 8) || checkBoxes(2, 4, 6);
    return checkBoxes(newDiagLeft) || checkBoxes(newDiagRight);  
}

const freeBoxes = [];
// Map of box number -> 'x' or 'o'
const takenBoxes = {};
function start() {
    
    const boxes = document.querySelectorAll('#grid div');
    for (const box of boxes) {
        box.addEventListener('click', changeToX);
        freeBoxes.push(box);
}

}

// 입력값 n에 따른 grid 생성
function createnxn(event) {
    event.preventDefault();
    const nxnvalue = event.target.nxn.value;
    let grid = document.querySelector('#grid');
    let cell = ``;
    for (let i = 0; i<nxnvalue**2; i++) {
        cell += `<div data-index="${i}"></div>`;
    }
    const rootcss = document.querySelector(':root');
    rootcss.style.setProperty('--grid-value', nxnvalue);
    grid.innerHTML = cell;
    
    start();
    
}

document.querySelector('#init').addEventListener('click', function() {
    location.reload();
    for (let i = 0; i<freeBoxes.length; i++) {
      freeBoxes.pop();
    }
    for (let i = 0; i<takenBoxes.length; i++) {
      takenBoxes.pop();
    }
    
})