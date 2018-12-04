class InvokerGame {
    constructor() {
        this.spheres = ['', '', ''];
        this.spells = [0, 0];
        this.spheresSlots = document.querySelectorAll('.sphere');
        this.spellSlots = document.querySelectorAll('.spell');
        this.gameField = document.querySelector('.gamefield');
        this.scoreBoard = document.querySelector('.score');
        this.inGamesScoreBoard = document.querySelector('.inGameScore');
        this.repeat;
        this.spellList = {
            1: ['quasquasquas'],
            2: ['quasquaswex', 'quaswexquas', 'wexquasquas'],
            3: ['quaswexwex', 'wexquaswex', 'wexwexquas'],
            4: ['wexwexwex'],
            5: ['wexwexexort', 'wexexortwex', 'exortwexwex'],
            6: ['wexexortexort', 'exortwexexort', 'exortexortwex'],
            7: ['exortexortexort'],
            8: ['quasexortexort', 'exortquasexort', 'exortexortquas'],
            9: ['quasquasexort', 'quasexortquas', 'exortquasquas'],
            10: ['quaswexexort', 'quasexortwex', 'wexquasexort', 'wexexortquas', 'exortquaswex', 'exortwexquas']
        }
        this.timeLine = document.querySelector('canvas').getContext('2d');
        this.timeLineLength = 300;
        this.timeLineSpeed = 20;
        this.timeToSolve;
        this.taskBoard = document.querySelector('.to-do');
        this.task
        this.taskSpells = [];
        this.spellsBoard = document.querySelector('.spells-to-do');
        this.score = 0;
        this.counter = 0;
        this.timer;
    }

    setSphere(sphere) {
        this.spheres.push(sphere);
        this.spheres.shift();
        const that = this;
        this.spheresSlots.forEach((item, index) => {
            if (that.spheres[index] !== '')
                item.style.backgroundImage = "url(" + "'assets/images/" + that.spheres[index] + ".jpg'" + ")";
        })
    }

    invokeSpell() {
        const that = this;
        for (let i = 1; i <= 10; i++) {
            this.spellList[i].forEach(item => {
                if (item === that.spheres.join('')) {
                    that.setSpell(i);
                    if (that.task === 'INVOKE') {
                        that.taskSpells.forEach((item, index) => {
                            if (item === i) {
                                const spellBars = document.querySelectorAll('.spellBar');
                                spellBars[index].style.opacity = '0.5'
                                delete that.taskSpells[index];
                                that.counter--;
                                that.score += 100;
                                that.inGamesScoreBoard.innerHTML = 'Score: ' + that.score;
                                that.checkForSolution();
                            }
                        });
                    }
                }
            });
        }
    }

    castSpell(spell) {
        if (this.task === 'INVOKE and CAST') {
            this.taskSpells.forEach((item, index) => {
                if (item === spell) {
                    const spellBars = document.querySelectorAll('.spellBar');
                    spellBars[index].style.opacity = '0.5'
                    delete this.taskSpells[index];
                    this.counter--;
                    this.score += 100;
                    this.inGamesScoreBoard.innerHTML = 'Score: ' + this.score;
                    this.checkForSolution();
                }
            });
        }
    }

    setSpell(number) {
        const that = this;
        if (this.spells[1] === number)
            this.spells.reverse();
        else if (this.spells[0] !== number) {
            this.spells.unshift(number);
            this.spells.pop();
        }
        this.spellSlots.forEach((item, index) => {
            if (that.spells[index] !== 0)
                item.style.backgroundImage = "url(" + "'assets/images/" + that.spells[index] + ".jpg'" + ")";
        });
    }

    setTimer() {
        const that = this;
        this.timeLine.fillStyle = "red";
        this.timer = setInterval(() => {
            that.timeLine.clearRect(0, 0, 600, 150);
            that.timeLine.fillRect(0, 0, that.timeLineLength, 150);
            that.timeLineLength--;
            if (that.timeLineLength === 0) {
                deleteTimer();
                that.endGame();
            }
        }, that.timeToSolve);

        function deleteTimer() {
            clearInterval(that.timer);
        }
    }

    endGame() {
        this.taskSpells = [];
        const scoreString = 'Your score: ' + this.score;
        this.scoreBoard.appendChild(document.createTextNode(scoreString));
        this.repeat = document.querySelector('.repeat');
        this.gameField.style.display = 'none';
        this.scoreBoard.style.display = 'block';
        this.repeat.style.display = 'block';
        const that = this;
        this.repeat.addEventListener('click', () => {
            location.reload();
        })
    }

    setTask() {
        const toDo = Math.floor(Math.random() * 2);

        switch(toDo) {
            case 0:
                this.task = 'INVOKE';
                break;
            case 1:
                this.task = 'INVOKE and CAST'
                break;
        }

        this.taskBoard.appendChild(document.createTextNode(this.task));

        this.counter = 1 + Math.floor(Math.random() * 3);
        this.timeToSolve = this.counter * this.timeLineSpeed;

        for (let i = 0; i < this.counter; i++) {
            let spellBar = document.createElement('div');
            spellBar.className = 'spellBar';
            this.spellsBoard.appendChild(spellBar);

            
            while (this.taskSpells[i] === undefined) {
                const spell = 1 + Math.floor(Math.random() * 10);
                if (spell !== this.taskSpells[i-1] && spell !== this.taskSpells[i-2]) {
                    this.taskSpells.push(spell);
                }
            }

            spellBar.style.backgroundImage = "url(" + "'assets/images/" + this.taskSpells[i] + ".jpg'" + ")"
        }
    }

    checkForSolution() {
        if (this.counter === 0) {
            clearInterval(this.timer)
            const barsToDelete = document.querySelectorAll('.spellBar');
            for (let i = 0; i < barsToDelete.length; i++) {
                barsToDelete[i].parentNode.removeChild(barsToDelete[i]);
            }
            this.taskBoard.innerHTML = '';
            this.timeLineLength = 300;
            this.timeLineSpeed -= 0.3;
            this.taskSpells = [];
            this.setTask();
            this.setTimer();
        }
    }
}


const startButton = document.querySelector('.startButton');
startButton.addEventListener('click', function() {
    startButton.style.display = 'none';

    const newGame = new InvokerGame();
    newGame.gameField.style.display = 'flex';
    newGame.setTask();
    newGame.setTimer();

    document.onkeydown = function(event) {
        switch(event.keyCode) {
            case 81:
                newGame.setSphere('quas');
                break;
            case 87:
                newGame.setSphere('wex');
                break;
            case 69:
                newGame.setSphere('exort');
                break;
            case 82:
                newGame.invokeSpell();
                break;
            case 68:
                newGame.castSpell(newGame.spells[0]);
                break;
            case 70:
                newGame.castSpell(newGame.spells[1]);
                break;
        }
    }

});
