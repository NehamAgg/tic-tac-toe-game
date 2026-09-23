//boxes
boxes=[]
for (let i = 1; i <= 9; i++) {
  boxes.push(document.querySelector("#box" + i));
}

//audios
const clickSound = new Audio("dragon-studio-pop-402324.mp3")
const winSound =   new Audio("win sound.mp3")
const loseSound = new Audio("lose.mp3")
const bgMusic = new Audio("bg music.mp3")

document.onclick = () => click();

//bg music(very nice)
function click(){
bgMusic.volume = 0.2
bgMusic.loop=true
bgMusic.play();
}
// All objects
const board = document.querySelector("#board");
const playerWins = document.querySelector('#playerWins');
const botWins = document.querySelector("#botWins");
const tie = document.querySelector("#tie");
const status = document.querySelector("#status");

let GameDone=false
let playerWinsVar = 0;
let botWinsVar = 0;
let botStatus ;
let playerStatus;
let tieVar = 0
let counter = "playerTurn";   //playerTurn or botTurn

//bot system
function botTurn() {
  let chosen = false;
  clickSound.play()

  while (!chosen ){
    let randomBox = Math.floor(Math.random() * 9) + 1;
    let targetBox = document.querySelector("#box" + randomBox);

    if (targetBox.innerText === "") {
      targetBox.innerText = "O";
      chosen = true;
    }
  }
    if (checkWin("O")) {
    botWinsVar++;
    botWins.innerText = botWinsVar;
    status.innerText = "Bot Wins!";
    loseSound.play()
    resetBoard();
    return;
  }
  else if (isTie()) {
    tieVar++;
    tie.innerText = tieVar;
    status.innerText = "It's a Tie!";
    loseSound.play()
    resetBoard();
    return;
  }
  else{
  counter = "playerTurn";
  status.innerText = "Your Turn";
  }
}

function checkWin(symbol){
  winPatterns=[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]  
  ]
  return winPatterns.some(pattern =>
  pattern.every(index => boxes[index].innerText === symbol)
  );
}

function resetBoard(){
  setTimeout(() => {
    boxes.forEach(box => box.innerText = "")
    status.innerText = "Your Turn"
    counter="playerTurn"
  }, 1500);
}

function isTie() {
  return boxes.every(function(box) {
    return box.innerText !== "";
  });
}


// all boxes button presssing
function symbolChanger(box){
        if(counter=="playerTurn" && box.innerText === ""){
        clickSound.play()
        let boxValue = box.innerText
        box.style="  width: 150px;height: 150px;font-size: 6rem; color: white;text-align: center;vertical-align: middle;cursor: pointer;"
        box.innerText === ""? box.innerText = "X": box.innerText= boxValue
        
        if(checkWin("X")){
          playerWinsVar++;
          playerWins.innerText= playerWinsVar;
          status.innerText = "You Win!";
          resetBoard();
          winSound.play()
          return;
        }
        else if (isTie()) {
          tieVar++;
          tie.innerText = tieVar;
          status.innerText = "It's a Tie!";
          loseSound.play()
          resetBoard();
          return;
        }
        else{
        counter="botTurn"
        status.innerText = "Bot Turn"
        setTimeout(() => {
        botTurn(box);
        }, 1000);
        }
      }
        
        
        
};



// box1.onclick = () => symbolChanger(box1);
boxes[0].onclick = () => symbolChanger(boxes[0]) ;
boxes[1].onclick = () => symbolChanger(boxes[1]) ;
boxes[2].onclick = () => symbolChanger(boxes[2]) ;
boxes[3].onclick = () => symbolChanger(boxes[3]) ;
boxes[4].onclick = () => symbolChanger(boxes[4]) ;
boxes[5].onclick = () => symbolChanger(boxes[5]) ;
boxes[6].onclick = () => symbolChanger(boxes[6]) ;
boxes[7].onclick = () => symbolChanger(boxes[7]) ;
boxes[8].onclick = () => symbolChanger(boxes[8]) ;