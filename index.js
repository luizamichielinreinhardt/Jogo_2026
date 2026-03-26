let des = document.getElementById('des').getContext('2d')
 
let carroInimigo = new CarroInimigo(1300, 200, 130, 130, './img/carro_inimigo1.png')
let carroInimigo2 = new CarroInimigo(1500, 350, 123, 125, './img/carro_inimigo2png')
let carroInimigo3 = new CarroInimigo(1700, 500, 125, 120, './img/carro_inimigo3.png')
 
let powerVida = new CarroInimigo(1400, 200, 45, 35, './img/vida.png')
let powerPonto = new CarroInimigo(1600, 400, 60, 60, './img/ponto1.png')
 
let estrada = new Estrada(10, 345, 40, 10)
let estrada2 = new Estrada(80, 345, 40, 10)
let estrada3 = new Estrada(140, 345, 40, 10)
 
let carro = new Carro(100, 325, 125, 120, './img/carro.png')
// let medidaCarro = new Carro(100, 325, 85, 50, 'green')
 
let t1 = new Text()
let t2 = new Text()
let fase_txt = new Text()
 
let motor = new Audio('./img/motor.wav')
let batida = new Audio('./img/batida.mp3')
motor.volume = 0.5
motor.loop = true
batida.volume = 0.5
 
let jogar = true
let fase = 1
 
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
 
function game_over() {
    if (carro.vida <= 0) {
        jogar = false
        motor.pause() // música com o jogo parado
    }
}
 
function ver_fase() {
    if (carro.pontos > 20 && fase === 1) {
        fase = 2
        carroInimigo.vel = 4
        carroInimigo2.vel = 4
        carroInimigo3.vel = 4
    } else if (carro.pontos > 40 && fase === 2) {
        fase = 3
        carroInimigo.vel = 6
        carroInimigo2.vel = 6
        carroInimigo3.vel = 6
    }
}
 
function colisao() {
    if (carro.colid(carroInimigo)) {
        batida.play()
        carroInimigo.recomeca()
        carro.vida -= 1
    }
    if (carro.colid(carroInimigo2)) {
        batida.play()
        carroInimigo2.recomeca()
        carro.vida -= 1
    }
    if (carro.colid(carroInimigo3)) {
        batida.play()
        carroInimigo3.recomeca()
        carro.vida -= 1
    }
    console.log('vida: ', carro.vida)
}
 
function pontuacao() {
    if (carro.point(carroInimigo)) {
        carro.pontos += 5
        carroInimigo.recomeca()
    }
    if (carro.point(carroInimigo2)) {
        carro.pontos += 5
        carroInimigo2.recomeca()
    }
    if (carro.point(carroInimigo3)) {
        carro.pontos += 5
        carroInimigo3.recomeca()
    }
}
 
function desenha() {
    if (jogar) {
    
        carroInimigo.des_carro()
        carroInimigo2.des_carro()
        carroInimigo3.des_carro()
        carro.des_carro()
        powerVida.des_carro()
        powerPonto.des_carro()
        t1.des_text('💎 ' + carro.pontos, 1000, 40, '#ff4da6', 'bold 26px Arial')
        t2.des_text('💗 ' + carro.vida, 40, 40, '#ff4da6', 'bold 26px Arial')
        fase_txt.des_text(' 👑 Fase ' + fase, 550, 40, '#ff4da6', 'bold 26px Arial')
    } else {
        t1.des_text('GAME OVER', 450, 350, 'yellow', '60px Arial')
        t2.des_text('Pontuação Final: ' + carro.pontos, 480, 400, 'white', '25px Arial')
    }
}
 
function atualiza() {
    if (jogar) {
        carro.mov_car()
        // carro.anim('carro_00')
        carroInimigo.mov_car()
        carroInimigo2.mov_car()
        carroInimigo3.mov_car()
        powerVida.mov_car()
        powerPonto.mov_car()
        estrada.mov_est()
        estrada2.mov_est()
        estrada3.mov_est()
        colisao()
        pontuacao()
        ver_fase()
        game_over()
        powerups()
    }
}
 
function powerups() {
    if (carro.colid(powerVida)) {
        carro.vida += 1
        powerVida.recomeca()
    }
    if (carro.colid(powerPonto)) {
        carro.pontos += 10
        powerPonto.recomeca()
    }
}
 
function main() {
    des.clearRect(0, 0, 1200, 700)
    desenha()
    atualiza()
    requestAnimationFrame(main)
}
 
main()