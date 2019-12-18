/*
 *
 * I den här filen har vi lite hjälpfunktioner för att hantera kartan åt oss.
 * 
 */

/*
 * buildMap
 *
 * Denna funktion ritar ut hela kartan från början.
 * För varje ruta som ska finnas på kartan (dvs storleken på vår map), 
 * rita vatten-rutor överallt, alltså inga skepp!
 * Var skeppen finns är ju hemligt från början!
 * 
 * Notera:
 * Alla vatten-rutor som ritas ut klassificeras som square: class="square"
 * De får också ett eget id-nummer: id=${i}
 * Det är bara för att vi ska kunna fånga upp klicken på dem senare och veta exakt vilken ruta det är.
 * 
 * Vår sida kommer efter att denna funktion har körts se ut så här:
 * ---------------------------
 * <div id=0 class="square"><img src="water.jpg" width="50"/></div>
 * <div id=1 class="square"><img src="water.jpg" width="50"/></div>
 * <div id=2 class="square"><img src="water.jpg" width="50"/></div>
 * ...
 * <div id=34 class="square"><img src="water.jpg" width="50"/></div>
 * <div id=35 class="square"><img src="water.jpg" width="50"/></div>
 * ------------
 * ... dvs en massa bilder på vatten.
 * 
 */
let destroyerCounter = 0
let submarineCounter = 0
let cruiserCounter = 0
let battleshipCounter = 0

let aiDestroyerCounter = 0
let aiSubmarineCounter = 0
let aiCruiserCounter = 0
let aiBattleshipCounter = 0

let båtcounter = 0

let destroyerarray = []
let submarinearray = []
let cruiserarray = []
let battleshiparray = []

let boatOption;

function buildMapPlayer(length, width) {
    //För varje ruta på kartan...
    let containerColumn = $(".playercontainerColumn");
    for (let i = 0; i < length; i++) {
        containerColumn.append(`<div id="row${i}" class="playercontainerRow"></div>`);
        for (let j = 0; j < width; j++) {
            let a = i.toString()
            let b = j.toString()
            let c = a + b
            //Lägg till ett nytt div-element som har klassen square och ett id som motsvarar index i arrayen map.
            $(`#row${i}`).append(`
            <div id1=${i} id2=${j} class="playersquare">
                 <img id=${c} src="white-square.jpg" width="${squareSize}" height="${squareSize}"/>
            </div>`);
        }
    }
}

function buildMapAi(length, width) {
    //För varje ruta på kartan...
    let containerColumn = $(".aicontainerColumn");
    for (let i = 0; i < length; i++) {
        containerColumn.append(`<div id="row${i}" class="aicontainerRow"></div>`);
        for (let j = 0; j < width; j++) {
            //Lägg till ett nytt div-element som har klassen square och ett id som motsvarar index i arrayen map.
            $(`#row${i}`).append(`
            <div id1=${i} id2=${j} class="aisquare">
                 <img src="water.jpg" width="${squareSize}" height="${squareSize}"/>
            </div>`);
        }
    }
}


// Ta med typ av skepp till variable "boat"
var boat;

$(`#chooseShip`).change(function () {
    let select = $(this).get(0);
    boat = select.options[select.selectedIndex].value;
    //boatOption = $(".chooseShip option:selected").val();
    console.log(boat);
})


// Skape en till funktion så att man kan välja en av olika skepp som man vill oavsett ordning.
// Väljer vilken båt genom "placeShips()" och sen gå genom nästa funktion enligt båt typ.
// Ta med typ av skepp till variable "boat"
var boat;

$(`#chooseShip`).change(function () {
    let select = $(this).get(0);
    boat = select.options[select.selectedIndex].value;
    //boatOption = $(".chooseShip option:selected").val();
    console.log(boat);
})


