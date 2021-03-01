let prova = document.getElementsByTagName('span');
let array = [...prova];


let hasFlippedCard = false;
let firstCard;
let secondCard;
let firstCardColor;
let secondCardColor;
let lock = false;
let howManyMatch = 0;





//MIX CARDS
function mixCards(){
    array.forEach(function(singleDiv){
        let randomPos = Math.floor(Math.random() * 10);
        singleDiv.style.order = randomPos;
        singleDiv.style.backgroundColor = 'grey';
        singleDiv.addEventListener('click', flipCard);
    })
}

mixCards();







//PLAY
function flipCard(){
    if(lock)return;
    
    document.querySelector('.heading').innerHTML = '...';

    if(!hasFlippedCard){
    firstCard = this;
    firstCardColor = this.className;
    this.style.backgroundColor = `${firstCardColor}`
    this.removeEventListener('click', flipCard);
    hasFlippedCard = true;
    } else{
        secondCard = this;
        secondCardColor = this.className;
        this.style.backgroundColor = `${secondCardColor}`;
        this.removeEventListener('click', flipCard);

        if(firstCardColor == secondCardColor){
            console.log('successo');
            firstCard = null;
            secondCard = null;
            hasFlippedCard = false;
            howManyMatch++;
        } else {
            lock = true;
            setTimeout(function(){
                firstCard.style.backgroundColor = 'grey';
                secondCard.style.backgroundColor = 'grey';
                firstCard.addEventListener('click', flipCard);
                secondCard.addEventListener('click', flipCard);
                firstCard = null;
                secondCard = null;
                hasFlippedCard = false;
                lock = false;
            }, 1500)
        }
    }
    if (howManyMatch === 6){
        document.querySelector('.heading').innerHTML = 'Well done, you won!';
        howManyMatch = 0;
    }
}






//RESET THE GAME
document.querySelector('.reset-btn').addEventListener('click', function(){
    lock = true;
    mixCards();
    hasFlippedCard = false;
    firstCard = null;
    secondCard = null;
    howManyMatch = 0;
    document.querySelector('.heading').innerHTML = 'New game has just started!';
    lock = false;
})