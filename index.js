let des = document.getElementById('des').getContext('2d')

let carroInimigo  = new CarroInimigo(1300, 200, 130, 130, './img/carro_inimigo1.png')
let carroInimigo2 = new CarroInimigo(1500, 350, 123, 125, './img/carro_inimigo2.png')
let carroInimigo3 = new CarroInimigo(1700, 500, 125, 120, './img/carro_inimigo3.png')
let carroInimigo4 = new CarroInimigo(1700, 500, 125, 120, './img/carro_inimigo4.png')

let powerVida  = new CarroInimigo(1400, 200, 45, 35, './img/vida.png')
let powerPonto = new CarroInimigo(1600, 400, 60, 60, './img/ponto1.png')

let estrada  = new Estrada(10,  345, 40, 10)
let estrada2 = new Estrada(80,  345, 40, 10)
let estrada3 = new Estrada(140, 345, 40, 10)

let carro = new Carro(100, 325, 125, 120, './img/carro.png')

let t1       = new Text()
let t2       = new Text()
let fase_txt = new Text()

let motor  = new Audio('./img/motor.wav')
let batida = new Audio('./img/batida.mp3')
motor.volume  = 0.5
motor.loop    = true
batida.volume = 0.5

let jogar           = true
let fase            = 1
let faseMsgTimer    = 0
let vitoria         = false
let velocidadeVit   = 8

document.addEventListener('keydown', (e) => {
    motor.play()
    if (e.key === 'w' || e.key === 'ArrowUp') {
        carro.dir -= 10
    } else if (e.key === 's' || e.key === 'ArrowDown') {
        carro.dir += 10
    }
})

document.addEventListener('keyup', (e) => {
    if (e.key === 'w' || e.key === 'ArrowUp') {
        carro.dir = 0
    } else if (e.key === 's' || e.key === 'ArrowDown') {
        carro.dir = 0
    }
})

function atualizaHUD() {
    let coracoes = ''
    for (let i = 0; i < carro.vida; i++) coracoes += '💗'
    document.getElementById('hud-vidas').innerHTML = `<span style="font-size:24px;letter-spacing:4px;">${coracoes}</span>`
    document.getElementById('hud-fase').innerHTML  = `<span>👑 FASE ${fase}</span>`
    document.getElementById('hud-pontos').innerHTML = `<span>💎 ${carro.pontos}</span>`
}

function game_over() {
    if (carro.vida <= 0) {
        jogar = false
        motor.pause()
    }
}

function mudarFase(novaFase, vel) {
    fase = novaFase
    faseMsgTimer = 150
    carroInimigo.vel  = vel
    carroInimigo2.vel = vel
    carroInimigo3.vel = vel
    carroInimigo4.vel = vel
}

function ver_fase() {
    if      (carro.pontos > 20 && fase === 1) mudarFase(2, 4)
    else if (carro.pontos > 40 && fase === 2) mudarFase(3, 6)
    else if (carro.pontos > 60 && fase === 3) mudarFase(4, 8)
    else if (carro.pontos > 80 && fase === 4) {
        jogar   = false
        vitoria = true
        motor.pause()
    }
}

function colisao() {
    [carroInimigo, carroInimigo2, carroInimigo3, carroInimigo4].forEach(inimigo => {
        if (carro.colid(inimigo)) {
            batida.play()
            inimigo.recomeca()
            carro.vida -= 1
        }
    })
}

function pontuacao() {
    [carroInimigo, carroInimigo2, carroInimigo3, carroInimigo4].forEach(inimigo => {
        if (carro.point(inimigo)) {
            carro.pontos += 5
            inimigo.recomeca()
        }
    })
}

function powerups() {
    if (carro.colid(powerVida)) {
        carro.vida += 1
        powerVida.recomeca()
        const el = document.getElementById('hud-vidas')
        el.classList.add('ganhou')
        setTimeout(() => el.classList.remove('ganhou'), 300)
    }
    if (carro.colid(powerPonto)) {
        carro.pontos += 10
        powerPonto.recomeca()
    }
}

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
            des.fillText('⭐ FASE ' + fase + ' ⭐', 600, 355)
            des.restore()
        }
        faseMsgTimer--
    }
}

function desenha() {
    if (jogar) {
        carroInimigo.des_carro()
        carroInimigo2.des_carro()
        carroInimigo3.des_carro()
        carroInimigo4.des_carro()
        carro.des_carro()
        powerVida.des_carro()
        powerPonto.des_carro()
        atualizaHUD()
        desenhaFaseMsg()

    } else if (vitoria) {
        des.save()
        carro.des_carro()
        des.fillStyle = 'rgba(0,0,0,0.55)'
        des.fillRect(0, 0, 1200, 700)
        des.fillStyle   = '#FFD700'
        des.font        = 'bold 72px Arial'
        des.textAlign   = 'center'
        des.shadowColor = '#ff4da6'
        des.shadowBlur  = 20
        des.fillText('🏆 VOCÊ VENCEU! 🏆', 600, 310)
        des.fillStyle  = '#fff'
        des.font       = '32px Arial'
        des.shadowBlur = 0
        des.fillText('Pontuação Final: ' + carro.pontos, 600, 380)
        des.restore()

    } else {
        des.save()
        des.fillStyle = 'rgba(0,0,0,0.6)'
        des.fillRect(0, 0, 1200, 700)
        des.fillStyle   = '#ff4da6'
        des.font        = 'bold 80px Arial'
        des.textAlign   = 'center'
        des.shadowColor = '#000'
        des.shadowBlur  = 16
        des.fillText('GAME OVER', 600, 320)
        des.fillStyle  = '#fff'
        des.font       = '32px Arial'
        des.shadowBlur = 0
        des.fillText('Pontuação Final: ' + carro.pontos, 600, 390)
        des.restore()
    }
}

function atualiza() {
    if (jogar) {
        carro.mov_car()
        carroInimigo.mov_car()
        carroInimigo2.mov_car()
        carroInimigo3.mov_car()
        carroInimigo4.mov_car()
        powerVida.mov_car()
        powerPonto.mov_car()
        colisao()
        pontuacao()
        ver_fase()
        game_over()
        powerups()
    } else if (vitoria) {
        if (carro.x < 1300) {
            carro.x += velocidadeVit
        }
    }
}

function main() {
    des.clearRect(0, 0, 1200, 700)
    desenha()
    atualiza()
    requestAnimationFrame(main)
}

main()