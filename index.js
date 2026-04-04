let des = document.getElementById('des').getContext('2d')

// ─── Inimigos ─────────────────────────────────────────────────────────────────
let carroInimigo  = new CarroInimigo(1300, 150, 130, 130, './img/carro_inimigo1.png')
let carroInimigo2 = new CarroInimigo(1600, 320, 123, 125, './img/carro_inimigo2.png')
let carroInimigo3 = new CarroInimigo(1900, 480, 125, 120, './img/carro_inimigo3.png')
let carroInimigo4 = new CarroInimigo(2200, 230, 125, 120, './img/carro_inimigo4.png')

// ─── Power-ups ────────────────────────────────────────────────────────────────
let powerVida   = new CarroInimigo(1500, 120, 45, 35,  './img/vida.png')
let powerPonto1 = new CarroInimigo(1400, 260, 60, 60,  './img/ponto1.png')
let powerPonto2 = new CarroInimigo(1750, 420, 60, 60,  './img/ponto2.png')
let powerPonto3 = new CarroInimigo(2000, 180, 60, 60,  './img/ponto3.png')
let powerPonto4 = new CarroInimigo(2300, 520, 60, 60,  './img/ponto4.png')
<<<<<<< HEAD

let fimJogo = false 
let cooldownBatida = 0

let carro  = new Carro(100, 325, 125, 120, './img/carro.png')
let motor  = new Audio('./img/musica_jogo.mp3')
=======

let carro = new Carro(100, 325, 125, 120, './img/carro.png')

let motor  = new Audio('./img/motor.wav')
>>>>>>> 47cad90437aabee7f290b712f2b661f966f1dbfd
let batida = new Audio('./img/batida.mp3')
let ponto  = new Audio('./img/pontos.mp3')
let morre  = new Audio('./img/morte.mp3')
let ganha  = new Audio('./img/ganho.mp3')
motor.volume  = 0.5
motor.loop    = true
batida.volume = 0.2
ponto.volume  = 0.5
morre.volume  = 0.5
ganha.volume  = 0.5

let jogar         = true
let fase          = 1
let faseMsgTimer  = 0
let vitoria       = false
let velocidadeVit = 8

const VIDA_MAX = 5

// ─── Fundos por fase ──────────────────────────────────────────────────────────
const fundosPorFase = {
    1: './img/fundo_1.png',
    2: './img/fundo_2.png',
    3: './img/fundo_3.png',
    4: './img/fundo_4.png',
}

function trocarFundo(novaFase) {
    const canvas = document.getElementById('des')
    canvas.style.backgroundImage = `url('${fundosPorFase[novaFase] || fundosPorFase[1]}')`
}

// ─── Flag de coletado para powerups ──────────────────────────────────────────
<<<<<<< HEAD
=======
// Cada powerup tem .coletado = false
// Quando o jogador colide, marca true e processa UMA vez
// Só reseta quando o objeto reaparece (recomeca)
>>>>>>> 47cad90437aabee7f290b712f2b661f966f1dbfd
powerVida.coletado   = false
powerPonto1.coletado = false
powerPonto2.coletado = false
powerPonto3.coletado = false
powerPonto4.coletado = false

// ─── recomeca com faixas de Y por objeto ─────────────────────────────────────
function makeRecomeca(obj, yMin, yMax) {
    obj.recomeca = function() {
        this.x = 1300 + Math.floor(Math.random() * 400)
        this.y = Math.floor(Math.random() * (yMax - yMin) + yMin)
        this.coletado = false
    }
}

makeRecomeca(powerPonto1,  62, 190)
makeRecomeca(powerPonto2, 190, 320)
makeRecomeca(powerPonto3, 320, 450)
makeRecomeca(powerPonto4, 450, 638)
makeRecomeca(powerVida,    62, 638)

// ─── Controles ────────────────────────────────────────────────────────────────
document.addEventListener('keydown', (e) => {
    motor.play()
    if (e.key === 'w' || e.key === 'ArrowUp')       carro.dir -= 10
    else if (e.key === 's' || e.key === 'ArrowDown') carro.dir += 10
})

