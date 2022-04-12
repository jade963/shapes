class Main extends InteractiveObject{
    constructor(){
        super()
        this.w = 0;
        this.h = 0;
        this.objectSet = [];
    }
    mUp(e){
        super.mUp(e);
        let temp = new Rectangle(this.xStart, this.yStart, this.h, this.w, "rgba(0,0,0,0.5)")
        this.objectSet.push(temp)
    }
    update(){
        this.w = this.xMouse - this.xStart;
        this.h = this.yMouse - this.yStart;
        for(let i = 0; i<this.objectSet.length; i++){
            this.objectSet[i].update()
        }
        if(this.mouseIsDown){
            console.log("mouse is down");
            this.draw();
        }
    }

    draw() {
        let x = this.xStart
        let y = this.yStart
        let w = this.w
        let h = this.h
        let r = this.r
        // radius determines whether it should respond to width or height
        // Math.abs means it won't freak out if radius becomes negative
        if(this.h < this.w){
            this.r = Math.abs(this.h/10)
        }
        else if(this.h > this.w){
            this.r = Math.abs(this.w/10)
        }
        this.strokeRect(this.xStart, this.yStart, this.w, this.h, "rgb(0,0,0)",6);
        // this line goes diagonally through the centre of the temp shape
        this.drawLine(x,y,x+w,y+h,"rgb(0,0,0)",2)
        this.drawLine(x,y+h,x+w,y,"rgb(0,0,0)",2)
        // this circle sits in the centre of the temp shape
        this.drawStrokeCircle(x+w/2,y+h/2,r,"rgb(0,0,0)",2)
    }
}

Main.prototype.strokeRect = strokeRect
Main.prototype.drawLine = drawLine
Main.prototype.drawStrokeCircle = drawStrokeCircle