// Skape en till funktion så att man kan välja en av olika skepp som man vill oavsett ordning.
// Väljer vilken båt genom "placeShips()" och sen gå genom nästa funktion enligt båt typ.
function placeShips() {

    console.log ("placeShips " + boat);

    switch (boat){
        case "destroyerOpt":
        placeShipsDestroyer();
        console.log ("switch destroyer");
        break;

        case "submarineOpt":
        placeShipsSubmarine();
        console.log ("switch submarine");
        break;

        case "cruiserOpt":
        placeShipsCruiser();
        console.log ("switch cruise");
        break;

        case "battleshipOpt":
        placeShipsBattleship();
        console.log ("switch battle ship");
        break;
    }
}


function placeShipsDestroyer(){
    console.log ("placeShipsDestroyer");

    if (answer == true) {
        if (document.getElementById("x-coord1").value == 'undefined' || document.getElementById("y-coord1").value == 'undefined' || document.getElementById("x-coord2").value == 'undefined' || document.getElementById("y-coord2").value =='undefined') {
           
        }

        else {
            x1 = Number(document.getElementById("x-coord1").value);
            y1 = Number(document.getElementById("y-coord1").value);
            x2 = Number(document.getElementById("x-coord2").value);
            y2 = Number(document.getElementById("y-coord2").value);

            if (destroyerCounter < 1) {

                
                
                // Lägger in ikonen för båten på de tidigare bestämda platserna
                 if (checkPlacement(playermap, x1, y1, x2, y2)) {

                    alert('Du försöker placera en båt på en ruta/rutor där det redan finns ett skepp, försök igen.')
                    document.getElementById("x-coord1").value = ''
                    document.getElementById("y-coord1").value = ''
                    document.getElementById("x-coord2").value = ''
                    document.getElementById("y-coord2").value = ''
                }
                 else if (y1 == y2) {
                     if(y2>length){
                        alert("Ditt skepp hamnar utanför spelplanen! Prova igen")
                        document.getElementById("x-coord1").value = ''
                        document.getElementById("y-coord1").value = ''
                        document.getElementById("x-coord2").value = ''
                        document.getElementById("y-coord2").value = ''
                    }
                     else{
                    let destroyer = x1 + 2;
                    destroyerCounter++;
                    båtcounter++;
                    for(let i =x1; i<destroyer ;i++){
                        playermap[i].splice(y1,1,"D"); 
                        console.log("Det Funkar!!")
                        let a = i.toString()
                        let b = y1.toString()
                        let c = a+b
                        destroyerarray.push(c)
                        
                        document.getElementById(`${c}`).src="ship.jpg";
                        document.getElementById("x-coord1").value = ''
                        document.getElementById("y-coord1").value = ''
                        document.getElementById("x-coord2").value = ''
                        document.getElementById("y-coord2").value = ''
                    }
                    } 
                    
                }
                else if (x1 == x2){
                    if(x2>width){
                        alert("Ditt skepp hamnar utanför spelplanen! Prova igen")
                        document.getElementById("x-coord1").value = ''
                        document.getElementById("y-coord1").value = ''
                        document.getElementById("x-coord2").value = ''
                        document.getElementById("y-coord2").value = ''
                    }
                    else{
                    let destroyer = y1 + 2;
                    playermap[x1].fill("D", y1, destroyer);
                    destroyerCounter++;
                    båtcounter++
                    for (let i = y1; i < destroyer; i++) {
                        let a = x1.toString()
                        let b = i.toString()
                        let c = a + b
                        
                        document.getElementById(`${c}`).src = "ship.jpg";
                        document.getElementById("x-coord1").value = ''
                        document.getElementById("y-coord1").value = ''
                        document.getElementById("x-coord2").value = ''
                        document.getElementById("y-coord2").value = ''
                    }
                }
                }
            }
        }
    }
    document.getElementById("destroyer").style.visibility = "hidden";
    aiPlaceShips();
}
           

