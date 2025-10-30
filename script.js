// global vars
let level, answer, score;
const levelArr= document.getElementsByName("level");
const scoreArr = [];
date.textContent = time();
//event listeners
playBtn.addEventListener("click",play);
guessBtn.addEventListener("click",makeGuess);

//play button
function play(){
    score = 0;
    playBtn.disabled = true;
    guessBtn.disabled = false;
    guess.disabled = false;
    for(let i=0;i<levelArr.length;i++){
        if(levelArr[i].checked){
            level = levelArr[i].value;
        }
        levelArr[i].disabled = true;
    }
    msg.textContent ="Guess a number from 1-" +  level;
    answer = Math.floor(Math.random()*level)+1;
    guess.placeholder = answer;
}
function makeGuess(){
    let userGuess = parseInt(guess.value);
    if(isNaN(userGuess)||userGuess<1||userGuess>level){
        msg.textContent = "Enter a VALID #1-" + level;
        return;
    }
    score++;//add 1 to score for valid guess
    if(userGuess>answer){
        msg.textContent = userGuess + " is too high, try again.";
    }
    else if(userGuess<answer){
        msg.textContent = userGuess + " is too low, try again.";
    }
    else{
        if(score==1){
            msg.textContent = userGuess + " is correct! You got it first try!";
        }
        else{
            msg.textContent = userGuess + " is correct! Took you "+score+" tries!";
        }
        updateScore();
        reset();
    }
}
function reset(){
    playBtn.disabled = false;
    guessBtn.disabled = true;
    guess.disabled = true;
    guess.value = "";
    guess.placeholder = "";
    for(let i=0;i<levelArr.length;i++){
        levelArr[i].disabled = false;
    }
}
function updateScore(){
    scoreArr.push(score);
    scoreArr.sort((a,b)=>a-b);//sort by increasing
    let lb = document.getElementsByName("leaderboard");
    wins.textContent = "Total wins: "+scoreArr.length;
    let sum = 0;
    for(let i=0;i<scoreArr.length;i++){
        sum += scoreArr[i];
        if(i<lb.length){
            lb[i].textContent = scoreArr[i];
        }
    }
    let avg = sum/scoreArr.length;
    avgScore.textContent = "Average Score: "+avg.toFixed(2);

}
function time(){
    let d = new Date();
    d = d.getFullYear()+" "+d.getTime();
    return d;
}

