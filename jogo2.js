const IMG_P1 = './img/carro.png'
const IMG_P2 = './img/carro_2.png'

// ─── Variáveis de jogo ────────────────────────────────────────────────────────
let des1, des2
let fimJogo = false
let carroP1, inimigosP1, docesP1, powerVidaP1
let faseP1 = 1, faseMsgTimerP1 = 0, cooldownBatidaP1 = 0
let carroP2, inimigosP2, docesP2, powerVidaP2
let faseP2 = 1, faseMsgTimerP2 = 0, cooldownBatidaP2 = 0
let motor, batida, ponto, morre, ganha

const VIDA_MAX = 5
const fundosPorFase = {
    1: './img/fundo_1.png',
    2: './img/fundo_2.png',
    3: './img/fundo_3.png',
    4: './img/fundo_4.png',
}

function setupSelecao() {
    document.getElementById('btn-comecar').addEventListener('click', () => {
        document.getElementById('tela-selecao').style.display = 'none'
        document.getElementById('game-area').style.display = 'flex'
        iniciarJogo()
    })
}

function iniciarJogo() {
    des1 = document.getElementById('des1').getContext('2d')
    des2 = document.getElementById('des2').getContext('2d')

    motor  = new Audio('./img/musica_jogo.mp3')
    batida = new Audio('./img/batida.mp3')
    ponto  = new Audio('./img/pontos.mp3')
    morre  = new Audio('./img/morte.mp3')
    ganha  = new Audio('./img/ganho.mp3')
    motor.volume  = 0.5
    motor.loop    = true
    batida.volume = 0.2
    ponto.volume  = 0.5
    morre.volume  = 0.5
    ganha.volume  = 0.5

// ── Jogador 1 (Vanellope) ──
    carroP1 = new Carro(100, 130, 125, 120, IMG_P1)

    inimigosP1 = [
        new CarroInimigo(1300, 30,  130, 130, './img/carro_inimigo1.png'),
        new CarroInimigo(1600, 110, 123, 125, './img/carro_inimigo2.png'),
        new CarroInimigo(1900, 190, 125, 120, './img/carro_inimigo3.png'),
        new CarroInimigo(2200, 70,  125, 120, './img/carro_inimigo4.png'),
    ]
    inimigosP1.forEach(i => {
        i.pontuou = false
        i.vel = 2
        i.recomeca = function() {
            this.x = 1300 + Math.floor(Math.random() * 400)
            this.y = Math.floor(Math.random() * (280 - 20) + 20)
        }
    })

    powerVidaP1 = new CarroInimigo(1500, 40, 45, 35, './img/vida.png')
    docesP1 = [
        new CarroInimigo(1400, 80,  60, 60, './img/ponto1.png'),
        new CarroInimigo(1750, 160, 60, 60, './img/ponto2.png'),
        new CarroInimigo(2000, 50,  60, 60, './img/ponto3.png'),
        new CarroInimigo(2300, 220, 60, 60, './img/ponto4.png'),
    ]

    function makeR1(obj, yMin, yMax) {
        obj.coletado = false
        obj.recomeca = function() {
            this.x = 1300 + Math.floor(Math.random() * 400)
            this.y = Math.floor(Math.random() * (yMax - yMin) + yMin)
            this.coletado = false
        }
    }
    makeR1(powerVidaP1, 20, 280)
    makeR1(docesP1[0],  20, 90)
    makeR1(docesP1[1],  90, 170)
    makeR1(docesP1[2], 170, 240)
    makeR1(docesP1[3], 240, 290)

// ── Jogador 2 (Taffyta) ──
    carroP2 = new Carro(100, 130, 125, 120, IMG_P2)

    inimigosP2 = [
        new CarroInimigo(1300, 30,  130, 130, './img/carro_inimigo1.png'),
        new CarroInimigo(1600, 110, 123, 125, './img/carro_inimigo2.png'),
        new CarroInimigo(1900, 190, 125, 120, './img/carro_inimigo3.png'),
        new CarroInimigo(2200, 70,  125, 120, './img/carro_inimigo4.png'),
    ]
    inimigosP2.forEach(i => {
        i.pontuou = false
        i.vel = 2
        i.recomeca = function() {
            this.x = 1300 + Math.floor(Math.random() * 400)
            this.y = Math.floor(Math.random() * (280 - 20) + 20)
        }
    })

    powerVidaP2 = new CarroInimigo(1500, 40, 45, 35, './img/vida.png')
    docesP2 = [
        new CarroInimigo(1400, 80,  60, 60, './img/ponto1.png'),
        new CarroInimigo(1750, 160, 60, 60, './img/ponto2.png'),
        new CarroInimigo(2000, 50,  60, 60, './img/ponto3.png'),
        new CarroInimigo(2300, 220, 60, 60, './img/ponto4.png'),
    ]

    function makeR2(obj, yMin, yMax) {
        obj.coletado = false
        obj.recomeca = function() {
            this.x = 1300 + Math.floor(Math.random() * 400)
            this.y = Math.floor(Math.random() * (yMax - yMin) + yMin)
            this.coletado = false
        }
    }
    makeR2(powerVidaP2, 20, 280)
    makeR2(docesP2[0],  20, 90)
    makeR2(docesP2[1],  90, 170)
    makeR2(docesP2[2], 170, 240)
    makeR2(docesP2[3], 240, 290)

// ── Controles ──
    document.addEventListener('keydown', (e) => {
        motor.play()
        if (e.key === 'w')            carroP1.dir = -10
        else if (e.key === 's')       carroP1.dir =  10
        if (e.key === 'ArrowUp')    { e.preventDefault(); carroP2.dir = -10 }
        else if (e.key === 'ArrowDown') { e.preventDefault(); carroP2.dir = 10 }
    })

    document.addEventListener('keyup', (e) => {
        if (e.key === 'w' || e.key === 's')                       carroP1.dir = 0
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown')         carroP2.dir = 0
    })

    document.getElementById('btn-reiniciar').onclick = () => location.reload()
    document.getElementById('btn-inicio').onclick    = () => location.href = 'index.html'

    main()
}

