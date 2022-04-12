class FiveDot{
    constructor(xC,yC,s,c1,c2,c3){
        this.xC = xC
        this.yC = yC
        this.s = s
        this.r = s/8
        this.c1 = c1
        this.c2 = c2
        this.c3 = c3
        console.log("A dot has been added")
    }
    update() {
        this.draw()
    }
    draw() {
        console.log("draw is called")
        ctx.beginPath();
        ctx.rect(this.xC - this.s/2, this.yC - this.s/2, this.s, this.s)
        ctx.fillStyle = this.c1
        ctx.fill()
        // top left
        this.drawCircle(this.xC-this.s/2, this.yC-this.s/2,this.r,this.c2);
        // top right
        this.drawCircle(this.xC+this.s/2,this.yC-this.s/2, this.r, this.c2);
        //bottom left
        this.drawCircle(this.xC-this.s/2,this.yC+this.s/2,this.r,this.c2);
        // bottom right
        this.drawCircle(this.xC+this.s/2,this.yC+this.s/2,this.r,this.c2);
        // centre
        this.drawCircle(this.xC,this.yC,this.r,this.c3);
    }
    drawCircle(x, y, r, col) {
        ctx.beginPath()
        ctx.arc(x, y, r, 0, 2 * Math.PI)
        ctx.fillStyle = col
        ctx.fill()
    }

}