function placeShipsSubmarine(){
    if (answer == true) {
        if (document.getElementById("x-coord1").value == 'undefined' || document.getElementById("y-coord1").value == 'undefined') {
           
        }

        else {
            x1 = Number(document.getElementById("x-coord1").value);
            y1 = Number(document.getElementById("y-coord1").value);
            x2 = Number(document.getElementById("x-coord2").value);
            y2 = Number(document.getElementById("y-coord2").value);
            if (submarineCounter < 1) {

                
                // Lägger in ikonen för båten på de tidigare bestämda platserna
                
               // else if (checkPlacement(playermap, submarine, y, x)) {
        
                 //   alert('Du försöker placera en båt på en ruta/rutor där det redan finns ett skepp, försök igen.')
        
                //}
                if (checkPlacement(playermap, x1, y1, x2, y2)) {

                    alert('Du försöker placera en båt på en ruta/rutor där det redan finns ett skepp, försök igen.')
                    document.getElementById("x-coord1").value = ''
                    document.getElementById("y-coord1").value = ''
                    document.getElementById("x-coord2").value = ''
                    document.getElementById("y-coord2").value = ''
                }
                 else if (y1 == y2) {
                     if(y2>length){
                        alert("Ditt skepp hamnar utanför spelplanen! Prova igen")
                        document.getElementById("x-coord1").value = ''
                        document.getElementById("y-coord1").value = ''
                        document.getElementById("x-coord2").value = ''
                        document.getElementById("y-coord2").value = ''
                     }
                     else{
                    let submarine = x1 + 3;
                    submarineCounter++;
                    båtcounter++;
                    for(let i =x1; i<submarine ;i++){
                        playermap[i].splice(y1,1,"S"); 
                        console.log("Det Funkar!!")
                        let a = i.toString()
                        let b = y1.toString()
                        let c = a+b
                        submarinearray.push(c)
                        
                        document.getElementById(`${c}`).src="ship.jpg";
                        document.getElementById("x-coord1").value = ''
                        document.getElementById("y-coord1").value = ''
                        document.getElementById("x-coord2").value = ''
                        document.getElementById("y-coord2").value = ''
                    }
                    } 
                    
                }
                else if (x1 == x2){
                    if(x2>width){
                        alert("Ditt skepp hamnar utanför spelplanen! Prova igen")
                        document.getElementById("x-coord1").value = ''
                        document.getElementById("y-coord1").value = ''
                        document.getElementById("x-coord2").value = ''
                        document.getElementById("y-coord2").value = ''
                    }
                    else{
                    let submarine = y1 + 3;
                    playermap[x1].fill("S", y1, submarine);
                    submarineCounter++;
                    båtcounter++
                    for (let i = y1; i < submarine; i++) {
                        let a = x1.toString()
                        let b = i.toString()
                        let c = a + b
                        
                        document.getElementById(`${c}`).src = "ship.jpg";
                        document.getElementById("x-coord1").value = ''
                        document.getElementById("y-coord1").value = ''
                        document.getElementById("x-coord2").value = ''
                        document.getElementById("y-coord2").value = ''
                    }
                }
                }
            }
        }
    }
    document.getElementById("submarine").style.visibility = "hidden";
    aiPlaceShips();
}
    


