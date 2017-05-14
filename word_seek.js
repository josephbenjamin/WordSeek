var letter;
var letterArray = [];

//variables
var letterSize = 20;
var FPS = 30;
var randomiseColors = false;

// var seekString = "A stirring freshness in the air and ruddy streaks upon the horizon of the moral world betoken the grateful dawning of a new ora The days of a drivelling instruction are departing With us is the opening promise of a better time wherein genuine manhood doing its noblest work shall have adequate reward"

var seekString = " SONNNET CXVI                                         Let me not to the marriage of true minds Admit impediments. Love is not love Which alters when it alteration finds, Or bends with the remover to remove: O, no! it is an ever-fixed mark, That looks on tempests and is never shaken; It is the star to every wandering bark, Whose worth's unknown, although his height be taken. Love 's not Time's fool, though rosy lips and cheeks Within his bending sickle's compass come; Love alters not with his brief hours and weeks, But bears it out even to the edge of doom. If this be error, and upon me prov'd, I never writ, nor no man ever lov'd."
// var seekString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
// var seekString = 'HELLO'

// seekString = "I LOVE  YINGYING"
var charsWide = Math.floor(window.innerWidth/letterSize);
var charsHigh = Math.floor(window.innerHeight/letterSize);
var totalChars = charsWide * charsHigh
var frame_no = 0
var bufferx = (window.innerWidth - charsWide*letterSize)
// var buffery = (window.innerHeight - charsHigh*letterSize)
console.log("CharSpaceAvailable:: ", totalChars)

function setup() {
    createCanvas(
        window.innerWidth,
        window.innerHeight
    );
    background(23);
    frameRate(FPS);
    textSize(letterSize)
    textFont("Courier")

    var i = 0
    var j = 0

    // initiate the array of random letters
    InitiateLetterArray(seekString);
}

function draw() {
    refreshLetters(letterArray,seekString);
    renderAll(letterArray,0);
    frame_no += 1
    // console.log(refreshLetters(letterArray,seekString).completion)
}

function Letter(x, y){
    this.x = x;
    this.y = y;
    this.value;
    this.status = false;

    //handle including spaces in random letters
    //need to also incorporate other punctuation.

    choices = [' ','.',',','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',':',';','!',"'",'-']
    // choices = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

    this.setToRandomLetter = function(){
        // this.value = String.fromCharCode(
        //     0x0041 + round(random(0,25))
        // );
        this.value = String(choices[getRandomInt(0,choices.length-1)])
    }
    this.render = function(){
        // var mycolor = color(255,20,147);
        var mycolor = color(0,255,0);
        if (this.status == false){
            if (randomiseColors == true){
                fill(int(random(0,255)),int(random(0,255)),int(random(0,255)))
            } else {
                // fill(0,125,125,160);
                fill(255,0,0);
            }
        } else {
            fill(mycolor);
        }

        text(this.value, this.x, this.y);
    }
}

function InitiateLetterArray(seekString_){
    for (n = 0; n < seekString_.length; n++){
        i = n % charsWide // x pos  = column num
        j = Math.floor(n / charsWide) // y pos = row num
        letter = new Letter(
            i    * letterSize + bufferx,
            (j+1) * letterSize
        );
        letter.setToRandomLetter();
        letterArray.push(letter)
    }
}

function refreshLetters(input_Array,seek_String){
    //refresh the input array with random letters if they are status false
    var completion = 0
    // this.done = false
    for (i = 0; i < input_Array.length; i++){
        if (input_Array[i].status == false){
            input_Array[i].setToRandomLetter();
        }
        if (input_Array[i].value == seek_String[i].toUpperCase()) {
            input_Array[i].status = true
            completion += 1
        }
    }
    console.log("frame no:", frame_no, "correct:", completion, "total: ",seek_String.length);
    if (completion == input_Array.length){
        noLoop()
    }
}

function renderAll(letter_Array,background_=0){
    background(background_)
    for (i = 0; i < letter_Array.length; i++){
        letter_Array[i].render();
    }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
