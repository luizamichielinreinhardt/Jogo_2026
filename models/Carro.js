// ─── Classe Base ─────────────────────────────────────────────────────────────
 
class Obj {
    constructor(x, y, w, h, a) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.a = a
    }
 
    des_carro() {
        let img = new Image()
        img.src = this.a
        des.drawImage(img, this.x, this.y, this.w, this.h)
    }
 
    des_quad() {
        des.fillStyle = this.a
        des.fillRect(this.x, this.y, this.w, this.h, this.a)
    }
 
    des_carro_manual() {
        // Roda dianteira esquerda (agora superior frente)
        des.beginPath()
        des.lineWidth = '5'
        des.strokeStyle = 'rgb(186, 186, 186)'
        des.fillStyle = 'darkorange'
        des.rect(this.x + 60, this.y-50, 10, 10)
        des.stroke()
        des.fill()
 
        // Roda dianteira direita (agora inferior frente)
        des.beginPath()
        des.rect(this.x + 60, this.y-10, 10, 10)
        des.stroke()
        des.fill()
 
        // Roda traseira esquerda (agora superior trás)
        des.beginPath()
        des.rect(this.x + 10, this.y-52, 10, 10)
        des.stroke()
        des.fill()
 
        // Roda traseira direita (agora inferior trás)
        des.beginPath()
        des.rect(this.x + 10, this.y-8, 10, 10)
        des.stroke()
        des.fill()
 
        // Trapézio do corpo (Corpo principal rotacionado)
        des.beginPath()
        des.moveTo(this.x, this.y - 50)
        des.lineTo(this.x, this.y)
        des.lineTo(this.x + 50, this.y - 10)
        des.lineTo(this.x + 50, this.y - 40)
        des.closePath()
        des.lineWidth = '5'
        des.strokeStyle = 'rgb(186, 186, 186)'
        des.fillStyle = this.a
        des.stroke()
        des.fill()
 
        // Corpo frente (retângulo do "nariz")
        des.beginPath()
        des.rect(this.x + 50, this.y - 40, 20, 30)
        des.stroke()
        des.fill()
 
        // Asa frontal (vertical na ponta direita)
        des.beginPath()
        des.rect(this.x + 70, this.y - 50, 10, 50)
        des.stroke()
        des.fill()
    }
}
 
// ─── Carro do Jogador ────────────────────────────────────────────────────────
 
class Carro extends Obj {
 
    dir = 0
    vida = 5
    pontos = 0
    frame = 1
    tempo = 0
 
    mov_car() {
        this.y += this.dir
        if(this.y < 60){
            this.y = 60
        } else if(this.y > 600){
            this.y = 600
        }
    }

    
 
    colid(objeto) {
        let mx = 30 // aumenta se bater longe no eixo X
        let my = 15 // diminui se não detectar no eixo Y
        if((this.x + mx < objeto.x + objeto.w - mx) &&
           (this.x + this.w - mx > objeto.x + mx) &&
           (this.y + my < objeto.y + objeto.h - my) &&
           (this.y + this.h - my > objeto.y + my)){
            return true
        }
        return false
    }
 
    point(objeto) {
        if(objeto.x <= -100){
            return true
        } else {
            return false
        }
    }
 
    anim(nome) {
        this.tempo += 1
        if(this.tempo > 12){
            this.tempo = 0
            this.frame += 1
        }
        if(this.frame > 4){
            this.frame = 1
        }
        this.a = "./img/" + nome + this.frame + "_bg.png"
    }
}
 
// ─── Carro Inimigo / Power-up ────────────────────────────────────────────────
 
class CarroInimigo extends Obj {
 
    vel = 2
 
    recomeca() {
        this.x = 1300
        this.y = Math.floor(Math.random() * (638 - 62) + 62)
    }
 
    mov_car() {
        this.x -= this.vel
        if(this.x <= -200){
            this.recomeca()
        }
    }
}
 
// ─── Estrada ─────────────────────────────────────────────────────────────────
 
class Estrada extends Obj {
    mov_est() {
        this.x -= 6
        if(this.x < -60){
            this.x = 1300
        }
    }
}
 
// ─── Texto HUD ───────────────────────────────────────────────────────────────
 
class Text {
    des_text(text, x, y, cor, font) {
        des.fillStyle = cor
        des.lineWidth = '5'
        des.font = font
        des.fillText(text, x, y)
    }
}