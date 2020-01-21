let wpm = 0;
let wordcount = 0;
let timer = 0;
let interval_timer = 0; //Actual timer function
let onORoff = false; //Only start timer if the game has not begun
let index = 0;
let update = 0;
let oldValue, newValue = 0;
let min, sec, total = 0 //Used to calc WPM
let cnt = 0;
let cnt2 = 0;

/*
Probably should fix and turn timer off when not in use.. TODO
*/
function start() {
    if (!onORoff) {
        onORoff = true;
        startTimer();
    }
}

/*
Type out the prompt when the page loads
*/
window.onload = function typeWriter() {
    //document.getElementById("paused").innerHTML = "hey"
    var txt = "Click here to test your WPM!";
    var speed = 50;
    if (cnt < txt.length) {
        document.getElementById("typetestInput").placeholder += txt.charAt(cnt);
        cnt++;
        setTimeout(typeWriter, speed);
    }
}

/*
Counting the index of what the user is typing
*/
function increment() {
    newValue = document.getElementById("typetestInput").value;
    if (index == 0) { //Start off by making each value equal
        oldValue = document.getElementById("typetestInput").value;
        index++; //First word
        wordcount = 1;
    } else if (newValue.length > oldValue.length) {
        index++; //If we enter another value increment
    } else if (oldValue.length > newValue.length) {
        index--; //If we backspace a value decrement
    }
}

/*
count the amount of words based on spaces. Takes in account acciedntal multiple spaces
*/
function countWords() {

    var currentText = document.getElementById("typetestInput").value;
    oldValue = document.getElementById("typetestInput").value;
    //document.getElementById("test").innerHTML = currentText[index - 1];
    //if (currentText[index - 1] == " ") {

    var i = 0;
    var count = 1;
    while (i < currentText.length) { //this checks if there is two spaces in a row. If there is do not count it as a word
        if (currentText[i] == ' ') {
            if (i > 2) {
                if (currentText[i - 1] != ' ') {
                    count++;
                }
            }
        }
        i++;
    }
    wordcount = count;
}

/*
Resets the value if the user deletes everything in the textbox
*/
function reset() {
    if (document.getElementById("typetestInput").value != "") { //Check if it is empty
        timer++;
        document.getElementById("paused").style = "color:green;font-size:20px;";
        document.getElementById("paused").innerHTML = "In progress";
        calcWPM();
    } else { // If empty leave everything at 0.. Word count
        timer = 0;
        index = 0;
        wordcount = 0;
        wpm = 0;
        document.getElementById("paused").style = "color:red;font-size:20px;";
        document.getElementById("paused").innerHTML = "Paused";
    }

}

/*
Calculates the users current WPM
*/
function calcWPM() {
    if (timer > 60) { //If there is more than a minute then do this conversion if not we can treat the timer in seconds
        min = Math.floor(timer / 60);
        sec = timer - (min * 60);
    } else {
        sec = timer;
        min = 0;
    }
    total = (min * 60) + sec; //Calculate WPM
    wpm = Math.floor((wordcount / total) * 60);
}

/*
Displays the current values of the textbox
*/
function startTimer() {
    interval_timer = setInterval(function() { //Update the timer and calculate WPM every sec
        wpm = Math.round(wordcount / (timer / 60));
        document.getElementById("TimerFrontPage").innerHTML = "Timer: " + timer + " | "; //Update timer on screen
        //document.getElementById("test").innerHTML = "Index: " + index + " WordCount:" + wordcount; //TEST - output the values of index and wordcount
        reset();
        document.getElementById("test").innerHTML = "Word Count: " + wordcount;
        document.getElementById("WPMFrontPage").innerHTML = "WPM: " + wpm + " | "; //update WPM on screen
        countWords();
    }, 1000)
}