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
        document.getElementById("HowtoPlay").innerHTML = "<b>How to Play-</b><br>Only type when the light is green<br>If you type when the light is red you loose<br> Type until time runs out!<br> <b>Goodluck!<b>"
    } else {
        instBool = false;
        document.getElementById("HowtoPlay").innerHTML = "";
    }
}

/*
Randomizes what string is given to the user when the game is reset
TODO: picks out random sentences
*/
function changeT() {
    //var paragraphs = ['Hello mojo', 'Yoooooo brooo', 'hehehehe']
    var paragraphs = ['Not only are the hot coffee cups going away but its going to bring an end to the tradition that many Dunkin customers have of "double cupping" or, rather, putting the foam cup around the outside of a cold drink plastic cup', 'Here is to the crazy ones. The misfits. The rebels. The troublemakers. The round pegs in the square holes. The ones who see things differently. They are not fond of rules. And they have no respect for the status quo. You can quote them, disagree with them, glorify or vilify them.', 'I believe that everything happens for a reason. People change so that you can learn to let go, things go wrong so that you appreciate them when they are right, you believe lies so you eventually learn to trust no one but yourself, and sometimes good things fall apart so better things can fall together.', 'Twenty years from now you will be more disappointed by the things that you did not do than by the ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover.', 'You find that being vulnerable is the only way to allow your heart to feel true pleasure that’s so real it scares you. You find strength in knowing you have a true friend and possibly a soul mate who will remain loyal to the end. Life seems completely different, exciting and worthwhile.'];
    var random = Math.floor(Math.random() * paragraphs.length);
    document.getElementById("input_text").innerHTML = paragraphs[random];
}
let timer = 45; //Set the total game timer to 45 seconds
let interval_timer; //Used for calculations 
let started = false; //When to start the clock
var redlightTime = false;
var done = false;
var index = 0; //Spot in the paragraph


let current_string; //This is what will display in the top box
let errors = 0; //Characters not matching prompt
let historycount = 1; //Amount of history showing
var highRand, highhighRand;
var lowRand, lowlowRand;
/*
 Starts the game timer. Count down from 45
 */
function start() {
    started = true;

    if (timer == 45) {
        lowlowRand = Math.floor(Math.random() * (10 - 5)) + 5; //5-10 
        lowRand = Math.floor(Math.random() * (20 - 15)) + 15; //15-20 
        highRand = Math.floor(Math.random() * (30 - 25)) + 25; // 25-30
        highhighRand = Math.floor(Math.random() * (40 - 35)) + 35; // 35-40
    }

    //document.getElementById("TEST").innerHTML = "HR: " + highRand + ",HHE: " + highhighRand + ",L: " + lowRand + ",LLR: " + lowlowRand;



    interval_timer = setInterval(function() { //Update the timer and calculate WPM every sec
        if (timer == highRand || timer == lowRand || timer == lowlowRand || timer == highhighRand) {
            yellowLight();
        }
        if (!done) {
            timer--;
        }
        if (timer == 0) {
            finished();
        }

        $("#timer").text(timer);

    }, 1000)
}


/*
Two stops in the program
*/
function yellowLight() {
    //$("#trafficLight").attr('src', '/images/YellowLight.png');
    document.getElementById("trafficLightID").src = 'public/images/YellowLight.png';
    setTimeout(redLight, 1000);

}

function redLight() {
    stop();
    redlightTime = true;
    document.getElementById("trafficLightID").src = 'public/images/RedLight.png';
    var duration;
    duration = Math.floor(Math.random() * (5 - 2)) + 2;
   // document.getElementById("TEST2").innerHTML += ",REDLIGHT: " + duration;
    setTimeout(greenLight, duration * 1000);
}

function greenLight() {
    if (!done) {
        start();
    }

    redlightTime = false;
    document.getElementById("trafficLightID").src = 'public/images/greenLight.png';

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
    location.reload();
}


/*
Store the users score on the history
*/
function finished() {
    //alert("Congratulations!\nWords per minute: " + wpm + "\nWordcount: " + wordcount + "\nErrors:" + errors);
    done = true;


    if (redlightTime == true) { //If the game is still going
        alert("You blew a redlight! Try again?");
        //document.getElementById("personalLeaderboard").innerHTML += "<br>" + "Lost Game"; //Used to hold a local record of your scores
    } else if (timer == 0) {
        alert("Your score is: " + index);
        //document.getElementById("personalLeaderboard").innerHTML += "<br>" + historycount + ".)" + "&emsp;" + "Score: " + index; //Used to hold a local record of your scores
        historycount++;
        timer = 45;
    }
    reset();
}

function infinteString() {
    var ranSentences = ['I am counting my calories, yet I really want dessert. ', 'The waves were crashing on the shore; it was a lovely sight. ', 'Where do random thoughts come from? ', 'Writing a list of random sentences is harder than I initially thought it would be. ', 'Sometimes, all you need to do is completely make an ass of yourself and laugh it off to realise that life isn’t so bad after all. ', 'A purple pig and a green donkey flew a kite in the middle of the night and ended up sunburnt. ', 'Sometimes it is better to just walk away from things and go back to them later when you’re in a better frame of mind.', 'She borrowed the book from him many years ago and has not yet returned it.', 'Children must obey their parents and parents must obey their employers. ', 'The limits of my language are the limits of my world. ', 'It is true that he goes abroad every year.', 'Tom seems to be afraid of just about everything.', 'Mary certainly is full of energy today.', 'I pay fifty pounds a week for board and lodging.'];
    for (var i = 0; i < 20; i++) {
        let random = Math.floor(Math.random() * ranSentences.length);
        document.getElementById("input_text").innerHTML += ranSentences[random];
    }

}

$(document).ready(function() {
    let character_length = 31; //Char showing on the screen
    infinteString();
    let letters = $("#input_text").val(); //Amount of letters


    current_string = letters.substring(index, index + character_length);

    document.addEventListener('click', function(e) { if (document.activeElement.toString() == '[object HTMLButtonElement]') { document.activeElement.blur(); } }); // Added to unclick reset button

    $("#target").text(current_string); //outputted on the prompt

    $(window).keypress(function(evt) {

        var charCode = evt.which || evt.keyCode;
        var charTyped = String.fromCharCode(charCode);
        if (!started && index <= 1) { //Starts timer when first key is clicked .. Index < 2 is to check if the game was already started so the timer doesnt start on an ended game
            done = false;
            start();
        }
        evt = evt || window.event;
        if (charTyped == letters.charAt(index) && !done) { //If the chars are correct..

            index++; //Incrementing "letters"
            current_string = letters.substring(index, index + character_length); //Move the current view over
            $("#target").text(current_string);
            $("#your-attempt").append(charTyped);

        } else if (charTyped != letters.charAt(index) && !done) {
            $("#your-attempt").append("<span class='wrong'>" + charTyped + "</span>"); //make incorrect chars a different color
            //Only add errors if the game is in progress
            if (started) {
                errors++;
                $("#errors").text(errors);
            }

        }
        if (redlightTime == true || timer == 0) {
            finished();
            jqueryReset();
        }
    });

    function jqueryReset() {
        index = 0;
        current_string = letters.substring(index, index + character_length);
        $("#target").text(current_string);
        $("#your-attempt").text("");
    }
    $("#reset").click(function() {
        reset();
        jqueryReset();
    });



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