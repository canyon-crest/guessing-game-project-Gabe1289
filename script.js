// global vars
let level, answer, score, userName, displayName, startTime, endTime;
let bgColor = 255;
const levelArr= document.getElementsByName("level");
const scoreArr = [];
const timeArr = [];
const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
const suffixArr = ["st", "nd", "rd", "th", "th","th","th","th","th","th","th","th","th","th","th","th","th","th","th","th","st","nd","rd","th","th","th","th","th","th","th","st"];
const dayArr = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
user.placeholder = "Please enter name";
//event listeners
playBtn.addEventListener("click",play);
guessBtn.addEventListener("click",makeGuess);
giveUp.addEventListener("click", forfeit);
setName.addEventListener("click", nameSetter);
user.addEventListener("keydown", function(event) {
        // Check if the pressed key is 'Enter'
        if (event.key === "Enter") {
            nameSetter();            
        }
    });
guess.addEventListener("keydown", function(event) {
        // Check if the pressed key is 'Enter'
        if (event.key === "Enter") {
            makeGuess();            
        }
    });    

function nameSetter(){
    userName = document.getElementById("user").value;
    displayName = userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase();
    if(userName.length>0){
        playBtn.disabled = false;
        setName.disabled = true;
        user.disabled = true;
    }
   
    
}
//play button
function play(){
    let initialDate = new Date();
    score = 0;
    playBtn.disabled = true;
    guessBtn.disabled = false;
    guess.disabled = false;
    giveUp.disabled = false;
    for(let i=0;i<levelArr.length;i++){
        if(levelArr[i].checked){
            level = levelArr[i].value;
        }
        levelArr[i].disabled = true;
    }
    
    msg.textContent = "Guess a number from 1-" + level + ", " + displayName;
    answer = Math.floor(Math.random()*level)+1;
    startTime = initialDate.getTime();
}
function makeGuess(){
    let userGuess = parseInt(guess.value);
    if(isNaN(userGuess)||userGuess<1||userGuess>level){
        msg.textContent = "Enter a VALID #1-" + level;
        return;
    }
    score++;//add 1 to score for valid guess
    let closeness;
    if ((Math.abs(userGuess-answer)<(level/5))){
        closeness = "HOT!";
    }
    else if((Math.abs(userGuess-answer)<(level/3))){
        closeness = "warm!";
    }     
    else if((Math.abs(userGuess-answer)<(level/2))){
        closeness = "cold.";
    }
    else{
        closeness = "freezing.";
    }

    if(userGuess>answer){
        msg.textContent = userGuess + " is too high, you're "+closeness+" Try again "+displayName;
        bgColor -= 20;
        document.body.style.backgroundColor = "rgb(255,"+bgColor+","+bgColor+")";
    }
    else if(userGuess<answer){
        msg.textContent = userGuess + " is too low, you're "+closeness+" Try again "+displayName;
        bgColor -= 20;
        document.body.style.backgroundColor = "rgb(255,"+bgColor+","+bgColor+")";
    }
    else{
        finalDate = new Date();
        if (score<(level/4)){
                scoreGoodness = "Great Score!";
            }
            else if(score<(level/2)){
                scoreGoodness = "Decent Score!";
            }
            else{
                scoreGoodness = "Atrocious Score!"
            }
        if(score==1){
            msg.textContent = userGuess + " is correct "+displayName+"! You got it first try!";
        }
        else{
            msg.textContent = userGuess + " is correct "+displayName+"! Took you "+score+" tries! "+scoreGoodness;

        }
        endTime=finalDate.getTime();
        updateScore();
        reset();
         
    }
}
function reset(){
    playBtn.disabled = false;
    guessBtn.disabled = true;
    guess.disabled = true;
    giveUp.disabled = true;
    guess.value = "";
    guess.placeholder = "";
    setName.disabled = false;
    user.disabled = false;
    for(let i=0;i<levelArr.length;i++){
        levelArr[i].disabled = false;
    }
    bgColor = 255;
    document.body.style.backgroundColor = "#ffffff";
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
    //timer stuff
    let timeDiff = (endTime - startTime)/1000;
    timeArr.push(timeDiff);
    timeArr.sort((a,b)=>a-b);
    let tlb = document.getElementsByName("timeLeaderboard");
    let timeSum = 0;
    for(let i=0;i<timeArr.length;i++){
        timeSum += timeArr[i];
        if(i<tlb.length){
            tlb[i].textContent = timeArr[i] + " seconds";
        }
    }
    let timeAvg = timeSum/timeArr.length;
    avgTime.textContent = "Average Time: "+timeAvg.toFixed(2)+" seconds";
   

}
function forfeit(){
    msg.textContent = "Womp Womp. The answer was "+ answer;
    score = Number(level);
    updateScore();
    reset();    
}
function time(){
    let d = new Date();
    let seconds;
    let minutes;
    let hours;
    seconds = d.getSeconds();
    minutes = d.getMinutes();
    hours = d.getHours();
    if(seconds<10){
        seconds = "0"+seconds;
    }
    if(minutes<10){
        minutes = "0"+minutes;
    }
    if(hours<10){
        hours = "0"+hours;
    }
    dateText = dayArr[d.getDay()]+", "+ monthArr[d.getMonth()]+" " + d.getDate()+suffixArr[d.getDate()-1]+", "+ d.getFullYear() + " " +  hours+":"+minutes+":"+seconds;
    date.textContent = dateText;
    
}
setInterval(time, 1000);





