/*
Back button to go back to the home page
*/
function goBack() {
    window.history.back();
}

/*
Instructions are toggeled by the instrcution button
*/
let instBool = false;

function showHowToPlay() {
    if (instBool == false) {
        instBool = true;
        document.getElementById("HowtoPlay").innerHTML = "<b>How to Play-</b><br> The goal is to type the characters as fast as possible<br>There is no need to backspace incorrect character<br> Click Reset to recieve a random list of characters<br> <b>Goodluck!<b>"
    } else {
        instBool = false;
        document.getElementById("HowtoPlay").innerHTML = "";
    }
}

/*
Randomizes the string given to the user when the game is reset
*/
function changeT() {

    let paragraphs = ['~', '!', '#', '$', '%', "^", '&', '*', '(', ')', '-', '+', '=', ',', '<', '>', '.', '?', '/', ';', ':', '{', '}', '[', ']', '|', "\\", ' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let random;
    let final = "";
    //Create a random string of 32 chars
    for (var i = 0; i < 32; i++) {
        random = Math.floor(Math.random() * paragraphs.length);
        final += paragraphs[random];
    }

    document.getElementById("input_text").innerHTML = final;

}

$(document).ready(function() {


    let character_length = 31; //Char showing on the screen
    let index = 0; //Spot in the paragraph
    let letters = $("#input_text").val(); //Amount of letters
    let started = false; //When to start the clock
    let current_string = letters.substring(index, index + character_length); //This is what will display in the top box
    let timer = 0; //Timer is in seconds
    let errors = 0; //Characters not matching prompt
    let interval_timer; //Used for calculations 
    let historycount = 1; //Amount of history showing

    document.addEventListener('click', function(e) { if (document.activeElement.toString() == '[object HTMLButtonElement]') { document.activeElement.blur(); } }); // Added to unclick reset button

    $("#target").text(current_string); //outputted on the prompt

    $(window).keypress(function(evt) {
        let charCode = evt.which || evt.keyCode;
        let charTyped = String.fromCharCode(charCode);
        if (!started && index < 4) { //Starts timer when first key is clicked  
            start();
            started = true;
        }
        evt = evt || window.event;
        if (charTyped == letters.charAt(index)) { //If the chars are correct..
            index++; //Incrementing "letters"
            current_string = letters.substring(index, index + character_length); //Move the current view over
            $("#target").text(current_string);
            $("#your-attempt").append(charTyped);
            if (index == letters.length) { //If you finish typing the prompt..

                $("#timer").text(timer);

                stop();
                finished();
            }
        } else {
            $("#your-attempt").append("<span class='wrong'>" + charTyped + "</span>"); //make incorrect chars a different color
            //Only add errors if the game is in progress
            if (started) {
                errors++;
                $("#errors").text(errors);
            }
        }
    });


    $("#reset").click(function() {
        reset();
    });

    /*
    Starts the game timer. Imcrementing in seconds
    */
    function start() {
        interval_timer = setInterval(function() {
            timer++;
            $("#timer").text(timer);

        }, 1000)
    }
    /*
    Stop the Game timer
    */
    function stop() {
        clearInterval(interval_timer);
        started = false;
    }

    /*
    Reset all values and stop the game when the prompt is completed
    */
    function reset() {
        $("#your-attempt").text("");
        index = 0;
        timer = 0;
        errors = 0;
        clearInterval(interval_timer);
        started = false;
        letters = $("#input_text").val();
        $("#timer").text("0");
        $("#errors").text("0");
        current_string = letters.substring(index, index + character_length);
        $("#target").text(current_string);
    }

    /*
    Store the users score on the history
    */
    function finished() {

        let score = ((timer - errors) < 0) ? 0 : (timer - errors); //If the score is negative make it 0

        //alert("Congratulations! + wordcount + "\nErrors:" + errors);
        if (index == 41) { //This is demo
            document.getElementById("personalLeaderboard").innerHTML += "<br>" + "Demo" + ".)" + "Time: " + timer + "&emsp;" + "Errors: " + errors + "&emsp;" + "Score: " + score; //Used to hold a local record of your scores

        } else {
            document.getElementById("personalLeaderboard").innerHTML += "<br>" + historycount + ".)" + "Time: " + timer + "&emsp;" + "Errors: " + errors + "&emsp;" + "Score: " + score; //Used to hold a local record of your scores
            historycount++;
        }

    }

    var window_focus;

    $(window).focus(function() {
        window_focus = true;
    }).blur(function() {
        window_focus = false;
    });

    $(document).ready(function() {
        if (window_focus) {
            $("#focus").hide();
        }
        $(window).focus(function() {
            $("#focus").hide();
        });
    });

});