document.addEventListener('keyup', (e) => {
    if (e.key === 'w' || e.key === 'ArrowUp')       carro.dir = 0
    else if (e.key === 's' || e.key === 'ArrowDown') carro.dir = 0
})

// ─── HUD ──────────────────────────────────────────────────────────────────────
function atualizaHUD() {
    let coracoes = ''
    for (let i = 0; i < carro.vida; i++) {
        coracoes += `<span class="coracao">💗</span>`
    }
    document.getElementById('hud-vidas').innerHTML  = coracoes
    document.getElementById('hud-fase').innerHTML   = `<span>🍬 FASE ${fase}</span>`
    document.getElementById('hud-pontos').innerHTML = `<span>🍭 ${carro.pontos}</span>`
<<<<<<< HEAD
}

// ─── Lógica de jogo ───────────────────────────────────────────────────────────

function mostrarOverlay(titulo, cor, pontos) {
    const overlay = document.getElementById('overlay')
    overlay.style.display = 'flex'
    overlay.style.background = 'rgba(0,0,0,0.7)'

    const t = document.getElementById('overlay-titulo')
    t.textContent = titulo
    t.style.color = cor
    t.style.textShadow = '0 0 20px ' + cor

    document.getElementById('overlay-pontos').textContent = 'Pontuação Final: ' + carro.pontos

    document.getElementById('btn-reiniciar').onclick = () => location.reload()
    document.getElementById('btn-inicio').onclick = () => location.href = 'index.html'
=======
>>>>>>> 47cad90437aabee7f290b712f2b661f966f1dbfd
}

// ─── Lógica de jogo ───────────────────────────────────────────────────────────
function game_over() {
    if (carro.vida <= 0 && !fimJogo) {
        fimJogo = true
        jogar = false
        motor.pause()
        motor.currentTime = 0
        morre.currentTime = 0
        morre.play()
        mostrarOverlay('💀 GAME OVER 💀', '#ff4da6', carro.pontos)
    }
}
function mudarFase(novaFase, vel) {
    fase = novaFase
    faseMsgTimer = 150
    trocarFundo(novaFase)
    carroInimigo.vel  = vel
    carroInimigo2.vel = vel
    carroInimigo3.vel = vel
    carroInimigo4.vel = vel
}

