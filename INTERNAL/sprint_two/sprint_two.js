class Main extends InteractiveObject{
    constructor(){
        super()
        this.w = 0;
        this.h = 0;
        this.rotation = 0;
        this.startAngle = 0;
        this.endAngle = 2*Math.PI;
        this.objectSet = [];
        this.choice = "Circle";
    }
    mClick(){
        console.log(Button.selected)
        let choice = Button.selected.text;
        console.log(choice)
        this.choice = choice
    }
    mUp(e, temp){
        super.mUp(e);
        if (this.choice === "Rectangle"){
            let temp = new Rectangle(this.xStart, this.yStart, this.h, this.w, "rgba(0,0,0,0.5)")
            this.objectSet.push(temp)
            console.log("rectangle complete")
        }
        else if (this.choice === "Ellipse"){
            let temp = new Ellipse(this.xC,this.yC,this.radiusX,this.radiusY,this.rotation,this.startAngle,
                this.endAngle,"rgba(0,0,0,0.5)")
            this.objectSet.push(temp)
            console.log("ellipse complete")
        }
        else if (this.choice === "Circle"){
            let temp = new Circle(this.xC,this.yC,this.r,this.startAngle,
                this.endAngle,"rgba(0,0,0,0.5)")
            this.objectSet.push(temp)
            console.log("circle complete")
        }
        else if (this.choice === "Line"){
            let temp = new Line(this.xStart,this.yStart,this.x2,this.y2,"rgba(0,0,0,0.5)",2)
            this.objectSet.push(temp)
            console.log("line complete")
        }
        else if (this.choice === "Square"){
            let temp = new Square(this.xStart,this.yStart,this.w,"rgba(0,0,0,0.5)")
            this.objectSet.push(temp)
            console.log("line complete")
        }
    }
    update(){
        this.x2 = this.xMouse;
        this.y2 = this.yMouse;
        this.w = this.xMouse - this.xStart;
        this.h = this.yMouse - this.yStart;
        this.r = Math.abs(this.w/2);
        this.radiusX = Math.abs(this.w/2);
        this.radiusY = Math.abs(this.h/2);
        this.xC = this.xStart+this.w/2;
        this.yC = this.yStart+this.h/2;
        for(let i = 0; i<this.objectSet.length; i++){
            this.objectSet[i].update()
        }
        if(this.mouseIsDown){
            this.draw();
        }
    }
    draw() {
        let x = this.xStart
        let y = this.yStart
        let w = this.w
        let h = this.h
        let r = this.r
        let rX = this.radiusX
        let rY = this.radiusY
        let rotation = this.rotation
        let startAngle = this.startAngle
        let endAngle = this.endAngle
        let xC = this.xC
        let yC = this.yC
        let x2 = this.x2
        let y2 = this.y2
        if (this.choice === "Rectangle"){
            if(h < w){
                r = Math.abs(h/10)
            }
            else if(h > w){
                r = Math.abs(w/10)
            }
            this.tempRect(x,y,w,h);
            this.tempLine(x,y,x+w,y+h)
            this.tempLine(x,y+h,x+w,y)
            this.tempCircle(x+w/2,y+h/2,r)
        }
        else if (this.choice === "Square"){
            this.tempSquare(x,y,w);
            this.tempLine(x,y,x+w,y+w)
            this.tempLine(x,y+w,x+w,y)
            this.tempCircle(x+w/2,y+h/2,r)
        }
        else if (this.choice === "Ellipse"){
            this.tempEllipse(xC,yC,rX,rY,rotation,startAngle,endAngle)
            this.tempRect(x,y,w,h);
            this.tempLine(x,y,x+w,y+h)
            this.tempLine(x,y+h,x+w,y)
        }
        else if (this.choice === "Circle"){
            this.tempCircle(xC,yC,r)
            if (w>h){
                this.tempRect(x,y,r*2,r*2)
            }
            else if (w<h) {
                this.tempRect(x, y, w,w)
            }
            this.tempLine(x,y,x+w,y+h)
            this.tempLine(x,y+h,x+w,y)
        }
        else if (this.choice === "Line"){
            this.tempLine(x,y,x2,y2)
        }
    }
}
Main.prototype.tempRect = tempRect
Main.prototype.tempLine = tempLine
Main.prototype.tempCircle = tempCircle
Main.prototype.tempEllipse = tempEllipse
Main.prototype.tempSquare = tempSquare