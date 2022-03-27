console.log("classes js is called")

class Ball{
    constructor(x,y,r,col){
        this.x = x;
        this.y = y;
        this.rad = r;
        this.col = col;
        console.log("A ball has been added")
    }
    update() {
        this.drawCircle();
    }
    drawCircle(){
        ctx.fillStyle = this.col;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, 2*Math.PI);
        ctx.fill();
    }
    area(){
        let a = Math.PI*Math.pow(this.rad, 2)
        let output = "Area is: " + a + " pixels^2";
        console.log(output);
        }
}