function ver_fase() {
    if      (fase === 1 && carro.pontos >= 40)  mudarFase(2, 4)
<<<<<<< HEAD
    else if (fase === 2 && carro.pontos >= 100) mudarFase(3, 6)
    else if (fase === 3 && carro.pontos >= 180) mudarFase(4, 8)
    else if (fase === 4 && carro.pontos >= 250 && !fimJogo) {
        fimJogo = true
=======
    else if (fase === 2 && carro.pontos >= 150) mudarFase(3, 6)
    else if (fase === 3 && carro.pontos >= 200) mudarFase(4, 8)
    else if (fase === 4 && carro.pontos >= 300) {
>>>>>>> 47cad90437aabee7f290b712f2b661f966f1dbfd
        jogar   = false
        vitoria = true
        motor.pause()
        motor.currentTime = 0
        ganha.currentTime = 0
        ganha.play()
        mostrarOverlay('🏆 VOCÊ VENCEU! 🏆', '#FFD700', carro.pontos)
    }
}
const inimigos = [carroInimigo, carroInimigo2, carroInimigo3, carroInimigo4]
inimigos.forEach(i => i.pontuou = false)

const inimigos = [carroInimigo, carroInimigo2, carroInimigo3, carroInimigo4]
inimigos.forEach(i => i.pontuou = false)

function colisao() {
<<<<<<< HEAD
    if (cooldownBatida > 0) {
        cooldownBatida--
        return
    }
=======
>>>>>>> 47cad90437aabee7f290b712f2b661f966f1dbfd
    inimigos.forEach(inimigo => {
        if (carro.colid(inimigo)) {
            batida.currentTime = 0
            batida.play()
            inimigo.recomeca()
            inimigo.pontuou = false
            carro.vida -= 1
            cooldownBatida = 60  // trava por 60 frames (~1 segundo)
        }
    })
}

function pontuacao() {
    inimigos.forEach(inimigo => {
        if (!inimigo.pontuou && inimigo.x <= -100) {
<<<<<<< HEAD
            carro.pontos += 8
=======
            carro.pontos += 4
>>>>>>> 47cad90437aabee7f290b712f2b661f966f1dbfd
            inimigo.pontuou = true
        }
        if (inimigo.x <= -200) {
            inimigo.recomeca()
            inimigo.pontuou = false
        }
    })
}

const doces = [powerPonto1, powerPonto2, powerPonto3, powerPonto4]

function powerups() {
<<<<<<< HEAD
    // ── Coração ──
    if (!powerVida.coletado && carro.colid(powerVida)) {
        powerVida.coletado = true
        ponto.currentTime = 0
        ponto.play()
=======
    // ── Coração: flag garante que só conta UMA vez por aparição ──
    if (!powerVida.coletado && carro.colid(powerVida)) {
        powerVida.coletado = true
>>>>>>> 47cad90437aabee7f290b712f2b661f966f1dbfd
        if (carro.vida < VIDA_MAX) {
            carro.vida += 1
            const el = document.getElementById('hud-vidas')
            el.classList.add('ganhou')
            setTimeout(() => el.classList.remove('ganhou'), 300)
        }
<<<<<<< HEAD
=======
        // Reaparece logo após coletado
>>>>>>> 47cad90437aabee7f290b712f2b661f966f1dbfd
        setTimeout(() => powerVida.recomeca(), 100)
    }

    // ── Doces ──
    doces.forEach(doce => {
        if (!doce.coletado && carro.colid(doce)) {
            doce.coletado = true
            carro.pontos += 5
<<<<<<< HEAD
            ponto.currentTime = 0
            ponto.play()
=======
>>>>>>> 47cad90437aabee7f290b712f2b661f966f1dbfd
            setTimeout(() => doce.recomeca(), 100)
        }
    })
}

// ─── Renderização ─────────────────────────────────────────────────────────────
function desenhaFaseMsg() {
    if (faseMsgTimer > 0) {
        if (Math.floor(faseMsgTimer / 15) % 2 === 0) {
            des.save()
            des.fillStyle = 'rgba(0,0,0,0.45)'
            des.beginPath()
            des.roundRect(300, 290, 600, 90, 16)
            des.fill()
            des.fillStyle   = '#FFD700'
            des.font        = 'bold 58px Arial'
            des.textAlign   = 'center'
            des.shadowColor = '#b30059'
            des.shadowBlur  = 12
            des.fillText('🍬 FASE ' + fase + ' 🍬', 600, 355)
            des.restore()
        }
        faseMsgTimer--
    }
}

function desenha() {
    if (jogar) {
        inimigos.forEach(i => i.des_carro())
        carro.des_carro()
        powerVida.des_carro()
        doces.forEach(d => d.des_carro())
        atualizaHUD()
        desenhaFaseMsg()
    } else if (vitoria) {
        carro.des_carro()  // animação do carro saindo
    }
    // game over e vitória agora são tratados pelo overlay HTML
}
function atualiza() {
    if (jogar) {
        carro.mov_car()
        inimigos.forEach(i => i.mov_car())
        powerVida.mov_car()
        doces.forEach(d => d.mov_car())
        colisao()
        pontuacao()
        ver_fase()
        game_over()
        powerups()
    } else if (vitoria) {
        if (carro.x < 1300) carro.x += velocidadeVit
    }
}

// ─── Loop principal ───────────────────────────────────────────────────────────
function main() {
    des.clearRect(0, 0, 1200, 700)
    desenha()
    atualiza()
    requestAnimationFrame(main)
}

main()