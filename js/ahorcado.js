let btnStartGame = document.querySelector("#start-game")
let secretsWords = ['ALURA', 
                    'ORACLE', 
                    'JAVA', 
                    'CANVAS', 
                    'JAVASCRIPT', 
                    'CSS', 
                    'HTML', 
                    'PYTHON', 
                    'ARGENTINA', 
                    'BRASIL', 
                    'COLOMBIA', 
                    'ECUADOR', 
                    'PERU', 
                    'BOLIVIA', 
                    'PARAGUAY', 
                    'URUGUAY', 
                    'MEXICO', 
                    'PANAMA'];
let btnNewWord = document.querySelector("#new-word");
let inputNewWord = document.querySelector("#input-new-word");
let spanErrorMsg = document.querySelector(".mensaje");
let footer = document.querySelector("#footer");
let btnReset = document.querySelector("#reset-game");
let hangedCnv = document.querySelector("#hanged");
let btnModalYes = document.querySelector("#btn-yes");
let btnModalNo = document.querySelector("#btn-no");

const vidas = 8;
let round = 0;
let secretWord;
let letterPositions = [];
let lettersCheck = [];
let wrongLetters = [];
let isGameFinished = false;

btnStartGame.addEventListener("click", () => {
    startGame();
});

btnNewWord.addEventListener("click", () => {
    spanErrorMsg.classList.remove("error");
    let newWord = inputNewWord.value;
    let reg = /^[A-Za-z]+$/;

    if(!newWord.match(reg)){
        spanErrorMsg.classList.add("error");
        return;
    }
    newWord = newWord.toUpperCase();
    secretsWords.push(newWord);
    inputNewWord.value = "";
    $("#myModal").modal('show');
});


btnReset.addEventListener("click", () =>{
    location.reload();
});

btnModalYes.addEventListener('click', () => {
    let chooseWord = secretsWords[secretsWords.length - 1].split("");
    $("#myModal").modal('hide');
    startGame(chooseWord);
});

btnModalNo.addEventListener('click', () =>{
    $("#myModal").modal('hide');
});


function startGame(selectedWord = null){
    isGameFinished = false;
    resetGame();
    clearCanvas();
    createBaseHanged();
    secretWord = selectedWord ?? chooseRandomWord();
    createLinesWord(secretWord);
    document.addEventListener("keyup", detectKeyPress); 
}

function generateRandomNumber(maxArray){
    return Math.floor(Math.random() * maxArray);
}

function chooseRandomWord(){
    let randomIndex = generateRandomNumber(secretsWords.length);
    return secretsWords[randomIndex].split("");
}

function detectKeyPress(e){  
    if(!validateKey(e.keyCode)){
        return;
    }
    let letterOk = e.key.toUpperCase();
    
    if(isLetterInArray(letterOk, lettersCheck) || isLetterInArray(letterOk, wrongLetters)){
        return;
    }
    let stateFlag = isLetterInSecretWord(letterOk);
    if(!stateFlag){
        wrongChoose(letterOk);
        showWrongLetter(letterOk);
        drawHangedPart(round);
        checkLoose();
        return;
    } 
    showHitLetter(letterOk, letterPositions);
    checkWin();
}

function validateKey(letterCode){
    if(letterCode >= 65 && letterCode <= 90 || letterCode == 186){
        return true;
    }
}

function isLetterInSecretWord(letter){
    let flag = false;
    letterPositions = [];
    secretWord.forEach((element, index) => {
        if(element == letter){
            flag = true;
            lettersCheck.push(element);
            letterPositions.push(index);  
        }    
    });
    return flag;
} 

function isLetterInArray(letter, array){
    if(array.indexOf(letter) == -1){
        return false;
    }
        return true;
}

function wrongChoose(letter){
    round++;
    wrongLetters.push(letter);
}

function checkLoose(){
    if(round > vidas){
        isGameFinished = true;
        showLooseMessage(secretWord);
        removeKeyUpListener();
        showBtnReset();
    }
}

function checkWin(){
    if(lettersCheck.length == secretWord.length){
        isGameFinished = true;
        showWinMessage();
        removeKeyUpListener();
        showBtnReset();
    }
}

function removeKeyUpListener(){
    document.removeEventListener('keyup', detectKeyPress);
}

function resetGame(){
    round = 0;
    secretWord = [];
    letterPositions = [];
    lettersCheck = [];
    wrongLetters = [];
    inputNewWord.value = "";
    spanErrorMsg.classList.remove("error"); 
    btnReset.classList.remove("visible");
    isGameFinished = false;
    hangedCnv.classList.add("hanged-visible");
}

function showBtnReset(){
    btnReset.classList.add("visible");  
}

function inputFocusIn(){
    removeKeyUpListener();
}


function inputFocusOut(){
    if(!isGameFinished ){
    document.addEventListener("keyup", detectKeyPress); 
    };
}

window.onload = function(){
    inputNewWord.focus();
};