const p1 = {
    name: 'player1',
    score: 0,
    button: document.getElementById('player1')
}

const p2 = {
    name: 'player2',
    score: 0,
    button: document.getElementById('player2')
}

const scoreBoard = document.getElementById('score')
const winner = document.getElementById('winner')

// リファクタ
let player1_score = 0
let player2_score = 0

let scoreText = `${p1.score} 対 ${p2.score}`
scoreBoard.textContent = scoreText


const ponScore = document.getElementById('pon-score')

for(let i = 0; i < 11; i++){
    const ponScoreItems = document.createElement('option')
    ponScoreItems.value = i
    ponScoreItems.textContent = `${i}`
    ponScore.appendChild(ponScoreItems)
}

// リファクタ
// const player1Button = document.getElementById('player1')
// const player2Button = document.getElementById('player2')
const resetButton = document.getElementById('reset')

let isGameOver = false
let isDuse = false
const duse = document.getElementById('duse')

// スコアをチェックする共通関数
function checkGameOver(player, opponent) {
    const targetScore = isDuse ? 2 : parseInt(ponScore.value); // デュース時は2点先取、通常時はponScoreの値
    if (player.score >= targetScore && (!isDuse || Math.abs(player.score - opponent.score) >= 2)) {
        isGameOver = true;
        player.button.disabled = true;
        opponent.button.disabled = true;
        winner.textContent = `${player.name} win!!`;
        winner.classList.add('color');
        winner.style.color = 'red';
    }
}

function updateScores(player ,opponent){
    if (!isGameOver) {
        player.score += 1;
        scoreBoard.textContent = `${p1.score} 対 ${p2.score}`; // スコア表示を更新

        // デュースかどうかを確認
        if (p1.score === parseInt(ponScore.value) - 1 && p2.score === parseInt(ponScore.value) - 1) {
            isDuse = true;
            duse.textContent = 'duse'
        }

        checkGameOver(player, opponent);
    }
}

p1.button.addEventListener('click', function(){
    updateScores(p1,p2)
})
p2.button.addEventListener('click', function(){
    updateScores(p2,p1)
})
resetButton.addEventListener('click', function(){
    reset()
    scoreBoard.textContent = scoreText;
})

ponScore.addEventListener('change', reset)

function reset(){
    for(let p of [p1, p2]){
        p.score = 0;
        p.button.disabled = false
    }
    isGameOver = false
    scoreBoard.textContent = scoreText;
    winner.textContent = ''
    duse.textContent = ''
}