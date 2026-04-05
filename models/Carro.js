// ─── Classe Base ─────────────────────────────────────────────────────────────
class Obj {
    constructor(x, y, w, h, a) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.a = a
    }

    des_carro(ctx) {
        const c = ctx || des
        let img = new Image()
        img.src = this.a
        c.drawImage(img, this.x, this.y, this.w, this.h)
    }

    des_quad() {
        des.fillStyle = this.a
        des.fillRect(this.x, this.y, this.w, this.h, this.a)
    }
}
// ─── Carro do Jogador ────────────────────────────────────────────────────────
class Carro extends Obj {

    dir      = 0
    vida     = 5
    pontos   = 0
    frame    = 5
    tempo    = 0

    _aniTick = 0
    _bounce  = 0
    _lastDir = 0

    mov_car() {
        this.y += this.dir
        if (this.y < 60)  this.y = 60
        if (this.y > 600) this.y = 600
    }

    des_carro(ctx) {
        const c = ctx || des

        this._aniTick++

        // Bounce ao mudar direção
        if (this._lastDir !== this.dir) {
            this._bounce = 5
            this._lastDir = this.dir
        }
        if (this._bounce > 0) this._bounce -= 0.8

        const bounceY = this._bounce * Math.sin(this._aniTick * 0.5)

        // Tilt leve ao mover
        const tilt = this.dir !== 0 ? (this.dir > 0 ? 0.07 : -0.07) : 0

        const cx = this.x + this.w / 2
        const cy = this.y + this.h / 2

        c.save()
        c.translate(cx, cy + bounceY)
        c.rotate(tilt)

        let img = new Image()
        img.src = this.a
        c.drawImage(img, -this.w / 2, -this.h / 2, this.w, this.h)

        c.restore()
    }

    colid(objeto) {
        let mx = 30
        let my = 15
        if ((this.x + mx          < objeto.x + objeto.w - mx) &&
            (this.x + this.w - mx > objeto.x + mx)            &&
            (this.y + my          < objeto.y + objeto.h - my) &&
            (this.y + this.h - my > objeto.y + my)) {
            return true
        }
        return false
    }

    point(objeto) {
        return objeto.x <= -100
    }

    anim(nome) {
        this.tempo += 1
        if (this.tempo > 12) {
            this.tempo = 0
            this.frame += 1
        }
        if (this.frame > 4) this.frame = 1
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
        if (this.x <= -200) this.recomeca()
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