function clampP1() {
    if (carroP1.y < 15)  carroP1.y = 15
    if (carroP1.y > 215) carroP1.y = 215
}
function clampP2() {
    if (carroP2.y < 15)  carroP2.y = 15
    if (carroP2.y > 215) carroP2.y = 215
}

function atualizaHUDs() {
    let c1 = ''
    for (let i = 0; i < carroP1.vida; i++) c1 += `<span class="coracao">💜</span>`
    document.getElementById('hud-vidas-p1').innerHTML  = c1
    document.getElementById('hud-fase-p1').innerHTML   = `🍬 FASE ${faseP1}`
    document.getElementById('hud-pontos-p1').innerHTML = `🍭 ${carroP1.pontos}`

    let c2 = ''
    for (let i = 0; i < carroP2.vida; i++) c2 += `<span class="coracao">🩷</span>`
    document.getElementById('hud-vidas-p2').innerHTML  = c2
    document.getElementById('hud-fase-p2').innerHTML   = `🍬 FASE ${faseP2}`
    document.getElementById('hud-pontos-p2').innerHTML = `🍭 ${carroP2.pontos}`
}
function trocarFundo(canvasId, fase) {
    document.getElementById(canvasId).style.backgroundImage =
        `url('${fundosPorFase[fase] || fundosPorFase[1]}')`
}
function mudarFaseP1(novaFase, vel) {
    faseP1 = novaFase
    faseMsgTimerP1 = 150
    trocarFundo('des1', novaFase)
    inimigosP1.forEach(i => i.vel = vel)
}
function mudarFaseP2(novaFase, vel) {
    faseP2 = novaFase
    faseMsgTimerP2 = 150
    trocarFundo('des2', novaFase)
    inimigosP2.forEach(i => i.vel = vel)
}

