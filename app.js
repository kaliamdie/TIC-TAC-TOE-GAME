const cells=document.querySelectorAll(".cell")
const statusText=document.querySelector("#status")
const restartBtn=document.getElementById("restart")
const restartAgain=document.getElementById("again")
const xPoint=document.querySelector(".x-point");
const oPoint=document.querySelector(".o-point");
const winingConditions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]
let player="X"
let running=false

let options=["","","","","","","","",""]
let xPoints=0;
let oPoints=0;
// sounds
const clickSound = new Audio("click.mp3")
const win=new Audio("winner.mp3");
const gameOver= new Audio("game.wav")

//start game
function startGame(){
cells.forEach(cell=> cell.addEventListener("click",cellClicked))
restartBtn.addEventListener("click",restartGame)
restartAgain.addEventListener("click",playAgain)
statusText.textContent=`It's ${player}'s turn`
running=true;
}
startGame()
//function clicked
function cellClicked(){
 const cellsIndex=this.getAttribute("data-Index")
 if(options[cellsIndex]!="" || !running){
    return;
 }
updateCell(this,cellsIndex)

checkWinner();
}
//function update
function updateCell(cell,index){
options[index]=player;
cell.textContent=player;

}
//change player
function changePlayer() {
  if (player === "X") {
  player = "O";
} 
else {
  player = "X";
}

    clickSound.play()
    statusText.textContent = `It's ${player}'s turn`;
  }
  //check winner
function checkWinner(){
 let playerWon=false;
 let winningColor=[]
 for(let i=0;i<winingConditions.length;i++){
  const condition =winingConditions[i]
  const cell1=options[condition[0]]
  const cell2=options[condition[1]]
  const cell3=options[condition[2]]
if(cell1==""|| cell2=="" || cell3==""){
    continue;
}
   if(cell1==cell2 &&  cell2 ==cell3){
    playerWon=true;
    winningColor=condition;
    break;
   }
}
if(playerWon){
    statusText.textContent=`${player} Has Won!`
    win.play()
  
    if(player=="X"){
      xPoints++;
      xPoint.textContent=`${xPoints}`
    }else if(player=="O"){
      oPoints++
      oPoint.textContent=`${oPoints}`
    }

    for(let i=0; i<winningColor.length;i++){
      const cellColor=winningColor[i]
      cells[cellColor].classList.add("winner")
    }
    running=false;

}else if(!options.includes("")){
    statusText.textContent=`Draw!`
    gameOver.play()
    running=false;

 
}else{
    changePlayer()
}

 }
 //play again
 function playAgain(){
    player="X"
  options=["","","","","","","","",""]
  statusText.textContent=`${player}'s turn`
  cells.forEach(cell=>{
    cell.textContent=""
     cell.classList.remove("winner")
  
  
  
  })
  
  running=true;
  }
 //restart game

function restartGame(){
player="X"
options=["","","","","","","","",""]
statusText.textContent=`${player}'s turn`
cells.forEach(cell=>{
  cell.textContent=""
   cell.classList.remove("winner")
  
})
xPoints=0;
oPoints=0;
xPoint.textContent=`${xPoints}`
oPoint.textContent=`${oPoints}`


running=true;
}
