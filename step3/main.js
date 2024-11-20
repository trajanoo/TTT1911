const quadrados = document.querySelectorAll('.quadrado');
const textoVezAtual = document.querySelector('.title-tabuleiro p');
const main = document.querySelector("main");
const audioGremio = new Audio('../hinoGremio.mp3');
const audioInter = new Audio('../hinoInter.mp3');
const timerPlayerA = document.querySelector('#timerPlayerA');
const timerPlayerB = document.querySelector('#timerPlayerB');

let jogoEncerrado = false;
let tempoSegundos = 10;
let vezAtual = 1;
let estaBloqueada = false;
let jogadaExtra = false;
// Seleção dos jogadores
const player1 = document.querySelector("#player1");
let imagePlayer1 = player1.value;

const player2 = document.querySelector("#player2");
let imagePlayer2 = player2.value;

player1.addEventListener('change', function(event) {
    imagePlayer1 = event.target.value;
    const playerATimer = document.querySelector("timerA").outerHTML;
    playerA.innerHTML = `<h1>PLAYER ${imagePlayer1.toUpperCase()} - ${pontuacaoPlayerA}</h1>` + playerATimer; // Reinsere o timer
    tempoSegundos = 10
    textoVezAtual.innerText = vezAtual === 1 ? `Vez de ${imagePlayer1.toString().toUpperCase()}` : `Vez de ${imagePlayer2.toString().toUpperCase()}`;
    botaoInversao.innerText = `🔄 Célula de Inversão: Inverte todos os ${imagePlayer1.toString().toUpperCase()} e ${imagePlayer2.toString().toUpperCase()} no tabuleiro.`
    playerA.innerHTML = `<h1>PLAYER ${imagePlayer1.toUpperCase()} - ${pontuacaoPlayerA}</h1>`;
    playerB.innerHTML = `<h1>PLAYER ${imagePlayer2.toUpperCase()} - ${pontuacaoPlayerB}</h1>`;
});

player2.addEventListener('change', function(event) {
    imagePlayer2 = event.target.value;
    const playerBTimer = document.querySelector("#timerB").outerHTML; // Salva o timer atual
    playerB.innerHTML = `<h1>PLAYER ${imagePlayer2.toUpperCase()} - ${pontuacaoPlayerB}</h1>` + playerBTimer; // Reinsere o timer
    tempoSegundos = 10
    textoVezAtual.innerText = vezAtual === 1 ? `Vez de ${imagePlayer1.toString().toUpperCase()}` : `Vez de ${imagePlayer2.toString().toUpperCase()}`;
    botaoInversao.innerText = `🔄 Célula de Inversão: Inverte todos os ${imagePlayer1.toString().toUpperCase()} e ${imagePlayer2.toString().toUpperCase()} no tabuleiro.`
    playerA.innerHTML = `<h1>PLAYER ${imagePlayer1.toUpperCase()} - ${pontuacaoPlayerA}</h1>`;
    playerB.innerHTML = `<h1>PLAYER ${imagePlayer2.toUpperCase()} - ${pontuacaoPlayerB}</h1>`;
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

        // limpar quadrados bloqueados
        

        
 
        // Verifica se o quadrado já foi preenchido
        // ADICIONAR VERIFICACAO NO CLASSLIST
        if (e.target.style.backgroundImage !== '' || e.target.style.background == 'red') {
            alert("Escolha outra posição");
            return;
        }
        
        for(let r = 0; r < 9; r++){
            if(quadrados[r].style.background == 'red'){

                console.log(quadrados[r].style.background == 'red')

                console.log('removendo os quadrados vermelho')
                quadrados[r].style.background = '';

            }
        }
       
       
        // Jogada X ou O
        if (vezAtual === 1) {
            if(estaBloqueada == true){
                e.target.style.background = 'red'
                estaBloqueada = false
            } else {
                e.target.style.backgroundImage = `url('../images/${imagePlayer1}.png')`;
            }
           
        } else {
            if(estaBloqueada == true){
                e.target.style.background = 'red'
                estaBloqueada = false
            } else {
                e.target.style.backgroundImage = `url('../images/${imagePlayer2}.png')`;
            }
 
           
        }
        // Verificar vitória
        verificarVitoria();
 
        // Lógica para alternar entre os jogadores ou permitir jogada extra
        if (!jogadaExtra) {
            vezAtual = vezAtual === 1 ? 2 : 1;  // Alterna entre X e O
            textoVezAtual.innerText = vezAtual === 1 ? `Vez de ${imagePlayer1.toString().toUpperCase()}` : `Vez de ${imagePlayer2.toString().toUpperCase()}`;
        } else {
            // Se a jogada extra estiver ativa, não alterna de vez
            jogadaExtra = false; // Desativa o poder de jogada extra após a segunda jogada
        }
 
       
 
        tempoSegundos = 10;
    });
}

