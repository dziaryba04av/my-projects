class MMGame {
    constructor() {
        this.skirt = 0;
        this.difficulty = 0;
        this.fliped = [];
        this.counter = 0;
        this.time;
        this.points = 0;
    }

    setGameField(field) {
        let fieldSize;
        let picsType;
        let positions;
        let skirtSrc;
        let cardClass;

        switch (this.difficulty) {
            case 0:
                fieldSize = 10;
                this.counter = 5;
                cardClass = 'easyMode';
                break;
            case 1:
                fieldSize = 18;
                this.counter = 9;
                cardClass = 'mediumMode';
                break;
            case 2:
                fieldSize = 24;
                this.counter = 12;
                cardClass = 'hardMode';
                break;
            default: 
                fieldSize = 10;
                this.counter = 5;
                cardClass = 'easyMode';
                break;
        }

        switch (this.skirt) {
            case 0: 
                skirtSrc = 'images/skirts/bg1.jpg';
                picsType = 'skeleton';
                break;
            case 1:
                skirtSrc = 'images/skirts/bg2.jpg'
                picsType = 'pokemon';
                break;
            case 2:
                skirtSrc = 'images/skirts/bg3.jpg'
                picsType = 'train';
                break;
            default:
                skirtSrc = 'images/skirts/bg1.jpg'
                picsType = 'skeleton';
                break;
        }

        positions = this.setRandomValues(fieldSize); 

        for (let i = 0; i < positions.length ; i += 2) {
            let cardOne = document.createElement('div');
            let cardTwo = document.createElement('div');
            let frontSideOne = document.createElement('div');
            let frontSideTwo = document.createElement('div');
            let skirtImageOne = document.createElement('img');
            let skirtImageTwo = document.createElement('img');
            let backSideOne = document.createElement('div');
            let backSideTwo = document.createElement('div');
            let picOne = document.createElement('img');
            let picTwo = document.createElement('img');
            let that = this;
            
            picOne.src = 'images/pictures/' + picsType + positions[i] + 'image.jpg';
            picTwo.src = 'images/pictures/' + picsType + positions[i + 1] + 'image.jpg';
            skirtImageOne.src = skirtSrc;
            skirtImageTwo.src = skirtSrc;
            cardOne.className = cardClass;
            cardTwo.className = cardClass;
            frontSideOne.appendChild(skirtImageOne);
            frontSideTwo.appendChild(skirtImageTwo);
            backSideOne.appendChild(picOne);
            backSideTwo.appendChild(picTwo);
            cardOne.appendChild(backSideOne);
            cardTwo.appendChild(backSideTwo);
            cardOne.appendChild(frontSideOne);
            cardTwo.appendChild(frontSideTwo);
            field.appendChild(cardOne);
            field.appendChild(cardTwo);
            cardOne.addEventListener('click', function() {
                if (that.fliped.length < 2 && that.fliped[0] != cardOne && that.fliped[1] != cardOne) {
                    that.cardFlip(frontSideOne, backSideOne);
                }
            });
            cardTwo.addEventListener('click', function() {
                if (that.fliped.length < 2 && that.fliped[0] != cardTwo && that.fliped[1] != cardTwo) {
                    that.cardFlip(frontSideTwo, backSideTwo);
                }
            });
        }
    }

    finishGame() {
        this.fliped = [];
        let timer = document.querySelector('.timer');
        this.time = timer.innerHTML;
        let itemsToDelete = document.querySelectorAll('.gameField div');

        itemsToDelete.forEach(item => {
            item.remove();
        })
        
        const congratulations = document.createElement('div');
        congratulations.className = 'congratulations';
        congratulations.appendChild(document.createTextNode('Graz! You are winner ^_^ Your time: ' + this.time));
        gameField.appendChild(congratulations);
    }

    cardFlip(frontSide, backSide) {
        backSide.style.transform = 'rotateY(360deg)';
        frontSide.style.transform = 'rotateY(180deg)';
        this.fliped.push(frontSide.parentNode);

        if (this.fliped.length === 2) {
            let that = this;
            if (this.fliped[0].children[0].children[0].src === this.fliped[1].children[0].children[0].src) {
                that.counter--;
                setTimeout(function() {
                    that.fliped[0].children[0].style.opacity =  0;
                    that.fliped[0].children[0].style.transitionProperty = 'opacity';
                    that.fliped[0].children[0].style.transitionDuration = '1s';
        
                    that.fliped[0].children[1].style.opacity =  0;
                    that.fliped[0].children[1].style.transitionProperty = 'opacity';
                    that.fliped[0].children[1].style.transitionDuration = '1s';
        
                    that.fliped[1].children[0].style.opacity =  0;
                    that.fliped[1].children[0].style.transitionProperty = 'opacity';
                    that.fliped[1].children[0].style.transitionDuration = '1s';
        
                    that.fliped[1].children[1].style.opacity =  0;
                    that.fliped[1].children[1].style.transitionProperty = 'opacity';
                    that.fliped[1].children[1].style.transitionDuration = '1s';

                    that.fliped = [];
                    
                }, 1000);
            } else {
                setTimeout(function() {
                    that.fliped[0].children[0].style.transform =  'rotateY(180deg)';
                    that.fliped[0].children[1].style.transform =  'rotateY(0deg)';
                    that.fliped[1].children[0].style.transform =  'rotateY(180deg)';
                    that.fliped[1].children[1].style.transform =  'rotateY(0deg)';

                    that.fliped = [];
                }, 1000);
            }
            if (that.counter === 0) {
                setTimeout(function() {
                    that.finishGame();
                }, 1000);
            }
        }
    }

    setRandomValues(size) {
        let positions = [];
        let counter = 0;
        
        for(let i = 0; i < size / 2; i++) {
            positions.push(i);
            positions.push(i);
        }

      
        positions.sort((a, b) => Math.random() - 0.5);

        return positions;
        
    }
}

