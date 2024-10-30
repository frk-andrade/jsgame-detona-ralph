const state = {
    view: { //variáveis que alteram dados que o usuário não vê
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        livesLeft: document.querySelector("#lives"),
    },
    values: { //variáveis que alteram dados na tela para o usuário
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        lives: 3,
    },
    actions: { //Variáveis com ações
        timerId: setInterval(randomSquare, 1000),
        countDownTimerID: setInterval(countDown, 1000),
        countDownLives: setInterval(gameOver,200000),
    }
};

function countDown() { //Contador descrescente que ao final apresenta um alerta com o placar.
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerID);
        clearInterval(state.actions.timerId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
    }
};


function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() { //Sorteia o quadrado onde o personagem aparece e limpa a tela.
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}


function addListenerHitBox(){ //identifica e valida se o clique ocorreu no personagem, toca o som e soma o valor do resultado.
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            } else { //implementei o contador de vidas perdidas ao clicar no quadrado que não tem o personagem
                 state.values.lives--;
                 state.view.livesLeft.textContent = state.values.lives;
                if (state.values.lives <= 0) {
                    state.view.livesLeft.textContent = state.values.lives;
                    state.values.lives = 0;
                    gameOver();
                }
            }
        })
    });
};
// função que indica que o jogo acabou ao perder todas as
function gameOver() {
    clearInterval(state.actions.countDownTimerID);
    clearInterval(state.actions.timerId);
    alert("Game Over! Você perdeu todas as vidas.")
}

function initialize() {
    addListenerHitBox();
};

initialize();