const timerText = document.querySelector(".timer-tabuleiro")
    
function startTime() {
    if (tempoSegundos === -1) {
        if (vezAtual === 1) {
            vezAtual = 2;
            textoVezAtual.innerText = `Vez de ${imagePlayer2.toUpperCase()}`;
            timerPlayerB.style.display = "block";
            timerPlayerA.style.display = "none";
        } else {
            vezAtual = 1;
            textoVezAtual.innerText = `Vez de ${imagePlayer1.toUpperCase()}`;
            timerPlayerA.style.display = "block";
            timerPlayerB.style.display = "none";
        }
        tempoSegundos = 10;
    }
    const currentTimer = vezAtual === 1 ? timerPlayerA : timerPlayerB;
    currentTimer.querySelector('p').innerText = `00:${tempoSegundos < 10 ? "0" : ""}${tempoSegundos}`;
}


// Botão de inversão de símbolos
const botaoInversao = document.querySelector("#inversao");
botaoInversao.addEventListener("click", () => {
    for (let i = 0; i < quadrados.length; i++) {
        if (quadrados[i].style.backgroundImage.includes(`${imagePlayer1}.png`)) {
            quadrados[i].style.backgroundImage = `url('../images/${imagePlayer2}.png')`;
        }
        else if (quadrados[i].style.backgroundImage.includes(`${imagePlayer2}.png`)) {
            quadrados[i].style.backgroundImage = `url('../images/${imagePlayer1}.png')`;
        }
    }
});
 
// Botão para bloquear um quadrado
const botaoBloqueada = document.querySelector("#bloqueada");
 
botaoBloqueada.addEventListener("click", () => {
 
    estaBloqueada = true
   
});
 
// Botão para permitir duas jogadas seguidas
const botaoPoder = document.querySelector("#poder");
botaoPoder.addEventListener("click", () => {
    alert("Você pode fazer duas jogadas consecutivas!");
 
    // Ativa o poder de jogada extra
    jogadaExtra = true;
    textoVezAtual.innerText = vezAtual === 1 ? `Vez de ${imagePlayer1.toString().toUpperCase()} (duas jogadas!)` : `Vez de ${imagePlayer2.toString().toUpperCase} (duas jogadas!)`;
});
 
const botaoResetar = document.querySelector("#btnResetar").addEventListener("click", reiniciarJogo)

function reiniciarJogo() {
    vezAtual = 1;
    tempoSegundos = 10;
    jogoEncerrado = false;
    textoVezAtual.innerText = `Vez de ${imagePlayer1.toUpperCase()}`;
    quadrados.forEach(quadrado => quadrado.style.background = '');
}

const playerA = document.querySelector(".playerA")
const playerB = document.querySelector(".playerB")
let pontuacaoPlayerA = 0
let pontuacaoPlayerB = 0


function atualizarTabuleiro(vencedor){

    if(vencedor == 'X'){
        playerA.innerHTML = `<h1>PLAYER A - ${pontuacaoPlayerA+=1}</h1>`
    } else {
        playerB.innerHTML = `<h1>PLAYER B - ${pontuacaoPlayerB+=1}</h1>`
    }
    
    if(vencedor === 'gremio') {
        playerA.innerHTML = `<h1>PLAYER ${imagePlayer1.toString().toUpperCase()} - ${pontuacaoPlayerA+=0}</h1>`
            audioGremio.play()
    } else if (vencedor === 'inter') {
        audioInter.play()
    }
}

setInterval(() => {
    if(!jogoEncerrado){
        tempoSegundos-=1
        startTime()
    }
    
}, 1000);