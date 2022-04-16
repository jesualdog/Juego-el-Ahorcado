let hanged = document.querySelector("#hanged");
let pincel = hanged.getContext("2d");

let xInicialWrongLetter = 280;
let yInicialWrongLetter = 250;
let indexWrongLetter = 0;

pincel.lineWidth= 4;
pincel.fillStyle= "black";
pincel.font= "bold 20px Roboto";
pincel.strokeStyle = "black";

function createBaseHanged(){
pincel.fillStyle='black';
pincel.beginPath();
pincel.moveTo(100, 380);
pincel.lineTo(50, 400);
pincel.lineTo(150, 400);
pincel.lineTo(100, 380);
pincel.fill();
}

function createLinesWord(word){
    let xInicial = 250;
    let yInicial = 400;


    for(let i=0; i < word.length; i++){
        pincel.moveTo(xInicial, yInicial); 
        pincel.lineTo(xInicial + 20, yInicial);
        pincel.stroke();
        xInicial += 30;
    }
}

function clearCanvas(){
    indexWrongLetter = 0;
    pincel.clearRect(0,0,600,400);
    hanged.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      });
}

function showHitLetter(letter, arrPositions){
    let yInicial = 395;
    arrPositions.forEach((position) => {
        let xInicial = 253;
        console.log(letter, position);
        xInicial += (30 * position);
        pincel.fillText(letter,xInicial,yInicial);
    });
}

function showWrongLetter(wrongLetter){   
    xInicialWrongLetter += (20 * indexWrongLetter);
    pincel.fillText(wrongLetter,xInicialWrongLetter,yInicialWrongLetter);
    xInicialWrongLetter = 280;
    indexWrongLetter++;
}

function drawHangedPart(round){
    switch(round){
        case 1: 
            onePart();
            break;
        case 2: 
            twoPart();
            break;
        case 3: 
            threePart();
            break;
        case 4: 
            fourPart();
            break;
        case 5: 
            fivePart();
            break;
        case 6: 
            sixPart();
            break;
        case 7: 
            sevenPart();
            break;
        case 8: 
            eightPart();
            break;
        case 9: 
            ninePart();
            break;
    }
}

function onePart(){
    pincel.moveTo(100,80);
    pincel.lineTo(100,380);
    pincel.stroke();
}

 function twoPart(){
    pincel.moveTo(97,80);
    pincel.lineTo(200,80);
    pincel.stroke();
 }

function threePart(){
    pincel.moveTo(197,80);
    pincel.lineTo(197,120);
    pincel.stroke();
}

function fourPart(){
    pincel.beginPath();
    pincel.arc(197,150,30, 0, 2*Math.PI);
    pincel.stroke();
}

function fivePart(){
    pincel.moveTo(197,180);
    pincel.lineTo(197,280);
    pincel.stroke();
}

function sixPart(){
    pincel.moveTo(140,340);
    pincel.lineTo(197,278);
    pincel.stroke();
}

function sevenPart(){
    pincel.moveTo(254,340);
    pincel.lineTo(197,278);
    pincel.stroke();
}

function eightPart(){
    pincel.moveTo(140,180);
    pincel.lineTo(197,230);
    pincel.stroke();
}

function ninePart(){
    pincel.moveTo(254,180);
    pincel.lineTo(197,230);
    pincel.stroke();
}

function showLooseMessage(secretWord){
    let msgError = "HAS PERDIDO!";
    secretWord = secretWord.join('');
    let word = 'LA PALABRA ERA: ' + secretWord;
    xInicial = 300;
    yInicial = 210;
    pincel.fillStyle="Red";
    pincel.fillText(msgError,xInicial,yInicial);
    pincel.fillStyle="blue";
    pincel.fillText(word,xInicial - 50,yInicial + 80);
}

function showWinMessage(){
    let msgWin = "HAS GANADO!";
    xInicial = 300;
    yInicial = 200;
    pincel.fillStyle="green";
    pincel.fillText(msgWin,xInicial,yInicial);
}