function placeShipsCruiser(){
    if (answer == true) {
        if (document.getElementById("x-coord1").value == 'undefined' || document.getElementById("y-coord1").value == 'undefined') {
           
        }

        else {
            x1 = Number(document.getElementById("x-coord1").value);
            y1 = Number(document.getElementById("y-coord1").value);
            x2 = Number(document.getElementById("x-coord2").value);
            y2 = Number(document.getElementById("y-coord2").value);


            if (cruiserCounter < 1) {

                
                if (checkPlacement(playermap, x1, y1, x2, y2)) {

                    alert('Du försöker placera en båt på en ruta/rutor där det redan finns ett skepp, försök igen.')
                    document.getElementById("x-coord1").value = ''
                    document.getElementById("y-coord1").value = ''
                    document.getElementById("x-coord2").value = ''
                    document.getElementById("y-coord2").value = ''
                }
                 else if (y1 == y2) {
                     if(y2>length){
                        alert("Ditt skepp hamnar utanför spelplanen! Prova igen")
                        document.getElementById("x-coord1").value = ''
                        document.getElementById("y-coord1").value = ''
                        document.getElementById("x-coord2").value = ''
                        document.getElementById("y-coord2").value = ''
                     }
                     else{
                    let cruiser = x1 + 4;
                    cruiserCounter++;
                    båtcounter++;
                    for(let i =x1; i<cruiser ;i++){
                        playermap[i].splice(y1,1,"S"); 
                        console.log("Det Funkar!!")
                        let a = i.toString()
                        let b = y1.toString()
                        let c = a+b
                        cruiserarray.push(c)
                        
                        document.getElementById(`${c}`).src="ship.jpg";
                        document.getElementById("x-coord1").value = ''
                        document.getElementById("y-coord1").value = ''
                        document.getElementById("x-coord2").value = ''
                        document.getElementById("y-coord2").value = ''
                    }
                    } 
                    
                }
                else if (x1 == x2){
                    if(x2>width){
                        alert("Ditt skepp hamnar utanför spelplanen! Prova igen")
                        document.getElementById("x-coord1").value = ''
                        document.getElementById("y-coord1").value = ''
                        document.getElementById("x-coord2").value = ''
                        document.getElementById("y-coord2").value = ''
                    }
                    else{
                    let cruiser = y1 + 4;
                    playermap[x1].fill("S", y1, cruiser);
                    cruiserCounter++;
                    båtcounter++
                    for (let i = y1; i < cruiser; i++) {
                        let a = x1.toString()
                        let b = i.toString()
                        let c = a + b
                        
                        document.getElementById(`${c}`).src = "ship.jpg";
                        document.getElementById("x-coord1").value = ''
                        document.getElementById("y-coord1").value = ''
                        document.getElementById("x-coord2").value = ''
                        document.getElementById("y-coord2").value = ''
                    }
                }
            }
            }
        }
    }
    document.getElementById("cruiser").style.visibility = "hidden";
    aiPlaceShips();
}
    
          
function placeShipsBattleship(){
    if (answer == true) {
        if (document.getElementById("x-coord1").value == 'undefined' || document.getElementById("y-coord1").value == 'undefined') {
           
        }

        else {
            x1 = Number(document.getElementById("x-coord1").value);
            y1 = Number(document.getElementById("y-coord1").value);
            x2 = Number(document.getElementById("x-coord2").value);
            y2 = Number(document.getElementById("y-coord2").value);


            if (battleshipCounter < 1) {

                
                if (checkPlacement(playermap, x1, y1, x2, y2)) {

                    alert('Du försöker placera en båt på en ruta/rutor där det redan finns ett skepp, försök igen.')
                    document.getElementById("x-coord1").value = ''
                    document.getElementById("y-coord1").value = ''
                    document.getElementById("x-coord2").value = ''
                    document.getElementById("y-coord2").value = ''
                }
                 else if (y1 == y2) {
                     if(y2>length){
                        alert("Ditt skepp hamnar utanför spelplanen! Prova igen")
                        document.getElementById("x-coord1").value = ''
                        document.getElementById("y-coord1").value = ''
                        document.getElementById("x-coord2").value = ''
                        document.getElementById("y-coord2").value = ''
                     }
                     else{
                    let battleship = x1 + 5;
                    battleshipCounter++;
                    båtcounter++;
                    for(let i =x1; i<battleship ;i++){
                        playermap[i].splice(y1,1,"S"); 
                        console.log("Det Funkar!!")
                        let a = i.toString()
                        let b = y1.toString()
                        let c = a+b
                        battleshiparray.push(c)
                        
                        document.getElementById(`${c}`).src="ship.jpg";
                        document.getElementById("x-coord1").value = ''
                        document.getElementById("y-coord1").value = ''
                        document.getElementById("x-coord2").value = ''
                        document.getElementById("y-coord2").value = ''
                    }
                    } 
                    
                }
                else if (x1 == x2){
                    if(x2>width){
                        alert("Ditt skepp hamnar utanför spelplanen! Prova igen")
                        document.getElementById("x-coord1").value = ''
                        document.getElementById("y-coord1").value = ''
                        document.getElementById("x-coord2").value = ''
                        document.getElementById("y-coord2").value = ''
                    }
                    else{
                    let battleship = y1 + 5;
                    playermap[x1].fill("S", y1, battleship);
                    battleshipCounter++;
                    båtcounter++
                    for (let i = y1; i < battleship; i++) {
                        let a = x1.toString()
                        let b = i.toString()
                        let c = a + b
                        
                        document.getElementById(`${c}`).src = "ship.jpg";
                        document.getElementById("x-coord1").value = ''
                        document.getElementById("y-coord1").value = ''
                        document.getElementById("x-coord2").value = ''
                        document.getElementById("y-coord2").value = ''
                    }
                }
            }
            }
        }
    }
    document.getElementById("battleship").style.visibility = "hidden";
    aiPlaceShips();
}



   

