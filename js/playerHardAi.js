let lastGuessWasHit;
let lastGuessX;
let lastGuessY;

function playerHardAI() {


    //randomiserad skjutning
    if (lastGuessWasHit) {

        fireNearby()

    }
    else {
        nedskjutningsvariabelY = Math.floor((Math.random() * 100) % length);
        nedskjutningsvariabelX = Math.floor((Math.random() * 100) % width);



        let hasAlreadyTried = playermap[nedskjutningsvariabelX][nedskjutningsvariabelY] == "X"
            || playermap[nedskjutningsvariabelX][nedskjutningsvariabelY] == "*";


        //här jämförs det om man redan skjutit på en specifik punkt. 
        //ett meddelande kommer då. 

        if (hasAlreadyTried) {
            console.log("try again");
            playerHardAI()

        }
        
        let didHitShip = playermap[nedskjutningsvariabelX][nedskjutningsvariabelY] == 'S'
                        ||playermap[nedskjutningsvariabelX][nedskjutningsvariabelY] == 'D'
                        ||playermap[nedskjutningsvariabelX][nedskjutningsvariabelY] == 'C'
                        ||playermap[nedskjutningsvariabelX][nedskjutningsvariabelY] == 'B';

        lastGuessX = nedskjutningsvariabelX;
        lastGuessY = nedskjutningsvariabelY;
        lastGuessWasHit = didHitShip;

        if (didHitShip) {

            a = nedskjutningsvariabelX.toString()
            b = nedskjutningsvariabelY.toString()
            c = a + b
            playermap[nedskjutningsvariabelX][nedskjutningsvariabelY] = "*";

            document.getElementById(`${c}`).src = "playerboatHit.jpg"
            aiNumHitsToWin--

        }
        else {
            a = nedskjutningsvariabelX.toString()
            b = nedskjutningsvariabelY.toString()
            c = a + b
            playermap[nedskjutningsvariabelX][nedskjutningsvariabelY] = "X";
            document.getElementById(`${c}`).src = "AImiss.jpg"


        }
        if (aiNumHitsToWin < 1) {

            alert('AI vann detta spelet, men bra kämpat!')

        }

    }

}

function fireNearby() {

    let guessX;
    let guessY;

     
    if (lastGuessY < length - 1 && playermap[lastGuessX][lastGuessY + 1] != "X"
        && playermap[lastGuessX][lastGuessY + 1] != "*") {

        guessX = lastGuessX;
        guessY = lastGuessY + 1;

    }
    else if (lastGuessY > 0 && playermap[lastGuessX][lastGuessY - 1] != "X"
        && playermap[lastGuessX][lastGuessY - 1] != "*") {

        guessX = lastGuessX;
        guessY = lastGuessY - 1;

    }
    else if (lastGuessX > 0 && playermap[lastGuessX - 1][lastGuessY] != "X"
        && playermap[lastGuessX - 1][lastGuessY] != "*") {

        guessX = lastGuessX - 1;
        guessY = lastGuessY;
    }
    else if (lastGuessX < width - 1 && playermap[lastGuessX + 1][lastGuessY] != "X"
        && playermap[lastGuessX + 1][lastGuessY] != "*") {

        guessX = lastGuessX + 1;
        guessY = lastGuessY;

    }
    else {

        lastGuessWasHit = false;
        playerEasyAI();
    }
    if (playermap[guessX][guessY] == 'S'
        || playermap[guessX][guessY] == 'D'
        || playermap[guessX][guessY] == 'C'
        || playermap[guessX][guessY] == 'B'){

        playermap[guessX][guessY] = "*";
        a = guessX.toString()
        b = guessY.toString()
        c = a + b

        document.getElementById(`${c}`).src = "playerboatHit.jpg"
        aiNumHitsToWin--;

        lastGuessX = guessX;
        lastGuessY = guessY;

    }
    else {
        a = guessX.toString()
        b = guessY.toString()
        c = a + b
        playermap[guessX][guessY] = "X";
        document.getElementById(`${c}`).src = "AImiss.jpg"

        lastGuessWasHit = false;

    }

}

