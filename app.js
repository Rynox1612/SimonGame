let gameSeq=[];
let playerSeq=[];

let started=false;
let level=0;

let btns=["red","yellow","green","purple"];

let h2=document.querySelector("h2");
let divs=document.querySelectorAll(".btn")

document.addEventListener("keypress",function(){
    if(started==false){
        
        started=true;

        levelUp();
    }
})

function btnFlash(btn){
    btn.classList.add("flash");

    setTimeout(function (){
        btn.classList.remove("flash");
    },300);
}

function checkPoint(){

    let index=playerSeq.length-1;
    if (index==level-1){
        checkLast();
    }
    else if(gameSeq[index] === playerSeq[index]){
        console.log("Pressed button is correct") 
    }else{
        newGame();
    }
}

function checkLast(){

    let index=level-1;

    if(gameSeq[index] === playerSeq[index]){
        console.log("Pressed button is correct") 
        setTimeout(levelUp,500)
        playerSeq=[];
    }else{
        newGame();
    }

}

function newGame(){
    h2.innerHTML=`GAMEOVER !!.  Press any key to start.`;
    let score=document.createElement("h2");
    score.innerText=`Your Score = ${level}`
    score.classList.add("score")
    const parent = h2.parentNode;
    parent.insertBefore(score, h2.nextSibling);

    started=false;
    level=0;
    gameSeq=[];
    playerSeq=[];
}

function levelUp(){
    level++;

    let randomIndx=Math.floor(Math.random()*4);
    let rndmColor=btns[randomIndx];
    let randomBtn=document.querySelector(`.${rndmColor}`)
    btnFlash(randomBtn);
    
    gameSeq.push(rndmColor);
    h2.innerText=`level ${level}`

    if(document.body.children[2].classList[0]=="score"){
        document.body.children[2].remove();
    }
}

function btnPress(){
    let btn=this; 
    btnFlash(btn);


    let color=btn.getAttribute("id");
    playerSeq.push(color);
    console.log(playerSeq);    
    checkPoint();
}


for (btn of divs){
    btn.addEventListener("click",btnPress);
}