function aiPlaceShips() {
    console.log("aiPlaceShips is working")

    while (destroyerCounter == 1) {
        positionRow = Math.floor((Math.random() * 100) % length);
        position1A = Math.floor((Math.random() * 100) % width);

        //för att inte få ett för stort skepp.
        position1B = position1A + 2;
        if (position1B > width) {
            aiPlaceShips()
        }
        else if (checkPlacement(aimap, position1B, position1A, positionRow)) {

            aiPlaceShips()

        }
        else {
            aimap[positionRow].fill("D", position1A, position1B);
            destroyerCounter++;
        }
    }

    while (submarineCounter == 1) {
        positionRow = Math.floor((Math.random() * 100) % length);
        position1A = Math.floor((Math.random() * 100) % width);

        //för att inte få ett för stort skepp.
        position1B = position1A + 3;
        if (position1B > width) {
            aiPlaceShips()
        }
        else if (checkPlacement(aimap, position1B, position1A, positionRow)) {

            aiPlaceShips()

        }
        else {
            aimap[positionRow].fill("S", position1A, position1B);
            submarineCounter++;
        }
    }

    while (cruiserCounter == 1) {
        positionRow = Math.floor((Math.random() * 100) % length);
        position1A = Math.floor((Math.random() * 100) % width);

        //för att inte få ett för stort skepp.
        position1B = position1A + 4;
        if (position1B > width) {
            aiPlaceShips()
        }
        else if (checkPlacement(aimap, position1B, position1A, positionRow)) {

            aiPlaceShips()

        }
        else {
            aimap[positionRow].fill("C", position1A, position1B);
            cruiserCounter++;
        }
    }

    while (battleshipCounter == 1) {
        positionRow = Math.floor((Math.random() * 100) % length);
        position1A = Math.floor((Math.random() * 100) % width);

        //för att inte få ett för stort skepp.
        position1B = position1A + 5;
        if (position1B > width) {
            aiPlaceShips()
        }
        else if (checkPlacement(aimap, position1B, position1A, positionRow)) {

            aiPlaceShips()

        }
        else {
            aimap[positionRow].fill("B", position1A, position1B);
            battleshipCounter++;
        }
    }


    /*
    //Tar in x och koordinater för de rutor som skeppet ska vara i.
    //skeppet kan högst bli tre "positioner" långt
    positionRow = Math.floor((Math.random()100) % length);
    position1A = Math.floor((Math.random()100) % width);

    //för att inte få ett för stort skepp.
    position1B = position1A + 2;


    aimap[positionRow].fill("B",position1A,position1B+1);
    */
}





function createGrid(rows, cols) {

    //skapar basic array
    var array = [];
    for (var i = 0; i < rows; i++) {
        //här deklareras att varje element i arrayen ska vara en array
        array[i] = [];

        for (var j = 0; j < cols; j++) {
            array[i][j] = 0;
        }
    }

    return array;

}

//Räkna ut hur många skepps-rutor det finns på kartan...
function getNumberOfShipsOnPlayerMap(ourMap) {
    let numShips = 0;
    //För varje ruta i map...
    for (let row in ourMap) {
        for (let square in ourMap) {
            if (ourMap[row][square] != 0) { //om rutan är större än 0...
                numShips++; //öka antal skeppsrutor
            }
        }
    }
    return numShips;
}

