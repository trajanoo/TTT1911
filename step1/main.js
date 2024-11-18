const quadrados = document.querySelectorAll('.quadrado');
const textoVezAtual = document.querySelector('.title-tabuleiro p');
const main = document.querySelector("main")

let jogoEncerrado = false;
let tempoSegundos = 6
let vezAtual = 1

const player1 = document.querySelector("#player1")
let imagePlayer1 = player1.value

const player2 = document.querySelector("#player2")
let imagePlayer2 = player2.value

player1.addEventListener('change', function(event) {
    
    imagePlayer1 = event.target.value;
    playerA.innerHTML = `<h1>PLAYER ${imagePlayer1.toString().toUpperCase()} - ${pontuacaoPlayerA}</h1>`
    playerB.innerHTML = `<h1>PLAYER ${imagePlayer2.toString().toUpperCase()} - ${pontuacaoPlayerB}</h1>`
});

player2.addEventListener('change', function(event) {

    imagePlayer2 = event.target.value;
    playerA.innerHTML = `<h1>PLAYER ${imagePlayer1.toString().toUpperCase()} - ${pontuacaoPlayerA}</h1>`
    playerB.innerHTML = `<h1>PLAYER ${imagePlayer2.toString().toUpperCase()} - ${pontuacaoPlayerB}</h1>`
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
            alert(`Jogador ${vencedor} venceu!`);
            atualizarTabuleiro(vencedor)
            jogoEncerrado = true;
            
        }
    }
}

for (let i = 0; i < quadrados.length; i++) {
    quadrados[i].addEventListener("click", (e) => {
        if (jogoEncerrado);

        if (vezAtual === 1) {
            if (e.target.style.backgroundImage.includes(`${imagePlayer2}.png`)) {
                alert("Escolha outra posição");
            } else {
                e.target.style.backgroundImage = `url('../images/${imagePlayer1}.png')`;
                e.target.classList.add("x");
                vezAtual++;
                textoVezAtual.innerText = `Vez de ${imagePlayer2.toString().toUpperCase()}`;
                tempoSegundos = 6
                verificarVitoria();
            }
        } else {
            if (e.target.style.backgroundImage.includes(`${imagePlayer1}.png`)) {
                alert("Escolha outra posição");e
            } else {
                e.target.style.backgroundImage = `url('../images/${imagePlayer2}.png')`;
                e.target.classList.add("o");
                vezAtual--;
                textoVezAtual.innerText = `Vez de ${imagePlayer1.toString().toUpperCase()}`;
                tempoSegundos = 6
                verificarVitoria();
            }
        }
    });
}

const botaoResetar = document.querySelector("#btnResetar").addEventListener("click", reiniciarJogo)

function reiniciarJogo(){
    vezAtual = 1
    jogoEncerrado = false
    textoVezAtual.innerText = `Vez de ${imagePlayer1}`;
    for(let r = 0; r < 9; r++){   
        quadrados[r].style.background = '';
    }
}

const playerA = document.querySelector(".playerA")
const playerB = document.querySelector(".playerB")

let pontuacaoPlayerA = 0
let pontuacaoPlayerB = 0


playerA.innerHTML = `<h1>PLAYER ${imagePlayer1.toString().toUpperCase()} - ${pontuacaoPlayerA}</h1>`
playerB.innerHTML = `<h1>PLAYER ${imagePlayer2.toString().toUpperCase()} - ${pontuacaoPlayerB}</h1>`

function atualizarTabuleiro(vencedor){

    if(vencedor == 'X'){
        playerA.innerHTML = `<h1>PLAYER ${imagePlayer1.toString().toUpperCase()} - ${pontuacaoPlayerA+=1}</h1>`
    } else {
        playerB.innerHTML = `<h1>PLAYER ${imagePlayer2.toString().toUpperCase()} - ${pontuacaoPlayerB+=1}</h1>`
    }
}