function verFaseP1() {
    if      (faseP1 === 1 && carroP1.pontos >= 40)  mudarFaseP1(2, 4)
    else if (faseP1 === 2 && carroP1.pontos >= 100) mudarFaseP1(3, 6)
    else if (faseP1 === 3 && carroP1.pontos >= 160) mudarFaseP1(4, 8)
}
function verFaseP2() {
    if      (faseP2 === 1 && carroP2.pontos >= 40)  mudarFaseP2(2, 4)
    else if (faseP2 === 2 && carroP2.pontos >= 100) mudarFaseP2(3, 6)
    else if (faseP2 === 3 && carroP2.pontos >= 160) mudarFaseP2(4, 8)
}
function colisaoP1() {
    if (cooldownBatidaP1 > 0) { cooldownBatidaP1--; return }
    inimigosP1.forEach(i => {
        if (carroP1.colid(i)) {
            batida.currentTime = 0; batida.play()
            i.recomeca(); i.pontuou = false
            carroP1.vida -= 1
            cooldownBatidaP1 = 60
        }
    })
}
function colisaoP2() {
    if (cooldownBatidaP2 > 0) { cooldownBatidaP2--; return }
    inimigosP2.forEach(i => {
        if (carroP2.colid(i)) {
            batida.currentTime = 0; batida.play()
            i.recomeca(); i.pontuou = false
            carroP2.vida -= 1
            cooldownBatidaP2 = 60
        }
    })
}
function pontuacaoP1() {
    inimigosP1.forEach(i => {
        if (!i.pontuou && i.x <= -100) { carroP1.pontos += 8; i.pontuou = true }
        if (i.x <= -200) { i.recomeca(); i.pontuou = false }
    })
}
function pontuacaoP2() {
    inimigosP2.forEach(i => {
        if (!i.pontuou && i.x <= -100) { carroP2.pontos += 8; i.pontuou = true }
        if (i.x <= -200) { i.recomeca(); i.pontuou = false }
    })
}
function powerupsP1() {
    if (!powerVidaP1.coletado && carroP1.colid(powerVidaP1)) {
        powerVidaP1.coletado = true
        ponto.currentTime = 0; ponto.play()
        if (carroP1.vida < VIDA_MAX) carroP1.vida += 1
        setTimeout(() => powerVidaP1.recomeca(), 100)
    }
    docesP1.forEach(d => {
        if (!d.coletado && carroP1.colid(d)) {
            d.coletado = true
            carroP1.pontos += 5
            ponto.currentTime = 0; ponto.play()
            setTimeout(() => d.recomeca(), 100)
        }
    })
}
function powerupsP2() {
    if (!powerVidaP2.coletado && carroP2.colid(powerVidaP2)) {
        powerVidaP2.coletado = true
        ponto.currentTime = 0; ponto.play()
        if (carroP2.vida < VIDA_MAX) carroP2.vida += 1
        setTimeout(() => powerVidaP2.recomeca(), 100)
    }
    docesP2.forEach(d => {
        if (!d.coletado && carroP2.colid(d)) {
            d.coletado = true
            carroP2.pontos += 5
            ponto.currentTime = 0; ponto.play()
            setTimeout(() => d.recomeca(), 100)
        }
    })
}
function verificarFimJogo() {
    if (fimJogo) return
    if (carroP1.vida > 0 && carroP2.vida > 0) return

    fimJogo = true
    motor.pause()
    motor.currentTime = 0

    const pts1 = carroP1.pontos
    const pts2 = carroP2.pontos
    let p1Linha, p2Linha

    if (pts1 > pts2) {
        ganha.play()
        p1Linha = { texto: `🥇 1ST — VANELLOPE: ${pts1} pts`, classe: 'resultado-1st' }
        p2Linha = { texto: `🥈 2ND — TAFFYTA: ${pts2} pts`,   classe: 'resultado-2nd' }
    } else if (pts2 > pts1) {
        ganha.play()
        p1Linha = { texto: `🥇 1ST — TAFFYTA: ${pts2} pts`,   classe: 'resultado-1st' }
        p2Linha = { texto: `🥈 2ND — VANELLOPE: ${pts1} pts`, classe: 'resultado-2nd' }
    } else {
        morre.play()
        p1Linha = { texto: `🤝 EMPATE! VANELLOPE: ${pts1} pts`, classe: 'resultado-1st' }
        p2Linha = { texto: `🤝 EMPATE! TAFFYTA: ${pts2} pts`,   classe: 'resultado-1st' }
    }

    document.getElementById('overlay').style.display = 'flex'
    document.getElementById('overlay-titulo').textContent = '🏁 FIM DE JOGO! 🏁'
    document.getElementById('overlay-resultado').innerHTML = `
        <div class="resultado-linha ${p1Linha.classe}">${p1Linha.texto}</div>
        <div class="resultado-linha ${p2Linha.classe}">${p2Linha.texto}</div>
    `
}
function drawObj(ctx, obj) {
    let img = new Image()
    img.src = obj.a
    ctx.drawImage(img, obj.x, obj.y, obj.w, obj.h)
}

function desenhaFaseMsg(des, fase, timer) {
    if (timer <= 0) return
    if (Math.floor(timer / 15) % 2 === 0) {
        des.save()
        des.fillStyle = 'rgba(0,0,0,0.45)'
        des.beginPath()
        des.roundRect(200, 130, 500, 70, 10)
        des.fill()
        des.fillStyle   = '#FFD700'
        des.font        = 'bold 34px Verdana'
        des.textAlign   = 'center'
        des.shadowColor = '#b30059'
        des.shadowBlur  = 10
        des.fillText('🍬 FASE ' + fase + ' 🍬', 450, 178)
        des.restore()
    }
}

function desenhaPlayer(ctx, carro, inimigos, doces, powerVida, fase, timer) {
    inimigos.forEach(i => drawObj(ctx, i))
    carro.des_carro(ctx)          // usa animação do Carro
    drawObj(ctx, powerVida)
    doces.forEach(d => drawObj(ctx, d))
    desenhaFaseMsg(ctx, fase, timer)
}
function main() {
    if (!fimJogo) {
        des1.clearRect(0, 0, 1200, 350)
        des2.clearRect(0, 0, 1200, 350)

        // Mover
        carroP1.y += carroP1.dir; clampP1()
        carroP2.y += carroP2.dir; clampP2()
        inimigosP1.forEach(i => i.mov_car())
        inimigosP2.forEach(i => i.mov_car())
        powerVidaP1.mov_car(); docesP1.forEach(d => d.mov_car())
        powerVidaP2.mov_car(); docesP2.forEach(d => d.mov_car())

        // Lógica
        colisaoP1(); pontuacaoP1(); verFaseP1(); powerupsP1()
        colisaoP2(); pontuacaoP2(); verFaseP2(); powerupsP2()

        if (faseMsgTimerP1 > 0) faseMsgTimerP1--
        if (faseMsgTimerP2 > 0) faseMsgTimerP2--

        verificarFimJogo()

        // Desenhar
        desenhaPlayer(des1, carroP1, inimigosP1, docesP1, powerVidaP1, faseP1, faseMsgTimerP1)
        desenhaPlayer(des2, carroP2, inimigosP2, docesP2, powerVidaP2, faseP2, faseMsgTimerP2)

        atualizaHUDs()
    }

    requestAnimationFrame(main)
}

document.addEventListener('DOMContentLoaded', setupSelecao)