function getNumberOfShipsOnAiMap(ourMap) {
    let numShips = 0;
    //För varje ruta i map...
    for (let row in ourMap) {
        for (let square in ourMap) {
            if (ourMap[row][square] != 0) { //om rutan är större än 0...
                numShips++; //öka antal skeppsrutor
            }
        }
    }
    return numShips;
}

function checkSunkenShips(a, b) {
    let arrayElement = a + b //sätter ihop skottkoordinaterna till en sträng
    if (destroyerarray.includes(arrayElement)) { //Letar i båtarrayen efter koordinatsträngen

        let båtEtt = destroyerarray[0].split("") // splitta textsträngarna inuti båtarrayen till nya arrayer
        let båtTvå = destroyerarray[1].split("")

        if (aimap[båtEtt[0]][båtEtt[1]] == '*' && aimap[båtTvå[0]][båtTvå[1]] == '*') { //kolla om båda koordinaterna som båten finns på är nedskjutna

            alert('Your boat is sunk')

        }
    }
    else if (submarinearray.includes(arrayElement)) {

        let båtEtt = submarinearray[0].split("") // splitta textsträngarna inuti båtarrayen till nya arrayer
        let båtTvå = submarinearray[1].split("")
        let båtTre = submarinearray[2].split("")
        if (aimap[båtEtt[0]][båtEtt[1]] == '*' && aimap[båtTvå[0]][båtTvå[1]] == '*' && aimap[båtTre[0]][båtTre[1]] == '*') { //kolla om båda koordinaterna som båten finns på är nedskjutna

            alert('Your boat is sunk')

        }
    }
    else if (cruiserarray.includes(arrayElement)) {

        let båtEtt = cruiserarray[0].split("") // splitta textsträngarna inuti båtarrayen till nya arrayer
        let båtTvå = cruiserarray[1].split("")
        let båtTre = cruiserarray[2].split("")
        let båtFyra = cruiserarray[3].split("")
        if (aimap[båtEtt[0]][båtEtt[1]] == '*' && aimap[båtTvå[0]][båtTvå[1]] == '*' && aimap[båtTre[0]][båtTre[1]] == '*' && aimap[båtFyra[0]][båtFyra[1]] == '*') { //kolla om båda koordinaterna som båten finns på är nedskjutna

            alert('Your boat is sunk')

        }
    }
    else if (battleshiparray.includes(arrayElement)) {

        let båtEtt = battleshiparray[0].split("") // splitta textsträngarna inuti båtarrayen till nya arrayer
        let båtTvå = battleshiparray[1].split("")
        let båtTre = battleshiparray[2].split("")
        let båtFyra = battleshiparray[3].split("")
        let båtFem = battleshiparray[4].split("")
        if (aimap[båtEtt[0]][båtEtt[1]] == '*' && aimap[båtTvå[0]][båtTvå[1]] == '*' && aimap[båtTre[0]][båtTre[1]] == '*' && aimap[båtFyra[0]][båtFyra[1]] == '*' && aimap[båtFem[0]][båtFem[1]] == '*') { //kolla om båda koordinaterna som båten finns på är nedskjutna

            alert('Your boat is sunk')


        }
    }
}

function placeBoat(x, y, ) {

    if (y + boatlength - 1 < gridWidth) {

        for (i = 0; i < boatlength; i++) {
            // här markeras båten med "marker" i dubbelarrayn gameBackEnd, i detta fall är marker "A", se ovan placeBoat(4, 4, 3, "A");
            gameBackEnd[x][y] =

                // Här hoppar vi till nästa x position
                x = x + 1;

        }
    } else {
        // Om båten inte får plats skriv ett medelande om det
        alert("Båten är för stor!");
    }

}

function checkPlacement(map, shipLength, shipPosition, positionRow) {

    shiplength = Number(shipLength)
    shipPosition = Number(shipPosition)
    let areaToCheck = shipLength + shipPosition
    for (i = shipPosition; i < areaToCheck; i++) {

        if (map[positionRow][i] == "B" || map[positionRow][i] == "C" || map[positionRow][i] == "D" || map[positionRow][i] == "S") {


            return true;


        }
        else {

            return false
        }
    }
}