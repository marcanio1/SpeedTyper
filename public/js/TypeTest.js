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
        document.getElementById("HowtoPlay").innerHTML = "<b>How to Play-</b><br> The goal is to type each prompt as fast as possible<br>There is no need to backspace incorrect letters<br> Click Reset to recieve a random prompt and try to improve your score<br> <b>Goodluck!<b>"
    } else {
        instBool = false;
        document.getElementById("HowtoPlay").innerHTML = "";
    }
}

/*
Randomizes what string is given to the user when the game is reset
*/
function changeT() {
    //var paragraphs = ['Hello mojo', 'Yoooooo brooo', 'hehehehe']
    var paragraphs = ['Not only are the hot coffee cups going away but its going to bring an end to the tradition that many Dunkin customers have of "double cupping" or, rather, putting the foam cup around the outside of a cold drink plastic cup', 'Here is to the crazy ones. The misfits. The rebels. The troublemakers. The round pegs in the square holes. The ones who see things differently. They are not fond of rules. And they have no respect for the status quo. You can quote them, disagree with them, glorify or vilify them.', 'I believe that everything happens for a reason. People change so that you can learn to let go, things go wrong so that you appreciate them when they are right, you believe lies so you eventually learn to trust no one but yourself, and sometimes good things fall apart so better things can fall together.', 'Twenty years from now you will be more disappointed by the things that you did not do than by the ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover.', 'You find that being vulnerable is the only way to allow your heart to feel true pleasure that’s so real it scares you. You find strength in knowing you have a true friend and possibly a soul mate who will remain loyal to the end. Life seems completely different, exciting and worthwhile.'];
    var random = Math.floor(Math.random() * paragraphs.length);
    document.getElementById("input_text").innerHTML = paragraphs[random];
}


$(document).ready(function() {

    let character_length = 31; //Char showing on the screen
    let index = 0; //Spot in the paragraph
    let letters = $("#input_text").val(); //Amount of letters
    let started = false; //When to start the clock
    let current_string = letters.substring(index, index + character_length); //This is what will display in the top box
    let timer = 0; //Timer is in seconds
    let min, sec, total = 0; //Convertion of timer to seconds, minutes, and the total time
    let wpm = 0; //Words per minute
    let errors = 0; //Characters not matching prompt
    let interval_timer; //Used for calculations 
    let wordcount = 0; //Amount of words typed by user
    let historycount = 1; //Amount of history showing

    document.addEventListener('click', function(e) { if (document.activeElement.toString() == '[object HTMLButtonElement]') { document.activeElement.blur(); } }); // Added to unclick reset button

    $("#target").text(current_string); //outputted on the prompt

    $(window).keypress(function(evt) {
        var charCode = evt.which || evt.keyCode;
        var charTyped = String.fromCharCode(charCode);
        if (!started && index < 2) { //Starts timer when first key is clicked .. Index < 2 is to check if the game was already started so the timer doesnt start on an ended game
            start();
            started = true;
        }
        evt = evt || window.event;
        if (charTyped == letters.charAt(index)) { //If the chars are correct..
            if (charTyped == " ") { //count the words in the paragraph
                wordcount++;
                $("#wordcount").text(wordcount); //Display word count
            }
            index++; //Incrementing "letters"
            current_string = letters.substring(index, index + character_length); //Move the current view over
            $("#target").text(current_string);
            $("#your-attempt").append(charTyped);
            if (index == letters.length) { //If you finish typing the prompt..
                wordcount++;
                $("#wordcount").text(wordcount);
                $("#timer").text(timer);
                //if (timer == 0) { //Just in case 
                //  timer = 1;
                //}
                //if (timer > 60) { //If there is more than a minute then do this conversion if not we can treat the timer in seconds
                //min = Math.floor(timer / 60);
                //  sec = timer - (min * 60);
                //} else {
                //  sec = timer;
                //    min = 0;
                //}
                //total = (min * 60) + sec; //Calculate WPM
                //wpm = (wordcount / total) * 60;
                total = timer / 60;
                min = index / 5;

                wpm = Math.ceil(min / total);

                $("#wpm").text(wpm);
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
        interval_timer = setInterval(function() { //Update the timer and calculate WPM every sec
            timer++;
            $("#timer").text(timer);
            total = timer / 60;
            min = index / 5;
            wpm = Math.ceil(min / total);
            $("#wpm").text(wpm);
        }, 1000)
    }

    /*
       Stop the Game timer
    */
    function stop() { //Stop the timer when done
        clearInterval(interval_timer);
        started = false;
    }

    /*
    Reset all values and stop the game when the prompt is completed
    */
    function reset() {
        $("#your-attempt").text("");
        index = 0; //Clear all local varibles
        errors = 0;
        timer = 0;
        wpm = 0;
        wordcount = 0;
        clearInterval(interval_timer);
        started = false;
        letters = $("#input_text").val();
        $("#wpm").text("0"); //Clear values on the screen
        $("#timer").text("0");
        $("#wordcount").text("0");
        $("#errors").text("0");
        current_string = letters.substring(index, index + character_length);
        $("#target").text(current_string);
    }

    /*
    Store the users score on the history
    */
    function finished() {
        //alert("Congratulations!\nWords per minute: " + wpm + "\nWordcount: " + wordcount + "\nErrors:" + errors);

        if (index == 41) { //This is the demo
            document.getElementById("personalLeaderboard").innerHTML += "<br>" + "Demo" + ".)" + "WPM: " + wpm + "&emsp;" + "Errors: " + errors; //Used to hold a local record of your scores
        } else {
            document.getElementById("personalLeaderboard").innerHTML += "<br>" + historycount + ".)" + "WPM: " + wpm + "&emsp;" + "Errors: " + errors; //Used to hold a local record of your scores
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