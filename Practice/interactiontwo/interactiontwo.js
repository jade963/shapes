class Main extends InteractiveObject{
    constructor(){
        super()
        this.w = 0;
        this.h = 0;
        this.objectSet = [];
    }
    mUp(e){
        super.mUp(e);
        let temp = new Rectangle(this.xStart, this.yStart, this.h, this.w, colArray[1][7])
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
        this.strokeRect(this.xStart, this.yStart, this.w, this.h, colArray[0][1],12);
        // this line goes diagonally through the centre of the rect
        this.drawLine(x,y,x+w,y+h,colArray[0][4],2)
        this.drawLine(x,y+h,x+w,y,colArray[0][4],2)
        //Math.abs means that it won't freak out if the radius becomes negative
        this.drawStrokeCircle(x+w/2,y+h/2,Math.abs(w/10),colArray[0][5],4)
    }
}

Main.prototype.strokeRect = strokeRect
Main.prototype.drawLine = drawLine
Main.prototype.drawStrokeCircle = drawStrokeCircle