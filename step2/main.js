const timerPlayerA = document.querySelector('#timerPlayerA')
const timerPlayerB = document.querySelector('#timerPlayerB')
const audioGremio = new Audio('../hinoGremio.mp3');
const audioInter = new Audio('../hinoInter.mp3');
const quadrados = document.querySelectorAll('.quadrado');
const textoVezAtual = document.querySelector('.playerVez p');
const main = document.querySelector("main");

let jogoEncerrado = false;
let tempoSegundos = 10;
let vezAtual = 1;

// Seleção dos jogadores
const player1 = document.querySelector("#player1");
let imagePlayer1 = player1.value;

const player2 = document.querySelector("#player2");
let imagePlayer2 = player2.value;

player1.addEventListener('change', function(event) {
    imagePlayer1 = event.target.value;
    const playerATimer = document.querySelector("timerA").outerHTML;
    playerA.innerHTML = `<h1>PLAYER ${imagePlayer1.toUpperCase()} - ${pontuacaoPlayerA}</h1>` + playerATimer; // Reinsere o timer
});

player2.addEventListener('change', function(event) {
    imagePlayer2 = event.target.value;
    const playerBTimer = document.querySelector("#timerB").outerHTML; // Salva o timer atual
    playerB.innerHTML = `<h1>PLAYER ${imagePlayer2.toUpperCase()} - ${pontuacaoPlayerB}</h1>` + playerBTimer; // Reinsere o timer
});

function verificarVitoria() {
    const combinacoesVencedoras = [
        [0, 1, 2], 
        [3, 4, 5], 
        [6, 7, 8],
        [0, 3, 6], 
        [1, 4, 7], 
        [2, 5, 8],
        [0, 4, 8], 
        [2, 4, 6]
    ];

    for (let i = 0; i < combinacoesVencedoras.length; i++) {
        let a = combinacoesVencedoras[i][0];
        let b = combinacoesVencedoras[i][1];
        let c = combinacoesVencedoras[i][2];
        
        if (quadrados[a].style.backgroundImage !== '' &&
            quadrados[a].style.backgroundImage === quadrados[b].style.backgroundImage &&
            quadrados[a].style.backgroundImage === quadrados[c].style.backgroundImage) {
                
            const vencedor = quadrados[a].style.backgroundImage.includes(`${imagePlayer1}.png`) ? `${imagePlayer1}` : `${imagePlayer2}`;
            alert(`Jogador ${vencedor.toUpperCase()} venceu!`);
            atualizarTabuleiro(vencedor);
            jogoEncerrado = true;
        }
    }
}

for (let i = 0; i < quadrados.length; i++) {
    quadrados[i].addEventListener("click", (e) => {
        if (jogoEncerrado) return;

        if (vezAtual === 1) {
            if (e.target.style.backgroundImage.includes(`${imagePlayer2}.png`)) {
                alert("Escolha outra posição");
            } else {
                e.target.style.backgroundImage = `url('../images/${imagePlayer1}.png')`;
                vezAtual = 2;
                textoVezAtual.innerText = `Vez de ${imagePlayer2.toUpperCase()}`;
                tempoSegundos = 10;
                timerPlayerA.style.display = "none";
                timerPlayerB.style.display = "block";
                verificarVitoria();
            }
        } else {
            if (e.target.style.backgroundImage.includes(`${imagePlayer1}.png`)) {
                alert("Escolha outra posição");
            } else {
                e.target.style.backgroundImage = `url('../images/${imagePlayer2}.png')`;
                vezAtual--;
                textoVezAtual.innerText = `Vez de ${imagePlayer1.toUpperCase()}`;
                tempoSegundos = 10;
                timerPlayerB.style.display = "none";
                timerPlayerA.style.display = "block";
                verificarVitoria();
            }
        }
    });
}

const timerText = document.querySelector(".timer-tabuleiro");

function startTime(){
    if(tempoSegundos == -1){
        if(vezAtual == 1){
            vezAtual = 2;
            textoVezAtual.innerText = `Vez de ${imagePlayer2.toUpperCase()}`;
            timerPlayerB.style.display = "block";
            timerPlayerA.style.display = "none"
            
        } else {
            vezAtual = 1;
            textoVezAtual.innerText = `Vez de ${imagePlayer1.toUpperCase()}`;
            timerPlayerA.style.display = "block";
            timerPlayerB.style.display = "none"
        }
        tempoSegundos = 10;
    }
    const currentTimer = vezAtual === 1 ? timerPlayerA : timerPlayerB;
    currentTimer.querySelector('p').innerText = `00: ${tempoSegundos < 10 ? "0" : ""}${tempoSegundos}`;
}

const botaoResetar = document.querySelector("#btnResetar").addEventListener("click", reiniciarJogo);

function reiniciarJogo(){
    vezAtual = 1;
    tempoSegundos = 10;
    jogoEncerrado = false
    textoVezAtual.innerText = `Vez de ${imagePlayer1.toUpperCase()}`;
    for(let r = 0; r < 9; r++){   
        quadrados[r].style.background = '';
    }
}

const playerA = document.querySelector(".playerA");
const playerB = document.querySelector(".playerB");
let pontuacaoPlayerA = 0;
let pontuacaoPlayerB = 0;

function atualizarTabuleiro(vencedor){
    if(vencedor === imagePlayer1) {
        pontuacaoPlayerA++;
        playerA.innerHTML = `<h1>PLAYER ${imagePlayer1.toUpperCase()} - ${pontuacaoPlayerA}</h1>`;
    } else {
        pontuacaoPlayerB++;
        playerB.innerHTML = `<h1>PLAYER ${imagePlayer2.toUpperCase()} - ${pontuacaoPlayerB}</h1>`;
    }
    
    if(vencedor === 'gremio') {
        playerA.innerHTML = `<h1>PLAYER ${imagePlayer1.toString().toUpperCase()} - ${pontuacaoPlayerA+=0}</h1>`
            audioGremio.play()
    } else if (vencedor === 'inter') {
        audioInter.play()
    }
}

setInterval(() => {
    if (!jogoEncerrado) {
        tempoSegundos -= 1;
        startTime();
    }
}, 1000);
