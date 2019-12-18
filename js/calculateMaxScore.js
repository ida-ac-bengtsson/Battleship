function calculateMaxScore(mapToCheck){
    let maxScoreOfMapMinusBoats = 0;

    for(i=0; i < mapToCheck.length, i++;){

        for(j=0; j < mapToCheck[i].length; j++){

            if(mapToCheck[i][j] == 'D' || mapToCheck[i][j] == 'S' || mapToCheck[i][j] == 'C' ||mapToCheck[i][j] == 'B'){

                maxScoreOfMapMinusBoats = maxScoreOfMapMinusBoats - 25;

            }

            else{

                maxScoreOfMapMinusBoats = maxScoreOfMapMinusBoats + 30

            }

        }

    }

    /* 
    Räknar ut ett värde på spelplanen beroende på storlek
    och hur många båtar som är utplacerade. Det som returnas ska sparas i
    en variabel som sedan kommer behövas i funktionen calculatePlayerScore.
    */
    return maxScoreOfMapMinusBoats;
    

}