const game = new MMGame();

const skirts = document.querySelector('.skirtMenu');
const skirtItems = document.querySelectorAll('.skirtItem');

skirts.addEventListener('click', function() {
    skirtItems.forEach((item, index) => {
        if (item.style.display != 'block') {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }

        item.addEventListener('click', function() {
            skirtItems.forEach(item => {
                item.style.display = 'none';
                game.skirt = index;
            });
        })
    });
});

const difficulties = document.querySelector('.difficultyMenu');
const difficultyItems = document.querySelectorAll('.difficultyItem');

difficulties.addEventListener('click', function() {
    difficultyItems.forEach((item, index) => {
        if (item.style.display != 'block') {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }

        item.addEventListener('click', function() {
            difficultyItems.forEach(item => {
                item.style.display = 'none';
                game.difficulty = index;
            });
        })
    });
});

const gameStarter = document.querySelector('.startGame');
const gameTutorial = document.querySelector('.tutorial');
const gameField = document.querySelector('.gameField');

gameStarter.addEventListener('click', function() {
    gameTutorial.style.display = 'none';
    setTimer();
    game.setGameField(gameField);
})

function setTimer() {
    const time = document.createElement('div');

    gameField.innerHTML = '';
    time.className = 'timer';
    time.appendChild(document.createTextNode('00:00:00'))
    gameField.appendChild(time);

    timer = setInterval(() => {
        let timeValues = time.innerHTML.split(':');
        let h = timeValues[0];
        let m = timeValues[1];
        let s = timeValues[2];

        if (s == 59) {
            if (m == 59) {
                if (h == 24) {
                    h = 0;
                }
                h++;
                m = -1;

                if (h < 10) {
                    h = '0' + h;
                }
            }
            m++;
            if (m < 10) {
                m = '0' + m;
            }
            s = '00';
        } else {
            s++;
            if (s < 10) {
                s = '0' + s;
            }
        }
        time.innerHTML = h+':'+m+':'+s;
    }, 1000)
}










